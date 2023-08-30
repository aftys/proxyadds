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
exports.getBusinessTypesByActivityIds = exports.deleteBusinessType = exports.updateBusinessType = exports.getBusinessTypeById = exports.getAllBusinessTypes = exports.createBusinessType = void 0;
const businessType_model_1 = __importDefault(require("../models/businessType.model"));
function createBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, activity_id } = req.body;
            const newBusinessType = new businessType_model_1.default({ name, activity_id, deleted: false });
            const savedBusinessType = yield newBusinessType.save();
            res.status(201).json(savedBusinessType);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating business type' });
        }
    });
}
exports.createBusinessType = createBusinessType;
function getAllBusinessTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessTypes = yield businessType_model_1.default.find({ deleted: false }).populate('activity_id');
            res.json(businessTypes);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business types' });
        }
    });
}
exports.getAllBusinessTypes = getAllBusinessTypes;
function getBusinessTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessTypeId = req.params.id;
            const businessType = yield businessType_model_1.default.findById(businessTypeId).where({ deleted: false });
            if (businessType) {
                res.json(businessType);
            }
            else {
                res.status(404).json({ message: 'Business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business type' });
        }
    });
}
exports.getBusinessTypeById = getBusinessTypeById;
function updateBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessTypeId = req.params.id;
            const { name, activity_id } = req.body;
            const updatedBusinessType = yield businessType_model_1.default.findByIdAndUpdate(businessTypeId, { name, activity_id }, { new: true }).where({ deleted: false });
            if (updatedBusinessType) {
                res.json(updatedBusinessType);
            }
            else {
                res.status(404).json({ message: 'Business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating business type' });
        }
    });
}
exports.updateBusinessType = updateBusinessType;
function deleteBusinessType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessTypeId = req.params.id;
            const softDeletedBusinessType = yield businessType_model_1.default.findByIdAndUpdate(businessTypeId, { deleted: true });
            if (softDeletedBusinessType) {
                res.json({ message: 'Business type soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Business type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting business type' });
        }
    });
}
exports.deleteBusinessType = deleteBusinessType;
function getBusinessTypesByActivityIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activityId = req.params.id;
            console.log('activityId', activityId);
            // Find all business types that match the activity ID and are not deleted
            const businessTypes = yield businessType_model_1.default.find({ "activity_id": activityId, deleted: false });
            res.json(businessTypes);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business types' });
        }
    });
}
exports.getBusinessTypesByActivityIds = getBusinessTypesByActivityIds;
