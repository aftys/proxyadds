import { Router } from 'express';
const router: Router = Router();
import {
  createBusinessActivity,
  getAllBusinessActivities,
  getBusinessActivityById,
  updateBusinessActivity,
  deleteBusinessActivity,
} from '../controllers/businessActivities.controller';

router.post('/', createBusinessActivity);
router.get('/', getAllBusinessActivities);
router.get('/:id', getBusinessActivityById);
router.put('/:id', updateBusinessActivity);
router.delete('/:id', deleteBusinessActivity);

export default router;
