import { Request, Response } from 'express';
import { ICampaign } from '../models/campaign.model';
import Campaign from '../models/campaign.model';
import mongoose from 'mongoose';
import fs from  'fs';




const conn = mongoose.connection;
let gridfs: mongoose.mongo.GridFSBucket;
conn.once('open', () => {
    gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
});

const createCampaign = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const filename = file.originalname;
        console.log(file);
        console.log('post');

        // Upload the file to GridFS
        const uploadStream = gridfs.openUploadStream(filename, { contentType: file.mimetype });
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(uploadStream);

        await new Promise((reject) => {
            uploadStream.on('error', (error) => {
                console.error(error);
                reject(error);
            });

            uploadStream.on('finish', () => {
                console.log("test");
                const fileId: string = uploadStream.id.toString();
                const { name, budget_max, begin_date, end_date, display_hours, status, url, advertiser_id } = req.body;
                const newCampaign: ICampaign = new Campaign({
                    name,
                    budget_max,
                    begin_date,
                    end_date,
                    file: fileId, // Store the file data as a binary buffer
                    display_hours,
                    status:"finished",
                    url,
                    advertiser_id,
                    deleted: false,
                });
                console.log(newCampaign)
                newCampaign.save();
            });
        });

    }catch(err){}
};

async function getAllCampaigns(req: Request, res: Response){
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
