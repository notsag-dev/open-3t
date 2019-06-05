module.exports = {
  /**
   * Load obj file.
   *
   */
  loadModel(location) {
    const objLoader = new THREE.OBJLoader();
    return new Promise((resolve, reject) => {
      objLoader.load(location,
        obj => {
          resolve(obj);
        },
        null,
        err => {
          console.log('Error loading model', err);
          reject(err);
        });
    });
  }
}
