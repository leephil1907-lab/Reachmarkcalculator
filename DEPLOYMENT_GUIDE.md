# Reachmark 3D Calculator — Public Deployment Guide

Your calculator is completely built, self-contained, and production-ready. You can deploy it publicly in minutes using any of the options below.

---

## Option 1: 1-Click Drag & Drop (Fastest & Free)

### Method A: Netlify Drop (Takes 30 seconds)
1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)** (no account needed initially, or free sign up).
2. Unzip or drag your folder containing `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, and the image files into the browser window.
3. Netlify will deploy it immediately and give you a free live public URL (e.g. `https://reachmark-calculator.netlify.app`).
4. You can connect your own custom domain (e.g., `calculator.reachmark.com`) for free in Netlify settings.

### Method B: Vercel
1. Go to **[vercel.com](https://vercel.com)** and create a free account.
2. Install the Vercel CLI via terminal:
   ```bash
   npm i -g vercel
   vercel
   ```
   Or connect your GitHub repository directly on Vercel's dashboard.
3. Your app is live with automatic global HTTPS and CDN edge caching.

---

## Option 2: GitHub Pages (Free Permanent Hosting)

1. Create a new repository on **GitHub** named `reachmark-calculator`.
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial Reachmark Calculator deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/reachmark-calculator.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings** → **Pages**.
4. Under **Source**, choose `Deploy from a branch` → select `main` and `/ (root)` → click **Save**.
5. Your public site will be live at:
   `https://YOUR_USERNAME.github.io/reachmark-calculator/`

---

## Option 3: Installable Mobile & Desktop App (PWA)

Because the app already includes **`manifest.webmanifest`** and **`sw.js` (Service Worker)**:

- **On iPhone / iPad (iOS)**:
  1. Open your live URL in **Safari**.
  2. Tap the **Share** button (box with an upward arrow).
  3. Scroll down and tap **"Add to Home Screen"**.
  4. The Reachmark squircle app icon appears on your home screen and launches full-screen without browser bars.

- **On Android**:
  1. Open your live URL in **Google Chrome**.
  2. Tap the three dots menu (top right) or the bottom banner: **"Install Reachmark Calculator"**.
  3. It installs like a native Android APK and works completely offline.

- **On Windows & Mac**:
  1. Open the URL in **Chrome** or **Microsoft Edge**.
  2. Look at the right side of the URL address bar and click the **"Install"** icon.
  3. The calculator opens as an independent desktop app window.

---

## Option 4: Publish to Google Play Store & Apple App Store

To distribute the calculator directly on the Google Play Store and Apple App Store:

1. **PWABuilder (Recommended & Free)**:
   - Visit **[pwabuilder.com](https://www.pwabuilder.com/)** (created by Microsoft).
   - Enter your live URL (e.g. `https://reachmark-calculator.netlify.app`).
   - Click **"Package for Stores"**.
   - Select:
     - **Google Play**: Generates the `.aab` (Android App Bundle) ready to upload to the Google Play Console.
     - **iOS / App Store**: Generates the Xcode project package for TestFlight and App Store submission.
     - **Windows Store**: Generates the `.msix` package for the Microsoft Store.

---

## Packaged Deployment Archive

All production files have been compressed into:
- **`reachmark-calculator-deploy.zip`**
