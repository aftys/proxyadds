import { Request, Response } from 'express';
import { ILocation } from '../models/location.model';
import Location from '../models/location.model';

async function createLocation(req: Request, res: Response) {
  try {
    const { region, city, secteur, longitude, altitude } = req.body;
    const newLocation: ILocation = new Location({ region, city, secteur, longitude, altitude, deleted: false });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location' });
  }
}

async function getAllLocations(req: Request, res: Response) {
  try {
    const locations: ILocation[] = await Location.find({ deleted: false });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
}

async function getLocationById(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const location: ILocation | null = await Location.findById(locationId).where({ deleted: false });
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location' });
  }
}

async function updateLocation(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const { region, city, secteur, longitude, altitude } = req.body;
    const updatedLocation: ILocation | null = await Location.findByIdAndUpdate(
      locationId,
      { region, city, secteur, longitude, altitude },
      { new: true }
    ).where({ deleted: false });

    if (updatedLocation) {
      res.json(updatedLocation);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating location' });
  }
}

async function deleteLocation(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const softDeletedLocation: ILocation | null = await Location.findByIdAndUpdate(
      locationId,
      { deleted: true }
    );

    if (softDeletedLocation) {
      res.json({ message: 'Location soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting location' });
  }
}

export {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
