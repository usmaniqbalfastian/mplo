const express = require('express');
const userType = require('../routes/userManagement/UserType');
const user = require('../routes/userManagement/UserAccount');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.use('/api/userType', userType);
  app.use('/api/user', user);
  app.use('/api/auth', auth);
  app.use(error);
}