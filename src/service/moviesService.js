import { API_KEY, BASE_URL, LOCALHOST_URL_FAVORITES, LOCALHOST_URL_WATCHLIST } from '../config/config.js';

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
    static async fetchFilteredMovies(page, filter) {
        let url = `${BASE_URL}discover/movie?language=en-US&sort_by=popularity.desc&page=${page}&api_key=${API_KEY}`;

        // Apply filter parameters if available
        if (filter && filter.genreWith) url += `&with_genres=${filter.genreWith}`;
        if (filter && filter.genreWithout) url += `&without_genres=${filter.genreWithout}`;
        if (filter && filter.yearFrom) url += `&primary_release_date.gte=${filter.yearFrom}-01-01`;
        if (filter && filter.yearTo) url += `&primary_release_date.lte=${filter.yearTo}-12-31`;

        const response = await fetch(url);
        const data = await response.json();
        if (data.errors) {
            throw data;
        }
        return data;
    }

    static async addToWatchlist(movie) {
        const response = await fetch(LOCALHOST_URL_WATCHLIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
    
        if (!response.ok) {
            if (response.status === 500) {
                window.alert('This movie is already in the Watchlist');
                return null;
            }
            throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    }
    
    static async addToFavorites(movie) {
        const response = await fetch(LOCALHOST_URL_FAVORITES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
    
        if (!response.ok) {
            if (response.status === 500) {
                window.alert('This movie is already in the Favorites');
                return null;
            }
            throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    }

   
}
