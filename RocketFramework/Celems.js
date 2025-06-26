const fs = require('fs');
const path = require('path');

// Прочесть файлик
function getRaw(path_) {
    const filePath = path.join(__dirname, '..', 'structure', path_);
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error("Ошибка чтения файла:", err);
        return '';
    }
}

// Обработка кастомных элементов
function celem(page_content, name, params, content) {
    // ELEMENTS
    if (name === "testText") {
        return page_content.replaceAll(`!${name}!`, `<h2 ${params}>${content}</h2>`);
    }

    if (name === "bigText") {
        return page_content.replaceAll(`!${name}!`, `<p style="font-size: 60px;">${content}</p>`);
    }

    // STYLES
    if (name === "stylesMain") {
        const style_content = getRaw('styles/main.css');
        return page_content.replaceAll(`!${name}!`, `<style>${style_content}</style>`);
    }

    // SCRIPTS
    if (name === "scriptMain1") {
        const style_content = getRaw('scripts/main1.js');
        return page_content.replaceAll(`!${name}!`, `<script>${style_content}</script>`);
    }

    // LOGGERS
    if (name === "loggerMainPage") {
        console.log("[LOGGER] : main page loaded");
        return page_content.replaceAll(`!${name}!`, ``);
    }


    return page_content;
}

// Запускает все кастомные элементы
function customElementsLoader(page_content) {
    let result = page_content;

    // CELEMS
    result = celem(result, "testText", 'style="font-size: 60px;"', "Text2");
    result = celem(result, "bigText", '', 'Big Text Element');

    // STYLES
    result = celem(result, "stylesMain", '', '');

    // SCRIPTS
    result = celem(result, "scriptMain1", '', '');

    // LOGGERS
    result = celem(result, "loggerMainPage", '', '');
    return result;
}


module.exports = {
    customElementsLoader,
};
