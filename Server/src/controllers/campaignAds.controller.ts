
import { Response, Request } from "express"
import { IBusiness, default as Business } from "../models/business.model";
import Campaign from "../models/campaign.model";
import CampaignBusinessType from "../models/campaignBusinessType.model";
import CampaignLocation from "../models/campaignLocation.model";
import CampaignBusinessActivity from "../models/campaignBusinessActivity.model";

async function getPlacementCamapaigns(req: Request, res: Response) {
    try {
        const { user_id } = req.body;
        const business: IBusiness = await Business.findOne({ user_id: user_id, deleted: false })
        const { business_type_id, business_activity_id, location_id } = business;
        console.log('business',business)
        const campaignLocationIds = await CampaignLocation.find({ location_id: location_id, deleted: false }).distinct("campaign_id");
        console.log('loc',campaignLocationIds)
        const campaignBusinessTypeIds = await CampaignBusinessType.find({ businesstype_id: business_type_id, deleted: false }).distinct("campaign_id");
        console.log('ty',campaignBusinessTypeIds)
        const campaignBusinessActivityIds = await CampaignBusinessActivity.find({ businessActivity_id: business_activity_id, deleted: false }).distinct("campaign_id");
        console.log('ac',campaignBusinessActivityIds)
        const commonCampaignIds = campaignLocationIds.filter(id =>
            campaignBusinessTypeIds.includes(id) && campaignBusinessActivityIds.includes(id)
        );
        const campaigns = await Campaign.find({
            _id: { $in: commonCampaignIds },
        });

        res.status(201).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Error creating business type' });
    }
}


export { getPlacementCamapaigns };