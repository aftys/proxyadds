import { Request, Response } from 'express';
import { ICampaignBusinessType } from '../models/campaignBusinessType.model';
import CampaignBusinessType from '../models/campaignBusinessType.model';

async function createCampaignBusinessType(req: Request, res: Response) {
  try {
    const { businessType_ids, campaign_id } = req.body;
    const businessTypes: Partial<ICampaignBusinessType>[] = businessType_ids.map(
      (business_type_id: number) => ({
        business_type_id,
        campaign_id,
        deleted: false,
      })
    );
    const savedCampaignBusinessActivities = await CampaignBusinessType.insertMany(
      businessTypes
    );
    res.status(201).json(savedCampaignBusinessActivities);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating campaign business type' });
  }
}

async function getAllCampaignBusinessTypes(req: Request, res: Response) {
  try {
    const campaignBusinessTypes: ICampaignBusinessType[] = await CampaignBusinessType.find({ deleted: false }).populate('business_type_id').populate('campaign_id');
    res.json(campaignBusinessTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign business types' });
  }
}

async function getCampaignBusinessTypeById(req: Request, res: Response) {
  try {
    const campaignBusinessTypeId = req.params.id;
    const campaignBusinessType: ICampaignBusinessType | null = await CampaignBusinessType.findById(campaignBusinessTypeId).where({ deleted: false }).populate('business_type_id').populate('campaign_id');
    if (campaignBusinessType) {
      res.json(campaignBusinessType);
    } else {
      res.status(404).json({ message: 'Campaign business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign business type' });
  }
}

async function updateCampaignBusinessType(req: Request, res: Response) {
  try {
    const campaignBusinessTypeId = req.params.id;
    const { businesstype_id, campaign_id, campaign_name, type_name } = req.body;
    const updatedCampaignBusinessType: ICampaignBusinessType | null = await CampaignBusinessType.findByIdAndUpdate(
      campaignBusinessTypeId,
      { businesstype_id, campaign_id, campaign_name, type_name },
      { new: true }
    ).where({ deleted: false });

    if (updatedCampaignBusinessType) {
      res.json(updatedCampaignBusinessType);
    } else {
      res.status(404).json({ message: 'Campaign business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign business type' });
  }
}

async function deleteCampaignBusinessType(req: Request, res: Response) {
  try {
    const campaignBusinessTypeId = req.params.id;
    const softDeletedCampaignBusinessType: ICampaignBusinessType | null = await CampaignBusinessType.findByIdAndUpdate(
      campaignBusinessTypeId,
      { deleted: true }
    );

    if (softDeletedCampaignBusinessType) {
      res.json({ message: 'Campaign business type soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting campaign business type' });
  }
}

export {
  createCampaignBusinessType,
  getAllCampaignBusinessTypes,
  getCampaignBusinessTypeById,
  updateCampaignBusinessType,
  deleteCampaignBusinessType,
};
