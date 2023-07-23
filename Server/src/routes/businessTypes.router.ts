import { Router } from 'express';
import { createBusinessType, getAllBusinessTypes, getBusinessTypeById, updateBusinessType, deleteBusinessType } from '../controllers/businessTypes.controller';

const router: Router = Router();

router.post('/', createBusinessType);
router.get('/', getAllBusinessTypes);
router.get('/:id', getBusinessTypeById);
router.put('/:id', updateBusinessType);
router.delete('/:id', deleteBusinessType);

export default router;
