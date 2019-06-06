const {config} = require('../../config');
const {getTexture, loadTexture} = require('../../utils/textures');

const building = {
  async init(width, height, depth) {
    const geometry = new THREE.BoxBufferGeometry(
      width, height, depth);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.7,
      color: 0xffff00,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.component = mesh;
  }
}

module.exports = {building};
