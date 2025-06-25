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
    if (name === "testText") {
        return page_content.replace(`!${name}!`, `<h2 ${params}>${content}</h2>`);
    }

    if (name === "bigText") {
        return page_content.replace(`!${name}!`, `<p style="font-size: 60px;">${content}</p>`);
    }

    if (name === "stylesMain") {
        const style_content = getRaw('styles/main.css');
        return page_content.replace(`!${name}!`, `<style>${style_content}</style>`);
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
    return result;
}


module.exports = {
    customElementsLoader,
};
