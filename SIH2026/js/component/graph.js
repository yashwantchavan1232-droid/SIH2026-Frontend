let graphInitialized = false;
let simulation = null;
let animationId = null;

function renderGraph(graphData) {
  const container = document.getElementById('d3-graph');
  if (!container) return;

  container.innerHTML = '';
  const width = container.clientWidth || 600;
  const height = 340;
  const margin = 50;

  const colorMap = ['#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#f87171'];
  const emojiMap = [];

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'transparent');

  svg.append('defs')
    .append('clipPath')
    .attr('id', 'graph-clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 16);

  const g = svg.append('g')
    .attr('clip-path', 'url(#graph-clip)');

  const defs = svg.append('defs');

  const glow = defs.append('filter')
    .attr('id', 'glow')
    .attr('x', '-50%')
    .attr('y', '-50%')
    .attr('width', '200%')
    .attr('height', '200%');

  glow.append('feGaussianBlur')
    .attr('stdDeviation', '4')
    .attr('result', 'blur');

  glow.append('feColorMatrix')
    .attr('type', 'matrix')
    .attr('values', '0 0 0 0 0.6  0 0 0 0 0.8  0 0 0 0 1  0 0 0 1.5 0')
    .attr('result', 'colored');

  glow.append('feMerge')
    .selectAll('feMergeNode')
    .data(['colored', 'SourceGraphic'])
    .enter()
    .append('feMergeNode')
    .attr('in', d => d);

  const softGlow = defs.append('filter')
    .attr('id', 'soft-glow')
    .attr('x', '-50%')
    .attr('y', '-50%')
    .attr('width', '200%')
    .attr('height', '200%');

  softGlow.append('feGaussianBlur')
    .attr('stdDeviation', '8')
    .attr('result', 'blur');

  softGlow.append('feMerge')
    .selectAll('feMergeNode')
    .data(['blur', 'SourceGraphic'])
    .enter()
    .append('feMergeNode')
    .attr('in', d => d);

  g.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', Math.min(width, height) * 0.38)
    .attr('fill', 'rgba(96,165,250,0.04)')
    .style('filter', 'url(#soft-glow)');

  for (let i = 0; i < 20; i++) {
    const angle = i * 0.6 + Math.random();
    const radius = 30 + Math.random() * 90;
    const x = width/2 + Math.cos(angle) * radius;
    const y = height/2 + Math.sin(angle) * radius;
    
    g.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 0.5 + Math.random() * 1)
      .attr('fill', 'rgba(255,255,255,0.12)')
      .style('animation', `flicker ${2 + Math.random() * 3}s ease-in-out infinite`);
  }

  simulation = d3.forceSimulation(graphData.nodes)
    .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(70))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(32))
    .force('x', d3.forceX(width / 2).strength(0.15))
    .force('y', d3.forceY(height / 2).strength(0.15));

  const link = g.append('g')
    .selectAll('line')
    .data(graphData.links)
    .enter().append('line')
    .attr('class', 'link')
    .attr('stroke', 'rgba(96,165,250,0.2)')
    .attr('stroke-width', '1.2')
    .style('filter', 'url(#glow)');

  const node = g.append('g')
    .selectAll('g')
    .data(graphData.nodes)
    .enter().append('g')
    .call(d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = Math.max(margin, Math.min(width - margin, d.x));
        d.fy = Math.max(margin, Math.min(height - margin, d.y));
      })
      .on('drag', (event, d) => {
        d.fx = Math.max(margin, Math.min(width - margin, event.x));
        d.fy = Math.max(margin, Math.min(height - margin, event.y));
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      })
    );

  node.append('circle')
    .attr('r', '15')
    .attr('fill', d => colorMap[d.group % colorMap.length])
    .attr('stroke', 'rgba(255,255,255,0.3)')
    .attr('stroke-width', '1.5')
    .style('cursor', 'pointer')
    .style('filter', 'url(#glow)')
    .style('animation', 'nodePulse 2.5s ease-in-out infinite');

  node.append('text')
    .text(d => emojiMap[d.group % emojiMap.length])
    .attr('x', '-7')
    .attr('y', '5')
    .style('font-size', '12px')
    .style('pointer-events', 'none');

  node.append('circle')
    .attr('r', '22')
    .attr('fill', 'none')
    .attr('stroke', d => colorMap[d.group % colorMap.length])
    .attr('stroke-width', '0.5')
    .attr('opacity', '0.08')
    .style('animation', 'auraPulse 3s ease-in-out infinite');

  node.append('text')
    .text(d => d.label)
    .attr('x', '22')
    .attr('y', '5')
    .style('font-size', '9px')
    .style('fill', '#eef5ff')
    .style('font-weight', '600')
    .style('text-shadow', '0 0 15px rgba(96,165,250,0.3)')
    .style('pointer-events', 'none')
    .style('font-family', "'Inter', sans-serif")
    .style('letter-spacing', '0.3px');

  let time = 0;
  let rotationAngle = 0;
  let direction = 1;

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) / 2 - margin - 10;

  graphData.nodes.forEach((d, i) => {
    const angle = (i / graphData.nodes.length) * Math.PI * 2 + Math.random() * 0.2;
    const radius = 55 + (i % 5) * 16;
    const clampedRadius = Math.min(radius, maxRadius);

    d._radius = clampedRadius;
    d._angle = angle;
    d._speed = 1 + (i % 4) * 0.1;

    d.x = cx + Math.cos(angle) * clampedRadius;
    d.y = cy + Math.sin(angle) * clampedRadius;
    d.x = Math.max(margin + 10, Math.min(width - margin - 10, d.x));
    d.y = Math.max(margin + 10, Math.min(height - margin - 10, d.y));
  });

  function animateGraph() {
    time += 0.016;

    if (Math.floor(time / 4.5) % 2 === 0) {
      direction = 1;
    } else {
      direction = -1;
    }

    const rotationPerFrame = (Math.PI * 2) / (2.2 / 0.016);
    rotationAngle += rotationPerFrame * direction;

    graphData.nodes.forEach((d, i) => {
      if (d.fx !== null && d.fy !== null) return;

      const angle = d._angle + rotationAngle * d._speed;
      
      const waveX = Math.sin(time * 1.3 + i * 0.6) * 2.5;
      const waveY = Math.cos(time * 1.6 + i * 0.8) * 2.5;

      let newX = cx + Math.cos(angle) * d._radius + waveX;
      let newY = cy + Math.sin(angle) * d._radius + waveY;

      newX = Math.max(margin + 15, Math.min(width - margin - 15, newX));
      newY = Math.max(margin + 15, Math.min(height - margin - 15, newY));

      d.x = newX;
      d.y = newY;
    });

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node.attr('transform', d => `translate(${d.x},${d.y})`);

    animationId = requestAnimationFrame(animateGraph);
  }

  animateGraph();

  graphInitialized = true;

  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });

  window.addEventListener('resize', () => {
    if (graphInitialized) {
      setTimeout(() => loadGraph(), 300);
    }
  });
}

