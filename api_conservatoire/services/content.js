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

// Récupérer tous les éléments de l'élément
const getContentElem = async (idElem) => {
    // Requête
    const querySelect = 'SELECT * FROM `elem_contain_elem` WHERE id_elem = ? ORDER BY ordre ASC';
    const [rows] = await db.execute(querySelect, [idElem]);

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

// Mettre à jour un élément
const updateElement = async (idElem, ElementData) => {
    // 1. On extrait uniquement les champs qui appartiennent à la table element
    // (On exclut l'ordre ou la balise s'ils ne doivent pas être modifiés ici)
    const champsPossibles = ['texte', 'document', 'image', 'couleur', 'couleur2', 'action', 'hauteur', 'longueur'];
    
    const fieldsToUpdate = [];
    const queryParams = [];

    // 2. On parcourt les données reçues
    for (const champ of champsPossibles) {
        if (ElementData[champ] !== undefined) { 
            // Si le champ est présent (même s'il vaut null ou vider, mais pas undefined)
            fieldsToUpdate.push(`${champ} = ?`);
            queryParams.push(ElementData[champ]);
        }
    }

    // 3. Sécurité : Si aucun champ valide n'a été passé, on évite de faire planter SQL
    if (fieldsToUpdate.length === 0) {
        return { message: "Aucune modification détectée." };
    }

    // 4. On ajoute l'idElem à la toute fin du tableau des paramètres pour le WHERE
    queryParams.push(idElem);

    // 5. On assemble dynamiquement la requête
    // Résultat ex: UPDATE element SET hauteur = ?, longueur = ? WHERE id_elem = ?
    const queryUpdate = `UPDATE element SET ${fieldsToUpdate.join(', ')} WHERE id_elem = ?`;

    // 6. Exécution de la requête magique
    const [result] = await db.execute(queryUpdate, queryParams);
    
    return result;
};

// Supprimer un élément
const deleteElem = async (idElem) => {

    // Requête
    const queryDeleteLink = 'DELETE FROM `pages_contain_elem` WHERE id_elem = ? ';
    const [rows] = await db.execute(queryDeleteLink, [idElem]);
    const queryDelete = 'DELETE FROM `element` WHERE id_elem = ? ';
    await db.execute(queryDelete, [idElem]);

    return rows;
}

// Supprimer une section
const deleteSect = async (idSection) => {

    // Requête
    const queryDeleteLink = 'DELETE FROM `pages_contain_sec` WHERE id_section = ? ';
    const [rows] = await db.execute(queryDeleteLink, [idSection]);
    queryDelete = 'DELETE FROM `section` WHERE id_section = ? ';
    await db.execute(queryDelete, [idSection]);

    return rows;
}

module.exports = {
    getAll, getBalise, getProps, getContentSection, deleteSect, deleteElem, updateElement, getContentElem
};