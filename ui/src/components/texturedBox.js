const {loadTextures} = require('../utils/textures');

const texturedBox = {
  async init(pos, edgeSize, texturesInfo) {
    if (texturesInfo.length != 6) {
      console.log('Error: textureNames must have 6 texture names');
      return;
    }

    const materials = [];
    const textures = await loadTextures(texturesInfo);
    console.log(textures);
    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial(
        { map: textures[Object.keys(textures)[i]], side: THREE.BackSide }
      ));
    }

    const geometry = new THREE.BoxGeometry(edgeSize, edgeSize, edgeSize);
    this.component = new THREE.Mesh(geometry, materials);
    this.component.position.set(pos.x, pos.y, pos.z);
  }
}

module.exports = {texturedBox};
