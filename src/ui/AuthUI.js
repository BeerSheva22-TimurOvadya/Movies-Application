import ModalHandler from '../util/ModalHandler.js';

export default class AuthUI {
    constructor(authModalId, authHandler, registerHandler) {
        this.authModal = new ModalHandler(authModalId);
        this.authHandler = authHandler;
        this.registerHandler = registerHandler;
        this.initializeAuthUI();
    }

    initializeAuthUI() {
        this.authModal.setModalContent(`
    <div class="modal-content">
        <span id="loginCloseBtn" class="closeLogin">&times;</span>        
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
    </div>`);
    }

    async applyAuth() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const result = await this.authHandler(username, password);
        if (result) {
            document.getElementById('username-display').textContent = username;
            this.authModal.closeModal();
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

    openModal() {
        this.authModal.displayModal();
    }
}
