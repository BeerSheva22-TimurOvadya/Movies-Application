import { LOCALHOST_URL_USERS } from '../config/config.js';
import { fetchData, saveData } from './fetchService.js';

export default class AuthService {    
    static async authenticate(username, password) {
        const data = await fetchData(LOCALHOST_URL_USERS);
        const user = data.find((user) => user.username === username && user.password === password);
        if (user !== undefined) {
            localStorage.setItem('currentUser', username);
            return true;
        } else {
            return false;
        }
    }

    static async register(username, password) {
        const data = await fetchData(LOCALHOST_URL_USERS);

        const existingUser = data.find((user) => user.username === username);
        if (existingUser !== undefined) {
            return false;
        }

        const maxId = data.length > 0 ? Math.max(...data.map((user) => user.id)) : 0;
        const nextId = maxId + 1;

        const user = {
            id: nextId,
            username: username,
            password: password,
            watchList: [],
            favorites: [],
        };

        return saveData(LOCALHOST_URL_USERS, 'POST', user);
    }

    

    static isLoggedIn() {       
        return localStorage.getItem('currentUser') !== null
    }

   
}
