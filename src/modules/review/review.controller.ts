import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
    const user=req.user;
    req.body.customer_id=user?.id;
    if(!user){
       return res.status(400).json({
      error:"unauthorized!!"
    })
    }
      const result=await reviewService.createReview(req.body)
      res.status(201).json(result)
   }catch(err){
    res.status(400).json({
      error:"review creation failed",
      details:err
    })
   }
}

export const reviewController={
createReview
}