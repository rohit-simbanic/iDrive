# IDrive Dashboard Prototype - User Guide

This guide outlines how to run, develop, and deploy this prototype project.

---

## 1. Initial Setup (Prerequisites)

Before starting development or compilation, make sure you have **Node.js** (which includes **NPM**) installed on your computer.

1. Open your terminal in the project directory (`C:\Users\rohit\Downloads\IDrive\IDrive`).
2. Install all development dependencies (SASS, PostCSS, Autoprefixer, CSSNano):
   ```bash
   npm install
   ```

---

## 2. Local Development Workflow

When editing the prototype:

1. **Watch SASS Changes**:
   Run the background watcher in your terminal:
   ```bash
   npm run watch-css
   ```
   This will watch the SASS source file (`scss/style.scss`) and automatically compile it into `css/style.css` every time you hit Save.

2. **Preview in Browser**:
   * Double-click [index.html](index.html) to open the prototype in your browser using the `file:///` protocol.
   * *Note: The vector icons will load correctly because the SVG sprite is loaded dynamically and safely via `js/sprite.js`, bypassing browser CORS restrictions.*

3. **Editable Files**:
   * Edit HTML markup in [index.html](index.html).
   * Edit Stylesheets in [scss/style.scss](scss/style.scss).
   * Edit Validation and Toggle actions in [js/main.js](js/main.js).

---

## 3. Preparing for Production (Build Pipeline)

When you are finished making edits and want to deploy the prototype to a live server:

1. Run the production build task:
   ```bash
   npm run prod-build
   ```
2. **What this does**:
   * Compiles your latest SASS code to CSS.
   * Automatically adds vendor compatibility prefixes (like `-webkit-` and `-moz-`) for older browsers.
   * Compresses (minifies) the CSS, removing all comments and spaces to minimize load times.

---

## 4. Deployment Guide

To deploy the website to production hosting (e.g., cPanel, Netlify, Vercel, or AWS S3), **only upload the following 4 files/folders**:

```
📂 [Your Hosting Root Directory]
 ┣ 📂 css
 ┃ ┗ 📜 style.css (Compiled & minified stylesheet)
 ┣ 📂 js
 ┃ ┣ 📜 main.js   (Logic and form validation)
 ┃ ┗ 📜 sprite.js (Vector asset sprite library)
 ┗ 📜 index.html  (Main HTML structure)
```

### ⚠️ IMPORTANT: Files to Ignore in Production
Do **NOT** upload the following files and folders to your live web hosting server (they are only needed for local compilation):
* `node_modules/` (Very large development dependency folder)
* `scss/` (SASS source files)
* `package.json` & `package-lock.json` (NPM configuration)
* `postcss.config.js` (PostCSS configuration)
* `Custom Size – 1.png` / `IDrive.xd` (Reference assets)
* `INSTRUCTIONS.md` (This guide)
