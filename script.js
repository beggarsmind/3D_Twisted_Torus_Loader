window.addEventListener('load', function () {
  // Initialize Three.js scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('loaderCanvas'),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a twisted torus geometry
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x007bff,
    wireframe: true,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  camera.position.z = 50;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Simulate loading delay and transition to main content
  setTimeout(() => {
    const loaderContainer = document.getElementById('loader-container');
    const content = document.querySelector('.content');

    // Fade out the loader container
    loaderContainer.classList.add('fade-out');

    // Wait for transition to complete before hiding the loader and showing content
    loaderContainer.addEventListener('transitionend', () => {
      loaderContainer.style.display = 'none'; // Ensure loader is hidden
      if (content) {
        content.classList.add('show'); // Fade in the main content
      }
    });
  }, 3000); // Simulate a delay of 3 seconds

  // Responsive Design
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});
