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
    const {search}=req.query;
   const searchString=typeof search==='string'?search:undefined;
  //  const page=Number(req.query.page ?? 1)
  //  const limit=Number(req.query.limit ?? 0)
   const result=await medicineService.getAllMedicine({search:searchString});
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"get all medicine  failed",
      details:err
    })
  }
}

const deleteMedicine=async(req:Request,res:Response)=>{
  try{
    
  const {medicineid}=req.params;
  const user=req.user;
   const result=await medicineService.deleteMedicine(medicineid as string,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"medicine delete failed",
      details:err
    })
  }
}
const updateMedicine=async(req:Request,res:Response)=>{
  try{
    
  const {medicineid}=req.params;
  const user=req.user;
   const result=await medicineService.updateMedicine(medicineid as string,req.body,user?.id as string)
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"medicine update failed",
      details:err
    })
  }
}


export const medicineController={
  createMedicine,
  getAllMedicine,
  getMedicineById,
  deleteMedicine,
  updateMedicine
}