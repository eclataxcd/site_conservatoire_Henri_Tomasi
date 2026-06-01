const express = require('express');
const cors = require('cors');

const testRoutes = require('./routes/test');
const userRoutes = require('./routes/user');
const pageRoutes = require('./routes/pages');
const contentRoutes = require('./routes/content');

const app = express();
app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api', userRoutes, pageRoutes, contentRoutes);

app.listen(5000, () => console.log("Serveur prêt sur le port 5000"));