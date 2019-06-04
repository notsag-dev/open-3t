const {userService} = require('./services');
const {config} = require('./config');

/**
 * Global THREE inits
 *
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000,
);
camera.lookAt(1, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new THREE.FirstPersonControls(camera);
controls.lookSpeed = 0.3;
controls.movementSpeed = 300;
controls.noFly = true;
controls.lookVertical = true;
controls.constrainVertical = true;
controls.verticalMin = 1.0;
controls.verticalMax = 2.0;
controls.lon = -150;
controls.lat = 120;

const clock = new THREE.Clock();

/**
 * Render function. Executed every frame.
 *
 */
const render = () => {
  renderer.render(scene, camera);
};

/**
 * Animation function. Executed every frame.
 *
 */
const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  controls.update(delta / 7);
  render();
};

/**
 * Scene init: populate scene.
 *
 */
const init = async () => {
  const {data: users} = await userService.getUsers();

  const material = new THREE.MeshBasicMaterial({color: 0xffff00});
  users.forEach(user => {
    const geometry = new THREE.BoxBufferGeometry(
      config.boxSize.width,
      config.boxSize.height,
      config.boxSize.depth);
    const mesh = new THREE.Mesh(geometry, material);
    const loc = user.locationOnGrid;
    mesh.position.set(
      (config.boxSize.width + config.boxPadding) * loc.x,
      (config.boxSize.height + config.boxPadding) * loc.y,
      (config.boxSize.depth + config.boxPadding) * loc.z);
    scene.add(mesh);
  });

  animate();
};

init();
