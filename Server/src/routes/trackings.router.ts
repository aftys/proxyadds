import { Router } from 'express';
import {
  createTracking,
  getAllTrackings,
  getTrackingById,
  updateTracking,
  deleteTracking,
} from '../controllers/trackings.controller';

const router: Router = Router();

router.post('/', createTracking);
router.get('/', getAllTrackings);
router.get('/:id', getTrackingById);
router.put('/:id', updateTracking);
router.delete('/:id', deleteTracking);

export default router;
