// City pack: everything a case needs to feel local. Cases reference these
// through {{...}} placeholders, so a new city is mostly a new file like this.
// Bars, shops and people are fictional; neighborhoods, streets and weather are real.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cities.pittsburgh = {
  id: 'pittsburgh',
  name: 'Pittsburgh',
  nickname: 'the Burgh',
  timezone: 'America/New_York',
  lat: 40.4406,
  lon: -79.9959,
  areaCode: '412',

  home: {
    team: 'Steelers',
    fans: 'Steelers fans',
    colors: ['#101820', '#FFB612'],
    stadium: 'Acrisure Stadium',
    stadiumLocalName: 'Heinz Field', // what locals still call it
    relic: 'Terrible Towel',
    hockey: 'Penguins',
    baseball: 'Pirates',
  },

  // The rival-fan "twang": every city gets a fan of the rival team living behind enemy lines.
  rival: {
    team: 'Browns',
    city: 'Cleveland',
    hometown: 'Parma',
    hometownLat: 41.4048,
    hometownLon: -81.7229,
    colors: ['#311D00', '#FF3C00'],
    fanSection: 'Dawg Pound',
    // The rival fan's passcode: the best day of their fan life, at the home team's expense.
    bestDay: {
      date: '1/10/21',
      label: 'AFC Wild Card, Browns at Steelers',
      score: '48–37',
      code: '4837',
    },
  },

  places: {
    barHood: 'Strip District',
    barStreet: 'Smallman Street',
    homeHood: 'Polish Hill',
    laundryHood: 'Lawrenceville',
    overlook: 'Mount Washington',
    incline: 'Duquesne Incline',
    transit: 'the T',
    rivers: 'the Allegheny and the Mon',
  },

  // Fictional venues set in real neighborhoods.
  venues: {
    bar: 'The Slippy Step',
    barOwner: 'Sal',
    laundromat: "Suds n'at Laundromat",
  },

  dialect: {
    youAll: 'yinz',
    andSoOn: "n'at",
    jerk: 'jagoff',
    slippery: 'slippy',
    tidyUp: 'redd up',
    nosy: 'nebby',
    rubberBand: 'gumband',
    local: 'yinzer',
  },

  food: {
    sandwich: 'a sandwich with the fries already in it',
    dumplings: 'pierogies',
    lunchMeat: 'chipped ham',
  },

  // Stylized map for the Maps app: rivers and pins in a 300x300 viewBox.
  map: {
    water: [
      'M 310 40 C 250 70, 200 110, 150 150',   // Allegheny
      'M 300 260 C 240 230, 190 190, 150 150', // Monongahela
      'M 150 150 C 110 130, 60 110, -10 90',   // Ohio
    ],
    pins: {
      bar: { x: 192, y: 135, label: 'Strip District' },
      laundry: { x: 248, y: 98, label: 'Lawrenceville' },
      home: { x: 215, y: 160, label: 'Polish Hill' },
      overlook: { x: 135, y: 195, label: 'Mount Washington' },
    },
  },
};
