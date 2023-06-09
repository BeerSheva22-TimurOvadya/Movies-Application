import {
    MOVIE_IMAGE_URL,
    START_PAGE,
    LOCALHOST_URL_WATCHLIST,
    LOCALHOST_URL_FAVORITES,
} from '../config/config.js';
import MovieService from '../service/moviesService.js';

export default class MovieUI {
    constructor(moviesContainerId, movieModalId, paginationUI) {
        this.moviesContainer = document.getElementById(moviesContainerId);
        this.movieModal = document.getElementById(movieModalId);
        this.paginationUI = paginationUI;
        this.closeModal = this.closeModal.bind(this);
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

    async displayMovies(movies) {
        const genres = await MovieService.initializeGenres();
        this.moviesContainer.innerHTML = '';
        movies.forEach((movie) => {
            this.createMovieCard(movie, genres, () => this.displayMovieDetails(movie));
        });
    }

    displayMovieDetails(movie) {
        // Show the modal
        this.movieModal.style.display = 'block';
        this.movieModal.innerHTML = `
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
        `;

        // When the user clicks on <span> (x), close the modal
        const span = document.getElementsByClassName('close')[0];
        span.onclick = this.closeModal;

        document.getElementById('addWatchlistBtn').addEventListener('click', (event) => {
            MovieService.addToWatchlist(movie);
        });

        document.getElementById('addFavoritesBtn').addEventListener('click', () => {
            MovieService.addToFavorites(movie);
        });
    }

    closeModal() {
        this.movieModal.style.display = 'none';
    }

    async applyFilter(filter) {
        this.filter = filter;
        
        // if (filter === null) {
        //     const data = await MovieService.fetchMovies(START_PAGE);
        //     return;
        // }
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
                // Обработка ошибки от сервера
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

    async displayMovieList(url, removeFromListMethod, buttonId, buttonText) {
        const response = await fetch(url);
        const movies = await response.json();
        const genres = await MovieService.initializeGenres();
        this.moviesContainer.innerHTML = '';
        movies.forEach((movie) => {
            this.createMovieCard(movie, genres, () =>
                this.displayMovieDetailsWithRemoveButton(
                    movie,
                    removeFromListMethod,
                    buttonId,
                    buttonText,
                ),
            );
        });
    }

    displayWatchlist() {
        this.displayMovieList(
            LOCALHOST_URL_WATCHLIST,
            this.removeFromList.bind(this, LOCALHOST_URL_WATCHLIST),
            'removeFromWatchlistBtn',
            'Remove from Watchlist',
        );
    }

    displayFavorites() {
        this.displayMovieList(
            LOCALHOST_URL_FAVORITES,
            this.removeFromList.bind(this, LOCALHOST_URL_FAVORITES),
            'removeFromFavoritesBtn',
            'Remove from Favorites',
        );
    }
    async removeFromList(url, movieId) {
        const response = await fetch(url + movieId, {
            method: 'DELETE',
        });
        return response.ok;
    }

    displayMovieDetailsWithRemoveButton(movie, removeFromListMethod, buttonId, buttonText) {
        this.movieModal.style.display = 'block';
        this.movieModal.innerHTML = `
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
        `;

        const span = document.getElementsByClassName('close')[0];
        span.onclick = this.closeModal;

        const removeBtn = document.getElementById(buttonId);
        removeBtn.addEventListener('click', () => {
            removeFromListMethod(movie.id);
            this.closeModal();
        });
    }
}
