import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
      const result=await medicineService.createMedicine(req.body)
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