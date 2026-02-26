// ============================================================
// DATA
// ============================================================

const STORAGE_KEY = 'you_side_user_albums_v1';

const ACCENT_COLORS = [
  '#ff2d78', '#7b2fff', '#00e5ff', '#ffcc00',
  '#00ff8c', '#ff6b00', '#ff3366', '#00ccff'
];

const VINYL_COLORS = [
  '#1a0a2e', '#0a1a2e', '#1a2e0a', '#2e1a0a',
  '#1a1a1a', '#0d1520', '#200d15', '#150d20'
];

const COVER_PATTERNS = [
  (color) => `radial-gradient(ellipse at 20% 80%, ${color}dd 0%, ${adjustColor(color, 0.5)} 60%, ${color}88 100%)`,
  (color) => `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, 0.4)} 50%, ${color}aa 100%)`,
  (color) => `radial-gradient(circle at 70% 30%, ${adjustColor(color, 1.2)} 0%, ${color} 50%, #000 100%)`,
  (color) => `conic-gradient(from 45deg, ${color}, ${adjustColor(color, 0.6)}, ${color}88, ${adjustColor(color, 1.3)}, ${color})`,
  (color) => `linear-gradient(45deg, #000 0%, ${color} 40%, ${adjustColor(color, 0.8)} 70%, #000 100%)`,
  (color) => `radial-gradient(ellipse at 50% 50%, ${color} 0%, #000 80%)`
];

function adjustColor(hex, factor) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rr = Math.min(255, Math.floor(r * factor)).toString(16).padStart(2, '0');
  const gg = Math.min(255, Math.floor(g * factor)).toString(16).padStart(2, '0');
  const bb = Math.min(255, Math.floor(b * factor)).toString(16).padStart(2, '0');
  return `#${rr}${gg}${bb}`;
}

const ARCHETYPES = [
  { name: 'The Midnight Wanderer', description: 'You gravitate toward moments that feel private, reflective, and emotionally precise.' },
  { name: 'The Nostalgic Romantic', description: 'You hold memory close and use music to revisit meaning, not just moments.' },
  { name: 'The Kinetic Dreamer', description: 'You process emotion through movement, contrast, and forward momentum.' },
  { name: 'The Quiet Observer', description: 'You listen for texture, detail, and subtle shifts most people miss.' },
  { name: 'The Cathartic Soul', description: 'You use music to metabolize feeling and turn intensity into clarity.' },
  { name: 'The Ecstatic Present', description: 'You value immediacy and immersion: music that pulls you fully into the now.' },
  { name: 'The Introspective Pilgrim', description: 'Your listening habits mirror personal growth over time, season by season.' },
  { name: 'The Sonic Architect', description: 'You build atmosphere first; songs become spaces you inhabit intentionally.' }
];

const TRAITS = [
  { key: 'Emotional Depth', values: ['Surface Dweller', 'Feeling Explorer', 'Deep Diver', 'Oceanic'], icon: '◉' },
  { key: 'Energy Profile', values: ['Meditative', 'Wavelength', 'Kinetic', 'Euphoric'], icon: '◈' },
  { key: 'Sonic Texture', values: ['Crystalline', 'Layered', 'Dense', 'Maximal'], icon: '◆' },
  { key: 'Nostalgia Index', values: ['Present Focus', 'Nostalgic Glow', 'Time Traveler', 'Living Archive'], icon: '◇' }
];

const TITLE_CUES = [
  { keywords: ['midnight', 'night', 'moon', 'after'], cue: 'a late-hour, introspective atmosphere' },
  { keywords: ['heart', 'love', 'hotel', 'memory', 'ghost'], cue: 'an emotional and reflective center' },
  { keywords: ['dance', 'floor', 'club', 'party', 'therapy'], cue: 'release through motion and rhythm' },
  { keywords: ['dream', 'drift', 'entity', 'space', 'ambient'], cue: 'world-building through mood and texture' },
  { keywords: ['gold', 'sun', 'morning', 'rise', 'light'], cue: 'warmth, optimism, and renewal' },
  { keywords: ['storm', 'fire', 'loud', 'electric', 'rush'], cue: 'high voltage intensity and momentum' },
  { keywords: ['home', 'roots', 'inherited', 'family', 'belong'], cue: 'identity, belonging, and personal history' }
];

