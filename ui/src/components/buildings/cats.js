const {building} = require('./building');
const {getModel} = require('../../utils/models');
const {config} = require('../../config');

const cats = {
  async init(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.component = new THREE.Group();

    const b = Object.create(building);
    b.init(width, height, depth);
    this.component.add(b.component);

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
  },

  getRandomPointInBox(radX, radY, radZ) {
    const width = this.width - radX;
    const height = this.height - radY;
    const depth = this.depth - radZ;
    return {
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * depth - depth / 2,
    };
  },

  createCats(model, number) {
    const res = [];
    for (let i = 0; i < number; i++) {
      const newCat = model.clone();
      const pos = this.getRandomPointInBox(30, 35, 35);
      console.log(pos);
      newCat.position.set(pos.x, pos.y, pos.z);
      res.push(newCat);
    }
    return res;
  },

  animate(delta) {
    this.cats.forEach(cat => {
      cat.rotation.x += delta * cat.rotVel.x;
      cat.rotation.y += delta * cat.rotVel.y;
      cat.rotation.z += delta * cat.rotVel.z;
      //cat.position.set(
      //  delta * cat.movVel.x,
      //  delta * cat.movVel.y,
      //  delta * cat.movVel.z
    });
  },

  //animate(delta) {
  //  this.delta += this.rotationDir * delta / 10;
  //  if (Math.abs(this.delta) > 10) {
  //    this.rotationDir *= -1;
  //  };
  //  this.cats.forEach(c => {
  //    c.rotation.y += this.delta;
  //  });
  //  if (this.delta > 1000) {

  //  };
  //},
}

module.exports = {cats};
