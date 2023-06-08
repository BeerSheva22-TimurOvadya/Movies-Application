import MovieService from './service/moviesService.js';
import MovieUI from './ui/MovieUI.js';
import FilterUI from './ui/FilterUI.js';
import PaginationUI from './ui/PaginationUI.js';

const START_PAGE = 1;

document.addEventListener('DOMContentLoaded', async () => {
    const paginationUI = new PaginationUI('paginationContainer');
    const movieUI = new MovieUI('moviesContainer', 'movieModal', paginationUI);
    paginationUI.setMovieUI(movieUI);
    const filterUI = new FilterUI('filterModal');
    

    const movies = await MovieService.fetchMovies(START_PAGE);
    movieUI.displayMovies(movies.results);
    paginationUI.displayPagination(START_PAGE, movies.total_pages);

    document.getElementById('homeBtn').addEventListener('click', async () => {
        const movies = await MovieService.fetchMovies(START_PAGE);
        movieUI.displayMovies(movies.results);
        paginationUI.displayPagination(START_PAGE, movies.total_pages);
    });

    document.getElementById('filterBtn').addEventListener('click', filterUI.openModal);
});