const GENERIC_TITLE_CUES = [
  'a clear emotional through-line',
  'intentional pacing between highs and lows',
  'a preference for atmosphere over noise',
  'personal storytelling through sonic choices',
  'balance between vulnerability and confidence'
];

const ANALYSIS_OPENERS = [
  'This collection reads as deliberate rather than accidental.',
  'The sequencing suggests someone curating for feeling, not trend-chasing.',
  'The album feels emotionally cohesive, even when the tracks contrast in style.',
  'There is a consistent point of view running through this tracklist.'
];

const ANALYSIS_CLOSERS = [
  'Overall, this is less a playlist and more a self-portrait in sound.',
  'Taken together, these songs describe your values as much as your taste.',
  'The result feels personal, specific, and emotionally literate.',
  'It lands as a coherent identity statement, not a random mix.'
];

const DEFAULT_ALBUMS = [
  {
    id: '1', title: 'Midnight Radio', creator: 'Alex Chen',
    albumNote: 'Late-night drives through empty highways. The feeling of being alone but not lonely - when the world is asleep and the radio is your only companion.',
    vinylColor: '#0a0a1a', labelColor: '#ff2d78', genre: 'Electronic / Ambient',
    date: 'Feb 2026', patternIdx: 0,
    tracks: [
      { title: 'Neon Glow', artist: 'Tycho', duration: '4:23' },
      { title: 'Late Night Tales', artist: 'Four Tet', duration: '5:17' },
      { title: 'Aqueous', artist: 'Jon Hopkins', duration: '6:45' },
      { title: 'Radio Silence', artist: 'Kiasmos', duration: '4:56' }
    ]
  },
  {
    id: '2', title: 'Sunday Mornings', creator: 'Maya Rodriguez',
    albumNote: 'Coffee. Sunlight. Quiet. These are the songs that make me feel like I have all the time in the world. This is what peace sounds like to me.',
    vinylColor: '#0a1a1a', labelColor: '#00e5ff', genre: 'Jazz / Soul',
    date: 'Feb 2026', patternIdx: 1,
    tracks: [
      { title: 'Sunday Morning', artist: 'Maroon 5', duration: '4:04' },
      { title: 'Harvest Moon', artist: 'Neil Young', duration: '5:03' },
      { title: 'Easy Like Sunday Morning', artist: 'Lionel Richie', duration: '4:12' },
      { title: 'Sunday Candy', artist: 'Donnie Trumpet', duration: '4:20' }
    ]
  },
  {
    id: '3', title: 'Heartbreak Hotel', creator: 'Jordan Kim',
    albumNote: 'For everyone who ever needed to cry in the car. This is not just sad - it is cathartic. It is the soundtrack to letting go.',
    vinylColor: '#1a0a1a', labelColor: '#7b2fff', genre: 'Indie / Alternative',
    date: 'Jan 2026', patternIdx: 2,
    tracks: [
      { title: 'Someone Like You', artist: 'Adele', duration: '4:45' },
      { title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28' },
      { title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58' },
      { title: 'Liability', artist: 'Lorde', duration: '2:52' }
    ]
  },
  {
    id: '4', title: 'Dance Floor Therapy', creator: 'Sam Martinez',
    albumNote: 'When words are not enough, we dance. This is my collection of pure, unapologetic joy. Every track has made me forget my problems for at least four minutes.',
    vinylColor: '#1a1a0a', labelColor: '#ffcc00', genre: 'House / Dance',
    date: 'Jan 2026', patternIdx: 3,
    tracks: [
      { title: 'One More Time', artist: 'Daft Punk', duration: '5:20' },
      { title: 'Finally', artist: 'Kings Of Tomorrow', duration: '9:12' },
      { title: 'Losing It', artist: 'Fisher', duration: '7:08' },
      { title: 'Music Sounds Better', artist: 'Stardust', duration: '6:52' }
    ]
  },
  {
    id: '5', title: 'Inherited Dreams', creator: 'Priya Shah',
    albumNote: 'Between two worlds, two languages, two identities. These songs hold space for the complexity of belonging nowhere and everywhere at once.',
    vinylColor: '#0a150a', labelColor: '#00ff8c', genre: 'World / Electronic',
    date: 'Jan 2026', patternIdx: 4,
    tracks: [
      { title: 'Breathe (2 AM)', artist: 'Anna Nalick', duration: '3:41' },
      { title: 'Immigrant Song', artist: 'Led Zeppelin', duration: '2:23' },
      { title: 'Where Is My Mind?', artist: 'Pixies', duration: '3:53' },
      { title: 'Strange', artist: 'Celeste', duration: '3:10' }
    ]
  },
  {
    id: '6', title: 'Golden Hour', creator: 'Theo Nakamura',
    albumNote: 'That specific light at 6pm in summer. The warmth before dark. These songs are that exact feeling, bottled.',
    vinylColor: '#1a0f00', labelColor: '#ff6b00', genre: 'Indie Pop / Folk',
    date: 'Dec 2025', patternIdx: 5,
    tracks: [
      { title: 'Golden Hour', artist: 'JVKE', duration: '3:25' },
      { title: 'Bloom', artist: 'Gracie Abrams', duration: '3:18' },
      { title: 'Ribs', artist: 'Lorde', duration: '3:49' },
      { title: 'Cape Cod Kwassa Kwassa', artist: 'Vampire Weekend', duration: '3:35' }
    ]
  },
  {
    id: '7', title: 'Drifted Entities', creator: 'Felix Morse',
    albumNote: 'Textures, not songs. Atmospheres, not melodies. This is music as architecture - you walk through it, not with it.',
    vinylColor: '#050510', labelColor: '#00ccff', genre: 'Ambient / Experimental',
    date: 'Dec 2025', patternIdx: 0,
    tracks: [
      { title: 'An Ending (Ascent)', artist: 'Brian Eno', duration: '4:18' },
      { title: 'Gemini', artist: 'Floating Points', duration: '11:08' },
      { title: 'Dissolution', artist: 'Rival Consoles', duration: '7:22' },
      { title: 'Motion', artist: 'Nicolas Jaar', duration: '8:05' }
    ]
  },
  {
    id: '8', title: 'Rise', creator: 'Amara Osei',
    albumNote: 'Strength is not the absence of fear. It is showing up anyway. Every song here made me move when I did not want to move.',
    vinylColor: '#15050a', labelColor: '#ff3366', genre: 'R&B / Hip-Hop',
    date: 'Nov 2025', patternIdx: 1,
    tracks: [
      { title: 'Alright', artist: 'Kendrick Lamar', duration: '3:39' },
      { title: 'Glory', artist: 'Common', duration: '4:18' },
      { title: 'Higher', artist: 'Beyonce', duration: '4:22' },
      { title: 'God\'s Plan', artist: 'Drake', duration: '3:19' }
    ]
  }
];

const BASE_POSITIONS = [
  { x: 80, y: 120 }, { x: 550, y: 60 }, { x: 1050, y: 180 }, { x: 1520, y: 80 }, { x: 2050, y: 150 },
  { x: 200, y: 600 }, { x: 750, y: 520 }, { x: 1300, y: 650 }, { x: 1800, y: 550 }, { x: 2300, y: 620 },
  { x: 60, y: 1100 }, { x: 600, y: 1050 }, { x: 1150, y: 1150 }, { x: 1650, y: 1080 }
];

const USER_POSITIONS = [
  { x: 400, y: 1400 }, { x: 900, y: 1350 }, { x: 1400, y: 1500 }, { x: 1950, y: 1420 }
];

// ============================================================
// STATE
// ============================================================

const defaultAlbumIds = new Set(DEFAULT_ALBUMS.map((album) => album.id));
const albums = [...DEFAULT_ALBUMS, ...loadUserAlbums()];

const canvasWrapper = document.getElementById('canvas-wrapper');
const canvas = document.getElementById('canvas');

let camX = -200;
let camY = -80;
let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let velX = 0;
let velY = 0;

let selectedColor = '#ff2d78';
let clickStartX = 0;
let clickStartY = 0;

// ============================================================
// HELPERS
// ============================================================

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickBySeed(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function uid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e8)}`;
}

function safeText(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function normalizeTrack(track) {
  return {
    title: safeText(track?.title).trim(),
    artist: safeText(track?.artist).trim(),
    duration: safeText(track?.duration).trim() || ' - '
  };
}

function normalizeAlbum(raw) {
  const tracks = Array.isArray(raw?.tracks) ? raw.tracks.map(normalizeTrack).filter((track) => track.title) : [];

  return {
    id: String(raw?.id || uid()),
    title: safeText(raw?.title, 'Untitled Album'),
    creator: safeText(raw?.creator, 'Unknown Creator'),
    albumNote: safeText(raw?.albumNote, 'A personal collection.'),
    vinylColor: safeText(raw?.vinylColor, VINYL_COLORS[0]),
    labelColor: safeText(raw?.labelColor, ACCENT_COLORS[0]),
    genre: safeText(raw?.genre, 'Personal Mix'),
    date: safeText(raw?.date, ''),
    patternIdx: Number.isFinite(raw?.patternIdx) ? raw.patternIdx : 0,
    tracks,
    _pos: raw?._pos && Number.isFinite(raw._pos.x) && Number.isFinite(raw._pos.y) ? raw._pos : null,
    _rot: Number.isFinite(raw?._rot) ? raw._rot : null,
    _z: Number.isFinite(raw?._z) ? raw._z : null
  };
}

function loadUserAlbums() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeAlbum);
  } catch (error) {
    console.warn('Failed to load saved albums:', error);
    return [];
  }
}

function saveUserAlbums() {
  const userAlbums = albums
    .filter((album) => !defaultAlbumIds.has(String(album.id)))
    .map((album) => ({ ...album }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userAlbums));
}

function nextTrackNumber() {
  return document.querySelectorAll('.track-input-row').length + 1;
}

function inferTitleCue(title, seed) {
  const lowered = title.toLowerCase();
  for (const rule of TITLE_CUES) {
    if (rule.keywords.some((word) => lowered.includes(word))) {
      return rule.cue;
    }
  }
  return pickBySeed(GENERIC_TITLE_CUES, seed, 17);
}

function buildSeed(album) {
  const trackText = album.tracks
    .map((track) => `${safeText(track.title)}|${safeText(track.artist)}|${safeText(track.duration)}`)
    .join('||');

  return hashString([
    safeText(album.title),
    safeText(album.creator),
    safeText(album.genre),
    safeText(album.albumNote),
    trackText
  ].join('::'));
}

function generatePersonality(album) {
  const seed = buildSeed(album);
  const archetype = pickBySeed(ARCHETYPES, seed, 3);

  const traitValues = TRAITS.map((trait, index) => {
    const traitSeed = hashString(`${seed}-${trait.key}-${index}`);
    return {
      ...trait,
      level: traitSeed % 4,
      percent: 25 + (traitSeed % 75)
    };
  });

  const moodWords = ['melancholic', 'euphoric', 'introspective', 'kinetic', 'nostalgic', 'expansive', 'raw', 'luminous'];
  const moodA = pickBySeed(moodWords, seed, 11);
  const moodB = pickBySeed(moodWords, seed, 29);
  const titleCue = inferTitleCue(album.title, seed);

  const artistNames = [...new Set(album.tracks.map((track) => track.artist).filter(Boolean))];
  const artistFragment = artistNames.length > 0
    ? `Reference points in this set include ${artistNames.slice(0, 3).join(', ')}${artistNames.length > 3 ? ', and others' : ''}. `
    : '';

  const opener = pickBySeed(ANALYSIS_OPENERS, seed, 7);
  const closer = pickBySeed(ANALYSIS_CLOSERS, seed, 23);

  const analysis = `${archetype.description}

${opener} Based on the title "${album.title}", the overall tone leans toward ${titleCue}. ${artistFragment}Across the track choices, the emotional pattern shifts between ${moodA} and ${moodB}, which usually indicates a listener who values emotional range and intentional curation.

The profile suggests strong self-awareness: you are not listening passively, you are using music to regulate focus, memory, and mood. ${closer}`;

  return { archetype, traitValues, analysis };
}

function makeGroovesHTML(count = 22, spacing = 1.9) {
  return Array.from({ length: count }, (_, i) => {
    const s = 3 + i * spacing;
    return `<div class="groove-ring" style="width:${100 - s * 2}%;height:${100 - s * 2}%;"></div>`;
  }).join('');
}

function makeVinylHTML(album) {
  const pattern = COVER_PATTERNS[album.patternIdx % COVER_PATTERNS.length](album.labelColor);

  return `
    <div class="vinyl-item" data-id="${album.id}" style="left:${album._pos.x}px;top:${album._pos.y}px;transform:rotate(${album._rot}deg);z-index:${album._z};">
      <div style="display:flex;align-items:center;position:relative;">
        <div class="album-cover" style="background:${pattern};">
          <div class="cover-inner">
            <div>
              <div class="cover-title">${album.title}</div>
              <div class="cover-creator" style="margin-top:4px;">${album.creator}</div>
            </div>
            <div class="cover-genre">${album.genre || ''}</div>
          </div>
        </div>
        <div class="vinyl-record" style="background:radial-gradient(circle at 40% 40%, #2a2a3a, ${album.vinylColor});">
          <div class="vinyl-grooves">${makeGroovesHTML()}</div>
          <div class="vinyl-label" style="background:${album.labelColor};">
            <div class="vinyl-hole"></div>
          </div>
          <div class="vinyl-shine"></div>
        </div>
      </div>
    </div>`;
}

function updateCanvas() {
  canvas.style.transform = `translate(${camX}px, ${camY}px)`;
}

function ensureAlbumPlacement(album, index) {
  if (album._pos && Number.isFinite(album._pos.x) && Number.isFinite(album._pos.y)) {
    album._rot = Number.isFinite(album._rot) ? album._rot : (Math.random() - 0.5) * 14;
    album._z = Number.isFinite(album._z) ? album._z : Math.floor(Math.random() * 10) + 1;
    return;
  }

  const base = BASE_POSITIONS[index] || {
    x: 200 + (index % 4) * 500,
    y: 200 + Math.floor(index / 4) * 500
  };

  album._pos = { x: base.x, y: base.y };
  album._rot = (Math.random() - 0.5) * 14;
  album._z = Math.floor(Math.random() * 10) + 1;
}

function renderAlbums() {
  albums.forEach((album, index) => ensureAlbumPlacement(album, index));
  canvas.innerHTML = albums.map(makeVinylHTML).join('');
}

function openAlbumModal(id) {
  const album = albums.find((item) => item.id === id);
  if (!album) return;

  const heroEl = document.getElementById('modal-hero');
  heroEl.style.background = `linear-gradient(135deg, ${album.labelColor}18 0%, transparent 60%)`;
  heroEl.style.borderBottom = `1px solid ${album.labelColor}30`;

  const vinylEl = document.getElementById('modal-vinyl');
  const groovesEl = document.getElementById('modal-vinyl-grooves');
  const labelEl = document.getElementById('modal-vinyl-label');
  vinylEl.style.background = `radial-gradient(circle at 40% 40%, #2a2a3a, ${album.vinylColor})`;
  groovesEl.innerHTML = makeGroovesHTML(18, 2.2);
  labelEl.style.background = album.labelColor;
  document.getElementById('modal-vinyl-section').style.background = `radial-gradient(circle at 50% 50%, ${album.labelColor}15 0%, transparent 70%)`;

  const titleEl = document.getElementById('modal-title');
  titleEl.textContent = album.title;
  titleEl.style.background = `linear-gradient(90deg, ${album.text || '#f0ece4'}, ${album.labelColor})`;
  titleEl.style.webkitBackgroundClip = 'text';
  titleEl.style.webkitTextFillColor = 'transparent';

  document.getElementById('modal-creator').textContent = `By ${album.creator} - ${album.date || ''}`;

  const genreEl = document.getElementById('modal-genre');
  genreEl.textContent = album.genre || 'Personal Mix';
  genreEl.style.borderColor = `${album.labelColor}50`;
  genreEl.style.color = album.labelColor;
  document.getElementById('modal-note').textContent = album.albumNote;

  const tracklistEl = document.getElementById('modal-tracklist');
  tracklistEl.innerHTML = album.tracks.map((track, index) => `
    <div class="track-row">
      <div class="track-num">${String(index + 1).padStart(2, '0')}</div>
      <div class="track-info">
        <div class="track-title">${track.title}</div>
        <div class="track-artist">${track.artist || 'Unknown Artist'}</div>
      </div>
      <div class="track-duration">${track.duration || '-'}</div>
    </div>`).join('');

  const { archetype, traitValues, analysis } = generatePersonality(album);

  const cardEl = document.getElementById('personality-card');
  cardEl.innerHTML = traitValues.map((trait) => `
    <div class="personality-trait" style="border-color:${album.labelColor}20;">
      <div class="trait-glow" style="background:${album.labelColor};"></div>
      <div class="trait-name">${trait.icon} ${trait.key}</div>
      <div class="trait-value" style="color:${album.labelColor};">${trait.values[trait.level]}</div>
      <div class="trait-bar">
        <div class="trait-fill" style="width:${trait.percent}%;background:${album.labelColor};"></div>
      </div>
    </div>`).join('');

  const existingBadge = document.getElementById('archetype-badge');
  if (existingBadge) existingBadge.remove();

  const badge = document.createElement('div');
  badge.id = 'archetype-badge';
  badge.style.cssText = `
    padding: 16px 24px;
    margin-bottom: 20px;
    border: 1px solid ${album.labelColor}40;
    background: ${album.labelColor}10;
    display: flex;
    align-items: center;
    gap: 16px;
  `;

  badge.innerHTML = `
    <div style="font-size:24px;filter:drop-shadow(0 0 8px ${album.labelColor});">◈</div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${album.labelColor};margin-bottom:4px;">Your Archetype</div>
      <div style="font-family:'DM Serif Display',serif;font-size:22px;color:${album.labelColor};">${archetype.name}</div>
    </div>`;

  cardEl.parentNode.insertBefore(badge, cardEl);

  const analysisEl = document.getElementById('analysis-text');
  analysisEl.innerHTML = '<div class="analysis-loading"><div class="dot-pulse"><span></span><span></span><span></span></div><span>Analyzing your sonic identity...</span></div>';

  setTimeout(() => {
    analysisEl.style.borderColor = `${album.labelColor}30`;
    analysisEl.innerHTML = analysis
      .split('\n\n')
      .map((paragraph) => `<p style="margin-bottom:16px;">${paragraph}</p>`)
      .join('');
  }, 700);

  document.getElementById('modal-overlay').classList.add('open');
}

function addTrackInput() {
  const trackNumber = nextTrackNumber();
  const row = document.createElement('div');
  row.className = 'track-input-row';
  row.innerHTML = `
    <div class="track-input-num">${String(trackNumber).padStart(2, '0')}</div>
    <input class="form-input track-input-title" placeholder="Song title" style="flex:2;margin:0 4px;" />
    <input class="form-input track-input-artist" placeholder="Artist" style="flex:1.5;margin:0 4px;" />
    <input class="form-input track-input-duration" placeholder="3:45" style="width:60px;margin:0 4px;font-family:'JetBrains Mono',monospace;" />
    <button class="track-remove" type="button" onclick="this.closest('.track-input-row').remove()">x</button>`;

  document.getElementById('track-inputs').appendChild(row);
}

function initTrackInputs() {
  const container = document.getElementById('track-inputs');
  container.innerHTML = '';

  const firstRow = document.createElement('div');
  firstRow.className = 'track-input-row';
  firstRow.innerHTML = `
    <div class="track-input-num">01</div>
    <input class="form-input track-input-title" placeholder="Song title" style="flex:2;margin:0 4px;" />
    <input class="form-input track-input-artist" placeholder="Artist" style="flex:1.5;margin:0 4px;" />
    <input class="form-input track-input-duration" placeholder="3:45" style="width:60px;margin:0 4px;font-family:'JetBrains Mono',monospace;" />`;

  container.appendChild(firstRow);
}

function resetAlbumForm() {
  document.getElementById('f-name').value = '';
  document.getElementById('f-title').value = '';
  document.getElementById('f-note').value = '';
  document.getElementById('f-genre').value = '';
  selectedColor = ACCENT_COLORS[0];

  document.querySelectorAll('.color-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === 0);
  });

  initTrackInputs();
}

