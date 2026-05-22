const db = require('../config/db');

// Récupérer toutes les pages
const getAll = async (pageId) => {
  const { id } = pageId;

  // Requête
  const querySelect = 'SELECT * FROM pages';
  const [rows] = await db.execute(querySelect);

  return rows; 
}

// Récupérer une page par son id
const get = async (pageId) => {
  const { id } = pageId;

  // Requête 
  const querySelect = 'SELECT * FROM pages WHERE id_page = ?';
  const [rows] = await db.execute(querySelect, [id]);

  return rows[0]; 
}

// Ajouter une page
const add = async (pageName) => {
  const { namePage } = pageName;

  // Requête 
  const queryInsert = 'INSERT INTO pages (name_page) VALUES (?)';
  const [rows] = await db.execute(queryInsert, [namePage]);

  const newPageId = rows.insertId;

  return newPageId; 
}

// Mettre à jour le nom d'une page à partir de son id
const updateName = async (pageId, pageNewName) => {
  const { id } = pageId;
  const { newNamePage } = pageNewName;

  // Requête
  const queryUpdate = 'UPDATE pages SET name_page = ? WHERE id_page = ?';
  const [result] = await db.execute(queryUpdate, [newNamePage, id]);

  return result;  
}

// Mettre à jour un element d'une page à partir de son id
const updateElement = async (ids, ElementData) => {
  const { idPage, idElement } = ids;
  const { name, text, document, image, color } = ElementData;

  // Requête
  const queryUpdate = 'UPDATE element SET nom_elem = ?, texte = ?, document = ?, image = ?, couleur = ? WHERE id_elem = ?';
  const [result] = await db.execute(queryUpdate, [newContentSection, idSection, idPage]);

  return result;  
}

// Supprimer une page à partir de son id
const deletePage = async (pageId) => {
  const { id } = pageId;

  // Requête 
  const queryDelete = 'DELETE FROM pages WHERE id_page = ?';
  const [result] = await db.execute(queryDelete, [id]);

  return result; 
};

module.exports = { getAll, get, add, updateName, updateElement, deletePage };