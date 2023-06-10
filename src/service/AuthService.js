export default class AuthService {
    // В классе AuthService после успешной аутентификации
    static async authenticate(username, password) {
        const response = await fetch('http://localhost:3500/users/');
        const data = await response.json();

        const user = data.find((user) => user.username === username && user.password === password);
        if (user !== undefined) {
            localStorage.setItem('currentUser', username); // сохраняем имя пользователя
            return true;
        } else {
            return false;
        }
    }

    static async register(username, password) {
        const response = await fetch('http://localhost:3500/users/');
        const data = await response.json();

        const existingUser = data.find((user) => user.username === username);
        if (existingUser !== undefined) {
            return false; // User already exists
        }

        const maxId = data.length > 0 ? Math.max(...data.map((user) => user.id)) : 0;
        const nextId = maxId + 1;

        // Add the new user
        const user = {
            id: nextId,
            username: username,
            password: password,
            watchList: [],
            favorites: []
        };

        // Save the new user to data.json via JSON Server
        const saveResponse = await fetch('http://localhost:3500/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (saveResponse.ok) {
            return true;
        } else {
            return false;
        }
    }

    logOut() {
        localStorage.removeItem('currentUser');    
        document.getElementById('username-display').textContent = '';        
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        // authUI.closeModal();

    }   
       
      
}
