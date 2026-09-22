# Reachmark 3D Motion Calculator & Global Currency Exchanger

![Reachmark Header](reachmark-header.jpg)

A high-precision, 3D tactile motion calculator and global currency exchange application designed for public mobile and desktop deployment. Built with 100% pure vanilla web standards, zero third-party dependencies, and zero `eval`/`Function` usage for complete Content Security Policy (CSP) compliance.

---

## 🌟 Key Features

### 🧮 High-Precision Calculation Engine
- **Accurate Evaluation**: Built-in Shunting-Yard (AST / RPN) expression tokenizer and evaluator.
- **Order of Operations**: Strict PEMDAS/BODMAS mathematical precedence (`25 x 2 = 50`, `5 + 3 * 2 = 11`, `2(3 + 4) = 14`).
- **Percentage Intelligence**: Context-aware percentages (`100 + 10% = 110`, `500 - 20% = 400`, `200 * 15% = 30`, `50% = 0.5`).
- **Precision Rounding**: Eliminates JavaScript IEEE-754 floating-point rounding artifacts (`0.1 + 0.2 = 0.3`).
- **Division by Zero Protection**: Clean, user-friendly `"Cannot divide by 0"` alert instead of application crashes.
- **Two-Line Dynamic Display**: Formula tape line tracks the active equation, while the main number line displays live calculations and confirms evaluated results in Reachmark electric lime (`#d6f269`).

### 💱 Global Currency Exchanger (120+ Countries)
- **Comprehensive Global Coverage**: Live exchange conversions for over 120 countries across Africa, the Americas, Europe, Asia, the Middle East, and Oceania.
- **One-Touch Swap**: Quickly reverse base and target currencies with the swap button (`⇄`).
- **Direct Integration**: Single-click button (`Insert Result to Calculator`) transfers any converted currency value directly into your active math formula.

### 📜 Persistent Calculation Memory Tape
- **Permanent Session Memory**: Every calculation is logged in `localStorage` with date and time stamps.
- **One-Click Re-Use**: Click **"Use Result"** to append previous figures into current equations or **"Edit"** to recall full past formulas.
- **Export & Backup**: Export your full calculation history as a formatted `.csv` file or copy all to clipboard.
- **Hardware Memory Registers**: Traditional `MC`, `MR`, `M+`, `M−`, and `MS` with an on-screen `MEM` status badge.

### 📐 Scientific Math Tools (`fx`)
- **Trigonometry**: `sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹` with clickable `DEG` / `RAD` angle mode switching.
- **Powers & Roots**: `x²`, `x³`, `xʸ`, `√x`, `1/x`.
- **Logarithms & Constants**: `log₁₀`, `ln`, `π`, `e`, and factorials (`n!`).

### 📱 Responsive 3D Motion & Touch Experience
- **Tactile 3D Keycaps**: Realistic extrusion depth, bevel highlights, and smooth press-down physics on mouse click, finger tap, or keyboard strokes.
- **Synthetic Web Audio Engine**: Zero-latency mechanical switch sounds generated directly with the Web Audio API (with dedicated mute controls).
- **Responsive Architecture**: Fluid scaling for mobile smartphones, tablets, and widescreen desktop monitors.
- **PWA Ready**: Offline caching service worker (`sw.js`) and web app manifest (`manifest.webmanifest`) for standalone "Add to Home Screen" app installation on iOS and Android.

---

## 🚀 Live Demo & Installation

### Web Access
Open `index.html` in any modern web browser or deploy directly to Netlify, Vercel, or GitHub Pages.

### Mobile Installation (PWA)
- **iOS (Safari)**: Tap **Share** → **Add to Home Screen**.
- **Android (Chrome)**: Tap the menu (three dots) → **Install App** / **Add to Home screen**.

---

## 🛠️ Tech Stack
- **HTML5 & Modern CSS3**: Custom properties, 3D perspective, responsive grids.
- **Pure Vanilla JavaScript (ES6+)**: Custom AST tokenizer and Shunting-Yard evaluator (100% CSP safe).
- **Web Audio API**: Real-time synthetic tactile feedback sound generator.
- **Service Worker API**: Offline asset caching.

---

## 📄 License
MIT License. Created for Reachmark.
