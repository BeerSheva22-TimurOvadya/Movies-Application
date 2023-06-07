import { fetchMovies, initializeGenres } from './src/service/moviesService.js';
import { displayMovies, displayPagination, navigateToPage } from './src/ui/ui.js';
const START_PAGE = 1;
const TOTAL_PAGES = 2;

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGenres();
    navigateToPage(START_PAGE, TOTAL_PAGES);
});

document.getElementById('homeBtn').addEventListener('click', () => {
    fetchMovies(START_PAGE)
        .then(data => {
            displayMovies(data.results);
            displayPagination(1, data.total_pages);
        })
        .catch(error => console.error(error));
});