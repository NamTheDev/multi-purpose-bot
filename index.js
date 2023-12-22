const express = require('express');
const app = express();
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const PORT = getRandomInt(1000, 9999);
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

process.on('exit', (message) => {
  app.get('/status', (req, res) => {
    res.send(`${message}`)
  })
})

process.on('crash', (message) => {
  app.get('/status', (req, res) => {
    res.send(`${message}`)
  })
})

process.on('log', (message) => {
  app.get('/status', (req, res) => {
    res.send(`${message}`)
  })
})


app.get('/restart', (req, res) => {
  res.send('restarted.')
  process.restart()
});

app.use((req, res) => {
  res.redirect('/status')
})

module.exports = app