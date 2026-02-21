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

const getAllMedicine=async(payload:{search?:string |undefined})=>{
  const andConditions=[]
 if(payload.search){
  andConditions.push(
     { 
     OR:[
    { price:{
   equals:Number(payload.search)
   }},
  
   ]
  }, )
 }
  const result=await prisma.medicines.findMany({
    where:{
  AND:[
 
    {
      categories:{
    category_name:{
      contains:payload.search as string,
      mode:"insensitive"
    }
   }
  }
  ]
    }
  });
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

const deleteMedicine=async(medicineid :string,userId:string)=>{
const medicineData=await prisma.medicines.findFirst({
  where:{
    id:medicineid,
    seller_id:userId
  },
  select:{
    id:true
  }
})
if(!medicineData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.medicines.delete({
  where:{
    id:medicineData.id
  }
})
return result;

}

const updateMedicine=async(medicineid:string,data:{price?:number,stock?:number},userId:string)=>{
const medicineData=await prisma.medicines.findFirst({
  where:{
    id:medicineid,
    seller_id:userId
  },
  select:{
    id:true
  }
})
if(!medicineData){
  throw new Error("your provided input is invalid")
}
const result=await prisma.medicines.update({
  where:{
    id:medicineid,
    seller_id:userId
  },
  data
})
return result;
}

export const medicineService={
  createMedicine,
  getAllMedicine,
  getMedicineById,
  deleteMedicine,
  updateMedicine
}