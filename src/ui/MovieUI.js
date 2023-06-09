import { MOVIE_IMAGE_URL, START_PAGE } from '../config/config.js';
import MovieService from '../service/moviesService.js';

export default class MovieUI {
    constructor(moviesContainerId, movieModalId, paginationUI) {
        this.moviesContainer = document.getElementById(moviesContainerId);
        this.movieModal = document.getElementById(movieModalId);
        this.paginationUI = paginationUI;
        this.closeModal = this.closeModal.bind(this);
        this.pageAndMoveInfo();
    }

    async displayMovies(movies) {
        const genres = await MovieService.initializeGenres();
        this.moviesContainer.innerHTML = ''; // Clear the container
        movies.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${MOVIE_IMAGE_URL}${movie.poster_path}">
                <h2>${movie.original_title}</h2>
                <p>Vote average: ${movie.vote_average}</p>
                <p>Genres: ${movie.genre_ids.map((id) => genres[id]).join(', ')}</p>
            `;
            movieCard.addEventListener('click', () => {
                this.displayMovieDetails(movie, genres);
            });
            this.moviesContainer.appendChild(movieCard);
        });
    }

    displayMovieDetails(movie, genres) {
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
    }

    closeModal() {
        this.movieModal.style.display = 'none';
    }

    async applyFilter(filter) {
        this.filter = filter;
        if (filter === null) {
            const data = await MovieService.fetchMovies(START_PAGE);
            return;
        }
        const data = await MovieService.fetchFilteredMovies(START_PAGE, this.filter);
        this.displayMovies(data.results);
        this.paginationUI.displayPagination(START_PAGE, data.total_pages);
        this.updateMovieInfo(data.total_results, data.total_pages);
    }

    async navigateToPage(pageNumber, totalPages) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            let data;
            if (this.filter) {
                data = await MovieService.fetchFilteredMovies(pageNumber, this.filter);
            } else {
                data = await MovieService.fetchMovies(pageNumber);
            }
            this.displayMovies(data.results);
            this.paginationUI.displayPagination(pageNumber, data.total_pages);
            this.updateMovieInfo(data.total_results, data.total_pages);
            window.scrollTo(0, 0);
        } else {
            window.alert(`Invalid page number. Enter a number between 1 and ${totalPages}`);
        }
    }
    async pageAndMoveInfo() {
        const data = await MovieService.fetchMovies(START_PAGE);
        this.updateMovieInfo(data.total_results, data.total_pages);
    }

    updateMovieInfo(movieCount, pageCount) {
        const movieCountElement = document.getElementById('movie-count');
        const pageCountElement = document.getElementById('page-count');

        movieCountElement.textContent = movieCount;
        pageCountElement.textContent = pageCount;
    }
}
