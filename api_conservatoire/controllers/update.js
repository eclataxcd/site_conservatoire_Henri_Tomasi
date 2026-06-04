const modificationService = require('../services/update');

const addSectionToPage = async (req, res) => {
    try {
        const { idPage } = req.params;
        const { idSection, ordre } = req.body;
        const result = await modificationService.addSectionToPage(idPage, idSection, ordre);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de l'ajout de la section à la page." });
    }
};

const updateElement = async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;
        const result = await modificationService.updateElement({ id: req.params.id },imageBuffer, req.body);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur détaillée :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'élément." });
    }
};

module.exports = {
    addSectionToPage,
    updateElement
};


