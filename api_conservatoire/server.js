const express = require('express');
const testRoutes = require('./routes/test');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

// Utilisation des routes
app.use('/api', userRoutes);

app.listen(5000, () => console.log("Serveur prêt sur le port 5000"));