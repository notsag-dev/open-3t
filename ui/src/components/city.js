const {config} = require('../config');
const buildings = require('./buildings');

const city = {
  async init(size) {
    const group = new THREE.Group();
    const maxDist = Math.sqrt(2 * Math.pow(size, 2));
    for (let i = -size; i < size; i++) {
      for (let j = -size; j < size; j++) {
        const height = this.getHeight(i, j, maxDist);
        const buildingProto = this.getRandomBuildingProto();
        const building = Object.create(buildingProto);
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
          Math.floor(height / 2) + 0.1,
          j * (config.boxSize.depth + config.boxPadding) +
            numRoadsZ * config.roadWidthDefault + (config.mainStreetWidth / 2) * (Math.sign(j) || 1)
        );
        group.add(building.component);
      }
    }
    this.component = group;
  },

  getHeight(gridI, gridJ, maxDist) {
    const fictDist = Math.sqrt(Math.pow(gridI, 2) + Math.pow(gridJ, 2));
    const distCoef = fictDist / maxDist;
    const localMax = config.boxSize.maxHeight -
      distCoef * (config.boxSize.maxHeight - config.boxSize.minHeight);
    const height = Math.floor(config.boxSize.minHeight + Math.random() *
      (localMax - config.boxSize.minHeight) * (1 - distCoef));
    return height;
  },

  getRandomBuildingProto() {
    const names = Object.keys(buildings);
    const randInd = Math.floor(Math.random() * names.length);
    return buildings[names[randInd]];
  }
};

module.exports = {city};
