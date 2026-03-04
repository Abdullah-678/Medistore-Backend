import { Cart } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllCart=async()=>{
  const result=await prisma.cart.findMany();
  return result;
}

const createCart=async(data:Omit<Cart,'id' | 'created_at'>,userId:string)=>{
  const result=await prisma.cart.create({
   data:{
    ...data,
    user_id:userId
   }
  })
  return result;
}

const deleteCart=async(cartId :string,userId:string)=>{
const cartData=await prisma.cart.findFirst({
  where:{
    id:cartId,
    user_id:userId
  },
  select:{
    id:true
  }
})
if(!cartData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.cart.delete({
  where:{
    id:cartData.id
  }
})
return result;

}

export const cartService={
  createCart,
  getAllCart,
  deleteCart
}