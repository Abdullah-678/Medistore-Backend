import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";


const createcategory=async (req:Request,res:Response,next:NextFunction)=>{
  // console.log(req.body)
   try{
      const result=await categoryService.createcategory(req.body)
      res.status(201).json(result)
   }catch(err){
  next(err)
   }
}

const getAllCategory=async(req:Request,res:Response)=>{
  try{
    const result=await categoryService.getAllCategory();
    res.status(200).json(result)

  }catch(err){
    res.status(400).json({
      error:"get all category failed",
      details:err
    })
   }
}

const updateCategory=async(req:Request,res:Response)=>{
  try{
    
  const {categoryId}=req.params;
 
   const result=await categoryService.updateCategory(categoryId as string,req.body)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"category update failed",
      details:err
    })
  }
}

const deleteCategory=async(req:Request,res:Response)=>{
  try{
    
  const {categoryId}=req.params;
  
   const result=await categoryService.deleteCategory(categoryId as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"category delete failed",
      details:err
    })
  }
}

export const categoryController={
  createcategory,
  getAllCategory,
  deleteCategory,
  updateCategory
}