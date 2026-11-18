// The season: one case per NFL week, set in the city of that week's most intriguing game.
// The start screen lists every week; a week with a case can be played, a past week without one
// yet says so, and a future week shows when its game is.
// Games, scores and cities are real; the cases' people, bars and plots are fiction.
window.FP = window.FP || { cities: {}, cases: {} };

FP.season = {
  year: 2026,
  // Week 1's Sunday; every week after is seven days on.
  firstSunday: '2026-09-13',
  weeks: 18,
  cases: [
    { week: 1, city: 'detroit', kase: 'overtime-dog', game: 'Lions 31, Saints 30 (OT)', when: 'Sunday, Sep 13' },
    { week: 4, city: 'pittsburgh', kase: 'turnpike-trivia', game: 'Browns 27, Steelers 24', when: 'Thursday, Oct 1' },
    { week: 10, city: 'cincinnati', kase: 'plan-c', game: 'Bengals 38, Steelers 18', when: 'Sunday Night Football, Nov 15' },
  ],
};
