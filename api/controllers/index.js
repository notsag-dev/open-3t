const userController = require('./user');

/**
 * Set routes for all controllers.
 *
 */
module.exports.set = app => {
  userController.set(app);
};
