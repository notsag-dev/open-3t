const {config} = require('../config');

const city = {
  init(size) {
    const group = new THREE.Group();
    const maxDist = Math.sqrt(2 * Math.pow(size, 2));
    for (let i = -size; i < size; i++) {
      for (let j = -size; j < size; j++) {
        // Height calculation
        const fictDist = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
        const distCoef = fictDist / maxDist;
        const localMax = config.boxSize.maxHeight -
          distCoef * (config.boxSize.maxHeight - config.boxSize.minHeight);
        let height = Math.floor(config.boxSize.minHeight + Math.random() *
          (localMax - config.boxSize.minHeight) * (1 - distCoef));

        // Component creation
        const geometry = new THREE.BoxBufferGeometry(
          config.boxSize.width, height, config.boxSize.depth);
        const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});
        const mesh = new THREE.Mesh(geometry, material);
        const numRoadsX = Math.floor(i / config.roadNumBuildings);
        const numRoadsZ = Math.floor(j / config.roadNumBuildings);
        mesh.position.set(
          i * (config.boxSize.width + config.boxPadding) +
            numRoadsX * config.roadWidthDefault +
            Math.sign(i) * config.mainStreetWidth / 2,
          Math.floor(height / 2),
          j * (config.boxSize.depth + config.boxPadding) +
            numRoadsZ * config.roadWidthDefault + (config.mainStreetWidth / 2) * (Math.sign(j) || 1)
        );
        group.add(mesh);
      }
    }
    this.component = group;
  }
};

module.exports = {city};
