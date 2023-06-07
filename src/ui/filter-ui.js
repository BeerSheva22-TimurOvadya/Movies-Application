export function openFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.style.display = 'block';
  }
  
  export function closeFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.style.display = 'none';
  }
  
  export function initializeFilterUI() {
    const filterBtn = document.getElementById('filterBtn');
    filterBtn.addEventListener('click', openFilterModal);
  
    // Add your filter settings and buttons here
    const filterModalContent = document.querySelector('#filterModal .modal-content');
    filterModalContent.innerHTML = `
      <span id="filterCloseBtn" class="close">&times;</span>
      <h2>Filter Settings</h2>
      <!-- Add your filter settings and buttons here -->
      <button id="applyFilterBtn" class="button">Apply Filter</button>
    `;
  
    const closeBtn = document.getElementById('filterCloseBtn');
    closeBtn.addEventListener('click', closeFilterModal);
  
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    applyFilterBtn.addEventListener('click', applyFilterSettings);
  }
  
  function applyFilterSettings() {
    // Handle the filter settings and apply them
    console.log('Filter settings applied');
  }
  
  // Move the following line inside initializeFilterUI function
  document.addEventListener('DOMContentLoaded', initializeFilterUI);
  