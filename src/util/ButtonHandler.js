export default class ButtonHandler {
    addButtonListener(buttonId, onClick) {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', onClick);
    }
}
