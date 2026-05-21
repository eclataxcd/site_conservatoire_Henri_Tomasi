const db = require('../config/db');

const getData = async () => {
  
  // Requêtes 
  const querySelect = 'SELECT * FROM `type_page`';
  const [result] = await db.execute(querySelect);

  return result; 
};

module.exports = { getData };