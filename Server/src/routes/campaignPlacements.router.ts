import { Router } from 'express';
import {
  createCampaignPlacement,
  getAllCampaignPlacements,
  getCampaignPlacementById,
  updateCampaignPlacement,
  deleteCampaignPlacement,
} from '../controllers/campaignPlacements.controller';

const router: Router = Router();

router.post('/', createCampaignPlacement);
router.get('/', getAllCampaignPlacements);
router.get('/:id', getCampaignPlacementById);
router.put('/:id', updateCampaignPlacement);
router.delete('/:id', deleteCampaignPlacement);

export default router;
