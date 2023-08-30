"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignLocations_controller_1 = require("../controllers/campaignLocations.controller");
const router = (0, express_1.Router)();
router.post('/', campaignLocations_controller_1.createCampaignLocation);
router.get('/', campaignLocations_controller_1.getAllCampaignLocations);
router.get('/:id', campaignLocations_controller_1.getCampaignLocationById);
router.put('/:id', campaignLocations_controller_1.updateCampaignLocation);
router.delete('/:id', campaignLocations_controller_1.deleteCampaignLocation);
exports.default = router;