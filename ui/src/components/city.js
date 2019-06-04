const {config} = require('../config');

const city = {
  init(size) {
    const group = new THREE.Group();
    const maxDist = Math.sqrt(2 * Math.pow(size, 2));
    for (let i = -size; i < size; i++) {
      for (let j = -size; j < size; j++) {
        const fictDist = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
        const distCoef = fictDist / maxDist;
        const localMax = config.boxSize.maxHeight -
          distCoef * (config.boxSize.maxHeight - config.boxSize.minHeight);
        let height = Math.floor(config.boxSize.minHeight + Math.random() *
          (localMax - config.boxSize.minHeight) * (1 - distCoef));
        const geometry = new THREE.BoxBufferGeometry(
          config.boxSize.width, height, config.boxSize.depth);
        const material = new THREE.MeshNormalMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          i * (config.boxSize.width + config.boxPadding),
          Math.floor(height / 2),
          j * (config.boxSize.depth + config.boxPadding)
        );
        group.add(mesh);
      }
    }
    this.component = group;
  }
};

module.exports = {city};
