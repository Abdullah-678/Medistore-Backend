import { Router } from "express";
import { orderController } from "./order.controller";

const router=Router();
router.get("/",orderController.getAllOrder)
router.get("/:orderId",orderController.getOrderById)
router.post("/createorder",orderController.createOrder)

export const orderRoute=router;