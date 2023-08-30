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
exports.deleteTracking = exports.updateTracking = exports.getTrackingById = exports.getAllTrackings = exports.createTracking = void 0;
const trackings_model_1 = __importDefault(require("../models/trackings.model"));
function createTracking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { type, date, display_time, campaign_id } = req.body;
            const newTracking = new trackings_model_1.default({
                type,
                date,
                display_time,
                campaign_id,
                deleted: false,
            });
            const savedTracking = yield newTracking.save();
            res.status(201).json(savedTracking);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating tracking' });
        }
    });
}
exports.createTracking = createTracking;
function getAllTrackings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trackings = yield trackings_model_1.default.find({ deleted: false }).populate('campaign_id');
            res.json(trackings);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching trackings' });
        }
    });
}
exports.getAllTrackings = getAllTrackings;
function getTrackingById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trackingId = req.params.id;
            const tracking = yield trackings_model_1.default.findById(trackingId).where({ deleted: false }).populate('campaign_id');
            if (tracking) {
                res.json(tracking);
            }
            else {
                res.status(404).json({ message: 'Tracking not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching tracking' });
        }
    });
}
exports.getTrackingById = getTrackingById;
function updateTracking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trackingId = req.params.id;
            const { type, date, display_time, campaign_id } = req.body;
            const updatedTracking = yield trackings_model_1.default.findByIdAndUpdate(trackingId, { type, date, display_time, campaign_id }, { new: true }).where({ deleted: false });
            if (updatedTracking) {
                res.json(updatedTracking);
            }
            else {
                res.status(404).json({ message: 'Tracking not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating tracking' });
        }
    });
}
exports.updateTracking = updateTracking;
function deleteTracking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trackingId = req.params.id;
            const softDeletedTracking = yield trackings_model_1.default.findByIdAndUpdate(trackingId, { deleted: true });
            if (softDeletedTracking) {
                res.json({ message: 'Tracking soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Tracking not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting tracking' });
        }
    });
}
exports.deleteTracking = deleteTracking;
