# Reachmark Android / TWA packaging

This directory contains the Android packaging template for Reachmark.

## Current target

- **PWA:** https://leephil1907-lab.github.io/Reachmarkcalculator/
- **Manifest:** https://leephil1907-lab.github.io/Reachmarkcalculator/manifest.webmanifest
- **Package ID:** `io.github.leephil1907_lab.twa`
- **Android packaging:** Trusted Web Activity (TWA)
- **APK:** generated for direct/device testing
- **AAB:** generated for Google Play submission

## Recommended toolchain

Use **Bubblewrap 1.25.0 or newer**. Bubblewrap 1.25.0 targets Android API 36, which is the current Google Play target requirement for new apps and updates from August 31, 2026.

```bash
npm i -g @bubblewrap/cli@1.25.0
```

## Generate the Android project

From this repository:

```bash
bubblewrap init --manifest https://leephil1907-lab.github.io/Reachmarkcalculator/manifest.webmanifest --directory ./android-build
```

Use the stable package ID:

```
io.github.leephil1907_lab.twa
```

Keep the signing keystore safe. Do **not** commit the keystore, passwords, or generated signing credentials.

Then build:

```bash
cd android-build
bubblewrap build
```

Bubblewrap generates a signed APK for testing and a signed AAB for Play submission. The current CLI documentation identifies `app-release-signed.apk` and `app-release-bundle.aab` as the signed outputs.

## Digital Asset Links

The existing `/.well-known/assetlinks.json` inside this GitHub Pages project is retained as a reference, but Android Digital Asset Links are checked at the **origin root**.

For this project-site URL, the production file needs to be reachable from:

```
https://leephil1907-lab.github.io/.well-known/assetlinks.json
```

not only:

```
https://leephil1907-lab.github.io/Reachmarkcalculator/.well-known/assetlinks.json
```

If you use a custom Reachmark domain later, deploy the file at that domain's root `/.well-known/assetlinks.json`.

After creating the signing key, generate the SHA-256 fingerprint and update the asset links. After Google Play App Signing is enabled, add the **Play App Signing certificate fingerprint** as well.

## PWABuilder

Before packaging, rerun PWABuilder against:

```
https://leephil1907-lab.github.io/Reachmarkcalculator/
```

The manifest has been hardened for packaging:
- stable `id`
- valid `name`, `short_name`, `start_url`, `scope`
- exact 192px and 512px PNG `any` icons
- separate 192px and 512px PNG `maskable` icons
- wide + narrow screenshots
- shortcuts with 96px PNG icons
- file handlers
- share target
- protocol handlers
- launch handler
- categories, language and direction
- cache version bumped after manifest changes

## Release checklist

1. Run the PWABuilder analysis again.
2. Confirm all manifest checks pass.
3. Run `bubblewrap validate --url=https://leephil1907-lab.github.io/Reachmarkcalculator/`.
4. Generate the Android project with Bubblewrap 1.25.0+.
5. Test the signed APK on a real Android device/emulator.
6. Generate the AAB.
7. Upload the AAB to Google Play Console.
8. Copy the **Play App Signing SHA-256** from Play Console.
9. Add it to the production asset links file.
10. Re-test the installed Play version and confirm the browser address bar is absent.

## Important

Do not rotate or replace the signing key after the first public release unless the migration is planned. The package ID and signing identity are part of the Android app's long-term identity.
