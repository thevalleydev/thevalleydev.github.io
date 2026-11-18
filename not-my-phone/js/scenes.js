// SVG illustrations for photos, wallpapers and the map. Everything is drawn in a
// 300x300 viewBox so thumbnails and full-size views share the same art.
window.FP = window.FP || { cities: {}, cases: {} };

(function (FP) {
  function rng(seed) {
    // mulberry32: deterministic so photos look the same on every render
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Who's in the photos. A case can list its own people (case.cast), each with a role that
  // dresses them: 'rival' in the rival team's colours, 'home' in the home team's (with a hat), or
  // 'neutral'; anything else (hair, skin, glasses...) is drawn as given. Without a list, it's the
  // first case's three.
  function cast(city) {
    const kase = FP.engine && FP.engine.kase;
    if (kase && kase.cast) {
      const out = {};
      Object.entries(kase.cast).forEach(([id, p]) => {
        const dress = p.role === 'rival'
          ? { shirt: city.rival.colors[1], stripe: city.rival.colors[0] }
          : p.role === 'home'
            ? { shirt: city.home.colors[0], stripe: city.home.colors[1], hat: city.home.colors[1] }
            : { shirt: '#8d939b', stripe: null };
        out[id] = { ...dress, ...p };
      });
      return out;
    }
    return {
      dana: { shirt: city.rival.colors[1], stripe: city.rival.colors[0], hair: '#6b3e26', skin: '#f1c7a5', ponytail: true },
      mikey: { shirt: city.home.colors[0], stripe: city.home.colors[1], hair: '#3b2a1a', skin: '#e3b28f', hat: city.home.colors[1], beard: true },
      jen: { shirt: '#8d939b', stripe: null, hair: '#b8432a', skin: '#f6d3b8', glasses: true },
    };
  }

  const TOWEL = '#FFB612';

  /** The framed towel on the bar's wall (or its empty frame), at (180, 34). */
  function relicOnWall(there) {
    return there
      ? `<rect x="180" y="34" width="92" height="64" fill="#2a1a12" stroke="#c9a14a" stroke-width="3"/>${towelShape(190, 44, 72, 44)}`
      : `<rect x="180" y="34" width="92" height="64" fill="#2a1a12" stroke="#c9a14a" stroke-width="3"/>
         <rect x="190" y="44" width="72" height="44" fill="#3d261c" stroke="#7a5a44" stroke-dasharray="4 3"/>
         <circle cx="226" cy="48" r="2.5" fill="#999"/>`;
  }
  let uid = 0;
  const attr = (v) => String(v || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function towelShape(x, y, w, h) {
    return `<g transform="translate(${x},${y})">
      <path d="M0 4 Q ${w / 4} -3 ${w / 2} 4 T ${w} 4 L ${w} ${h} Q ${w * 0.75} ${h - 6} ${w / 2} ${h} T 0 ${h} Z" fill="${TOWEL}"/>
      <path d="M${w * 0.15} ${h * 0.35} q 6 -6 12 0 t 10 2 M${w * 0.5} ${h * 0.3} q 5 6 12 -2 M${w * 0.25} ${h * 0.65} q 8 -5 16 2 t 12 -3" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  function held(item) {
    if (item === 'towel') return towelShape(-52, -78, 104, 34);
    if (item === 'ring') {
      return `<g transform="translate(46,-50)">
        <rect x="-11" y="-4" width="22" height="16" rx="3" fill="#2a1f3d"/>
        <path d="M-11 -4 h22 l-3 -10 h-16 Z" fill="#3a2d55"/>
        <circle cx="0" cy="-4" r="6" fill="none" stroke="#e8c35a" stroke-width="2.4"/>
        <path d="M-3 -12 l3 -4 l3 4 Z" fill="#dff3ff" stroke="#9fd0ff" stroke-width="0.8"/>
      </g>`;
    }
    if (item === 'trophy') {
      return `<g transform="translate(48,-62)">
        <path d="M-14 -16 h28 v6 q0 16 -14 18 q-14 -2 -14 -18 Z" fill="#d4af37"/>
        <rect x="-3" y="8" width="6" height="8" fill="#b8962e"/><rect x="-10" y="15" width="20" height="5" rx="1" fill="#8a6d1f"/>
      </g>`;
    }
    if (item === 'pitcher') {
      return `<g transform="translate(48,-66)">
        <path d="M-14 -18 h28 l-3 36 h-22 Z" fill="#e8a33a" opacity="0.92"/>
        <path d="M-14 -18 h28 l-1 7 h-26 Z" fill="#fff8e7"/>
        <path d="M14 -10 q12 2 10 14 q-2 8 -12 6" stroke="#e0e6ea" stroke-width="3" fill="none"/>
      </g>`;
    }
    return '';
  }

  function person(p, x, y, pose, hold, scale) {
    const s = scale || 1;
    const cheer = pose === 'cheer';
    const arms = cheer
      ? `<path d="M-30 42 L-48 -28" stroke="${p.shirt}" stroke-width="13" stroke-linecap="round"/>
         <path d="M30 42 L48 -28" stroke="${p.shirt}" stroke-width="13" stroke-linecap="round"/>
         <circle cx="-48" cy="-33" r="7" fill="${p.skin}"/><circle cx="48" cy="-33" r="7" fill="${p.skin}"/>`
      : `<path d="M-34 44 L-40 100" stroke="${p.shirt}" stroke-width="13" stroke-linecap="round"/>
         <path d="M34 44 L40 100" stroke="${p.shirt}" stroke-width="13" stroke-linecap="round"/>`;
    const stripe = p.stripe
      ? `<rect x="-38" y="62" width="76" height="9" fill="${p.stripe}"/><rect x="-38" y="76" width="76" height="4" fill="${p.stripe}"/>`
      : `<path d="M-10 28 L0 44 L10 28" stroke="#6f757c" stroke-width="3" fill="none"/>`;
    return `<g transform="translate(${x},${y}) scale(${s})">
      ${arms}
      <path d="M-38 120 L-38 50 C-38 32 -20 24 0 24 C20 24 38 32 38 50 L38 120 Z" fill="${p.shirt}"/>
      ${stripe}
      ${p.ponytail ? `<ellipse cx="23" cy="6" rx="7" ry="15" fill="${p.hair}"/>` : ''}
      <circle cx="0" cy="0" r="22" fill="${p.skin}"/>
      ${p.hat
        ? `<path d="M-24 -4 C-24 -36 24 -36 24 -4 Z" fill="${p.hat}"/><rect x="-25" y="-10" width="50" height="8" rx="3" fill="${p.stripe}"/><circle cx="0" cy="-33" r="6" fill="${p.hat}"/>`
        : `<path d="M-23 -2 C-25 -32 25 -32 23 -2 C14 -15 -14 -15 -23 -2 Z" fill="${p.hair}"/>`}
      ${p.beard ? `<path d="M-19 4 C-17 28 17 28 19 4 C10 13 -10 13 -19 4 Z" fill="${p.hair}"/>` : ''}
      <circle cx="-8" cy="0" r="2.4" fill="#222"/><circle cx="8" cy="0" r="2.4" fill="#222"/>
      ${p.glasses ? `<circle cx="-8" cy="0" r="7" stroke="#222" stroke-width="2" fill="none"/><circle cx="8" cy="0" r="7" stroke="#222" stroke-width="2" fill="none"/><path d="M-1 0 h2" stroke="#222" stroke-width="2"/>` : ''}
      ${cheer
        ? `<ellipse cx="0" cy="11" rx="5" ry="6" fill="#5a1e1e"/>`
        : `<path d="M-6 9 Q0 14 6 9" stroke="#5a1e1e" stroke-width="2" fill="none" stroke-linecap="round"/>`}
      ${hold ? held(hold) : ''}
    </g>`;
  }

  /**
   * The case's dog (case.dog: coat colour and bandana colour), standing at (x, y), `s` times
   * normal size. A scruffy little terrier: ears up, tail up, tongue out.
   */
  function dogShape(x, y, s) {
    const kase = FP.engine && FP.engine.kase;
    const d = (kase && kase.dog) || {};
    const coat = d.coat || '#c8a06a';
    const dark = d.dark || '#8a6a3f';
    const bandana = d.bandana || '#d3bc8d';
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M30 -10 q 18 -14 14 -34" stroke="${coat}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="0" rx="38" ry="22" fill="${coat}"/>
      <path d="M-30 6 v28 M-14 10 v26 M14 10 v26 M30 6 v28" stroke="${coat}" stroke-width="10" stroke-linecap="round"/>
      <path d="M-36 -8 q -6 -10 2 -16 M-22 -18 q -2 -10 6 -12 M20 -20 q 4 -8 10 -6" stroke="${dark}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="-40" cy="-28" r="20" fill="${coat}"/>
      <path d="M-56 -40 l -6 -22 l 16 12 Z M-28 -44 l 2 -22 l 12 18 Z" fill="${dark}"/>
      <ellipse cx="-56" cy="-22" rx="10" ry="8" fill="${coat}"/>
      <circle cx="-64" cy="-24" r="4" fill="#1d1a2a"/>
      <circle cx="-46" cy="-32" r="3" fill="#1d1a2a"/><circle cx="-34" cy="-32" r="3" fill="#1d1a2a"/>
      <circle cx="-45" cy="-33" r="1" fill="#fff"/><circle cx="-33" cy="-33" r="1" fill="#fff"/>
      <path d="M-58 -14 q 4 10 10 0" fill="#e86a7a"/>
      <path d="M-58 -10 l 32 0 l -16 18 Z" fill="${bandana}" stroke="#1d1a2a" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M-42 -6 v6 M-45 -4 h6" stroke="#1d1a2a" stroke-width="1.6" stroke-linecap="round"/>
    </g>`;
  }

  function wrap(inner, alt, defs) {
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${attr(alt)}" preserveAspectRatio="xMidYMid slice">${defs ? `<defs>${defs}</defs>` : ''}${inner}</svg>`;
  }

  function bar(scene, city) {
    const people = cast(city);
    // The treasure on the wall, or gone (scene.relic, or scene.towel in the first case).
    const frame = relicOnWall((scene.relic || scene.towel) === 'wall');
    // The neon sign: the case's (two words), or the first case's.
    const kase = FP.engine && FP.engine.kase;
    const sign = (kase && kase.barSign) || ['TURNPIKE', 'TRIVIA'];
    // A TV on the wall showing the score, if the photo has one; otherwise the window.
    const wall = scene.tv
      ? `<rect x="12" y="44" width="78" height="50" rx="3" fill="#111" stroke="#2a1a12" stroke-width="4"/>
         <rect x="16" y="48" width="70" height="42" fill="#1e3d2a"/>
         <text x="51" y="66" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="11" fill="#fff">${attr(scene.tv[0])}</text>
         <text x="51" y="82" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="11" fill="#ffd27a">${attr(scene.tv[1] || '')}</text>
         <rect x="46" y="94" width="10" height="10" fill="#222"/>`
      : `<rect x="14" y="40" width="72" height="92" fill="#16223f" stroke="#2a1a12" stroke-width="5"/>
      <circle cx="34" cy="98" r="2" fill="#ffd27a"/><circle cx="60" cy="86" r="2" fill="#ffd27a"/><circle cx="72" cy="110" r="2" fill="#9cc3e6"/>`;
    const lights = Array.from({ length: 11 }, (_, i) => {
      const x = 10 + i * 28;
      const y = 14 + Math.sin(i / 1.6) * 5;
      return `<circle cx="${x}" cy="${y}" r="3" fill="#ffd27a"/><circle cx="${x}" cy="${y}" r="8" fill="#ffd27a" opacity="0.18"/>`;
    }).join('');
    const figures = (scene.people || []).map((p) => {
      if (p.who === 'dog') return dogShape(p.x + 30, 222, 0.9);
      if (p.who === 'chair') {
        return `<g transform="translate(${p.x},0)"><rect x="-28" y="172" width="56" height="74" rx="8" fill="#5a3a28" stroke="#2a1a12" stroke-width="3"/><rect x="-20" y="182" width="40" height="8" rx="3" fill="#6d4732"/></g>`;
      }
      return person(people[p.who], p.x, p.pose === 'cheer' ? 160 : 168, p.pose, p.hold);
    }).join('');
    const id = `warm${++uid}`;
    const defs = `<radialGradient id="${id}" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#ffb35c" stop-opacity="0.18"/><stop offset="1" stop-color="#000" stop-opacity="0.35"/></radialGradient>`;
    return wrap(`
      <rect width="300" height="300" fill="#4b2e22"/>
      <rect y="205" width="300" height="95" fill="#3a2219"/>
      <path d="M0 14 Q 75 26 150 14 T 300 14" stroke="#222" stroke-width="1" fill="none"/>${lights}
      ${wall}
      <text x="100" y="48" font-family="Georgia, serif" font-size="11" fill="#ff6fb5" letter-spacing="1">${attr(sign[0])}</text>
      <text x="104" y="62" font-family="Georgia, serif" font-size="11" fill="#ff6fb5" letter-spacing="1">${attr(sign[1])}</text>
      ${frame}
      ${figures}
      <rect y="236" width="300" height="64" fill="#6b4226"/><rect y="236" width="300" height="5" fill="#8a5a36"/>
      <rect x="120" y="246" width="50" height="34" rx="2" fill="#f4f1e8" transform="rotate(-6 145 263)"/>
      <path d="M128 256 h30 M128 263 h24 M128 270 h28" stroke="#888" stroke-width="1.4" transform="rotate(-6 145 263)"/>
      <rect x="40" y="244" width="16" height="26" rx="2" fill="#e8a33a" opacity="0.9"/><rect x="40" y="244" width="16" height="5" fill="#fff8e7"/>
      <rect x="236" y="244" width="16" height="26" rx="2" fill="#e8a33a" opacity="0.9"/><rect x="236" y="244" width="16" height="5" fill="#fff8e7"/>
      <rect width="300" height="300" fill="url(#${id})"/>`, scene.alt, defs);
  }

  function door(scene, city) {
    // Whoever's leaving: someone in the home team's colours, or one of the case's people (scene.who).
    const who = scene.who && cast(city)[scene.who];
    const [dark, gold] = who ? [who.shirt, who.stripe || who.shirt] : city.home.colors;
    const loot = `<path d="M-46 30 q 20 -12 40 0 q 10 20 -6 34 q -22 6 -36 -10 Z" fill="${TOWEL}"/>`;
    const id = ++uid;
    const defs = `<filter id="blur${id}"><feGaussianBlur stdDeviation="7 2"/></filter>
      <radialGradient id="vig${id}" cx="50%" cy="50%" r="70%"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></radialGradient>`;
    return wrap(`
      <g filter="url(#blur${id})" transform="rotate(-14 150 150)">
        <rect x="-40" y="-40" width="380" height="380" fill="#3a2219"/>
        <rect x="90" y="30" width="110" height="260" fill="#24150e"/>
        <rect x="106" y="52" width="78" height="90" fill="#22355c"/>
        <circle cx="150" cy="70" r="16" fill="#ffd27a" opacity="0.6"/>
        <g transform="translate(205,150)">
          <path d="M-36 140 L-30 20 C-28 0 -10 -8 6 -8 C26 -8 40 4 40 24 L44 140 Z" fill="${dark}"/>
          <rect x="-32" y="40" width="74" height="10" fill="${gold}"/>
          <circle cx="4" cy="-28" r="20" fill="#e3b28f"/>
          <path d="M-18 -30 C-18 -58 26 -58 26 -30 Z" fill="${who ? who.hair : gold}"/>
          ${loot}
        </g>
      </g>
      <rect width="300" height="300" fill="url(#vig${id})"/>`, scene.alt, defs);
  }

  function overlook(scene) {
    const r = rng(7);
    const id = `sky${++uid}`;
    const stars = Array.from({ length: 26 }, () => `<circle cx="${r() * 300}" cy="${r() * 90}" r="${r() * 1.2 + 0.3}" fill="#fff" opacity="${0.4 + r() * 0.5}"/>`).join('');
    const towers = Array.from({ length: 16 }, (_, i) => {
      const w = 10 + r() * 14;
      const h = 30 + r() * 80;
      const x = 70 + i * 10 + r() * 6;
      const y = 175 - h;
      let windows = '';
      for (let wy = y + 5; wy < 172; wy += 7) {
        for (let wx = x + 2; wx < x + w - 2; wx += 5) {
          if (r() > 0.55) windows += `<rect x="${wx}" y="${wy}" width="2" height="3" fill="#ffd27a" opacity="${0.5 + r() * 0.5}"/>`;
        }
      }
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#141c33"/>${windows}`;
    }).join('');
    return wrap(`
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1d"/><stop offset="1" stop-color="#22305e"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#${id})"/>${stars}
      <path d="M0 175 L300 175 L300 300 L0 300 Z" fill="#101626"/>
      ${towers}
      <path d="M0 200 Q 90 176 150 182 Q 210 176 300 200 L300 245 Q 150 205 0 245 Z" fill="#1f3a66"/>
      <path d="M150 182 L150 245" stroke="#101626" stroke-width="0"/>
      <path d="M20 214 Q 60 196 100 214" stroke="#f5c518" stroke-width="3" fill="none"/>
      <path d="M200 214 Q 240 196 280 214" stroke="#f5c518" stroke-width="3" fill="none"/>
      <path d="M150 178 q -2 -14 0 -22 q 2 8 0 22" fill="#e8f2ff" opacity="0.85"/>
      <path d="M30 230 h40 M200 236 h50 M110 226 h30" stroke="#ffd27a" stroke-width="1" opacity="0.5"/>
      <rect y="262" width="300" height="38" fill="#05070f"/>
      <path d="M0 262 h300" stroke="#3a3f52" stroke-width="3"/>
      <path d="M10 262 v38 M80 262 v38 M150 262 v38 M220 262 v38 M290 262 v38" stroke="#3a3f52" stroke-width="3"/>`, scene.alt);
  }

  function stadium(scene, city) {
    const r = rng(48);
    const id = `night${++uid}`;
    // The rival fans' end (the first case), or the home crowd (scene.side = 'home'), and their sign.
    const [brown, orange] = scene.side === 'home' ? [city.home.colors[1], city.home.colors[0]] : city.rival.colors;
    const sign = scene.sign ? FP.engine.fill(scene.sign) : city.rival.fanSection || '';
    const crowd = [];
    for (let row = 0; row < 7; row++) {
      for (let i = 0; i < 22; i++) {
        const x = i * 14 + (row % 2) * 7 + r() * 3;
        const y = 120 + row * 16;
        const roll = r();
        const c = roll < 0.45 ? orange : roll < 0.8 ? brown : '#f2efe6';
        crowd.push(`<circle cx="${x}" cy="${y}" r="5" fill="#e6b796"/><rect x="${x - 7}" y="${y + 5}" width="14" height="10" rx="4" fill="${c}"/>`);
      }
    }
    const dana = cast(city)[scene.who || 'dana'];
    return wrap(`
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#26315c"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      <rect x="30" y="20" width="44" height="18" fill="#fffbe6"/><rect x="226" y="20" width="44" height="18" fill="#fffbe6"/>
      <circle cx="52" cy="29" r="40" fill="#fffbe6" opacity="0.12"/><circle cx="248" cy="29" r="40" fill="#fffbe6" opacity="0.12"/>
      <rect x="50" y="38" width="4" height="70" fill="#444"/><rect x="246" y="38" width="4" height="70" fill="#444"/>
      <rect y="108" width="300" height="192" fill="#1c1f2b"/>
      ${crowd.join('')}
      <g transform="rotate(-6 122 103)"><rect x="78" y="88" width="88" height="28" rx="3" fill="#fff"/>
      <text x="122" y="108" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="14" fill="${brown}">${attr(sign.toUpperCase())}</text></g>
      ${person(dana, 170, 190, 'cheer', null, 1.25)}`, scene.alt);
  }

  /** A selfie: the case's people close up (scene.people, as in bar photos), under the stadium lights. */
  function selfie(scene, city) {
    const people = cast(city);
    const r = rng(91);
    const id = `selfie${++uid}`;
    const [a, b] = city.home.colors;
    const crowd = Array.from({ length: 60 }, () => `<circle cx="${r() * 300}" cy="${150 + r() * 70}" r="${4 + r() * 3}" fill="${r() > 0.45 ? a : b}" opacity="0.55"/>`).join('');
    // Someone can be dressed differently in one photo (p.wear), like a borrowed coat. The dog
    // sits in front.
    const figures = (scene.people || []).map((p) => (p.who === 'dog'
      ? dogShape(p.x + 30, 250, 1.05)
      : person({ ...people[p.who], ...(p.wear || {}) }, p.x, p.pose === 'cheer' ? 176 : 184, p.pose, p.hold, 1.15))).join('');
    const backs = {
      // A hotel lobby: warm wallpaper, a front desk with a bell, a potted palm.
      lobby: `<rect width="300" height="300" fill="#7a3b2e"/>
        <path d="M0 0 V140 M30 0 V140 M60 0 V140 M90 0 V140 M120 0 V140 M150 0 V140 M180 0 V140 M210 0 V140 M240 0 V140 M270 0 V140" stroke="#8a4a3a" stroke-width="10"/>
        <rect y="140" width="300" height="160" fill="#4a2a20"/>
        <rect x="170" y="96" width="130" height="70" fill="#c9a14a" stroke="#6b4a1a" stroke-width="3"/>
        <circle cx="236" cy="92" r="7" fill="#e8c35a"/><rect x="226" y="92" width="20" height="4" fill="#b8901a"/>
        <circle cx="30" cy="40" r="22" fill="#ffd27a" opacity="0.35"/><circle cx="30" cy="40" r="8" fill="#ffe9a8"/>
        <path d="M28 160 q -20 -40 -6 -70 M30 160 q 10 -40 30 -60 M32 160 q -30 -20 -40 -44" stroke="#3f8f4a" stroke-width="8" fill="none" stroke-linecap="round"/>`,
      // Eastern Market: red-brick sheds, string lights, a bright Saturday sky.
      market: `<rect width="300" height="300" fill="#9fd0f0"/>
        <rect y="40" width="300" height="110" fill="#b5523a"/>
        ${[20, 90, 160, 230].map((x) => `<path d="M${x} 150 V90 a 25 25 0 0 1 50 0 V150 Z" fill="#3a2a22"/>`).join('')}
        <path d="M0 40 L150 12 L300 40 Z" fill="#7a3828"/>
        ${Array.from({ length: 12 }, (_, i) => `<circle cx="${10 + i * 26}" cy="${56 + Math.sin(i) * 4}" r="3.5" fill="#ffe27a"/>`).join('')}
        <rect y="150" width="300" height="150" fill="#8d8a84"/>
        <rect x="200" y="130" width="90" height="40" fill="#f2e3c6" stroke="#8a5a35" stroke-width="2"/>
        ${[214, 236, 258].map((x) => `<circle cx="${x}" cy="150" r="9" fill="#d98c4a" stroke="#8a5a2a" stroke-width="2"/><circle cx="${x}" cy="150" r="3" fill="#8d8a84"/>`).join('')}`,
    };
    if (backs[scene.bg]) return wrap(`${backs[scene.bg]}${figures}`, scene.alt);
    return wrap(`
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#2b2f55"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      <rect x="20" y="16" width="40" height="14" fill="#fffbe6"/><rect x="240" y="16" width="40" height="14" fill="#fffbe6"/>
      <circle cx="40" cy="23" r="34" fill="#fffbe6" opacity="0.12"/><circle cx="260" cy="23" r="34" fill="#fffbe6" opacity="0.12"/>
      <rect y="140" width="300" height="160" fill="#1c1f2b"/>${crowd}
      ${figures}`, scene.alt);
  }

  /** Detroit's Riverwalk on a sunny afternoon: the Renaissance Center's towers, the river, the railing, the dog. */
  function riverwalk(scene) {
    const tower = (x, w, h) => `<rect x="${x}" y="${150 - h}" width="${w}" height="${h}" rx="${w / 2.4}" fill="#5b6a80"/>
      <rect x="${x + w * 0.2}" y="${150 - h}" width="${w * 0.18}" height="${h}" fill="#7d8ca2"/>`;
    return wrap(`
      <rect width="300" height="300" fill="#a8d8f0"/>
      <circle cx="250" cy="44" r="18" fill="#fff3b0"/>
      ${tower(96, 26, 70)}${tower(176, 26, 70)}${tower(118, 28, 96)}${tower(156, 28, 96)}${tower(132, 36, 130)}
      <rect x="128" y="18" width="44" height="6" rx="3" fill="#5b6a80"/>
      <rect x="20" y="110" width="40" height="40" fill="#8d97a6"/><rect x="236" y="100" width="34" height="50" fill="#8d97a6"/>
      <rect y="150" width="300" height="56" fill="#3f86b5"/>
      <path d="M20 168 h40 M120 180 h50 M210 172 h40" stroke="#bfe3ff" stroke-width="2" opacity="0.7"/>
      <rect y="206" width="300" height="94" fill="#cfc7b8"/>
      <path d="M0 214 H300 M0 232 H300" stroke="#3a3f52" stroke-width="3"/>
      ${Array.from({ length: 11 }, (_, i) => `<path d="M${i * 30} 214 V232" stroke="#3a3f52" stroke-width="3"/>`).join('')}
      ${scene.dog ? dogShape(170, 266, 0.95) : ''}`, scene.alt);
  }

  /** The case's dog close up, for a lock-screen wallpaper, against the visiting team's colours (or case.dog.backdrop). */
  function pet(scene, city) {
    const id = `pet${++uid}`;
    const kase = FP.engine && FP.engine.kase;
    const [light, dark] = (kase && kase.dog && kase.dog.backdrop) || [city.rival.colors[1], city.rival.colors[0]];
    return wrap(`
      <defs><radialGradient id="${id}" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      ${dogShape(238, 232, 2.2)}`, scene.alt); // face near the middle, so a tall lock screen doesn't crop it
  }

  /** Cincinnati at night from the Roebling Bridge: the skyline, the blue suspension bridge, the Ohio. */
  function riverfront(scene) {
    const r = rng(15);
    const id = `river${++uid}`;
    const stars = Array.from({ length: 20 }, () => `<circle cx="${r() * 300}" cy="${r() * 80}" r="${r() * 1.1 + 0.3}" fill="#fff" opacity="${0.35 + r() * 0.5}"/>`).join('');
    const towers = Array.from({ length: 14 }, (_, i) => {
      const w = 12 + r() * 12;
      const h = 30 + r() * 60;
      const x = 20 + i * 19 + r() * 4;
      const y = 168 - h;
      let windows = '';
      for (let wy = y + 5; wy < 165; wy += 7) {
        for (let wx = x + 2; wx < x + w - 2; wx += 5) {
          if (r() > 0.55) windows += `<rect x="${wx}" y="${wy}" width="2" height="3" fill="#ffd27a" opacity="${0.5 + r() * 0.5}"/>`;
        }
      }
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#141c33"/>${windows}`;
    }).join('');
    // The tallest tower wears a tiara.
    const tiara = `<rect x="168" y="42" width="24" height="126" fill="#18223d"/>
      <path d="M164 46 Q 170 22 180 34 Q 190 22 196 46 Z" fill="none" stroke="#bfe3ff" stroke-width="2"/>
      <path d="M168 40 L180 26 L192 40" stroke="#9fd0ff" stroke-width="1.4" fill="none"/>
      ${Array.from({ length: 16 }, (_, k) => `<rect x="${172 + (k % 3) * 6}" y="${56 + Math.floor(k / 3) * 18}" width="3" height="5" fill="#ffd27a" opacity="0.8"/>`).join('')}`;
    // The suspension cables hang between the towers (and out to the edges); thin hangers drop
    // from them to the deck. Each span sags like its curve: 150 at the ends, deepest in the middle.
    const spans = [[-10, 80, 86], [80, 220, 102], [220, 310, 86]];
    const hangers = spans.map(([x0, x1, sag]) => Array.from({ length: 9 }, (_, k) => {
      const t = (k + 1) / 10;
      return `<path d="M${x0 + (x1 - x0) * t} ${150 + 2 * sag * t * (1 - t)} V212"/>`;
    }).join('')).join('');
    return wrap(`
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1d"/><stop offset="1" stop-color="#2a2a5e"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#${id})"/>${stars}
      ${towers}${tiara}
      <rect y="168" width="300" height="132" fill="#0d1a33"/>
      <path d="M20 190 h40 M200 196 h50 M110 186 h30 M60 220 h60 M180 230 h70" stroke="#ffd27a" stroke-width="1" opacity="0.45"/>
      <g stroke="#2f6fd0" stroke-width="2.4" fill="none">
        <path d="M-10 150 Q 40 236 80 150 Q 150 252 220 150 Q 260 236 310 150"/>
      </g>
      <g stroke="#7fb3ff" stroke-width="0.9" opacity="0.8">${hangers}</g>
      <rect x="66" y="132" width="28" height="92" fill="#6b5a4a" stroke="#3a2f26" stroke-width="2"/>
      <rect x="206" y="132" width="28" height="92" fill="#6b5a4a" stroke="#3a2f26" stroke-width="2"/>
      <path d="M70 132 h20 l-4 -12 h-12 Z M210 132 h20 l-4 -12 h-12 Z" fill="#2f6fd0"/>
      <rect x="74" y="160" width="12" height="22" rx="6" fill="#0d1a33"/><rect x="214" y="160" width="12" height="22" rx="6" fill="#0d1a33"/>
      <rect x="-10" y="212" width="320" height="8" fill="#2f6fd0"/>
      <rect y="220" width="300" height="80" fill="#05070f"/>
      <path d="M0 236 h300" stroke="#2a3048" stroke-width="3"/>`, scene.alt);
  }

  function food(scene) {
    if (scene.dish === 'chili') return chili(scene);
    if (scene.dish === 'coney') return coney(scene);
    const dish = scene.dish === 'sandwich'
      ? `<rect x="70" y="150" width="160" height="26" rx="12" fill="#e3b56b"/>
         <rect x="66" y="138" width="168" height="14" rx="6" fill="#d98c8c"/>
         <rect x="72" y="128" width="156" height="12" rx="4" fill="#f6d047"/>
         <path d="M64 120 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 l0 10 h-160 Z" fill="#cfe8b0"/>
         ${Array.from({ length: 9 }, (_, i) => `<rect x="${50 + i * 22}" y="${104 + (i % 3) * 4}" width="8" height="34" rx="2" fill="#f2c14e" transform="rotate(${(i % 2 ? 1 : -1) * 18} ${54 + i * 22} ${120})"/>`).join('')}
         <rect x="70" y="86" width="160" height="30" rx="14" fill="#e3b56b"/>
         <path d="M90 96 q4 -3 8 0 M130 92 q4 -3 8 0 M180 96 q4 -3 8 0" stroke="#c69248" stroke-width="2" fill="none"/>`
      : Array.from({ length: 6 }, (_, i) => {
        const x = 95 + (i % 3) * 55;
        const y = 120 + Math.floor(i / 3) * 52;
        return `<path d="M${x - 24} ${y + 10} A 26 22 0 0 1 ${x + 24} ${y + 10} Z" fill="#f3d9a4" stroke="#e0b874" stroke-width="3" stroke-dasharray="3 3" transform="rotate(${i * 23 - 40} ${x} ${y})"/>`;
      }).join('') + '<path d="M120 150 q10 -8 20 0 t 20 0 M160 175 q 8 -6 16 0" stroke="#8a5a2b" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="200" cy="200" rx="18" ry="11" fill="#fdfbf4"/>';
    return wrap(`
      <rect width="300" height="300" fill="#7a4a2c"/>
      <path d="M0 60 h300 M0 130 h300 M0 200 h300 M0 270 h300" stroke="#6a3e24" stroke-width="3"/>
      <ellipse cx="150" cy="160" rx="130" ry="112" fill="#f7f7f2"/>
      <ellipse cx="150" cy="160" rx="112" ry="96" fill="none" stroke="#e5e5dc" stroke-width="3"/>
      ${dish}`, scene.alt);
  }

  /** Two Detroit coneys: hot dogs in buns under chili, a zigzag of mustard and chopped onions. */
  function coney(scene) {
    const r = rng(77);
    const one = (y) => `<g transform="translate(0,${y})">
      <rect x="62" y="-14" width="176" height="34" rx="16" fill="#e6b36a"/>
      <rect x="56" y="-20" width="188" height="18" rx="9" fill="#c0563a"/>
      <path d="M66 -14 q 20 -14 40 0 t 40 0 t 40 0 t 40 0 l 0 6 h-160 Z" fill="#7a3a1e"/>
      <path d="M70 -16 l 14 8 l 14 -8 l 14 8 l 14 -8 l 14 8 l 14 -8 l 14 8 l 14 -8 l 14 8 l 14 -8 l 14 8" stroke="#ffd23a" stroke-width="4" fill="none" stroke-linejoin="round"/>
      ${Array.from({ length: 22 }, () => `<rect x="${72 + r() * 150}" y="${-22 + r() * 8}" width="4" height="4" fill="#f6f2e4"/>`).join('')}
    </g>`;
    return wrap(`
      <rect width="300" height="300" fill="#2f6f5e"/>
      <path d="M0 60 h300 M0 130 h300 M0 200 h300 M0 270 h300" stroke="#285f50" stroke-width="3"/>
      <ellipse cx="150" cy="160" rx="135" ry="100" fill="#f7f7f2"/>
      <ellipse cx="150" cy="160" rx="118" ry="84" fill="none" stroke="#e5e5dc" stroke-width="3"/>
      ${one(130)}${one(196)}`, scene.alt);
  }

  /** A Cincinnati 3-way: spaghetti, then chili, then a mountain of finely shredded cheddar, with oyster crackers. */
  function chili(scene) {
    const r = rng(33);
    const cheese = Array.from({ length: 140 }, () => {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 58;
      const x = 150 + Math.cos(a) * d * 1.25;
      const y = 150 + Math.sin(a) * d * 0.8;
      return `<path d="M${x} ${y} l${r() * 12 - 6} ${r() * 6 - 3}" stroke="${r() > 0.5 ? '#ffb020' : '#ff9a10'}" stroke-width="2.4" stroke-linecap="round"/>`;
    }).join('');
    const crackers = Array.from({ length: 9 }, (_, i) => `<ellipse cx="${232 + (i % 3) * 14}" cy="${214 + Math.floor(i / 3) * 12}" rx="6" ry="5" fill="#f6e2b0" stroke="#d9b874" stroke-width="1.2"/>`).join('');
    return wrap(`
      <rect width="300" height="300" fill="#3e6fa8"/>
      <path d="M0 60 h300 M0 130 h300 M0 200 h300 M0 270 h300" stroke="#356196" stroke-width="3"/>
      <ellipse cx="150" cy="160" rx="135" ry="95" fill="#f7f7f2"/>
      <ellipse cx="150" cy="160" rx="118" ry="80" fill="none" stroke="#e5e5dc" stroke-width="3"/>
      <ellipse cx="150" cy="158" rx="100" ry="62" fill="#e9c66a"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${70 + i * 14} ${130 + (i % 3) * 6} q 10 20 0 40" stroke="#d9b04e" stroke-width="2" fill="none"/>`).join('')}
      <ellipse cx="150" cy="156" rx="86" ry="52" fill="#8a3a1e"/>
      <ellipse cx="150" cy="152" rx="76" ry="46" fill="#ffb020"/>
      ${cheese}
      <ellipse cx="244" cy="226" rx="30" ry="22" fill="#fff" opacity="0.6"/>${crackers}`, scene.alt);
  }

  function map(city, highlight) {
    const m = city.map;
    const water = m.water.map((d) => `<path d="${d}" stroke="#9cc3e6" stroke-width="16" fill="none" stroke-linecap="round"/>`).join('');
    const streets = 'M0 40 L300 120 M0 180 L300 210 M60 0 L120 300 M200 0 L250 300 M0 250 L300 270';
    const pins = Object.entries(m.pins).map(([key, p]) => {
      const on = highlight && highlight.includes(key);
      return `<g transform="translate(${p.x},${p.y})" opacity="${on || !highlight ? 1 : 0.45}">
        <circle r="${on ? 9 : 6}" fill="${on ? '#e8453c' : '#5b6670'}" stroke="#fff" stroke-width="2.5"/>
        <text y="-13" text-anchor="middle" font-size="10" font-family="system-ui, sans-serif" font-weight="600" fill="#2b3036" stroke="#eef0e6" stroke-width="3" paint-order="stroke">${p.label}</text>
      </g>`;
    }).join('');
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of ${city.name}">
      <rect width="300" height="300" fill="#eef0e6"/>
      <path d="${streets}" stroke="#fff" stroke-width="5" fill="none"/>
      <path d="M190 150 q30 -10 50 -40 M120 210 q30 10 70 0" stroke="#fff" stroke-width="3" fill="none"/>
      ${water}${pins}
    </svg>`;
  }

  const kinds = { bar, door, overlook, stadium, food, riverfront, selfie, riverwalk, pet };

  FP.scenes = {
    render(scene, city, alt) {
      const fn = kinds[scene.type];
      return fn ? fn({ ...scene, alt }, city) : wrap('<rect width="300" height="300" fill="#ccc"/>', alt);
    },
    map,
  };
})(window.FP);
