const floor = {
  init(size) {
    const geometry = new THREE.PlaneBufferGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    this.component = mesh;
  }
}

module.exports = {floor};
