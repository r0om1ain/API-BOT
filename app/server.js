const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const { decideAction } = require('./bot/bot');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'navigation.html'));
});

// app.get('/action', (req, res) => {
//   const result = decideAction();
//   res.json(result);
// });

app.post('/set-move', (req, res) => {
  try {
    const { direction } = req.body;
    if (!direction) {
      return res.status(400).json({ error: 'Direction manquante' });
    }
    const result = {
      move: direction.toUpperCase(),
      action: 'MOVE',
      message: `Déplacement vers ${direction}`
    };
    res.json(result);
  } catch (error) {
    console.error('Erreur /set-move:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot actif sur http://localhost:${PORT}`);
  console.log(`🎮 Interface: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/action`);
});
