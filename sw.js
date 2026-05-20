const CACHE_NAME = "spinning-usm-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Nunito:wght@400;600;700&display=swap"
];

// Install Service Worker and cache all assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching files...");
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[Service Worker] Clearing old cache:", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Network First, falling back to Cache
self.addEventListener("fetch", (e) => {
  // Only handle http/https requests (avoid chrome-extension issues etc.)
  if (!e.request.url.startsWith("http")) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Cache the latest successful response
        if (response.status === 200 && e.request.method === "GET") {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If completely offline and request is not in cache, return an offline indicator or error
          return new Response("Sin conexión a internet y recurso no guardado en caché.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({ "Content-Type": "text/html; charset=utf-8" })
          });
        });
      })
  );
});
