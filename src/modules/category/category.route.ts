import { Router } from "express";
import { categoryController } from "./category.controller";

const router=Router();
router.get("/",categoryController.getAllCategory)
router.post("/createcategory",categoryController.createcategory)

export const categoryRouter=router;