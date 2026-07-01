# IDrive Cloud Backup Dashboard - Prototype

A high-fidelity, responsive frontend prototype of the IDrive Cloud Backup dashboard interface, featuring collapsible navigation, step-by-step instructions, and a validated Add User form.

---

## 🛠️ Installation & Setup

Follow these steps to prepare the local environment before editing the code:

1. **Open the Project Folder**:
   Open your preferred code editor (such as VS Code) and navigate to the project directory:
   `C:\Users\rohit\Downloads\IDrive\IDrive`

2. **Install Compiler Dependencies**:
   Open a terminal window inside the project directory and run the package installer:
   ```bash
   npm install
   ```
   *This installs Dart Sass, PostCSS CLI, Autoprefixer, and CSSNano into your local `node_modules/` folder.*

---

## 💻 How to Develop

Once the dependencies are installed, follow this workflow to write code and preview changes:

### Step 1: Start the SASS Compiler (Real-Time Watcher)
Run the following NPM script in your terminal to track your styles:
```bash
npm run watch-css
```
* **What it does**: This launches a background task that watches your SASS source stylesheet ([scss/style.scss](scss/style.scss)). Every time you save your edits, SASS compiles them instantly into [css/style.css](css/style.css). Keep this terminal window open while coding.

### Step 2: Open the Prototype in Your Browser
Double-click [index.html](index.html) or right-click to open it in any web browser. 
* **Why it works**: You do not need to host a local server. The SVG icons load dynamically through [js/sprite.js](js/sprite.js) to bypass browser CORS same-origin policies on local directories (`file:///`).

### Step 3: Make Your Code Edits
* **Modify layout structure**: Edit [index.html](index.html).
* **Modify visual styles**: Edit [scss/style.scss](scss/style.scss). The SASS compiler will update `css/style.css` automatically.
* **Modify form logic / interactive drawer actions**: Edit [js/main.js](js/main.js).

### Step 4: Preview Your Changes
Simply **refresh your browser page** to see your HTML, CSS, and JS changes update live.

---

## 🚀 Compiling & Building for Production

When you are ready to prepare your code for release (uploading to a host like Netlify or a cPanel server):

1. **Compile & Minify Styles**:
   Run the production build script:
   ```bash
   npm run prod-build
   ```
   * **What it does**: SASS compiles your styling, then PostCSS applies browser vendor compatibility prefixes (like `-webkit-` and `-moz-`) and compresses (minifies) the CSS code to ensure fast load times.

2. **Upload Runtime Files**:
   Upload **only** the following files to your production web server:
   * `index.html`
   * `css/style.css` (compiled and minified stylesheet)
   * `js/main.js` (validation and actions)
   * `js/sprite.js` (SVG assets loader)

   *⚠️ Note: Do not upload `node_modules/`, the `scss/` folder, or build configs (`package.json`, `package-lock.json`, `postcss.config.js`) to production.*

---

## 🌟 W3C & WCAG Compliance Support

This codebase adheres to strict **W3C HTML5 and WCAG (Web Content Accessibility Guidelines) specifications**:

1. **HTML5 Semantic Outlines**:
   * Uses semantic wrapper elements (`<main>`, `<aside>`, `<nav>`, `<header>`, `<section>`) instead of nested unsemantic layout `<div>` containers.
2. **Form Accessibility & Association**:
   * All form label text elements utilize the `for` attribute pointing directly to their corresponding input `id` attributes. This enables screen readers to vocalize input contexts and expands input click focus regions.
3. **Unique Identifiers**:
   * Every input field, form group, button, and validation message has a globally unique `id` attribute, preventing document validation collisions.
4. **Interactive Element Semantics**:
   * Sidebar collapses and password toggles use native `<button>` tags rather than plain divs, making them fully keyboard-accessible (keyboard tab-index focusable, Space and Enter key triggerable).
   * Key interactives include `aria-label` tags to state actions for assistive devices.
5. **Dynamic SVG Loader**:
   * SVGs are loaded dynamically through `js/sprite.js` to insert the sprite container into the DOM locally. This bypasses browser same-origin CORS security blocks, ensuring all icons render flawlessly when browsing via local folders (`file:///` protocol).
