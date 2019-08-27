import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users';


dotenv.config();

export class UserController{
static async signUpUser (req,res){
  try {
    const {firstName, lastName, email, password, address, bio, occupation, expertise, admin, mentor} = req.body;
    const user =  new User(firstName,lastName,email,password,address, bio, occupation, expertise,admin, mentor)
    const token = jwt.sign({user}, process.env.appSecretKey, { expiresIn: '24hr' });
    await user.signUpUser()
    return res.status(201).send({status:201, token, message:'User created successfully'});
  } catch (error) {
    return res.status(400).send({status:400, message:error.message});
  }  
};

static signInUser(req,res){
  return res.send({status:200,message:'User is successfully logged in', token:req.token})
}


 static getAllMentors(req,res){
   const mentors = User.getAllMentors() 
  return res.send({status:200, mentors})  

   }
  
  static specificMentor(req,res){ 
    return res.send({status:200, user:req.user})
    
  }
        
static changeUserToMentor(req,res){
  if(req.user.mentor === true) return res.send({status:409, message:'User is already a mentor'})
  User.changeUserToMentor(req.user)
    return res.send({status:200, message:'User account changed to mentor'})  
  }
}
export default UserController;
