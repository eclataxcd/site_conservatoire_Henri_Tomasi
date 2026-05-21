const testService = require('../services/test');

const getTypes = async (req, res) => {
  try {
    const typePage = await testService.getData();
    res.status(200).json(typePage);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des données." });
  }
};

module.exports = { getTypes };