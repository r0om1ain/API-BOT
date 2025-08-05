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

app.get('/action', (req, res) => {
  const result = decideAction();
  res.json(result);
});

app.post('/set-move', (req, res) => {
  const { direction } = req.body;
  const result = {
    move: direction.toUpperCase(),
    action: 'MOVE',
    message: `Déplacement vers ${direction}`
  };
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Bot actif sur http://localhost:${PORT}`);
  console.log(`🎮 Interface: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/action`);
});
