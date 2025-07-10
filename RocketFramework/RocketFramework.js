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

async function getRawAsync(path_) {
    const filePath = path.join(__dirname, '..', 'structure', path_);
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error("Ошибка чтения файла:", err);
        return '';
    }
}

async function writeRawAsync(path_, data) {
    const filePath = path.join(__dirname, '..', 'structure', path_);
    try {
        return await fs.writeFile(filePath, data, 'utf8');
    } catch (err) {
        console.error("Ошибка записи файла:", err);
        return '';
    }
}

function getAsset(res, relativePath) {
  const baseDir = path.resolve(__dirname, '..', 'structure');
  const filePath = path.join(baseDir, relativePath);

  // Безопасность: проверяем, что файл внутри baseDir
  if (!filePath.startsWith(baseDir)) {
    res.status(400).send('Неверный путь к файлу');
    return;
  }

  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('Файл не найден');
    }
  });
}

function getAssetWithThrottle(res, relativePath, options = {}) {
  const baseDir = path.resolve(__dirname, '..', 'structure');
  const filePath = path.join(baseDir, relativePath);

  if (!filePath.startsWith(baseDir)) {
    res.status(400).send('Неверный путь к файлу');
    return;
  }

  // Скорость в байтах в секунду (по умолчанию 100 Кб/с)
  const speedLimit = options.speedLimit || 100 * 1024;

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.status(404).send('Файл не найден');
      return;
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      // Можно добавить Content-Type по расширению файла
      // 'Content-Type': mime.lookup(filePath) || 'application/octet-stream'
    });

    const stream = fs.createReadStream(filePath);
    let paused = false;

    stream.on('data', chunk => {
      if (!res.write(chunk)) {
        stream.pause();
        paused = true;
      }
    });

    res.on('drain', () => {
      if (paused) {
        stream.resume();
        paused = false;
      }
    });

    // Throttling с помощью задержки между отправками чанков
    let bytesSent = 0;
    const interval = 100; // миллисекунд
    const chunkPerInterval = speedLimit / (1000 / interval);

    stream.on('data', function throttleChunk(chunk) {
      stream.pause();

      setTimeout(() => {
        res.write(chunk);
        bytesSent += chunk.length;
        stream.resume();
      }, interval);
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (e) => {
      console.error('Ошибка при чтении файла', e);
      res.end();
    });
  });
}

// Главная функция для рендера
function renderPage(pageName, res) {
    const pagePath = path.join(__dirname, '..', 'structure', 'pages', pageName);

    fs.readFileSync(pagePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let page_content = data;
        page_content = chvarsLoader(page_content);
        page_content = customElementsLoader(page_content);

        res.send(page_content);
    });
}

async function renderPageAsync(pageName, res) {
    const pagePath = path.join(__dirname, '..', 'structure', 'pages', pageName);

    await fs.readFile(pagePath, 'utf8', (err, data) => {
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
    getAssetWithThrottle,
    getRawAsync,
    writeRawAsync,
    renderPageAsync,
    renderPage,
    getRaw,
    writeRaw,
    getJson,
    getAsset
};
