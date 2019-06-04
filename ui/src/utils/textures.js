const loader = new THREE.TextureLoader();

module.exports = {
  /**
   * Load a texture using the three js loader.
   * Return a promise.
   *
   */
  loadTexture: (name, file) => {
    return new Promise((resolve, reject) => {
      loader.load(`./assets/textures/${file}`,
        // Function to be executed when the texture is loaded
        (texture) => {
          resolve({ name: name, texture: texture });
        },
        null,
        // Function to be executed if the texture loading failed
        (err) => {
          console.log('Problem loading texture: ' + name);
          console.log(err);
          reject(err);
        }
      )
    })
  },

  /**
   * Load textures passed as parameter.
   *
   */
  loadTextures: async (texturesInfo) => {
    const texturePromises = []
    for (let i = 0; i < texturesInfo.length; i++) {
      texturePromises.push(module.exports.loadTexture(
        texturesInfo[i].name, texturesInfo[i].file)
      );
    }
    const texLoadRes = await Promise.all(texturePromises);
    const res = {};
    texLoadRes.forEach(tinf => {
      res[tinf.name] = tinf.texture;
    });
    return res;
  }
}
