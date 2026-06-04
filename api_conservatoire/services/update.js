const db = require('../config/db');

// Ajouter une section à une page
const addSectionToPage = async (idPage, idSection, ordre) => {

    // Requête
    const queryInsert = 'INSERT INTO `pages_contain_sec` (id_page, id_section, ordre) VALUES (?, ?, ?)';
    const [result] = await db.execute(queryInsert, [idPage, idSection, ordre]);
    return result;
}

// Mettre à jour un élément
const updateElement = async (id, image, element) => {
    const { nom, texte, couleur, document, action, hauteur, longueur } = element;

    // Requête 
    const queryUpdate = 'UPDATE element SET image = ? WHERE id_elem = ?';
    
    // On passe directement le imageBuffer dans le tableau de paramètres
    const [result] = await db.execute(queryUpdate, [image, id]); 
    return result;
}

module.exports = {
    addSectionToPage
};

