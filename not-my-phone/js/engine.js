// Game engine: save state, {{template}} filling, live conditions (weather + city clock),
// timed message delivery, hints and the accusation check. No DOM code lives here.
window.FP = window.FP || { cities: {}, cases: {} };

(function (FP) {
  const engine = { city: null, kase: null, state: null, weather: null, rivalWeather: null };

  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

  // --- templating -------------------------------------------------------------

  engine.ctx = function () {
    const c = engine.city;
    return {
      city: c, home: c.home, rival: c.rival, places: c.places, venues: c.venues,
      say: c.dialect, food: c.food, weather: engine.weather || {},
    };
  };

  engine.fill = function (str) {
    if (str == null) return '';
    const ctx = engine.ctx();
    return String(str).replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, path) => {
      const v = get(ctx, path);
      return v == null ? m : String(v);
    });
  };

  // --- live conditions -------------------------------------------------------

  function describe(code) {
    if (code === 0) return { text: 'Clear', icon: '☀️', clear: true };
    if (code <= 3) return { text: 'Partly cloudy', icon: '⛅' };
    if (code === 45 || code === 48) return { text: 'Fog', icon: '🌫️' };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { text: 'Rain', icon: '🌧️', rain: true };
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { text: 'Snow', icon: '🌨️', snow: true };
    if (code >= 95) return { text: 'Thunderstorms', icon: '⛈️', rain: true };
    return { text: 'Cloudy', icon: '☁️' };
  }

  async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
      + '&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`weather ${res.status}`);
    const cur = (await res.json()).current;
    return { temp: Math.round(cur.temperature_2m), isDay: cur.is_day === 1, ...describe(cur.weather_code) };
  }

  engine.loadWeather = async function () {
    const c = engine.city;
    const [home, rival] = await Promise.allSettled([
      fetchWeather(c.lat, c.lon),
      fetchWeather(c.rival.hometownLat, c.rival.hometownLon),
    ]);
    engine.weather = home.status === 'fulfilled' ? home.value : null;
    engine.rivalWeather = rival.status === 'fulfilled' ? rival.value : null;
  };

  function cityHour() {
    const h = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: engine.city.timezone }).format(new Date());
    return Number(h) % 24;
  }

  engine.flags = function () {
    const w = engine.weather;
    const hour = cityHour();
    const night = w ? !w.isDay : hour < 6 || hour >= 20;
    return {
      night, day: !night,
      rain: !!(w && w.rain), snow: !!(w && w.snow), clear: !!(w && w.clear),
      cold: !!(w && w.temp <= 40),
    };
  };

  engine.pick = function (msg) {
    if (!msg.variants) return msg.text;
    const flags = engine.flags();
    const fired = engine.state.fired;
    const match = msg.variants.find((v) => !v.when || [].concat(v.when).every((k) => flags[k] || fired[k]));
    return match ? match.text : '';
  };

  // --- clock -----------------------------------------------------------------

  engine.timeLabel = function (ts) {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: engine.city.timezone }).format(new Date(ts));
  };
  engine.clock = () => engine.timeLabel(Date.now()).replace(/\s?[AP]M$/, '');
  engine.dateLabel = () => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: engine.city.timezone }).format(new Date());

  engine.battery = function () {
    const s = engine.state;
    if (!s.startedAt) return 23;
    return Math.max(4, 23 - Math.floor((Date.now() - s.startedAt) / 90000));
  };

  // --- save state ------------------------------------------------------------

  const blank = () => ({
    started: false, startedAt: null, unlocked: false, solved: false, solvedAt: null, ended: false,
    fired: {}, live: [], pings: [], replied: {}, lastSeen: {}, hintIdx: {}, hintsUsed: 0, wrongGuesses: 0,
  });
  const saveKey = () => `found-phone:${engine.city.id}:${engine.kase.id}`;

  engine.load = function (cityId, caseId) {
    engine.city = FP.cities[cityId];
    engine.kase = FP.cases[caseId];
    try {
      engine.state = { ...blank(), ...JSON.parse(localStorage.getItem(saveKey()) || '{}') };
    } catch (e) {
      engine.state = blank();
    }
  };

  engine.save = function () {
    try { localStorage.setItem(saveKey(), JSON.stringify(engine.state)); } catch (e) { /* private mode: play without saving */ }
  };

  engine.reset = function () {
    try { localStorage.removeItem(saveKey()); } catch (e) { /* ignore */ }
    engine.state = blank();
  };

  // --- triggers and live messages ---------------------------------------------
  // Every live message is stored with its delivery time, so a reload mid-conversation
  // picks up exactly where it left off.
  //
  // Pacing: someone takes longer to type a long message than a short one. And once the
  // story's going (anything but the lock-screen opening and the ending), a person sends the
  // first message of what they have to say, then waits until you've read it before sending
  // the next: the rest are "held" until their thread is opened. A message marked `nudge`
  // (a reminder minutes later) keeps its own timing instead. An event's `delay` is always
  // the earliest it can arrive.
  //
  // An event's `after` can list several triggers: it fires on whichever comes first, once.
  // With `unless`, it's called off if that trigger fires before it arrives (a sighting that
  // can't happen once the dog's been caught).

  /** How long someone takes to type a message (ms): a moment, plus a little per letter. */
  const typingTime = (text) => Math.min(8000, Math.max(2500, 1400 + text.length * 45));

  engine.trigger = function (names) {
    const s = engine.state;
    const list = [].concat(names).filter((n) => !s.fired[n]);
    if (!list.length) return false;
    const now = Date.now();
    list.forEach((n) => { s.fired[n] = now; });
    const waits = !list.includes('start') && !list.includes('solved');
    const last = {}; // per thread: when this trigger's previous message lands
    const off = (x) => x.unless && list.includes(x.unless) && (x.held || x.at > now);
    const gone = s.live.filter(off).concat((s.pings || []).filter(off));
    if (gone.length) {
      s.dropped = (s.dropped || []).concat(gone.map((x) => x.id));
      s.live = s.live.filter((m) => !off(m));
      s.pings = s.pings.filter((p) => !off(p));
    }
    const done = new Set(s.live.map((m) => m.id).concat((s.pings || []).map((p) => p.id), s.dropped || []));
    const nag = list.some((n) => n.startsWith('quiet:'));
    const events = engine.kase.events.filter((e) => !done.has(e.id) && [].concat(e.after).some((a) => list.includes(a)));
    // A ping is a sighting of a tracked item (Maps → Items), not a message.
    events.filter((e) => e.ping).forEach((e) => {
      s.pings = s.pings || [];
      s.pings.push({ id: e.id, item: e.ping.item, place: engine.fill(e.ping.place), hood: engine.fill(e.ping.hood), pin: e.ping.pin, at: now + (e.delay || 0), unless: e.unless });
    });
    events
      .filter((e) => !e.ping)
      .sort((a, b) => (a.delay || 0) - (b.delay || 0))
      .forEach((e) => {
        const text = engine.fill(engine.pick(e));
        const earliest = now + (e.delay || 0);
        const after = e.nudge ? undefined : last[e.thread];
        const held = waits && after !== undefined;
        const at = held ? 0 : Math.max(earliest, after !== undefined ? after + typingTime(text) : earliest);
        s.live.push({ id: e.id, thread: e.thread, from: e.from, text, at, earliest, held, nag, unless: e.unless, ending: !!e.ending });
        if (!e.nudge) last[e.thread] = at;
      });
    engine.save();
    return true;
  };

  /**
   * Sends on held messages: each waits until the message before it in its thread has
   * arrived and been read, then takes a believable while to type.
   */
  function release() {
    const s = engine.state;
    const now = Date.now();
    let changed = false;
    s.live.forEach((m, i) => {
      if (!m.held) return;
      const before = s.live.slice(0, i).filter((x) => x.thread === m.thread && x.from !== 'me');
      const prev = before[before.length - 1];
      if (prev && (prev.held || prev.at > now || (s.lastSeen[m.thread] || 0) < prev.at)) return;
      m.held = false;
      m.at = Math.max(now, m.earliest || 0) + typingTime(m.text);
      changed = true;
    });
    if (changed) engine.save();
    quiet();
  }

  // --- quick replies ------------------------------------------------------------
  // A case's `replies` are moments where the player can answer: once the message `after`
  // (an event id) has arrived, its options show above the keyboard in that thread. Picking
  // one sends it and fires `reply:<prompt>` and `reply:<prompt>:<option>`. A prompt with
  // `quiet` (ms) fires `quiet:<prompt>` if the player reads the message it follows and says
  // nothing for that long, so a silent player never stalls the story.
  // A newer prompt in the same thread replaces an unanswered older one.

  const arrived = (id, now) => engine.state.live.find((m) => m.id === id && !m.held && m.at <= now);

  function quiet() {
    const s = engine.state;
    const now = Date.now();
    (engine.kase.replies || []).forEach((p) => {
      if (!p.quiet || s.fired[`quiet:${p.id}`] || engine.prompt(p.thread) !== p) return;
      const m = arrived(p.after, now);
      if (m && (s.lastSeen[m.thread] || 0) >= m.at && now - m.at >= p.quiet) engine.trigger(`quiet:${p.id}`);
    });
  }

  /** The reply options open in a thread right now, if any. */
  engine.prompt = function (thread) {
    const s = engine.state;
    const now = Date.now();
    let best = null;
    let bestAt = -1;
    (engine.kase.replies || []).forEach((p) => {
      if (p.thread !== thread) return;
      const m = arrived(p.after, now);
      if (m && m.at > bestAt) { best = p; bestAt = m.at; }
    });
    return best && !s.replied[best.id] ? best : null;
  };

  engine.reply = function (promptId, optionId) {
    const p = engine.kase.replies.find((x) => x.id === promptId);
    const o = p.options.find((x) => x.id === optionId);
    const s = engine.state;
    const now = Date.now();
    s.replied[p.id] = o.id;
    // Answering cancels any "hello??" that hasn't arrived yet.
    const nags = s.live.filter((m) => m.nag && m.thread === p.thread && (m.held || m.at > now));
    s.dropped = (s.dropped || []).concat(nags.map((m) => m.id));
    s.live = s.live.filter((m) => !nags.includes(m));
    push(p.thread, 'me', engine.fill(o.text), 0);
    engine.trigger([`reply:${p.id}`, `reply:${p.id}:${o.id}`]);
  };

  /** Whether the answer can be sent yet: once any of the accusation's `after` messages has arrived. */
  engine.canAccuse = function () {
    const a = engine.kase.accusation;
    const s = engine.state;
    if (!s.unlocked || s.solved) return false;
    return !a.after || [].concat(a.after).some((id) => arrived(id, Date.now()));
  };

  engine.start = function () {
    const s = engine.state;
    s.started = true;
    s.startedAt = Date.now();
    engine.trigger('start');
  };

  engine.visible = function (thread) {
    release();
    const now = Date.now();
    return engine.state.live.filter((m) => !m.held && m.at <= now && (!thread || m.thread === thread)).sort((a, b) => a.at - b.at);
  };

  /** A tracked item's sightings so far (all items' if none is named), oldest first. */
  engine.pings = function (item) {
    const now = Date.now();
    return (engine.state.pings || []).filter((p) => p.at <= now && (!item || p.item === item)).sort((a, b) => a.at - b.at);
  };

  engine.typing = function (thread) {
    release();
    const now = Date.now();
    return engine.state.live.some((m) => m.thread === thread && m.from !== 'me' && !m.held && m.at > now && m.at - now < 2600);
  };

  engine.unread = function (thread) {
    const seen = engine.state.lastSeen[thread] || 0;
    return engine.visible(thread).filter((m) => m.from !== 'me' && m.at > seen).length;
  };

  engine.markSeen = function (thread) {
    engine.state.lastSeen[thread] = Date.now();
    engine.save();
  };

  function push(thread, from, text, delay) {
    const at = Date.now() + (delay || 0);
    engine.state.live.push({ id: `${from}-${at}-${Math.random().toString(36).slice(2, 6)}`, thread, from, text, at });
  }

  // --- puzzles ---------------------------------------------------------------

  engine.tryCode = function (code) {
    if (code !== engine.fill(engine.kase.lock.code)) return false;
    engine.state.unlocked = true;
    engine.trigger('unlock');
    return true;
  };

  engine.accuse = function (suspectId, placeId) {
    const a = engine.kase.accusation;
    const s = engine.state;
    const suspect = a.suspects.find((x) => x.id === suspectId);
    const place = a.places.find((x) => x.id === placeId);
    const text = a.message
      .replace('{suspect}', engine.fill(suspect.says || suspect.label))
      .replace('{place}', engine.fill(place.phrase));
    push(a.thread, 'me', text, 0);

    // A case can have several right answers (`answers`), and answers or replies (`wrong`)
    // that only hold `before` or `after` a message or sighting has arrived: what was true a
    // minute ago may not be now. The first matching reply in `wrong` beats the defaults.
    const now = Date.now();
    const has = (id) => !!(arrived(id, now) || engine.pings().some((p) => p.id === id));
    const holds = (x) => (!x.before || !has(x.before)) && (!x.after || has(x.after));
    const answers = a.answers || [a.answer];
    const win = answers.find((x) => x.suspect === suspect.id && x.place === place.id && holds(x));
    const special = (a.wrong || []).find((w) => (!w.suspect || w.suspect === suspect.id) && (!w.place || w.place === place.id) && holds(w));
    if (win) {
      // fall through to solved
    } else if (special) {
      push(a.thread, a.thread, engine.fill(special.reply), 2600);
    } else if (!answers.some((x) => x.suspect === suspect.id)) {
      push(a.thread, a.thread, engine.fill(suspect.reply), 2600);
    } else {
      push(a.thread, a.thread, engine.fill(a.rightSuspectWrongPlace), 2600);
      if (place.reply) push(a.thread, a.thread, engine.fill(place.reply), 5200);
    }

    const solved = !!win;
    if (solved) {
      s.solved = true;
      s.solvedAt = Date.now();
      engine.trigger(['solved', ...(win.id ? [`solved:${win.id}`, `solved:${win.id}:${place.id}`] : [])]);
    } else {
      s.wrongGuesses += 1;
      engine.save();
    }
    return solved;
  };

  engine.stage = function () {
    const s = engine.state;
    if (!s.unlocked) return 'locked';
    return s.solved ? 'solved' : 'investigating';
  };

  engine.nextHint = function () {
    const stage = engine.stage();
    const list = engine.kase.hints[stage];
    if (!list) return null;
    const s = engine.state;
    const i = s.hintIdx[stage] || 0;
    if (i < list.length) {
      s.hintIdx[stage] = i + 1;
      s.hintsUsed += 1;
      engine.save();
    }
    const n = Math.min(i, list.length - 1);
    return { text: engine.fill(list[n]), n: n + 1, of: list.length };
  };

  FP.engine = engine;
})(window.FP);
