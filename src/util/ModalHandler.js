export default class ModalHandler {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeModal = this.closeModal.bind(this);
    }

    displayModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    setModalContent(content) {
        this.modal.innerHTML = content;
    }

    addCloseListener() {
        const span = this.modal.getElementsByClassName('close')[0];
        span.onclick = this.closeModal;
    }
}
