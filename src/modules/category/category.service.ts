import { Categories, Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createcategory=async (data:Categories)=>{
  // console.log(data)
  const result=await prisma.categories.create({
   data
  })
  return result;
}

const getAllCategory=async()=>{
  const result=await prisma.categories.findMany();
  return result;
}

export const categoryService={
  createcategory,
  getAllCategory
}