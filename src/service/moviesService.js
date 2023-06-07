import { API_KEY, BASE_URL } from '../config/config.js';

export default class MovieService {
    static async fetchMovies(page) {
        const url = `${BASE_URL}movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.errors) {
            throw data;
        }
        return data;
    }

    static async fetchGenres() {
        const url = `${BASE_URL}genre/movie/list?language=en&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.errors) {
            throw data;
        }
        return data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
    }

    static async initializeGenres() {
        try {
            return await this.fetchGenres();
        } catch (error) {
            console.error(error);
        }
    }
}
