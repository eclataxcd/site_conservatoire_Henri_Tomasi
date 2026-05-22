const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { validateAddUser } = require('../middlewares/validation');

// Route : GET /users/email
router.get('/users/:email', userController.getUser);

// Route : POST /users
router.post('/users', validateAddUser, userController.addUser);

// Route : DELETE /users/email
router.delete('/users/:email', userController.deleteUser);

module.exports = router;