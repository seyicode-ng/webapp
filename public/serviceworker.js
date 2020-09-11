let version = Math.ceil(Math.random()*1000);
const CACHE_NAME = `static-cache-v+${version}`;

const FILES_TO_CACHE = [
    './css/app.css',
    './img/bg.jpg',
    '/script/app.js',
    '/'
  ];

  self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
  
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request)
        .then(caches.open('/offline_index.html'))
    )
  });