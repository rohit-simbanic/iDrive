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

## ⚡ Performance Optimizations

This project incorporates industry-standard production optimizations to ensure fast page load speeds and smooth browser execution:

1. **SVG Vector Compression (SVGO)**:
   * The raw vector assets sprite inside [js/sprite.js](js/sprite.js) was optimized using **SVGO** to strip Adobe metadata, namespace elements, and redundant coordinate paths. 
   * **Result**: Reduced the SVG asset size from **448 KB** to only **59 KB** (an **87% size reduction**).
2. **JavaScript & CSS Minification**:
   * SASS compiles stylesheet code, and **PostCSS (CSSNano)** compresses and minifies [css/style.css](css/style.css).
   * **Terser** minifies and obfuscates JavaScript files ([js/main.js](js/main.js) and [js/sprite.js](js/sprite.js)) during build, stripping code comments and spaces to minimize file transfer bytes.
3. **Window Resize Debouncing**:
   * The browser window `resize` handler inside [js/main.js](js/main.js) is wrapped in a **debounce function**. This prevents the browser from thrashing layout calculations rapidly during window dragging, resulting in smooth transitions on tablets and desktop resizes.

---

## 🌐 Netlify Git Deployment Settings

If deploying the project using **Netlify's Git Integration** (auto-deployment from GitHub), use the following configuration settings in the Netlify build settings dashboard:

* **Base directory**: *(Leave blank)*
* **Build command**: `npm run prod-build`
* **Publish directory**: `.`
* **Functions directory**: *(Leave blank)*

---

## 🌟 W3C & Accessibility (WCAG 2.1) Compliance

This codebase adheres to strict **W3C HTML5 and WCAG (Web Content Accessibility Guidelines) specifications** to ensure high-fidelity coding and standard-compliant design:

### 1. W3C HTML5 Semantic Outlines
* Uses structural semantic wrapper elements (`<main>`, `<aside>`, `<nav>`, `<header>`, `<section>`) instead of nested unsemantic layout `<div>` containers.

### 2. Accessibility (WCAG 2.1 & WAI-ARIA)
* **Form Accessibility & Association**: All form label text elements utilize the `for` attribute pointing directly to their corresponding input `id` attributes. This enables screen readers to vocalize input contexts and expands input click focus regions (WCAG 1.3.1).
* **Keyboard Navigation**: All interactive elements (sidebar toggles, submenus, form fields, and password visibility eye buttons) use native `<button>` and `<a>` tags. This enables users navigating without a mouse to access the entire application using standard **Tab** and **Enter/Space** keyboard triggers (WCAG 2.1).
* **Screen Reader Assistance (WAI-ARIA)**: Interactive controls without visible text (like the hamburger icon) use `aria-label` tags to vocalize their actions. Accordion dropdown menus use `aria-expanded` states (`true`/`false`) to inform screen readers of their toggle position.
* **High Color Contrast**: Contrast-compliant font coloring (like white text on dark blue sidebar background, and charcoal text on white content wrapper) matches and exceeds WCAG AA/AAA minimum contrast standards (WCAG 1.4.3).

### 3. SVG Assets Loader (Local CORS Bypass)
* SVGs are loaded dynamically through [js/sprite.js](js/sprite.js) to insert the sprite container into the DOM locally. This bypasses browser same-origin CORS security blocks, ensuring all icons render flawlessly when browsing via local folders (`file:///` protocol).

### 4. Search Engine Privacy (Robots Exclusion)
* **Noindex / Nofollow**: Includes `<meta name="robots" content="noindex, nofollow">` in the `<head>`.
* **Why it is used**: Since this page is an internal user registration and account dashboard portal, it should be protected from public crawlers. Hiding it prevents index spiders (like Googlebot) from showing private dashboard layout structures, forms, or login fields in public Google search engine results.
