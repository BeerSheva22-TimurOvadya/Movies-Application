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
        const currentUser = localStorage.getItem('currentUser');
    
        const response = await fetch(`http://localhost:3500/users/?username=${currentUser}`);
        const data = await response.json();
    
        if (data.length > 0) {
            const user = data[0];
            if (user.watchList.find((m) => m.id === movie.id)) {
                window.alert('This movie is already in the Watchlist');
                return null;
            }
    
            user.watchList.push(movie);
    
            const updateResponse = await fetch(`http://localhost:3500/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (!updateResponse.ok) {
                throw new Error(`Error: ${updateResponse.status}`);
            }
    
            return movie;
        }
    }

    static async addToFavorites(movie) {
        const currentUser = localStorage.getItem('currentUser');
    
        const response = await fetch(`http://localhost:3500/users/?username=${currentUser}`);
        const data = await response.json();
    
        if (data.length > 0) {
            const user = data[0];
            // Замените 'watchList' на 'favorites' ниже
            if (user.favorites.find((m) => m.id === movie.id)) {
                window.alert('This movie is already in the Favorites');
                return null;
            }
    
            // И здесь тоже замените 'watchList' на 'favorites'
            user.favorites.push(movie);
    
            const updateResponse = await fetch(`http://localhost:3500/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (!updateResponse.ok) {
                throw new Error(`Error: ${updateResponse.status}`);
            }
    
            return movie;
        }
    }

   
}
