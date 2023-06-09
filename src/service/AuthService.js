export default class AuthService {
    static async authenticate(username, password) {
        const response = await fetch('http://localhost:3500/users/');
        const data = await response.json();

        const user = data.find((user) => user.username === username && user.password === password);
        return user !== undefined;
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
}
