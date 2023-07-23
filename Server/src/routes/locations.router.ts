import { Router } from 'express';
import { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } from '../controllers/locations.controller';

const router: Router = Router();

router.post('/', createLocation);
router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
