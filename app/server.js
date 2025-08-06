const express = require('express');
const cors = require('cors');
const app = express();

let currentMove = "STAY";
let currentAction = "NONE";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/set-action', (req, res) => {
  const { action } = req.body;
  currentAction = action;
  res.redirect('/');
});

module.exports = app;
