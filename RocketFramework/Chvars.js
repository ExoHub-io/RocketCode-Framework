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

// Заменяет {{ переменные }}
function chvar(page_content, name, data) {
    const regex = new RegExp(`{{\\s*${name}\\s*}}`, 'g');
    return page_content.replaceAll(regex, data);
}

// Обработка переменных
function chvarsLoader(page_content) {
    let page_to_return = page_content;

    page_to_return = chvar(page_to_return, "password", "123456789");
    // page_to_return = chvar(page_to_return, "password", "123456789");
    
    // Добавляй другие переменные тут
    return page_to_return;
}

module.exports = {
    chvarsLoader,
};
