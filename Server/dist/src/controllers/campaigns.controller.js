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
exports.deleteCampaign = exports.updateCampaign = exports.getCampaignById = exports.getAllCampaigns = exports.createCampaign = void 0;
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
const campaignBusinessActivity_model_1 = __importDefault(require("../models/campaignBusinessActivity.model"));
const campaignBusinessActivity_model_2 = __importDefault(require("../models/campaignBusinessActivity.model"));
const campaignLocation_model_1 = __importDefault(require("../models/campaignLocation.model"));
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, budget_max, begin_date, end_date, display_hours, status, url, advertiser_id, business_type_ids, business_activity_ids, location_ids, } = req.body;
        console.log(req.body);
        const newCampaign = new campaign_model_1.default({
            name,
            budget_max,
            begin_date,
            end_date,
            file: req.file.path,
            display_hours,
            status,
            url,
            advertiser_id,
            deleted: false,
        });
        const savedCampaign = yield newCampaign.save();
        if (!savedCampaign) {
            return res.status(500).json({ message: 'Error creating campaign' });
        }
        const businessTypeIdsArray = Array.isArray(business_type_ids)
            ? business_type_ids
            : business_type_ids.split(',');
        const businessActivityIdsArray = Array.isArray(business_activity_ids)
            ? business_activity_ids
            : business_activity_ids.split(',');
        const locationIdsArray = Array.isArray(location_ids)
            ? location_ids
            : location_ids.split(',');
        console.log(businessTypeIdsArray, businessActivityIdsArray, locationIdsArray);
        yield Promise.all(businessTypeIdsArray.map((businessTypeId) => __awaiter(void 0, void 0, void 0, function* () {
            if (businessTypeId !== '') {
                const campaignBusinessType = new campaignBusinessActivity_model_2.default({
                    campaign_id: savedCampaign._id,
                    business_type_id: businessTypeId,
                    deleted: false,
                });
                yield campaignBusinessType.save();
            }
        })));
        // Save CampaignBusinessActivity instances
        yield Promise.all(businessActivityIdsArray.map((businessActivityId) => __awaiter(void 0, void 0, void 0, function* () {
            if (businessActivityId !== '') { // Check for non-empty and defined value
                const campaignBusinessActivity = new campaignBusinessActivity_model_1.default({
                    campaign_id: savedCampaign._id,
                    business_activity_id: businessActivityId,
                    deleted: false,
                });
                yield campaignBusinessActivity.save();
            }
        })));
        // Save CampaignLocation instances
        yield Promise.all(locationIdsArray.map((locationId) => __awaiter(void 0, void 0, void 0, function* () {
            if (locationId !== '') {
                const campaignLocation = new campaignLocation_model_1.default({
                    campaign_id: savedCampaign._id,
                    location_id: locationId,
                    deleted: false,
                });
                yield campaignLocation.save();
            }
        })));
        res.status(200).json({ message: 'Campaign created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating campaign' });
    }
});
exports.createCampaign = createCampaign;
function getAllCampaigns(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaigns = yield campaign_model_1.default.find({ deleted: false });
            res.json(campaigns);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaigns' });
        }
    });
}
exports.getAllCampaigns = getAllCampaigns;
function getCampaignById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            const campaign = yield campaign_model_1.default.findById(campaignId).where({ deleted: false });
            if (campaign) {
                res.json(campaign);
            }
            else {
                res.status(404).json({ message: 'Campaign not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign' });
        }
    });
}
exports.getCampaignById = getCampaignById;
function updateCampaign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            const { name, budget_max, begin_date, end_date, file, display_hours, status, url, advertiser_id } = req.body;
            const updatedCampaign = yield campaign_model_1.default.findByIdAndUpdate(campaignId, { name, budget_max, begin_date, end_date, file, display_hours, status, url, advertiser_id }, { new: true }).where({ deleted: false });
            if (updatedCampaign) {
                res.json(updatedCampaign);
            }
            else {
                res.status(404).json({ message: 'Campaign not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating campaign' });
        }
    });
}
exports.updateCampaign = updateCampaign;
function deleteCampaign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            const softDeletedCampaign = yield campaign_model_1.default.findByIdAndUpdate(campaignId, { deleted: true });
            if (softDeletedCampaign) {
                res.json({ message: 'Campaign soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Campaign not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting campaign' });
        }
    });
}
exports.deleteCampaign = deleteCampaign;
