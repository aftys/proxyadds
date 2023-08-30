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
exports.deleteCampaignPlacement = exports.updateCampaignPlacement = exports.getCampaignPlacementById = exports.getAllCampaignPlacements = exports.createCampaignPlacement = void 0;
const campaignPlacement_model_1 = __importDefault(require("../models/campaignPlacement.model"));
function createCampaignPlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { campaign_id, placement_id, tracking_id } = req.body;
            const newCampaignPlacement = new campaignPlacement_model_1.default({
                campaign_id,
                placement_id,
                tracking_id,
                deleted: false,
            });
            const savedCampaignPlacement = yield newCampaignPlacement.save();
            res.status(201).json(savedCampaignPlacement);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating campaign placement' });
        }
    });
}
exports.createCampaignPlacement = createCampaignPlacement;
function getAllCampaignPlacements(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignPlacements = yield campaignPlacement_model_1.default.find({ deleted: false }).populate('campaign_id').populate('placement_id');
            res.json(campaignPlacements);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign placements' });
        }
    });
}
exports.getAllCampaignPlacements = getAllCampaignPlacements;
function getCampaignPlacementById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignPlacementId = req.params.id;
            const campaignPlacement = yield campaignPlacement_model_1.default.findById(campaignPlacementId).where({ deleted: false }).populate('campaign_id').populate('placement_id');
            if (campaignPlacement) {
                res.json(campaignPlacement);
            }
            else {
                res.status(404).json({ message: 'Campaign placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign placement' });
        }
    });
}
exports.getCampaignPlacementById = getCampaignPlacementById;
function updateCampaignPlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignPlacementId = req.params.id;
            const { campaign_id, placement_id, tracking_id } = req.body;
            const updatedCampaignPlacement = yield campaignPlacement_model_1.default.findByIdAndUpdate(campaignPlacementId, { campaign_id, placement_id, tracking_id }, { new: true }).where({ deleted: false });
            if (updatedCampaignPlacement) {
                res.json(updatedCampaignPlacement);
            }
            else {
                res.status(404).json({ message: 'Campaign placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating campaign placement' });
        }
    });
}
exports.updateCampaignPlacement = updateCampaignPlacement;
function deleteCampaignPlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignPlacementId = req.params.id;
            const softDeletedCampaignPlacement = yield campaignPlacement_model_1.default.findByIdAndUpdate(campaignPlacementId, { deleted: true });
            if (softDeletedCampaignPlacement) {
                res.json({ message: 'Campaign placement soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Campaign placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting campaign placement' });
        }
    });
}
exports.deleteCampaignPlacement = deleteCampaignPlacement;
