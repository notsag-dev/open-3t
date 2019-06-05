const {config} = require('../../config');

const building = {
  init(width, height, depth) {
    const geometry = new THREE.BoxBufferGeometry(
      width, height, depth);
    const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});
    const mesh = new THREE.Mesh(geometry, material);
    this.component = mesh;
  }
}

module.exports = {building};
