import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
    const user=req.user;
    if(!user){
       return res.status(400).json({
      error:"medicine creation failed"
    })
    }
      const result=await medicineService.createMedicine(req.body,user.id as string)
      res.status(201).json(result)
   }catch(err){
    res.status(400).json({
      error:"medicine creation failed",
      details:err
    })
   }
}

export const medicineController={
  createMedicine
}