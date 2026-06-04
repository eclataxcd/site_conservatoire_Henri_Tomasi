const express = require('express');
const router = express.Router();
const multer = require('multer');
const updateController = require('../controllers/update');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route : PUT /update/:idPage
router.put('/update/:id', updateController.updateSection);

// Route : PUT /update/element/:id
router.put('/update/element/:id', upload.single('image'), updateController.updateElement);

module.exports = router;