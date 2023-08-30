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
exports.deleteBusinessActivity = exports.updateBusinessActivity = exports.getBusinessActivityById = exports.getAllBusinessActivities = exports.createBusinessActivity = void 0;
const businessActivity_model_1 = __importDefault(require("../models/businessActivity.model"));
function createBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const newBusinessActivity = new businessActivity_model_1.default({ name: name, deleted: false });
            const savedBusinessActivity = yield newBusinessActivity.save();
            res.status(201).json(savedBusinessActivity);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating business activity' });
        }
    });
}
exports.createBusinessActivity = createBusinessActivity;
function getAllBusinessActivities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessActivities = yield businessActivity_model_1.default.find({ deleted: false });
            res.json(businessActivities);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business activities' });
        }
    });
}
exports.getAllBusinessActivities = getAllBusinessActivities;
function getBusinessActivityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessActivityId = req.params.id;
            const businessActivity = yield businessActivity_model_1.default.findById(businessActivityId).where({ deleted: false });
            if (businessActivity) {
                res.json(businessActivity);
            }
            else {
                res.status(404).json({ message: 'Business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business activity' });
        }
    });
}
exports.getBusinessActivityById = getBusinessActivityById;
function updateBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessActivityId = req.params.id;
            const { name } = req.body;
            const updatedBusinessActivity = yield businessActivity_model_1.default.findByIdAndUpdate(businessActivityId, { name }, { new: true }).where({ deleted: false });
            if (updatedBusinessActivity) {
                res.json(updatedBusinessActivity);
            }
            else {
                res.status(404).json({ message: 'Business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating business activity' });
        }
    });
}
exports.updateBusinessActivity = updateBusinessActivity;
function deleteBusinessActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessActivityId = req.params.id;
            const softDeletedBusinessActivity = yield businessActivity_model_1.default.findByIdAndUpdate(businessActivityId, { deleted: true });
            if (softDeletedBusinessActivity) {
                res.json({ message: 'Business activity soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Business activity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting business activity' });
        }
    });
}
exports.deleteBusinessActivity = deleteBusinessActivity;
