const {userService} = require('./services');
const {config} = require('./config');
const {cityComponent, floorComponent, pigComponent, skyBoxComponent} = require('./components');

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
camera.position.set(-200, 20, 0);
camera.lookAt(1, 20, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.FirstPersonControls(camera);
controls.lookSpeed = 0.3;
controls.movementSpeed = 300;
controls.noFly = true;
controls.lookVertical = true;
console.log(controls)

const clock = new THREE.Clock();

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const animationObjects = [];

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
  animationObjects.forEach(obj => (obj.animate(delta)));
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
  await city.init(3);
  scene.add(city.component);

  // Floor
  const floor = Object.create(floorComponent);
  floor.init(1000);
  scene.add(floor.component);

  // Pig
  const pig = Object.create(pigComponent);
  await pig.init({x: 0, y: 300, z: 0});
  scene.add(pig.component);
  animationObjects.push(pig);
};

init();
