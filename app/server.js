const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { decideAction } = require('./bot');

app.use(cors());

app.get('/action', (req, res) => {
  const result = decideAction();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Bot actif sur http://localhost:${PORT}/action`);
});
