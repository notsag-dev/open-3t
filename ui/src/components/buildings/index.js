const {butterflies} = require('./butterflies');
const {building} = require('./building');
const {balls} = require('./balls');
const {cats} = require('./cats');
const {doodle} = require('./doodle');

module.exports = {
  ballsComponent: balls,
  buildingComponent: building,
  butterfliesComponent: butterflies,
  catComponent: cats,
  doodleComponent: doodle
};
