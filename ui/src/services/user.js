const axios = require('axios');
const {config} = require('../config');

axios.defaults.baseURL = config.apiUrl;
module.exports = {
  getUsers: async () => {
    const res = await axios.get('/users');
    return res;
  }
}
