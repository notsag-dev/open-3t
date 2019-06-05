const {city} = require('./city');
const {floor} = require('./floor');
const {pig} = require('./pig');
const {skyBox} = require('./skyBox');
const {texturedBox} = require('./texturedBox');
const buildings = require('./buildings');

module.exports = {
  cityComponent: city,
  floorComponent: floor,
  pigComponent: pig,
  skyBoxComponent: skyBox,
  texturedBoxComponent: texturedBox,
  buildings
};
