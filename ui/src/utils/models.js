module.exports = {
  /**
   * Load obj file.
   *
   */
  loadModel(location) {
    console.log(location);
    const objLoader = new THREE.OBJLoader();
    return new Promise((resolve, reject) => {
      objLoader.load(location,
        obj => {
          console.log('success')
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
