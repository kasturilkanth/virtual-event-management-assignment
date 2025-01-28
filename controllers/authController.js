const jwt=require('jsonwebtoken');
const users=require('../models/users');
const bcrypt=require('bcrypt');
const {sendEmail}=require('../utils/emailService');

const SECRET_KEY='secretkey';

exports.register=async (req,res)=>{
    const {email,password,role}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const user={id:users.length+1,email,password:hashedPassword,role};
    users.push(user);
    await sendEmail(email,'Registration Successful','You have successfully registered.');
    res.status(201).json({message:'User registered successfully'});
}
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(u=>u.email===email);
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token=jwt.sign({userId:user.id,role:user.role},SECRET_KEY,{expiresIn:'1h'});
    res.json({message:'Login successful',token});
}