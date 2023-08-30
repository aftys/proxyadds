"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const campaignAds_controller_1 = require("../controllers/campaignAds.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:user_id', campaignAds_controller_1.getPlacementCamapaigns);
exports.default = router;
