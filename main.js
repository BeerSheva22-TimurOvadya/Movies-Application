document.getElementById('homeBtn').addEventListener('click', () => {
    fetchMovies(1)
        .then(data => {
            displayMovies(data.results);
            displayPagination(1, data.total_pages);
        })
        .catch(error => console.error(error));
});