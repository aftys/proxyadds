import { Router } from 'express';
import { createAdvertiser, getAllAdvertisers, getAdvertiserById, updateAdvertiser, deleteAdvertiser } from '../controllers/advertisers.controller';

const router: Router = Router();

router.post('/', createAdvertiser);
router.get('/', getAllAdvertisers);
router.get('/:id', getAdvertiserById);
router.put('/:id', updateAdvertiser);
router.delete('/:id', deleteAdvertiser);

export default router;
