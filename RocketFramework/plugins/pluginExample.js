// plugins/pluginExample.js

// Модули
const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework');
const fs = require('fs');
const path = require('path');

function success() {
    console.warn('ExamplePlugin loaded!')
}

function logic(app) {
    // examplePluginSettings.html

    // Example of handling only "get" requests
    app.get('/plugins/ExamplePlugin/page/main', (req, res) => {
        renderPage('main.html', res); // Here we are rendering page from structure/pages
    });
}

module.exports = function (context) {
    // context — объект с полезными ссылками, например, app (Express), db и т.п.

    // Берём Express.js "router" из router.js
    const app = context.router;

    success();

    logic(app);

    // Также можем запускать нужные нам функции

    // Мы можем делать для плагина свои пути с настройками
    // Используя этот же фреймворк
    // const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework/RocketFramework.js');
};