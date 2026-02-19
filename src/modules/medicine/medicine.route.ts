import {NextFunction, Request, Response, Router} from 'express'
import { medicineController } from './medicine.controller';
import {auth as betterAuth} from '../../lib/auth'
import auth, { UserRole } from '../../middleware/auth';

const router=Router();

router.get("/",medicineController.getAllMedicine)
router.get("/:medicineid",medicineController.getMedicineById)

router.post("/createmedicine",auth(UserRole.SELLER),medicineController.createMedicine)

export const medicineRouter=router;