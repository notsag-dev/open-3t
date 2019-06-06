const {loadModel} = require('../utils/models');
const {getTexture} = require('../utils/textures');

const pig = {
  async init(pos) {
    pos = pos || {x: 0, y: 0, z:0};
    const model = await loadModel('./assets/models/pig.obj');
    const matcap = await getTexture('porcelain', 'matcap-porcelain-white.jpg');
    matcap.texture.encoding = THREE.sRGBEncoding;
    const material = new THREE.MeshMatcapMaterial({
      color: 0xff00e5,
      matcap: matcap.texture
    });

    for (let i = 0; i < model.children.length; i++) {
      model.children[i].material = material;
    }
    model.scale.set(300, 300, 300);
    model.rotation.x = -Math.PI / 2;
    model.position.set(pos.x, pos.y, pos.z);
    this.component = model;
  },

  animate(lambda) {
    this.component.rotation.z -= lambda / 25;
  }
}

module.exports = {pig};
