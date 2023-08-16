import { Router } from 'express';
import { createPlacement, getAllPlacements, getPlacementById, updatePlacement, deletePlacement } from '../controllers/placements.controller';
import auth  from '../middlewares/auth';
const router: Router = Router();

router.post('/', auth, createPlacement);
router.get('/', auth, getAllPlacements);
router.get('/:id', auth, getPlacementById);
router.put('/:id', auth, updatePlacement);
router.delete('/:id', auth, deletePlacement);

export default router;
