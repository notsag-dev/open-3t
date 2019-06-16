const {building} = require('./building');

const doodle = Object.create(building);

doodle.init = async function(width, height, depth) {
  building.init.call(this, width, height, depth);
  const maxStep = 1;
  for (let i = 0; i < width + height + depth; i++) {
    const vector = new THREE.Vector3(0, 0, 0);
    const geometry = new THREE.Geometry();
    const material = new THREE.LineBasicMaterial({ color: Math.random() * 0xffffff });
    let done = false;
    while (!done) {
      vector.x += Math.random() * maxStep - maxStep/2
      vector.y += Math.random() * maxStep - maxStep/2
      vector.z += Math.random() * maxStep - maxStep/2
      geometry.vertices.push(vector.clone())
      if (Math.abs(vector.x) > width / 2 ||
          Math.abs(vector.y) > height / 2 ||
          Math.abs(vector.z) > depth / 2) {
        done = true;
      }
    }
    const line = new THREE.Line(geometry, material);
    this.component.add(line)
  }
};

module.exports = {doodle};
