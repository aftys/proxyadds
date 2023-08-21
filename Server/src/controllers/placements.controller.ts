import { Request, Response } from 'express';
import { IPlacement } from '../models/placement.model';
import Placement from '../models/placement.model';
import Business from '../models/business.model';

async function createPlacement(req: Request, res: Response) {
  try {
    const { name, business_id } = req.body;
    const newPlacement: IPlacement = new Placement({ name, business_id, deleted: false });
    const savedPlacement = await newPlacement.save();
    res.status(201).json(savedPlacement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating placement' });
  }
}

async function getAllPlacements(req: Request, res: Response) {
  try {
    const placements: IPlacement[] = await Placement.find({ deleted: false }).populate('business_id');
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching placements' });
  }
}

async function getPlacementsByBusinessId(req: Request, res: Response)  {
  try {
    const {user_id} = req.params;
    const business=await Business.findOne({user_id:user_id})
    const placement: IPlacement[] | null = await Placement.find({"business_id":business._id}).where({ deleted: false }).populate('business_id');
    if (placement) {
      res.json(placement);
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching placement' });
  }
}

async function getPlacementById(req: Request, res: Response) {
  try {
    const placementId = req.params.id;
    const placement: IPlacement | null = await Placement.findById(placementId).where({ deleted: false }).populate('business_id');
    if (placement) {
      res.json(placement);
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching placement' });
  }
}

async function updatePlacement(req: Request, res: Response) {
  try {
    const placementId = req.params.id;
    const { name, business_id } = req.body;
    const updatedPlacement: IPlacement | null = await Placement.findByIdAndUpdate(
      placementId,
      { name, business_id },
      { new: true }
    ).where({ deleted: false });

    if (updatedPlacement) {
      res.json(updatedPlacement);
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating placement' });
  }
}

async function deletePlacement(req: Request, res: Response) {
  try {
    const placementId = req.params.id;
    const softDeletedPlacement: IPlacement | null = await Placement.findByIdAndUpdate(
      placementId,
      { deleted: true }
    );

    if (softDeletedPlacement) {
      res.json({ message: 'Placement soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting placement' });
  }
}

export {
  createPlacement,
  getAllPlacements,
  getPlacementsByBusinessId,
  getPlacementById,
  updatePlacement,
  deletePlacement,
};
