import validator from 'validator';
import bcrypt from 'bcrypt'; 
// API to register user
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

const registerUser = async(req, res) => {

    try{

        const {name, email, password} = req.body;   // get the name, email and password from the request body

        if(!name || !email || !password) {
            return res.json({message: "Please enter all fields"});
        }

        if(!validator.isEmail(email)) {
            return res.json({message: "Please enter valid email"});
        }

        if(password.length < 8) {
            return res.json({message: "Please enter strong password"});
        }

        const salt = await bcrypt.genSalt(10);  // generate salt for hashing password
        const hashedPassword = await bcrypt.hash(password, salt);  // hash the password
     
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);  // create a new user instance
        const user = await newUser.save();  // save the user to the database

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);  // generate token for the user
        res.json({success:true, token})
    } 
    
    catch(error) {
        console.log(error);
        
        res.json({success:false, message: error.message});
    }

}

const loginUser = async(req, res) => {

        try{
            const {email, password} = req.body;  // get the email and password from the request body
            const user = await userModel.findOne({email});  // find the user with the email

            if(!user){
                return res.json({success:false, message: "User does not exist"});
            }

            const isMatch = await bcrypt.compare(password, user.password);  // compare the password
            
            if(isMatch){
                const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);  // generate token for the user
                res.json({success:true, token});
            } else{
                res.json({success:false, message: "Invalid credentials"});
            }
        }

        catch(error) {
            console.log(error);
        
        res.json({success:false, message: error.message}); 
        }


}

// API to get user profile data

const getProfile = async(req, res) => {

    try{

        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password'); 
        res.json({success: true, userData}) // get the user data except password

    } catch(error) {
        console.log(error);
        
        res.json({success:false, message: error.message});
    }

}


// API to update user profile

const updateProfile = async(req, res) => {

    try{

        const { userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender){
           res.json({success:false, message: "Data Missing"}); 
        }
        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), });
        
        if(imageFile){
            
            //  upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageURL});
        }

        res.json({success:true, message: "Profile Updated"});

    } catch (error) {
        console.log(error);
        
        res.json({success:false, message: error.message});
    }
}



export {registerUser, loginUser, getProfile, updateProfile};