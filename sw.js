const CACHE = "zummchat-v31";
const ASSETS = ["./", "./index.html", "./style.css", "./app3.js", "./matrix.js",
                "./manifest.json", "./logo.png", "./icon.png", "./icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(request)
      .then(res => {
        if (res && res.ok && (url.protocol === "http:" || url.protocol === "https:")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match("./index.html")))
  );
});
