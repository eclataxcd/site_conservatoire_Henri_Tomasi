const db = require('../config/db');

// Récupérer un utilisateur par son email
const get = async (userData) => {
  const { email } = userData;

  // Requête 
  const querySelect = 'SELECT * FROM utilisateur WHERE email = ? ';
  const [rows] = await db.execute(querySelect, [email]);

  return rows[0]; 
}

// Ajouter un utilisateur
const add = async (userData) => {
  const { email, password } = userData;
  
  // Requête
  const queryInsert = 'INSERT INTO utilisateur (email, password) VALUES (?, ?)';
  const [result] = await db.execute(queryInsert, [email, password]);

  return result;
};

// Modifier un utilisateur
const update = async (userData) => {
  const { email, password } = userData;

  // Requête
  const queryUpdate = 'UPDATE utilisateur SET password = ? WHERE email = ?';
  const [result] = await db.execute(queryUpdate, [password, email]);

  return result;
};

// Supprimer un utilisateur à partir de son email
const deleteUser = async (userData) => {
  const { email } = userData;

  // Requête 
  const queryDelete = 'DELETE FROM utilisateur WHERE email = ?';
  const [result] = await db.execute(queryDelete, [email]);

  return result; 
};

module.exports = { get, add, update, deleteUser };