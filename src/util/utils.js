export function createButton(label, isEnabled, onClick) {
    const button = document.createElement('button');
    button.innerText = label;
    button.disabled = !isEnabled;
    button.addEventListener('click', onClick);
    return button;
}

export function createInput(type, min, max, value, onEnter) {
    const input = document.createElement('input');
    input.type = type;
    input.min = min;
    input.max = max;
    input.value = value;

    input.addEventListener('keyup', (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            onEnter();
        }
    });

    return input;
}
