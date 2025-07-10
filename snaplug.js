// Modules
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const pluginsGitPath = 'https://raw.githubusercontent.com/ExoHub-io/RCF-Plugins/refs/heads/main/plugins/';

function getGitPath(folder) {
    return pluginsGitPath + folder + 'installer.js'
}

const plugins = {
  examplePlugin: getGitPath('example_plugin/'),
  lucideSupport: getGitPath('lucide_support/'),
  mkFast: getGitPath('mkFast/'),
};

async function getPluginInstallerCode(name) {
  let url;

  switch(name) {
    case 'examplePlugin':
      url = plugins.examplePlugin;
      break;

    case 'lucideSupport' || 'lucide':
      url = plugins.lucideSupport;
      break;

    case 'mkFast' || 'makeFast' || 'makeFaster':
      url = plugins.lucideSupport;
      break;

    default:
      console.log(name + ' | Does not exist in snaplug!')
      break;
  }

  console.log(`Fetching installer from: ${url}`);

  try {
    const resp = await axios.get(url);
    console.log('HTTP status:', resp.status);

    let content = resp.data;

    // ✅ Only try to extract from <pre> if the file looks like HTML
    if (content.trim().startsWith('<')) {
      const match = content.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
      if (match) {
        content = match[1];
        console.log('<pre> content extracted.');
      } else {
        console.warn('Warning: HTML detected, but no <pre> block found.');
        return;
      }
    }

    console.log('Executing installer...');
    eval(content);  // ⚠️ Still dangerous if untrusted

  } catch (err) {
    console.error('Failed to fetch installer:', err.message);
  }
}



// ✅ Immediately invoked async function to run script logic
(async () => {
    const args = process.argv.slice(2); // e.g. ['install', 'examplePlugin']

    if (args.length >= 2 && args[0] === 'install') {
        const pluginName = args[1];
        await getPluginInstallerCode(pluginName);
    } else {
        console.log('Usage: node upy.js install <pluginName>');
    }
})();
