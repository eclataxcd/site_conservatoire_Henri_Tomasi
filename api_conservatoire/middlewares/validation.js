const validateAddUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "Le mdp et l'email sont obligatoires." });
  }


  next();
};

module.exports = { validateAddUser };