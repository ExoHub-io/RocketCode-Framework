# 🚀 RocketCode Framework

A simple and extendable Node.js + Express framework for rendering HTML pages with support for custom tags and variables.

Before you start i'm gonna tell you some terms:
* Celems - It's a special tag in two '!' -> !celem1!
* Chvars - It's a special var in two brackets from both ways '{{' -> {{exampleVar}

Before you continue reading, instead linking css via new route use *Celems* in code you'll see default example of how you can do this!
---

## 📁 Project Structure

```

project-root/
├── app.js                # Express entry point
├── routes/
│   └── router.js          # Main routes
├── RocketFramework/
│   └── RocketFramework.js
│   └── Celems.js
│   └── Chvars.js
│   └── HowToUse.js
├── structure/
├   └── pages/
│       └── main.html     # HTML templates
├── styles/
│   └── main.css      # Injected CSS styles

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

* `GET /` — renders `main.html` from `structure/pages`

---

## 🔧 How It Works

The `Celems.js` inits *celems* and then in `RocketFramework.js` it going before you get yoyur page:
The `Chvars.js` inits *chvars* and then in `RocketFramework.js` it going before you get yoyur page:

The `Chvars.js`:
* replaces variables: `{{ password }}`

The `Celems.js`
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
2. Add a route in `routes/router.js`:

```js
router.get('/about', (req, res) => renderPage('about.html', res));
```

---

## 🧩 Adding New Custom Elements

Extend the `celem` function in `RocketFramework/Celems.js`:

```js
if (name === "CustomTextElement") {
    return page_content.replace(`!${name}!`, `<h2 ${params}>${content}</h2>`);
}
```

To use it just type where you need in your .html
```html
!CustomTextElement!
```

---

## ✅ Features

* Easy CSS injection via `!stylesMain!` (Celems)
* Replaceable variables: `{{ variable }}` (Chvars)
* Custom tags like `!name!` replaced with HTML (Celems)
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
