import { Router } from 'express';
import {
  createCampaignBusinessActivity,
  getAllCampaignBusinessActivities,
  getCampaignBusinessActivityById,
  updateCampaignBusinessActivity,
  deleteCampaignBusinessActivity,
} from '../controllers/campaignBusinessActivities.controller';

const router: Router = Router();

router.post('/', createCampaignBusinessActivity);
router.get('/', getAllCampaignBusinessActivities);
router.get('/:id', getCampaignBusinessActivityById);
router.put('/:id', updateCampaignBusinessActivity);
router.delete('/:id', deleteCampaignBusinessActivity);

export default router;
