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

## 3. Digital Asset Links Verification (Hiding the URL / Address Bar)

To ensure full-screen display **without Chrome's URL or address bar**, Android requires Digital Asset Links verification:
- **Root Domain:** `https://leephil1907-lab.github.io/.well-known/assetlinks.json` (Live and verified by Google DAL API)
- **Subpath Mirror:** `https://leephil1907-lab.github.io/Reachmarkcalculator/.well-known/assetlinks.json`
- **Package ID:** `io.github.leephil1907_lab.twa`
- **Current Upload SHA-256 Fingerprint:**
  `04:3F:D5:EA:6C:AB:2B:04:01:0E:48:24:04:C8:50:EC:C5:BC:BA:E9:43:CF:93:0A:2A:ED:0E:98:11:50:46:76`

---

## 4. Chrome's DAL Caching Behavior & Cache Clearing Guide

Chrome and Android aggressively cache Digital Asset Links verification results across two distinct layers:

| Layer | Who Caches | Duration / Behavior | Practical Impact |
|-------|------------|---------------------|------------------|
| **Google Servers** | `digitalassetlinks.googleapis.com` | Up to **8 days** max TTL | Changes can take hours to propagate through Google's CDN. |
| **On-Device (Chrome)** | Chrome on the phone | Persistent across app restarts | Stores both **success and failure** results. An earlier failed check (before `assetlinks.json` was active) is remembered and reused. |

### Most Effective Steps to Clear the On-Device Cache:

1. **Force-stop** the Reachmark Calculator app.
2. Open Android **Settings → Apps → Chrome → Storage & cache → Clear cache** (and **Clear storage** if needed).
3. In Chrome on the phone, open:
   - `chrome://net-internals/#dns` → Tap **Clear host cache**.
   - `chrome://net-internals/#sockets` → Tap **Flush socket pools**.
4. **Uninstall** the Reachmark app completely from the device.
5. **Reinstall** the APK/AAB.
6. Launch the app. With the live root assetlinks statement now returning 200 OK, Android will verify the signature and run without any URL bar.

### Diagnostic ADB Commands:

Verify the live verification status via Android Logcat:
```bash
adb logcat -v brief | grep -e OriginVerifier -e digital_asset_links
```
Look for `Verification succeeded`.

Force Android to immediately re-verify (Android 12+):
```bash
adb shell pm verify-app-links --re-verify io.github.leephil1907_lab.twa
```

---

## 5. Google Play Store Publishing (Dual Fingerprints)

When you publish to the Google Play Store with **Play App Signing** enabled, Google signs the distributed APK with a separate release key. To ensure the address bar never reappears for Play Store users:
1. Open Google Play Console $\rightarrow$ Your App $\rightarrow$ **Release $\rightarrow$ Setup $\rightarrow$ App signing**.
2. Copy the **App signing key certificate SHA-256 fingerprint**.
3. Add it as a second entry in `.well-known/assetlinks.json`:
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "io.github.leephil1907_lab.twa",
      "sha256_cert_fingerprints": [
        "04:3F:D5:EA:6C:AB:2B:04:01:0E:48:24:04:C8:50:EC:C5:BC:BA:E9:43:CF:93:0A:2A:ED:0E:98:11:50:46:76",
        "<PASTE_GOOGLE_PLAY_APP_SIGNING_SHA256_HERE>"
      ]
    }
  }
]
```
4. Push the update to both the `Reachmarkcalculator` repository and the `leephil1907-lab.github.io` root repository.
