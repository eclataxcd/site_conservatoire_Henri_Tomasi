const bcrypt = require('bcrypt')

const validateAddUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "Le mdp et l'email sont obligatoires." });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Email au format invalide." });
  }

  next();
};

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  if (password) {
    const saltRounds = 12
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    req.body.password = hashedPassword;
  } 

  next();
};


module.exports = { validateAddUser, hashPassword };