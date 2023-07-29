import { Router } from 'express';
import { createSchedule, getAllSchedules,getBusinessSchedules, getScheduleById, updateSchedule, deleteSchedule } from '../controllers/schedules.controller';

const router: Router = Router();


router.get('/business/:id', getBusinessSchedules);
router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.get('/:id', getScheduleById);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