function setupAddAlbumFlow() {
  const colorPicker = document.getElementById('color-picker');
  ACCENT_COLORS.forEach((color, index) => {
    const dot = document.createElement('div');
    dot.className = `color-dot${index === 0 ? ' active' : ''}`;
    dot.style.background = color;
    dot.addEventListener('click', () => {
      document.querySelectorAll('.color-dot').forEach((item) => item.classList.remove('active'));
      dot.classList.add('active');
      selectedColor = color;
    });
    colorPicker.appendChild(dot);
  });

  initTrackInputs();
  document.getElementById('add-track-btn').addEventListener('click', addTrackInput);

  document.getElementById('submit-album-btn').addEventListener('click', () => {
    const name = document.getElementById('f-name').value.trim();
    const title = document.getElementById('f-title').value.trim();
    const note = document.getElementById('f-note').value.trim();
    const genre = document.getElementById('f-genre').value.trim();

    if (!name || !title) {
      alert('Please fill in your name and album title.');
      return;
    }

    const rows = document.querySelectorAll('.track-input-row');
    const tracks = Array.from(rows)
      .map((row) => normalizeTrack({
        title: row.querySelector('.track-input-title')?.value,
        artist: row.querySelector('.track-input-artist')?.value,
        duration: row.querySelector('.track-input-duration')?.value || '-'
      }))
      .filter((track) => track.title);

    if (tracks.length === 0) {
      alert('Add at least one song.');
      return;
    }

    const userAlbumCount = albums.filter((album) => !defaultAlbumIds.has(String(album.id))).length;
    const suggestedPos = USER_POSITIONS[userAlbumCount % USER_POSITIONS.length] || {
      x: 400 + Math.random() * 1500,
      y: 1400 + Math.random() * 500
    };

    const newAlbum = normalizeAlbum({
      id: uid(),
      title,
      creator: name,
      albumNote: note || 'A personal collection.',
      vinylColor: VINYL_COLORS[Math.floor(Math.random() * VINYL_COLORS.length)],
      labelColor: selectedColor,
      genre: genre || 'Personal Mix',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      patternIdx: Math.floor(Math.random() * COVER_PATTERNS.length),
      tracks,
      _pos: suggestedPos,
      _rot: (Math.random() - 0.5) * 14,
      _z: 20
    });

    albums.push(newAlbum);
    saveUserAlbums();
    renderAlbums();

    setTimeout(() => {
      camX = -(newAlbum._pos.x - window.innerWidth / 2 + 140);
      camY = -(newAlbum._pos.y - window.innerHeight / 2 + 140);
      updateCanvas();
    }, 100);

    document.getElementById('add-modal').classList.remove('open');
    resetAlbumForm();

    setTimeout(() => openAlbumModal(newAlbum.id), 400);
  });
}

