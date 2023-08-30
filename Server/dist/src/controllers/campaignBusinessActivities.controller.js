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
exports.deleteCampaignBusinessActivity = exports.updateCampaignBusinessActivity = exports.getCampaignBusinessActivityById = exports.getAllCampaignBusinessActivities = exports.createCampaignBusinessActivity = void 0;
const campaignBusinessActivity_model_1 = __importDefault(require("../models/campaignBusinessActivity.model"));
function createCampaignBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { businessActivity_ids, campaign_id } = req.body;
            const businessActivities = businessActivity_ids.map((business_ativity_id) => ({
                business_activity_id: business_ativity_id,
                campaign_id,
                deleted: false,
            }));
            const savedCampaignBusinessActivities = yield campaignBusinessActivity_model_1.default.insertMany(businessActivities);
            res.status(201).json(savedCampaignBusinessActivities);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating campaign business activity' });
        }
    });
}
exports.createCampaignBusinessActivity = createCampaignBusinessActivity;
function getAllCampaignBusinessActivities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessActivities = yield campaignBusinessActivity_model_1.default.find({ deleted: false }).populate('businessActivity_ids').populate('campaign_id');
            res.json(campaignBusinessActivities);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign business activities' });
        }
    });
}
exports.getAllCampaignBusinessActivities = getAllCampaignBusinessActivities;
function getCampaignBusinessActivityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessActivityId = req.params.id;
            const campaignBusinessActivity = yield campaignBusinessActivity_model_1.default.findById(campaignBusinessActivityId).where({ deleted: false }).populate('businessActivity_ids').populate('campaign_id');
            if (campaignBusinessActivity) {
                res.json(campaignBusinessActivity);
            }
            else {
                res.status(404).json({ message: 'Campaign business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign business activity' });
        }
    });
}
exports.getCampaignBusinessActivityById = getCampaignBusinessActivityById;
function updateCampaignBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessActivityId = req.params.id;
            const { businessActivity_ids, campaign_id } = req.body;
            const updatedCampaignBusinessActivity = yield campaignBusinessActivity_model_1.default.findByIdAndUpdate(campaignBusinessActivityId, { businessActivity_ids, campaign_id }, { new: true }).where({ deleted: false });
            if (updatedCampaignBusinessActivity) {
                res.json(updatedCampaignBusinessActivity);
            }
            else {
                res.status(404).json({ message: 'Campaign business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating campaign business activity' });
        }
    });
}
exports.updateCampaignBusinessActivity = updateCampaignBusinessActivity;
function deleteCampaignBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessActivityId = req.params.id;
            const softDeletedCampaignBusinessActivity = yield campaignBusinessActivity_model_1.default.findByIdAndUpdate(campaignBusinessActivityId, { deleted: true });
            if (softDeletedCampaignBusinessActivity) {
                res.json({ message: 'Campaign business activity soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Campaign business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting campaign business activity' });
        }
    });
}
exports.deleteCampaignBusinessActivity = deleteCampaignBusinessActivity;
