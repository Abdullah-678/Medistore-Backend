import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router=Router();
router.get("/",auth(UserRole.ADMIN),orderController.getAllOrder)
router.get("/seller",auth(UserRole.SELLER),orderController.getIncomingOrders)
router.get("/:orderId",orderController.getOrderById)
router.post("/createorder",auth(UserRole.CUSTOMER),orderController.createOrder)
router.patch("/:orderId",auth(UserRole.SELLER),orderController.updateOrderStatus)
export const orderRoute=router;