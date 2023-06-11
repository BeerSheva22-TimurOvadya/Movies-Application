import { API_KEY, BASE_URL, LOCALHOST_URL_USERS } from '../config/config.js';
import { fetchData, saveData } from './fetchService.js';

export default class MovieService {
    static fetchMovies(page) {
        const url = `${BASE_URL}movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`;
        return fetchData(url);
    }

    static async fetchGenres() {
        const url = `${BASE_URL}genre/movie/list?language=en&api_key=${API_KEY}`;
        const data = await fetchData(url);
        return data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
    }

    static initializeGenres() {
        return this.fetchGenres();
    }

    static fetchFilteredMovies(page, filter) {
        let url = `${BASE_URL}discover/movie?language=en-US&sort_by=popularity.desc&page=${page}&api_key=${API_KEY}`;

        if (filter) {
            url += Object.entries(filter)
                .map(([key, value]) => {
                    switch (key) {
                        case 'genreWith':
                            return `&with_genres=${value}`;
                        case 'genreWithout':
                            return `&without_genres=${value}`;
                        case 'yearFrom':
                            return `&primary_release_date.gte=${value}-01-01`;
                        case 'yearTo':
                            return `&primary_release_date.lte=${value}-12-31`;
                        default:
                            return '';
                    }
                })
                .join('');
        }

        return fetchData(url);
    }

    static async addMovieToUserList(movie, listName) {
        const currentUser = localStorage.getItem('currentUser');
        const url = `${LOCALHOST_URL_USERS}?username=${currentUser}`;
        const data = await fetchData(url);
        if (data.length > 0) {
            const user = data[0];
            if (user[listName].find((m) => m.id === movie.id)) {
                window.alert(`Movie  is already in the ${listName}`);
                return null;
            }
            user[listName].push(movie);

            await saveData(`${LOCALHOST_URL_USERS}${user.id}`, 'PUT', user);
            return movie;
        }
    }

    async removeFromList(listName, movieId, callback) {
        const currentUser = localStorage.getItem('currentUser');
        const response = `${LOCALHOST_URL_USERS}?username=${currentUser}`;
        const userData = await fetchData(response);

        if (userData.length > 0) {
            const user = userData[0];
            user[listName] = user[listName].filter((movie) => movie.id !== movieId);
            await saveData(`${LOCALHOST_URL_USERS}${user.id}`, 'PUT', user);
            callback();
        }
    }
}
