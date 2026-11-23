// Boot: with a case named (?case=…, and optionally ?city=…), load it, load live weather, then
// mount the phone. Without one, show the season: every week's case, to pick from.
(async function (FP) {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get('case');
  if (!caseId || !FP.cases[caseId]) {
    document.title = 'Not My Phone';
    FP.app.season();
    return;
  }
  const listed = FP.season.cases.find((c) => c.kase === caseId);
  FP.engine.load(params.get('city') || (listed && listed.city), caseId);
  if (params.has('reset')) {
    FP.engine.reset();
    params.delete('reset');
    window.history.replaceState(null, '', `${window.location.pathname}${params.toString() ? `?${params}` : ''}`);
  }
  document.title = `Not My Phone · ${FP.engine.city.name}`;

  // Weather shapes some messages, so give it a moment before the case can start.
  await Promise.race([FP.engine.loadWeather(), new Promise((r) => setTimeout(r, 3500))]);
  FP.app.mount();
})(window.FP);
