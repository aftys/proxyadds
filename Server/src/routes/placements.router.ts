import { Router } from 'express';
import { createPlacement, getAllPlacements,getPlacementsByBusinessId, getPlacementById, updatePlacement, deletePlacement } from '../controllers/placements.controller';
const router: Router = Router();

router.post('/', createPlacement);
router.get('/', getAllPlacements);
router.get('/business/:user_id', getPlacementsByBusinessId);
router.get('/:id', getPlacementById);
router.put('/:id', updatePlacement);
router.delete('/:id',deletePlacement);

export default router;
