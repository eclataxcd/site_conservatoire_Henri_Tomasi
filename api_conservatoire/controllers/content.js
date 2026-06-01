const contentService = require('../services/content');

const getAllElementAndSectionFromPages = async (req, res) => {
    try {
        const content = await contentService.getAll(req.params.id);
        res.status(200).json(content);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des éléments." });
    }
};

const getContentBalise = async (req, res) => {
    try {
        const balise = await contentService.getBalise(req.body);
        res.status(200).json(balise);

    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la récupération de la balise." });
    }
};

module.exports = {
    getAllElementAndSectionFromPages, getContentBalise
};