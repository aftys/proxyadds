import { Request, Response } from 'express';
import { IBusiness } from '../models/business.model';
import Business from '../models/business.model';
import User, { IUser } from '../models/user.model';
import Placement, { IPlacement } from '../models/placement.model';

async function createBusiness(req: Request, res: Response) {
  try {
    const { name, email, password, phone, address, placement, location_id, longitude, altitude, business_type_id, business_activity_id } = req.body;
    const newUser: IUser = new User({
      email,
      password,
      name,
      phone,
      address,
      deleted: false,
      status: 0,
    });
    const savedUser: IUser = await newUser.save();
    const newBusiness: IBusiness = new Business({
      user_id: savedUser._id,
      longitude,
      altitude,
      location_id: location_id[1],
      business_activity_id,
      business_type_id,
      deleted: false
    })
    const savedBusiness = await newBusiness.save();
    const newPlacement: IPlacement = new Placement({
      name: placement,
      business_id: savedBusiness._id,
      deleted: false
    })
    await newPlacement.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    console.log(error)
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
    console.log('Updating Business')
    const businessId = req.params.id;
    const { name, email, password, phone, address, longitude, altitude, business_type_id, business_activity_id ,user_id} = req.body;
    await User.findByIdAndUpdate(user_id,
      {
        email,
        password,
        name,
        phone,
        address,
        deleted: false,
        status: 0,
      })
    
     const updatedBusiness:IBusiness=await Business.findByIdAndUpdate(businessId,{
      user_id,
      longitude,
      altitude,
      location_id: "64c971ead3e1c4a23ce85db4",
      business_activity_id,
      business_type_id,
      deleted: false
    }) 
    console.log(updatedBusiness)
    res.status(201).json(updatedBusiness);
  } catch (error) {
    console.log(error)
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
