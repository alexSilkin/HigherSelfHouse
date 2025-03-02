// Install event - cache important files
self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/assets/logo.png',  // Add your image assets here
      ]);
    })
  );
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
