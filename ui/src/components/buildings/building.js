const building = {
  init(width, height, depth) {
    const geometry = new THREE.BoxBufferGeometry(width, height, depth);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.7,
      color: 0xffff00,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.box = mesh;
    this.component = new THREE.Group();
    this.component.add(mesh);
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
};

module.exports = {building};
