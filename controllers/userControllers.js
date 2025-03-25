const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');

//create user register
exports.registerController=async (req,res)=>{
    try {
        const{username, email, password}=req.body;

        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:"Please fill all fields"
            })
        }
        //existing user
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:`Email already exists`
            })
        }
        const hashPassword=await bcrypt.hash(password,10);
        //save user
        const user=new userModel({username, email, password:hashPassword});
        await user.save();
        return res.status(201).send({
            success:true,
            message:"`New user created",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:`Error in Register Callback`,
            success:false,
            error,
        })
    }
}

//get all users
exports.getAllUser=async(req,res)=>{
    try {
        const users=await userModel.find({});
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"All users data",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:`Error in Get All user`,
            success:false,
            error,
        })
    }
}


exports.loginController=async(req,res)=>{
    try {
        const {email, password}=req.body;
        //validation
        if(!email||!password){
            return res.status(401).send({
                success:false,
                message:"Please provide email and password",
            })
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:'false',
                message:"User is not Registered"
            })
        }
        //password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid username or password"
            })
        }
        return res.status(200).send({
            success:true,
            message:`Welcome back ${user.username}`,
            user
        })
    } catch (error) {
        console.log(Error)
        return res.status(500).send({
            success:false,
            message:"Error in user login callback",
            error
        })
    }
}