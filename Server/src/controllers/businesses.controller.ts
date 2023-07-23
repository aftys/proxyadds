import { Request, Response } from 'express';
import { IBusiness } from '../models/business.model';
import Business from '../models/business.model';

async function createBusiness(req: Request, res: Response) {
  try {
    const { user_id, location_id, longitude, altitude, business_type_id, business_activity_id } = req.body;
    const newBusiness: IBusiness = new Business({
      user_id,
      location_id,
      longitude,
      altitude,
      business_type_id,
      business_activity_id,
      deleted: false
    });
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business' });
  }
}

async function getAllBusinesses(req: Request, res: Response) {
  try {
    const businesses: IBusiness[] = await Business.find({ deleted: false }).populate([
      'user_id',
      'location_id',
      'business_type_id',
      'business_activity_id'
    ]);
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses' });
  }
}

async function getBusinessById(req: Request, res: Response) {
  try {
    const businessId = req.params.id;
    const business: IBusiness | null = await Business.findById(businessId).where({ deleted: false }).populate([
      'user_id',
      'location_id',
      'business_type_id',
      'business_activity_id'
    ]);
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business' });
  }
}

async function updateBusiness(req: Request, res: Response) {
  try {
    const businessId = req.params.id;
    const { user_id, location_id, longitude, altitude, business_type_id, business_activity_id } = req.body;
    const updatedBusiness: IBusiness | null = await Business.findByIdAndUpdate(
      businessId,
      { user_id, location_id, longitude, altitude, business_type_id, business_activity_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedBusiness) {
      res.json(updatedBusiness);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating business' });
  }
}

async function deleteBusiness(req: Request, res: Response) {
  try {
    const businessId = req.params.id;
    const softDeletedBusiness: IBusiness | null = await Business.findByIdAndUpdate(
      businessId,
      { deleted: true }
    );

    if (softDeletedBusiness) {
      res.json({ message: 'Business soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting business' });
  }
}

export {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
