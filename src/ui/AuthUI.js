
export default class AuthUI {
    constructor(authModalId, authHandler, registerHandler) {
        this.authModal = document.getElementById(authModalId);
        this.authHandler = authHandler;
        this.registerHandler = registerHandler;
        this.initializeAuthUI();
        
       
    }

    openModal() {
        this.authModal.style.display = 'block';
    }

    closeModal() {
        this.authModal.style.display = 'none';
    }

    initializeAuthUI() {
        this.authModal.innerHTML = `
    <div class="modal-content">
        <span id="loginCloseBtn" class="closeLogin">&times;</span>        
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
    </div>`;
        

        const loginCloseBtn = document.getElementById('loginCloseBtn');
        loginCloseBtn.addEventListener('click', () => this.closeModal());

        const loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', () => this.applyAuth());

        const registerBtn = document.getElementById('registerBtn');
        registerBtn.addEventListener('click', () => this.registerUser());
    }

    async applyAuth() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        const result = await this.authHandler(username, password);
        if (result) {
            // If the user is authenticated, update the username display
            document.getElementById('username-display').textContent = username;
            this.closeModal();
        } else {
            alert('Failed to login. Please check your credentials.');
        }
    }

   async registerUser() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const result = this.registerHandler(username, password);
        if (result) {
            alert('Registration successful. You can now login.');
        } else {
            alert('Failed to register. Please try a different username.');
        }
    }
}
