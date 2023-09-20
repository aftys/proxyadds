import { Request, Response } from 'express';
import { ITracking } from '../models/trackings.model';
import Tracking from '../models/trackings.model';

async function createTracking(req: Request, res: Response) {
  try {
    const { type, date, display_time,placement_id, campaign_id } = req.body;
    const newTracking: ITracking = new Tracking({
      type,
      date,
      display_time,
      campaign_id,
      placement_id,
      deleted: false,
    });
    const savedTracking = await newTracking.save();
    res.status(201).json(savedTracking);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating tracking' });
  }
}

async function getTrackingsByCampaignId(req: Request, res: Response) {
  try {
    const campaignId=req.params.campaignId
    const trackings: ITracking[] = await Tracking.find({ deleted: false,campaign_id:campaignId }).populate('campaign_id');
    res.json(trackings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trackings' });
  }
}

async function getAllTrackings(req: Request, res: Response) {
  try {
    const trackings: ITracking[] = await Tracking.find({ deleted: false }).populate('campaign_id');
    res.json(trackings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trackings' });
  }
}

async function getTrackingById(req: Request, res: Response) {
  try {
    const trackingId = req.params.id;
    const tracking: ITracking | null = await Tracking.findById(trackingId).where({ deleted: false }).populate('campaign_id');
    if (tracking) {
      res.json(tracking);
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tracking' });
  }
}

async function updateTracking(req: Request, res: Response) {
  try {
    const trackingId = req.params.id;
    const { type, date, display_time, campaign_id } = req.body;
    const updatedTracking: ITracking | null = await Tracking.findByIdAndUpdate(
      trackingId,
      { type, date, display_time, campaign_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedTracking) {
      res.json(updatedTracking);
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating tracking' });
  }
}

async function deleteTracking(req: Request, res: Response) {
  try {
    const trackingId = req.params.id;
    const softDeletedTracking: ITracking | null = await Tracking.findByIdAndUpdate(
      trackingId,
      { deleted: true }
    );

    if (softDeletedTracking) {
      res.json({ message: 'Tracking soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting tracking' });
  }
}

export {
  createTracking,
  getAllTrackings,
  getTrackingById,
  updateTracking,
  deleteTracking,
  getTrackingsByCampaignId
};
