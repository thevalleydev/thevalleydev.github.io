// Week 10: Plan C. Bengals 38, Steelers 18, Sunday Night Football, November 15.
// Text uses {{...}} placeholders filled from the city pack (see js/data/cities/).
// Messages with `variants` pick the first whose `when` flags match live conditions
// (rain, snow, cold, night, day), falling back to the last variant with no `when`.
// The game and its stats are real; the people, the proposal and what happened are fiction.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cases['plan-c'] = {
  id: 'plan-c',
  number: 2,
  title: 'Plan C',
  owner: 'Jordan',
  ownerId: 'jordan',
  ownerAvatar: '🐯',

  // Who's in the photos, dressed by role (see scenes.js).
  cast: {
    jordan: { role: 'home', hair: '#2b1d14', skin: '#c68e63', beard: true },
    priya: { role: 'rival', hair: '#1b1b1b', skin: '#b97a56', ponytail: true },
    danny: { role: 'home', hat: null, hair: '#2b1d14', skin: '#c68e63' },
    aisha: { role: 'neutral', shirt: '#7a4fbf', hair: '#3a2416', skin: '#8d5a3b', glasses: true },
  },

  intro: {
    lines: [
      'You found a phone on the walkway of the {{places.bridge}}, halfway across {{places.river}}.',
      "There's a tiger on the lock screen. It won't stop buzzing.",
    ],
    disclaimer: 'The game and the score are real. The people and what happened are fiction. The city, the weather and the clock are live.',
  },

  lock: {
    code: '0901',
    wallpaper: 'p-wallpaper',
    hint: 'Passcode hint: my favorite connection. QB, then WR 🐯',
  },

  contacts: {
    priya: { name: 'Priya 💛', avatar: '💛', color: '#101820' },
    danny: { name: 'Danny', avatar: '🧥', color: '#FB4F14' },
    aisha: { name: 'Aisha', avatar: '💐', color: '#7a4fbf' },
    mom: { name: 'Mom', avatar: '🏠', color: '#b5651d' },
    borrowed: { name: '(513) 555-0142', avatar: '❔', color: '#8e8e93' },
  },

  threads: [
    {
      id: 'priya',
      title: 'Priya 💛',
      contact: 'priya',
      history: [
        { day: 'Yesterday', time: '6:52 PM', from: 'priya', text: 'this chili is better than any team you have ever loved' },
        { day: 'Yesterday', time: '6:53 PM', from: 'jordan', text: "that's fair" },
        { day: 'Yesterday', time: '10:31 PM', from: 'priya', text: "I can't watch this. I'm going home with Aisha. you stay, it's your night" },
        { day: 'Yesterday', time: '10:32 PM', from: 'jordan', text: 'wait. WAIT. stay till the 4th quarter. please. trust me' },
        { day: 'Yesterday', time: '10:33 PM', from: 'priya', text: "I'm in an Uber. I can't watch one more catch. I love you, I hate your team" },
        { day: 'Yesterday', time: '10:58 PM', from: 'jordan', text: 'meet me on the {{places.bridge}} at midnight? just a walk' },
        { day: 'Yesterday', time: '11:20 PM', from: 'jordan', text: 'P?' },
        { day: 'Yesterday', time: '11:51 PM', from: 'jordan', text: "I'm on the bridge" },
        { day: 'Today', time: '12:09 AM', from: 'jordan', text: "it's ok. get some sleep. I'll explain tomorrow" },
      ],
    },
    {
      id: 'group',
      title: 'Operation Who Dey Do 💍',
      members: ['danny', 'aisha'],
      history: [
        { day: 'Yesterday', time: '2:10 PM', from: 'jordan', text: "final reminder. Plan A: 4th quarter, the video board. Plan B: the {{places.bridge}} at midnight. Plan C is in my notes and I'm not saying it out loud" },
        { day: 'Yesterday', time: '2:11 PM', from: 'aisha', text: 'she has NO idea. she thinks today is about chili' },
        { day: 'Yesterday', time: '2:12 PM', from: 'danny', text: "I'm ready. I was born ready. what's my job again" },
        { day: 'Yesterday', time: '2:12 PM', from: 'jordan', text: 'hold the ring after halftime. do not lose it' },
        { day: 'Yesterday', time: '2:13 PM', from: 'danny', text: 'easy. I have pockets' },
        { day: 'Yesterday', time: '10:18 PM', from: 'aisha', text: "Danny I'm stealing your coat. it's FREEZING up here" },
        { day: 'Yesterday', time: '10:18 PM', from: 'danny', text: "fine. don't go through the pockets 🙃" },
        { day: 'Yesterday', time: '10:34 PM', from: 'aisha', text: "ABORT?? P is leaving and I'm going with her, she's really upset. what do I do" },
        { day: 'Yesterday', time: '10:35 PM', from: 'jordan', text: "go with her. it's fine. PLAN B. I'll text her about the bridge" },
        { day: 'Yesterday', time: '11:44 PM', from: 'danny', text: "on the bridge. it's very purple. a guy is selling hats. where are you" },
        { day: 'Yesterday', time: '11:45 PM', from: 'jordan', text: "I'm on the bridge" },
        { day: 'Yesterday', time: '11:45 PM', from: 'danny', text: 'same' },
        { day: 'Yesterday', time: '11:46 PM', from: 'jordan', text: "I don't see you" },
        { day: 'Yesterday', time: '11:52 PM', from: 'danny', text: "don't see you either. but I'm not leaving my post" },
        { day: 'Today', time: '12:15 AM', from: 'aisha', text: "she fell asleep on the couch in her Steelers hoodie. I'm so sorry J" },
      ],
    },
    {
      id: 'danny',
      title: 'Danny',
      contact: 'danny',
      history: [
        { day: 'Yesterday', time: '9:50 PM', from: 'jordan', text: "it's in your coat pocket now. do NOT take the coat off" },
        { day: 'Yesterday', time: '9:51 PM', from: 'danny', text: 'I would never take the coat off. this coat is my best friend' },
      ],
    },
    {
      id: 'aisha',
      title: 'Aisha',
      contact: 'aisha',
      history: [
        { day: 'Yesterday', time: '2:20 PM', from: 'aisha', text: "I'm bringing the backup flowers. they're in my bag. they're a little crushed" },
        { day: 'Yesterday', time: '2:21 PM', from: 'jordan', text: "you're the best. remember: you DON'T hold the ring" },
        { day: 'Yesterday', time: '2:21 PM', from: 'aisha', text: "I know I know. I'd cry and give it to a stranger" },
      ],
    },
    {
      id: 'mom',
      title: 'Mom',
      contact: 'mom',
      history: [
        { day: 'Yesterday', time: '8:01 PM', from: 'mom', text: 'Is it tonight?? Your father has been practicing his speech. There is no speech. Tell him there is no speech.' },
        { day: 'Yesterday', time: '8:02 PM', from: 'jordan', text: 'tonight. 4th quarter. watch the video board if they show it on TV' },
        { day: 'Yesterday', time: '11:30 PM', from: 'mom', text: 'We watched the whole 4th quarter. They showed a man eating nachos. Was that you' },
        { day: 'Yesterday', time: '11:31 PM', from: 'jordan', text: 'no. long story' },
      ],
    },
    // A new number: Jordan, on a borrowed phone. Hidden until he texts.
    { id: 'borrowed', title: '(513) 555-0142', contact: 'borrowed', history: [] },
  ],

  // Newest first, like a camera roll.
  photos: [
    {
      id: 'p-bridge', day: 'Today', time: '12:04 AM',
      place: '{{places.bridge}}', people: [],
      scene: { type: 'riverfront' },
      alt: 'The skyline from the middle of the {{places.bridge}} at midnight. Nobody else on the walkway.',
    },
    {
      id: 'p-q4', day: 'Yesterday', time: '10:52 PM',
      place: '{{home.stadium}}, {{city.name}}', people: ['Jordan'],
      scene: { type: 'selfie', people: [{ who: 'jordan', x: 150 }] },
      alt: 'A fourth-quarter selfie: Jordan alone in a sea of orange. The three seats next to him are empty.',
    },
    {
      id: 'p-coat', day: 'Yesterday', time: '10:20 PM',
      place: '{{home.stadium}}, {{city.name}}', people: ['Aisha', 'Priya'],
      scene: { type: 'selfie', people: [{ who: 'aisha', x: 100, wear: { shirt: '#FB4F14', stripe: '#000000' } }, { who: 'priya', x: 200 }] },
      alt: "Aisha and Priya bundled up in the third quarter. Aisha is swimming in Danny's huge orange coat. Priya looks like she'd rather be anywhere else.",
    },
    {
      id: 'p-handoff', day: 'Yesterday', time: '9:49 PM',
      place: '{{home.stadium}}, {{city.name}}', people: ['Danny', 'Jordan'],
      scene: { type: 'selfie', people: [{ who: 'danny', x: 105, pose: 'cheer', hold: 'ring' }, { who: 'jordan', x: 205 }] },
      alt: 'Halftime: Danny holding up a tiny ring box like a trophy, about to tuck it into his orange coat pocket. Jordan looks terrified.',
    },
    {
      id: 'p-seats', day: 'Yesterday', time: '7:58 PM',
      place: '{{home.stadium}}, {{city.name}}', people: ['Danny', 'Priya', 'Jordan', 'Aisha'],
      scene: { type: 'selfie', people: [{ who: 'danny', x: 52 }, { who: 'priya', x: 120 }, { who: 'jordan', x: 188 }, { who: 'aisha', x: 254 }] },
      alt: 'The four of them in their seats before kickoff. Priya in her {{rival.team}} jersey, deep behind enemy lines, grinning anyway.',
    },
    {
      id: 'p-chili', day: 'Yesterday', time: '6:48 PM',
      place: '{{venues.chili}}, {{places.chiliHood}}', people: [],
      scene: { type: 'food', dish: 'chili' },
      alt: 'Pregame {{food.chili}} at {{venues.chili}}: {{food.chiliFull}}. Booth 4. Same booth as our first date.',
    },
    {
      id: 'p-wallpaper', day: 'Oct 4', time: '4:12 PM',
      place: '{{home.stadium}}, {{city.name}}', people: ['Jordan'],
      scene: { type: 'stadium', side: 'home', sign: '{{home.chant}}', who: 'jordan' },
      alt: 'Jordan screaming with joy in a sea of orange and black.',
    },
  ],

  notes: [
    {
      id: 'n-plan', title: 'THE PLAN 💍', date: 'Yesterday',
      body: "Plan A: 4th quarter. The video board. Cousin Ray in the scoreboard room owes me one. (Ray says \"no promises.\")\n\nPlan B: if A goes wrong: the {{places.bridge}} at midnight. She walks it when she's upset. It's her thinking bridge.\n\nPlan C: if EVERYTHING goes wrong: breakfast at {{venues.chili}}, booth 4, where we had our first date. Get her there without telling her why.\n\nThe ring: I hold it till halftime, then Danny holds it. NOT Aisha. (She'll cry and hand it to the first person who asks.)",
    },
    {
      id: 'n-priya', title: 'Priya facts', date: 'Oct 20',
      body: "• From {{rival.hometown}}. {{rival.team}} fan since birth. Will not be converted. Has tried to convert ME.\n• Walks the {{places.bridge}} when she's upset. Never the purple one. \"The purple one is for tourists.\"\n• Order at {{venues.chili}}: {{food.chili}}, extra {{food.crackers}}.\n• The schedule came out in May: {{rival.team}} at {{home.team}}, Sunday night. I said \"perfect.\" Danny said \"are you sure.\"",
    },
    {
      id: 'n-speech', title: "Things to say (don't mention the Steelers)", date: 'Nov 12',
      body: "- the first time I saw you, you were booing my team, and I thought: her\n- you make every room better, even {{venues.chili}}, which was already perfect\n- I'll learn to say \"n'at\" if you learn to say \"{{home.chant}}\"\n- DO NOT mention the {{rival.team}}\n- do not mention the score\n- if they're losing badly, do not mention the score TWICE",
    },
  ],

  maps: {
    people: [
      {
        id: 'danny', name: 'Danny', avatar: '🧥',
        now: { place: 'Home', hood: '{{places.homeHood}}', pin: 'home' },
        timeline: [
          { day: 'Yesterday', time: '7:45 PM', place: '{{home.stadium}}', hood: '{{places.riverfront}}', pin: 'stadium' },
          { day: 'Yesterday', time: '10:58 PM', place: 'Left the stadium', hood: '{{places.riverfront}}', pin: 'stadium' },
          { day: 'Yesterday', time: '11:41 PM', place: 'The {{places.otherBridge}}', hood: '{{places.river}}', pin: 'purple' },
          { day: 'Today', time: '1:05 AM', place: 'Home', hood: '{{places.homeHood}}', pin: 'home' },
        ],
      },
      {
        id: 'aisha', name: 'Aisha', avatar: '💐',
        now: { place: "Priya's apartment", hood: '{{places.across}}', pin: 'covington' },
        timeline: [
          { day: 'Yesterday', time: '7:45 PM', place: '{{home.stadium}}', hood: '{{places.riverfront}}', pin: 'stadium' },
          { day: 'Yesterday', time: '10:33 PM', place: 'Left the stadium', hood: '{{places.riverfront}}', pin: 'stadium' },
          { day: 'Yesterday', time: '10:52 PM', place: "Priya's apartment", hood: '{{places.across}}', pin: 'covington' },
        ],
      },
    ],
    mine: [
      { day: 'Yesterday', time: '6:30 PM – 7:35 PM', place: '{{venues.chili}}', hood: '{{places.chiliHood}}', pin: 'chili' },
      { day: 'Yesterday', time: '7:50 PM – 10:55 PM', place: '{{home.stadium}}', hood: '{{places.riverfront}}', pin: 'stadium' },
      { day: 'Yesterday', time: '11:30 PM – 12:20 AM', place: 'The {{places.bridge}}', hood: '{{places.river}}', pin: 'bridge' },
    ],
  },

  // Live messages. `after` is a trigger: start, unlock, open:<app>, view:<photoId>, solved.
  events: [
    { id: 'e-priya-1', after: 'start', delay: 2500, thread: 'priya', from: 'priya', text: 'why did Danny text me "DON\'T FALL ASLEEP" at 1am' },
    { id: 'e-danny-1', after: 'start', delay: 8000, thread: 'danny', from: 'danny', text: 'bro where are you. I still have it. I can feel the box in my pocket' },
    {
      id: 'e-priya-2', after: 'start', delay: 15000, thread: 'priya', from: 'priya',
      variants: [
        { when: 'rain', text: "also it's pouring and you have my umbrella. where ARE you" },
        { when: 'cold', text: "also it's {{weather.temp}}° and you have my good gloves. where ARE you" },
        { text: 'where ARE you. your mom texted ME asking if "it" happened. what is IT jordan' },
      ],
    },

    { id: 'e-jordan-1', after: 'unlock', delay: 4000, thread: 'borrowed', from: 'borrowed', text: "hi. if you found a phone on the {{places.bridge}} with a tiger on the lock screen: it's mine. this is Jordan, on a borrowed phone" },
    { id: 'e-jordan-2', after: 'unlock', delay: 9500, thread: 'borrowed', from: 'borrowed', text: "long story. I was going to propose last night. it didn't go wrong exactly. we just never got to the question" },
    { id: 'e-jordan-3', after: 'unlock', delay: 15500, thread: 'borrowed', from: 'borrowed', text: "I'm at Plan C. it's in my notes. I'm not typing it here in case she sees it somehow" },
    { id: 'e-jordan-4', after: 'unlock', delay: 21500, thread: 'borrowed', from: 'borrowed', text: "can you get Priya here WITHOUT telling her why? and make sure whoever has the ring brings it. I gave it to... honestly halftime was loud. it's all on my phone somewhere" },
    { id: 'e-jordan-5', after: 'unlock', delay: 27000, thread: 'borrowed', from: 'borrowed', text: "when you know, text me here: where she should go, and who has the ring" },
    {
      id: 'e-mom-1', after: 'unlock', delay: 45000, thread: 'mom', from: 'mom',
      variants: [
        { when: 'night', text: 'Did she say yes? Your father has been holding the champagne since 11. It is warm now. He is still holding it.' },
        { text: 'Did she say yes? Your father has been holding the champagne since last night. It is warm now. He is still holding it.' },
      ],
    },
    { id: 'e-jordan-nudge', after: 'unlock', delay: 240000, nudge: true, thread: 'borrowed', from: 'borrowed', text: "she usually wakes up around now. no pressure. a LOT of pressure" },
    { id: 'e-danny-2', after: 'open:maps', delay: 6000, thread: 'danny', from: 'danny', text: 'also why does my location say purple people bridge. I was on the bridge. THE bridge' },
    { id: 'e-aisha-1', after: 'view:p-coat', delay: 5000, thread: 'aisha', from: 'aisha', text: "J?? is that you on your phone? random q: I still have Danny's coat. something rattles in the pocket every time I sit down. should I look" },

    { id: 'e-end-1', after: 'solved', delay: 2000, thread: 'borrowed', from: 'borrowed', text: "{{venues.chili}}. YES. you read the notes. I'm in booth 4 eating my feelings" },
    { id: 'e-end-2', after: 'solved', delay: 6000, thread: 'borrowed', from: 'borrowed', text: 'wait. AISHA has it?? how' },
    { id: 'e-end-3', after: 'solved', delay: 11000, thread: 'group', from: 'aisha', text: "I'M WEARING DANNY'S COAT. I've had it on since the 3rd quarter. there's a BOX. in the POCKET" },
    { id: 'e-end-4', after: 'solved', delay: 15500, thread: 'group', from: 'danny', text: 'then what has been in MY pocket all night' },
    { id: 'e-end-5', after: 'solved', delay: 20000, thread: 'group', from: 'danny', text: '...my earbuds. I guarded my earbuds on a purple bridge for 40 minutes' },
    { id: 'e-end-6', after: 'solved', delay: 25000, thread: 'group', from: 'aisha', text: "taking P to breakfast. she thinks it's a hangover 3-way. she's wearing the {{rival.team}} hoodie. I'm not stopping her" },
    { id: 'e-end-7', after: 'solved', delay: 30000, thread: 'borrowed', from: 'borrowed', text: "perfect. she's perfect" },
    { id: 'e-end-8', after: 'solved', delay: 37000, thread: 'group', from: 'aisha', text: "I'm not crying. you're crying" },
    { id: 'e-end-9', after: 'solved', delay: 44000, thread: 'group', from: 'aisha', text: "this is Priya on Aisha's phone. YES. obviously yes. in booth 4. the morning after a 38–18. I'm never letting him forget the timing 🖤💛🧡" },
    { id: 'e-end-10', after: 'solved', delay: 50000, thread: 'group', from: 'aisha', text: "whoever found his phone: come to {{venues.chili}} in {{places.chiliHood}}. we owe you {{food.chili}}. it's a chili thing.", ending: true },
  ],

  accusation: {
    thread: 'borrowed',
    prompt: 'Text Jordan the plan',
    questions: { suspect: 'Who has the ring?', place: 'Where should Priya go?' },
    message: 'Send Priya to {place}. The ring is with {suspect}.',
    suspects: [
      { id: 'danny', label: 'Danny', reply: "Danny swears it's in his pocket. but he also swears he was on the bridge, and I was on the bridge, and I never saw him. something's off. look again" },
      { id: 'aisha', label: 'Aisha' },
      { id: 'jordan', label: 'Jordan (it never left him)', says: 'you', reply: "I've turned out every pocket I own twice. it's not on me" },
      { id: 'priya', label: 'Priya (she found it)', says: 'Priya', reply: 'if Priya had found it she would have called me screaming. she just asked what IT is' },
      { id: 'lost', label: "Nobody: it's lost on the bridge", says: "nobody, it's lost", reply: "my PHONE got lost on that bridge. not the ring. I handed the ring off at halftime, I remember that much" },
    ],
    places: [
      { id: 'roebling', label: 'The {{places.bridge}}', phrase: 'the {{places.bridge}}', reply: "that was Plan B. I already did Plan B. it's where I lost my phone" },
      { id: 'purple', label: 'The {{places.otherBridge}}', phrase: 'the {{places.otherBridge}}', reply: 'the purple one?? she would never. "the purple one is for tourists"' },
      { id: 'chili', label: '{{venues.chili}}, {{places.chiliHood}}', phrase: '{{venues.chili}} in {{places.chiliHood}}' },
      { id: 'stadium', label: 'The stadium', phrase: 'the stadium', reply: "nobody's getting into the stadium on a Monday. and I'm never going near that video board again" },
      { id: 'home', label: "Jordan's apartment", phrase: 'your apartment', reply: "not proposing in my apartment. there's a pile of laundry with a Bengals flag on top" },
    ],
    answer: { suspect: 'aisha', place: 'chili' },
    rightSuspectWrongPlace: "AISHA?? ...oh no. the coat. ok, that makes sense. but that's not where I am. Plan C, remember",
  },

  hints: {
    locked: [
      "Jordan's passcode is his favorite connection: the {{home.team}} quarterback's jersey number, then his favorite receiver's.",
      'Joe Burrow wears 9. Ja\'Marr Chase wears 1. Two digits each.',
      'The passcode is 0901.',
    ],
    investigating: [
      "Jordan's notes have THE PLAN. Plans A and B have already failed. Where's Plan C?",
      'For the ring: look at the halftime photo, then at the group chat in the third quarter. Whose pocket did it go in, and who is wearing that coat now?',
      'Danny is sure he has it. Is he? Compare the halftime photo with the 10:20 photo, and check Maps for where everyone went.',
      'Send Priya to {{venues.chili}} in {{places.chiliHood}}. Aisha has the ring, in Danny\'s coat. Text Jordan on the borrowed number.',
    ],
  },

  ending: {
    title: 'She said yes',
    body: "Plan C worked. Priya said yes in booth 4, in her {{rival.team}} hoodie, the morning after a 38–18. Danny guarded his earbuds with his life.",
    next: 'A new case every week of the season.',
  },
};
