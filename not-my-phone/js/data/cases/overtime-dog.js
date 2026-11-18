// Week 1: Overtime Dog. Lions 31, Saints 30 (OT), Sunday, September 13.
// Text uses {{...}} placeholders filled from the city pack (see js/data/cities/).
// The game and its stats are real; the people, the dog and what happened are fiction.
//
// Nobody knows a stranger has Mari's phone. Her sister finds out when the player opens her
// thread ("Read"), and the player decides what to say (see `replies`). A Lions fan texts the
// number on the dog's tag, thinking it's Mari.
window.FP = window.FP || { cities: {}, cases: {} };

FP.cases['overtime-dog'] = {
  id: 'overtime-dog',
  number: 3,
  title: 'Overtime Dog',
  owner: 'Mari',
  ownerId: 'mari',
  ownerAvatar: '⚜️',
  barSign: ['BRUSH ST', 'SOCIAL'],

  // This phone's home screen. Find My is where the case lives.
  apps: ['messages', 'findmy', 'photos', 'notes', 'maps', 'weather'],

  // The dog in the photos (see scenes.js).
  dog: { coat: '#c8a06a', dark: '#8a6a3f', bandana: '#D3BC8D' },

  // Who's in the photos, dressed by role (see scenes.js).
  cast: {
    mari: { role: 'rival', hair: '#1b1b1b', skin: '#c68e63', ponytail: true },
    ron: { role: 'home', hair: '#9a9a9a', skin: '#f1c7a5', beard: true },
  },

  intro: {
    lines: [
      'You found a phone in a flower bed on {{places.coneyStreet}}, between two coney places that are not speaking to each other.',
      "Its lock screen is a dog in a bandana. It won't stop buzzing.",
    ],
    disclaimer: 'The game and the score are real. The people, the dog and what happened are fiction. The city, the weather and the clock are live.',
  },

  lock: {
    code: '0902',
    wallpaper: 'p-wallpaper',
    hint: "Passcode hint: my best boy's birthday 🐶",
  },

  contacts: {
    gabi: { name: 'Gabi', avatar: '👯', color: '#7a4fbf' },
    tre: { name: 'Tre', avatar: '🎺', color: '#101820' },
    lou: { name: 'Lou', avatar: '🦐', color: '#D3BC8D' },
    vet: { name: 'Crescent City Animal Clinic', avatar: '🐾', color: '#2f6f5e' },
    ron: { name: '(313) 555-0187', avatar: '❔', color: '#8e8e93' },
  },

  threads: [
    {
      id: 'gabi',
      title: 'Gabi',
      contact: 'gabi',
      history: [
        { day: 'Saturday', time: '3:20 PM', from: 'gabi', text: 'did you make it?? send Beignet pics' },
        { day: 'Saturday', time: '3:21 PM', from: 'mari', text: '15 hours in the car and he is acting like he invented Detroit' },
        { day: 'Saturday', time: '3:22 PM', from: 'mari', text: 'first stop: the Riverwalk, so he could stare at Canada. it is SOUTH of here gabi. Canada is south' },
        { day: 'Yesterday', time: '1:05 PM', from: 'mari', text: 'a Lions fan named Ron has booed Beignet twice. BOOED A DOG' },
        { day: 'Yesterday', time: '1:06 PM', from: 'gabi', text: 'fight him' },
        { day: 'Yesterday', time: '4:33 PM', from: 'mari', text: 'BEIGNET GOT OUT. the patio went crazy at the end and he slipped his harness' },
        { day: 'Yesterday', time: '4:34 PM', from: 'mari', text: "I'm chasing him" },
        { day: 'Yesterday', time: '5:12 PM', from: 'mari', text: 'lost him near the coney places on {{places.coneyStreet}}' },
        { day: 'Yesterday', time: '5:40 PM', from: 'gabi', text: 'MARI?? call me' },
      ],
    },
    {
      id: 'group',
      title: 'Who Dat Road Trip ⚜️',
      members: ['tre', 'lou'],
      history: [
        { day: 'Yesterday', time: '12:58 PM', from: 'mari', text: 'found a dog-friendly patio by the stadium. Beignet and I are the only {{rival.team}} fans here' },
        { day: 'Yesterday', time: '2:47 PM', from: 'tre', text: "Shough is COOKING. Olave can't be covered by anybody in this building" },
        { day: 'Yesterday', time: '4:12 PM', from: 'lou', text: "overtime?? I can't breathe" },
        { day: 'Yesterday', time: '4:30 PM', from: 'tre', text: '31–30. in overtime. 410 yards and we LOSE' },
        { day: 'Yesterday', time: '4:31 PM', from: 'lou', text: "I'm lying on the floor" },
        { day: 'Yesterday', time: '4:35 PM', from: 'mari', text: "BEIGNET RAN OFF. the patio went insane at the end and he bolted. if you don't hear from me it's because I'm chasing a dog through downtown Detroit" },
      ],
    },
    {
      id: 'vet',
      title: 'Crescent City Animal Clinic',
      contact: 'vet',
      history: [
        { day: 'Aug 30', time: '9:00 AM', from: 'vet', text: 'Reminder: Beignet is due for his yearly checkup. Reply YES to book.' },
        { day: 'Aug 30', time: '9:14 AM', from: 'mari', text: 'YES! after our road trip' },
      ],
    },
    // A new number: someone texting the number on the dog's tag. Hidden until he texts.
    { id: 'ron', title: '(313) 555-0187', contact: 'ron', history: [] },
  ],

  // Newest first, like a camera roll.
  photos: [
    {
      id: 'p-final', day: 'Yesterday', time: '4:30 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Ron', 'Mari', 'Beignet'],
      scene: { type: 'bar', tv: ['DET 31', 'NO 30 · OT'], people: [{ who: 'ron', x: 86, pose: 'cheer' }, { who: 'mari', x: 168 }, { who: 'dog', x: 220 }] },
      alt: 'The final whistle on the patio: the loud Lions guy (Ron) celebrating under the TV, Lions 31, Saints 30 in overtime. Mari slumped. Beignet, ears flat, about to make a run for it.',
    },
    {
      id: 'p-patio', day: 'Yesterday', time: '12:58 PM',
      place: '{{venues.bar}}, {{places.barHood}}', people: ['Mari', 'Beignet'],
      scene: { type: 'bar', tv: ['KICKOFF', 'NO @ DET'], people: [{ who: 'mari', x: 130 }, { who: 'dog', x: 186 }] },
      alt: 'Kickoff on the dog-friendly patio: Mari in her {{rival.team}} jersey, Beignet in his bandana. The only two {{rival.team}} fans in the place.',
    },
    {
      id: 'p-coney', day: 'Yesterday', time: '11:32 AM',
      place: '{{venues.coney}}, {{places.coneyStreet}}', people: [],
      scene: { type: 'food', dish: 'coney' },
      alt: "Two coneys from {{venues.coney}}: {{food.coneyFull}}. One was for Beignet (don't tell the vet).",
    },
    {
      id: 'p-lobby', day: 'Saturday', time: '8:04 PM',
      place: '{{venues.hotel}}, {{places.hotelHood}}', people: ['Mari', 'Beignet'],
      scene: { type: 'selfie', bg: 'lobby', people: [{ who: 'mari', x: 120 }, { who: 'dog', x: 190 }] },
      alt: 'Checking in at {{venues.hotel}}. The front desk gave Beignet a biscuit and he decided he lives here now.',
    },
    {
      id: 'p-market', day: 'Saturday', time: '5:31 PM',
      place: '{{places.market}}', people: ['Mari', 'Beignet'],
      scene: { type: 'selfie', bg: 'market', people: [{ who: 'mari', x: 120 }, { who: 'dog', x: 190 }] },
      alt: '{{places.market}}. Beignet ate half {{food.donut}} off the ground and regrets nothing.',
    },
    {
      id: 'p-riverwalk', day: 'Saturday', time: '3:12 PM',
      place: '{{places.riverwalk}}', people: ['Beignet'],
      scene: { type: 'riverwalk', dog: true },
      alt: "First stop after 15 hours in the car: {{places.riverwalk}}. Beignet's first look at Canada, which is south of here. Detroit is weird.",
    },
    {
      id: 'p-wallpaper', day: 'Sep 2', time: '10:15 AM',
      place: '{{rival.hometown}}', people: ['Beignet'],
      scene: { type: 'pet' },
      alt: 'Beignet on his 4th birthday, in his {{rival.team}} bandana, extremely pleased with himself.',
    },
  ],

  notes: [
    {
      id: 'n-trip', title: 'ROAD TRIP: {{rival.team}} at Detroit ⚜️', date: 'Sep 1',
      body: "SATURDAY\nLeave at midnight. 15 hours. Gabi says that's insane. Gabi is not invited.\n• Get in: walk Beignet on {{places.riverwalk}} first (stretch, pee, look at Canada)\n• {{places.market}} for dinner + donuts\n• Check in at {{venues.hotel}} in {{places.hotelHood}} (dogs OK!!)\n\nSUNDAY\n• Coneys for breakfast. {{venues.coney}} and {{venues.otherConey}} are right next door to each other and people get WEIRD about which one. Pick a side.\n• Game at {{venues.bar}}: dog-friendly patio, big TVs, 1:00 kickoff\n\nMONDAY\n• Drive home. Cry if we lose. Cry if we win.",
    },
    {
      id: 'n-beignet', title: 'Beignet facts (for the dog sitter)', date: 'Jun 12',
      body: "• Escape artist. Can get out of any harness in under 4 seconds.\n• When he gets lost, he goes back to the places he's been, in reverse order, until he finds you. Every time. The vet calls it retracing. Gabi calls it rewinding.\n• If he gets all the way back to where we started and nobody's there, he starts the whole loop over. (That's how we lost a whole day at Jazz Fest.)\n• Loves: food on the ground, hotel front desks, Gabi.\n• Hates: loud cheering (unless it's for the {{rival.team}}).",
    },
  ],

  maps: {
    people: [],
    // Find My: Beignet's collar tag, seen whenever a phone passes near it.
    items: [
      {
        id: 'beignet', name: "Beignet's tag", avatar: '🐶',
        note: 'Lost Mode is on. "Hi! I\'m Beignet. I\'m lost but I\'m probably fine. Please call my mom."',
        history: [
          { day: 'Yesterday', time: '4:31 PM', place: '{{venues.bar}}', hood: '{{places.barHood}}', pin: 'bar' },
          { day: 'Yesterday', time: '5:08 PM', place: '{{venues.coney}}', hood: '{{places.coneyStreet}}', pin: 'coney' },
          { day: 'Today', time: '2:14 AM', place: '{{venues.hotel}}', hood: '{{places.hotelHood}}', pin: 'hotel' },
        ],
      },
    ],
    mine: [
      { day: 'Saturday', time: '3:10 PM', place: '{{places.riverwalk}}', hood: '{{places.river}}', pin: 'riverwalk' },
      { day: 'Saturday', time: '5:20 PM', place: '{{places.market}}', hood: 'Detroit', pin: 'market' },
      { day: 'Saturday', time: '7:55 PM', place: '{{venues.hotel}}', hood: '{{places.hotelHood}}', pin: 'hotel' },
      { day: 'Yesterday', time: '11:25 AM', place: '{{venues.coney}}', hood: '{{places.coneyStreet}}', pin: 'coney' },
      { day: 'Yesterday', time: '12:50 PM – 4:31 PM', place: '{{venues.bar}}', hood: '{{places.barHood}}', pin: 'bar' },
      { day: 'Yesterday', time: '5:15 PM', place: '{{places.coneyStreet}}', hood: 'Downtown', pin: 'coney' },
    ],
  },

  // What the player can say, and when (see the quick replies in engine.js).
  replies: [
    {
      id: 'r-who', thread: 'gabi', after: 'e-gabi-r2', quiet: 45000,
      options: [
        { id: 'found', text: 'Not Mari, sorry. I found this phone in a flower bed on {{places.coneyStreet}}' },
        { id: 'who', text: 'Who is this?' },
      ],
    },
    {
      id: 'r-who2', thread: 'gabi', after: 'e-gabi-w2', quiet: 45000,
      options: [{ id: 'found', text: "I found it in a flower bed on {{places.coneyStreet}}. I'm trying to get it back to her" }],
    },
    {
      id: 'r-who3', thread: 'gabi', after: 'e-gabi-q2', quiet: 60000,
      options: [{ id: 'found', text: "Sorry! I'm not Mari. I found this phone on {{places.coneyStreet}}" }],
    },
    {
      id: 'r-dog', thread: 'gabi', after: 'e-gabi-c2', quiet: 30000,
      options: [
        { id: 'none', text: 'Just the phone. No dog.' },
        { id: 'what', text: 'What dog?' },
      ],
    },
    {
      id: 'r-desk', thread: 'gabi', after: 'e-gabi-desk', quiet: 60000,
      options: [
        { id: 'drop', text: "Of course. I'll drop it off" },
        { id: 'look', text: 'I will. Can I help look for him too?' },
      ],
    },
    {
      id: 'r-ron', thread: 'ron', after: 'e-ron-4',
      options: [
        { id: 'truth', text: "This isn't Mari. I found her phone. But thank you!" },
        { id: 'pretend', text: 'Thanks, Ron 🖤💛' },
      ],
    },
    // After the answer: Gabi doesn't have Ron's number, so the player texts him. Shows in
    // Ron's thread once Gabi asks.
    {
      id: 'r-go', thread: 'ron', after: 'e-end-3', quiet: 60000,
      options: [{ id: 'go', text: "Beignet is headed for {{places.riverwalk}}. You're closest. Can you get there?" }],
    },
    // If Mari catches him herself, Ron checks in.
    {
      id: 'r-ron-news', thread: 'ron', after: 'e-ron-n1',
      options: [{ id: 'found', text: 'Mari found him! He is fine' }],
    },
  ],

  // Live messages (and pings). `after` is a trigger (or a list: whichever comes first):
  // start, unlock, open:<app>, read:<thread>, view:<photoId>, reply:<prompt>[:<option>],
  // quiet:<prompt>, solved.
  events: [
    // On the lock screen. Everyone is writing to Mari.
    { id: 'e-vet-1', after: 'start', delay: 2500, thread: 'vet', from: 'vet', text: '🎂 Beignet turned 4 on 9/2! He is due for his yearly checkup. Reply YES to book.' },
    { id: 'e-gabi-0', after: 'start', delay: 10000, thread: 'gabi', from: 'gabi', text: 'MARI. call me. are you ok' },
    { id: 'e-lou-1', after: 'start', delay: 18000, thread: 'group', from: 'lou', text: 'any news on Beignet??' },
    { id: 'e-gabi-0b', after: 'start', delay: 26000, thread: 'gabi', from: 'gabi', text: "the hotel guy says you were out searching all night?? you need to SLEEP" },

    // Ron texts the number on the dog's tag. He thinks it's Mari.
    { id: 'e-ron-1', after: 'unlock', delay: 35000, thread: 'ron', from: 'ron', text: "hey. is this the number on the little brown dog's tag? {{rival.team}} bandana, zero respect for personal property" },
    { id: 'e-ron-2', after: 'unlock', delay: 40000, thread: 'ron', from: 'ron', text: "it's Ron. from the patio. yes THAT Ron. no hard feelings. your team played great. you still lost" },
    { id: 'e-ron-3', after: 'unlock', delay: 45000, thread: 'ron', from: 'ron', text: 'saw him last night outside {{venues.coney}}. he took half my coney and ran' },
    {
      id: 'e-ron-4', after: 'unlock', delay: 50000, thread: 'ron', from: 'ron',
      variants: [
        { when: 'rain', text: "I'm out for my morning run (yes, in this rain). down at {{places.plaza}} by the river right now. I'll keep an eye out. if you know where he's headed, say the word" },
        { when: 'cold', text: "I'm out for my morning run. it's {{weather.temp}}° and I'm in shorts, don't say anything. down at {{places.plaza}} by the river right now. I'll keep an eye out. if you know where he's headed, say the word" },
        { text: "I'm out for my morning run. down at {{places.plaza}} by the river right now. I'll keep an eye out. if you know where he's headed, say the word" },
      ],
    },
    { id: 'e-ron-t1', after: 'reply:r-ron:truth', delay: 2000, thread: 'ron', from: 'ron', text: 'oh. huh. ok' },
    { id: 'e-ron-t2', after: 'reply:r-ron:truth', delay: 2500, thread: 'ron', from: 'ron', text: "well whoever you are: I'm at {{places.plaza}} doing stretches. if anybody figures out where that dog is going, I'm the closest thing to a search party" },
    { id: 'e-ron-p1', after: 'reply:r-ron:pretend', delay: 2000, thread: 'ron', from: 'ron', text: 'anytime. still can\'t believe you brought a dog to a Lions game. respect' },

    // Opening Gabi's thread: she sees "Read".
    { id: 'e-gabi-r1', after: 'read:gabi', delay: 2500, thread: 'gabi', from: 'gabi', text: 'wait. it says Read' },
    { id: 'e-gabi-r2', after: 'read:gabi', delay: 3000, thread: 'gabi', from: 'gabi', text: 'Mari?? you found your phone??' },

    { id: 'e-gabi-w1', after: 'reply:r-who:who', delay: 1500, thread: 'gabi', from: 'gabi', text: "I'm her SISTER. who is THIS" },
    { id: 'e-gabi-w2', after: 'reply:r-who:who', delay: 2000, thread: 'gabi', from: 'gabi', text: 'and why do you have her phone' },

    { id: 'e-gabi-q1', after: ['quiet:r-who', 'quiet:r-who2'], delay: 500, thread: 'gabi', from: 'gabi', text: 'hello?? I can see you reading this' },
    { id: 'e-gabi-q2', after: ['quiet:r-who', 'quiet:r-who2'], delay: 1000, thread: 'gabi', from: 'gabi', text: "if you're not Mari: you have my sister's phone. please just talk to me" },
    { id: 'e-gabi-alt1', after: 'quiet:r-who3', delay: 500, thread: 'gabi', from: 'gabi', text: 'ok. whoever you are. her dog is missing and that phone was the only thing tracking him' },
    { id: 'e-gabi-desk-alt', after: 'quiet:r-who3', delay: 1000, thread: 'gabi', from: 'gabi', text: "please leave it at the front desk of {{venues.hotel}} in {{places.hotelHood}}. she's there, waiting by the phone" },

    { id: 'e-gabi-c1', after: ['reply:r-who:found', 'reply:r-who2', 'reply:r-who3'], delay: 1500, thread: 'gabi', from: 'gabi', text: 'oh thank god' },
    { id: 'e-gabi-c2', after: ['reply:r-who:found', 'reply:r-who2', 'reply:r-who3'], delay: 2000, thread: 'gabi', from: 'gabi', text: "is she ok?? wait, you wouldn't know. is the DOG with you??" },

    { id: 'e-gabi-d0', after: 'reply:r-dog:what', delay: 1500, thread: 'gabi', from: 'gabi', text: "Beignet. her dog. the love of her life. sorry, I'm a mess" },
    { id: 'e-gabi-d1', after: ['reply:r-dog', 'quiet:r-dog'], delay: 3000, thread: 'gabi', from: 'gabi', text: 'he ran off after the game yesterday. slipped his harness when the patio went nuts in overtime' },
    { id: 'e-gabi-d2', after: ['reply:r-dog', 'quiet:r-dog'], delay: 3500, thread: 'gabi', from: 'gabi', text: "his collar tag pings whenever a phone goes past him. she's been chasing the pings all night and he's gone every time she gets there" },
    { id: 'e-gabi-d3', after: ['reply:r-dog', 'quiet:r-dog'], delay: 4000, thread: 'gabi', from: 'gabi', text: 'and then she lost her phone. which is the thing that SHOWS the pings' },
    { id: 'e-gabi-desk', after: ['reply:r-dog', 'quiet:r-dog'], delay: 4500, thread: 'gabi', from: 'gabi', text: "she's at {{venues.hotel}} in {{places.hotelHood}} right now, sitting by the front desk phone in case anybody calls about him. could you drop it off there?" },

    { id: 'e-gabi-k1', after: 'reply:r-desk:drop', delay: 2000, thread: 'gabi', from: 'gabi', text: "thank you. seriously. I've been yelling at strangers all morning" },
    { id: 'e-gabi-k2', after: 'reply:r-desk:look', delay: 2000, thread: 'gabi', from: 'gabi', text: 'honestly? yes. she has had zero sleep and she just keeps running to the last ping' },
    { id: 'e-gabi-k3', after: 'reply:r-desk:look', delay: 2500, thread: 'gabi', from: 'gabi', text: "if you can make ANY sense of where he's going, tell me and I'll pass it on" },

    // A new sighting. Until it comes in, a player who reads the pattern can get someone to
    // the market ahead of him; after it, the only stop left is the Riverwalk. Called off if
    // he's caught first.
    { id: 'e-ping-1', after: ['reply:r-desk', 'quiet:r-desk', 'quiet:r-who3'], delay: 240000, unless: 'solved', ping: { item: 'beignet', place: '{{places.market}}', hood: 'by the sheds', pin: 'market' } },
    { id: 'e-gabi-m1', after: ['reply:r-desk', 'quiet:r-desk', 'quiet:r-who3'], delay: 255000, nudge: true, unless: 'solved', thread: 'gabi', from: 'gabi', text: "Mari just called. somebody at {{places.market}} saw a little dog in a bandana by the sheds. she's running over there" },
    { id: 'e-gabi-m2', after: ['reply:r-desk', 'quiet:r-desk', 'quiet:r-who3'], delay: 400000, nudge: true, unless: 'solved', thread: 'gabi', from: 'gabi', text: 'she got there. no Beignet. one stop behind AGAIN' },
    { id: 'e-gabi-m3', after: ['reply:r-desk', 'quiet:r-desk', 'quiet:r-who3'], delay: 520000, nudge: true, unless: 'solved', thread: 'gabi', from: 'gabi', text: 'she keeps saying he\'s "rewinding." I wrote that in her dog sitter notes like a year ago and I still don\'t know what to do with it' },

    // The answer. Gabi takes some convincing either way.
    { id: 'e-end-1', after: 'solved', delay: 2500, thread: 'gabi', from: 'gabi', text: 'wait. how could you possibly know that' },
    { id: 'e-end-2', after: 'solved', delay: 3000, thread: 'gabi', from: 'gabi', text: "...oh my god. the notes. he goes back to every place he's been, backwards. he's rewinding the whole TRIP" },

    // Ron at the Riverwalk: the player has to text him.
    { id: 'e-end-3', after: 'solved:ron', delay: 3500, thread: 'gabi', from: 'gabi', text: "and patio Ron is right there?? I don't have his number. can you text him??" },
    { id: 'e-end-q1', after: 'quiet:r-go', delay: 500, thread: 'gabi', from: 'gabi', text: "did you text Ron?? he's the 313 number" },

    { id: 'e-ron-g1', after: 'reply:r-go', delay: 2500, thread: 'ron', from: 'ron', text: 'on it. jogging east' },
    { id: 'e-ron-g2', after: 'reply:r-go', delay: 3000, thread: 'ron', from: 'ron', text: "small brown dog. {{rival.team}} bandana. sitting at the railing, staring at {{places.across}} like he's waiting for somebody" },
    { id: 'e-ron-g3', after: 'reply:r-go', delay: 3500, thread: 'ron', from: 'ron', text: 'GOT HIM. he licked my whole face and then tried to steal my water bottle' },
    {
      id: 'e-ron-g4', after: 'reply:r-go', delay: 4000, thread: 'ron', from: 'ron',
      variants: [
        { when: 'reply:r-ron:pretend', text: 'ok so I called the hotel to tell Mari, and Mari picked up. so who have I been texting all morning' },
        { text: "the hotel's sending Mari down. we'll wait right here" },
      ],
    },
    { id: 'e-gabi-g1', after: 'reply:r-go', delay: 30000, thread: 'gabi', from: 'gabi', text: 'Ron just sent me a picture. I am crying at work. thank you, whoever you are' },
    { id: 'e-lou-g1', after: 'reply:r-go', delay: 36000, thread: 'group', from: 'lou', text: "BEIGNET IS SAFE?? Gabi just told us. I'm not ok but he is" },
    { id: 'e-ron-g5', after: 'reply:r-go', delay: 4500, thread: 'ron', from: 'ron', text: "this is Mari, on Ron's phone 🖤💛 he's here, he's ok, he smells like a coney. whoever found mine: thank you. leave it at the front desk and I owe you {{food.coney}}. from either place. I'm not getting into that", ending: true },

    // Mari gets there first, for once.
    { id: 'e-mari-1', after: 'solved:mari', delay: 3500, thread: 'gabi', from: 'gabi', text: "calling the hotel desk. she's sitting right next to it" },
    {
      id: 'e-mari-2', after: 'solved:mari', delay: 4000, thread: 'gabi', from: 'gabi',
      variants: [
        { when: 'solved:mari:market', text: "she's going. she's RUNNING. she says the market's ten minutes if she cuts through the parking lots" },
        { text: "she's going. the river's five minutes from the hotel. she's RUNNING" },
      ],
    },
    { id: 'e-mari-3', after: 'solved:mari', delay: 4500, thread: 'gabi', from: 'gabi', text: "nothing yet. she's just standing there. I can hear her breathing" },
    {
      id: 'e-mari-4', after: 'solved:mari', delay: 5000, thread: 'gabi', from: 'gabi',
      variants: [
        { when: 'solved:mari:market', text: 'SHE HAS HIM. he came trotting up to the sheds like he had a reservation. he had something in his mouth. it was a donut' },
        { text: 'SHE HAS HIM. he trotted up to the railing, sat down, and looked at Canada like nothing happened' },
      ],
    },
    { id: 'e-lou-m1', after: 'solved:mari', delay: 40000, thread: 'group', from: 'lou', text: "BEIGNET IS SAFE?? Gabi just told us. I'm not ok but he is" },
    { id: 'e-ron-n1', after: 'solved:mari', delay: 30000, nudge: true, thread: 'ron', from: 'ron', text: 'any news on the little guy? still out here doing laps' },
    { id: 'e-ron-n2', after: 'reply:r-ron-news', delay: 2000, thread: 'ron', from: 'ron', text: 'good. tell him he still owes me half a coney' },
    { id: 'e-mari-5', after: 'solved:mari', delay: 5500, thread: 'gabi', from: 'gabi', text: "she says: whoever found her phone, thank you. leave it at the front desk and she owes you {{food.coney}}. from either place. she's not getting into that", ending: true },
  ],

  // Where's Beignet going, and who can beat him there? He's walking the trip backwards, so
  // it depends when you answer. Before the market ping, his next stop is Eastern Market:
  // Mari (at the hotel, close by) can get there first. Anyone can wait at the Riverwalk, where
  // he ends up. After the ping, Mari is one stop behind again, and only Ron is near enough.
  accusation: {
    thread: 'gabi',
    // Only once Gabi has explained what's going on.
    after: ['e-gabi-desk', 'e-gabi-desk-alt'],
    prompt: "Tell Gabi where he's going",
    questions: { suspect: 'Who can get there first?', place: 'Where is Beignet headed?' },
    message: "{suspect} should get to {place}. That's where Beignet is going.",
    suspects: [
      { id: 'ron', label: 'Ron (the Lions fan from the patio)', says: 'Ron, the Lions guy from the patio,' },
      { id: 'mari', label: 'Mari', says: 'Mari' },
      { id: 'gabi', label: 'Gabi (in {{rival.hometown}})', says: 'You', reply: "I'm in {{rival.hometown}}. that's 15 hours away. Mari drove it in one go. I am not Mari" },
      { id: 'desk', label: 'The hotel front desk', says: 'The front desk', reply: "the front desk says they can't leave the desk. it's in the name" },
      { id: 'animal', label: 'Animal control', says: 'Animal control', reply: 'I called them. they said "a small brown dog in a {{rival.team}} bandana" does not narrow it down this week' },
    ],
    places: [
      { id: 'riverwalk', label: '{{places.riverwalk}}', phrase: '{{places.riverwalk}}' },
      { id: 'market', label: '{{places.market}}', phrase: '{{places.market}}' },
      { id: 'hotel', label: '{{venues.hotel}}, {{places.hotelHood}}', phrase: '{{venues.hotel}}', reply: 'he already went back to the hotel last night. the night manager gave him a biscuit. he has moved on from the biscuit' },
      { id: 'coney', label: '{{venues.coney}}, {{places.coneyStreet}}', phrase: '{{venues.coney}}', reply: "he's done the coney place. twice, if you count Ron's lunch" },
      { id: 'stadium', label: '{{home.stadium}}', phrase: '{{home.stadium}}', reply: "he's never been inside {{home.stadium}}. no dogs allowed. he wouldn't know the way" },
    ],
    answers: [
      { id: 'mari', suspect: 'mari', place: 'market', before: 'e-ping-1' },
      { id: 'mari', suspect: 'mari', place: 'riverwalk', before: 'e-ping-1' },
      { id: 'ron', suspect: 'ron', place: 'riverwalk' },
    ],
    // Any other place for Mari or Ron: this, then that place's own reply.
    rightSuspectWrongPlace: 'ok, maybe. but not there',
    // Checked in order; the first that fits is Gabi's reply.
    wrong: [
      { suspect: 'mari', after: 'e-ping-1', reply: "she's at {{places.market}} now, one stop behind him AGAIN. by the time she gets anywhere he'll be gone. who's AHEAD of him?" },
      { suspect: 'mari', place: 'hotel', reply: "she's AT the hotel. he's been and gone. where is he going NEXT?" },
      { suspect: 'ron', place: 'market', before: 'e-ping-1', reply: "Ron's down by the river. the market's two miles the other way. Beignet would beat him there. who's closer?" },
      { place: 'market', after: 'e-ping-1', reply: "he was JUST at {{places.market}}. he's already moved on. where's he going after THAT?" },
    ],
  },

  hints: {
    locked: [
      'Watch the notifications on the lock screen. One of them is about Beignet.',
      'His vet says he turned 4 on 9/2. The passcode is his birthday: month, then day, as four digits.',
      'The passcode is 0902.',
    ],
    investigating: [
      "Mari's sister has been texting all morning and has no idea who has the phone. Open her thread and answer her.",
      "Open Find My and look at Beignet's tag: where has he been seen, and in what order?",
      "Now compare that with the trip itself, oldest first: Mari's Photos and Maps. Then read her notes about Beignet.",
      "He's retracing the trip backwards: the patio, the coney place, the hotel... His next stops are the market, then the Riverwalk, where it all started. Who's near either one? Mari's waiting at the hotel; check every thread for anyone else.",
      "Ron at {{places.riverwalk}} always works: it's where Beignet ends up, and Ron is at {{places.plaza}}, right next to it. If the market ping hasn't come in yet, Mari can beat him to {{places.market}}. Tell Gabi in Messages.",
    ],
  },

  ending: {
    title: 'Good boy',
    body: 'Beignet rewound the whole weekend and ended up right where it started, staring at Canada. Ron got there first. Some rivalries end with a coney.',
    next: 'A new case every week of the season.',
    // How it ends depends on who got there (see accusation.answers).
    variants: [
      { when: 'solved:mari:market', title: 'One step ahead', body: "For once, Mari wasn't one stop behind. You read the pattern before the pings did, and she was waiting at Eastern Market when he trotted in with a donut." },
      { when: 'solved:mari:riverwalk', title: 'Back where it started', body: "Beignet rewound the whole weekend, and this time Mari was waiting at the end of the tape. He acted like he'd planned it." },
    ],
  },
};
