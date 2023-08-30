"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlacementCamapaigns = void 0;
const business_model_1 = __importDefault(require("../models/business.model"));
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
function getPlacementCamapaigns(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const business = yield business_model_1.default.findOne({ user_id, deleted: false });
            const { business_type_id, business_activity_id, location_id } = business;
            console.log(business_type_id, business_activity_id, location_id);
            const campaigns = yield campaign_model_1.default.aggregate([
                {
                    $lookup: {
                        from: "campaign_locations",
                        localField: "_id",
                        foreignField: "campaign_id",
                        as: "campaignLocations",
                    },
                },
                {
                    $lookup: {
                        from: "campaign_business_types",
                        localField: "_id",
                        foreignField: "campaign_id",
                        as: "campaignBusinessTypes",
                    },
                },
                {
                    $lookup: {
                        from: "campaign_business_activities",
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des campagnes' });
        }
    });
}
exports.getPlacementCamapaigns = getPlacementCamapaigns;
