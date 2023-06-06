function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = ""; // Clear the container

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
            <h2>${movie.original_title}</h2>
            <p>Vote average: ${movie.vote_average}</p>
            <p>Genres: ${movie.genre_ids.map(id => genres[id]).join(', ')}</p>
           `;

        movieCard.addEventListener('click', () => {
            displayMovieDetails(movie);
        });

        moviesContainer.appendChild(movieCard);
    });
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = ""; // Clear the container

    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.poster_path}">
        <p>${movie.overview}</p>
        <p>Release date: ${movie.release_date}</p>        
        <p>Vote count: ${movie.vote_count}</p>
        <p>Popularity: ${movie.popularity}</p>
        <p>Language: ${movie.original_language}</p>
        <button id="watchlistBtn" class="button">Add to Watch List</button>
        <button id="favoritesBtn" class="button">Add to Favorites</button>
    `;

    // Show the modal
    const modal = document.getElementById('movieModal');
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    document.getElementById('watchlistBtn').addEventListener('click', () => addToWatchList(movie));
    document.getElementById('favoritesBtn').addEventListener('click', () => addToFavorites(movie));
}
function addToWatchList(movie) {
    console.log(`Movie ${movie.title} added to Watch List.`);
    // Implement functionality here
}

function addToFavorites(movie) {
    console.log(`Movie ${movie.title} added to Favorites.`);
    // Implement functionality here
}

function navigateToPage(pageNumber, totalPages) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        fetchMovies(pageNumber)
            .then(data => {
                displayMovies(data.results);
                displayPagination(pageNumber, data.total_pages);
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.error(error);
                if (error.errors) {
                    window.alert(error.errors[0]);
                }
            });
    } else {
        window.alert(`Invalid page number. Enter a number between 1 and ${totalPages}`);
    }
}

function createNavigationButton(label, isEnabled, onClick) {
    const button = document.createElement('button');
    button.innerText = label;
    button.disabled = !isEnabled;
    button.addEventListener('click', onClick);
    return button;
}

function createPageInput(currentPage, totalPages) {
    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.min = 1;
    pageInput.max = totalPages;
    pageInput.value = currentPage;

    pageInput.addEventListener('keyup', function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            navigateToPage(parseInt(pageInput.value), totalPages);
        }
    });

    return pageInput;
}

function displayPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ""; // Clear the container

    const prevBtn = createNavigationButton(
        'Previous',
        currentPage > 1,
        () => navigateToPage(currentPage - 1, totalPages)
    );

    const nextBtn = createNavigationButton(
        'Next',
        currentPage < totalPages,
        () => navigateToPage(currentPage + 1, totalPages)
    );

    const pageInput = createPageInput(currentPage, totalPages);

    const pageInputBtn = createNavigationButton(
        'Go',
        true,
        () => navigateToPage(parseInt(pageInput.value), totalPages)
    );

    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(pageInput);
    paginationContainer.appendChild(pageInputBtn);
    paginationContainer.appendChild(nextBtn);
}
