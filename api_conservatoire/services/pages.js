const db = require('../config/db');

// Récupérer toutes les pages
const getAll = async () => {

  // Requête
  const querySelect = 'SELECT * FROM pages';
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

// Mettre à jour un element d'une page à partir de son id
const addElement = async (idPage, ElementData) => {
  const { nom, texte, document, image, couleur, action, balise, hauteur, longueur, ordre } = ElementData;

  // Requête
  const queryInsert = 'INSERT INTO element (nom_elem, texte, document, image, couleur, elem_action, balise, hauteur, longueur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute(queryInsert, [
    nom ?? null,
    texte ?? null,
    document ?? null,
    image ?? null,
    couleur ?? null,
    action ?? null,
    balise ?? null,
    hauteur ?? null,
    longueur ?? null
  ]);

  const newElementId = result.insertId;

  // Requête d'insertion dans la table de liaison
  const querySelectOrdres = 'SELECT ordre FROM contenu_page WHERE id_page = ?';
  const [rows] = await db.execute(querySelectOrdres, [idPage]);
  const ordresExistants = rows.length > 0 ? rows.map(row => row.ordre) : [];

  if (ordresExistants.includes(Number(ordre))) {

    // Requête A : Décale les éléments ayant un ordre >= à l'ordre cible
    const queryUpdateElemOrdre = 'UPDATE pages_contain_elem SET ordre = ordre + 1 WHERE id_page = ? AND ordre >= ? ORDER BY ordre DESC';
    await db.execute(queryUpdateElemOrdre, [idPage, ordre]);

    // Requête B : Décale également les sections pour éviter les collisions mixtes
    const queryUpdateSecOrdre = 'UPDATE pages_contain_sec SET ordre = ordre + 1 WHERE id_page = ? AND ordre >= ? ORDER BY ordre DESC';
    await db.execute(queryUpdateSecOrdre, [idPage, ordre]);
  }

  const queryInsertLink = 'INSERT INTO pages_contain_elem (id_page, ordre, id_elem) VALUES (?, ?, ?)';
  const [resultLink] = await db.execute(queryInsertLink, [idPage, ordre, newElementId]);

  return resultLink;
}

// Mettre à jour une section d'une page à partir de son id
const addSection = async (idPage, SectionData) => {

  const { nom, balise, ordre } = SectionData;

  // Requête
  const queryInsert = 'INSERT INTO section (nom_section, balise) VALUES (?, ?)';
  const [result] = await db.execute(queryInsert, [
    nom ?? null,
    balise ?? null,
  ]);

  const newSectionId = result.insertId;

  // Requête d'insertion dans la table de liaison
  const querySelectOrdres = 'SELECT ordre FROM contenu_page WHERE id_page = ?';
  const [rows] = await db.execute(querySelectOrdres, [idPage]);
  const ordresExistants = rows.length > 0 ? rows.map(row => row.ordre) : [];

  if (ordresExistants.includes(Number(ordre))) {

    // Requête A : Décale les éléments ayant un ordre >= à l'ordre cible
    const queryUpdateElemOrdre = 'UPDATE pages_contain_elem SET ordre = ordre + 1 WHERE id_page = ? AND ordre >= ? ORDER BY ordre DESC';
    await db.execute(queryUpdateElemOrdre, [idPage, ordre]);

    // Requête B : Décale également les sections pour éviter les collisions mixtes
    const queryUpdateSecOrdre = 'UPDATE pages_contain_sec SET ordre = ordre + 1 WHERE id_page = ? AND ordre >= ? ORDER BY ordre DESC';
    await db.execute(queryUpdateSecOrdre, [idPage, ordre]);
  }

  const queryInsertLink = 'INSERT INTO pages_contain_sec (id_page, ordre, id_section) VALUES (?, ?, ?)';
  const [resultLink] = await db.execute(queryInsertLink, [idPage, ordre, newSectionId]);

  return resultLink;
}

// Supprimer une page à partir de son id
const deletePage = async (pageId) => {
  const { id } = pageId;

  // Requête 
  const queryDelete = 'DELETE FROM pages WHERE id_page = ?';
  const [result] = await db.execute(queryDelete, [id]);

  return result;
};

module.exports = { getAll, get, add, addSection, addElement, deletePage };