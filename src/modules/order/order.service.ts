import { Orders, OrderStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getAllOrder=async()=>{
  const result=await prisma.orders.findMany();
  return result;
}
const getIncomingOrders=async(userId:string)=>{

  const result=await prisma.orders.findMany({
    where:{
      medicines:{
        seller_id:userId
      }
    }
  });
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
    const medicine = await prisma.medicines.findUnique({
    where: { id: data.medicine_id },
    select: { price: true, stock: true }
  });

   if (!medicine) {
    throw new Error("Medicine not found");
  }

    if (medicine.stock < data.quantity) {
    throw new Error("Not enough stock available");
  }

    const totalPrice = medicine.price * data.quantity;


  const result=await prisma.orders.create({
    data:{
      ...data,
      customer_id:userId,
      total_price:totalPrice,
      
    }
  })
  return result;
}

const updateOrderStatus=async(orderId:string,order_status:OrderStatus,userId:string)=>{
 
  const orderData=await prisma.orders.findFirst({
  where:{
    id:orderId,
  
    
  },
  include:{
    medicines:{
      select:{seller_id:true}
    }
  }
 
})
if(!orderData){
  throw new Error("your provided input is invalid")
}

const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  });

  // console.log(currentUser)
   if (!currentUser) {
    throw new Error("User not found");
  }

    // CUSTOMER LOGIC
  if (currentUser.role === "CUSTOMER") {

    if (orderData.customer_id !== userId) {
      throw new Error("You are not allowed");
    }

    if (order_status !== "CANCELLED") {
      throw new Error("Customer can only cancel order");
    }
  }
  

   //  SELLER LOGIC
  if (currentUser.role === "SELLER") {

       if (orderData.medicines.seller_id !== userId) {
      throw new Error("You are not allowed");
    }


    if (order_status === "CANCELLED") {
      throw new Error("Seller cannot cancel order");
    }
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
  updateOrderStatus,
  getIncomingOrders
}