const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content');

// Route : GET /content/:id
router.get('/content/:id', contentController.getAllElementAndSectionFromPages);

// Route : GET /content/section/:id
router.get('/content/section/:id', contentController.getContentSection);

// Route : GET /content/element/:id
router.get('/content/element/:id', contentController.getContentElement);

// Route : POST /content/balise
router.post('/content/balise', contentController.getContentBalise);

// Route : POST /content/props
router.post('/content/props', contentController.getPropsForBalise);

// Route : PUT /content/update/:id
router.put('/content/update/:id',contentController.updateElem)

// Route : DELETE /content/element/:id
router.delete('/content/element/:id', contentController.deleteElement)

// Route : DELETE /content/section/:id
router.delete('/content/section/:id', contentController.deleteSection)

module.exports = router;