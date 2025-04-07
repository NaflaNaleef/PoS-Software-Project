const express = require('express');
const router = express.Router();
const { createReturn } = require('../controllers/supplierReturnController');

router.post('/', createReturn);

module.exports = router;
