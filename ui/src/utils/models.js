const models = {};

const getModel = (location, name) => {
  if (models[name]) {
    return models[name];
  } else {
    return loadModel(location, name);
  }
}

const loadModel = (location, name) => {
  const objLoader = new THREE.OBJLoader();
  return new Promise((resolve, reject) => {
    objLoader.load(location,
      obj => {
        if (name) {
          models[name] = obj;
        }
        resolve(obj);
      },
      null,
      err => {
        console.log('Error loading model', err);
        reject(err);
      });
  });
}

module.exports = {getModel, loadModel};
