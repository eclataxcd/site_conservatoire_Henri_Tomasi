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

const getContentElement = async (req, res) => {
    try {
        const contentElem = await contentService.getContentElem(req.params.id);
        res.status(200).json(contentElem);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la récupération du contenu de l'élément" });
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

const updateElem = async (req, res) => {
    try {
        const idElem = req.params.id;
        const elem = await contentService.updateElement(idElem, req.body);
        res.status(200).json(elem);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la modification de l'élément." });
    }
};

const deleteElement = async (req, res) => {
    try {
        const element = await contentService.deleteElem(req.params.id);
        res.status(200).json(element);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la suppression." });
    }
};

const deleteSection = async (req, res) => {
    try {
        const section = await contentService.deleteSect(req.params.id);
        res.status(200).json(section);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la suppression." });
    }
};

module.exports = {
    updateElem, getAllElementAndSectionFromPages, getContentBalise, getPropsForBalise, getContentSection, deleteElement, deleteSection, getContentElement
};