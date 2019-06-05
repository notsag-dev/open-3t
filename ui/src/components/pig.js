const {loadModel} = require('../utils/models');
const {loadTexture} = require('../utils/textures');

const pig = {
  async init() {
    const model = await loadModel('./assets/models/pig.obj');
    const matcap = await loadTexture('porcelain', 'matcap-porcelain-white.jpg');
    matcap.texture.encoding = THREE.sRGBEncoding;
    console.log(matcap.texture);
    const material = new THREE.MeshMatcapMaterial({
      color: 0xFF69B4,
      matcap: matcap.texture
    });

    for (let i = 0; i < model.children.length; i++) {
      model.children[i].material = material;
    }
    model.scale.set(200, 200, 200);
    model.rotation.x = -Math.PI / 2;
    this.component = model;
  }
}

module.exports = {pig};
