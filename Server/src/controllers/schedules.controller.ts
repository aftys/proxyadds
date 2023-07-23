import { Request, Response } from 'express';
import { ISchedule } from '../models/schedule.model';
import Schedule from '../models/schedule.model';

async function createSchedule(req: Request, res: Response) {
  try {
    const { opening_hour, closing_hour, day, business_id } = req.body;
    const newSchedule: ISchedule = new Schedule({
      opening_hour,
      closing_hour,
      day,
      business_id,
      deleted: false
    });
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule' });
  }
}

async function getAllSchedules(req: Request, res: Response) {
  try {
    const schedules: ISchedule[] = await Schedule.find({ deleted: false }).populate('business_id');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules' });
  }
}

async function getScheduleById(req: Request, res: Response) {
  try {
    const scheduleId = req.params.id;
    const schedule: ISchedule | null = await Schedule.findById(scheduleId).where({ deleted: false }).populate('business_id');
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule' });
  }
}

async function updateSchedule(req: Request, res: Response) {
  try {
    const scheduleId = req.params.id;
    const { opening_hour, closing_hour, day, business_id } = req.body;
    const updatedSchedule: ISchedule | null = await Schedule.findByIdAndUpdate(
      scheduleId,
      { opening_hour, closing_hour, day, business_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedSchedule) {
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule' });
  }
}

async function deleteSchedule(req: Request, res: Response) {
  try {
    const scheduleId = req.params.id;
    const softDeletedSchedule: ISchedule | null = await Schedule.findByIdAndUpdate(
      scheduleId,
      { deleted: true }
    );

    if (softDeletedSchedule) {
      res.json({ message: 'Schedule soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting schedule' });
  }
}

export {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
