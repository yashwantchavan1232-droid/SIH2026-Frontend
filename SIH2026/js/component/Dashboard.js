/**
 * ============================================
 * DASHBOARD STATS (Day 2)
 * ============================================
 */

async function loadStats() {
  try {
    const stats = await API.getStats();
    document.querySelectorAll('.stat-value').forEach(el => {
      const key = el.dataset.stat;
      if (stats[key] !== undefined) {
        el.textContent = stats[key];
      }
    });
  } catch (e) {
    console.warn('Stats load failed', e);
  }
}

// Make function globally available
window.loadStats = loadStats;