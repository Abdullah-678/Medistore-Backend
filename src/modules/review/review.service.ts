import { prisma } from "../../lib/prisma"

const createReview=async (payload:{
  comment:string,
  medicine_id:string,
  customer_id:string,
  parent_id?:string
})=>{

  await prisma.medicines.findUniqueOrThrow({
    where:{
      id:payload.medicine_id
    }
  })
if(payload.parent_id){
  await prisma.reviews.findUniqueOrThrow({
    where:{
      id:payload.parent_id
    }
  })
}
   const result=await prisma.reviews.create({
    data:payload
   })
return result;
}

export const reviewService={
  createReview
}