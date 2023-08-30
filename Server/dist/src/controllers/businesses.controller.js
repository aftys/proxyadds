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
exports.deleteBusiness = exports.updateBusiness = exports.getBusinessById = exports.getAllBusinesses = exports.createBusiness = void 0;
const business_model_1 = __importDefault(require("../models/business.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const placement_model_1 = __importDefault(require("../models/placement.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createBusiness(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phone, address, placement, location_id, longitude, altitude, business_type_id, business_activity_id } = req.body;
            const salt = yield bcrypt_1.default.genSalt();
            const passwordCrypt = yield bcrypt_1.default.hash(password, salt);
            const newUser = new user_model_1.default({
                email,
                password: passwordCrypt,
                name: name,
                phone,
                address,
                deleted: false,
                role: 'business',
                status: 0,
            });
            const savedUser = yield newUser.save();
            const newBusiness = new business_model_1.default({
                user_id: savedUser._id,
                longitude,
                altitude,
                location_id: location_id[1],
                business_activity_id,
                business_type_id,
                deleted: false
            });
            const savedBusiness = yield newBusiness.save();
            const newPlacement = new placement_model_1.default({
                name: placement,
                business_id: savedBusiness._id,
                deleted: false
            });
            yield newPlacement.save();
            res.status(201).json(savedBusiness);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating business' });
        }
    });
}
exports.createBusiness = createBusiness;
function getAllBusinesses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businesses = yield business_model_1.default.find({ deleted: false }).populate([
                'user_id',
                'location_id',
                'business_type_id',
                'business_activity_id'
            ]);
            res.json(businesses);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching businesses' });
        }
    });
}
exports.getAllBusinesses = getAllBusinesses;
function getBusinessById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessId = req.params.id;
            const business = yield business_model_1.default.findById(businessId).where({ deleted: false }).populate([
                'user_id',
                'location_id',
                'business_type_id',
                'business_activity_id'
            ]);
            if (business) {
                res.json(business);
            }
            else {
                res.status(404).json({ message: 'Business not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching business' });
        }
    });
}
exports.getBusinessById = getBusinessById;
function updateBusiness(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Updating Business');
            const businessId = req.params.id;
            const { name, email, password, phone, address, longitude, altitude, business_type_id, business_activity_id, user_id } = req.body;
            yield user_model_1.default.findByIdAndUpdate(user_id, {
                email,
                password,
                name,
                phone,
                address,
                deleted: false,
                status: 0,
            });
            const updatedBusiness = yield business_model_1.default.findByIdAndUpdate(businessId, {
                user_id,
                longitude,
                altitude,
                location_id: "64c971ead3e1c4a23ce85db4",
                business_activity_id,
                business_type_id,
                deleted: false
            });
            console.log(updatedBusiness);
            res.status(201).json(updatedBusiness);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating business' });
        }
    });
}
exports.updateBusiness = updateBusiness;
function deleteBusiness(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessId = req.params.id;
            const softDeletedBusiness = yield business_model_1.default.findByIdAndUpdate(businessId, { deleted: true });
            if (softDeletedBusiness) {
                res.json({ message: 'Business soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Business not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting business' });
        }
    });
}
exports.deleteBusiness = deleteBusiness;
