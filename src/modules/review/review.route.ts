import { Router} from 'express'
import { reviewController } from './review.controller';
import auth, { UserRole } from '../../middleware/auth';

const router=Router();
router.post("/createreview",auth(UserRole.CUSTOMER),reviewController.createReview)
router.get("/:reviewId",auth(UserRole.CUSTOMER),reviewController.getReviewById)
router.delete("/:reviewId",auth(UserRole.CUSTOMER),reviewController.deleteReview)
router.patch("/:reviewId",auth(UserRole.CUSTOMER),reviewController.updateReview)
export const reviewRouter=router;