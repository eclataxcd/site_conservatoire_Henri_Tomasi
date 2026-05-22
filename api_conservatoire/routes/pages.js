const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

// Route : GET /pages
router.get('/pages', pagesController.getAllPages);

// Route : GET /pages/:id
router.get('/pages/:id', pagesController.getPageById);

// Route : POST /pages
router.post('/pages', pagesController.addPage);

// Route : PUT /pages/:id
router.put('/pages/:id', pagesController.updatePageName);

// Route : PUT /pages/:idPage/:idElement
router.put('/pages/:idPage/:idElement', pagesController.updatePageElement);

// Route : DELETE /pages/:id
router.delete('/pages/:id', pagesController.deletePage);

module.exports = router;