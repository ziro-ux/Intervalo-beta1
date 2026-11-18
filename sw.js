// Intervalo: cache do app para funcionar offline. Os dados do usuário ficam no localStorage, nunca aqui.
const CACHE = 'intervalo-v19';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Abre sempre do cache (rápido e offline) e atualiza em segundo plano.
    e.respondWith(caches.match('./index.html').then(hit => {
      const net = fetch(req).then(r => { if (r.ok) caches.open(CACHE).then(c => c.put('./index.html', r.clone())); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return r; })));
});
