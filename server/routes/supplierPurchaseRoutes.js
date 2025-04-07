const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const {
    createPurchase,
    getAllPurchases,
} = require('../controllers/supplierPurchaseController');

router.post('/', createPurchase);
router.get('/', getAllPurchases);

module.exports = router;
