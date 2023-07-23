import { Request, Response } from 'express';
import { IBusinessType } from '../models/businessType.model';
import BusinessType from '../models/businessType.model';

async function createBusinessType(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newBusinessType: IBusinessType = new BusinessType({ name, deleted: false });
    const savedBusinessType = await newBusinessType.save();
    res.status(201).json(savedBusinessType);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business type' });
  }
}

async function getAllBusinessTypes(req: Request, res: Response) {
  try {
    const businessTypes: IBusinessType[] = await BusinessType.find({ deleted: false });
    res.json(businessTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business types' });
  }
}

async function getBusinessTypeById(req: Request, res: Response) {
  try {
    const businessTypeId = req.params.id;
    const businessType: IBusinessType | null = await BusinessType.findById(businessTypeId).where({ deleted: false });
    if (businessType) {
      res.json(businessType);
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business type' });
  }
}

async function updateBusinessType(req: Request, res: Response) {
  try {
    const businessTypeId = req.params.id;
    const { name } = req.body;
    const updatedBusinessType: IBusinessType | null = await BusinessType.findByIdAndUpdate(
      businessTypeId,
      { name },
      { new: true }
    ).where({ deleted: false });

    if (updatedBusinessType) {
      res.json(updatedBusinessType);
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating business type' });
  }
}

async function deleteBusinessType(req: Request, res: Response) {
  try {
    const businessTypeId = req.params.id;
    const softDeletedBusinessType: IBusinessType | null = await BusinessType.findByIdAndUpdate(
      businessTypeId,
      { deleted: true }
    );

    if (softDeletedBusinessType) {
      res.json({ message: 'Business type soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting business type' });
  }
}

export {
  createBusinessType,
  getAllBusinessTypes,
  getBusinessTypeById,
  updateBusinessType,
  deleteBusinessType,
};
