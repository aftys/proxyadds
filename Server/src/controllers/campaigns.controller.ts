import { Request, Response } from 'express';
import { ICampaign } from '../models/campaign.model';
import Campaign from '../models/campaign.model';

async function createCampaign(req: Request, res: Response) {
  try {
    const { name, budget_max, begin_date, end_date, file, display_hours, status, url, advertiser_id } = req.body;
    const newCampaign: ICampaign = new Campaign({
      name,
      budget_max,
      begin_date,
      end_date,
      file,
      display_hours,
      status,
      url,
      advertiser_id,
      deleted: false,
    });
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign' });
  }
}

async function getAllCampaigns(req: Request, res: Response) {
  try {
    const campaigns: ICampaign[] = await Campaign.find({ deleted: false });
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
