import ModalHandler from '../util/ModalHandler.js';
import AuthService from '../service/AuthService.js';


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

    updateUIBasedOnAuthStatus() {
        const isLoggedIn = AuthService.isLoggedIn();    
        document.getElementById('watchListBtn').style.display = isLoggedIn ? 'block' : 'none';
        document.getElementById('favoritesBtn').style.display = isLoggedIn ? 'block' : 'none';     
        document.getElementById('logOutBtn').style.display = isLoggedIn ? 'block' : 'none';
        document.getElementById('logInBtn').style.display = isLoggedIn ? 'none' : 'block';
    }

    async applyAuth() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const result = await this.authHandler(username, password);
        if (result) {
            this.updateUIBasedOnAuthStatus();
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
            this.updateUIBasedOnAuthStatus()
            alert('Registration successful. You can now login.');
        } else {
            alert('Failed to register. Please try a different username.');
        }
        
    }

    logOut () {
        localStorage.removeItem('currentUser');        
        this.updateUIBasedOnAuthStatus();
    }

    openModal() {
        this.authModal.displayModal();
    }
}
