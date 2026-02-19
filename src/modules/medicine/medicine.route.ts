import { Router} from 'express'
import { medicineController } from './medicine.controller';

import auth, { UserRole } from '../../middleware/auth';

const router=Router();

router.get("/",medicineController.getAllMedicine)
router.get("/:medicineid",medicineController.getMedicineById)

router.post("/createmedicine",auth(UserRole.SELLER),medicineController.createMedicine)

export const medicineRouter=router;