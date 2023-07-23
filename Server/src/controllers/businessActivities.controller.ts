import { Request, Response } from 'express';
import { IBusinessActivity } from '../models/businessActivity.model';
import BusinessActivity from '../models/businessActivity.model';

async function createBusinessActivity(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newBusinessActivity: IBusinessActivity = new BusinessActivity({ name:name,deleted:false });
    const savedBusinessActivity = await newBusinessActivity.save();
    res.status(201).json(savedBusinessActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business activity' });
  }
}

async function getAllBusinessActivities(req: Request, res: Response) {
  try {
    const businessActivities: IBusinessActivity[] = await BusinessActivity.find({ deleted: false });
    res.json(businessActivities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business activities' });
  }
}

async function getBusinessActivityById(req: Request, res: Response) {
  try {
    const businessActivityId = req.params.id;
    const businessActivity: IBusinessActivity | null = await BusinessActivity.findById(businessActivityId).where({ deleted: false });
    if (businessActivity) {
      res.json(businessActivity);
    } else {
      res.status(404).json({ message: 'Business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business activity' });
  }
}

async function updateBusinessActivity(req: Request, res: Response) {
  try {
    const businessActivityId = req.params.id;
    const { name } = req.body;
    const updatedBusinessActivity: IBusinessActivity | null = await BusinessActivity.findByIdAndUpdate(
      businessActivityId,
      { name },
      { new: true }
    ).where({ deleted: false });

    if (updatedBusinessActivity) {
      res.json(updatedBusinessActivity);
    } else {
      res.status(404).json({ message: 'Business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating business activity' });
  }
}

async function deleteBusinessActivity(req: Request, res: Response) {
  try {
    const businessActivityId = req.params.id;
    const softDeletedBusinessActivity: IBusinessActivity | null = await BusinessActivity.findByIdAndUpdate(
      businessActivityId,
      { deleted: true }
    );

    if (softDeletedBusinessActivity) {
      res.json({ message: 'Business activity soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting business activity' });
  }
}

export {
  createBusinessActivity,
  getAllBusinessActivities,
  getBusinessActivityById,
  updateBusinessActivity,
  deleteBusinessActivity,
};
