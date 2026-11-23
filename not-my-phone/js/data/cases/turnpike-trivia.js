// Week 4: Turnpike Trivia. Browns 27, Steelers 24, Thursday, October 1.
// Text uses {{...}} placeholders filled from the city pack (see js/data/cities/).
// Messages with `variants` pick the first whose `when` flags match live conditions
// (rain, snow, cold, night, day), falling back to the last variant with no `when`.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cases['turnpike-trivia'] = {
  id: 'turnpike-trivia',
  number: 1,
  title: 'Turnpike Trivia',
  owner: 'Dana',

  intro: {
    lines: [
      'You found a phone on a bench at the top of the {{places.incline}}.',
      "The battery's low. It won't stop buzzing.",
    ],
    disclaimer: 'People, bars and events are fiction. The city, the weather and the clock are real.',
  },

  lock: {
    code: '{{rival.bestDay.code}}',
    wallpaper: 'p-bestday',
    hint: 'Passcode hint: the final score. Us first. 🧡🤎',
  },

  contacts: {
    tash: { name: 'Tash', avatar: '🍺', color: '#2f6f5e' },
    mikey: { name: 'Mikey', avatar: '🏈', color: '#101820' },
    jen: { name: 'Jen', avatar: '🏒', color: '#8a4b9c' },
    mom: { name: 'Mom', avatar: '🏠', color: '#b5651d' },
  },

  threads: [
    {
      id: 'tash',
      title: 'Tash',
      contact: 'tash',
      history: [
        { day: 'Yesterday', time: '11:40 PM', from: 'tash', text: "{{venues.barOwner}}'s checking the cameras tomorrow. the camera over the bar's been broken since 2019 though so idk what he thinks he's gonna see" },
        { day: 'Yesterday', time: '11:41 PM', from: 'dana', text: "I didn't take it Tash" },
        { day: 'Yesterday', time: '11:43 PM', from: 'tash', text: "I know hon. but he says if it's not back on the wall by close tomorrow you're banned. for life. you know how he gets" },
        { day: 'Yesterday', time: '11:44 PM', from: 'dana', text: "I'll figure it out" },
      ],
    },
    {
      id: 'group',
      title: 'Window Table 🏆',
      members: ['mikey', 'jen', 'tash'],
      history: [
        { day: 'Yesterday', time: '8:41 PM', from: 'jen', text: "got the window table. Tash is saving it. bring cash, the card reader's being a {{say.jerk}} again" },
        { day: 'Yesterday', time: '8:43 PM', from: 'mikey', text: 'reminder: Turnpike Trivia is a sacred {{home.team}} tradition and {{rival.team}} fans are GUESTS in this house' },
        { day: 'Yesterday', time: '8:44 PM', from: 'dana', text: 'guests who are 3-0 at Turnpike Trivia this year 🙂' },
        { day: 'Yesterday', time: '8:44 PM', from: 'mikey', text: "trivia doesn't count. go ask your trophy case. oh wait" },
        { day: 'Yesterday', time: '8:45 PM', from: 'dana', text: "at least my team's whole personality isn't a towel" },
        { day: 'Yesterday', time: '8:46 PM', from: 'jen', text: "I'm a {{home.hockey}} fan. I'm just here to watch {{say.youAll}} both be miserable" },
        { day: 'Yesterday', time: '8:47 PM', from: 'dana', text: "also. Thursday. {{rival.team}} 27, {{home.team}} 24. I'll be bringing it up all night" },
        { day: 'Yesterday', time: '8:47 PM', from: 'mikey', text: 'we do not speak of Thursday' },
        { day: 'Yesterday', time: '11:20 PM', from: 'dana', text: 'has anyone seen my car keys' },
        { day: 'Yesterday', time: '11:21 PM', from: 'jen', text: 'check your coat' },
        { day: 'Yesterday', time: '11:21 PM', from: 'dana', text: "checked my coat. they're not in my coat" },
        { day: 'Yesterday', time: '11:26 PM', from: 'tash', text: 'uh. has anyone seen the towel' },
        { day: 'Yesterday', time: '11:27 PM', from: 'tash', text: "THE towel. the signed one. it's not on the wall" },
        { day: 'Yesterday', time: '11:27 PM', from: 'jen', text: 'oh no' },
        { day: 'Yesterday', time: '11:29 PM', from: 'tash', text: '{{venues.barOwner}} thinks it was the {{rival.team}} table' },
        { day: 'Yesterday', time: '11:29 PM', from: 'dana', text: 'it was NOT the {{rival.team}} table. the {{rival.team}} table was busy WINNING' },
        { day: 'Yesterday', time: '11:31 PM', from: 'dana', text: "where's Mikey" },
        { day: 'Yesterday', time: '11:31 PM', from: 'jen', text: 'bathroom?' },
        { day: 'Today', time: '12:02 AM', from: 'dana', text: "going up the {{places.incline}} to clear my head. if {{venues.barOwner}} bans me I'm gonna cry on {{places.overlook}}" },
      ],
    },
    {
      id: 'mikey',
      title: 'Mikey',
      contact: 'mikey',
      history: [
        { day: 'Yesterday', time: '10:38 PM', from: 'mikey', text: 'where are your car keys' },
        { day: 'Yesterday', time: '10:38 PM', from: 'dana', text: 'why' },
        { day: 'Yesterday', time: '10:39 PM', from: 'mikey', text: 'no reason. normal emergency' },
        { day: 'Yesterday', time: '10:39 PM', from: 'dana', text: 'in my coat?? what emergency' },
        { day: 'Yesterday', time: '11:33 PM', from: 'dana', text: 'mikey where are you. Tash says you left' },
        { day: 'Yesterday', time: '11:34 PM', from: 'dana', text: 'MIKEY' },
      ],
    },
    {
      id: 'jen',
      title: 'Jen',
      contact: 'jen',
      history: [
        { day: 'Yesterday', time: '10:06 PM', from: 'jen', text: "do NOT post that pic of me holding the towel. I'm a {{home.hockey}} fan, {{venues.barOwner}} will kill me" },
        { day: 'Yesterday', time: '10:06 PM', from: 'dana', text: "lol it's for my personal archive" },
        { day: 'Yesterday', time: '10:32 PM', from: 'jen', text: "put it back on the hook btw. don't tell Mikey I touched it, he has RULES" },
      ],
    },
    {
      id: 'mom',
      title: 'Mom',
      contact: 'mom',
      history: [
        { day: 'Yesterday', time: '7:30 PM', from: 'mom', text: 'Trivia tonight?' },
        { day: 'Yesterday', time: '7:34 PM', from: 'dana', text: '{{rival.team}} table vs. everybody' },
        { day: 'Yesterday', time: '7:35 PM', from: 'mom', text: 'Wear the jersey. And a coat. {{city.name}} is cold.' },
        { day: 'Yesterday', time: '7:35 PM', from: 'dana', text: "Mom it's two hours from {{rival.hometown}}" },
        { day: 'Yesterday', time: '7:36 PM', from: 'mom', text: 'Colder people.' },
      ],
    },
  ],

  // Newest first, like a camera roll.
  photos: [
    {
      id: 'p-overlook', day: 'Today', time: '12:14 AM',
      place: '{{places.overlook}}', people: [],
      scene: { type: 'overlook' },
      alt: 'Night view of downtown from the overlook: lit towers, yellow bridges, and the rivers meeting at the Point.',
    },
    {
      id: 'p-winners', day: 'Yesterday', time: '10:47 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Dana', 'Jen'],
      scene: { type: 'bar', towel: 'gone', people: [{ who: 'dana', x: 105, pose: 'cheer', hold: 'trophy' }, { who: 'jen', x: 170, pose: 'cheer' }, { who: 'chair', x: 240 }] },
      alt: 'Winners selfie: Dana holding a trivia trophy, Jen cheering. Behind them, the frame on the wall is empty. The chair on the right is empty.',
    },
    {
      id: 'p-blur', day: 'Yesterday', time: '10:44 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['1 person (too blurry)'],
      scene: { type: 'door' },
      alt: 'A blurry accidental shot of the front door. Someone in black and gold is leaving in a hurry, holding something yellow.',
    },
    {
      id: 'p-pitcher', day: 'Yesterday', time: '10:31 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Mikey'],
      scene: { type: 'bar', towel: 'wall', people: [{ who: 'mikey', x: 215, pose: 'cheer', hold: 'pitcher' }] },
      alt: 'Mikey standing right under the framed towel, hoisting a full pitcher. The towel is back on the wall.',
    },
    {
      id: 'p-jen', day: 'Yesterday', time: '10:05 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Jen'],
      scene: { type: 'bar', towel: 'gone', people: [{ who: 'jen', x: 150, pose: 'cheer', hold: 'towel' }] },
      alt: 'Jen holding the signed towel over the answer sheet like a blessing. The frame on the wall behind her is empty.',
    },
    {
      id: 'p-pierogies', day: 'Yesterday', time: '9:47 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: [],
      scene: { type: 'food', dish: 'pierogies' },
      alt: 'A plate of {{food.dumplings}} with onions and sour cream.',
    },
    {
      id: 'p-table', day: 'Yesterday', time: '9:12 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Mikey', 'Dana', 'Jen'],
      scene: { type: 'bar', towel: 'wall', people: [{ who: 'mikey', x: 80 }, { who: 'dana', x: 150 }, { who: 'jen', x: 220 }] },
      alt: 'The trivia table: Mikey, Dana and Jen with drinks. The signed towel hangs in a frame on the wall behind them.',
    },
    {
      id: 'p-sandwich', day: 'Oct 3', time: '1:15 PM',
      place: '{{places.barHood}}', people: [],
      scene: { type: 'food', dish: 'sandwich' },
      alt: 'Lunch: {{food.sandwich}}.',
    },
    {
      id: 'p-bestday', day: '{{rival.bestDay.date}}', time: '10:52 PM',
      place: '{{home.stadiumLocalName}}, {{city.name}}', people: ['Dana'],
      scene: { type: 'stadium' },
      alt: 'Dana in a {{rival.team}} jersey, screaming with joy in the stands, surrounded by a sea of orange and brown.',
    },
  ],

  notes: [
    {
      id: 'n-rules', title: "Towel rules (per Mikey)", date: 'Sep 14',
      body: "Mikey's official rules for the signed {{home.relic}} at {{venues.bar}}, as recited to me 40 times:\n\n1. It never touches the floor.\n2. Only {{home.fans}} touch it. (Jen says {{home.hockey}} fans count. Mikey says \"barely.\")\n3. It is NEVER washed during the season. \"You'll wash the luck out.\"\n4. If anything happens to it, you tell {{venues.barOwner}} immediately.\n\nI touched it once as a joke and I have never seen a grown man that pale.",
    },
    {
      id: 'n-trivia', title: 'Turnpike Trivia cheat sheet', date: 'Yesterday',
      body: "Things that come up every time:\n\n• Rivers that make the Ohio: {{places.rivers}}\n• Bridges in the city: 446 (Mikey's answer: \"enough\")\n• Last time {{rival.city}} won a football championship: 1964 (Mikey answered this one. Loudly. Standing up.)\n• The stadium's real name: {{home.stadium}}. Nobody here calls it that. It's {{home.stadiumLocalName}}.\n\nFinal round is always a lightning round. Mikey always orders a pitcher for it.",
    },
    {
      id: 'n-dialect', title: '{{city.name}} → English', date: 'Aug 2',
      body: "Moved here in July. Learning the language.\n\n{{say.youAll}} = you all\n{{say.andSoOn}} = and that, and so on\n{{say.slippery}} = slippery\n{{say.tidyUp}} = clean up\n{{say.nosy}} = nosy\n{{say.rubberBand}} = rubber band\n{{say.jerk}} = you'll know one when you meet one\n\nAlso: making a left turn the second the light turns green before oncoming traffic goes is apparently legal here? (It is not.)",
    },
    {
      id: 'n-home', title: 'Things I miss about {{rival.hometown}}', date: 'Jul 20',
      body: "• Mom's {{food.dumplings}}. (Don't tell anyone here. They're better.)\n• Nobody owning a towel with feelings\n• Being a normal amount of hilly\n\nThings this city got right:\n• The inclines\n• The view from {{places.overlook}}\n• Jen\n• Tash\n• Mikey (some days)",
    },
  ],

  maps: {
    people: [
      {
        id: 'mikey', name: 'Mikey', avatar: '🏈',
        now: { place: '{{venues.laundromat}}', hood: '{{places.laundryHood}}', pin: 'laundry' },
        timeline: [
          { day: 'Yesterday', time: '9:02 PM', place: '{{venues.bar}}', hood: '{{places.barHood}}', pin: 'bar' },
          { day: 'Yesterday', time: '10:44 PM', place: 'Left {{venues.bar}}', hood: '{{places.barStreet}}', pin: 'bar' },
          { day: 'Yesterday', time: '10:58 PM', place: '{{venues.laundromat}}', hood: '{{places.laundryHood}}', pin: 'laundry' },
          { day: 'Today', time: '1:20 AM', place: 'Home', hood: '{{places.homeHood}}', pin: 'home' },
          { day: 'Today', time: '9:05 AM', place: '{{venues.laundromat}}', hood: '{{places.laundryHood}}', pin: 'laundry' },
        ],
      },
    ],
    mine: [
      { day: 'Yesterday', time: '8:50 PM – 11:58 PM', place: '{{venues.bar}}', hood: '{{places.barHood}}', pin: 'bar' },
      { day: 'Today', time: '12:10 AM', place: 'Top of the {{places.incline}}', hood: '{{places.overlook}}', pin: 'overlook' },
    ],
  },

  // Live messages. `after` is a trigger: start, unlock, open:<app>, view:<photoId>, solved.
  events: [
    { id: 'e-tash-1', after: 'start', delay: 2500, thread: 'tash', from: 'tash', text: 'DANA. call me' },
    {
      id: 'e-tash-2', after: 'start', delay: 9000, thread: 'tash', from: 'tash',
      variants: [
        { when: 'rain', text: "it's pouring and {{venues.barOwner}} is STILL out front yelling about the towel. where are you" },
        { when: 'snow', text: "it's snowing and {{venues.barOwner}} is out front shoveling and yelling about the towel at the same time. where are you" },
        { when: 'cold', text: "it's {{weather.temp}}° out and {{venues.barOwner}} is out front yelling about the towel anyway. where are you" },
        { text: '{{venues.barOwner}} is out front yelling about the towel at anyone who walks by. where are you' },
      ],
    },
    { id: 'e-jen-1', after: 'start', delay: 17000, thread: 'group', from: 'jen', text: "has anyone heard from Dana?? she's not answering" },

    { id: 'e-tash-3', after: 'unlock', delay: 3000, thread: 'tash', from: 'tash', text: 'wait. it says Read.' },
    { id: 'e-tash-4', after: 'unlock', delay: 6500, thread: 'tash', from: 'tash', text: "Dana?? or whoever has Dana's phone??" },
    { id: 'e-tash-5', after: 'unlock', delay: 12000, thread: 'tash', from: 'tash', text: "ok if you found it: hi. Dana's the {{rival.team}} fan the whole {{places.barHood}} is mad at today. somebody took the signed {{home.relic}} off our wall last night and everybody thinks it was her" },
    { id: 'e-tash-6', after: 'unlock', delay: 19000, thread: 'tash', from: 'tash', text: "she didn't do it. but {{venues.barOwner}} bans her for life unless we figure out who did by close. her phone might show something. help a {{say.local}} out? (or a {{rival.team}} fan. whatever she is)" },
    { id: 'e-tash-7', after: 'unlock', delay: 24000, thread: 'tash', from: 'tash', text: 'if you figure it out, text me here. who took it and where it is' },
    {
      id: 'e-mom-1', after: 'unlock', delay: 45000, thread: 'mom', from: 'mom',
      variants: [
        { when: 'snow', text: 'Your father saw on the news that it is snowing in {{city.name}} and said "good."' },
        { when: 'rain', text: 'Saw the rain in {{city.name}} on the news. Did you wear a coat. Your father wants to know if they have converted you yet.' },
        { text: 'Your father wants to know if they have converted you yet.' },
      ],
    },
    {
      id: 'e-tash-nudge', after: 'unlock', delay: 240000, nudge: true, thread: 'tash', from: 'tash',
      variants: [
        { when: 'night', text: "it's getting late. {{venues.barOwner}} closes at 2 and he means it" },
        { text: '{{venues.barOwner}} just told a guy who asked for ketchup that "close is the deadline." no pressure 🙃' },
      ],
    },
    { id: 'e-mikey-1', after: 'open:maps', delay: 6000, thread: 'mikey', from: 'mikey', text: 'dana?? your phone says read. is this you' },
    { id: 'e-mikey-2', after: 'open:maps', delay: 11000, thread: 'mikey', from: 'mikey', text: 'ok whatever anybody says: I was not at a laundromat. I have a normal amount of laundry. zero towels' },

    { id: 'e-end-1', after: 'solved', delay: 2000, thread: 'tash', from: 'tash', text: 'MIKEY??' },
    { id: 'e-end-2', after: 'solved', delay: 4500, thread: 'tash', from: 'tash', text: 'calling him rn' },
    { id: 'e-end-3', after: 'solved', delay: 12000, thread: 'tash', from: 'tash', text: 'he answered from INSIDE {{venues.laundromat}}. he spilled a whole pitcher on the towel during the lightning round and panicked' },
    { id: 'e-end-4', after: 'solved', delay: 17000, thread: 'tash', from: 'tash', text: "took Dana's keys out of her coat so he could wash it and sneak it back on the hook before {{venues.barOwner}} noticed. he's on wash #2. the first one \"didn't get the smell out\"" },
    { id: 'e-end-5', after: 'solved', delay: 22000, thread: 'group', from: 'mikey', text: "it's on delicate. I'm not an animal" },
    { id: 'e-end-6', after: 'solved', delay: 26000, thread: 'group', from: 'jen', text: 'you WASHED the towel?? during the SEASON?? per your own RULES??' },
    { id: 'e-end-7', after: 'solved', delay: 30000, thread: 'group', from: 'mikey', text: 'the rules are under review' },
    { id: 'e-end-8', after: 'solved', delay: 34000, thread: 'group', from: 'tash', text: "{{venues.barOwner}} says Dana's not banned. Mikey is buying the next three trivia nights" },
    { id: 'e-end-9', after: 'solved', delay: 40000, thread: 'group', from: 'jen', text: "this is Dana on Jen's phone 🧡🤎 whoever found mine: you just cleared a {{rival.team}} fan's name in the {{places.barHood}}. pretty sure that's never happened before" },
    { id: 'e-end-10', after: 'solved', delay: 45000, thread: 'group', from: 'jen', text: "I'm at the top of the {{places.incline}}. bring my phone and I'm buying you {{food.sandwich}}", ending: true },
  ],

  accusation: {
    thread: 'tash',
    prompt: 'Tell Tash what happened',
    message: 'It was {suspect}. The towel is {place}.',
    suspects: [
      { id: 'dana', label: 'Dana', reply: "it wasn't Dana. she's in the winners selfie and she was here till almost midnight. try again" },
      { id: 'jen', label: 'Jen', reply: "Jen?? she DID take it down for a picture, but she swears she put it back. if there's a pic of it back on the wall after, she's in the clear" },
      { id: 'mikey', label: 'Mikey' },
      { id: 'owner', label: '{{venues.barOwner}} (the owner)', says: '{{venues.barOwner}}', reply: '{{venues.barOwner}} was in the back doing the books all night. I know because I brought him three coffees and he complained about all three' },
      { id: 'ravens', label: 'Some random Ravens fan', says: 'some random Ravens fan', reply: "there was ONE Ravens fan here and he left after round two because he didn't know what a pierogi was. not him" },
    ],
    places: [
      { id: 'bar', label: 'Still somewhere in the bar', phrase: 'still in the bar', reply: "I've torn this place apart. it's not in the bar" },
      { id: 'car', label: "In Dana's car", phrase: "in Dana's car", reply: "Dana's car is on {{places.barStreet}} with nothing in it but {{rival.team}} napkins. not there" },
      { id: 'laundry', label: '{{venues.laundromat}}, {{places.laundryHood}}', phrase: 'at {{venues.laundromat}} in {{places.laundryHood}}' },
      { id: 'rival', label: 'On its way to {{rival.city}}', phrase: 'on its way to {{rival.city}}', reply: 'nobody drives to {{rival.city}} on purpose. try again' },
    ],
    answer: { suspect: 'mikey', place: 'laundry' },
    rightSuspectWrongPlace: "Mikey?? ok... that tracks, he's been dodging me all day. but it's not there. where'd he go?",
  },

  hints: {
    locked: [
      "Dana's wallpaper is from the best night of her fan life. The passcode is that game's final score, {{rival.team}} points first.",
      'The wallpaper is from {{rival.bestDay.date}}: {{rival.bestDay.label}}.',
      'The passcode is {{rival.bestDay.code}} ({{rival.bestDay.score}}).',
    ],
    investigating: [
      'Open Photos and go through trivia night in order. Each photo shows its time at the top; tap ⓘ to see who is in it.',
      'The towel is back on the wall at 10:31 and gone by 10:47. Who is missing from the 10:47 photo?',
      'Check Maps → People to see where that person went after leaving the bar.',
      'It was Mikey, and the towel is at {{venues.laundromat}} in {{places.laundryHood}}. Tell Tash in Messages.',
    ],
  },

  ending: {
    title: 'Case closed',
    body: "Dana's name is cleared. Mikey has some explaining to do. The towel is on delicate.",
    next: 'A new case every week of the season.',
  },
};
