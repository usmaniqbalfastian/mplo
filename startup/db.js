const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/mplo')
    //.then(() => winston.info('Connected to MongoDB...'));
    .then(() => console.log('Connected to MongoDB...'))
    .catch(()=>console.log('exceptions'));
}