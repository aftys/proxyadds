import { Router } from 'express';
import {
  createCampaignBusinessType,
  getAllCampaignBusinessTypes,
  getCampaignBusinessTypeById,
  updateCampaignBusinessType,
  deleteCampaignBusinessType,
} from '../controllers/campaignBusinessTypes.controller';

const router: Router = Router();

router.post('/', createCampaignBusinessType);
router.get('/', getAllCampaignBusinessTypes);
router.get('/:id', getCampaignBusinessTypeById);
router.put('/:id', updateCampaignBusinessType);
router.delete('/:id', deleteCampaignBusinessType);

export default router;
