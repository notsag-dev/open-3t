const {config} = require('../config');
const buildings = require('./buildings');

const city = {
  async init(size, empty) {
    const group = new THREE.Group();
    const maxDist = Math.sqrt(2 * Math.pow(size, 2));
    this.buildings = [];
    for (let i = -size; i < size; i++) {
      for (let j = -size; j < size; j++) {
        if (i == 0 || j == 0) {
          continue;
        }
        const height = this.getHeight(i, j, maxDist);
        const buildingProto = this.getRandomBuildingProto(empty);
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
          Math.floor(height / 2) + 1,
          j * (config.boxSize.depth + config.boxPadding) +
            numRoadsZ * config.roadWidthDefault + (config.mainStreetWidth / 2) * (Math.sign(j) || 1)
        );
        group.add(building.component);
        this.buildings.push(building);
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

  getRandomBuildingProto(empty) {
    if (empty) {
      return buildings.buildingComponent;
    }
    const names = Object.keys(buildings);
    const randInd = Math.floor(Math.random() * names.length);
    return buildings[names[randInd]];
  },

  animate(delta) {
    this.buildings.forEach(b => {
      if (b.animate) {
        b.animate(delta);
      }
    });
  },
};

module.exports = {city};
