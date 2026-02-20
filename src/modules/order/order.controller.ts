import { Request, Response } from "express"
import { orderService } from "./order.service"

const createOrder=async (req:Request,res:Response)=>{
  // console.log(req.body)
   try{
    
   
      const result=await orderService.createOrder(req.body );
      res.status(201).json(result)
   }catch(err){
    res.status(400).json({
      error:"order creation failed",
      details:err
    })
   }
}

const getAllOrder=async(req:Request,res:Response)=>{
 try{
   const result=await orderService.getAllOrder();
   res.status(200).json(result);
  }catch(err){
        res.status(400).json({
      error:"get all orders are  failed",
      details:err
    })
  }
}

const getOrderById=async(req:Request,res:Response)=>{
try{
  const {orderId}=req.params;
  
 if(!orderId){
  throw new Error("order id is required!")
 }
const result=await orderService.getOrderById(orderId as string)
res.status(200).json(result)
}catch(err){
    res.status(400).json({
      error:"get  order by id is failed",
      details:err
    })
   }
}


export const orderController={
  createOrder,
  getAllOrder,
  getOrderById
}