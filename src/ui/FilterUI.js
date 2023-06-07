export default class FilterUI {
    constructor(filterModalId) {
        this.filterModal = document.getElementById(filterModalId);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initializeFilterUI();
    }

    openModal() {
        this.filterModal.style.display = 'block';
    }

    closeModal() {
        this.filterModal.style.display = 'none';
    }

    initializeFilterUI() {
        this.filterModal.innerHTML = `
            <div class="modal-content">
                <span id="filterCloseBtn" class="close">&times;</span>
                <h2>Filter Settings</h2>
                <!-- Add your filter settings and buttons here -->
                <button id="applyFilterBtn" class="button">Apply Filter</button>
            </div>
        `;

        const closeBtn = document.getElementById('filterCloseBtn');
        closeBtn.addEventListener('click', this.closeModal);  

        const applyFilterBtn = document.getElementById('applyFilterBtn');
        applyFilterBtn.addEventListener('click', this.applyFilterSettings);
    }

    applyFilterSettings() {
        // Handle the filter settings and apply them
        console.log('Filter settings applied');
    }
}
