import { MOVIE_IMAGE_URL, START_PAGE, LOCALHOST_URL_USERS } from '../config/config.js';
import MovieService from '../service/moviesService.js';
import ModalHandler from '../util/ModalHandler.js';
import ButtonHandler from '../util/ButtonHandler.js';
import AuthService from '../service/AuthService.js';

export default class MovieUI {
    constructor(moviesContainerId, movieModalId, paginationUI) {
        this.moviesContainer = document.getElementById(moviesContainerId);
        this.movieModal = new ModalHandler(movieModalId);
        this.paginationUI = paginationUI;
        this.buttonHandler = new ButtonHandler();
        this.movieService = new MovieService();
    }

    async displayMovies(movies) {
        const genres = await MovieService.initializeGenres();
        this.moviesContainer.innerHTML = '';
        movies.forEach((movie) => {
            this.createMovieCard(movie, genres, () => this.displayMovieDetails(movie));
        });
    }

    async createMovieCard(movie, genres, clickEvent) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${MOVIE_IMAGE_URL}${movie.poster_path}">
            <h2>${movie.original_title}</h2>
            <p>Vote average: ${movie.vote_average}</p>
            <p>Genres: ${movie.genre_ids.map((id) => genres[id]).join(', ')}</p>
        `;
        movieCard.addEventListener('click', clickEvent);
        this.moviesContainer.appendChild(movieCard);
    }

    #checkLoginAndExecute(action, titleMovie) {
        if (!AuthService.isLoggedIn()) {
            alert(`Please log in, to add movie ${titleMovie}`);
        } else {
            action();
            this.movieModal.closeModal();
        }
    }

    async applyFilter(filter) {
        this.filter = filter;
        const data = await MovieService.fetchFilteredMovies(START_PAGE, this.filter);
        this.displayMovies(data.results);
        this.paginationUI.displayPagination(START_PAGE, data.total_pages);
    }

    async navigateToPage(pageNumber, totalPages) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            let data;
            try {
                if (this.filter) {
                    data = await MovieService.fetchFilteredMovies(pageNumber, this.filter);
                } else {
                    data = await MovieService.fetchMovies(pageNumber);
                }
                this.displayMovies(data.results);
                this.paginationUI.displayPagination(pageNumber, data.total_pages);
                window.scrollTo(0, 0);
            } catch (error) {
                if (error.errors) {
                    window.alert(`Server Error: ${error.errors[0]}`);
                } else {
                    window.alert('Unknown error occurred. Please try again later.');
                }
            }
        } else {
            window.alert(`Invalid page number. Enter a number between 1 and ${totalPages}`);
        }
    }

    async displayMovieListFromUser(buttonId, buttonText, listName) {
        const currentUser = localStorage.getItem('currentUser');
        const response = await fetch(`${LOCALHOST_URL_USERS}?username=${currentUser}`);
        const userData = await response.json();

        if (userData.length > 0) {
            const user = userData[0];
            const movies = user[listName];

            const genres = await MovieService.initializeGenres();
            this.moviesContainer.innerHTML = '';
            if (movies) {
                movies.forEach((movie) => {
                    this.createMovieCard(movie, genres, () =>
                        this.displayMovieDetailsWithRemoveButton(movie, buttonId, buttonText),
                    );
                });
            }
        }
    }

    displayWatchlist() {
        this.displayMovieListFromUser('removeFromWatchlistBtn', 'Remove from Watchlist', 'watchList');
    }

    displayFavorites() {
        this.displayMovieListFromUser('removeFromFavoritesBtn', 'Remove from Favorites', 'favorites');
    }

    displayMovieDetails(movie) {
        this.movieModal.displayModal();
        this.movieModal.setModalContent(`
            <div class="modal-content">
                <span class="close">&times;</span>                
                <div id="movieDetails">
                    <h2>${movie.title}</h2>
                    <img src="${MOVIE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}">
                    <p>${movie.overview}</p>
                    <p>Release date: ${movie.release_date}</p>        
                    <p>Vote count: ${movie.vote_count}</p>
                    <p>Popularity: ${movie.popularity}</p>
                    <p>Language: ${movie.original_language}</p>                   
                    <button id="addWatchlistBtn" class="button">Add to Watch List</button>
                    <button id="addFavoritesBtn" class="button">Add to Favorites</button>                   
                </div>
            </div>
        `);

        this.movieModal.addCloseListener();

        this.buttonHandler.addButtonListener('addWatchlistBtn', () =>
            this.#checkLoginAndExecute(
                () => MovieService.addMovieToUserList(movie, 'watchList'),
                movie.title,
            ),
        );

        this.buttonHandler.addButtonListener('addFavoritesBtn', () =>
            this.#checkLoginAndExecute(
                () => MovieService.addMovieToUserList(movie, 'favorites'),
                movie.title,
            ),
        );
    }

    displayMovieDetailsWithRemoveButton(movie, buttonId, buttonText) {
        this.movieModal.displayModal();
        this.movieModal.setModalContent(`
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="movieDetails">
                    <h2>${movie.title}</h2>
                    <img src="${MOVIE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}">
                    <p>${movie.overview}</p>
                    <p>Release date: ${movie.release_date}</p>        
                    <p>Vote count: ${movie.vote_count}</p>
                    <p>Popularity: ${movie.popularity}</p>
                    <p>Language: ${movie.original_language}</p>
                    <button id="${buttonId}" class="button">${buttonText}</button>                    
                </div>
            </div>
        `);

        this.movieModal.addCloseListener();
        if (buttonId === 'removeFromWatchlistBtn') {
            this.buttonHandler.addButtonListener('removeFromWatchlistBtn', () => {
                this.movieService.removeFromList('watchList', movie.id, () => this.displayWatchlist()),
                    this.movieModal.closeModal();
            });
        } else if (buttonId === 'removeFromFavoritesBtn') {
            this.buttonHandler.addButtonListener('removeFromFavoritesBtn', () => {
                this.movieService.removeFromList('favorites', movie.id, () => this.displayFavorites()),
                    this.movieModal.closeModal();
            });
        }
    }
}
