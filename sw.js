/* Reachmark Calculator - Production Service Worker */
const CACHE_NAME = 'reachmark-calc-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg',
  './icon-512.png',
  './icon-192.png',
  './icon-144.png',
  './icon-96.png',
  './icon-maskable-512.png',
  './icon-maskable-192.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png',
  './screenshot-desktop.png',
  './screenshot-mobile.png',
  './shortcut-currency.png',
  './shortcut-scientific.png',
  './shortcut-history.png',
  './reachmark-squircle.jpg',
  './reachmark-header.jpg',
  './reachmark-icon.jpg',
  './reachmark-logo.jpg'
];

// Install: precache app shell & critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Reachmark SW] Pre-cache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up older caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first for precached assets, Stale-While-Revalidate for navigation, offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Navigation requests (HTML page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // Asset requests: Cache first, then network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache for next load
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting an image, fallback to icon if available
          if (event.request.destination === 'image') {
            return caches.match('./icon-192.png');
          }
        });
    })
  );
});
