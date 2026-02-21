import { Request, Response } from "express";
import {auth as betterAuth} from '../../lib/auth'
import { prisma } from "../../lib/prisma";

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

export const userService={
  getCurrentUser,
  getAllUser
}