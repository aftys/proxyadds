import { Router } from 'express';
import {
  createCampaignLocation,
  getAllCampaignLocations,
  getCampaignLocationById,
  updateCampaignLocation,
  deleteCampaignLocation,
} from '../controllers/campaignLocations.controller';

const router: Router = Router();

router.post('/', createCampaignLocation);
router.get('/', getAllCampaignLocations);
router.get('/:id', getCampaignLocationById);
router.put('/:id', updateCampaignLocation);
router.delete('/:id', deleteCampaignLocation);

export default router;
