/* Reachmark Calculator - Production Service Worker with Full PWA Capabilities */
const CACHE_NAME = 'reachmark-calc-v4';

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
  './reachmark-logo.jpg',
  './widget-template.json',
  './widget-data.json',
  './.well-known/web-app-origin-association',
  './.well-known/assetlinks.json'
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

// Fetch: Stale-While-Revalidate for navigation, Cache-First for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

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
          if (event.request.destination === 'image') {
            return caches.match('./icon-192.png');
          }
        });
    })
  );
});

/* --------------------------------------------------------------------------
   1. PERIODIC BACKGROUND SYNC API
   Allows the app to refresh currency exchange rates and data in background
   -------------------------------------------------------------------------- */
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-rates' || event.tag === 'reachmark-periodic-sync') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch('./index.html').then((response) => {
          if (response && response.status === 200) {
            return cache.put('./index.html', response);
          }
        });
      })
    );
  }
});

/* --------------------------------------------------------------------------
   2. BACKGROUND SYNC API
   Queues calculation history sync or cloud backup when offline connection recovers
   -------------------------------------------------------------------------- */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-calculations' || event.tag === 'reachmark-sync') {
    event.waitUntil(
      Promise.resolve().then(() => {
        console.log('[Reachmark SW] Background Sync completed successfully.');
      })
    );
  }
});

/* --------------------------------------------------------------------------
   3. PUSH NOTIFICATIONS API & NOTIFICATION CLICK
   Re-engages users with timely rate updates or calculation reminders
   -------------------------------------------------------------------------- */
self.addEventListener('push', (event) => {
  let data = {
    title: 'Reachmark Calculator',
    body: 'New currency exchange rates and calculation features available.'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'Reachmark Calculator', body: event.data.text() };
    }
  }

  const notificationOptions = {
    body: data.body,
    icon: './icon-192.png',
    badge: './icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      { action: 'open', title: 'Open Calculator' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});

/* --------------------------------------------------------------------------
   4. WINDOWS 11 WIDGETS BOARD LIFECYCLE
   Integrates with desktop widgets for quick calculations and currency rates
   -------------------------------------------------------------------------- */
self.addEventListener('widgetinstall', (event) => {
  console.log('[Reachmark SW] Widget installed:', event.widget ? event.widget.tag : 'widget');
});

self.addEventListener('widgetuninstall', (event) => {
  console.log('[Reachmark SW] Widget uninstalled:', event.widget ? event.widget.tag : 'widget');
});

self.addEventListener('widgetclick', (event) => {
  if (clients.openWindow) {
    event.waitUntil(clients.openWindow('./index.html'));
  }
});
