import { Router } from 'express';
import {
  createParameter,
  getAllParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
} from '../controllers/parameters.controller';

const router: Router = Router();

router.post('/', createParameter);
router.get('/', getAllParameters);
router.get('/:id', getParameterById);
router.put('/:id', updateParameter);
router.delete('/:id', deleteParameter);

export default router;
