import { fetchMovies, initializeGenres } from './service/moviesService.js';
import { displayMovies, displayPagination, navigateToPage } from './ui/ui.js';
import { initializeFilterUI } from './ui/filter-ui.js';

const START_PAGE = 1;
const TOTAL_PAGES = 2;

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGenres();
    navigateToPage(START_PAGE, TOTAL_PAGES);
    initializeFilterUI();
});

document.getElementById('homeBtn').addEventListener('click', () => {
    fetchMovies(START_PAGE)
        .then(data => {
            displayMovies(data.results);
            displayPagination(1, data.total_pages);
        })
        .catch(error => console.error(error));
});

