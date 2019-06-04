const {texturedBox} = require('./texturedBox');

const skyBox = {
  async init() {
    const texBox = Object.create(texturedBox);
    await texBox.init(new THREE.Vector3(0, 0, 0), 500000, [
      {name: 'right', file: 'skyBox/right.png'},
      {name: 'left', file: 'skyBox/left.png'},
      {name: 'top', file: 'skyBox/top.png'},
      {name: 'bottom', file: 'skyBox/bottom.png'},
      {name: 'front', file: 'skyBox/front.png'},
      {name: 'back', file: 'skyBox/back.png'}
    ]);
    this.component = texBox.component;
  }
}

module.exports = {skyBox};
