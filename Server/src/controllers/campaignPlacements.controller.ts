import { Request, Response } from 'express';
import { ICampaignPlacement } from '../models/campaignPlacement.model';
import CampaignPlacement from '../models/campaignPlacement.model';

async function createCampaignPlacement(req: Request, res: Response) {
  try {
    const { campaign_id, placement_id, tracking_id } = req.body;
    const newCampaignPlacement: ICampaignPlacement = new CampaignPlacement({
      campaign_id,
      placement_id,
      tracking_id,
      deleted: false,
    });
    const savedCampaignPlacement = await newCampaignPlacement.save();
    res.status(201).json(savedCampaignPlacement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign placement' });
  }
}

async function getAllCampaignPlacements(req: Request, res: Response) {
  try {
    const campaignPlacements: ICampaignPlacement[] = await CampaignPlacement.find({ deleted: false }).populate('campaign_id').populate('placement_id');
    res.json(campaignPlacements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign placements' });
  }
}

async function getCampaignPlacementById(req: Request, res: Response) {
  try {
    const campaignPlacementId = req.params.id;
    const campaignPlacement: ICampaignPlacement | null = await CampaignPlacement.findById(campaignPlacementId).where({ deleted: false }).populate('campaign_id').populate('placement_id');
    if (campaignPlacement) {
      res.json(campaignPlacement);
    } else {
      res.status(404).json({ message: 'Campaign placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign placement' });
  }
}

async function updateCampaignPlacement(req: Request, res: Response) {
  try {
    const campaignPlacementId = req.params.id;
    const { campaign_id, placement_id, tracking_id } = req.body;
    const updatedCampaignPlacement: ICampaignPlacement | null = await CampaignPlacement.findByIdAndUpdate(
      campaignPlacementId,
      { campaign_id, placement_id, tracking_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedCampaignPlacement) {
      res.json(updatedCampaignPlacement);
    } else {
      res.status(404).json({ message: 'Campaign placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign placement' });
  }
}

async function deleteCampaignPlacement(req: Request, res: Response) {
  try {
    const campaignPlacementId = req.params.id;
    const softDeletedCampaignPlacement: ICampaignPlacement | null = await CampaignPlacement.findByIdAndUpdate(
      campaignPlacementId,
      { deleted: true }
    );

    if (softDeletedCampaignPlacement) {
      res.json({ message: 'Campaign placement soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting campaign placement' });
  }
}

export {
  createCampaignPlacement,
  getAllCampaignPlacements,
  getCampaignPlacementById,
  updateCampaignPlacement,
  deleteCampaignPlacement,
};
