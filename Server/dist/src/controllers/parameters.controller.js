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
exports.deleteParameter = exports.updateParameter = exports.getParameterById = exports.getAllParameters = exports.createParameter = void 0;
const parameters_model_1 = __importDefault(require("../models/parameters.model"));
function createParameter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ad_price_advertiser, ad_price_business, com_display_time } = req.body;
            const newParameter = new parameters_model_1.default({
                ad_price_advertiser,
                ad_price_business,
                com_display_time,
                deleted: false,
            });
            const savedParameter = yield newParameter.save();
            res.status(201).json(savedParameter);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating parameter' });
        }
    });
}
exports.createParameter = createParameter;
function getAllParameters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parameters = yield parameters_model_1.default.find({ deleted: false });
            res.json(parameters);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching parameters' });
        }
    });
}
exports.getAllParameters = getAllParameters;
function getParameterById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parameterId = req.params.id;
            const parameter = yield parameters_model_1.default.findById(parameterId).where({ deleted: false });
            if (parameter) {
                res.json(parameter);
            }
            else {
                res.status(404).json({ message: 'Parameter not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching parameter' });
        }
    });
}
exports.getParameterById = getParameterById;
function updateParameter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parameterId = req.params.id;
            const { ad_price_advertiser, ad_price_business, com_display_time } = req.body;
            const updatedParameter = yield parameters_model_1.default.findByIdAndUpdate(parameterId, { ad_price_advertiser, ad_price_business, com_display_time }, { new: true }).where({ deleted: false });
            if (updatedParameter) {
                res.json(updatedParameter);
            }
            else {
                res.status(404).json({ message: 'Parameter not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating parameter' });
        }
    });
}
exports.updateParameter = updateParameter;
function deleteParameter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parameterId = req.params.id;
            const softDeletedParameter = yield parameters_model_1.default.findByIdAndUpdate(parameterId, { deleted: true });
            if (softDeletedParameter) {
                res.json({ message: 'Parameter soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Parameter not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting parameter' });
        }
    });
}
exports.deleteParameter = deleteParameter;
