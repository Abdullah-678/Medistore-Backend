import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router=Router();
router.get("/",orderController.getAllOrder)
router.get("/:orderId",orderController.getOrderById)
router.post("/createorder",auth(UserRole.CUSTOMER),orderController.createOrder)

export const orderRoute=router;