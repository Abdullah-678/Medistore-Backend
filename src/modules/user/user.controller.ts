import { Request, Response } from "express";
import { userService } from "./user.service";

const getCurrentUser=async(req:Request,res:Response)=>{
try{
 
const result=await userService.getCurrentUser(req)
 if (!result) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
res.status(200).json(result)
}catch(err){
    res.status(400).json({
      error:"get current user failed",
      details:err
    })
   }
}


const getAllUser=async(req:Request,res:Response)=>{
 try{
   const result=await userService.getAllUser();
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"get all users are  failed",
      details:err
    })
  }
}

const updateMyProfile=async(req:Request,res:Response)=>{
  try{
    
  const {userId}=req.params;
  
  const user=req.user;
   const result=await userService.updateMyProfile(userId as string,req.body,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"my profile update failed",
      details:err
    })
  }
}

export const userController={
  getCurrentUser,
  getAllUser,
  updateMyProfile
}