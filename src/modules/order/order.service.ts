import { Orders } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getAllOrder=async()=>{
  const result=await prisma.orders.findMany();
  return result;
}

const getOrderById=async(orderId:string)=>{
const result=await prisma.orders.findUnique({
  where:{
    id:orderId
  }
});
return result;
}

const createOrder=async (data:Omit<Orders,'id'  >,userId:string)=>{
  // console.log(data)
  const result=await prisma.orders.create({
    data:{
      ...data,
      customer_id:userId
    }
  })
  return result;
}

export const orderService={
  createOrder,
  getAllOrder,
  getOrderById
}