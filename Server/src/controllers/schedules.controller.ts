import { Request, Response } from 'express';
import { ISchedule } from '../models/schedule.model';
import Schedule from '../models/schedule.model';
import dayjs, { Dayjs } from 'dayjs';


interface IEvent {
  opening_hour: string;
  closing_hour: string;
  day: Dayjs;
  recurrence: 'none' | 'daily' | 'weekly';
  recurrenceCount?: number;
  business_id: number;
  deleted: boolean;
}

async function createSchedule(req: Request, res: Response) {
  try {
    const events: IEvent[] = req.body.events;
    const business_id: string = req.body.business_id;
    const schedules: ISchedule[] = [];
    for (const event of events) {
      const { opening_hour, closing_hour, day, recurrence, recurrenceCount } = event;
      const recurrenceCountNum = recurrenceCount;

      const getNextDay = (currentDay: string): string => {
        const nextDate = new Date(currentDay);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate.toISOString().slice(0, 10);
      };

      let currentDay = dayjs(day).format('YYYY-MM-DD'); 
      if (recurrence === "none") {
        const newSchedule: ISchedule = new Schedule({
          opening_hour,
          closing_hour,
          day: currentDay,
          business_id,
          deleted: false,
        })
        schedules.push(newSchedule);
      } else {
        for (let i = 0; i < recurrenceCountNum; i++) {
          const newSchedule: ISchedule = new Schedule({
            opening_hour,
            closing_hour,
            day: currentDay,
            business_id,
            deleted: false,
          });

          schedules.push(newSchedule);

          if (recurrence === 'daily') {
            currentDay = getNextDay(currentDay);
          } else if (recurrence === 'weekly') {
            const nextDate = new Date(currentDay);
            nextDate.setDate(nextDate.getDate() + 7);
            currentDay = nextDate.toISOString().slice(0, 10);
          }
        }
      }
    }
    const savedSchedules = await Schedule.insertMany(schedules);
    console.log(savedSchedules);
    res.status(201).json(savedSchedules);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating schedule', error });
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

async function getBusinessSchedules(req: Request, res: Response) {
  try {
    const businessId = req.params.id;
    const schedules: ISchedule[] = await Schedule.find({ deleted: false, business_id: businessId });
    if (schedules) {
      res.json(schedules);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule' });
  }
}

async function getSchedulesByDay(req: Request, res: Response) {
  try {
    const { day } = req.body;
    const { id } = req.params;

    // Query the database to find all schedules with the specified day
    const schedules = await Schedule.find({ day: day, business_id: id });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
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
  getSchedulesByDay,
  getBusinessSchedules
};
