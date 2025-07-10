// Modules
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Here git-repository url
const pluginsGitPath = 'https://raw.githubusercontent.com/ExoHub-io/RCF-Plugins/refs/heads/main/plugins/'; // Make sure it ends with "/plugins/"

function getGitPath(folder) {
  return pluginsGitPath + folder + 'installer.js'
}

function gitErrorHandler() {
  if (pluginsGitPath.endsWith('plugins/')) {return true}
  else {console.log(`
====================Snaplug==================
This snaplug.js was modified with error
> pluginsGitPath not endwith "plugins/"
> ⚠ Make sure that you trust this repository!
====================Snaplug==================
`)}
}

// Here list of git path to plugin folder
const plugins = {
  examplePlugin: getGitPath('example_plugin/'),
  lucideSupport: getGitPath('lucide_support/'),
  mkFast: getGitPath('mkFast/'),
};

async function getPluginInstallerCode(name) {
  let url;
  let Exists = true;

  if (gitErrorHandler()) {
    // Here list of plugins
    switch(name) {
      case 'examplePlugin':
        url = plugins.examplePlugin;
        break;

      case 'lucideSupport':
        url = plugins.lucideSupport;
        break;

      case 'mkFast':
        url = plugins.lucideSupport;
        break;

      case 'blackPlug':
        Exists = false;
        console.log(`
  ========================Snaplug======================
  > BlackPlug it's a special version of Snaplug that
  provides you abillity to download pirate plugins

  > ⚠ We are not responding if you get virus using
  BlackPlug
  ========================Snaplug======================
  `)

        console.log(`
  ======================BlackPlug====================
  > ⚠ Read text upside!
  (You need to download BlackPlug manually)
  
  > How to use:
  node blackplug.js install "repo" "plugin"

  > ⚠ Not in quotes!
  ======================BlackPlug====================
  `)
        break;
      default:
        Exists = false;
        console.log(`
  =====================Snaplug===================
  ⚠ Plugin "${name}" not exists in official repo

  > To install not official plugins:
  > node snaplug.js install blackPlug
  =====================Snaplug===================
  `)
        break;
    }

    if (Exists) {
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
