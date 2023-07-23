import { Request, Response } from 'express';
import { IAdvertiser } from '../models/advertiser.model';
import Advertiser from '../models/advertiser.model';

async function createAdvertiser(req: Request, res: Response) {
  try {
    const { user_id, act_id } = req.body;
    const newAdvertiser: IAdvertiser = new Advertiser({ user_id, act_id, deleted: false });
    const savedAdvertiser = await newAdvertiser.save();
    res.status(201).json(savedAdvertiser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating advertiser' });
  }
}

async function getAllAdvertisers(req: Request, res: Response) {
  try {
    const advertisers: IAdvertiser[] = await Advertiser.find({ deleted: false }).populate('user_id act_id');
    res.json(advertisers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advertisers' });
  }
}

async function getAdvertiserById(req: Request, res: Response) {
  try {
    const advertiserId = req.params.id;
    const advertiser: IAdvertiser | null = await Advertiser.findById(advertiserId).where({ deleted: false }).populate('user_id act_id');
    if (advertiser) {
      res.json(advertiser);
    } else {
      res.status(404).json({ message: 'Advertiser not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advertiser' });
  }
}

async function updateAdvertiser(req: Request, res: Response) {
  try {
    const advertiserId = req.params.id;
    const { user_id, act_id } = req.body;
    const updatedAdvertiser: IAdvertiser | null = await Advertiser.findByIdAndUpdate(
      advertiserId,
      { user_id, act_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedAdvertiser) {
      res.json(updatedAdvertiser);
    } else {
      res.status(404).json({ message: 'Advertiser not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating advertiser' });
  }
}

async function deleteAdvertiser(req: Request, res: Response) {
  try {
    const advertiserId = req.params.id;
    const softDeletedAdvertiser: IAdvertiser | null = await Advertiser.findByIdAndUpdate(
      advertiserId,
      { deleted: true }
    );

    if (softDeletedAdvertiser) {
      res.json({ message: 'Advertiser soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Advertiser not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting advertiser' });
  }
}

export {
  createAdvertiser,
  getAllAdvertisers,
  getAdvertiserById,
  updateAdvertiser,
  deleteAdvertiser,
};
