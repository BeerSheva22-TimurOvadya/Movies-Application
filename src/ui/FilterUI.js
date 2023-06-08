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

            <div class="filter-section">
                <label for="genreWithFilter">With Genre:</label>
                <select id="genreWithFilter">
                    <option value="">Select genre</option>                    
                    <!-- Здесь будут варианты выбора категорий фильмов -->
                </select>

                <label for="genreWithoutFilter">Without Genre:</label>
                <select id="genreWithoutFilter">
                    <option value="">Select genre</option>                    
                    <!-- Здесь будут варианты выбора категорий фильмов -->
                </select>
            </div>            

            <div class="filter-section">
                <label for="yearFromFilter">Year From:</label>
                <input type="text" id="yearFromFilter" placeholder="Select year">
            </div>
            <div class="filter-section">
                <label for="yearToFilter">Year To:</label>
                <input type="text" id="yearToFilter" placeholder="Select year">
            </div>

            <button id="resetFilterBtn" class="button">Reset Filter</button>
            <button id="applyFilterBtn" class="button">Apply Filter</button>
        </div>
    `;

        const closeBtn = document.getElementById('filterCloseBtn');
        closeBtn.addEventListener('click', this.closeModal);  

        const applyFilterBtn = document.getElementById('applyFilterBtn');
        applyFilterBtn.addEventListener('click', this.applyFilterSettings);

        const resetFilterBtn = document.getElementById('resetFilterBtn');
        resetFilterBtn.addEventListener('click', this.resetFilterSettings);
    }

    applyFilterSettings() {
        // Handle the filter settings and apply them
        console.log('Filter settings applied');
        return true;
    }

    resetFilterSettings() {
        // Handle the filter settings and apply them
        console.log('Filter settings reseted');
    }
}
