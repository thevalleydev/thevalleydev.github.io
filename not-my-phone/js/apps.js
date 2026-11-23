// UI: renders the phone (lock screen, home screen, apps), the intro/ending cards
// and the hint panel. All clicks go through data-action attributes.
window.FP = window.FP || { cities: {}, cases: {} };

(function (FP) {
  const E = () => FP.engine;
  const C = () => FP.engine.city;
  const K = () => FP.engine.kase;
  const S = () => FP.engine.state;

  const ui = { screen: 'lock', param: null, keypad: false, code: '', shake: false, info: false, mapTab: 'people', sheet: null, pick: {}, hint: null, endingOpen: false };
  FP.ui = ui;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const t = (s) => esc(E().fill(s));

  const parents = { thread: 'messages', photo: 'photos', note: 'notes', person: 'maps', item: 'findmy' };
  // The phone's owner: her id in the case's messages (ownerId, or 'dana' in the first case) and avatar.
  const ownerId = () => K().ownerId || 'dana';
  const owner = () => ({ name: K().owner, avatar: K().ownerAvatar || '🧡' });
  const contact = (id) => (id === ownerId() || id === 'me' ? owner() : K().contacts[id] || { name: id, avatar: '💬' });
  const threads = () => K().threads;
  const thread = (id) => threads().find((th) => th.id === id);
  const photoById = (id) => K().photos.find((p) => p.id === id);
  const scene = (p) => FP.scenes.render(p.scene, C(), E().fill(p.alt));
  const listing = () => (FP.season ? FP.season.cases.find((c) => c.kase === K().id) : null);
  const weekLabel = () => (listing() ? `Week ${listing().week} · ` : '');
  const avatar = (c, cls) => `<span class="avatar ${cls || ''}" style="background:${c.color || '#e5e5ea'}">${c.avatar || '💬'}</span>`;

  // --- shared chrome ------------------------------------------------------------

  function statusBar(dark) {
    const b = E().battery();
    return `<div class="status ${dark ? 'dark' : ''}">
      <span class="sb-time">${E().clock()}</span>
      <span class="sb-right"><span class="signal" aria-hidden="true">▂▄▆</span><span class="sb-batt">${b}%</span><span class="batt ${b <= 10 ? 'low' : ''}"><span style="width:${b}%"></span></span></span>
    </div>`;
  }

  function appShell(title, back, body, opts) {
    const o = opts || {};
    return `<div class="app-screen ${o.cls || ''}">
      ${statusBar(o.darkStatus)}
      <header class="nav">
        <button class="back" data-action="${back ? 'back' : 'home'}">‹ ${esc(back || 'Home')}</button>
        <h1>${title}</h1><span></span>
      </header>
      <div class="content">${body}</div>
      ${o.footer || ''}
    </div>`;
  }

  // --- lock screen --------------------------------------------------------------

  function notif(m) {
    const c = contact(m.from);
    const th = thread(m.thread);
    const title = th.members ? `${c.name} · ${E().fill(th.title)}` : c.name;
    return `<div class="notif"><span class="n-icon">💬</span><span class="n-body">
      <span class="n-head"><b>${esc(title)}</b><span>${E().timeLabel(m.at)}</span></span>
      <span class="n-text">${esc(m.text)}</span></span></div>`;
  }

  function lock() {
    const wp = photoById(K().lock.wallpaper);
    if (ui.keypad) {
      const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((d) => {
        if (!d) return '<span></span>';
        if (d === 'del') return '<button class="key fn" data-action="del" aria-label="Delete">⌫</button>';
        return `<button class="key" data-action="digit" data-v="${d}">${d}</button>`;
      }).join('');
      return `<div class="lock">
        <div class="wallpaper blurred">${scene(wp)}</div>
        ${statusBar(true)}
        <div class="kp-title">Enter Passcode</div>
        <div class="dots ${ui.shake ? 'shake' : ''}">${[0, 1, 2, 3].map((i) => `<span class="${i < ui.code.length ? 'on' : ''}"></span>`).join('')}</div>
        <div class="kp-hint">${t(K().lock.hint)}</div>
        <div class="keys">${keys}</div>
        <button class="kp-cancel" data-action="keypad-cancel">Cancel</button>
      </div>`;
    }
    const recent = E().visible().filter((m) => m.from !== 'me').reverse().slice(0, 4);
    return `<div class="lock">
      <div class="wallpaper">${scene(wp)}</div>
      ${statusBar(true)}
      <div class="clock-big">${E().clock()}</div>
      <div class="lock-date">${esc(E().dateLabel())}</div>
      <div class="notifs">${recent.map(notif).join('')}</div>
      <button class="unlock-btn" data-action="keypad">Tap to unlock</button>
    </div>`;
  }

  // --- home screen --------------------------------------------------------------

  // Every app the phone can have. A case picks its own home screen (case.apps, in order);
  // without one it gets the first five.
  const APPS = {
    messages: { name: 'Messages', icon: '💬', bg: '#34c759' },
    photos: { name: 'Photos', icon: '🌼', bg: '#ffffff' },
    notes: { name: 'Notes', icon: '📝', bg: '#ffd60a' },
    maps: { name: 'Maps', icon: '🗺️', bg: '#dff0d8' },
    weather: { name: 'Weather', icon: '⛅', bg: '#4a90e2' },
    findmy: { name: 'Find My', icon: '📍', bg: '#e9f8e6' },
  };
  const homeApps = () => (K().apps || ['messages', 'photos', 'notes', 'maps', 'weather']).map((id) => ({ id, ...APPS[id] }));

  function home() {
    const unread = threads().reduce((n, th) => n + E().unread(th.id), 0);
    const w = E().weather;
    return `<div class="home">
      <div class="wallpaper dim">${scene(photoById(K().lock.wallpaper))}</div>
      ${statusBar(true)}
      <button class="widget" data-action="go" data-screen="weather">
        <span class="w-city">${esc(C().name)}</span>
        <span class="w-temp">${w ? `${w.temp}°` : '--'}</span>
        <span class="w-desc">${w ? `${w.icon} ${esc(w.text)}` : 'Weather unavailable'}</span>
      </button>
      <div class="grid">${homeApps().map((a) => `<button class="app" data-action="go" data-screen="${a.id}">
        <span class="icon" style="background:${a.bg}">${a.icon}${a.id === 'messages' && unread ? `<i class="badge">${unread}</i>` : ''}</span>
        <span class="label">${a.name}</span></button>`).join('')}</div>
    </div>`;
  }

  // --- messages -----------------------------------------------------------------

  function lastOf(th) {
    const live = E().visible(th.id);
    if (live.length) {
      const m = live[live.length - 1];
      return { text: (m.from === 'me' ? 'You: ' : '') + m.text, when: E().timeLabel(m.at), at: m.at };
    }
    const h = th.history[th.history.length - 1];
    if (!h) return { text: '', when: '', at: 0 };
    return { text: E().fill(h.text), when: h.day === 'Today' ? h.time : E().fill(h.day), at: 0 };
  }

  function messages() {
    const rows = threads()
      .filter((th) => th.history.length || E().visible(th.id).length)
      .map((th, i) => ({ th, i, last: lastOf(th) }))
      .sort((a, b) => b.last.at - a.last.at || a.i - b.i)
      .map(({ th, last }) => {
        const pic = th.contact
          ? avatar(contact(th.contact))
          : `<span class="avatar group">${th.members.map((id) => contact(id).avatar).join('')}</span>`;
        return `<li><button class="thread-row" data-action="go" data-screen="thread" data-param="${th.id}">
          <i class="dot ${E().unread(th.id) ? '' : 'off'}"></i>${pic}
          <span class="tr-main"><span class="tr-top"><b>${t(th.title)}</b><span class="tr-when">${esc(last.when)}</span></span>
          <span class="tr-text">${esc(last.text)}</span></span></button></li>`;
      });
    return appShell('Messages', null, `<ul class="threads">${rows.join('')}</ul>`);
  }

  function threadView() {
    const th = thread(ui.param);
    E().markSeen(th.id);
    const hist = th.history.map((h) => ({ sep: E().fill(h.day), time: h.time, from: h.from, text: E().fill(h.text) }));
    const live = E().visible(th.id).map((m) => ({ sep: 'live', time: E().timeLabel(m.at), from: m.from, text: m.text }));
    let lastSep = null;
    let lastFrom = null;
    const items = [];
    hist.concat(live).forEach((m) => {
      if (m.sep !== lastSep) {
        items.push(`<div class="day-sep">${esc(m.sep === 'live' ? 'Today' : m.sep)} ${esc(m.time)}</div>`);
        lastSep = m.sep;
        lastFrom = null;
      }
      const mine = m.from === ownerId() || m.from === 'me';
      const name = th.members && !mine && m.from !== lastFrom ? `<span class="sender">${esc(contact(m.from).name)}</span>` : '';
      items.push(`<div class="msg ${mine ? 'mine' : 'theirs'} ${m.from === 'me' ? 'player' : ''}">${name}<span class="bubble">${esc(m.text)}</span></div>`);
      lastFrom = m.from;
    });
    if (E().typing(th.id)) items.push('<div class="msg theirs"><span class="bubble typing" aria-label="typing"><i></i><i></i><i></i></span></div>');

    const a = K().accusation;
    const canAccuse = a.thread === th.id && E().canAccuse();
    const ask = E().prompt(th.id);
    const chips = ask
      ? `<div class="replies">${ask.options.map((o) => `<button class="reply" data-action="reply" data-prompt="${ask.id}" data-id="${o.id}">${t(o.text)}</button>`).join('')}</div>`
      : '';
    const footer = `<div class="composer">${chips}${canAccuse
      ? `<button class="accuse-btn" data-action="accuse-open">${t(a.prompt)}</button>`
      : chips ? '' : '<span class="fake-input">Message</span>'}</div>`;
    const c = th.contact ? contact(th.contact) : null;
    const title = `<span class="th-title">${c ? avatar(c, 'sm') : ''}${t(th.title)}</span>`;
    return appShell(title, 'Messages', `<div class="chat">${items.join('')}</div>`, { cls: 'thread', footer });
  }

  function sheet() {
    if (!ui.sheet) return '';
    const a = K().accusation;
    const ask = a.questions || {};
    const step = ui.sheet === 'suspect'
      ? { title: ask.suspect || 'Who took it?', opts: a.suspects, action: 'accuse-suspect' }
      : { title: ask.place || 'Where is it now?', opts: a.places, action: 'accuse-place' };
    return `<div class="sheet-backdrop" data-action="accuse-cancel"></div>
      <div class="sheet" role="dialog" aria-label="${esc(step.title)}">
        <h3>${esc(step.title)}</h3>
        <div class="opts">${step.opts.map((o) => `<button class="opt" data-action="${step.action}" data-id="${o.id}">${t(o.label)}</button>`).join('')}</div>
        <button class="cancel" data-action="${ui.sheet === 'place' ? 'accuse-back' : 'accuse-cancel'}">${ui.sheet === 'place' ? 'Back' : 'Cancel'}</button>
      </div>`;
  }

  // --- photos -------------------------------------------------------------------

  function photos() {
    const ps = K().photos;
    return appShell('Photos', null, `<div class="photo-grid">${ps.map((p) => `<button class="thumb" data-action="go" data-screen="photo" data-param="${p.id}">${scene(p)}</button>`).join('')}</div>
      <p class="grid-foot">${ps.length} Photos</p>`);
  }

  function photo() {
    const ps = K().photos;
    const i = ps.findIndex((p) => p.id === ui.param);
    const p = ps[i];
    const info = ui.info
      ? `<div class="photo-info"><div>📍 ${t(p.place)}</div><div>👤 ${p.people.length ? esc(p.people.join(', ')) : 'No people'}</div></div>`
      : '';
    const footer = `<div class="photo-bar">
      <button data-action="photo-nav" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Newer photo">‹</button>
      <button data-action="photo-info" class="info-btn ${ui.info ? 'on' : ''}" aria-label="Photo info">ⓘ</button>
      <button data-action="photo-nav" data-dir="1" ${i === ps.length - 1 ? 'disabled' : ''} aria-label="Older photo">›</button>
    </div>`;
    const title = `<span class="ph-title">${t(p.day)}<small>${esc(p.time)}</small></span>`;
    return appShell(title, 'Photos', `<div class="photo-full">${scene(p)}</div>${info}`, { cls: 'photo-view', footer });
  }

  // --- notes --------------------------------------------------------------------

  function notes() {
    return appShell('Notes', null, `<ul class="notes">${K().notes.map((n) => `<li><button class="note-row" data-action="go" data-screen="note" data-param="${n.id}">
      <b>${t(n.title)}</b><span><em>${esc(n.date)}</em>${t(n.body.split('\n')[0])}</span></button></li>`).join('')}</ul>`, { cls: 'notes-app' });
  }

  function note() {
    const n = K().notes.find((x) => x.id === ui.param);
    const body = t(n.body).split('\n').map((line) => (line ? `<p>${line}</p>` : '<p class="gap"></p>')).join('');
    return appShell('', 'Notes', `<article class="note"><h2>${t(n.title)}</h2><p class="note-date">${esc(n.date)}</p>${body}</article>`, { cls: 'notes-app' });
  }

  // --- maps ---------------------------------------------------------------------

  function timeline(items) {
    return `<ol class="timeline">${items.map((x) => `<li><span class="tl-when">${t(x.day)} · ${esc(x.time)}</span><b>${t(x.place)}</b><span class="tl-hood">${t(x.hood)}</span></li>`).join('')}</ol>`;
  }

  // Find My items (a dog's collar tag): where they've been seen, from the case's history and
  // the live pings so far, oldest first.
  function sightings(item) {
    const live = E().pings(item.id).map((p) => ({ day: 'Today', time: E().timeLabel(p.at), place: p.place, hood: p.hood, pin: p.pin }));
    return item.history.concat(live);
  }

  function maps() {
    const m = K().maps;
    // Only the tabs this case has something for; no switcher if there's just one.
    const tabs = [...(m.people.length ? [['people', 'People']] : []), ['mine', 'My Places']];
    const tab = tabs.some(([id]) => id === ui.mapTab) ? ui.mapTab : tabs[0][0];
    const pins = tab === 'people' ? m.people.map((p) => p.now.pin) : m.mine.map((x) => x.pin);
    const list = tab === 'people'
      ? `<ul class="list">${m.people.map((p) => `<li><button class="row" data-action="go" data-screen="person" data-param="${p.id}">
          <span class="avatar">${p.avatar}</span><span class="row-main"><b>${esc(p.name)}</b><span>${t(p.now.place)} · ${t(p.now.hood)}</span></span><span class="chev">›</span></button></li>`).join('')}</ul>
         <p class="map-foot">Sharing location with you</p>`
      : timeline(m.mine);
    const seg = tabs.length > 1
      ? `<div class="seg">${tabs.map(([id, label]) => `<button data-action="map-tab" data-tab="${id}" class="${tab === id ? 'on' : ''}">${label}</button>`).join('')}</div>`
      : '<h3 class="sub">My Places</h3>';
    return appShell('Maps', null, `<div class="map">${FP.scenes.map(C(), pins)}</div>
      ${seg}
      ${list}`, { cls: 'maps' });
  }

  // Find My: the case's tracked items (maps.items), each with its last sighting.
  function findmy() {
    const items = K().maps.items || [];
    const pins = items.map((x) => sightings(x).slice(-1)[0].pin);
    const list = `<ul class="list">${items.map((x) => {
      const last = sightings(x).slice(-1)[0];
      return `<li><button class="row" data-action="go" data-screen="item" data-param="${x.id}">
        <span class="avatar">${x.avatar}</span><span class="row-main"><b>${esc(x.name)}</b><span>Seen near ${t(last.place)} · ${esc(last.time)}</span></span><span class="chev">›</span></button></li>`;
    }).join('')}</ul>
      <p class="map-foot">Updates when a nearby phone passes it</p>`;
    return appShell('Find My', null, `<div class="map">${FP.scenes.map(C(), pins)}</div>
      <h3 class="sub">Items</h3>${list}`, { cls: 'maps' });
  }

  function item() {
    const x = (K().maps.items || []).find((i) => i.id === ui.param);
    const seen = sightings(x);
    const last = seen[seen.length - 1];
    return appShell(esc(x.name), 'Find My', `<div class="map">${FP.scenes.map(C(), seen.map((s) => s.pin))}</div>
      <div class="now"><span class="pulse"></span>Last seen: <b>${t(last.place)}</b>, ${t(last.hood)} · ${esc(last.time)}</div>
      ${x.note ? `<p class="item-note">${t(x.note)}</p>` : ''}
      <h3 class="sub">Seen near</h3>${timeline(seen.slice().reverse())}`, { cls: 'maps' });
  }

  function person() {
    const p = K().maps.people.find((x) => x.id === ui.param);
    return appShell(esc(p.name), 'Maps', `<div class="map">${FP.scenes.map(C(), p.timeline.map((x) => x.pin))}</div>
      <div class="now"><span class="pulse"></span>Now: <b>${t(p.now.place)}</b>, ${t(p.now.hood)}</div>
      <h3 class="sub">Location history</h3>${timeline(p.timeline)}`, { cls: 'maps' });
  }

  // --- weather ------------------------------------------------------------------

  function weather() {
    const w = E().weather;
    const rw = E().rivalWeather;
    const big = w
      ? `<div class="wx-big"><div class="wx-city">${esc(C().name)}</div><div class="wx-temp">${w.temp}°</div><div class="wx-desc">${w.icon} ${esc(w.text)}</div></div>`
      : `<div class="wx-big"><div class="wx-city">${esc(C().name)}</div><div class="wx-desc">Couldn't load the weather.</div></div>`;
    const row = rw
      ? `<div class="wx-row"><span><b>${esc(C().rival.hometown)}</b><small>Home ${C().rival.hearts || '🧡🤎'}</small></span><span>${rw.icon} ${rw.temp}°</span></div>`
      : '';
    return appShell('', null, `${big}${row}<p class="wx-foot">Live weather from Open-Meteo</p>`, { cls: 'weather', darkStatus: true });
  }

  // --- overlays and side panel -------------------------------------------------------

  function intro() {
    const k = K();
    return `<div class="card">
      <p class="kicker">Not My Phone · ${weekLabel()}${esc(C().name)}</p>
      <h2>${esc(k.title)}</h2>
      ${listing() ? `<p class="game-line">🏈 ${esc(listing().game)} · ${esc(listing().when)}</p>` : ''}
      ${k.intro.lines.map((l) => `<p>${t(l)}</p>`).join('')}
      <button class="primary" data-action="start">Pick it up</button>
      <p class="fine">${t(k.intro.disclaimer)}</p>
    </div>`;
  }

  function shareText() {
    const s = S();
    const mins = Math.max(1, Math.round((s.solvedAt - s.startedAt) / 60000));
    return `📱 Not My Phone: ${C().name}\n${weekLabel()}"${K().title}" ✅\n⏱️ ${mins} min · 💡 ${s.hintsUsed} hints · ❌ ${s.wrongGuesses} wrong`;
  }

  function ending() {
    const s = S();
    // A case with several solves can end differently: the first variant whose `when` has fired.
    const e = { ...K().ending, ...((K().ending.variants || []).find((v) => s.fired[v.when]) || {}) };
    const mins = Math.max(1, Math.round((s.solvedAt - s.startedAt) / 60000));
    return `<div class="card">
      <p class="kicker">Not My Phone · ${weekLabel()}${esc(C().name)}</p>
      <h2>${esc(e.title)} ✅</h2>
      <p>${t(e.body)}</p>
      <div class="stats"><div><b>${mins}</b>min</div><div><b>${s.hintsUsed}</b>hints</div><div><b>${s.wrongGuesses}</b>wrong</div></div>
      <button class="primary" data-action="share">Copy my result</button>
      <button class="secondary" data-action="close-ending">Keep reading the phone</button>
      <p class="fine">${t(e.next)} (Newsletter signup goes here.)</p>
    </div>`;
  }

  function meta() {
    const s = S();
    const hint = ui.hint
      ? `<div class="hint-box" role="status"><small>Hint ${ui.hint.n} of ${ui.hint.of}</small>${esc(ui.hint.text)}</div>`
      : '';
    return `<div class="brand">Not My Phone<span>${weekLabel()}${esc(C().name)}</span></div>
      <a class="meta-btn" href="./">📅<span class="lbl"> The season</span></a>
      ${s.started && !s.solved ? '<button class="meta-btn" data-action="hint">💡<span class="lbl"> Need a hint?</span></button>' : ''}
      ${s.ended ? '<button class="meta-btn" data-action="open-ending">✅<span class="lbl"> Case closed</span></button>' : ''}
      ${s.started ? '<button class="meta-btn" data-action="reset">↺<span class="lbl"> Start over</span></button>' : ''}
      ${hint}`;
  }

  // --- render -------------------------------------------------------------------------

  const screens = { lock, home, messages, thread: threadView, photos, photo, notes, note, maps, findmy, person, item, weather };

  function render() {
    if (!S().unlocked) ui.screen = 'lock';
    const screenEl = document.getElementById('screen');
    const key = `${ui.screen}:${ui.param || ''}`;
    const old = screenEl.querySelector('.content');
    const sameScreen = screenEl.dataset.key === key;
    const prevScroll = old && sameScreen ? old.scrollTop : null;
    const atBottom = old ? old.scrollHeight - old.scrollTop - old.clientHeight < 60 : true;

    screenEl.innerHTML = `${screens[ui.screen]()}<button class="home-bar" data-action="home" aria-label="Home"></button>`;
    screenEl.dataset.key = key;
    screenEl.dataset.dark = ui.screen === 'lock' || ui.screen === 'home' ? '1' : '';

    const content = screenEl.querySelector('.content');
    if (content) {
      if (ui.screen === 'thread' && (!sameScreen || atBottom)) content.scrollTop = content.scrollHeight;
      else if (prevScroll !== null) content.scrollTop = prevScroll;
    }

    document.getElementById('sheet').innerHTML = sheet();
    const overlay = document.getElementById('overlay');
    const card = !S().started ? intro() : ui.endingOpen ? ending() : '';
    overlay.innerHTML = card;
    overlay.classList.toggle('show', !!card);
    document.getElementById('meta').innerHTML = meta();
  }

  function go(screen, param) {
    ui.screen = screen;
    ui.param = param || null;
    ui.info = false;
    E().trigger(screen === 'photo' ? `view:${param}` : screen === 'thread' ? ['open:thread', `read:${param}`] : `open:${screen}`);
  }

  // --- banner notifications ------------------------------------------------------------

  let bannerTimer = null;
  function hideBanner() { document.getElementById('banner').classList.remove('show'); }
  function showPingBanner(p) {
    const x = (K().maps.items || []).find((i) => i.id === p.item);
    const el = document.getElementById('banner');
    el.innerHTML = `<button data-action="go" data-screen="item" data-param="${p.item}"><span class="avatar sm" style="background:#dff0d8">📍</span>
      <span><b>${esc(x ? x.name : 'Find My')}</b><span>Seen near ${esc(p.place)}, ${esc(p.hood)}</span></span></button>`;
    el.classList.add('show');
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(hideBanner, 4200);
  }

  function showBanner(m) {
    const c = contact(m.from);
    const th = thread(m.thread);
    const el = document.getElementById('banner');
    el.innerHTML = `<button data-action="banner" data-param="${m.thread}">${avatar(c, 'sm')}
      <span><b>${esc(th.members ? `${c.name} · ${E().fill(th.title)}` : c.name)}</b><span>${esc(m.text)}</span></span></button>`;
    el.classList.add('show');
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(hideBanner, 4200);
  }

  // --- actions ---------------------------------------------------------------------------

  function enterDigit(d) {
    if (ui.shake || ui.code.length >= 4) return;
    ui.code += d;
    if (ui.code.length < 4) return;
    if (E().tryCode(ui.code)) {
      ui.keypad = false;
      ui.code = '';
      ui.hint = null;
      go('home');
      return;
    }
    ui.shake = true;
    setTimeout(() => { ui.shake = false; ui.code = ''; render(); }, 450);
  }

  const actions = {
    start() { E().start(); },
    keypad() { ui.keypad = true; },
    'keypad-cancel'() { ui.keypad = false; ui.code = ''; },
    digit(el) { enterDigit(el.dataset.v); },
    del() { ui.code = ui.code.slice(0, -1); },
    go(el) { go(el.dataset.screen, el.dataset.param); },
    back() { go(parents[ui.screen] || 'home'); },
    home() {
      if (!S().unlocked) { ui.keypad = true; return; }
      ui.sheet = null;
      go('home');
    },
    'photo-info'() { ui.info = !ui.info; },
    'photo-nav'(el) {
      const ps = K().photos;
      const next = ps[ps.findIndex((p) => p.id === ui.param) + Number(el.dataset.dir)];
      if (next) { const info = ui.info; go('photo', next.id); ui.info = info; }
    },
    'map-tab'(el) { ui.mapTab = el.dataset.tab; },
    reply(el) { E().reply(el.dataset.prompt, el.dataset.id); },
    'accuse-open'() { ui.sheet = 'suspect'; ui.pick = {}; },
    'accuse-suspect'(el) { ui.pick.suspect = el.dataset.id; ui.sheet = 'place'; },
    'accuse-place'(el) { ui.sheet = null; E().accuse(ui.pick.suspect, el.dataset.id); },
    'accuse-back'() { ui.sheet = 'suspect'; },
    'accuse-cancel'() { ui.sheet = null; },
    banner(el) { hideBanner(); go('thread', el.dataset.param); },
    hint() { ui.hint = E().nextHint(); },
    reset() {
      if (!window.confirm('Start this case over? Your progress will be cleared.')) return false;
      E().reset();
      window.location.reload();
      return false;
    },
    share(el) {
      const text = shareText();
      const done = () => { el.textContent = 'Copied!'; };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => window.prompt('Copy your result:', text));
      else window.prompt('Copy your result:', text);
      return false;
    },
    'close-ending'() { ui.endingOpen = false; },
    'open-ending'() { ui.endingOpen = true; },
  };

  // --- ticker: clock, battery and message delivery ------------------------------------------

  const shown = new Set();
  const shownPings = new Set();
  let lastTyping = false;

  function tick() {
    document.querySelectorAll('.sb-time, .clock-big').forEach((el) => { el.textContent = E().clock(); });
    const b = E().battery();
    document.querySelectorAll('.sb-batt').forEach((el) => { el.textContent = `${b}%`; });
    document.querySelectorAll('.batt span').forEach((el) => { el.style.width = `${b}%`; });

    if (!S().started) return;
    const fresh = E().visible().filter((m) => !shown.has(m.id));
    const freshPings = E().pings().filter((p) => !shownPings.has(p.id));
    const typing = ui.screen === 'thread' && E().typing(ui.param);
    if (!fresh.length && !freshPings.length && typing === lastTyping) return;
    lastTyping = typing;
    freshPings.forEach((p) => {
      shownPings.add(p.id);
      if (S().unlocked && !(ui.screen === 'item' && ui.param === p.item)) showPingBanner(p);
    });

    fresh.forEach((m) => {
      shown.add(m.id);
      if (m.from === 'me') return;
      if (S().unlocked && !(ui.screen === 'thread' && ui.param === m.thread)) showBanner(m);
      if (navigator.vibrate) { try { navigator.vibrate(30); } catch (e) { /* not allowed yet */ } }
      if (m.ending && !S().ended) {
        S().ended = true;
        E().save();
        setTimeout(() => { ui.endingOpen = true; render(); }, 3500);
      }
    });
    render();
  }

  function mount() {
    E().visible().forEach((m) => shown.add(m.id)); // no banners for messages seen before a reload
    E().pings().forEach((p) => shownPings.add(p.id));
    document.addEventListener('click', (ev) => {
      const el = ev.target.closest('[data-action]');
      if (!el || el.disabled) return;
      const fn = actions[el.dataset.action];
      if (!fn) return;
      ev.preventDefault();
      if (fn(el) !== false) render();
    });
    document.addEventListener('keydown', (ev) => {
      if (S().unlocked || !S().started) return;
      if (/^[0-9]$/.test(ev.key)) { ui.keypad = true; enterDigit(ev.key); render(); }
      if (ev.key === 'Backspace') { ui.code = ui.code.slice(0, -1); render(); }
    });
    setInterval(tick, 500);
    render();
  }

  // --- the season: every week's case, newest first ------------------------------------

  function weekSunday(n) {
    const d = new Date(`${FP.season.firstSunday}T12:00:00`);
    d.setDate(d.getDate() + 7 * (n - 1));
    return d;
  }

  function saved(c) {
    try { return JSON.parse(localStorage.getItem(`found-phone:${c.city}:${c.kase}`) || '{}'); } catch (e) { return {}; }
  }

  function season() {
    const s = FP.season;
    const now = new Date();
    const played = Array.from({ length: s.weeks }, (_, i) => i + 1).filter((n) => weekSunday(n) <= now);
    const next = played.length < s.weeks ? played.length + 1 : null;
    const day = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const rows = [];
    if (next) {
      rows.push(`<li><span class="wk future"><span class="wk-n">Week ${next}</span><span class="wk-main"><b>Next case</b><small>After the games on ${day(weekSunday(next))}</small></span><span class="wk-state">🔜</span></span></li>`);
    }
    played.slice().reverse().forEach((n) => {
      const c = s.cases.find((x) => x.week === n);
      if (!c || !FP.cases[c.kase] || !FP.cities[c.city]) {
        rows.push(`<li><span class="wk soon"><span class="wk-n">Week ${n}</span><span class="wk-main"><b>Case coming soon</b><small>${day(weekSunday(n))}</small></span><span class="wk-state">✏️</span></span></li>`);
        return;
      }
      const st = saved(c);
      const state = st.solved ? '✅' : st.started ? '⏯️' : '▶️';
      rows.push(`<li><a class="wk open" href="?case=${encodeURIComponent(c.kase)}"><span class="wk-n">Week ${n}</span><span class="wk-main"><b>${esc(FP.cities[c.city].name)}: ${esc(FP.cases[c.kase].title)}</b><small>🏈 ${esc(c.game)} · ${esc(c.when)}</small></span><span class="wk-state">${state}</span></a></li>`);
    });
    document.getElementById('screen').innerHTML = `<div class="idle"><span class="idle-icon">📱</span><span>Pick a week to find a phone</span></div>`;
    document.getElementById('meta').innerHTML = `<div class="brand">Not My Phone<span>The ${s.year} season</span></div>`;
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = `<div class="card season">
      <p class="kicker">Not My Phone · ${s.year} season</p>
      <h2>The Season</h2>
      <p>Every week, a phone turns up in the city of one of the week's wildest games. Read it, work out what happened, clear a name.</p>
      <ul class="weeks">${rows.join('')}</ul>
      <p class="fine">Games, scores, cities and weather are real. People, bars and what happens are fiction.</p>
    </div>`;
    overlay.classList.add('show');
  }

  FP.app = { mount, render, season };
})(window.FP);
