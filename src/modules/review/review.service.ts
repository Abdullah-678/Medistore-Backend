import { prisma } from "../../lib/prisma"


const getReviewById=async(reviewId:string)=>{
const result=await prisma.reviews.findUnique({
  where:{
    id:reviewId
  }
});
return result;
}

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

const updateReview=async(reviewId:string,data:{comment?:string},userId:string)=>{
const reviewData=await prisma.reviews.findFirst({
  where:{
    id:reviewId,
    customer_id:userId
  },
  select:{
    id:true
  }
})
if(!reviewData){
  throw new Error("your provided input is invalid")
}
const result=await prisma.reviews.update({
  where:{
    id:reviewId,
    customer_id:userId
  },
  data
})
return result;
}

const deleteReview=async(reviewId :string,userId:string)=>{
const reviewData=await prisma.reviews.findFirst({
  where:{
    id:reviewId,
    customer_id:userId
  },
  select:{
    id:true
  }
})
if(!reviewData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.reviews.delete({
  where:{
    id:reviewData.id
  }
})
return result;

}

export const reviewService={
  createReview,
  getReviewById,
  deleteReview,
  updateReview
}