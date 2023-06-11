import MovieService from './service/moviesService.js';
import MovieUI from './ui/MovieUI.js';
import FilterUI from './ui/FilterUI.js';
import PaginationUI from './ui/PaginationUI.js';
import { START_PAGE } from './config/config.js';
import AuthUI from './ui/AuthUI.js';
import AuthService from './service/AuthService.js';

const paginationUI = new PaginationUI('paginationContainer');
const movieUI = new MovieUI('moviesContainer', 'movieModal', paginationUI);

const filterUI = new FilterUI('filterModal', movieUI);
const authUI = new AuthUI('authModal', AuthService.authenticate, AuthService.register);
const movies = await MovieService.fetchMovies(START_PAGE);

async function main() {
    authUI.updateUIBasedOnAuthStatus();
    paginationUI.setMovieUI(movieUI);
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);

    function addClickListener(id, handler) {
        document.getElementById(id).addEventListener('click', handler);
    }

    addClickListener('homeBtn', homeHandler);
    addClickListener('filterBtn', () => filterUI.filterModal.displayModal());
    addClickListener('filterCloseBtn', () => filterUI.filterModal.closeModal());
    addClickListener('resetFilterBtn', () => filterUI.resetFilterSettings());
    addClickListener('applyFilterBtn', () => filterUI.applyFilterSettings());
    addClickListener('watchListBtn', () => movieUI.displayWatchlist());
    addClickListener('favoritesBtn', () => movieUI.displayFavorites());
    addClickListener('logInBtn', () => authUI.openModal());
    addClickListener('loginCloseBtn', () => authUI.authModal.closeModal());
    addClickListener('loginBtn', () => authUI.applyAuth());
    addClickListener('registerBtn', () => authUI.registerUser());
    addClickListener('logOutBtn', () => {
        authUI.logOut();
        location.reload();
    });
}

async function homeHandler() {
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);
}

main();
