const {config} = require('../config');

const floor = {
  init(size) {
    const geometry = new THREE.PlaneBufferGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.component = new THREE.Group();
    this.component.add(mesh);
    this.component.rotation.x = Math.PI / 2;
    this.stripes = this.createStripes(config.floor.numStripes, size);
    this.stripes.forEach(stripe => {
      this.component.add(stripe);
    });
  },

  createStripes(numStripes, size) {
    const stripes = [];
    const materials = this.createMaterials();
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      opacity: 0.6,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const widthMax = config.mainStreetWidth + config.boxSize.width;
    for (let i = 0; i < numStripes; i++) {
      const geometry = new THREE.PlaneBufferGeometry(
        Math.random() * config.floor.maxStripeLength,
        Math.random() * config.floor.maxStripeWidth
      );
      const newStripe = new THREE.Mesh(geometry, material);
      const xPos = Math.random() * size - size / 2;
      const yPos = (Math.random() * widthMax) -
        widthMax / 2;
      const zPos = Math.random() * -2;
      newStripe.position.set(xPos, yPos, zPos);
      stripes.push(newStripe);
      console.log(config.floor.maxStripeSpeed);
      newStripe.speed = {
        x: Math.random() * config.floor.maxStripeSpeed - config.floor.maxStripeSpeed / 2,
        y: 0,
        z: 0
      }
    }
    return stripes;
  },

  createMaterials() {
    const colors = [0xff9090, 0xeef1ff, 0xffffcc, 0x0000ff, 0xff0000, 0x52ff6a];
    return colors.map(c => this.createStripeMaterial(c));
  },

  createStripeMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  },

  animate(delta) {
    this.stripes.forEach(stripe => {
      stripe.position.x += stripe.speed.x * delta;
      //stripe.position.y += stripe.speed.y * delta/1000;
      //stripe.position.z += stripe.speed.z * delta/1000;
    });
  },
}

module.exports = {floor};
