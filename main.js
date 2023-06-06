const START_PAGE = 1;
const TOTAL_PAGES = 2;
document.addEventListener('DOMContentLoaded', (event) => {
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

// document.getElementById('searchBtn').addEventListener('click', () => {
//     fetchMovies(1)
//         .then(data => {
//             displayMovies(data.results);
//             displayPagination(1, data.total_pages);
//         })
//         .catch(error => console.error(error));
// });