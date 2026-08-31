/**
 * ============================================
 * SEARCH FUNCTIONALITY (Day 2)
 * ============================================
 */

let searchTimeout;

function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchLoading = document.getElementById('search-loading');
  const searchError = document.getElementById('search-error');

  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const query = this.value.trim();

    if (query.length < 2) {
      searchResults.classList.add('hidden');
      searchResults.innerHTML = '';
      searchLoading.classList.add('hidden');
      searchError.classList.add('hidden');
      return;
    }

    searchLoading.classList.remove('hidden');
    searchError.classList.add('hidden');
    searchResults.classList.add('hidden');

    searchTimeout = setTimeout(async () => {
      try {
        const results = await API.search(query);
        searchLoading.classList.add('hidden');

        if (results.length === 0) {
          searchResults.innerHTML = '<div class="text-gray-400 text-sm p-2">No results found</div>';
        } else {
          searchResults.innerHTML = results.map(r =>
            `<div class="result-item">
              <span class="result-type">${r.type}</span>
              <span class="result-name">${r.name}</span>
            </div>`
          ).join('');
        }
        searchResults.classList.remove('hidden');
      } catch (e) {
        searchLoading.classList.add('hidden');
        searchError.classList.remove('hidden');
        searchError.textContent = '⚠️ ' + (e.message || 'Search failed');
        searchError.classList.add('error-shake');
        setTimeout(() => {
          searchError.classList.add('hidden');
          searchError.classList.remove('error-shake');
        }, 3000);
      }
    }, 300);
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initSearch);