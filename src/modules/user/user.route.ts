import { Router} from 'express'
import { userController } from './user.controller';
import auth, { UserRole } from '../../middleware/auth';

const router=Router();
router.get("/admin/users",auth(UserRole.ADMIN),userController.getAllUser)
router.get("/me",userController.getCurrentUser)
router.patch("/profile/:userId",auth(UserRole.CUSTOMER),userController.updateMyProfile)
router.patch("/:userId",auth(UserRole.ADMIN),userController.updateBanUnban)

export const userRoute=router;