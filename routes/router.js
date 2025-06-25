const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');


const { renderPage, getRaw, getJson } = require('../RocketFramework/RocketFramework.js');

// Роут на корень
router.get('/', (req, res) => {
    renderPage('main.html', res);
});

// Пример POST-запроса
router.post('/data', (req, res) => {
  const { name } = getJson(req);
  res.send(`Получено имя: ${name}`);
});


// Роут: читает файл и возвращает его содержимое
// app.get('/read-file', (req, res) => {
//   const filePath = path.join("..", 'files', 'example.txt');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).send('Ошибка при чтении файла');
//     }
//     res.send(`<pre>${data}</pre>`);
//   });
// });

module.exports = router;
