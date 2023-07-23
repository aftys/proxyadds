import { Router } from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaigns.controller';

const router: Router = Router();

router.post('/', createCampaign);
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;
