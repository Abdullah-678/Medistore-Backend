import { Orders, OrderStatus } from "../../../generated/prisma/client";
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

const updateOrderStatus=async(orderId:string,order_status:OrderStatus,userId:string)=>{
 
  const orderData=await prisma.orders.findFirst({
  where:{
    id:orderId,
    medicines:{
      seller_id:userId
    }
  },
  select:{
    id:true
  }
})
if(!orderData){
  throw new Error("your provided input is invalid")
}

const result=await prisma.orders.update({
  where:{
    id:orderId,

  },
  data:{order_status}
})
return result;

}

export const orderService={
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderStatus
}