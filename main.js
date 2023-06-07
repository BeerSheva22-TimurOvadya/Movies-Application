import { fetchMovies, initializeGenres, searchMovies } from './src/service/moviesService.js';
import { displayMovies, displayPagination, navigateToPage } from './src/ui/ui.js';
import { createSearchForm } from './src/ui/searchForm.js';

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

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchForm = createSearchForm();
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const genreId = formData.get('genre');
        const startYear = formData.get('startYear');
        const endYear = formData.get('endYear');
        searchMovies(genreId, startYear, endYear)
            .then(data => {
                displayMovies(data.results);
                displayPagination(1, data.total_pages);
            })
            .catch(error => console.error(error));
    });
});
