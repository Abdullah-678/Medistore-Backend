import { Request, Response } from "express";
import {auth as betterAuth} from '../../lib/auth'

const getCurrentUser=async(req:Request)=>{
const session=await betterAuth.api.getSession({
    headers:req.headers as any
   })
  if (!session) return null;
  return session?.user;
}

export const userService={
  getCurrentUser
}