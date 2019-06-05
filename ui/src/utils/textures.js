const loader = new THREE.TextureLoader();

const textures = {};

const exp = {
  getTextures: async (texturesInfo) => {
    const texturePromises = [];
    texturesInfo.forEach(tinf => {
      texturePromises.push(exp.getTexture(tinf.name, tinf.file));
    });
    const textures = await Promise.all(texturePromises);
    const res = {};
    textures.forEach(tex => {
      res[tex.name] = tex.texture;
    });
    return res;
  },

  getTexture: (name, file) => {
    if (textures[name]) {
      return Promise.resolve({name, texture: textures[name]});
    } else {
      return exp.loadTexture(name, file);
    }
  },

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
          textures[name] = texture;
          resolve({name, texture});
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
      texturePromises.push(exp.loadTexture(
        texturesInfo[i].name, texturesInfo[i].file)
      );
    }
    const texLoadRes = await Promise.all(texturePromises);
    const res = {};
    texLoadRes.forEach(tinf => {
      res[tinf.name] = tinf.texture;
    });
    return res;
  },
}

module.exports = exp;
