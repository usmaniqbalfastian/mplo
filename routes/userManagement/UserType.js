
const {UserType} = require('../../modals/userManagement/UserType');
//const {validateCreateUserType} = require('../utills/validations');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try{
  const UserTypes = await UserType.find().sort('name');
  res.send({userTypes:UserTypes});
  }
  catch(ex){
    res.send('something goning wrong');
  }
});

router.post('/', async (req, res) => {
  try{

  const { error } = validateCreateUserType(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let userType=new UserType({name:req.body.name}); //= new UserType({ name: req.body.name });
  userType = await userType.save();
  
  res.send(userType);
  }
  catch(ex){
    res.send('something goning wrong');
  }
});

router.put('/:id', async (req, res) => {
  try{
  const { error } = validateCreateUserType(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const userType = await UserType.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!userType) return res.status(404).send('The UserType with the given ID was not found.');
  
  res.send(userType);
}
catch(ex){
  res.send('something goning wrong');
}
});

router.delete('/:id', async (req, res) => {
  try{
  const userType = await UserType.findByIdAndRemove(req.params.id);

  if (!userType) return res.status(404).send('The UserType with the given ID was not found.');

  res.send(userType);
  }
  catch(ex){
    res.send('something goning wrong');
  }
});

router.get('/:id', async (req, res) => {
  try{
  const userType = await UserType.findById(req.params.id);

  if (!userType) return res.status(404).send('The UserType with the given ID was not found.');

  res.send(userType);
  }
  catch(ex){
    res.send('something goning wrong');
  }
});

/**validations */
function validateCreateUserType(userType) {
  const schema = {
    name: Joi.string().min(2).max(10).required(),
  };

  return Joi.validate(userType, schema);
}

module.exports = router;