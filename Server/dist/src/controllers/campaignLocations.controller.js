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
exports.deleteCampaignLocation = exports.updateCampaignLocation = exports.getCampaignLocationById = exports.getAllCampaignLocations = exports.createCampaignLocation = void 0;
const campaignLocation_model_1 = __importDefault(require("../models/campaignLocation.model"));
function createCampaignLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { location_ids, campaign_id } = req.body;
            const campaignLocation = location_ids.map((location_id) => ({
                location_id,
                campaign_id,
                deleted: false,
            }));
            const savedCampaignBusinessActivities = yield campaignLocation_model_1.default.insertMany(campaignLocation);
            res.status(201).json(savedCampaignBusinessActivities);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating campaign location' });
        }
    });
}
exports.createCampaignLocation = createCampaignLocation;
function getAllCampaignLocations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignLocations = yield campaignLocation_model_1.default.find({ deleted: false }).populate('campaign_id').populate('location_id');
            res.json(campaignLocations);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign locations' });
        }
    });
}
exports.getAllCampaignLocations = getAllCampaignLocations;
function getCampaignLocationById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignLocationId = req.params.id;
            const campaignLocation = yield campaignLocation_model_1.default.findById(campaignLocationId).where({ deleted: false }).populate('campaign_id').populate('location_id');
            if (campaignLocation) {
                res.json(campaignLocation);
            }
            else {
                res.status(404).json({ message: 'Campaign location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching campaign location' });
        }
    });
}
exports.getCampaignLocationById = getCampaignLocationById;
function updateCampaignLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignLocationId = req.params.id;
            const { campaign_id, location_id, radius } = req.body;
            const updatedCampaignLocation = yield campaignLocation_model_1.default.findByIdAndUpdate(campaignLocationId, { campaign_id, location_id, radius }, { new: true }).where({ deleted: false });
            if (updatedCampaignLocation) {
                res.json(updatedCampaignLocation);
            }
            else {
                res.status(404).json({ message: 'Campaign location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating campaign location' });
        }
    });
}
exports.updateCampaignLocation = updateCampaignLocation;
function deleteCampaignLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignLocationId = req.params.id;
            const softDeletedCampaignLocation = yield campaignLocation_model_1.default.findByIdAndUpdate(campaignLocationId, { deleted: true });
            if (softDeletedCampaignLocation) {
                res.json({ message: 'Campaign location soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Campaign location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting campaign location' });
        }
    });
}
exports.deleteCampaignLocation = deleteCampaignLocation;
