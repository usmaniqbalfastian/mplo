const Joi = require('joi');

function validateCreateUserWithEmail(user) {
    const schema = {
      firstName: Joi.string().min(1).max(255).required(),
      lastName: Joi.string().min(1).max(255).required(),
      email:Joi.string().email().min(5).max(255).required(),
      password:Joi.string().min(5).max(255).required(),
      contactNo:Joi.string().min(11).max(15),
      userImage:Joi.string().min(5).max(255),
  };
  
    return Joi.validate(user, schema);
  }
  function validateUpdateUser(user){
    const schema = {
      firstName: Joi.string().min(1).max(255).required(),
      lastName: Joi.string().min(1).max(255).required(),
      email:Joi.string().email().min(5).max(255).required(),
  };
  
    return Joi.validate(user, schema);
  }
  
  function validateCreateUserType(userType) {
    const schema = {
      name: Joi.string().min(2).max(10).required(),
    };
  
    return Joi.validate(userType, schema);
  }
  function validateUserLog(userLog) {
    const schema = {
      name: Joi.string().min(2).max(10).required(),
    };
  
    return Joi.validate(userLog, schema);
  }
  
  
  exports.validate = validateUserLog;
  
  exports.validateCreateUserWithEmail = validateCreateUserWithEmail;
  exports.validateUpdateUser = validateUpdateUser;
  exports.validateCreateUserType = validateCreateUserType;
