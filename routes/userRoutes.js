const express=require('express');
const { getAllUser, registerController, loginController } = require('../controllers/userControllers');

//router objects
const router=express.Router();

//Get all user || GET
router.get('/all-users',getAllUser)

//create user || POST
router.post('/register',registerController);

//login || POST
router.post('/login',loginController);

module.exports=router;