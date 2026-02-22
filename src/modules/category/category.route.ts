import { Router } from "express";
import { categoryController } from "./category.controller";
import auth, { UserRole } from "../../middleware/auth";

const router=Router();
router.get("/",auth(UserRole.ADMIN),categoryController.getAllCategory)
router.post("/createcategory",auth(UserRole.ADMIN),categoryController.createcategory)
router.delete("/:categoryId",auth(UserRole.ADMIN),categoryController.deleteCategory)
router.patch("/:categoryId",auth(UserRole.ADMIN),categoryController.updateCategory)
export const categoryRouter=router;