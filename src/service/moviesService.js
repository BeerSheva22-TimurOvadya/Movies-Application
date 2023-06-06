async function fetchMovies(page) {
    const url = `${BASE_URL}?language=en-US&page=${page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) {
        throw data;
    }
    return data;
}
