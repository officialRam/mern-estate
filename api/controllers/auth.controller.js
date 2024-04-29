import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import {errorhandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup=async(req, res, next)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
         next(errorhandler(400, 'All fields are required'));
    }
     
    const hashedPassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User created successfully');
    }catch(error){
        next(error);
    }
}

export const signin=async(req, res, next)=>{
    const {email, password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorhandler(404, 'User not found'));
        const validPassword=await bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorhandler(404, 'Invalid password'));
        const token= jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest}=validUser._doc;
        // httponly prevent from 3rd party use of this token
        res.cookie('access token', token, {httpOnly:true}).status(201).json(rest);
    }catch(error){
        next(error);
    }
}