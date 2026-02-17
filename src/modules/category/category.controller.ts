import { Request, Response } from "express";
import { categoryService } from "./category.service";


const createcategory=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
      const result=await categoryService.createcategory(req.body)
      res.status(201).json(result)
   }catch(err){
    res.status(400).json({
      error:"category creation failed",
      details:err
    })
   }
}

export const categoryController={
  createcategory
}