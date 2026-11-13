// Made by scripts/pwa.mjs from scripts/sw-template.js: keeps this game playable offline.
// The __NAMES__ are filled in for each game when the site is assembled.
const CACHE = "sandfall-a6c19e1f3f46";
const PREFIX = "sandfall-";
const FILES = ["./","apple-touch-icon.png","assets/index-CKY0dgHs.js","assets/index-vpSt3kDS.css","icon-192.png","icon-512.png","index.html","logo.svg","manifest.webmanifest"];
/** Waiting longer than this for the page online, use the saved one. */
const PAGE_WAIT_MS = 3000;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

// A new deploy's worker drops the old saved copy.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const fresh = req.mode === 'navigate' || /\.(json|webmanifest)$/.test(new URL(req.url).pathname);
  e.respondWith(fresh ? freshFirst(req) : savedFirst(req));
});

/** The page and data: from the network if it answers in time, else the saved copy. */
async function freshFirst(req) {
  const saved = () => caches.match(req, { ignoreSearch: true, ignoreVary: true }).then((r) => r || caches.match('./'));
  try {
    const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(no, PAGE_WAIT_MS))]);
    if (!res.ok) return (await saved()) || res;
    return res;
  } catch {
    return (await saved()) || Response.error();
  }
}

/** Code, art and sounds: the saved copy (answering a part request, which iPhones make for audio). */
async function savedFirst(req) {
  const res = await caches.match(req, { ignoreSearch: true, ignoreVary: true });
  if (!res) return fetch(req);
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!range) return res;
  const body = await res.arrayBuffer();
  const start = range[1] ? Number(range[1]) : 0;
  const end = range[2] ? Math.min(Number(range[2]), body.byteLength - 1) : body.byteLength - 1;
  return new Response(body.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
      'Content-Range': `bytes ${start}-${end}/${body.byteLength}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}
