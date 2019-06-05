const {building} = require('./building');
const {config} = require('../../config');

const balls = {
  init(width, height, depth) {
    const group = new THREE.Group();
    const b = Object.create(building);
    b.init(width, height, depth);
    group.add(b.component);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.materials = this.createMaterials();
    this.balls = this.createBalls(height * 10);
    console.log(this.balls)
    this.balls.forEach(ball => (group.add(ball)));
    this.component = group;
  },

  createMaterials() {
    const colors = [0xff9090, 0xeef1ff, 0xffffcc, 0x0000ff, 0xff0000, 0x52ff6a];
    return colors.map(c => this.createLightMaterial(c));
  },

  getRandomPointInBox(maxRad) {
    const width = this.width - maxRad;
    const height = this.height - maxRad;
    const depth = this.depth - maxRad;
    return {
      x: Math.floor(Math.random() * width - width / 2),
      y: Math.floor(Math.random() * height - height / 2),
      z: Math.floor(Math.random() * depth - depth / 2),
    };
  },

  createBalls(number) {
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
  },

  createLightMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  },
}

module.exports = {balls};