function setupCanvasInteractions() {
  updateCanvas();

  canvasWrapper.addEventListener('mousedown', (event) => {
    if (
      event.target === canvasWrapper ||
      event.target === canvas ||
      event.target.classList.contains('vinyl-item') ||
      event.target.closest('.vinyl-item')
    ) {
      dragging = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      canvasWrapper.classList.add('dragging');
      velX = 0;
      velY = 0;
    }
  });

  window.addEventListener('mousemove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;
    velX = dx;
    velY = dy;
    camX += dx;
    camY += dy;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    updateCanvas();
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    canvasWrapper.classList.remove('dragging');

    const momentum = setInterval(() => {
      velX *= 0.92;
      velY *= 0.92;
      camX += velX;
      camY += velY;
      updateCanvas();
      if (Math.abs(velX) < 0.5 && Math.abs(velY) < 0.5) clearInterval(momentum);
    }, 16);
  });

  canvasWrapper.addEventListener('touchstart', (event) => {
    dragging = true;
    lastMouseX = event.touches[0].clientX;
    lastMouseY = event.touches[0].clientY;
    velX = 0;
    velY = 0;
  }, { passive: true });

  canvasWrapper.addEventListener('touchmove', (event) => {
    if (!dragging) return;
    const dx = event.touches[0].clientX - lastMouseX;
    const dy = event.touches[0].clientY - lastMouseY;
    velX = dx;
    velY = dy;
    camX += dx;
    camY += dy;
    lastMouseX = event.touches[0].clientX;
    lastMouseY = event.touches[0].clientY;
    updateCanvas();
  }, { passive: true });

  canvasWrapper.addEventListener('touchend', () => {
    dragging = false;
  });

  canvas.addEventListener('mousedown', (event) => {
    clickStartX = event.clientX;
    clickStartY = event.clientY;
  });

  canvas.addEventListener('mouseup', (event) => {
    const dist = Math.hypot(event.clientX - clickStartX, event.clientY - clickStartY);
    if (dist > 6) return;
    const item = event.target.closest('.vinyl-item');
    if (!item) return;
    openAlbumModal(item.dataset.id);
  });
}

