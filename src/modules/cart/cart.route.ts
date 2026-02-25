import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { cartController } from "./cart.controller";

const router=Router();
router.post("/addtocart",auth(UserRole.CUSTOMER),cartController.createCart)

export const cartRouter=router;