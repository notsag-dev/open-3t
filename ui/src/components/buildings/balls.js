const {building} = require('./building');
const {config} = require('../../config');

const balls = Object.create(building);

balls.init = function(width, height, depth) {
  building.init.call(this, width, height, depth);

  this.materials = this.createMaterials();
  this.balls = this.createBalls(height * 5);
  this.balls.forEach(ball => this.component.add(ball));
};

balls.createMaterials = function() {
  const colors = [0xff9090, 0xeef1ff, 0xffffcc, 0x0000ff, 0xff0000, 0x52ff6a];
  return colors.map(c => this.createLightMaterial(c));
};

balls.getRandomPointInBox = function(maxRad) {
  const width = this.width - maxRad * 2;
  const height = this.height - maxRad * 2;
  const depth = this.depth - maxRad * 2;
  return {
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * depth - depth / 2,
  };
};

balls.createBalls = function(number) {
  const res = [];
  for (let i = 0; i < number; i++) {
    const maxRad = config.balls.maxRadius;
    const sphSize = Math.floor(Math.random() * maxRad);
    const geometry = new THREE.SphereGeometry(sphSize, 8, 8);
    const matInd = Math.floor(Math.random() * this.materials.length);
    const material = this.materials[matInd];
    const pos = this.getRandomPointInBox(maxRad);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, pos.y, pos.z);
    res.push(mesh);
  }
  return res;
};

balls.createLightMaterial = function(color) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
};

module.exports = {balls};
