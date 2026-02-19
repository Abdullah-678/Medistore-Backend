import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
    const user=req.user;
    if(!user){
       return res.status(400).json({
      error:"unauthorized!!"
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

const getMedicineById=async(req:Request,res:Response)=>{
try{
  const {medicineid}=req.params;
 if(!medicineid){
  throw new Error("medicine id is required!")
 }
const result=await medicineService.getMedicineById(medicineid as string);
res.status(200).json(result)
}catch(err){
    res.status(400).json({
      error:"get  medicine by id failed",
      details:err
    })
   }
}

const getAllMedicine=async(req:Request,res:Response)=>{
  try{
   const result=await medicineService.getAllMedicine();
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"get all medicine  failed",
      details:err
    })
  }
}


export const medicineController={
  createMedicine,
  getAllMedicine,
  getMedicineById
}