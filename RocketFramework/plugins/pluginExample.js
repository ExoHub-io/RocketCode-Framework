// plugins/pluginExample.js

function say() {
    console.warn('ExamplePlugin loaded!')
}

module.exports = function (context) {
    // context — объект с полезными ссылками, например, app (Express), db и т.п.

    // Модули
    const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework');

    // Берём Express.js "router" из router.js
    const app = context.router;

    app.use((req, res, next) => {
        const start = Date.now();
        console.log(`[Plugin:Logger] ${req.method} ${req.url} - старт`);

        say()

        res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[Plugin:Logger] ${req.method} ${req.url} - завершено за ${duration}ms`);
        });

        next();
    });

    // Example of handling only "get" requests
    app.get('/plugins/ExamplePlugin/page/main', (req, res) => {
        renderPage('main.html', res); // Here we are rendering page from structure/pages
    });

    // Также можем запускать нужные нам функции

    // Мы можем делать для плагина свои пути с настройками
    // Используя этот же фреймворк
    // const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework/RocketFramework.js');
};