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

const updateCategory=async(categoryId:string,data:{category_name?:string,description?:string})=>{
const categoryData=await prisma.categories.findFirst({
  where:{
    id:categoryId,
   
  },
  select:{
    id:true
  }
})
if(!categoryData){
  throw new Error("your provided input is invalid")
}
const result=await prisma.categories.update({
  where:{
    id:categoryId
   
  },
  data
})
return result;
}

const deleteCategory=async(categoryId :string)=>{
const categoryData=await prisma.categories.findFirst({
  where:{
    id:categoryId,
  
  },
  select:{
    id:true
  }
})
if(!categoryData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.categories.delete({
  where:{
    id:categoryData.id
  }
})
return result;

}

export const categoryService={
  createcategory,
  getAllCategory,
  deleteCategory,
  updateCategory
}