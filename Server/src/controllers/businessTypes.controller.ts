// src/controllers/businessTypesController.js
import { IBusinessType } from '../models/businessType.model';
import BusinessType from '../models/businessType.model';

// Create a new BusinessType
async function createBusinessType(req, res) {
  try {
    const { name } = req.body;
    const newBusinessType: IBusinessType = new BusinessType({ name });
    const savedBusinessType = await newBusinessType.save();
    res.status(201).json(savedBusinessType);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business type' });
  }
}

// Get all BusinessTypes
async function getAllBusinessTypes(req, res) {
  try {
    const businessTypes: IBusinessType[] = await BusinessType.find();
    res.json(businessTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business types' });
  }
}

// Get a single BusinessType by ID
async function getBusinessTypeById(req, res) {
  try {
    const businessTypeId = req.params.id;
    const businessType: IBusinessType | null = await BusinessType.findById(businessTypeId);
    if (businessType) {
      res.json(businessType);
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business type' });
  }
}

// Update a BusinessType by ID
async function updateBusinessType(req, res) {
  try {
    const businessTypeId = req.params.id;
    const { name } = req.body;
    const updatedBusinessType: IBusinessType | null = await BusinessType.findByIdAndUpdate(
      businessTypeId,
      { name },
      { new: true }
    );

    if (updatedBusinessType) {
      res.json(updatedBusinessType);
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating business type' });
  }
}

// Delete a BusinessType by ID
async function deleteBusinessType(req, res) {
  try {
    const businessTypeId = req.params.id;
    const deletedBusinessType: IBusinessType | null = await BusinessType.findByIdAndRemove(businessTypeId);

    if (deletedBusinessType) {
      res.json({ message: 'Business type deleted successfully' });
    } else {
      res.status(404).json({ message: 'Business type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting business type' });
  }
}

export {
  createBusinessType,
  getAllBusinessTypes,
  getBusinessTypeById,
  updateBusinessType,
  deleteBusinessType,
};
