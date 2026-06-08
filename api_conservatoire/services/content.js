const db = require('../config/db');

// Récupérer tous les éléments et sections d'une page'
const getAll = async (pageId) => {

    // Requête
    const querySelect = 'SELECT * FROM `contenu_page` WHERE id_page = ? ';
    const [rows] = await db.execute(querySelect, [pageId]);

    return rows;
}

// Récupérer tous les éléments et sections d'une page
const getContentSection = async (idSection) => {

    // Requête
    const querySelect = 'SELECT * FROM `section_contain_elem` WHERE id_section = ? ORDER BY ordre ASC';
    const [rows] = await db.execute(querySelect, [idSection]);

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
    const element = rows[0];

    if (element && element.image) {
    // 1. On transforme le Buffer binaire MySQL en texte lisible (utf-8)
    const rawText = element.image.toString('utf-8');
    
    // 2. Si le texte ne commence pas déjà par "data:image", on lui applique le Header magique
    if (!rawText.startsWith('data:image')) {
        element.image = `data:image/png;base64,${rawText}`;
    } else {
        element.image = rawText;
    }
}
    console.log("Contenu de l'image envoyé au front :", element.image)
    return element;
}


module.exports = {
    getAll, getBalise, getProps, getContentSection
};