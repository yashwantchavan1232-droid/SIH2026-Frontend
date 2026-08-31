/**
 * ============================================
 * THREE.JS 3D BACKGROUND
 * ============================================
 */

(function() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Stars
  const geometry = new THREE.BufferGeometry();
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 0.25,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Floating Cubes
  const cubeMat = new THREE.MeshStandardMaterial({
    color: 0x2244aa,
    emissive: 0x113366,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });

  const cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), cubeMat);
  cube.position.set(10, 5, -20);
  scene.add(cube);

  const cube2 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), cubeMat);
  cube2.position.set(-15, -8, 10);
  scene.add(cube2);

  // Lighting
  const ambient = new THREE.AmbientLight(0x404060);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0x88ccff, 0.5);
  light.position.set(10, 20, 10);
  scene.add(light);

  camera.position.z = 40;

  // Mouse Interaction
  let mouseX = 0,
    mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.008;
    cube2.rotation.x -= 0.004;
    cube2.rotation.z += 0.006;
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.01;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();