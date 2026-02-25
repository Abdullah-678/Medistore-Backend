import { Request, Response } from "express";
import { cartService } from "./cart.service";

const createCart=async(req:Request,res:Response)=>{
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
    res.status(400).json({
      error:"add to cart failed",
      details:err
    })
   }
}

export const cartController={
  createCart
}