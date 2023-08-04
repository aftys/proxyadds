import { Request, Response } from 'express';
import { ICampaignBusinessActivity } from '../models/campaignBusinessActivity.model';
import CampaignBusinessActivity from '../models/campaignBusinessActivity.model';

async function createCampaignBusinessActivity(req: Request, res: Response) {
  try {
    const { businessActivity_ids, campaign_id } = req.body;
    // const newCampaignBusinessActivity: ICampaignBusinessActivity = new CampaignBusinessActivity({
    //   businessActivity_ids,
    //   campaign_id,
    //   deleted: false,
    // });
    // const savedCampaignBusinessActivity = await newCampaignBusinessActivity.save();
    // Map the businessActivity_ids array to an array of objects
    // Map the businessActivity_ids array to an array of objects
   
    const businessActivities: Partial<ICampaignBusinessActivity>[] = businessActivity_ids.map(
      (businessActivity_id: number) => ({
        businessActivity_id,
        campaign_id,
        deleted: false,
      })
    );

    const savedCampaignBusinessActivities = await CampaignBusinessActivity.insertMany(
      businessActivities
    );

    res.status(201).json(savedCampaignBusinessActivities);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign business activity' });
  }
}

async function getAllCampaignBusinessActivities(req: Request, res: Response) {
  try {
    const campaignBusinessActivities: ICampaignBusinessActivity[] = await CampaignBusinessActivity.find({ deleted: false }).populate('businessActivity_ids').populate('campaign_id');
    res.json(campaignBusinessActivities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign business activities' });
  }
}

async function getCampaignBusinessActivityById(req: Request, res: Response) {
  try {
    const campaignBusinessActivityId = req.params.id;
    const campaignBusinessActivity: ICampaignBusinessActivity | null = await CampaignBusinessActivity.findById(campaignBusinessActivityId).where({ deleted: false }).populate('businessActivity_ids').populate('campaign_id');
    if (campaignBusinessActivity) {
      res.json(campaignBusinessActivity);
    } else {
      res.status(404).json({ message: 'Campaign business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign business activity' });
  }
}

async function updateCampaignBusinessActivity(req: Request, res: Response) {
  try {
    const campaignBusinessActivityId = req.params.id;
    const { businessActivity_ids, campaign_id } = req.body;
    const updatedCampaignBusinessActivity: ICampaignBusinessActivity | null = await CampaignBusinessActivity.findByIdAndUpdate(
      campaignBusinessActivityId,
      { businessActivity_ids, campaign_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedCampaignBusinessActivity) {
      res.json(updatedCampaignBusinessActivity);
    } else {
      res.status(404).json({ message: 'Campaign business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign business activity' });
  }
}

async function deleteCampaignBusinessActivity(req: Request, res: Response) {
  try {
    const campaignBusinessActivityId = req.params.id;
    const softDeletedCampaignBusinessActivity: ICampaignBusinessActivity | null = await CampaignBusinessActivity.findByIdAndUpdate(
      campaignBusinessActivityId,
      { deleted: true }
    );

    if (softDeletedCampaignBusinessActivity) {
      res.json({ message: 'Campaign business activity soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign business activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting campaign business activity' });
  }
}

export {
  createCampaignBusinessActivity,
  getAllCampaignBusinessActivities,
  getCampaignBusinessActivityById,
  updateCampaignBusinessActivity,
  deleteCampaignBusinessActivity,
};
