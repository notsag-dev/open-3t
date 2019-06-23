const {config} = require('../config');

const floor = {
  init(size) {
    this.size = size;
    const geometry = new THREE.PlaneBufferGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
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
    const widthMax = config.mainStreetWidth + config.boxSize.width;
    for (let i = 0; i < numStripes; i++) {
      const width = Math.random() * config.floor.maxStripeWidth + config.floor.minStripeWidth;
      const length = Math.random() * config.floor.maxStripeLength + config.floor.minStripeLength;
      const geometry = new THREE.PlaneBufferGeometry(length, width);
      const newStripe = new THREE.Mesh(
        geometry,
        materials[Math.floor(Math.random() * materials.length)]
      );
      const xPos = Math.random() * size - size / 2;
      const yPos = (Math.random() * widthMax) - widthMax / 2;
      const zPos = Math.random() * -2;
      console.log(zPos)
      newStripe.position.set(xPos, yPos, zPos);
      newStripe.initPosition = {x: xPos, y: yPos, z: zPos};
      stripes.push(newStripe);
      newStripe.speed = {
        x: Math.random() * config.floor.maxStripeSpeed - config.floor.maxStripeSpeed / 2,
        y: 0,
        z: 0
      };
      newStripe.size = {width, length};
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
      opacity: 0.5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  },

  animate(delta) {
    this.stripes.forEach(stripe => {
      // stripe.visible = (stripe.position.distanceTo(camPosition) < 500);
      if (Math.abs(stripe.position.x) + stripe.size.length / 2 > this.size / 2) {
        stripe.position.x = stripe.initPosition.x;
      }
      stripe.position.x += stripe.speed.x * delta;
    });
  },
}

module.exports = {floor};
