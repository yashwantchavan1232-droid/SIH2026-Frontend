/**
 * ============================================
 * EVIDENCE PANEL (Day 3)
 * ============================================
 */

let evidenceExpanded = false;

async function loadEvidence(actorId = 'actor1') {
  const evidenceList = document.getElementById('evidence-list');
  const loadingEl = document.getElementById('evidence-loading');
  const expandBtn = document.getElementById('expand-evidence');

  if (!evidenceList) return;

  loadingEl.classList.remove('hidden');

  try {
    const evidence = await API.getEvidence(actorId);

    const confidence = Math.round(evidence.reduce((sum, e) => sum + e.confidence, 0) / evidence.length);
    document.getElementById('evidence-confidence').textContent = confidence + '%';

    evidenceList.innerHTML = evidence.map((e, i) =>
      `<div class="evidence-item ${i >= 3 ? 'hidden-evidence' : ''}">
        <span class="status-icon ${e.status === 'confirmed' ? 'confirmed' : 'partial'}">
          ${e.status === 'confirmed' ? '✓' : '⏺'}
        </span>
        <div>
          <p class="evidence-text">${e.type}: <span class="highlight">${e.value}</span></p>
          <span class="evidence-confidence">confidence ${e.confidence}%</span>
        </div>
      </div>`
    ).join('');

    const hidden = evidenceList.querySelectorAll('.hidden-evidence');
    if (hidden.length === 0) {
      expandBtn.style.display = 'none';
    } else {
      expandBtn.style.display = 'inline';
      expandBtn.textContent = 'expand (' + hidden.length + ')';
    }
  } catch (e) {
    console.warn('Evidence load failed', e);
  } finally {
    loadingEl.classList.add('hidden');
  }
}

// Expand/Collapse evidence
document.addEventListener('DOMContentLoaded', function() {
  const expandBtn = document.getElementById('expand-evidence');
  if (expandBtn) {
    expandBtn.addEventListener('click', function() {
      const hidden = document.querySelectorAll('#evidence-list .hidden-evidence');
      evidenceExpanded = !evidenceExpanded;
      hidden.forEach(el => el.classList.toggle('hidden-evidence', !evidenceExpanded));
      this.textContent = evidenceExpanded ? 'collapse' : 'expand (' + hidden.length + ')';
    });
  }
});

// Make function globally available
window.loadEvidence = loadEvidence;