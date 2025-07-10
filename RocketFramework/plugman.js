const path = require('path');
const fs = require('fs');

function loadPlugins() {
  const pluginsDir = path.resolve(__dirname, 'plugins');
  const plugins = [];

  fs.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith('.js')) {
      const plugin = require(path.join(pluginsDir, file));
      if (typeof plugin === 'function') {
        plugins.push(plugin);
      }
    }
  });
  return plugins;
}

function runPlugins(context) {
  console.log('==============Plugman===============')
  const plugins = loadPlugins();
  plugins.forEach(plugin => {
    try {
      plugin(context);
    } catch (err) {
      console.error(`> Ошибка плагина: `, err);
    }
  });
  console.log('==============Plugman===============')
}

// Пример вызова
// runPlugins({ app });

module.exports = {
    runPlugins
};
