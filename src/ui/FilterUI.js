import MovieService from '../service/moviesService.js';
export default class FilterUI {
    constructor(filterModalId, movieUI) {
        this.filterModal = document.getElementById(filterModalId);
        this.movieUI = movieUI; // save movieUI reference
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.applyFilterSettings = this.applyFilterSettings.bind(this); // bind this to applyFilterSettings
        this.resetFilterSettings = this.resetFilterSettings.bind(this); // bind this to resetFilterSettings
        this.initializeFilterUI();
    }

    openModal() {
        this.filterModal.style.display = 'block';
    }

    closeModal() {
        this.filterModal.style.display = 'none';
    }

    async initializeFilterUI() {
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

        this.genres = await MovieService.initializeGenres();
        const genreWithFilter = document.getElementById('genreWithFilter');
        const genreWithoutFilter = document.getElementById('genreWithoutFilter');

        Object.entries(this.genres).forEach(([id, name]) => {
            const option = document.createElement('option');
            option.value = id;
            option.innerText = name;

            const optionWith = option.cloneNode(true);
            genreWithFilter.appendChild(optionWith);

            const optionWithout = option.cloneNode(true);
            genreWithoutFilter.appendChild(optionWithout);
        });
    }

    applyFilterSettings() {
        this.filter = this.getFilterSettings();
        this.movieUI.applyFilter(this.filter);
        this.closeModal();
    }

    getFilterSettings() {
        return {
            genreWith: document.getElementById('genreWithFilter').value,
            genreWithout: document.getElementById('genreWithoutFilter').value,
            yearFrom: document.getElementById('yearFromFilter').value,
            yearTo: document.getElementById('yearToFilter').value,
        };
    }

    resetFilterSettings() {
        document.getElementById('genreWithFilter').value = '';
        document.getElementById('genreWithoutFilter').value = '';
        document.getElementById('yearFromFilter').value = '';
        document.getElementById('yearToFilter').value = '';
        this.movieUI.applyFilter(null);
    }
}