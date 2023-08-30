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
exports.deleteCampaignBusinessType = exports.updateCampaignBusinessType = exports.getCampaignBusinessTypeById = exports.getAllCampaignBusinessTypes = exports.createCampaignBusinessType = void 0;
const campaignBusinessType_model_1 = __importDefault(require("../models/campaignBusinessType.model"));
function createCampaignBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { businessType_ids, campaign_id } = req.body;
            const businessTypes = businessType_ids.map((business_type_id) => ({
                business_type_id,
                campaign_id,
                deleted: false,
            }));
            const savedCampaignBusinessActivities = yield campaignBusinessType_model_1.default.insertMany(businessTypes);
            res.status(201).json(savedCampaignBusinessActivities);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating campaign business type' });
        }
    });
}
exports.createCampaignBusinessType = createCampaignBusinessType;
function getAllCampaignBusinessTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessTypes = yield campaignBusinessType_model_1.default.find({ deleted: false }).populate('business_type_id').populate('campaign_id');
            res.json(campaignBusinessTypes);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign business types' });
        }
    });
}
exports.getAllCampaignBusinessTypes = getAllCampaignBusinessTypes;
function getCampaignBusinessTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessTypeId = req.params.id;
            const campaignBusinessType = yield campaignBusinessType_model_1.default.findById(campaignBusinessTypeId).where({ deleted: false }).populate('business_type_id').populate('campaign_id');
            if (campaignBusinessType) {
                res.json(campaignBusinessType);
            }
            else {
                res.status(404).json({ message: 'Campaign business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign business type' });
        }
    });
}
exports.getCampaignBusinessTypeById = getCampaignBusinessTypeById;
function updateCampaignBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessTypeId = req.params.id;
            const { businesstype_id, campaign_id, campaign_name, type_name } = req.body;
            const updatedCampaignBusinessType = yield campaignBusinessType_model_1.default.findByIdAndUpdate(campaignBusinessTypeId, { businesstype_id, campaign_id, campaign_name, type_name }, { new: true }).where({ deleted: false });
            if (updatedCampaignBusinessType) {
                res.json(updatedCampaignBusinessType);
            }
            else {
                res.status(404).json({ message: 'Campaign business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating campaign business type' });
        }
    });
}
exports.updateCampaignBusinessType = updateCampaignBusinessType;
function deleteCampaignBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignBusinessTypeId = req.params.id;
            const softDeletedCampaignBusinessType = yield campaignBusinessType_model_1.default.findByIdAndUpdate(campaignBusinessTypeId, { deleted: true });
            if (softDeletedCampaignBusinessType) {
                res.json({ message: 'Campaign business type soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Campaign business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting campaign business type' });
        }
    });
}
exports.deleteCampaignBusinessType = deleteCampaignBusinessType;
