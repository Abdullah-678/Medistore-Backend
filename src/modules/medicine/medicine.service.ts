import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine=async (data:Omit<Medicines,'id' | 'created_at' | 'updated_at' > )=>{
  // console.log(data)
  const result=await prisma.medicines.create({
   data
  })
  return result;
}

export const medicineService={
  createMedicine
}