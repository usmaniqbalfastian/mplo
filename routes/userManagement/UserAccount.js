
const {User} = require('../../modals/userManagement/UserAccount');
const {UserType} = require('../../modals/userManagement/UserType');
//const {validateCreateUserWithEmail,validateUpdateUser} = require('../utills/validations');
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const x_auth_token='x-auth-token';
const saltRound=10;
//get current user profile
//recieve x-auth-token and return current user
router.get('/me', auth, async (req, res) => {
  try{
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).send({status:200,user:user});
  }
  catch(ex){
    res.send('something going wrong');
  }
});
//this is only access by admin
/*
get list of all users 
 */
router.get('/', async (req, res) => {
  try{
  const users = await User.find().sort('firstName').select('_id firstName lastName email contactNo');
  res.status(200).send({status:200,users:users});
  }
  catch(ex){
    res.status(500).send({status:500,error:'something going wrong'});
  }
});
//create user account with email
router.post('/', async (req, res) => {
  try{
    //is valid userType HR or jobSeeker
  let userType= await UserType.findOne({name:req.body.userType});
  if(!userType){
    let userTypes_json=await UserType.find();
    userTypes=[];
    //convert into array usertypes
    for(var i in userTypes_json){
      userTypes.push(userTypes_json[i].name);
    }
    res.status(400).send({status:400,error:'invalid userType! userType must be one of these ',
    userTypes:userTypes});
  } 
  //validate request
  const { error } = validateCreateUserWithEmail(req.body); 
  if (error) return res.status(400).send({status:400,error:error.details[0].message});
  //is alraedy register user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({status:400,error:'User already registered.'});
  //post user
  user=new User({
    
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userType:req.body.userType,
    email:req.body.email,
    password:req.body.password,
    contactNo:req.body.contactNo,
    userImage:req.body.userImage,
    registrationDate:new Date(),
    });
    //encrypt password
  const salt = await bcrypt.genSalt(saltRound);
  user.password = await bcrypt.hash(user.password, salt);
   user = await user.save();
   //access token generate
  const token = user.generateAuthToken();
  //return result
  res.header(x_auth_token,token).status(200).send({status:200,user:{
    _id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    userImage:user.userImage
  }});
  }
  catch(ex){
    res.status(500).send({status:500,error: 'something going wrong'});
  }
});
//update my  account
//url/user/
router.put('/',auth,async (req, res) => {
  try{
    //get from auth midddle ware
    let userId=req.user._id;
//validate request
  const { error } = validateUpdateUser(req.body); 
  if (error) return res.status(400).send({status:400,error:error.details[0].message});
//change email possible or not
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({status:400,
    error:"can't change email because User already registered."});
//update by user
  user= await User.findByIdAndUpdate(userId, { firstName: req.body.firstName,
  lastName:req.body.lastName,
  email:req.body.email }, {
    new: true
  });

  if (!user) return res.status(404).send({status:404,error:'The User with the given ID was not found.'});
  
  res.send(user);
}
catch(ex){
  res.send('something going wrong');
}
});
//delete my  account
router.delete('/', auth,async (req, res) => {
  try{
    let userId=req.user._id;
  const user = await User.findByIdAndRemove(userId);

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);
  }
  catch(ex){
    res.send('something going wrong');
  }
});
//get user by Id
router.get('/:id', async (req, res) => {
  try{
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);
  }
  catch(ex){
    res.send('something going wrong');
  }
});


/*Validations */
function validateCreateUserWithEmail(user) {
  const schema = {
    firstName: Joi.string().min(1).max(255).required(),
    lastName: Joi.string().min(1).max(255).required(),
    email:Joi.string().email().min(5).max(255).required(),
    userType:Joi.string().required(),
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


module.exports = router;
