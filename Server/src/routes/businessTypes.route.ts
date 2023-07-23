// src/routes/businessTypes.js
const router = require("express").Router();

const {
  createBusinessType,
  getAllBusinessTypes,
  getBusinessTypeById,
  updateBusinessType,
  deleteBusinessType,
} = require('../controllers/businessTypes.controller.ts');

router.post('/', createBusinessType);
router.get('/', getAllBusinessTypes);
router.get('/:id', getBusinessTypeById);
router.put('/:id', updateBusinessType);
router.delete('/:id', deleteBusinessType);

module.exports = router;

