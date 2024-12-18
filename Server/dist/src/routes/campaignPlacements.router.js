"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignPlacements_controller_1 = require("../controllers/campaignPlacements.controller");
const router = (0, express_1.Router)();
router.post('/', campaignPlacements_controller_1.createCampaignPlacement);
router.get('/', campaignPlacements_controller_1.getAllCampaignPlacements);
router.get('/:id', campaignPlacements_controller_1.getCampaignPlacementById);
router.put('/:id', campaignPlacements_controller_1.updateCampaignPlacement);
router.delete('/:id', campaignPlacements_controller_1.deleteCampaignPlacement);
exports.default = router;
