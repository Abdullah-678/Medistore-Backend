import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { cartController } from "./cart.controller";

const router=Router();
router.post("/addtocart",auth(UserRole.CUSTOMER),cartController.createCart)
router.get("/",auth(UserRole.CUSTOMER),cartController.getAllCart)
router.delete("/:cartId",auth(UserRole.CUSTOMER),cartController.deleteCart)

export const cartRouter=router;