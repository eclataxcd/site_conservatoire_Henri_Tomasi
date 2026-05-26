const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { validateAddUser, hashPassword } = require('../middlewares/middleware');

// Route : POST /users/login
router.post('/users/login', userController.getUser);

// Route : POST /users/add
router.post('/users/add', validateAddUser, hashPassword, userController.addUser);

// Route : PUT /users/update
router.put('/users/update', hashPassword, userController.updateUser); 

// Route : DELETE /users/delete
router.delete('/users/delete', userController.deleteUser);

module.exports = router;