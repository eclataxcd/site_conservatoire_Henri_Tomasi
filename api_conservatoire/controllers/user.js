const bcrypt = require('bcrypt');
const userService = require('../services/user');

// Récupérer un utilisateur par son email
const getUser = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await userService.get(req.body);
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
  }
};


// Ajouter un utilisateur 
const addUser = async (req, res) => {
  try {
    const newUser = await userService.add(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};


// Modifier un utilisateur 
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.body);
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};


// Supprimer un utilisateur à partir de son email
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};


module.exports = { getUser, addUser, deleteUser, updateUser };