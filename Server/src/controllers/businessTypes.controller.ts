import { Request, Response } from 'express';
import { IBusinessType } from '../models/businessType.model';
import BusinessType from '../models/businessType.model';
import mongoose from 'mongoose';

async function createBusinessType(req: Request, res: Response) {
  try {
    const { name, activity_id } = req.body;
    const newBusinessType: IBusinessType = new BusinessType({ name, activity_id, deleted: false });
    const savedBusinessType = await newBusinessType.save();
    res.status(201).json(savedBusinessType);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business type' });
  }
}

async function getAllBusinessTypes(req: Request, res: Response) {
  try {
    const businessTypes: IBusinessType[] = await BusinessType.find({ deleted: false }).populate('activity_id');
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
    const { name, activity_id } = req.body;
    const updatedBusinessType: IBusinessType | null = await BusinessType.findByIdAndUpdate(
      businessTypeId,
      { name, activity_id },
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

async function getBusinessTypesByActivityIds(req, res) {
  try {
    const activityId = req.params.id;
    console.log('activityId', activityId);
    
    // Find all business types that match the activity ID and are not deleted
    const businessTypes = await BusinessType.find({"activity_id": activityId, deleted: false });
    
    if (businessTypes.length > 0) {
      res.json(businessTypes);
    } else {
      res.status(404).json({ message: 'Business types not found for the given activity ID' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business types' });
  }
}


// async function getBusinessTypesByActivityIds(req: Request, res: Response) {
//   try {
//   const activityId = req.params.id;
//   console.log('activityId', activityId);
//   const businessType: IBusinessType | null = await BusinessType.findOne({"activity_id":activityId}).where({ deleted: false });
//   if (businessType) {
//   res.json(businessType);
//   } else {
//   res.status(404).json({ message: 'Business type not found' });
//   }
//   } catch (error) {
//   res.status(500).json({ message: 'Error fetching business type' });
//   }
//   }

// async function getBusinessTypesByActivityIds(req: Request, res: Response) {
//   try {
//     const activityIds: string[] = req.query.activity_ids as string[];

//     const businessTypes: IBusinessType[] = await BusinessType.find({
//       activity_id: { $in: activityIds.map(activityId => new mongoose.Types.ObjectId(activityId)) },
//       deleted: false
//     });

//     res.json(businessTypes);
//   } catch (error) {
//     console.error('Error fetching business types by activity ids:', error);
//     res.status(500).json({ message: 'Error fetching business types by activity ids' });
//   }
// }



export {
  createBusinessType,
  getAllBusinessTypes,
  getBusinessTypeById,
  updateBusinessType,
  deleteBusinessType,
  getBusinessTypesByActivityIds
};
