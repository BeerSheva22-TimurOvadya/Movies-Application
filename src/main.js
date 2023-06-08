import MovieService from './service/moviesService.js';
import MovieUI from './ui/MovieUI.js';
import FilterUI from './ui/FilterUI.js';
import PaginationUI from './ui/PaginationUI.js';
import { START_PAGE } from './config/config.js';
const paginationUI = new PaginationUI('paginationContainer');
    const movieUI = new MovieUI('moviesContainer', 'movieModal', paginationUI);
    paginationUI.setMovieUI(movieUI);
    const filterUI = new FilterUI('filterModal', movieUI);

async function main() {    

    const movies = await MovieService.fetchMovies(START_PAGE);
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);

    document.getElementById('homeBtn').addEventListener('click', homeHandler);
    document.getElementById('filterBtn').addEventListener('click', filterUI.openModal);
}

async function homeHandler() {
    filterUI.resetFilterSettings();  // Reset filter settings when HOME button is clicked
    const movies = await MovieService.fetchMovies(START_PAGE);
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);
}

main();