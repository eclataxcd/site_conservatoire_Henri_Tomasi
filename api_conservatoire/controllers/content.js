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

const getContentSection = async (req, res) => {
    try {
        const contentSection = await contentService.getContentSection(req.params.id);
        res.status(200).json(contentSection);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la récupération du contenu de la section." });
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

const getPropsForBalise = async (req, res) => {
    try {
        const props = await contentService.getProps(req.body);
        res.status(200).json(props);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des propriétés de la balise." });
    }
};

module.exports = {
    getAllElementAndSectionFromPages, getContentBalise, getPropsForBalise, getContentSection
};