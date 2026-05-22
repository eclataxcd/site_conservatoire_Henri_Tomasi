const pageService = require('../services/user');

// Récupérer toutes les pages
const getAllPages = async (req, res) => {
  try {
    const pages = await pageService.getAll();
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des pages." });
  }
};


// Récupérer une page par son id
const getPageById = async (req, res) => {
  try {
    const page = await pageService.get({ id: req.params.id });
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


// Mettre à jour le nom d'une page à partir de son id
const updatePageName = async (req, res) => {
  try {
    const updatedPage = await pageService.updateName({ id: req.params.id }, req.body);
    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la page." });
  }
};


// Mettre à jour un element d'une page à partir de son id
const updatePageElement = async (req, res) => {
  try {
    const updatedPage = await pageService.updateElement({ idPage: req.params.idPage, idElement: req.params.idElement }, req.body);
    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la section de la page." });
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


module.exports = { getAllPages, getPageById, addPage, updatePageName, updatePageElement, deletePage };