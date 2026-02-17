import {Router} from 'express'
import { medicineController } from './medicine.controller';
const router=Router();

router.post("/createmedicine",medicineController.createMedicine)

export const medicineRouter=router;