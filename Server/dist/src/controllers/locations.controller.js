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
exports.deleteLocation = exports.updateLocation = exports.getLocationById = exports.getAllLocations = exports.createLocation = void 0;
const location_model_1 = __importDefault(require("../models/location.model"));
function createLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { region, city, secteur, longitude, latitude } = req.body;
            const newLocation = new location_model_1.default({ region, city, secteur, longitude, latitude, deleted: false });
            const savedLocation = yield newLocation.save();
            res.status(201).json(savedLocation);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating location' });
        }
    });
}
exports.createLocation = createLocation;
function getAllLocations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locations = yield location_model_1.default.find({ deleted: false });
            res.json(locations);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching locations' });
        }
    });
}
exports.getAllLocations = getAllLocations;
function getLocationById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locationId = req.params.id;
            const location = yield location_model_1.default.findById(locationId).where({ deleted: false });
            if (location) {
                res.json(location);
            }
            else {
                res.status(404).json({ message: 'Location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching location' });
        }
    });
}
exports.getLocationById = getLocationById;
function updateLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locationId = req.params.id;
            const { region, city, secteur, longitude, latitude } = req.body;
            const updatedLocation = yield location_model_1.default.findByIdAndUpdate(locationId, { region, city, secteur, longitude, latitude }, { new: true }).where({ deleted: false });
            if (updatedLocation) {
                res.json(updatedLocation);
            }
            else {
                res.status(404).json({ message: 'Location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating location' });
        }
    });
}
exports.updateLocation = updateLocation;
function deleteLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locationId = req.params.id;
            const softDeletedLocation = yield location_model_1.default.findByIdAndUpdate(locationId, { deleted: true });
            if (softDeletedLocation) {
                res.json({ message: 'Location soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Location not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting location' });
        }
    });
}
exports.deleteLocation = deleteLocation;
