import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine=async (data:Omit<Medicines,'id' | 'created_at' | 'updated_at' | 'seller_id' >,userId :string )=>{
  // console.log(data)
  const result=await prisma.medicines.create({
   data:{
    ...data,
    seller_id:userId
   }
  })
  return result;
}

const getAllMedicine=async()=>{
  const result=await prisma.medicines.findMany();
  return result;
}

const getMedicineById=async(medicineid:string)=>{
const result=await prisma.medicines.findUnique({
  where:{
    id:medicineid
  }
});
return result;
}

export const medicineService={
  createMedicine,
  getAllMedicine,
  getMedicineById
}