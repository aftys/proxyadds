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
exports.deleteAdvertiser = exports.updateAdvertiser = exports.getAdvertiserById = exports.getAllAdvertisers = exports.createAdvertiser = void 0;
const advertiser_model_1 = __importDefault(require("../models/advertiser.model"));
function createAdvertiser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, act_id } = req.body;
            const newAdvertiser = new advertiser_model_1.default({ user_id, act_id, deleted: false });
            const savedAdvertiser = yield newAdvertiser.save();
            res.status(201).json(savedAdvertiser);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating advertiser' });
        }
    });
}
exports.createAdvertiser = createAdvertiser;
function getAllAdvertisers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const advertisers = yield advertiser_model_1.default.find({ deleted: false }).populate('user_id act_id');
            res.json(advertisers);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching advertisers' });
        }
    });
}
exports.getAllAdvertisers = getAllAdvertisers;
function getAdvertiserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const advertiserId = req.params.id;
            const advertiser = yield advertiser_model_1.default.findById(advertiserId).where({ deleted: false }).populate('user_id act_id');
            if (advertiser) {
                res.json(advertiser);
            }
            else {
                res.status(404).json({ message: 'Advertiser not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching advertiser' });
        }
    });
}
exports.getAdvertiserById = getAdvertiserById;
function updateAdvertiser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const advertiserId = req.params.id;
            const { user_id, act_id } = req.body;
            const updatedAdvertiser = yield advertiser_model_1.default.findByIdAndUpdate(advertiserId, { user_id, act_id }, { new: true }).where({ deleted: false });
            if (updatedAdvertiser) {
                res.json(updatedAdvertiser);
            }
            else {
                res.status(404).json({ message: 'Advertiser not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating advertiser' });
        }
    });
}
exports.updateAdvertiser = updateAdvertiser;
function deleteAdvertiser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const advertiserId = req.params.id;
            const softDeletedAdvertiser = yield advertiser_model_1.default.findByIdAndUpdate(advertiserId, { deleted: true });
            if (softDeletedAdvertiser) {
                res.json({ message: 'Advertiser soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Advertiser not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting advertiser' });
        }
    });
}
exports.deleteAdvertiser = deleteAdvertiser;
