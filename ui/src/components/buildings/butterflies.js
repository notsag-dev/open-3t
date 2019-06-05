const {getTextures, loadTextures} = require('../../utils/textures');
const {building} = require('./building');
const {config} = require('../../config');

const butterflies = {
  async init(width, height, depth) {
    const texturesInfo = [
      {name: 'butterfly1', file: 'butterflies/1.png'}
    ];
    const group = new THREE.Group();
    const b = Object.create(building);
    b.init(width, height, depth);
    group.add(b.component);
    const textures = await getTextures(texturesInfo);
    const materials = [];
    Object.keys(textures).forEach(tname => {
      materials.push(new THREE.MeshBasicMaterial({
        map: textures[tname],
        side: THREE.DoubleSide,
        transparent: true
      }));
    });
    const num = width + height;
    for(let i = 0; i < num; i++) {
      const material = materials[
        Math.floor(Math.random() * materials.length)
      ];
      const maxSize = config.butterflies.maxSize;
      const size = Math.floor(Math.random() * maxSize);
      const geometry = new THREE.PlaneBufferGeometry(size, size);
      const mesh = new THREE.Mesh(geometry, material);
      const posX = Math.random() * (width - maxSize) - (width - maxSize) / 2;
      const posY = Math.random() * (height - maxSize) - (height - maxSize) / 2;
      const posZ = Math.random() * (depth - maxSize) - (depth - maxSize) / 2;
      const rotX = Math.random() * -Math.PI / 2;
      const rotZ = Math.random() * -Math.PI / 2;
      mesh.position.set(posX, posY, posZ);
      mesh.rotation.set(rotX, 0, rotZ);
      group.add(mesh);
    }
    this.component = group;
  }
}

module.exports = {butterflies};
