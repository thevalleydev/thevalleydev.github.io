// Made by scripts/pwa.mjs from scripts/sw-template.js: keeps this game playable offline.
// The __NAMES__ are filled in for each game when the site is assembled.
const CACHE = "pouncers-f44784920418";
const PREFIX = "pouncers-";
const FILES = ["./","apple-touch-icon.png","assets/index-BBWQAxRG.css","assets/index-CH2DZHWc.js","icon-192.png","icon-512.png","index.html","logo.svg","manifest.webmanifest","voice/10exsk4.mp3","voice/13iieg2.mp3","voice/14s0ytt.mp3","voice/150t4n1.mp3","voice/16sjww3.mp3","voice/170009x.mp3","voice/1coyt9n.mp3","voice/1d6js4c.mp3","voice/1efwljp.mp3","voice/1emxivx.mp3","voice/1eoysup.mp3","voice/1ey1xk8.mp3","voice/1h4bi1d.mp3","voice/1hzvq3x.mp3","voice/1jq27b1.mp3","voice/1nrh2bu.mp3","voice/1nwnmpr.mp3","voice/1s8d6hi.mp3","voice/1t1w5cy.mp3","voice/1tfe7vd.mp3","voice/1u7uc4e.mp3","voice/1ubza2g.mp3","voice/1vzw3jk.mp3","voice/1wcfgz5.mp3","voice/1wn4d1k.mp3","voice/1ympgwm.mp3","voice/4v7f3a.mp3","voice/6mtsaq.mp3","voice/6oef7z.mp3","voice/iasv8v.mp3","voice/ii2wl7.mp3","voice/ipfvmb.mp3","voice/iz71nc.mp3","voice/jbp9vp.mp3","voice/jff1oi.mp3","voice/k1go6z.mp3","voice/leeltp.mp3","voice/manifest.json","voice/md6f8m.mp3","voice/mqd4lv.mp3","voice/qkags4.mp3","voice/qwg2j9.mp3","voice/rfwzeb.mp3","voice/rjoazi.mp3","voice/tqllpj.mp3","voice/ua3chs.mp3","voice/v7uwoy.mp3","voice/vvze46.mp3","voice/wsacl9.mp3","voice/wza5df.mp3","voice/y1y53y.mp3","voice/ygsa8k.mp3"];
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
