const db = require('../config/db');

// Récupérer toutes les pages
const getAll = async () => {

  // Requête
  const querySelect = 'SELECT * FROM pages WHERE ordre = 0';
  const [rows] = await db.execute(querySelect);

  return rows; 
}

// Récupérer une page par son id
const get = async (pageId) => {

  // Requête 
  const querySelect = 'SELECT * FROM pages WHERE id_page = ?';
  const [rows] = await db.execute(querySelect, [pageId]);

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
const addElement = async (ids, ElementData) => {
  const { idPage, idElement } = ids;
  const { nom, texte, document, image, couleur, action, balise, hauteur, longueur } = ElementData;

  // Requête
  const queryInsert = 'INSERT INTO element (nom_elem, texte, document, image, couleur, action, balise, hauteur, longueur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute(queryInsert, [nom, texte, document, image, couleur, action, balise, hauteur, longueur ]);

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

module.exports = { getAll, get, add, updateName, addElement, deletePage };