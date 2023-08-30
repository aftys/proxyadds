"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const businessTypes_controller_1 = require("../controllers/businessTypes.controller");
const router = (0, express_1.Router)();
router.post('/', businessTypes_controller_1.createBusinessType);
router.get('/', businessTypes_controller_1.getAllBusinessTypes);
router.get('/:id', businessTypes_controller_1.getBusinessTypeById);
router.get('/getBusinessTypesByActivityIds/:id', businessTypes_controller_1.getBusinessTypesByActivityIds);
router.put('/:id', businessTypes_controller_1.updateBusinessType);
router.delete('/:id', businessTypes_controller_1.deleteBusinessType);
exports.default = router;
