/**
 * ============================================
 * ACTOR PROFILE (Day 2)
 * ============================================
 */

async function loadActorProfile(actorId = 'actor1') {
  const loadingEl = document.getElementById('profile-loading');
  if (!loadingEl) return;

  loadingEl.classList.remove('hidden');

  try {
    const actor = await API.getActor(actorId);

    document.getElementById('actor-name').textContent = actor.name;
    document.getElementById('actor-confidence').textContent = actor.confidence + '%';
    document.getElementById('actor-aliases').textContent = actor.aliases;
    document.getElementById('actor-wallets').textContent = actor.wallets;
    document.getElementById('actor-pgp').textContent = actor.pgp;
    document.getElementById('actor-posts').textContent = actor.posts;
    document.getElementById('actor-last-active').textContent = '📅 last active: ' + actor.lastActive;
    document.getElementById('actor-connections').textContent = '🔗 ' + actor.connections + ' connections';

    const tagsContainer = document.getElementById('actor-tags');
    tagsContainer.innerHTML = actor.tags.map(t =>
      `<span>${t}</span>`
    ).join('');
  } catch (e) {
    console.warn('Profile load failed', e);
  } finally {
    loadingEl.classList.add('hidden');
  }
}

// Make function globally available
window.loadActorProfile = loadActorProfile;