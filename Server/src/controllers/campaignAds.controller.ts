import { Response, Request } from "express";
import Business, { IBusiness } from "../models/business.model";
import Campaign from "../models/campaign.model";

async function getPlacementCamapaigns(req: Request, res: Response) {
    try {
        const { user_id } = req.body;
        const business: IBusiness = await Business.findOne({ user_id, deleted: false });
        const { business_type_id, business_activity_id, location_id } = business;
        console.log( business_type_id, business_activity_id, location_id )
        const campaigns = await Campaign.aggregate([
          {
            $lookup: {
              from: "campaign_locations", // Junction collection for campaign-location relationship
              localField: "_id",
              foreignField: "campaign_id",
              as: "campaignLocations",
            },
          },
          {
            $lookup: {
              from: "campaign_business_types", // Junction collection for campaign-business type relationship
              localField: "_id",
              foreignField: "campaign_id",
              as: "campaignBusinessTypes",
            },
          },
          {
            $lookup: {
              from: "campaign_business_activities", // Junction collection for campaign-business activity relationship
              localField: "_id",
              foreignField: "campaign_id",
              as: "campaignBusinessActivities",
            },
          },
          {
            $match: {
              "campaignLocations.location_id": location_id,
              "campaignBusinessTypes.business_type_id": business_type_id,
              "campaignBusinessActivities.business_activity_id": business_activity_id,
            },
          },
        ]);

        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des campagnes' });
    }
}

export { getPlacementCamapaigns };
