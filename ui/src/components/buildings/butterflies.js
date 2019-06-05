const {loadTextures} = require('../../utils/textures');
const {building} = require('./building');

const butterflies = {
  async init(width, height, depth) {
    const texturesInfo = [
      {name: '1', file: 'butterflies/1.png'}
    ];
    const group = new THREE.Group();
    const b = Object.create(building);
    b.init(width, height, depth);
    group.add(b.component);
    const textures = await loadTextures(texturesInfo);
    const materials = [];
    Object.keys(textures).forEach(tname => {
      materials.push(new THREE.MeshBasicMaterial(
        { map: textures[tname], side: THREE.DoubleSide, transparent: true, opacity: 0.5 }
      ));
    });
    const num = width + height;
    for(let i = 0; i < num; i++) {
      const material = materials[
        Math.floor(Math.random() * materials.length)
      ];
      const geometry = new THREE.PlaneBufferGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      const posX = Math.random() * width - width / 2;
      const posY = Math.random() * height - height / 2;
      const posZ = Math.random() * depth - depth / 2;
      mesh.position.set(posX, posY, posZ);
      group.add(mesh);
    }
    this.component = group;
  }
}

module.exports = {butterflies};
