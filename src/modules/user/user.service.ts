import { Request, Response } from "express";
import {auth as betterAuth} from '../../lib/auth'
import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/enums";

const getCurrentUser=async(req:Request)=>{
const session=await betterAuth.api.getSession({
    headers:req.headers as any
   })
  if (!session) return null;
  return session?.user;
}

const getAllUser=async()=>{
  const result=await prisma.user.findMany();
  return result;
}

const updateBanUnban=async(userId:string,status:UserStatus,userid:string)=>{
 
 
  
  const userData=await prisma.user.findFirst({
  where:{
    id:userId,
  
  },
  select:{
    id:true
  }
})
if(!userData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.user.update({
  where:{
    id:userId,

  },
  data:{status}
})
return result;

}

const updateMyProfile=async(userId:string,data:{name?:string,email?:string,image?:string,address?:string},userid:string)=>{
  if(userId!=userid){
    throw new Error("you are not allowed!")
  }
const userData=await prisma.user.findFirst({
  where:{
    id:userId,
    
  },
  select:{
    id:true
  }
})
if(!userData){
  throw new Error("your provided input is invalid")
}
const result=await prisma.user.update({
  where:{
    id:userId,
    
  },
  data
})
return result;
}

export const userService={
  getCurrentUser,
  getAllUser,
  updateMyProfile,
  updateBanUnban
}