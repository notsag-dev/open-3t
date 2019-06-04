module.exports.set = app => {
  app.get('/users', (req, res) => {
    const users = [
      {
        userId: 0,
        locationOnGrid: {x: 0, y: 0, z: 1},
        artName: '',
      },
      {
        userId: 1,
        locationOnGrid: {x: 1, y: 0, z: 1},
        artName: '',
      },
      {
        userId: 2,
        locationOnGrid: {x: 1, y: 0, z: 0},
        artName: '',
      },
      {
        userId: 3,
        locationOnGrid: {x: 1, y: 0, z: -1},
        artName: '',
      },
      {
        userId: 4,
        locationOnGrid: {x: 0, y: 0, z: -1},
        artName: '',
      },
      {
        userId: 5,
        locationOnGrid: {x: -1, y: 0, z: -1},
        artName: '',
      },
      {
        userId: 6,
        locationOnGrid: {x: -1, y: 0, z: 0},
        artName: '',
      },
      {
        userId: 7,
        locationOnGrid: {x: -1, y: 0, z: 1},
        artName: '',
      },
    ];
    res.send(users);
  });
};
