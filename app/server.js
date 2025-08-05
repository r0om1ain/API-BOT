const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

let currentMove = "STAY";
let currentAction = "NOTHING";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/action', (req, res) => {
  res.json({
    "move": currentMove,
    "action": currentAction
  });
});

app.post('/set-move', (req, res) => {
  const { move } = req.body;
  currentMove = move;
  res.redirect('/');
});

app.post('/set-move', (req, res) => {
  const { action } = req.body;
  currentAction = action;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`✅ Bot actif sur http://localhost:${PORT}`);
});
