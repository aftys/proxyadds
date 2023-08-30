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
exports.deletePlacement = exports.updatePlacement = exports.getPlacementById = exports.getPlacementsByBusinessId = exports.getAllPlacements = exports.createPlacement = void 0;
const placement_model_1 = __importDefault(require("../models/placement.model"));
const business_model_1 = __importDefault(require("../models/business.model"));
function createPlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, business_id } = req.body;
            const newPlacement = new placement_model_1.default({ name, business_id, deleted: false });
            const savedPlacement = yield newPlacement.save();
            res.status(201).json(savedPlacement);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating placement' });
        }
    });
}
exports.createPlacement = createPlacement;
function getAllPlacements(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placements = yield placement_model_1.default.find({ deleted: false }).populate('business_id');
            res.json(placements);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching placements' });
        }
    });
}
exports.getAllPlacements = getAllPlacements;
function getPlacementsByBusinessId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const business = yield business_model_1.default.findOne({ user_id: user_id });
            const placement = yield placement_model_1.default.find({ "business_id": business._id }).where({ deleted: false }).populate('business_id');
            if (placement) {
                res.json(placement);
            }
            else {
                res.status(404).json({ message: 'Placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching placement' });
        }
    });
}
exports.getPlacementsByBusinessId = getPlacementsByBusinessId;
function getPlacementById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placementId = req.params.id;
            const placement = yield placement_model_1.default.findById(placementId).where({ deleted: false }).populate('business_id');
            if (placement) {
                res.json(placement);
            }
            else {
                res.status(404).json({ message: 'Placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching placement' });
        }
    });
}
exports.getPlacementById = getPlacementById;
function updatePlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placementId = req.params.id;
            const { name, business_id } = req.body;
            const updatedPlacement = yield placement_model_1.default.findByIdAndUpdate(placementId, { name, business_id }, { new: true }).where({ deleted: false });
            if (updatedPlacement) {
                res.json(updatedPlacement);
            }
            else {
                res.status(404).json({ message: 'Placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating placement' });
        }
    });
}
exports.updatePlacement = updatePlacement;
function deletePlacement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placementId = req.params.id;
            const softDeletedPlacement = yield placement_model_1.default.findByIdAndUpdate(placementId, { deleted: true });
            if (softDeletedPlacement) {
                res.json({ message: 'Placement soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Placement not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting placement' });
        }
    });
}
exports.deletePlacement = deletePlacement;
