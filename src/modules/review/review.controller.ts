import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";



const getReviewById=async(req:Request,res:Response)=>{
try{
  const {reviewId}=req.params;
 if(!reviewId){
  throw new Error("review id is required!")
 }
const result=await reviewService.getReviewById(reviewId as string);
res.status(200).json(result)
}catch(err){
    res.status(400).json({
      error:"get  review by id failed",
      details:err
    })
   }
}

const createReview=async (req:Request,res:Response,next:NextFunction)=>{
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
   next(err)
   }
}

const updateReview=async(req:Request,res:Response)=>{
  try{
    
  const {reviewId}=req.params;
  const user=req.user;
   const result=await reviewService.updateReview(reviewId as string,req.body,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"medicine update failed",
      details:err
    })
  }
}

const deleteReview=async(req:Request,res:Response)=>{
  try{
    
  const {reviewId}=req.params;
  const user=req.user;
   const result=await reviewService.deleteReview(reviewId as string,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"review delete failed",
      details:err
    })
  }
}

export const reviewController={
createReview,
getReviewById,
deleteReview,
updateReview
}