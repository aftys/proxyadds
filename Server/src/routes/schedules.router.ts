import { Router } from 'express';
import { createSchedule, getAllSchedules,getSchedulesByDay,getBusinessSchedules, getScheduleById, updateSchedule, deleteSchedule } from '../controllers/schedules.controller';

const router: Router = Router();


router.get('/business/:id', getBusinessSchedules);
router.post('/business/:id/day', getSchedulesByDay);
router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.get('/:id', getScheduleById);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
