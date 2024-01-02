const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importez le middleware CORS

const app = express();

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'sql11.freesqldatabase.com',
  user: 'sql11667198',
  password: 'cdSPCALtRD',
  database: 'sql11667198',
});

// Connectez-vous à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

app.use(cors({
  origin: 'http://localhost:19006', // Remplacez par l'origine de votre application React Native
  methods: 'GET', // Spécifiez les méthodes autorisées (dans ce cas, uniquement GET)
}));

// Définissez une route pour exécuter votre requête SQL et renvoyer les résultats
app.get('/api/commands', (req, res) => {
  const sql = `
    SELECT commande.id, commande.date, commande.quantite, commande.statut, produit.nom AS nomProduit, client.nom AS nomClient
    FROM commande
    INNER JOIN client ON client.id = commande.id_client
    INNER JOIN produit ON produit.id = commande.id_produit
    ORDER BY commande.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête SQL :', err);
      res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
    } else {
      res.json(results);
    }
  });
});

const port = 3000; // Port sur lequel votre serveur Express écoutera

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
