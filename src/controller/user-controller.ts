import { appDataSoure } from "../db/connection";
import { User } from "../entity/user";
import { Request } from "express";
import { Response } from "express";
import * as bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import { Profile } from "../entity/profile";
const SECRET_KEY  = "NODEAPI";
import * as nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  requireTLS: true,
  auth:{
      user:'k.shahji1234@gmail.com',
      pass:'szanmhpiguvxjeey'

  }
})


export const getAllUser = async (req: Request, res: Response) => {
  const userRepo = appDataSoure.getRepository(User);
  // const getAllUsers = await userRepo.find({relations:{profile : true}});
  const getAllUsers = await userRepo.find();
  res.json(getAllUsers);
};


export const addUser = async (req : Request,res: Response)=>{
  let {name,email,password,address,pname,age,gender,image} = req.body;
  try{
      password = bcrypt.hashSync(password,10)
      // const profileRepo = appDataSoure.getRepository(Profile);
      const userRepo = appDataSoure.getRepository(User);

      // let profile : Profile = new Profile();
      //     profile.pname = pname;
      //     profile.gender = gender;
      //     profile.age = age;
      //     profile.image = image;

      // let profileData = await profileRepo.save(profile);

      const existingUser = await userRepo.findOne({ where: { email:email}});
      if(existingUser){
          res.json({message:"Existing User"})
      }else
      {
        let userData : User = new User();
        userData.name = name;
        userData.email = email;
        userData.password = password;
        // userData.address = address;
        // userData.profile = profile;
      let user = await userRepo.save(userData);
      

      let mailOption = {
        from: "'Verify your email'<k.shahji1234@gmail.com>",
        to: userData.email,
        subject: 'Testing email by Nodemailer',
        html: `<h2>${userData.name}! Thanks for the registration on our Website.</h2>`
    }

    transporter.sendMail(mailOption,(error, info)=>{
        if(error){
            console.log(error.message);
        }else{
            console.log('Email has been sent successfully',info);
        }

    });

      const token = jwt.sign({email:email, id:req.body.id},SECRET_KEY)
      res.json({user:user, token:token, message:'User created successfully',status:200});
      }


  }catch(err:any){
      res.json(err.message).status(500);
  }
}

export const login = async (req : Request,res : Response)=>{
  const {email,password} = req.body;

  try{
      let userRepo = appDataSoure.getRepository(User);
      const existingUser = await userRepo.findOne({ where: { email:email}});

      if(!existingUser){
          return res.status(404).json({message:'User not found'})
      }
      const matchPassword = bcrypt.compare(password, existingUser.password)
      if(!matchPassword){
          return res.status(400).json({message:'Invalid creds'})
      }

      const token = jwt.sign({email:existingUser.email, id: existingUser.id}, SECRET_KEY);
      res.status(201).json({user:existingUser, token:token, message: "Login successfully"});
  }catch(err:any){
      res.json(err.message).status(500);
  }
}