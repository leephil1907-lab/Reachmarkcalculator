# Reachmark 3D Calculator — Production Deployment & PWA Publishing Guide

The **Reachmark 3D Motion Calculator & Global Currency Exchanger** is engineered with 100% vanilla web standards, complete Content Security Policy (CSP) compliance, and passes **100% of the Web App Manifest & PWA Installability criteria** for publishing to the Microsoft Store, Google Play Store, and Apple App Store.

---

## 🏆 100% PWA Checklist Verification

| Requirement | Implementation | Status |
| :--- | :--- | :---: |
| **Manifest Identity** | `id`, `name`, `short_name` (<=12 chars), `description`, `start_url`, `scope` | ✅ Verified |
| **Display Modes** | `standalone` with fallback chain `display_override` | ✅ Verified |
| **Theme & Background** | Brand dark `#0b0f14` synced across manifest & HTML meta | ✅ Verified |
| **Standard Icons** | 192×192 PNG, 512×512 PNG, 144×144, 96×96, 32×32, 16×16, Scalable SVG | ✅ Verified |
| **Adaptive Maskable Icons** | 512×512 & 192×192 PNG with 80% safe zone for Android shapes | ✅ Verified |
| **Apple Touch Icon** | 180×180 PNG with solid background for iOS home screens | ✅ Verified |
| **Rich Install Screenshots** | Desktop wide (1280×720) & Mobile narrow (750×1334) with labels | ✅ Verified |
| **App Shortcuts** | Currency Exchanger, Scientific Tools, Calculation Memory with bespoke icons | ✅ Verified |
| **PWA Install Prompt** | In-app "Install App" button hooked into `beforeinstallprompt` | ✅ Verified |
| **Service Worker** | Pre-caches all 24 core assets, offline 200 response, Stale-While-Revalidate | ✅ Verified |
| **Categories & Lang** | `utilities`, `finance`, `productivity`, `education`, `en-US`, `ltr` | ✅ Verified |

---

## Option 1: GitHub Pages (Free Permanent Hosting)

1. Open your repository: [https://github.com/leephil1907-lab/Reachmarkcalculator](https://github.com/leephil1907-lab/Reachmarkcalculator)
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your calculator will be live at:
   ```
   https://leephil1907-lab.github.io/Reachmarkcalculator/
   ```

---

## Option 2: 1-Click Drag & Drop Hosting

### Method A: Netlify Drop (30 Seconds)
1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag and drop your unzipped project folder containing `index.html`, `manifest.webmanifest`, `sw.js`, and the icons/screenshots.
3. Your app is live with free global HTTPS, CDN caching, and custom domain support.

### Method B: Vercel
1. Import your GitHub repository (`leephil1907-lab/Reachmarkcalculator`) directly on **[vercel.com](https://vercel.com)**.
2. Click **Deploy**. Vercel will host it automatically with zero configuration.

---

## Option 3: Publishing to Stores via PWABuilder (100% Score)

Because all manifest criteria, icons, maskable variants, screenshots, shortcuts, and service workers are fully fulfilled:

1. Visit **[pwabuilder.com](https://www.pwabuilder.com/)**.
2. Enter your live URL (e.g. `https://leephil1907-lab.github.io/Reachmarkcalculator/`).
3. View your **100% Green Score Card**.
4. Click **"Package for Stores"**:
   - **Google Play Store**: Generates the signed Android App Bundle (`.aab`) for the Google Play Developer Console.
   - **Microsoft Store (Windows 11 / 10)**: Generates the `.msix` package for Microsoft Partner Center.
   - **Apple App Store (iOS / macOS)**: Generates the Swift/Xcode wrapper for TestFlight and App Store submission.
   - **Meta Quest**: Generates the VR / Quest store package.

---

## Option 4: Direct Mobile Installation (PWA)

- **iPhone / iPad (iOS Safari)**:
  1. Open the live site in Safari.
  2. Tap **Share** (box with arrow) → scroll and tap **Add to Home Screen**.
  3. The Reachmark squircle icon appears on your home screen and launches full-screen like a native app.

- **Android (Chrome)**:
  1. Open the live site in Google Chrome.
  2. Tap the in-app **Menu** → **Install App**, or click the browser's install banner.
  3. Reachmark installs into your Android app drawer with launcher shortcuts.

- **Desktop (Chrome / Edge / Brave)**:
  1. Click the **Install** icon in the browser address bar (top right) or use the in-app **Menu** → **Install App**.
  2. Runs in its own distraction-free desktop window with custom window controls.
