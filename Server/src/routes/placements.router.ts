import { Router } from 'express';
import { createPlacement, getAllPlacements, getPlacementById, updatePlacement, deletePlacement } from '../controllers/placements.controller';
import auth  from '../middlewares/auth';
const router: Router = Router();

router.post('/', auth('admin'), createPlacement);
router.get('/', auth('admin'), getAllPlacements);
router.get('/:id', auth('admin'), getPlacementById);
router.put('/:id', auth('admin'), updatePlacement);
router.delete('/:id', auth('admin'),deletePlacement);

export default router;
