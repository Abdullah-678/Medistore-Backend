import { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service";


const getAllCart=async(req:Request,res:Response)=>{
  try{
    
   const result=await cartService.getAllCart();
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"get all cart  failed",
      details:err
    })
  }
}

const createCart=async(req:Request,res:Response,next:NextFunction)=>{
 try{
    const user=req.user;
    if(!user){
       return res.status(400).json({
      error:"unauthorized!!"
    })
    }
      const result=await cartService.createCart(req.body,user?.id as string)
      res.status(201).json(result)
   }catch(err){
   next(err)
   }
}

const deleteCart=async(req:Request,res:Response)=>{
  try{
    
  const {cartId}=req.params;
  const user=req.user;
   const result=await cartService.deleteCart(cartId as string,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"cart delete failed",
      details:err
    })
  }
}

export const cartController={
  createCart,
  getAllCart,
  deleteCart
}