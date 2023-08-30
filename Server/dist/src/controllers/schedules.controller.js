"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessSchedules = exports.getSchedulesByDay = exports.deleteSchedule = exports.updateSchedule = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const schedule_model_1 = __importDefault(require("../models/schedule.model"));
const dayjs_1 = __importDefault(require("dayjs"));
function createSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = req.body.events;
            const business_id = req.body.business_id;
            const schedules = [];
            for (const event of events) {
                const { opening_hour, closing_hour, day, recurrence, recurrenceCount } = event;
                const recurrenceCountNum = recurrenceCount;
                const getNextDay = (currentDay) => {
                    const nextDate = new Date(currentDay);
                    nextDate.setDate(nextDate.getDate() + 1);
                    return nextDate.toISOString().slice(0, 10);
                };
                let currentDay = (0, dayjs_1.default)(day).format('YYYY-MM-DD');
                if (recurrence === "none") {
                    const newSchedule = new schedule_model_1.default({
                        opening_hour,
                        closing_hour,
                        day: currentDay,
                        business_id,
                        deleted: false,
                    });
                    schedules.push(newSchedule);
                }
                else {
                    for (let i = 0; i < recurrenceCountNum; i++) {
                        const newSchedule = new schedule_model_1.default({
                            opening_hour,
                            closing_hour,
                            day: currentDay,
                            business_id,
                            deleted: false,
                        });
                        schedules.push(newSchedule);
                        if (recurrence === 'daily') {
                            currentDay = getNextDay(currentDay);
                        }
                        else if (recurrence === 'weekly') {
                            const nextDate = new Date(currentDay);
                            nextDate.setDate(nextDate.getDate() + 7);
                            currentDay = nextDate.toISOString().slice(0, 10);
                        }
                    }
                }
            }
            const savedSchedules = yield schedule_model_1.default.insertMany(schedules);
            console.log(savedSchedules);
            res.status(201).json(savedSchedules);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating schedule', error });
        }
    });
}
exports.createSchedule = createSchedule;
function getAllSchedules(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schedules = yield schedule_model_1.default.find({ deleted: false }).populate('business_id');
            res.json(schedules);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching schedules' });
        }
    });
}
exports.getAllSchedules = getAllSchedules;
function getBusinessSchedules(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessId = req.params.id;
            const schedules = yield schedule_model_1.default.find({ deleted: false, business_id: businessId });
            if (schedules) {
                res.json(schedules);
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching schedule' });
        }
    });
}
exports.getBusinessSchedules = getBusinessSchedules;
function getSchedulesByDay(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { day } = req.body;
            const { id } = req.params;
            // Query the database to find all schedules with the specified day
            const schedules = yield schedule_model_1.default.find({ day: day, business_id: id });
            res.status(200).json(schedules);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching schedules', error });
        }
    });
}
exports.getSchedulesByDay = getSchedulesByDay;
function getScheduleById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleId = req.params.id;
            const schedule = yield schedule_model_1.default.findById(scheduleId).where({ deleted: false }).populate('business_id');
            if (schedule) {
                res.json(schedule);
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching schedule' });
        }
    });
}
exports.getScheduleById = getScheduleById;
function updateSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleId = req.params.id;
            const { opening_hour, closing_hour, day, business_id } = req.body;
            const updatedSchedule = yield schedule_model_1.default.findByIdAndUpdate(scheduleId, { opening_hour, closing_hour, day, business_id }, { new: true }).where({ deleted: false });
            if (updatedSchedule) {
                res.json(updatedSchedule);
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating schedule' });
        }
    });
}
exports.updateSchedule = updateSchedule;
function deleteSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scheduleId = req.params.id;
            const softDeletedSchedule = yield schedule_model_1.default.findByIdAndUpdate(scheduleId, { deleted: true });
            if (softDeletedSchedule) {
                res.json({ message: 'Schedule soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting schedule' });
        }
    });
}
exports.deleteSchedule = deleteSchedule;
