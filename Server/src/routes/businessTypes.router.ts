import { Router } from 'express';
import { createBusinessType, getAllBusinessTypes, getBusinessTypeById, updateBusinessType, deleteBusinessType, getBusinessTypesByActivityIds } from '../controllers/businessTypes.controller';

const router: Router = Router();

router.post('/', createBusinessType);
router.get('/', getAllBusinessTypes);
router.get('/:id', getBusinessTypeById);
router.get('/getBusinessTypesByActivityIds/:id', getBusinessTypesByActivityIds);
router.put('/:id', updateBusinessType);
router.delete('/:id', deleteBusinessType);

export default router;
