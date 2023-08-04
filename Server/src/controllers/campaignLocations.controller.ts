import { Request, Response } from 'express';
import { ICampaignLocation } from '../models/campaignLocation.model';
import CampaignLocation from '../models/campaignLocation.model';

async function createCampaignLocation(req: Request, res: Response) {
  try {
    const { location_ids, campaign_id } = req.body;
    const campaignLocation: Partial<ICampaignLocation>[] = location_ids.map(
      (location_id: number) => ({
        location_id,
        campaign_id,
        deleted: false,
      })
    );

    const savedCampaignBusinessActivities = await CampaignLocation.insertMany(
      campaignLocation
    );

    res.status(201).json(savedCampaignBusinessActivities);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign location' });
  }
}

async function getAllCampaignLocations(req: Request, res: Response) {
  try {
    const campaignLocations: ICampaignLocation[] = await CampaignLocation.find({ deleted: false }).populate('campaign_id').populate('location_id');
    res.json(campaignLocations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign locations' });
  }
}

async function getCampaignLocationById(req: Request, res: Response) {
  try {
    const campaignLocationId = req.params.id;
    const campaignLocation: ICampaignLocation | null = await CampaignLocation.findById(campaignLocationId).where({ deleted: false }).populate('campaign_id').populate('location_id');
    if (campaignLocation) {
      res.json(campaignLocation);
    } else {
      res.status(404).json({ message: 'Campaign location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign location' });
  }
}

async function updateCampaignLocation(req: Request, res: Response) {
  try {
    const campaignLocationId = req.params.id;
    const { campaign_id, location_id, radius } = req.body;
    const updatedCampaignLocation: ICampaignLocation | null = await CampaignLocation.findByIdAndUpdate(
      campaignLocationId,
      { campaign_id, location_id, radius },
      { new: true }
    ).where({ deleted: false });

    if (updatedCampaignLocation) {
      res.json(updatedCampaignLocation);
    } else {
      res.status(404).json({ message: 'Campaign location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign location' });
  }
}

async function deleteCampaignLocation(req: Request, res: Response) {
  try {
    const campaignLocationId = req.params.id;
    const softDeletedCampaignLocation: ICampaignLocation | null = await CampaignLocation.findByIdAndUpdate(
      campaignLocationId,
      { deleted: true }
    );

    if (softDeletedCampaignLocation) {
      res.json({ message: 'Campaign location soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting campaign location' });
  }
}

export {
  createCampaignLocation,
  getAllCampaignLocations,
  getCampaignLocationById,
  updateCampaignLocation,
  deleteCampaignLocation,
};
