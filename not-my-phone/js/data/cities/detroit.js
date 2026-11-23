// City pack: everything a case needs to feel local. Cases reference these
// through {{...}} placeholders, so a new city is mostly a new file like this.
// Shops and people are fictional; neighborhoods, landmarks, streets and weather are real.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cities.detroit = {
  id: 'detroit',
  name: 'Detroit',
  nickname: 'the D',
  timezone: 'America/Detroit',
  lat: 42.3314,
  lon: -83.0458,
  areaCode: '313',

  home: {
    team: 'Lions',
    fans: 'Lions fans',
    colors: ['#0076B6', '#B0B7BC'],
    stadium: 'Ford Field',
    stadiumLocalName: 'Ford Field',
    baseball: 'Tigers',
    hockey: 'Red Wings',
  },

  // The visiting fan, behind enemy lines.
  rival: {
    team: 'Saints',
    city: 'New Orleans',
    hometown: 'Metairie',
    hometownLat: 29.9841,
    hometownLon: -90.1529,
    colors: ['#101820', '#D3BC8D'],
    hearts: '🖤💛',
    fanSection: 'Who Dat Nation',
    chant: 'Who Dat',
  },

  places: {
    riverwalk: 'the Riverwalk',
    plaza: 'Hart Plaza',
    market: 'Eastern Market',
    hotelHood: 'Greektown',
    coneyStreet: 'Lafayette Boulevard',
    barHood: 'by Ford Field',
    river: 'the Detroit River',
    across: 'Windsor',
  },

  // Fictional venues set in real places.
  venues: {
    bar: 'Brush Street Social',
    hotel: 'the Monroe Street Inn',
    coney: 'Paradise Coney',
    otherConey: 'Liberty Coney',
    donuts: 'Gratiot Glaze',
  },

  dialect: {
    soda: 'pop',
    turn: 'a Michigan left',
    north: 'up north',
    local: 'Detroiter',
  },

  food: {
    coney: 'a coney',
    coneyFull: 'a hot dog under chili, mustard and onions',
    donut: 'a cider donut',
  },

  // Stylized map for the Maps app: the Detroit River along the bottom (Canada is south of here),
  // pins in a 300x300 viewBox.
  map: {
    water: [
      'M -10 262 C 90 250, 200 262, 310 236', // the Detroit River
    ],
    pins: {
      market: { x: 232, y: 62, label: 'Eastern Market' },
      bar: { x: 132, y: 118, label: 'Ford Field' },
      hotel: { x: 214, y: 150, label: 'Greektown' },
      coney: { x: 82, y: 178, label: 'Lafayette Blvd' },
      plaza: { x: 104, y: 230, label: 'Hart Plaza' },
      riverwalk: { x: 222, y: 236, label: 'The Riverwalk' },
    },
  },
};
