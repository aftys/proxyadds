"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parameters_controller_1 = require("../controllers/parameters.controller");
const router = (0, express_1.Router)();
router.post('/', parameters_controller_1.createParameter);
router.get('/', parameters_controller_1.getAllParameters);
router.get('/:id', parameters_controller_1.getParameterById);
router.put('/:id', parameters_controller_1.updateParameter);
router.delete('/:id', parameters_controller_1.deleteParameter);
exports.default = router;