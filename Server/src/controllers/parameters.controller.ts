import { Request, Response } from 'express';
import { IParameter } from '../models/parameters.model';
import Parameter from '../models/parameters.model';

async function createParameter(req: Request, res: Response) {
  try {
    const { ad_price_advertiser, ad_price_business, com_display_time } = req.body;
    const newParameter: IParameter = new Parameter({
      ad_price_advertiser,
      ad_price_business,
      com_display_time,
      deleted: false,
    });
    const savedParameter = await newParameter.save();
    res.status(201).json(savedParameter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating parameter' });
  }
}

async function getAllParameters(req: Request, res: Response) {
  try {
    const parameters: IParameter[] = await Parameter.find({ deleted: false });
    res.json(parameters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parameters' });
  }
}

async function getParameterById(req: Request, res: Response) {
  try {
    const parameterId = req.params.id;
    const parameter: IParameter | null = await Parameter.findById(parameterId).where({ deleted: false });
    if (parameter) {
      res.json(parameter);
    } else {
      res.status(404).json({ message: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parameter' });
  }
}

async function updateParameter(req: Request, res: Response) {
  try {
    const parameterId = req.params.id;
    const { ad_price_advertiser, ad_price_business, com_display_time } = req.body;
    const updatedParameter: IParameter | null = await Parameter.findByIdAndUpdate(
      parameterId,
      { ad_price_advertiser, ad_price_business, com_display_time },
      { new: true }
    ).where({ deleted: false });

    if (updatedParameter) {
      res.json(updatedParameter);
    } else {
      res.status(404).json({ message: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating parameter' });
  }
}

async function deleteParameter(req: Request, res: Response) {
  try {
    const parameterId = req.params.id;
    const softDeletedParameter: IParameter | null = await Parameter.findByIdAndUpdate(
      parameterId,
      { deleted: true }
    );

    if (softDeletedParameter) {
      res.json({ message: 'Parameter soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting parameter' });
  }
}

export {
  createParameter,
  getAllParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
};
