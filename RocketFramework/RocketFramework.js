const fs = require('fs');
const path = require('path');

const { customElementsLoader } = require('../RocketFramework/Celems.js');
const { chvarsLoader } = require('../RocketFramework/Chvars.js');

function getJson(req) {
    return req.body;
}

// Чтение сырого файла (например, CSS)
function getRaw(path_) {
    const filePath = path.join(__dirname, '..', 'structure', path_);
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error("Ошибка чтения файла:", err);
        return '';
    }
}

function writeRaw(path_, data) {
    const filePath = path.join(__dirname, '..', 'structure', path_);
    try {
        return fs.writeFileSync(filePath, data, 'utf8');
    } catch (err) {
        console.error("Ошибка записи файла:", err);
        return '';
    }
}

// Главная функция для рендера
function renderPage(pageName, res) {
    const pagePath = path.join(__dirname, '..', 'structure', 'pages', pageName);

    fs.readFile(pagePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let page_content = data;
        page_content = chvarsLoader(page_content);
        page_content = customElementsLoader(page_content);

        res.send(page_content);
    });
}

module.exports = {
    renderPage,
    getRaw,
    writeRaw,
    getJson,
};
