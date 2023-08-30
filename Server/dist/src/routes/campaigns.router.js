"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaigns_controller_1 = require("../controllers/campaigns.controller");
const filehelper_1 = __importDefault(require("../assets/filehelper"));
const router = (0, express_1.Router)();
router.post('/', filehelper_1.default.single('file'), campaigns_controller_1.createCampaign);
router.get('/', campaigns_controller_1.getAllCampaigns);
router.get('/:id', campaigns_controller_1.getCampaignById);
router.put('/:id', campaigns_controller_1.updateCampaign);
router.delete('/:id', campaigns_controller_1.deleteCampaign);
exports.default = router;
