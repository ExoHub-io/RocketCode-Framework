// FRAMEWORK NECCESORY
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework/RocketFramework.js');
const { runPlugins } = require('../RocketFramework/plugman.js');

// Запускаем главный метод плагинов (А дальше они уже сами будут делать что им надо)
runPlugins({ router });
// FRAMEWORK NECCESORY



// Example of handling only "get" requests
router.get('/', (req, res) => {
    renderPage('main.html', res); // Here we are rendering page from structure/pages
});

// Example of handling only "post" requests
router.post('/data', (req, res) => {
  const { name, lastname, password } = getJson(req); // Use the same order of sending data
  res.send(`Getted name: ${name}`);
});

module.exports = router;