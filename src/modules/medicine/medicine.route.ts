import { Router} from 'express'
import { medicineController } from './medicine.controller';

import auth, { UserRole } from '../../middleware/auth';

const router=Router();

router.get("/",medicineController.getAllMedicine)
router.get("/stats",auth(UserRole.SELLER),medicineController.getStats)
router.get("/:medicineid",medicineController.getMedicineById)

router.post("/createmedicine",auth(UserRole.SELLER),medicineController.createMedicine)
router.delete("/:medicineid",auth(UserRole.SELLER),medicineController.deleteMedicine)
router.patch("/:medicineid",auth(UserRole.SELLER),medicineController.updateMedicine)
export const medicineRouter=router;