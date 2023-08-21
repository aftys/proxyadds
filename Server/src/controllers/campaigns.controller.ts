import { Request, Response } from 'express';
import { ICampaign } from '../models/campaign.model';
import Campaign from '../models/campaign.model';
import CampaignBusinessActivity from '../models/campaignBusinessActivity.model';
import CampaignBusinessType from '../models/campaignBusinessActivity.model';
import CampaignLocation from '../models/campaignLocation.model';


const createCampaign = async (req: Request, res: Response) => {
  try {
    const {
      name,
      budget_max,
      begin_date,
      end_date,
      display_hours,
      status,
      url,
      advertiser_id,
      business_type_ids,
      business_activity_ids,
      location_ids,
    } = req.body;
    console.log(req.body)
    const newCampaign: ICampaign = new Campaign({
      name,
      budget_max,
      begin_date,
      end_date,
      file: req.file.path,
      display_hours,
      status,
      url,
      advertiser_id,
      deleted: false,
    });

    const savedCampaign = await newCampaign.save();

    if (!savedCampaign) {
      return res.status(500).json({ message: 'Error creating campaign' });
    }

    const businessTypeIdsArray = Array.isArray(business_type_ids)
      ? business_type_ids
      : business_type_ids.split(',');

    const businessActivityIdsArray = Array.isArray(business_activity_ids)
      ? business_activity_ids
      : business_activity_ids.split(',');

    const locationIdsArray = Array.isArray(location_ids)
      ? location_ids
      : location_ids.split(',');

    console.log(businessTypeIdsArray, businessActivityIdsArray, locationIdsArray)
    await Promise.all(
      businessTypeIdsArray.map(async (businessTypeId: string) => {
        if (businessTypeId !== '') {
          const campaignBusinessType = new CampaignBusinessType({
            campaign_id: savedCampaign._id,
            business_type_id: businessTypeId,
            deleted: false,
          });
          await campaignBusinessType.save();
        }
      })
    );

    // Save CampaignBusinessActivity instances
    await Promise.all(
      businessActivityIdsArray.map(async (businessActivityId: string) => {
        if (businessActivityId !== '') { // Check for non-empty and defined value
          const campaignBusinessActivity = new CampaignBusinessActivity({
            campaign_id: savedCampaign._id,
            business_activity_id: businessActivityId,
            deleted: false,
          });
          await campaignBusinessActivity.save();
        }
      })
    );

    // Save CampaignLocation instances
    await Promise.all(
      locationIdsArray.map(async (locationId: string) => {
        if (locationId !== '') {
          const campaignLocation = new CampaignLocation({
            campaign_id: savedCampaign._id,
            location_id: locationId,
            deleted: false,
          });
          await campaignLocation.save();
        }
      })
    );

    res.status(200).json({ message: 'Campaign created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating campaign' });
  }
};


async function getAllCampaigns(req: Request, res: Response) {
  try {
    const campaigns = await Campaign.find({ deleted: false });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
}

async function getCampaignById(req: Request, res: Response) {
  try {
    const campaignId = req.params.id;
    const campaign: ICampaign | null = await Campaign.findById(campaignId).where({ deleted: false });
    if (campaign) {
      res.json(campaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign' });
  }
}

async function updateCampaign(req: Request, res: Response) {
  try {
    const campaignId = req.params.id;
    const { name, budget_max, begin_date, end_date, file, display_hours, status, url, advertiser_id } = req.body;
    const updatedCampaign: ICampaign | null = await Campaign.findByIdAndUpdate(
      campaignId,
      { name, budget_max, begin_date, end_date, file, display_hours, status, url, advertiser_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedCampaign) {
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign' });
  }
}

async function deleteCampaign(req: Request, res: Response) {
  try {
    const campaignId = req.params.id;
    const softDeletedCampaign: ICampaign | null = await Campaign.findByIdAndUpdate(
      campaignId,
      { deleted: true }
    );

    if (softDeletedCampaign) {
      res.json({ message: 'Campaign soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting campaign' });
  }
}

export {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
