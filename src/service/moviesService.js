async function fetchMovies(page) {
    const url = `${BASE_URL}movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) {
        throw data;
    }
    return data;
}

async function fetchGenres() {
    const url = `${BASE_URL}genre/movie/list?language=en&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) {
        throw data;
    }
    return data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
}
let genres = {};

fetchGenres()
    .then(fetchedGenres => {
        genres = fetchedGenres;
    })
    .catch(error => console.error(error));