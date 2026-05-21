const db = require('../config/db');

// Récupérer un utilisateur par son email
const get = async (userData) => {
  const { email } = userData;

  // Requête pour récupérer l'utilisateur par son email
  const querySelect = 'SELECT * FROM utilisateur WHERE email = ?';
  const [rows] = await db.execute(querySelect, [email]);

  return rows[0]; 
}

// Ajouter un utilisateur
const add = async (userData) => {
  const { email, password } = userData;
  
  // Insertion dans la base de données
  const queryInsert = 'INSERT INTO utilisateur (email, password) VALUES (?, ?)';
  const [result] = await db.execute(queryInsert, [email, password]);

  return result;
};

// Supprimer un utilisateur à partir de son email
const deleteUser = async (userData) => {
  const { email } = userData;

  // Requête pour supprimer l'utilisateur par son email
  const queryDelete = 'DELETE FROM utilisateur WHERE email = ?';
  const [result] = await db.execute(queryDelete, [email]);

  return result; 
};

module.exports = { get, add, deleteUser };