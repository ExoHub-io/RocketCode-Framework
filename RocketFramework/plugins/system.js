// plugins/system.js

// Modules
const { renderPage, getAsset, writeRaw, getJson, getRaw } = require('../RocketFramework');
const fs = require('fs');
const path = require('path');

function success() {
    console.warn('System loaded!')
}

function logic(app) {
    app.get('/sys/about', (req, res) => {
        const type = {
            release: 'RELEASE',
            beta: 'BETA',
            alpha: 'ALPHA',
            dev: 'DEV BUILD'
        }
        const version = '1.0 | ' + type.release;

        res.send(`
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 RocketCode Framework - About</title>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        
        body {
            overflow: hidden;

            display: flex;
            flex-direction: column;
            justify-content: flex-start; /* прижать к верху */
            align-items: center;
            min-height: 100vh;
            padding-top: 10vh; /* отступ сверху (10% высоты экрана) */
            margin: 0;
            font-family: "Roboto", sans-serif;
            background-color: #090b14;
            color: white;
            text-align: center;
        }
        h1 {
            font-size: 60px;
            display: inline;
        }

        a {
            text-decoration: none;
            color:rgb(0, 174, 218);
        }
    </style>
</head>
<body>
    <h1>🚀 RocketCode Framework</h1>
    <h2>Version: ${version}</h2>
    <a target="_blank" href="https://avirts-organization.gitbook.io/rocketcode-framework-documentation/">Documentation</a><br>
    <a target="_blank" href="https://github.com/ExoHub-io/RocketCode-Framework/">Repository</a>
</body>
</html>
`)
});

    app.get('/sys/docs', (req, res) => {
        res.redirect('https://avirts-organization.gitbook.io/rocketcode-framework-documentation/')
    })

    app.get('/sys/repo', (req, res) => {
        res.redirect('https://github.com/ExoHub-io/RocketCode-Framework/')
    })
}

module.exports = function (context) {
    const app = context.router;
    success();
    logic(app);
};