function setupModalHandlers() {
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('open');
  });

  document.getElementById('modal-overlay').addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal-overlay')) {
      document.getElementById('modal-overlay').classList.remove('open');
    }
  });

  document.getElementById('add-btn').addEventListener('click', () => {
    document.getElementById('add-modal').classList.add('open');
  });

  document.getElementById('add-modal-close').addEventListener('click', () => {
    document.getElementById('add-modal').classList.remove('open');
  });

  document.getElementById('cancel-add-btn').addEventListener('click', () => {
    document.getElementById('add-modal').classList.remove('open');
  });

  document.getElementById('add-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('add-modal')) {
      document.getElementById('add-modal').classList.remove('open');
    }
  });

  document.getElementById('about-btn').addEventListener('click', () => {
    document.getElementById('about-modal').classList.add('open');
  });

  document.getElementById('about-modal-close').addEventListener('click', () => {
    document.getElementById('about-modal').classList.remove('open');
  });

  document.getElementById('about-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('about-modal')) {
      document.getElementById('about-modal').classList.remove('open');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.getElementById('modal-overlay').classList.remove('open');
      document.getElementById('add-modal').classList.remove('open');
      document.getElementById('about-modal').classList.remove('open');
    }
  });
}

// ============================================================
// INIT
// ============================================================

setupCanvasInteractions();
setupModalHandlers();
setupAddAlbumFlow();
renderAlbums();
