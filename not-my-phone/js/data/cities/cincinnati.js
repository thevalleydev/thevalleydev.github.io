// City pack: everything a case needs to feel local. Cases reference these
// through {{...}} placeholders, so a new city is mostly a new file like this.
// Shops and people are fictional; neighborhoods, bridges, streets and weather are real.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cities.cincinnati = {
  id: 'cincinnati',
  name: 'Cincinnati',
  nickname: 'the Queen City',
  timezone: 'America/New_York',
  lat: 39.1031,
  lon: -84.512,
  areaCode: '513',

  home: {
    team: 'Bengals',
    fans: 'Bengals fans',
    colors: ['#FB4F14', '#000000'],
    stadium: 'Paycor Stadium',
    stadiumLocalName: 'the Jungle', // what locals call it
    chant: 'Who Dey',
    baseball: 'Reds',
    soccer: 'FC Cincinnati',
  },

  // The rival-fan "twang": a fan of the rival team, living behind enemy lines.
  rival: {
    team: 'Steelers',
    city: 'Pittsburgh',
    hometown: 'Mt. Lebanon',
    hometownLat: 40.3554,
    hometownLon: -80.0495,
    colors: ['#101820', '#FFB612'],
    hearts: '🖤💛',
    fanSection: 'Steeler Nation',
    relic: 'Terrible Towel',
  },

  places: {
    homeHood: 'Northside',
    chiliHood: 'Clifton',
    bridge: 'Roebling Bridge',
    otherBridge: 'Purple People Bridge',
    across: 'Covington',
    otherAcross: 'Newport',
    riverfront: 'the Banks',
    river: 'the Ohio',
  },

  // Fictional venues set in real neighborhoods.
  venues: {
    chili: "Tonya's Chili Parlor",
    chiliOwner: 'Tonya',
  },

  dialect: {
    pardon: 'Please?',
    soda: 'pop',
    breakfast: 'goetta',
    local: 'Cincinnatian',
  },

  food: {
    chili: 'a 3-way',
    chiliFull: 'spaghetti, chili and a mountain of shredded cheddar',
    breakfast: 'goetta',
    crackers: 'oyster crackers',
  },

  // Stylized map for the Maps app: the Ohio along the bottom, pins in a 300x300 viewBox.
  map: {
    water: [
      'M -10 238 C 80 258, 170 246, 310 214', // the Ohio
      'M 236 300 C 234 276, 228 258, 226 240', // the Licking, on the Kentucky side
    ],
    pins: {
      stadium: { x: 48, y: 214, label: 'The stadium' },
      bridge: { x: 128, y: 242, label: 'Roebling Bridge' },
      purple: { x: 238, y: 224, label: 'Purple People Bridge' },
      chili: { x: 170, y: 96, label: 'Clifton' },
      home: { x: 80, y: 84, label: 'Northside' },
      covington: { x: 128, y: 280, label: 'Covington' },
    },
  },
};
