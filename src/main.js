import MovieService from './service/moviesService.js';
import MovieUI from './ui/MovieUI.js';
import FilterUI from './ui/FilterUI.js';
import PaginationUI from './ui/PaginationUI.js';
import { START_PAGE } from './config/config.js';
import AuthUI from './ui/AuthUI.js';
import AuthService from './service/AuthService.js';

const paginationUI = new PaginationUI('paginationContainer');
const movieUI = new MovieUI('moviesContainer', 'movieModal', paginationUI);
paginationUI.setMovieUI(movieUI);
const filterUI = new FilterUI('filterModal', movieUI);
const movies = await MovieService.fetchMovies(START_PAGE);

async function main() {
    const authUI = new AuthUI('authModal', AuthService.authenticate, AuthService.register);
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);

    document.getElementById('homeBtn').addEventListener('click', homeHandler);


    document
        .getElementById('filterBtn')
        .addEventListener('click', () => filterUI.filterModal.displayModal());

    document
        .getElementById('filterCloseBtn')
        .addEventListener('click', () => filterUI.filterModal.closeModal());

    document
        .getElementById('resetFilterBtn')
        .addEventListener('click', () => filterUI.resetFilterSettings());

    document
        .getElementById('applyFilterBtn')
        .addEventListener('click', () => filterUI.applyFilterSettings());

    document.getElementById('watchListBtn').addEventListener('click', () => movieUI.displayWatchlist());

    document.getElementById('favoritesBtn').addEventListener('click', () => movieUI.displayFavorites());

    document.getElementById('logInBtn').addEventListener('click', () => authUI.openModal());

    document
        .getElementById('loginCloseBtn')
        .addEventListener('click', () => authUI.authModal.closeModal());

    document.getElementById('loginBtn').addEventListener('click', () => authUI.applyAuth());

    document.getElementById('registerBtn').addEventListener('click', () => authUI.registerUser());

    document.getElementById('logOutBtn').addEventListener('click', () => AuthService.logOut());
}

async function homeHandler() {
    filterUI.resetFilterSettings();
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);
}

main();
