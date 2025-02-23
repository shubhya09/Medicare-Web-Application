// import validator from "validator";
// import bcrypt from "bcrypt";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// // import path from "path";
// // import { log } from "console";
// import jwt from 'jsonwebtoken'
// import allDoctors from '../controllers/adminController'

// const addDoctor = async (req, res) => {
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//         // const imageFile = req.file;
        

//         // console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile)

//         // Checking for all data
//         if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
//             return res.json({ success: false, message: "Missing Details" });
//         }

//         // Validating email format
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         // Validating strong password
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a Strong Password" });
//         }

//         // Check if file exists
//         // if (!imageFile) {
//         //     console.log("No file received");
//         //     return res.json({ success: false, message: "No image file uploaded. Please provide an image." });
//         // }

//         // Hashing doctor password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Upload image to Cloudinary
//         // const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
//         // const imageUrl = imageUpload.secure_url;

//         const doctorData = {
//             name,
//             email,
//             // image: imageUrl,
//             password: hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address: JSON.parse(address),
//             date: Date.now(),
//         };

//         const newDoctor = new doctorModel(doctorData);
//         await newDoctor.save();

//         res.json({ success: true, message: "Doctor Added" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //  API for the admin login

// const loginAdmin  = async (req, res) => {
//     try{

//         const {email, password} = req.body;

//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

                
//          const token = jwt.sign(email + password, process.env.JWT_SECRET)
//             res.json({success:true, token})
//         } else{
//             res.json({success:false, message:"Invalid Credentials"})
//         }


//     }

//     catch (error){
//         console.log(error);
//         res.json({ success: false, message: error.message }); 
//     }

//     const allDoctors = async (req, res) => {
//         try{
//             const doctors = await doctorModel.find({}).select('-password')
//             res.json({success:true, doctors})

//         }

//         catch(error){
//             console.log(error);
//         res.json({ success: false, message: error.message }); 
//         }
//     }
// }

// export default { addDoctor, loginAdmin, allDoctors};

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a Strong Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, loginAdmin, allDoctors };