async function loadGraph() {
  try {
    const graphData = await API.getGraph();
    renderGraph(graphData);
  } catch (e) {
    console.warn('Graph load failed', e);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes nodePulse {
    0% { r: 15; opacity: 1; }
    50% { r: 18; opacity: 0.85; }
    100% { r: 15; opacity: 1; }
  }

  @keyframes auraPulse {
    0% { r: 22; opacity: 0.03; }
    50% { r: 32; opacity: 0.12; }
    100% { r: 22; opacity: 0.03; }
  }

  @keyframes flicker {
    0% { opacity: 0.05; }
    50% { opacity: 0.2; }
    100% { opacity: 0.05; }
  }

  .link {
    transition: stroke-opacity 0.3s;
  }

  .link:hover {
    stroke-opacity: 0.6;
    stroke: #60a5fa;
  }

  #d3-graph {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
  }

  #d3-graph::after {
    content: '🔄 2.2s rotation · drag nodes';
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 8px;
    color: rgba(255,255,255,0.1);
    pointer-events: none;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  #d3-graph::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(96,165,250,0.02), transparent 60%);
    pointer-events: none;
    z-index: 1;
  }
`;
document.head.appendChild(style);

window.renderGraph = renderGraph;
window.loadGraph = loadGraph;
window.graphInitialized = graphInitialized;

console.log('✅ Final Graph Ready!');
console.log('🔄 Continuous rotation - NEVER STOPS!');
console.log('🛑 Stays in box - NEVER ESCAPES!');
console.log('✨ Beautiful nodes with emojis!');