const db = require('../config/db');

// Récupérer tous les éléments et sections d'une page'
const getAll = async (pageId) => {

    // Requête
    const querySelect = 'SELECT * FROM `contenu_page` WHERE id_page = ? ';
    const [rows] = await db.execute(querySelect, [pageId]);

    return rows;
}

// Récupérer tous les éléments et sections d'une page'
const getBalise = async (data) => {
    const { id, table } = data;

    const idName = table === 'section' ? 'id_section' : 'id_elem';

    // Requête
    const querySelect = `SELECT balise FROM \`${table}\` WHERE \`${idName}\` = ?`;
    const [rows] = await db.execute(querySelect, [id]);

    return rows;
}

// Récupérer les propriétés d'une balise
const getProps = async (idElem) => {
    const { id } = idElem;

    // Requête
    const querySelect = 'SELECT * FROM element WHERE id_elem = ?';
    const [rows] = await db.execute(querySelect, [id]);

    return rows;
}


module.exports = {
    getAll, getBalise, getProps
};