markdown
# 🚀 RocketCode Framework

A simple and extendable Node.js + Express framework for rendering HTML pages with support for custom tags and variables.

---

## 📁 Project Structure

```

project-root/
├── app.js                # Express entry point
├── routes/
│   └── index.js          # Main routes
├── utils/
│   └── pageRenderer.js   # HTML parsing, variables, and custom elements
└── structure/
├── pages/
│   └── main.html     # HTML templates
└── styles/
└── main.css      # Injected CSS styles

````

---

## ⚙️ Installation

```bash
git clone https://github.com/ExoHub-io/RocketCode-Framework.git
cd RocketCode-Framework
npm install
````

---

## 🚀 Running

```bash
node app.js
```

After launching, the following routes will be available:

* `GET /` — test route
* `GET /file` — renders `main.html` from `structure/pages`

---

## 🔧 How It Works

The `pageRenderer.js` module automatically:

* replaces variables: `{{ password }}`
* replaces custom elements: `!testText!`, `!stylesMain!`
* injects styles and dynamic HTML into the page

### Example template (`main.html`):

```html
<h3>{{ password }}</h3>
!testText!
!bigText!
!stylesMain!
```

---

## 📌 Adding New Pages

1. Create a file in `structure/pages`, e.g. `about.html`
2. Add a route in `routes/index.js`:

```js
router.get('/about', (req, res) => renderPage('about.html', res));
```

---

## 🧩 Adding New Custom Elements

Extend the `celem` function in `utils/pageRenderer.js`:

```js
if (name === "newElement") {
    return page_content.replace(`!${name}!`, `<div>New element</div>`);
}
```

---

## ✅ Features

* Easy CSS injection via `!stylesMain!`
* Replaceable variables: `{{ variable }}`
* Custom tags like `!name!` replaced with HTML
* Fully based on `Node.js + Express`, no external template engines

---

## 📄 License

MIT License

---

## 💬 Feedback

Pull requests and suggestions are welcome! Open an issue or fork the project 🙌

```

---

Если нужно оформить `README` в стиле с таблицей или значками (badges) — могу добавить.
```
