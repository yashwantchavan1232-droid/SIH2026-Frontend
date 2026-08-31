/**
 * ============================================
 * API SERVICE LAYER - FAKE DATA (Production Ready)
 * Backend Team: Replace with real API calls later
 * ============================================
 */

const API = {
  // ==========================================
  // REALISTIC FAKE DATA
  // ==========================================
  _data: {
    // Dashboard Stats
    stats: {
      actors: 47,
      aliases: 132,
      wallets: 84,
      pgp: 29,
      relationships: 203
    },

    // Actor Profiles (10+ actors)
    actors: [
      {
        id: 'actor1',
        name: '0xMarlin',
        confidence: 92,
        aliases: 4,
        wallets: 3,
        pgp: 2,
        posts: 17,
        tags: ['#darknet', '#crypto', '#opsec'],
        lastActive: '2h ago',
        connections: 14
      },
      {
        id: 'actor2',
        name: 'CypherGhost',
        confidence: 88,
        aliases: 5,
        wallets: 2,
        pgp: 1,
        posts: 9,
        tags: ['#privacy', '#tor', '#anonymous'],
        lastActive: '1d ago',
        connections: 8
      },
      {
        id: 'actor3',
        name: 'ShadowWalker',
        confidence: 95,
        aliases: 3,
        wallets: 4,
        pgp: 3,
        posts: 24,
        tags: ['#hacking', '#cyber', '#infosec'],
        lastActive: '30min ago',
        connections: 22
      },
      {
        id: 'actor4',
        name: 'CryptoKing',
        confidence: 78,
        aliases: 6,
        wallets: 5,
        pgp: 1,
        posts: 12,
        tags: ['#bitcoin', '#defi', '#trading'],
        lastActive: '3h ago',
        connections: 11
      },
      {
        id: 'actor5',
        name: 'PhantomNet',
        confidence: 91,
        aliases: 2,
        wallets: 1,
        pgp: 2,
        posts: 31,
        tags: ['#darkweb', '#market', '#drugs'],
        lastActive: '15min ago',
        connections: 27
      },
      {
        id: 'actor6',
        name: 'ZeroTrace',
        confidence: 84,
        aliases: 7,
        wallets: 3,
        pgp: 0,
        posts: 8,
        tags: ['#anonymous', '#protest', '#activism'],
        lastActive: '5h ago',
        connections: 6
      },
      {
        id: 'actor7',
        name: 'DataMiner',
        confidence: 93,
        aliases: 4,
        wallets: 6,
        pgp: 4,
        posts: 42,
        tags: ['#data', '#leaks', '#whistleblower'],
        lastActive: '1h ago',
        connections: 33
      },
      {
        id: 'actor8',
        name: 'RansomKing',
        confidence: 69,
        aliases: 8,
        wallets: 7,
        pgp: 1,
        posts: 15,
        tags: ['#ransomware', '#malware', '#cybercrime'],
        lastActive: '12h ago',
        connections: 19
      }
    ],

    // Evidence Panel
    evidence: [
      {
        id: 'e1',
        type: 'wallet',
        value: '0x3f2a...b1e',
        confidence: 89,
        status: 'confirmed'
      },
      {
        id: 'e2',
        type: 'pgp',
        value: '0xA1F3...C7D2',
        confidence: 96,
        status: 'confirmed'
      },
      {
        id: 'e3',
        type: 'infra',
        value: 'ASN 1234 (AWS)',
        confidence: 74,
        status: 'partial'
      },
      {
        id: 'e4',
        type: 'timeline',
        value: 'Overlap: 3h window',
        confidence: 68,
        status: 'partial'
      },
      {
        id: 'e5',
        type: 'stylometry',
        value: 'Writing style match',
        confidence: 92,
        status: 'confirmed'
      },
      {
        id: 'e6',
        type: 'network',
        value: 'Same VPN exit node',
        confidence: 81,
        status: 'confirmed'
      },
      {
        id: 'e7',
        type: 'behavioral',
        value: 'Similar activity patterns',
        confidence: 77,
        status: 'partial'
      }
    ],

    // Search Results
    searchResults: [
      { type: 'actor', name: '0xMarlin', id: 'actor1' },
      { type: 'actor', name: 'CypherGhost', id: 'actor2' },
      { type: 'actor', name: 'ShadowWalker', id: 'actor3' },
      { type: 'actor', name: 'CryptoKing', id: 'actor4' },
      { type: 'actor', name: 'PhantomNet', id: 'actor5' },
      { type: 'actor', name: 'ZeroTrace', id: 'actor6' },
      { type: 'actor', name: 'DataMiner', id: 'actor7' },
      { type: 'actor', name: 'RansomKing', id: 'actor8' },
      { type: 'alias', name: 'shadow', id: 'alias0' },
      { type: 'alias', name: 'ghost', id: 'alias1' },
      { type: 'alias', name: 'darklord', id: 'alias2' },
      { type: 'alias', name: 'hackerone', id: 'alias3' },
      { type: 'wallet', name: '0x3f2a...b1e', id: 'wallet0' },
      { type: 'wallet', name: '0x1b4d...c2f', id: 'wallet1' },
      { type: 'wallet', name: '0x9e7a...d3b', id: 'wallet2' },
      { type: 'pgp', name: '0xA1F3...C7D2', id: 'pgp0' },
      { type: 'pgp', name: '0xB7C2...E8A1', id: 'pgp1' }
    ],

    // Graph Data (D3)
    graph: {
      nodes: [
        { id: 'Actor0', group: 0, label: '0xMarlin' },
        { id: 'Actor1', group: 0, label: 'CypherGhost' },
        { id: 'Actor2', group: 0, label: 'ShadowWalker' },
        { id: 'Actor3', group: 0, label: 'CryptoKing' },
        { id: 'Actor4', group: 0, label: 'PhantomNet' },
        { id: 'Actor5', group: 0, label: 'ZeroTrace' },
        { id: 'Actor6', group: 0, label: 'DataMiner' },
        { id: 'Actor7', group: 0, label: 'RansomKing' },
        { id: 'Alias0', group: 1, label: 'shadow' },
        { id: 'Alias1', group: 1, label: 'ghost' },
        { id: 'Alias2', group: 1, label: 'darklord' },
        { id: 'Alias3', group: 1, label: 'hackerone' },
        { id: 'Wallet0', group: 2, label: '0x3f2a...' },
        { id: 'Wallet1', group: 2, label: '0x1b4d...' },
        { id: 'Wallet2', group: 2, label: '0x9e7a...' },
        { id: 'PGP0', group: 3, label: '0xA1F3' },
        { id: 'PGP1', group: 3, label: '0xB7C2' },
        { id: 'Post0', group: 4, label: 'post#1' },
        { id: 'Post1', group: 4, label: 'post#2' },
        { id: 'Post2', group: 4, label: 'post#3' },
        { id: 'Post3', group: 4, label: 'post#4' },
        { id: 'Infra0', group: 5, label: 'ASN 1234' },
        { id: 'Infra1', group: 5, label: 'ASN 5678' },
        { id: 'Infra2', group: 5, label: 'VPN Exit' }
      ],
      links: [
        { source: 'Actor0', target: 'Alias0' },
        { source: 'Actor0', target: 'Wallet0' },
        { source: 'Actor0', target: 'PGP0' },
        { source: 'Actor0', target: 'Post0' },
        { source: 'Actor1', target: 'Alias1' },
        { source: 'Actor1', target: 'Wallet1' },
        { source: 'Actor1', target: 'PGP1' },
        { source: 'Actor1', target: 'Post1' },
        { source: 'Actor2', target: 'Alias2' },
        { source: 'Actor2', target: 'Wallet2' },
        { source: 'Actor2', target: 'Infra0' },
        { source: 'Actor3', target: 'Alias3' },
        { source: 'Actor3', target: 'Wallet0' },
        { source: 'Actor4', target: 'Infra1' },
        { source: 'Actor4', target: 'Post2' },
        { source: 'Actor5', target: 'Infra2' },
        { source: 'Actor6', target: 'PGP0' },
        { source: 'Actor6', target: 'Post3' },
        { source: 'Actor7', target: 'Wallet1' },
        { source: 'Alias0', target: 'Wallet1' },
        { source: 'Wallet0', target: 'PGP0' },
        { source: 'PGP1', target: 'Infra0' },
        { source: 'Infra1', target: 'Infra2' },
        { source: 'Post0', target: 'Wallet2' },
        { source: 'Post1', target: 'Alias2' },
        { source: 'Post2', target: 'PGP1' },
        { source: 'Post3', target: 'Alias3' }
      ]
    }
  },

  // ==========================================
  // FAKE API ENDPOINTS (Fast Response)
  // ==========================================

  async getStats() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this._data.stats), 200);
    });
  },

  async search(query) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!query || query.length < 2) {
          reject({ message: 'Query too short' });
          return;
        }
        const results = this._data.searchResults.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },

  async getActor(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const actor = this._data.actors.find(a => a.id === id);
        actor ? resolve(actor) : reject({ message: 'Actor not found' });
      }, 200);
    });
  },

  async getEvidence(actorId) {
    return new Promise(resolve => {
      setTimeout(() => resolve(this._data.evidence), 200);
    });
  },

  async getGraph() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this._data.graph), 200);
    });
  },

  // Realistic Search Suggestions
  async getSearchSuggestions(query) {
    return new Promise(resolve => {
      const suggestions = [
        '0xMarlin',
        'CypherGhost',
        'ShadowWalker',
        'CryptoKing',
        'PhantomNet',
        'ZeroTrace',
        'DataMiner',
        'RansomKing',
        '0x3f2a...b1e',
        '0xA1F3...C7D2'
      ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
      resolve(suggestions);
    });
  },

  // Confidence Engine (Member 3)
  async getConfidence(actorId) {
    return new Promise(resolve => {
      const scores = {
        actor1: { confidence: 92, explanation: 'Stylometry: 92%, Wallet: 89%, PGP: 96%' },
        actor2: { confidence: 88, explanation: 'Stylometry: 85%, Wallet: 82%, PGP: 78%' },
        actor3: { confidence: 95, explanation: 'Stylometry: 94%, Wallet: 91%, PGP: 98%' },
        actor4: { confidence: 78, explanation: 'Stylometry: 72%, Wallet: 88%, PGP: 65%' },
        actor5: { confidence: 91, explanation: 'Stylometry: 93%, Wallet: 87%, PGP: 90%' },
        actor6: { confidence: 84, explanation: 'Stylometry: 86%, Wallet: 79%, PGP: 82%' },
        actor7: { confidence: 93, explanation: 'Stylometry: 95%, Wallet: 89%, PGP: 94%' },
        actor8: { confidence: 69, explanation: 'Stylometry: 65%, Wallet: 72%, PGP: 58%' }
      };
      resolve(scores[actorId] || { confidence: 85, explanation: 'Default confidence' });
    });
  },

  // Stylometry (Member 2)
  async analyzeStylometry(textA, textB) {
    return new Promise(resolve => {
      const similarity = Math.random() * 0.3 + 0.6;
      resolve({ 
        similarity: Math.round(similarity * 100) / 100,
        matched: similarity > 0.75,
        features: {
          vocabulary: Math.round(similarity * 90 + 10),
          syntax: Math.round(similarity * 85 + 15),
          punctuation: Math.round(similarity * 80 + 20)
        }
      });
    });
  },

  // Timeline Analysis
  async getTimeline(actorId) {
    return new Promise(resolve => {
      const timeline = [
        { time: '2026-08-31 14:23', event: 'Login from TOR exit node' },
        { time: '2026-08-31 13:45', event: 'Wallet transaction: 0.5 BTC' },
        { time: '2026-08-31 12:10', event: 'PGP key used for encryption' },
        { time: '2026-08-31 10:30', event: 'Post published on forum' },
        { time: '2026-08-30 22:15', event: 'Activity on darknet market' }
      ];
      resolve(timeline);
    });
  },

  // Generate PDF (Fake)
  async generatePDF(data) {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        url: '/reports/report-' + new Date().toISOString().slice(0,10) + '.pdf',
        size: '2.4MB',
        pages: 4,
        generatedAt: new Date().toISOString()
      }), 500);
    });
  }
};

// Make API globally available
window.API = API;

console.log('✅ API Ready with Fake Data!');
console.log('📊 Data:', API._data.stats);
console.log('👤 Actors:', API._data.actors.length);
console.log('✓ Evidence:', API._data.evidence.length);
console.log('🌐 Graph Nodes:', API._data.graph.nodes.length);
console.log('🔗 Graph Links:', API._data.graph.links.length);