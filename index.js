const express = require('express');
const app = express();
const PORT = 3000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const nodemon = require("nodemon");

const process = nodemon({
  "restartable": "rs",
  "ignore": [".git", "node_modules/", "dist/"],
  "watch": ["src/"],
  "ext": "js",
  "exec": "npm start"
})
process.on('restart', () => {
  console.log('restarted.')
})

app.get('/restart', (req, res) => {
  res.send('restarted.')
  process.restart()
});

app.use((req, res) => {
  res.redirect('/restart')
})

module.exports = app