import {getPlacementCamapaigns} from '../controllers/campaignAds.controller'
import { Router } from 'express';


const router: Router = Router();

router.get('/:user_id', getPlacementCamapaigns);

export default router;