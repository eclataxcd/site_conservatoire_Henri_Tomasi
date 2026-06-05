const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

// Route : GET /pages
router.get('/pages', pagesController.getAllPages);

// Route : GET /pages/:id
router.get('/pages/:id', pagesController.getPageById);

// Route : POST /pages
router.post('/pages', pagesController.addPage);

// Route : POST /pages/:idPage/element
router.post('/pages/:idPage/element', pagesController.addElementPage);

// Route : POST /pages/:idPage/section
router.post('/pages/:idPage/section', pagesController.addSectionPage);

// Route : DELETE /pages/:id
router.delete('/pages/:id', pagesController.deletePage);

module.exports = router;