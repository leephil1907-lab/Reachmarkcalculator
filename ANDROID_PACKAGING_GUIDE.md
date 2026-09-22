# Reachmark Calculator — Android APK & AAB Packaging Guide

This guide details how to build and package **Reachmark Calculator** into a native Android **APK** (for direct device installation) and **AAB (Android App Bundle)** (for Google Play Store publishing).

---

## 1. Quick Packaging via PWABuilder (Recommended)

1. Navigate to [PWABuilder.com](https://www.pwabuilder.com/).
2. Enter the URL:
   ```text
   https://leephil1907-lab.github.io/Reachmarkcalculator/
   ```
3. Click **Start** / **Test**. All manifest, service worker, and security checks will pass with a **100% score**.
4. Click **Package for Stores** and select **Android**.
5. In **Android Package Options**:
   - **Package ID:** `io.github.leephil1907_lab.twa`
   - **App name:** `Reachmark Calculator`
   - **Short name:** `Reachmark`
   - **App version:** `1.0.0` (versionCode: `1`)
   - **Host:** `leephil1907-lab.github.io`
   - **Start URL:** `/Reachmarkcalculator/index.html?source=pwa`
   - **Signing key:** Choose *Use my own key* (upload `signing.keystore` from your previous zip) or select *Generate a new key*.
   - **Fingerprint:** Ensure the SHA-256 fingerprint matches `.well-known/assetlinks.json`.
6. Click **Generate** and download your package zip file.
7. Inside the downloaded zip:
   - `app-release-signed.apk`: Direct APK to install on any Android phone.
   - `app-release.aab`: Android App Bundle to upload to Google Play Console.
   - `signing.keystore`: Keystore used to sign future updates.

---

## 2. Direct Packaging via Bubblewrap CLI

If you prefer building locally or in CI/CD:

```bash
# 1. Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize project using twa-manifest.json
bubblewrap init --manifest https://leephil1907-lab.github.io/Reachmarkcalculator/manifest.webmanifest

# 3. Build APK and AAB
bubblewrap build
```

This compiles:
- `app-release-signed.apk` (Installable via `adb install` or file transfer)
- `app-release.aab` (Google Play Console ready)

---

## 3. Digital Asset Links Verification

To ensure full-screen display without Chrome's URL bar, Android requires Digital Asset Links verification:
- Domain: `https://leephil1907-lab.github.io/Reachmarkcalculator/.well-known/assetlinks.json`
- Package Name: `io.github.leephil1907_lab.twa`
- SHA-256 Fingerprint:
  `04:3F:D5:EA:6C:AB:2B:04:01:0E:48:24:04:C8:50:EC:C5:BC:BA:E9:43:CF:93:0A:2A:ED:0E:98:11:50:46:76`

This file is already active in production.
