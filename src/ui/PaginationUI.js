export default class PaginationUI {
    constructor(paginationContainerId) {
        this.paginationContainer = document.getElementById(paginationContainerId);
    }

    createNavigationButton(label, isEnabled, onClick) {
        const button = document.createElement('button');
        button.innerText = label;
        button.disabled = !isEnabled;
        button.addEventListener('click', onClick);
        return button;
    }

    createPageInput(currentPage, totalPages) {
        const pageInput = document.createElement('input');
        pageInput.type = 'number';
        pageInput.min = 1;
        pageInput.max = totalPages;
        pageInput.value = currentPage;

        pageInput.addEventListener('keyup', (event) => {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                event.preventDefault();
                this.movieUI.navigateToPage(parseInt(pageInput.value), totalPages);
            }
        });

        return pageInput;
    }

    displayPagination(currentPage, totalPages) {
        this.paginationContainer.innerHTML = ""; // Clear the container

        const prevBtn = this.createNavigationButton(
            'Previous',
            currentPage > 1,
            () => this.movieUI.navigateToPage(currentPage - 1, totalPages)
        );

        const nextBtn = this.createNavigationButton(
            'Next',
            currentPage < totalPages,
            () => this.movieUI.navigateToPage(currentPage + 1, totalPages)
        );

        const pageInput = this.createPageInput(currentPage, totalPages);

        const pageInputBtn = this.createNavigationButton(
            'Go',
            true,
            () => this.movieUI.navigateToPage(parseInt(pageInput.value), totalPages)
        );

        this.paginationContainer.appendChild(prevBtn);
        this.paginationContainer.appendChild(pageInput);
        this.paginationContainer.appendChild(pageInputBtn);
        this.paginationContainer.appendChild(nextBtn);
    }

    setMovieUI(movieUI) {
        this.movieUI = movieUI;
    }
}
