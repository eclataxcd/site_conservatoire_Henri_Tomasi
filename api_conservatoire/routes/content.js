const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content');

// Route : GET /content
router.get('/content/:id', contentController.getAllElementAndSectionFromPages);

// Route : GET /content/section
router.get('/content/section/:id', contentController.getContentSection);

// Route : POST /content/balise
router.post('/content/balise', contentController.getContentBalise);

// Route : POST /content/props
router.post('/content/props', contentController.getPropsForBalise);

module.exports = router;