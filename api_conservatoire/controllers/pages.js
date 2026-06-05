const pageService = require('../services/pages');

// Récupérer toutes les pages
const getAllPages = async (req, res) => {
  try {
    const pages = await pageService.getAll();
    res.status(200).json(pages);
  } catch (err) {
    console.error("Erreur détaillée :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des pages." });
  }
};


// Récupérer une page par son id
const getPageById = async (req, res) => {
  try {
    const page = await pageService.get(req.params.id);
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération de la page." });
  }
};


// Ajouter une page 
const addPage = async (req, res) => {
  try {
    const newPage = await pageService.add(req.body);
    res.status(201).json(newPage);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de la page." });
  }
};


// Ajouter un élément à une page à partir de son id
const addElementPage = async (req, res) => {
  try {
    const idPage = req.params.idPage;
    const updatedPage = await pageService.addElement(idPage, req.body);
    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ 
            error: "Erreur lors de l'ajout de l'élément dans la page.", 
            messageDetails: err.message,
            sqlMessage: err.sqlMessage || null
        });
  }
};


// Ajouter un élément à une page à partir de son id
const addSectionPage = async (req, res) => {
  try {
    const idPage = req.params.idPage;
    const updatedPage = await pageService.addSection(idPage, req.body);
    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ 
            error: "Erreur lors de l'ajout de la section dans la page.", 
            messageDetails: err.message,
            sqlMessage: err.sqlMessage || null
        });
  }
};


// Supprimer une page à partir de son id
const deletePage = async (req, res) => {
  try {
    const user = await pageService.deletePage({ id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};


module.exports = { getAllPages, getPageById, addPage, addSectionPage, addElementPage, deletePage };