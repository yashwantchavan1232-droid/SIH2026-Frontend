/**
 * ============================================
 * REPORT EXPORT (Day 3)
 * ============================================
 */

function exportJSON() {
  const data = {
    stats: API._data.stats,
    actors: API._data.actors,
    evidence: API._data.evidence,
    graph: API._data.graph,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, 'report.json');
  showExportStatus('✅ JSON exported');
}

function exportCSV() {
  const rows = [
    ['Type', 'Name', 'ID', 'Confidence']
  ];

  API._data.actors.forEach(a => {
    rows.push(['Actor', a.name, a.id, a.confidence]);
  });

  API._data.evidence.forEach(e => {
    rows.push(['Evidence', e.type, e.value, e.confidence]);
  });

  const csv = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadBlob(blob, 'report.csv');
  showExportStatus('✅ CSV exported');
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('SIH Investigation Report', 20, 30);

  doc.setFontSize(12);
  doc.text('Generated: ' + new Date().toLocaleString(), 20, 45);
  doc.text('Actors: ' + API._data.stats.actors, 20, 60);
  doc.text('Aliases: ' + API._data.stats.aliases, 20, 70);
  doc.text('Wallets: ' + API._data.stats.wallets, 20, 80);
  doc.text('PGP Keys: ' + API._data.stats.pgp, 20, 90);
  doc.text('Relationships: ' + API._data.stats.relationships, 20, 100);

  doc.text('--- Evidence ---', 20, 115);
  API._data.evidence.forEach((e, i) => {
    doc.text(`${e.type}: ${e.value} (${e.confidence}%)`, 20, 125 + i * 10);
  });

  doc.save('report.pdf');
  showExportStatus('✅ PDF generated');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showExportStatus(msg) {
  const el = document.getElementById('export-status');
  if (!el) return;

  el.classList.remove('hidden');
  el.textContent = msg;
  setTimeout(() => el.classList.add('hidden'), 3000);
}

// Initialize export buttons
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('export-json')?.addEventListener('click', exportJSON);
  document.getElementById('export-csv')?.addEventListener('click', exportCSV);
  document.getElementById('export-pdf')?.addEventListener('click', exportPDF);

  // Update last export time
  const lastExport = document.getElementById('last-export');
  if (lastExport) {
    lastExport.textContent = new Date().toLocaleString();
  }
});

// Make functions globally available
window.exportJSON = exportJSON;
window.exportCSV = exportCSV;
window.exportPDF = exportPDF;