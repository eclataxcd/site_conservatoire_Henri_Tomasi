const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');

// Route : GET /types
router.get('/types', testController.getTypes);

module.exports = router;