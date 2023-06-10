import { createButton, createInput } from '../util/utils.js';

export default class PaginationUI {
    constructor(paginationContainerId) {
        this.paginationContainer = document.getElementById(paginationContainerId);
    }

    displayPagination(currentPage, totalPages) {
        this.paginationContainer.innerHTML = ''; 

        const prevBtn = createButton('Previous', currentPage > 1, () =>
            this.movieUI.navigateToPage(currentPage - 1, totalPages),
        );

        const nextBtn = createButton('Next', currentPage < totalPages, () =>
            this.movieUI.navigateToPage(currentPage + 1, totalPages),
        );

        const pageInput = createInput('number', 1, totalPages, currentPage, () =>
            this.movieUI.navigateToPage(parseInt(pageInput.value), totalPages),
        );

        const pageInputBtn = createButton('Go', true, () =>
            this.movieUI.navigateToPage(parseInt(pageInput.value), totalPages),
        );

        this.paginationContainer.append(prevBtn, pageInput, pageInputBtn, nextBtn);
    }

    setMovieUI(movieUI) {
        this.movieUI = movieUI;
    }

    
}