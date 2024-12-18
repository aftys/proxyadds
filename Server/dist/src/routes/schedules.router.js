"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controller_1 = require("../controllers/schedules.controller");
const router = (0, express_1.Router)();
router.get('/business/:id', schedules_controller_1.getBusinessSchedules);
router.post('/business/:id/day', schedules_controller_1.getSchedulesByDay);
router.post('/', schedules_controller_1.createSchedule);
router.get('/', schedules_controller_1.getAllSchedules);
router.get('/:id', schedules_controller_1.getScheduleById);
router.put('/:id', schedules_controller_1.updateSchedule);
router.delete('/:id', schedules_controller_1.deleteSchedule);
exports.default = router;
