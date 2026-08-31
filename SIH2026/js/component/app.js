/**
 * ============================================
 * MAIN APPLICATION - SIH Investigation Dashboard
 * ============================================
 */

// Navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-btn');
  const pages = {
    dashboard: document.getElementById('page-dashboard'),
    search: document.getElementById('page-search'),
    profile: document.getElementById('page-profile'),
    graph: document.getElementById('page-graph'),
    evidence: document.getElementById('page-evidence'),
    report: document.getElementById('page-report')
  };

  navLinks.forEach(btn => {
    btn.addEventListener('click', function() {
      navLinks.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const page = this.dataset.page;
      Object.keys(pages).forEach(key => {
        pages[key].classList.toggle('active', key === page);
        pages[key].classList.toggle('hidden', key !== page);
      });

      // Re-render graph if switching to dashboard
      if (page === 'dashboard' && !window.graphInitialized) {
        loadGraph();
      }
    });
  });

  // Handle window resize for graph
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.graphInitialized && document.getElementById('page-dashboard').classList.contains('active')) {
        loadGraph();
      }
    }, 300);
  });
});

// Initialize Application
async function init() {
  console.log('🚀 SIH Investigation Dashboard initializing...');

  try {
    await Promise.all([
      loadStats(),
      loadActorProfile('actor1'),
      loadEvidence('actor1'),
      loadGraph()
    ]);

    console.log('✅ Dashboard ready!');
    console.log('📋 Endpoints: /stats, /search, /actor/:id, /evidence/:id, /graph');
    console.log('🧠 Confidence: 0.30×stylometry + 0.25×wallet + 0.20×pgp + 0.15×infra + 0.10×timeline');
    console.log('🔧 Backend team: Replace API._data in js/api.js with real database calls');
  } catch (e) {
    console.error('❌ Initialization failed:', e);
  }
}

// Start on DOM ready
document.addEventListener('DOMContentLoaded', init);