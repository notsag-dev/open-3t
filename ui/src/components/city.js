const {config} = require('../config');
const buildings = require('./buildings');

const city = {
  async init(size) {
    const group = new THREE.Group();
    const maxDist = Math.sqrt(2 * Math.pow(size, 2));
    for (let i = -size; i < size; i++) {
      for (let j = -size; j < size; j++) {
        const height = this.getHeight(i, j, maxDist);
        const building = Object.create(buildings.butterfliesComponent);
        await building.init(
          config.boxSize.width,
          height,
          config.boxSize.depth
        );
        const numRoadsX = Math.floor(i / config.roadNumBuildings);
        const numRoadsZ = Math.floor(j / config.roadNumBuildings);
        building.component.position.set(
          i * (config.boxSize.width + config.boxPadding) +
            numRoadsX * config.roadWidthDefault +
            Math.sign(i) * config.mainStreetWidth / 2,
          Math.floor(height / 2),
          j * (config.boxSize.depth + config.boxPadding) +
            numRoadsZ * config.roadWidthDefault + (config.mainStreetWidth / 2) * (Math.sign(j) || 1)
        );
        group.add(building.component);
      }
    }
    this.component = group;
  },

  getHeight(gridI, gridJ, maxDist) {
    // Height calculation
    const fictDist = Math.sqrt(Math.pow(gridI, 2) + Math.pow(gridJ, 2));
    const distCoef = fictDist / maxDist;
    const localMax = config.boxSize.maxHeight -
      distCoef * (config.boxSize.maxHeight - config.boxSize.minHeight);
    const height = Math.floor(config.boxSize.minHeight + Math.random() *
      (localMax - config.boxSize.minHeight) * (1 - distCoef));
    return height;
  }
};

module.exports = {city};
