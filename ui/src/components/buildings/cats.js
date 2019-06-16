const {building} = require('./building');
const {getModel} = require('../../utils/models');
const {config} = require('../../config');

const cats = Object.create(building);

cats.init = async function(width, height, depth) {
  building.init.call(this, width, height, depth);

  const model = await getModel('./assets/models/cat.obj');
  model.scale.set(10, 10, 10);
  const material = new THREE.MeshNormalMaterial();
  for (let i = 0; i < model.children.length; i++) {
    model.children[i].material = material;
  }
  this.cats = this.createCats(model, this.height / 2);
  this.cats.forEach(cat => {
    this.component.add(cat)
    cat.rotVel = {
      x: Math.random() * config.cats.maxRotVel - config.cats.maxRotVel / 2,
      y: Math.random() * config.cats.maxRotVel - config.cats.maxRotVel / 2,
      z: Math.random() * config.cats.maxRotVel - config.cats.maxRotVel / 2,
    };
  });

  // Animation
  this.delta = 0;
  this.rotationDir = 1;
}

cats.createCats = function(model, number) {
  const res = [];
  for (let i = 0; i < number; i++) {
    const newCat = model.clone();
    const pos = this.getRandomPointInBox(30, 35, 35);
    newCat.position.set(pos.x, pos.y, pos.z);
    res.push(newCat);
  }
  return res;
}

cats.animate = function(delta) {
  this.cats.forEach(cat => {
    cat.rotation.x += delta * cat.rotVel.x;
    cat.rotation.y += delta * cat.rotVel.y;
    cat.rotation.z += delta * cat.rotVel.z;
  });
}

module.exports = {cats};
