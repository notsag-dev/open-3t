const {userService} = require('./services');
const {config} = require('./config');
const {cityComponent, floorComponent, skyBoxComponent} = require('./components');

/**
 * Global THREE inits
 *
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  500000,
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
  // Sky box
  const skybox = Object.create(skyBoxComponent);
  await skybox.init();
  scene.add(skybox.component);
  animate();

  // City
  const city = Object.create(cityComponent);
  city.init(10);
  scene.add(city.component);

  // Floor
  const floor = Object.create(floorComponent);
  floor.init(1000);
  scene.add(floor.component);
};

init();
