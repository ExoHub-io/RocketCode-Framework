// plugins/lucide_support.js

// Модули
const fs = require('fs');
const path = require('path');

function success() {
    console.warn('RocketAPI.js loaded!')
}

function logic(router) {
    // Новые маршруты для демонстрации возможностей

    // Страница с асинхронной обработкой
    router.get('/async', (req, res) => {
        renderPage('async-demo.html', res, {
            variables: {
                pageTitle: 'Async Demo Page'
            }
        });
    });

    // SimpleReact демо
    router.get('/simple-react', (req, res) => {
        renderPage('simple-react-demo.html', res, {
            variables: {
                pageTitle: 'SimpleReact Demo'
            }
        });
    });

    // SimpleReact пример для начинающих
    router.get('/simple-example', (req, res) => {
        renderPage('simple-example.html', res, {
            variables: {
                pageTitle: 'SimpleReact - Простой пример'
            }
        });
    });

    // SimpleReact документация
    router.get('/simple-docs', (req, res) => {
        const SimpleReactDocs = require('../RocketFramework/SimpleReactDocs.js');
        const docs = new SimpleReactDocs();
        res.send(docs.generateDocs());
    });

    // API для получения статистики производительности
    router.get('/api/stats', (req, res) => {
        const stats = PerformanceMonitor.getStats();
        res.json(stats);
    });

    // API для очистки кэша
    router.post('/api/cache/clear', (req, res) => {
        FileCache.clear();
        res.json({ success: true, message: 'Cache cleared' });
    });

    // API для получения статистики кэша
    router.get('/api/cache/stats', (req, res) => {
        const stats = FileCache.getStats();
        res.json(stats);
    });

    // Страница с partials
    router.get('/partials-demo', (req, res) => {
        renderPage('partials-demo.html', res, {
            variables: {
                pageTitle: 'Partials Demo',
                user: {
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            }
        });
    });

    // Страница с layout
    router.get('/layout-demo', (req, res) => {
        renderPage('layout-demo.html', res, {
            layout: 'admin.html',
            variables: {
                pageTitle: 'Admin Panel',
                sidebar: true,
                notifications: 5
            }
        });
    });
}

module.exports = function (context) {
    success();
    logic(context.router);
}