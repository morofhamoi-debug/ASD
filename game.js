/* ============================================================
   ЧАСТЬ 1 — БИБЛИОТЕКА SVG-ИКОНОК
   ------------------------------------------------------------
   Каждая иконка — готовая строка path в системе 24×24.
   Функция svg(name, size, cls) собирает <svg> элемент.
   ============================================================ */

const ICON_PATHS = {
  /* — Системные — */
  signal: '<path d="M2 20h1M6 20v-4M10 20v-8M14 20V8M18 20V4"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2"/><rect x="4.5" y="9.5" width="11" height="5" rx="1" fill="currentColor" stroke="none"/>',
  bluetooth: '<path d="m7 7 10 10-5 5V2l5 5L7 17"/>',
  airplane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',

  /* — Приложения — */
  chat: '<path d="M21 11.5a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 11.5z"/>',
  chatBubble: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  phoneMissed: '<path d="M23 7l-6 6M17 7l6 6"/>',
  phoneIn: '<path d="M16 2v6h6M16 8l6-6"/>',
  phoneOut: '<path d="M22 2 16 8M22 8V2h-6"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15-5-5L5 21"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a15 15 0 0 1 0 19 15 15 0 0 1 0-19z"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5l2 3H20a2 2 0 0 1 2 2z"/>',
  folderOpen: '<path d="M6 14l1.5-2.9A2 2 0 0 1 9.2 10H21a2 2 0 0 1 1.9 2.6L21 20a2 2 0 0 1-1.9 1.4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h6a2 2 0 0 1 2 2v2"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l4 2.2"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 14.8a1.7 1.7 0 0 0 .34 1.87l.06.06a2.06 2.06 0 1 1-2.91 2.91l-.06-.06a1.7 1.7 0 0 0-1.88-.33 1.7 1.7 0 0 0-1.03 1.55v.17a2.06 2.06 0 0 1-4.12 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2.06 2.06 0 1 1-2.91-2.91l.06-.06a1.7 1.7 0 0 0 .33-1.88 1.7 1.7 0 0 0-1.55-1.03h-.17a2.06 2.06 0 1 1 0-4.12h.09a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2.06 2.06 0 1 1 2.91-2.91l.06.06a1.7 1.7 0 0 0 1.88.33h.08a1.7 1.7 0 0 0 1.03-1.55v-.17a2.06 2.06 0 0 1 4.12 0v.09a1.7 1.7 0 0 0 1.03 1.55 1.7 1.7 0 0 0 1.88-.33l.06-.06a2.06 2.06 0 1 1 2.91 2.91l-.06.06a1.7 1.7 0 0 0-.33 1.88v.08a1.7 1.7 0 0 0 1.55 1.03h.17a2.06 2.06 0 0 1 0 4.12h-.09a1.7 1.7 0 0 0-1.55 1.03z"/>',

  /* — Навигация — */
  back: '<path d="m15 18-6-6 6-6"/>',
  fwd: '<path d="m9 6 6 6-6 6"/>',
  chev: '<path d="m9 6 6 6-6 6"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevUp: '<path d="m6 15 6-6 6 6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9.5"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  moreV: '<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',

  /* — Действия — */
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/>',
  play: '<path d="M6 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/>',
  stop: '<rect x="5.5" y="5.5" width="13" height="13" rx="2"/>',
  rewind: '<path d="M11 19 2 12l9-7zM22 19l-9-7 9-7z"/>',
  forward: '<path d="M13 19l9-7-9-7zM2 19l9-7-9-7z"/>',
  mic: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/>',
  micOff: '<path d="M1 1l22 22"/><path d="M9 9v3a3 3 0 0 0 5.1 2.1M15 9.3V6a3 3 0 0 0-5.9-.8"/><path d="M17 16.9A7 7 0 0 1 5 12v-2M19 10v2a7 7 0 0 1-.1 1.2M12 19v3M8 22h8"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4z"/>',
  copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16V4a2 2 0 0 1 2-2h12"/>',
  eye: '<path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M6.5 6.7A10.8 10.8 0 0 0 1.5 12S5 19 12 19c1.6 0 3-.4 4.3-1M9.9 5.2A10 10 0 0 1 12 5c7 0 10.5 7 10.5 7a17 17 0 0 1-3.2 4.2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
  refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.3L23 10M1 14l4.6 4.3A9 9 0 0 0 20.5 15"/>',

  /* — Статусы — */
  alert: '<path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4.5M12 17.5h.01"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 11v5M12 7.5h.01"/>',
  help: '<circle cx="12" cy="12" r="9.5"/><path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17.5h.01"/>',
  shield: '<path d="M12 2.5 4 6v6c0 5 3.4 8.5 8 9.5 4.6-1 8-4.5 8-9.5V6z"/>',
  shieldCheck: '<path d="M12 2.5 4 6v6c0 5 3.4 8.5 8 9.5 4.6-1 8-4.5 8-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>',
  unlock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 7.5-2"/>',
  key: '<circle cx="8" cy="15" r="4.5"/><path d="m11.5 11.5 9-9M18 5.5l2 2M15 8.5l2 2"/>',

  /* — Люди — */
  user: '<circle cx="12" cy="8" r="4.5"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M1 21c.8-3.5 3.5-5.5 8-5.5s7.2 2 8 5.5"/><path d="M17 4.5a4 4 0 0 1 0 7.5M22 21c-.5-2.3-1.8-4-3.8-5"/>',
  userPlus: '<circle cx="9" cy="8" r="4"/><path d="M1 21c.8-3.5 3.5-5.5 8-5.5s7.2 2 8 5.5"/><path d="M19 8v6M16 11h6"/>',
  userCircle: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="10" r="3.5"/><path d="M5.5 20a7 7 0 0 1 13 0"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',

  /* — Документы — */
  file: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5"/>',
  fileText: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5M8 13h8M8 17h5"/>',
  fileAudio: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5"/><path d="M10 17V12l5 1v4"/><circle cx="9" cy="17" r="1.5"/><circle cx="14" cy="17.5" r="1.5"/>',
  fileImage: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5"/><circle cx="10" cy="13" r="1.5"/><path d="m8 18 3-3 3 3 2-2 2 2"/>',
  fileVideo: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5"/><path d="m10 12 4 2.5-4 2.5z" fill="currentColor" stroke="none"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v19H6.5a2.5 2.5 0 0 0 0 5H20"/><path d="M4 4.5v15"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',

  /* — Медиа — */
  film: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M7 4.5v15M17 4.5v15M2.5 12h19M2.5 8.5h4.5M2.5 15.5h4.5M17 8.5h4.5M17 15.5h4.5"/>',
  filmPlay: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  video: '<path d="m23 7-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  gal: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15-5-5L5 21"/>',
  headphone: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  vol: '<path d="M11 5 6 9H2.5v6H6l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  volOff: '<path d="M11 5 6 9H2.5v6H6l5 4z"/><path d="m23 9-6 6M17 9l6 6"/>',
  wave: '<path d="M2 12h2M7 8v8M12 4v16M17 8v8M22 12h-.5"/>',
  speaker: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="14" r="3"/><circle cx="12" cy="7.5" r="1"/>',

  /* — Прочее — */
  star: '<path d="m12 2.5 3 6.2 6.8 1-4.9 4.8 1.1 6.8L12 18l-6 3.3 1.1-6.8L2.2 9.7l6.8-1z"/>',
  starFill: '<path d="m12 2.5 3 6.2 6.8 1-4.9 4.8 1.1 6.8L12 18l-6 3.3 1.1-6.8L2.2 9.7l6.8-1z" fill="currentColor"/>',
  heart: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7L12 21.5l7.1-7.1 1.7-1.7a5 5 0 0 0 0-7.1z"/>',
  bookmark: '<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  tag: '<path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
  clue: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.5-4.5"/><path d="M11 7v4l2.5 1.5"/>',
  fingerprint: '<path d="M12 2a10 10 0 0 0-7 3M12 2a10 10 0 0 1 7 3"/><path d="M5 5a10 10 0 0 0-3 7v1M19 5a10 10 0 0 1 3 7v1"/><path d="M8 8a5 5 0 0 1 8 0M8 12v1a4 4 0 0 0 4 4M16 12v1a4 4 0 0 1-1 2.6"/><path d="M12 8v5M9 12v3M15 12v3"/>',
  dna: '<path d="M4 3s4 2 4 6-4 8-4 12M20 3s-4 2-4 6 4 8 4 12"/><path d="M7 7h10M5 15h14M7 11h10M7 19h10"/>',
  target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="m16 8-2 6-6 2 2-6z"/>',
  bug: '<path d="M8 2l1.9 1.9M16 2l-1.9 1.9M9 7h6M8 13a4 4 0 1 0 8 0v-3a4 4 0 0 0-8 0z"/><path d="M3 13h5M16 13h5M3 8h5M16 8h5M3 18h5M16 18h5M12 17v5"/>',
  scale: '<path d="M12 3v18M5 21h14M7 8h10"/><circle cx="12" cy="5" r="2"/><path d="m7 8-4 8a4 4 0 0 0 8 0zM17 8l-4 8a4 4 0 0 0 8 0z"/>'
};

/* ------------------------------------------------------------
   ФУНКЦИЯ-СБОРЩИК SVG
   ------------------------------------------------------------ */
function svg(name, size, cls){
  size = size || 24;
  cls = cls || '';
  const p = ICON_PATHS[name];
  if(!p) return '';
  return '<svg class="icon '+cls+'" '
    + 'width="'+size+'" height="'+size+'" '
    + 'viewBox="0 0 24 24" '
    + 'fill="none" stroke="currentColor" '
    + 'stroke-width="1.7" '
    + 'stroke-linecap="round" stroke-linejoin="round">'
    + p + '</svg>';
}

/* ============================================================
   ЧАСТЬ 1 — ГЛОБАЛЬНОЕ СОСТОЯНИЕ ИГРЫ
   ============================================================ */

const G = {
  /* — Прогресс — */
  chapter: 1,
  subchapter: 0,
  screen: 'boot',
  history: [],
  locked: true,
  pinBuffer: '',

  /* — Данные — */
  flags: {},
  evidence: [],
  selectedEv: [],
  unread: {},
  opened: {
    chats: {},
    photos: {},
    notes: {},
    calls: {},
    searches: {}
  },

  /* — Счётчики — */
  notesRead: 0,
  photosViewed: 0,
  callsChecked: 0,
  wrongAccusations: 0,

  /* — Тосты — */
  toastQueue: [],
  toastActive: false,

  /* — Настройки — */
  sound: true,
  vibration: true,
  reducedMotion: false
};

/* --- Быстрые аксессоры --- */
function hasFlag(k){ return !!G.flags[k]; }
function setFlag(k, v){ G.flags[k] = (v === undefined ? true : v); }
function hasEv(id){ return G.evidence.indexOf(id) >= 0; }
function addEv(id){
  if(G.evidence.indexOf(id) >= 0) return false;
  G.evidence.push(id);
  return true;
}

/* ============================================================
   ЧАСТЬ 1 — УТИЛИТЫ
   ============================================================ */

function pad2(n){
  return String(n).padStart(2, '0');
}
function fmtTime(d){
  d = d || new Date();
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}
function escapeHtml(s){
  if(s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function delay(ms){
  return new Promise(res => setTimeout(res, ms));
}
function rand(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}
function clamp(v, min, max){
  return Math.max(min, Math.min(max, v));
}

/* ============================================================
   ЧАСТЬ 1 — ХРАНИЛИЩЕ (автосохранение)
   ============================================================ */

const SAVE_KEY = 'case_2024_0414_save_v1';

function saveGame(){
  try{
    const data = {
      chapter: G.chapter,
      flags: G.flags,
      evidence: G.evidence,
      selectedEv: G.selectedEv,
      notesRead: G.notesRead,
      photosViewed: G.photosViewed,
      callsChecked: G.callsChecked,
      wrongAccusations: G.wrongAccusations,
      screen: G.screen,
      timestamp: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch(e){
    console.warn('Save failed:', e);
  }
}

function loadGame(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return null;
    return JSON.parse(raw);
  } catch(e){
    return null;
  }
}

function wipeSave(){
  try{
    localStorage.removeItem(SAVE_KEY);
  } catch(e){}
}

/* ============================================================
   ЧАСТЬ 1 — ЗВУК (Web Audio API, лёгкие клики)
   ============================================================ */

let audioCtx = null;

function ensureAudio(){
  if(audioCtx) return audioCtx;
  try{
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch(e){
    audioCtx = null;
  }
  return audioCtx;
}

function beep(freq, dur, type, vol){
  if(!G.sound) return;
  const ctx = ensureAudio();
  if(!ctx) return;
  freq = freq || 660;
  dur = dur || 0.05;
  type = type || 'sine';
  vol = vol == null ? 0.04 : vol;
  try{
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
  } catch(e){}
}

function haptic(pattern){
  if(!G.vibration) return;
  if(navigator.vibrate) navigator.vibrate(pattern || 15);
}

/* ============================================================
   ЧАСТЬ 1 — БАЗОВЫЙ РЕНДЕР
   ============================================================ */

const $view = document.getElementById('view');
const $clock = document.getElementById('clock');
const $sys = document.getElementById('sysicons');

function render(html, keepScroll){
  const prevTop = keepScroll ? $view.scrollTop : 0;
  $view.classList.remove('fade');
  void $view.offsetWidth;
  $view.innerHTML = html;
  $view.classList.add('fade');
  $view.scrollTop = prevTop;
}

/* ============================================================
   ЧАСТЬ 1 — РОУТЕР И НАВИГАЦИЯ
   ============================================================ */

const ROUTES = {};

function go(route, arg){
  if(!ROUTES[route]){
    console.warn('Route not registered:', route);
    return;
  }
  G.history.push({r: route, a: arg});
  ROUTES[route](arg);
}

function goBack(){
  if(G.history.length > 1){
    G.history.pop();
    const prev = G.history.pop();
    if(ROUTES[prev.r]) ROUTES[prev.r](prev.a);
    else ROUTES.home();
  } else {
    ROUTES.home();
  }
}

/* ============================================================
   ЧАСТЬ 1 — ЧАСЫ И СТАТУС-БАР
   ============================================================ */

function tickClock(){
  $clock.textContent = fmtTime();
}

function renderSysIcons(){
  $sys.innerHTML = svg('signal', 15) + svg('wifi', 15) + svg('battery', 18);
}

tickClock();
renderSysIcons();
setInterval(tickClock, 15000);

/* ============================================================
   ЧАСТЬ 1 — СИСТЕМА ТОСТОВ
   ============================================================ */

const $tw = document.getElementById('toastwrap');

const TOAST_ICONS = {
  '': 'info',
  'warn': 'alert',
  'err': 'close',
  'ok': 'check',
  'ev': 'clue'
};

function toast(title, text, kind){
  G.toastQueue.push({title: title, text: text, kind: kind || ''});
  if(!G.toastActive) nextToast();
}

function nextToast(){
  if(!G.toastQueue.length){
    G.toastActive = false;
    return;
  }
  G.toastActive = true;
  const t = G.toastQueue.shift();
  const icn = TOAST_ICONS[t.kind] || 'info';
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML =
    '<div class="tico ' + t.kind + '">' + svg(icn, 15, 'bold') + '</div>' +
    '<div class="tx"><b>' + escapeHtml(t.title) + '</b>' + escapeHtml(t.text) + '</div>';
  $tw.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('show'); });
  setTimeout(function(){
    el.classList.remove('show');
    setTimeout(function(){ el.remove(); nextToast(); }, 350);
  }, 3400);
  beep(720, 0.04);
}

/* ============================================================
   ЧАСТЬ 1 — ИНТРО-ЭКРАН
   ============================================================ */

ROUTES.boot = function(){
  G.screen = 'boot';
  render(''
  + '<div class="center">'

  +   '<div class="bigico" style="'
  +     'width:96px;height:96px;'
  +     'border-color:rgba(93,169,255,.35);'
  +     'color:var(--acc);'
  +     'box-shadow:0 0 60px rgba(93,169,255,.25),inset 0 1px 0 rgba(255,255,255,.06)'
  +   '">'
  +     svg('fingerprint', 42)
  +   '</div>'

  +   '<div style="'
  +     'font-size:10.5px;'
  +     'letter-spacing:3px;'
  +     'color:var(--dim);'
  +     'text-transform:uppercase'
  +   '">Следственный комитет</div>'

  +   '<h2 style="'
  +     'font-size:24px;'
  +     'letter-spacing:.3px;'
  +     'line-height:1.25;'
  +     'font-weight:600'
  +   '">Дело №2024-0414</h2>'

  +   '<div style="'
  +     'font-size:13px;'
  +     'color:var(--acc);'
  +     'letter-spacing:1px;'
  +     'margin-top:-6px'
  +   '">«Последний сеанс»</div>'

  +   '<p style="margin-top:14px">'
  +     'В ночь на 14 апреля студентка режиссёрского факультета '
  +     '<b style="color:var(--txt)">Марина Соколова, 24 года</b>, '
  +     'не вернулась домой после премьеры своего дипломного фильма. '
  +     'Утром её телефон был обнаружен под диваном в квартире.'
  +   '</p>'

  +   '<p style="font-size:12.5px;color:var(--dim2)">'
  +     'Телефон разблокирован, но требует PIN-кода для полного доступа. '
  +     'Вам передан аппарат для изучения.'
  +   '</p>'

  +   '<button class="btn" style="margin-top:20px" onclick="go(\'lock\')">'
  +     svg('shield', 16, 'bold') + ' Приступить'
  +   '</button>'

  +   '<div style="'
  +     'font-size:10.5px;'
  +     'color:var(--dim2);'
  +     'margin-top:14px;'
  +     'line-height:1.6'
  +   '">'
  +     '16+ · Содержит сцены насилия<br>'
  +     'Играй в тёмной комнате'
  +   '</div>'

  + '</div>');
};

/* ============================================================
   ЧАСТЬ 1 — ЭКРАН БЛОКИРОВКИ
   ============================================================ */

const PIN_CORRECT = '14092019';

const PIN_HINTS = [
  {n:'1', s:''},
  {n:'2', s:'ABC'},
  {n:'3', s:'DEF'},
  {n:'4', s:'GHI'},
  {n:'5', s:'JKL'},
  {n:'6', s:'MNO'},
  {n:'7', s:'PQRS'},
  {n:'8', s:'TUV'},
  {n:'9', s:'WXYZ'}
];

ROUTES.lock = function(){
  G.screen = 'lock';
  drawLock('');
};

function drawLock(msg, kind){
  const dots = [0,1,2,3,4,5,6,7].map(function(i){
    return '<i class="' + (i < G.pinBuffer.length ? 'on' : '') + '"></i>';
  }).join('');

  const keys = PIN_HINTS.map(function(k){
    return '<button class="kbtn" onclick="pinPress(\'' + k.n + '\')">'
      + '<span class="num">' + k.n + '</span>'
      + (k.s ? '<span class="sub">' + k.s + '</span>' : '')
      + '</button>';
  }).join('');

  render(''
  + '<div class="lock">'

  +   '<div class="sysname">Изъято · Дело №2024-0414</div>'
  +   '<h1>Телефон Марины Соколовой</h1>'
  +   '<div class="date">14 апреля · 08:41</div>'

  +   '<div class="lockface">' + svg('lock', 32) + '</div>'

  +   '<div id="pinDots">' + dots + '</div>'
  +   '<div class="pinmsg ' + (kind || '') + '">' + (msg || 'Введите PIN-код (8 цифр)') + '</div>'

  +   '<div class="keypad">'
  +     keys
  +     '<button class="kbtn fn" onclick="pinPress(\'clear\')">' + svg('close', 20) + '</button>'
  +     '<button class="kbtn" onclick="pinPress(\'0\')"><span class="num">0</span></button>'
  +     '<button class="kbtn enter" onclick="pinPress(\'ok\')">' + svg('check', 22, 'bold') + '</button>'
  +   '</div>'

  +   '<div class="lockhint">' + svg('info', 13) + ' Подсказка: дата гибели её брата</div>'

  + '</div>');
}

function pinPress(k){
  if(k === 'clear'){
    G.pinBuffer = '';
    beep(400, 0.04);
    drawLock('');
    return;
  }
  if(k === 'ok'){
    pinCheck();
    return;
  }
  if(G.pinBuffer.length < 8){
    G.pinBuffer += k;
    beep(660, 0.03);
    haptic(8);
  }
  if(G.pinBuffer.length === 8){
    drawLock('');
    setTimeout(pinCheck, 280);
    return;
  }
  drawLock('');
}

function pinCheck(){
  if(G.pinBuffer === PIN_CORRECT){
    G.locked = false;
    G.pinBuffer = '';
    setFlag('unlocked');
    drawLock('Доступ разрешён', 'ok');
    beep(880, 0.08);
    setTimeout(function(){
      toast('Доступ разрешён', 'Телефон разблокирован', 'ok');
      go('home');
    }, 550);
  } else {
    G.pinBuffer = '';
    drawLock('Неверный код. Попробуйте ещё раз.', 'err');
    beep(220, 0.12, 'sawtooth');
    haptic([30, 40, 30]);
  }
}

/* ============================================================
   ЧАСТЬ 1 — РАБОЧИЙ СТОЛ
   ============================================================ */

const APPS = [
  {id:'chats',    ic:'chat',    lbl:'Сообщения'},
  {id:'calls',    ic:'phone',   lbl:'Звонки'},
  {id:'gallery',  ic:'image',   lbl:'Галерея'},
  {id:'notes',    ic:'note',    lbl:'Заметки'},
  {id:'browser',  ic:'globe',   lbl:'Браузер'},
  {id:'board',    ic:'folder',  lbl:'Улики'},
  {id:'timeline', ic:'clock',   lbl:'Хронология'},
  {id:'settings', ic:'gear',    lbl:'Настройки'}
];

const DOCK_APPS = [
  {id:'chats',   ic:'chat'},
  {id:'board',   ic:'folder'},
  {id:'gallery', ic:'image'},
  {id:'notes',   ic:'note'}
];

function appUnread(id){
  if(id === 'chats') return unreadChats();
  if(id === 'calls') return unreadCalls();
  if(id === 'notes') return 0;
  if(id === 'board') return 0;
  return 0;
}

function unreadChats(){
  let n = 0;
  if(typeof CHATS !== 'undefined'){
    for(const k in CHATS){
      if(CHATS[k].unlocked && CHATS[k].unread) n += CHATS[k].unread;
    }
  }
  return n;
}

function unreadCalls(){
  if(typeof CALLS === 'undefined') return 0;
  return CALLS.filter(function(c){
    return c.type === 'miss' && !G.opened.calls[c.id];
  }).length;
}

ROUTES.home = function(){
  G.screen = 'home';
  const d = new Date();
  const day = d.getDate();
  const monthNames = [
    'января','февраля','марта','апреля','мая','июня',
    'июля','августа','сентября','октября','ноября','декабря'
  ];

  const grid = APPS.map(function(a){
    const u = appUnread(a.id);
    return '<div class="app ' + (u ? 'alert' : '') + '" onclick="openApp(\'' + a.id + '\')">'
      + '<div class="ico">' + svg(a.ic, 28) + '</div>'
      + (u ? '<div class="badge">' + (u > 99 ? '99+' : u) + '</div>' : '')
      + '<div class="lbl">' + a.lbl + '</div>'
      + '</div>';
  }).join('');

  const dock = DOCK_APPS.map(function(a){
    return '<div class="app" onclick="openApp(\'' + a.id + '\')">'
      + '<div class="ico">' + svg(a.ic, 24) + '</div>'
      + '</div>';
  }).join('');

  render(''
  + '<div class="wall">'

  +   '<div class="wallhead">'
  +     '<div class="d1">' + day + '</div>'
  +     '<div class="d2">' + monthNames[d.getMonth()] + ' · ' + d.getFullYear() + '</div>'
  +     '<div class="case">Дело №2024-0414</div>'
  +   '</div>'

  +   '<div class="apps">' + grid + '</div>'
  +   '<div class="dock">' + dock + '</div>'

  + '</div>');
};

function openApp(id){
  if(id === 'chats')    return go('chats');
  if(id === 'calls')    return go('calls');
  if(id === 'gallery')  return go('gallery');
  if(id === 'notes')    return go('notes');
  if(id === 'browser')  return go('browser');
  if(id === 'board')    return go('board');
  if(id === 'timeline') return go('timeline');
  if(id === 'settings') return go('settings');
}

/* ============================================================
   ЧАСТЬ 1 — ЗАГЛУШКИ ДЛЯ ПРИЛОЖЕНИЙ
   Каждая следующая часть перезапишет свою заглушку.
   ============================================================ */

function STUB(title){
  return function(){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>' + title + '</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico">' + svg('clock', 36) + '</div>'
    +   '<h2>Скоро</h2>'
    +   '<p>Это приложение откроется в одной из следующих частей игры.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Назад</button>'
    + '</div>');
  };
}

ROUTES.chats    = STUB('Сообщения');
ROUTES.calls    = STUB('Звонки');
ROUTES.gallery  = STUB('Галерея');
ROUTES.notes    = STUB('Заметки');
ROUTES.browser  = STUB('Браузер');
ROUTES.board    = STUB('Доска улик');
ROUTES.timeline = STUB('Хронология');

/* ============================================================
   ЧАСТЬ 1 — НАСТРОЙКИ
   ============================================================ */

ROUTES.settings = function(){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Настройки</h2><div class="sub">Дело №2024-0414</div></div>'
  + '</div>'

  + '<div style="padding:18px">'

  +   '<div style="'
  +     'background:var(--panel2);'
  +     'border:1px solid var(--line);'
  +     'border-radius:14px;'
  +     'padding:14px;'
  +     'margin-bottom:12px'
  +   '">'
  +     '<div style="display:flex;gap:10px;align-items:center;color:var(--acc);margin-bottom:6px">'
  +       svg('folder', 18)
  +       '<b style="font-size:13.5px;color:var(--txt)">Дело</b>'
  +     '</div>'
  +     '<div style="font-size:12.5px;color:var(--dim);line-height:1.6">'
  +       'Пропажа Марины Соколовой, 24 года. Заявление подано 14 апреля в 23:58.'
  +     '</div>'
  +   '</div>'

  +   '<div style="'
  +     'background:var(--panel2);'
  +     'border:1px solid var(--line);'
  +     'border-radius:14px;'
  +     'padding:14px;'
  +     'margin-bottom:12px'
  +   '">'
  +     '<div style="display:flex;gap:10px;align-items:center;color:var(--acc);margin-bottom:8px">'
  +       svg('eye', 18)
  +       '<b style="font-size:13.5px;color:var(--txt)">Прогресс</b>'
  +     '</div>'
  +     '<div style="font-size:12.5px;color:var(--dim);line-height:1.8">'
  +       'Улик собрано: <b style="color:var(--txt)">' + G.evidence.length + '</b><br>'
  +       'Заметок прочитано: <b style="color:var(--txt)">' + G.notesRead + '</b><br>'
  +       'Фото просмотрено: <b style="color:var(--txt)">' + G.photosViewed + '</b>'
  +     '</div>'
  +     '<div class="pbar" style="margin-top:10px">'
  +       '<i style="width:' + Math.min(100, G.evidence.length * 3) + '%"></i>'
  +     '</div>'
  +   '</div>'

  +   '<button class="btn ghost" style="width:100%;justify-content:center" '
  +     'onclick="if(confirm(\'Начать заново? Весь прогресс будет утерян.\')){wipeSave();location.reload();}">'
  +     svg('trash', 16) + ' Сбросить прогресс'
  +   '</button>'

  + '</div>');
};

/* ============================================================
   ЧАСТЬ 1 — СТАРТ
   ============================================================ */

ROUTES.boot();
G.history.push({r: 'boot'});

console.log(
  '%c[ЧАСТЬ 1 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nДвижок готов. Вставляй части 2–10 в конец файла. Закроются они в части 10.'
);

/* ... Часть 1 заканчивается здесь. НЕ ЗАКРЫВАЙ script/body/html.
   Следующие части продолжат этот же блок. */
    /* ============================================================
   ЧАСТЬ 2 из 10 — ПРИЛОЖЕНИЕ «СООБЩЕНИЯ»
   ------------------------------------------------------------
   Полностью заменяет заглушку ROUTES.chats.
   Содержит: контакты, 18 диалогов, реакции, голосовые,
   вложения, триггеры улик, ветвление ответов.
   ============================================================ */

/* ------------------------------------------------------------
   КОНТАКТЫ
   ------------------------------------------------------------ */
const CONTACTS = {
  lena: {
    name: 'Лена Крылова',
    short: 'Лена',
    av: 'ЛК',
    color: '#e05c7a',
    role: 'лучшая подруга',
    online: true,
    status: 'была в сети 5 минут назад'
  },
  artem: {
    name: 'Артём Северов',
    short: 'Артём',
    av: 'АС',
    color: '#ff8a5c',
    role: 'жених',
    online: false,
    status: 'был в сети вчера в 23:50'
  },
  viktor: {
    name: 'Виктор Павлович',
    short: 'Виктор Павлович',
    av: 'ВП',
    color: '#8b6dff',
    role: 'научный руководитель',
    online: false,
    status: 'был(а) недавно'
  },
  dima: {
    name: 'Дима Лапин',
    short: 'Дима',
    av: 'ДЛ',
    color: '#5da9ff',
    role: 'бывший парень',
    online: false,
    status: 'был(а) давно'
  },
  sonya: {
    name: 'Соня Мельник',
    short: 'Соня',
    av: 'СМ',
    color: '#3ddc97',
    role: 'соседка по квартире',
    online: true,
    status: 'в сети'
  },
  mama: {
    name: 'Мама',
    short: 'Мама',
    av: 'М',
    color: '#ffb84d',
    role: 'мама',
    online: false,
    status: 'был(а) утром'
  },
  krylov: {
    name: 'Андрей Крылов',
    short: 'А. Крылов',
    av: 'АК',
    color: '#c8d1e2',
    role: 'продюсер, владелец студии',
    online: false,
    status: 'был(а) давно'
  },
  unknown: {
    name: '+7 (9••) •••-74-2',
    short: 'Неизвестный',
    av: '?',
    color: '#ff5a6e',
    role: 'неизвестный номер',
    online: false,
    status: 'не в сети'
  },
  studio: {
    name: 'Киноателье «Сокол»',
    short: 'Сокол',
    av: 'КС',
    color: '#7a869c',
    role: 'служебный',
    online: false,
    status: 'рабочий чат'
  },
  groupFriends: {
    name: 'Кино, вино и домино',
    short: 'Кино, вино...',
    av: 'КВД',
    color: '#8b6dff',
    role: 'группа · 5 человек',
    online: false,
    status: '5 участников'
  },
  groupStudy: {
    name: 'Диплом — группа 4Б',
    short: 'Группа 4Б',
    av: '4Б',
    color: '#5da9ff',
    role: 'группа · 14 человек',
    online: false,
    status: '14 участников'
  },
  unknownVoice: {
    name: 'Номер скрыт',
    short: 'Номер скрыт',
    av: '—',
    color: '#4d576b',
    role: 'неизвестный номер',
    online: false,
    status: '—'
  },
  kirill: {
    name: 'Кирилл Соколов',
    short: 'Кирилл',
    av: 'КС',
    color: '#3ddc97',
    role: 'брат',
    online: false,
    status: 'последний визит 14 сентября 2019'
  },
  yulia: {
    name: 'Юля Соколова',
    short: 'Юля',
    av: 'ЮС',
    color: '#ff7a9c',
    role: 'невестка',
    online: false,
    status: 'был(а) вчера'
  },
  anton: {
    name: 'Антон Ветров',
    short: 'Антон',
    av: 'АВ',
    color: '#5da9ff',
    role: 'одногруппник',
    online: false,
    status: 'был(а) вчера'
  },
  olga: {
    name: 'Ольга Соколовская',
    short: 'Ольга',
    av: 'ОС',
    color: '#c8d1e2',
    role: 'жена Виктора Павловича',
    online: false,
    status: 'был(а) давно'
  },
  vadim: {
    name: 'Вадим Соколовский',
    short: 'Вадим',
    av: 'ВС',
    color: '#ff5a6e',
    role: 'сын Виктора Павловича',
    online: false,
    status: 'был(а) давно'
  },
  anonim: {
    name: 'Аноним',
    short: 'Аноним',
    av: '✕',
    color: '#4d576b',
    role: 'скрытый контакт',
    online: false,
    status: '—'
  }
};

/* ------------------------------------------------------------
   ДАННЫЕ: ДИАЛОГИ
   ------------------------------------------------------------
   Структура сообщения:
   {d:'дата-разделитель'}          — системная метка дня
   {f:'me'|'them'|'sys', t:'...',  — текст
    tm:'21:30', status:'read'|...}
   {f:'voice', dur:'0:34', tm, ...} — голосовое
   {f:'photo', ico:'...', cap:'...'} — фото
   {f:'file', name:'...', size:'...'} — файл
   ============================================================ */

const CHATS = {

/* ============================================================
   ДИАЛОГ 1 — ЛЕНА (лучшая подруга)
   ============================================================ */
lena: {
  unlocked: true,
  unread: 3,
  pinned: true,
  ev: 'chat_lena',
  messages: [
    {d:'10 апреля'},

    {f:'them', t:'Мар, ты жива? Я весь день не могу дозвониться 😟', tm:'18:04'},

    {f:'me', t:'Жива, просто монтаж. Я в студии до ночи', tm:'18:22'},

    {f:'them', t:'Ты не забыла, что завтра показ? Придут все. Даже Крылов обещал быть', tm:'18:23'},

    {f:'me', t:'Помню. Я всё успею', tm:'18:25'},

    {f:'them', t:'Мар, я не про монтаж. Ты уверена, что хочешь показать ИМЕННО ЭТО?', tm:'18:26'},

    {f:'me', t:'Я три года собирала материал. Я не могу это просто выбросить', tm:'18:31'},

    {f:'them', t:'Ты понимаешь, что после показа назад дороги не будет?', tm:'18:32'},

    {f:'them', t:'Тут не только ты. Тут твой отец, тут память Кирилла. Это всё может полететь', tm:'18:32'},

    {f:'me', t:'Понимаю. Лен, я нашла его.', tm:'18:40'},

    {f:'them', t:'Кого?', tm:'18:40'},

    {f:'me', t:'Того, кто сбил Кирилла. Я видела запись. С регистратора', tm:'18:41'},

    {f:'them', t:'Господи. Мар. Ты в полицию?', tm:'18:42'},

    {f:'me', t:'Поздно. По ДТП со смертью срок давности — три года. Прошло почти четыре. Мне сказали, дело закрыто окончательно, реабилитация невозможна', tm:'18:44'},

    {f:'them', t:'Но ты знаешь, кто это?', tm:'18:44'},

    {f:'me', t:'Знаю. И он будет сегодня на показе. В первом ряду', tm:'18:46'},

    {f:'them', t:'Ты не должна быть там одна.', tm:'18:47'},

    {f:'me', t:'Я не одна. У меня всё продумано', tm:'18:48'},

    {f:'them', t:'Марина, я серьёзно. Позволь мне приехать', tm:'18:49'},

    {f:'me', t:'Лен, если со мной что-то случится — посмотри в папке «Кирилл» на моём ноутбуке. Пароль ты знаешь', tm:'18:55'},

    {f:'them', t:'МАРИНА. Так нельзя. Что значит «если что-то случится»??', tm:'18:55'},

    {f:'them', t:'Марина?', tm:'19:02'},

    {f:'them', t:'Марина, ответь', tm:'19:14'},

    {f:'them', t:'Я звоню тебе. Возьми трубку', tm:'19:31'},

    {f:'them', t:'Окей. Я не буду паниковать. Но если ты не напишешь до полуночи — я звоню твоей маме', tm:'19:50'},

    {d:'11 апреля'},

    {f:'them', t:'Ты в порядке? Хоть стикер кинь 🥺', tm:'09:02'},

    {f:'me', t:'В порядке. Прости. Вчера просто устала', tm:'09:14'},

    {f:'them', t:'Я тебя умоляю — не отключай телефон. Хотя бы на эти три дня', tm:'09:15'},

    {f:'me', t:'Хорошо', tm:'09:16'},

    {d:'12 апреля'},

    {f:'them', t:'Ты не забыла про костюм?', tm:'14:02'},

    {f:'me', t:'Артём забрал из химчистки', tm:'14:10'},

    {f:'them', t:'Хорошо. А ты сама? Ты как вообще?', tm:'14:11'},

    {f:'me', t:'Нервничаю. Но по-другому и не может быть', tm:'14:20'},

    {f:'them', t:'Я приду в 21:30. Сяду в третьем ряду, у выхода. Если что — сразу к тебе', tm:'14:21'},

    {f:'me', t:'Спасибо ❤️', tm:'14:22'},

    {d:'13 апреля'},

    {f:'them', t:'Марина, показ закончился. Ты не вышла ко мне. Ты где?', tm:'22:52'},

    {f:'them', t:'Я спрашивала у Артёма — он тебя не видел. Он в бешенстве', tm:'23:10'},

    {f:'them', t:'Я обошла весь зал. Твоя куртка на стуле в гримёрке. Телефон и сумка пропали', tm:'23:22'},

    {f:'them', t:'Я в полиции. Они говорят, что заявление примут только через 48 часов', tm:'23:58'},

    {f:'them', t:'Мар, пожалуйста. Просто дай знак, что ты жива', tm:'00:15'},

    {f:'them', t:'Я буду звонить каждый час', tm:'00:16'}
  ]
},

/* ============================================================
   ДИАЛОГ 2 — АРТЁМ (жених)
   ============================================================ */
artem: {
  unlocked: true,
  unread: 2,
  ev: 'artem_alibi',
  messages: [
    {d:'8 апреля'},

    {f:'them', t:'Мариш, я забронировал ресторан на 20-е. Хочу показать маме место, где мы распишемся', tm:'11:02'},

    {f:'me', t:'Хорошо. Только после показа, ладно? Я пока не могу думать о свадьбе', tm:'11:20'},

    {f:'them', t:'Я понимаю. Но давай хотя бы дату утвердим', tm:'11:21'},

    {f:'me', t:'25 августа. Так и договаривались', tm:'11:22'},

    {d:'10 апреля'},

    {f:'me', t:'Артём, ты забрал костюм из химчистки?', tm:'11:02'},

    {f:'them', t:'Забрал, висит у меня. Ты правда хочешь, чтобы я был на показе?', tm:'11:15'},

    {f:'me', t:'Ты мой жених. Ты должен быть', tm:'11:16'},

    {f:'them', t:'Просто это твоя работа. Ты обычно не пускаешь меня на такие вещи', tm:'11:18'},

    {f:'me', t:'В этот раз всё по-другому', tm:'11:19'},

    {f:'them', t:'Что по-другому?', tm:'11:19'},

    {f:'me', t:'Потом', tm:'11:20'},

    {d:'11 апреля'},

    {f:'them', t:'Я видел, как ты нервничаешь. Ты не спала всю ночь', tm:'07:40'},

    {f:'me', t:'Просто переживаю за фильм', tm:'07:55'},

    {f:'them', t:'Это не «просто переживаю». Ты даже не ешь', tm:'07:56'},

    {f:'me', t:'Артём, я тебя прошу — не давить сейчас', tm:'07:57'},

    {d:'12 апреля'},

    {f:'them', t:'Ты дома?', tm:'20:40'},

    {f:'me', t:'Нет, задержусь', tm:'20:41'},

    {f:'them', t:'Опять студия?', tm:'20:41'},

    {f:'me', t:'Да', tm:'20:42'},

    {f:'them', t:'Марин, ты последнее время врёшь мне. Я же чувствую', tm:'20:50'},

    {f:'me', t:'Артём, не начинай', tm:'20:51'},

    {f:'them', t:'Я видел тебя вчера у киноателье «Сокол». Ты сказала, что была у Лены', tm:'20:52'},

    {f:'me', t:'...', tm:'20:53'},

    {f:'them', t:'Кто он?', tm:'20:53'},

    {f:'me', t:'Никто. Артём, это по работе', tm:'20:55'},

    {f:'them', t:'По работе люди не оглядываются через плечо', tm:'20:56'},

    {f:'me', t:'Я потом всё объясню. Обещаю', tm:'20:58'},

    {f:'them', t:'Марина', tm:'21:05'},

    {f:'them', t:'Марина, я не буду это терпеть', tm:'21:22'},

    {f:'me', t:'Артём, стой. Не надо так', tm:'21:25'},

    {f:'them', t:'Я уехал к брату. Позвони, когда решишь сказать правду', tm:'21:40'},

    {d:'13 апреля'},

    {f:'them', t:'Ты не пришла на показ. Я ждал у входа до 22:00', tm:'22:40'},

    {f:'them', t:'Лена сказала, что ты пропала', tm:'23:12'},

    {f:'them', t:'Марина, это уже не смешно', tm:'23:50'},

    {f:'them', t:'Я тебя найду. Слышишь? Я найду тебя', tm:'00:14'}
  ]
},

/* ============================================================
   ДИАЛОГ 3 — ВИКТОР ПАВЛОВИЧ (научный руководитель)
   ============================================================ */
viktor: {
  unlocked: true,
  unread: 4,
  ev: 'chat_viktor',
  messages: [
    {d:'18 марта'},

    {f:'them', t:'Марина, добрый день. Ваш диплом принят к защите. Поздравляю', tm:'09:14'},

    {f:'me', t:'Спасибо, Виктор Павлович', tm:'09:20'},

    {f:'them', t:'Тема сильная. «Документальное кино как инструмент восстановления справедливости». Смело', tm:'09:21'},

    {f:'me', t:'Я вложила в неё всё', tm:'09:22'},

    {f:'them', t:'Это заметно. Особенно вторая часть', tm:'09:23'},

    {f:'me', t:'Вы про эпизод с аварией?', tm:'09:24'},

    {f:'them', t:'Про него. Откуда материал?', tm:'09:25'},

    {f:'me', t:'Из архивов. И с одной записи, которую мне передали', tm:'09:30'},

    {f:'them', t:'Какой записи?', tm:'09:31'},

    {f:'me', t:'С видеорегистратора', tm:'09:32'},

    {f:'them', t:'...', tm:'09:34'},

    {f:'them', t:'Марина, я бы советовал быть осторожнее с непроверенными источниками', tm:'09:36'},

    {f:'me', t:'Она проверена', tm:'09:37'},

    {f:'them', t:'Проверена кем?', tm:'09:38'},

    {f:'me', t:'Мной. Я три года её искала', tm:'09:40'},

    {f:'them', t:'Хорошо. Приходите в кабинет, обсудим', tm:'09:42'},

    {d:'5 апреля'},

    {f:'them', t:'Марина, зайдите ко мне в кабинет. Есть разговор', tm:'14:02'},

    {f:'me', t:'Когда?', tm:'14:05'},

    {f:'them', t:'Сегодня, если можете', tm:'14:06'},

    {f:'me', t:'Буду в 16:00', tm:'14:07'},

    {f:'them', t:'Одна', tm:'14:08'},

    {f:'me', t:'Почему «одна»?', tm:'14:09'},

    {f:'them', t:'Это личный вопрос', tm:'14:10'},

    {d:'6 апреля'},

    {f:'them', t:'Я ещё раз посмотрел черновую сборку. Прошу вас убрать сцену с номером машины', tm:'11:20'},

    {f:'me', t:'Почему?', tm:'11:25'},

    {f:'them', t:'Это безответственно. Вы показываете номер, которого нет в материалах дела', tm:'11:26'},

    {f:'me', t:'Номер есть на записи', tm:'11:27'},

    {f:'them', t:'На записи, которой нет в деле. Это не доказательство, это фантазия', tm:'11:28'},

    {f:'me', t:'Виктор Павлович, зачем вы так?', tm:'11:30'},

    {f:'them', t:'Я ваш научный руководитель. И я вас защищаю. От вас самой', tm:'11:31'},

    {d:'9 апреля'},

    {f:'them', t:'Я посмотрел ваш финальный монтаж', tm:'17:40'},

    {f:'me', t:'И?', tm:'17:42'},

    {f:'them', t:'Уберите вторую часть. Я не подпишу диплом с этим материалом', tm:'17:43'},

    {f:'me', t:'Виктор Павлович, вы не можете так поступить', tm:'17:44'},

    {f:'them', t:'Я ваш научный руководитель. Я решаю, что может, а что нет', tm:'17:45'},

    {f:'me', t:'Почему вы так боитесь этой плёнки?', tm:'17:50'},

    {f:'them', t:'Я не боюсь. Я защищаю вас от ошибки', tm:'17:52'},

    {f:'me', t:'От ошибки или от правды?', tm:'17:53'},

    {f:'them', t:'Марина. Мы оба знаем, чем это может закончиться', tm:'18:01'},

    {f:'me', t:'Знаем', tm:'18:02'},

    {d:'10 апреля'},

    {f:'them', t:'Я не сплю уже вторую ночь из-за вас', tm:'03:14'},

    {f:'them', t:'Вы не представляете, что вы делаете. Не только с собой', tm:'03:15'},

    {f:'me', t:'Виктор Павлович, вы пьяны?', tm:'08:02'},

    {f:'them', t:'Простите. Забудьте', tm:'08:20'},

    {d:'13 апреля'},

    {f:'them', t:'Показ закончился. Нам нужно поговорить. Наедине', tm:'23:10'},

    {f:'me', t:'О чём?', tm:'23:14'},

    {f:'them', t:'О том, что ты держишь в руках. Приезжай в старое ателье. Там никого', tm:'23:16'},

    {f:'me', t:'Зачем туда?', tm:'23:20'},

    {f:'them', t:'Потому что там хранится то, что тебе нужно. Оригинал', tm:'23:22'},

    {f:'them', t:'Марина, это последний шанс решить всё миром', tm:'23:30'},

    {f:'me', t:'Я выезжаю', tm:'23:41'},

    {f:'them', t:'Никому не говори', tm:'23:42'},

    {f:'them', t:'Марина?', tm:'00:05'},

    {f:'them', t:'Ты где', tm:'00:22'},

    {f:'them', t:'Ответь немедленно', tm:'01:10'}
  ]
},

/* ============================================================
   ДИАЛОГ 4 — ДИМА (бывший парень)
   ============================================================ */
dima: {
  unlocked: true,
  unread: 5,
  ev: 'dima_stalk',
  messages: [
    {d:'28 марта'},

    {f:'them', t:'Привет. Не ожидала?', tm:'22:11'},

    {f:'me', t:'Дима, я просила не писать', tm:'22:40'},

    {f:'them', t:'Я просто хотел узнать, как ты', tm:'22:41'},

    {f:'me', t:'У меня всё хорошо. Пожалуйста, не пиши больше', tm:'22:42'},

    {f:'them', t:'Ты выходишь замуж?', tm:'22:45'},

    {f:'me', t:'Это не твоё дело', tm:'22:46'},

    {f:'them', t:'Он тебя не стоит', tm:'22:47'},

    {f:'me', t:'Дима', tm:'22:48'},

    {f:'them', t:'Я видел вас вчера. В кафе на Садовой', tm:'22:52'},

    {f:'me', t:'Ты следишь за мной?', tm:'22:55'},

    {f:'them', t:'Я просто гулял', tm:'22:56'},

    {f:'me', t:'Если это повторится, я обращусь в полицию', tm:'22:57'},

    {f:'them', t:'Не обратишься. Ты же меня знаешь', tm:'22:58'},

    {d:'5 апреля'},

    {f:'them', t:'Я скучаю', tm:'02:14'},

    {f:'them', t:'Ты тоже скучаешь. Я знаю', tm:'02:15'},

    {f:'them', t:'Просто скажи, что да', tm:'02:16'},

    {f:'me', t:'Я заблокирую тебя', tm:'09:02'},

    {f:'them', t:'Не заблокируешь. Ты мягкая', tm:'09:15'},

    {f:'them', t:'Всегда была мягкая', tm:'09:15'},

    {d:'11 апреля'},

    {f:'them', t:'Я сегодня был у киноателье. Что ты там забыла?', tm:'19:30'},

    {f:'me', t:'Не пиши мне', tm:'19:45'},

    {f:'them', t:'Ты была с мужчиной. Взрослым. Кто это?', tm:'19:47'},

    {f:'me', t:'Если ты не прекратишь, я обращусь в полицию', tm:'19:50'},

    {f:'them', t:'Ты не сделаешь этого. Ты меня знаешь', tm:'19:51'},

    {f:'them', t:'Я просто хочу, чтобы ты была в безопасности', tm:'19:55'},

    {f:'them', t:'У тебя руки тряслись, я видел', tm:'19:56'},

    {d:'12 апреля'},

    {f:'them', t:'Кто этот мужик', tm:'23:40'},

    {f:'them', t:'Я знаю, что он тебя куда-то водит', tm:'23:41'},

    {f:'them', t:'Ты пропадёшь. Я чувствую', tm:'23:42'},

    {d:'13 апреля'},

    {f:'them', t:'Ты была на показе? Я тебя не видел', tm:'22:30'},

    {f:'them', t:'Марина?', tm:'23:40'},

    {f:'them', t:'Твой жених орал на весь двор. Говорит, ты пропала', tm:'00:02'},

    {f:'them', t:'Если ты ушла к тому мужику — лучше скажи сразу', tm:'00:03'},

    {f:'them', t:'Марина', tm:'01:30'},

    {f:'them', t:'Я найду тебя', tm:'01:31'}
  ]
},

/* ============================================================
   ДИАЛОГ 5 — СОНЯ (соседка)
   ============================================================ */
sonya: {
  unlocked: true,
  unread: 2,
  ev: 'sonya_timeline',
  messages: [
    {d:'11 апреля'},

    {f:'them', t:'Мар, я оставила твою посылку на кухне', tm:'16:10'},

    {f:'me', t:'Спасибо', tm:'16:12'},

    {f:'them', t:'Что там? Опять объектив?', tm:'16:13'},

    {f:'me', t:'Штатив. Старый, советский. Нашла на авито', tm:'16:14'},

    {f:'them', t:'Ты маньячка 😂', tm:'16:15'},

    {d:'12 апреля'},

    {f:'them', t:'Мар, ты придёшь сегодня? Я хотела оставить тебе ключи', tm:'17:00'},

    {f:'me', t:'Приду поздно. Оставь под коврик', tm:'17:12'},

    {f:'them', t:'Ок. Ты поела вообще?', tm:'17:13'},

    {f:'me', t:'Потом', tm:'17:14'},

    {f:'them', t:'Ты так сгоришь. Ладно, я уеду к родителям до воскресенья', tm:'17:15'},

    {f:'me', t:'Хорошо, спасибо', tm:'17:16'},

    {f:'them', t:'Ты точно в порядке?', tm:'17:17'},

    {f:'me', t:'Точно', tm:'17:18'},

    {f:'them', t:'Ок. Если что — пиши. Даже ночью', tm:'17:19'},

    {d:'13 апреля'},

    {f:'them', t:'Мар, я вернулась. Тебя нет, постель не тронута', tm:'19:20'},

    {f:'them', t:'Твоя куртка на стуле. Ты выходила без куртки? На улице +4', tm:'19:22'},

    {f:'them', t:'Звонила Лене, она тоже тебя ищет', tm:'19:40'},

    {f:'them', t:'Полиция была. Спрашивали про тебя и про Артёма', tm:'21:10'},

    {f:'them', t:'Марин, я нашла твой телефон под диваном в гостиной. Он был выключен', tm:'21:15'},

    {f:'them', t:'Я включила. Там куча пропущенных', tm:'21:16'},

    {f:'them', t:'Я отдам его следователю. Если ты это читаешь — позвони', tm:'21:20'},

    {f:'them', t:'Пожалуйста', tm:'21:21'}
  ]
},

/* ============================================================
   ДИАЛОГ 6 — МАМА
   ============================================================ */
mama: {
  unlocked: true,
  unread: 1,
  messages: [
    {d:'5 апреля'},

    {f:'them', t:'Мариночка, ты похудела на фото. Ты вообще ешь?', tm:'10:02'},

    {f:'me', t:'Мам, всё хорошо. Просто работа', tm:'10:30'},

    {f:'them', t:'Приезжай на выходных, я напеку пирог', tm:'10:31'},

    {f:'me', t:'После показа приеду. Обещаю', tm:'10:33'},

    {f:'them', t:'Какой показ?', tm:'10:34'},

    {f:'me', t:'Диплом. Я тебе говорила', tm:'10:35'},

    {f:'them', t:'Ах да. Я приду', tm:'10:36'},

    {f:'me', t:'Не надо, мам. Он поздний', tm:'10:40'},

    {f:'them', t:'Я приду', tm:'10:41'},

    {f:'me', t:'Хорошо', tm:'10:42'},

    {d:'10 апреля'},

    {f:'them', t:'Я пересматривала старые кассеты с Кириллом', tm:'20:12'},

    {f:'them', t:'Такой маленький был. Смешной', tm:'20:13'},

    {f:'me', t:'Мам, не надо', tm:'20:30'},

    {f:'them', t:'Почему?', tm:'20:31'},

    {f:'me', t:'Потому что я не хочу сейчас об этом', tm:'20:32'},

    {f:'them', t:'Ты не хочешь об этом четыре года', tm:'20:40'},

    {f:'me', t:'Мам, пожалуйста', tm:'20:41'},

    {f:'them', t:'Ладно. Прости', tm:'20:45'},

    {d:'12 апреля'},

    {f:'them', t:'Как ты себя чувствуешь?', tm:'08:20'},

    {f:'me', t:'Хорошо', tm:'08:25'},

    {f:'them', t:'Марин', tm:'08:26'},

    {f:'me', t:'Что?', tm:'08:27'},

    {f:'them', t:'Я знаю, что ты что-то делаешь. Не одна', tm:'08:28'},

    {f:'me', t:'Не понимаю о чём ты', tm:'08:30'},

    {f:'them', t:'Отец бы не одобрил', tm:'08:31'},

    {f:'me', t:'Отец умер', tm:'08:32'},

    {f:'them', t:'Вот именно', tm:'08:33'},

    {d:'13 апреля'},

    {f:'them', t:'Марина, мне звонила Лена. Что случилось?', tm:'23:30'},

    {f:'them', t:'Марина, возьми трубку', tm:'23:55'},

    {f:'them', t:'Я еду в город', tm:'00:40'},

    {f:'them', t:'Позвони мне. Прошу', tm:'01:22'}
  ]
},

/* ============================================================
   ДИАЛОГ 7 — НЕИЗВЕСТНЫЙ (+7 9•• ••• 74 2)
   ============================================================ */
unknown: {
  unlocked: true,
  unread: 3,
  ev: 'threat',
  messages: [
    {d:'7 апреля'},

    {f:'them', t:'Марина Соколова?', tm:'21:02'},

    {f:'me', t:'Кто это?', tm:'21:30'},

    {f:'them', t:'Неважно. Важно то, что ты копаешь не там, где надо', tm:'21:31'},

    {f:'me', t:'Я не понимаю, о чём вы', tm:'21:33'},

    {f:'them', t:'Ты понимаешь. Кирилл Соколов. Кольцевая трасса. 2019 год', tm:'21:34'},

    {f:'me', t:'...', tm:'21:40'},

    {f:'them', t:'Оставь прошлое в покое. У тебя вся жизнь впереди', tm:'21:41'},

    {f:'me', t:'Вы знаете, кто это сделал?', tm:'21:45'},

    {f:'them', t:'Я знаю, что бывает с теми, кто задаёт такие вопросы', tm:'21:47'},

    {f:'them', t:'Ты симпатичная. Молодая. Тебе не нужно это', tm:'21:48'},

    {f:'me', t:'Я не боюсь вас', tm:'21:50'},

    {f:'them', t:'Зря', tm:'21:51'},

    {d:'10 апреля'},

    {f:'them', t:'Последнее предупреждение', tm:'22:15'},

    {f:'them', t:'Откажись от показа. Скажи, что передумала', tm:'22:16'},

    {f:'me', t:'Нет', tm:'22:40'},

    {f:'them', t:'Тогда пеняй на себя', tm:'22:41'},

    {d:'12 апреля'},

    {f:'them', t:'Я видел тебя сегодня', tm:'23:40'},

    {f:'them', t:'Красивое пальто', tm:'23:41'},

    {f:'them', t:'Жаль будет', tm:'23:42'},

    {f:'voice', dur:'0:19', tm:'23:44'}
  ]
},

/* ============================================================
   ДИАЛОГ 8 — КИНОАТЕЛЬЕ «СОКОЛ»
   ============================================================ */
studio: {
  unlocked: false,
  unread: 0,
  ev: 'studio_booking',
  requiresFlag: 'saw_viktor_chat',
  messages: [
    {d:'11 апреля'},

    {f:'them', t:'Марина, подтверждаем бронь павильона №3 на 13 апреля, 23:00–01:00', tm:'16:00'},

    {f:'me', t:'Спасибо. Ключ у администратора?', tm:'16:10'},

    {f:'them', t:'Да. И ещё — вам звонили из офиса господина Крылова. Интересовались вашей бронью', tm:'16:12'},

    {f:'me', t:'Что именно интересовало?', tm:'16:14'},

    {f:'them', t:'Уточняли, будете ли вы одна', tm:'16:15'},

    {f:'me', t:'Понятно. Спасибо', tm:'16:20'},

    {f:'them', t:'Если что-то нужно — напишите. Мы вас прикроем', tm:'16:21'}
  ]
},

/* ============================================================
   ДИАЛОГ 9 — ГРУППА «КИНО, ВИНО И ДОМИНО»
   ============================================================ */
groupFriends: {
  unlocked: true,
  unread: 6,
  ev: null,
  messages: [
    {d:'5 апреля'},

    {f:'sys', t:'Лена добавила Антона в группу', tm:'12:15'},

    {f:'them', t:'Люди, кто идёт на показ Марины?', tm:'12:20', who:'Лена'},

    {f:'them', t:'Я', tm:'12:21', who:'Антон'},

    {f:'them', t:'Я с девушкой', tm:'12:22', who:'Дима'},

    {f:'them', t:'Дима, блин', tm:'12:22', who:'Лена'},

    {f:'them', t:'Что? Он же её фильм будет смотреть', tm:'12:23', who:'Дима'},

    {f:'them', t:'Её бывший парень идёт на её показ. Нормально вообще', tm:'12:24', who:'Лена'},

    {f:'them', t:'Я не буду ничего делать', tm:'12:25', who:'Дима'},

    {f:'them', t:'Я тоже иду. Марина пригласила', tm:'12:30', who:'Соня'},

    {f:'them', t:'Все идём 🎬', tm:'12:31', who:'Лена'},

    {d:'13 апреля'},

    {f:'them', t:'Мы в зале. Где ты??', tm:'21:52', who:'Лена'},

    {f:'them', t:'Марин, ты куда пропала', tm:'22:15', who:'Соня'},

    {f:'them', t:'Я видел, как она выходила через служебный вход', tm:'22:20', who:'Антон'},

    {f:'them', t:'С кем??', tm:'22:21', who:'Лена'},

    {f:'them', t:'С каким-то мужиком. В тёмном пальто', tm:'22:22', who:'Антон'},

    {f:'them', t:'Я не знаю его. Я не видела его раньше', tm:'22:23', who:'Соня'},

    {f:'them', t:'Я пошёл за ними, но они свернули за угол', tm:'22:24', who:'Антон'},

    {f:'them', t:'Кто-нибудь знает её жениха?', tm:'22:25', who:'Лена'},

    {f:'them', t:'Он в зале. Он тоже её ищет', tm:'22:26', who:'Соня'},

    {f:'them', t:'Так, это плохо. Я звоню в полицию', tm:'22:30', who:'Лена'}
  ]
},

/* ============================================================
   ДИАЛОГ 10 — ГРУППА «ДИПЛОМ — ГРУППА 4Б»
   ============================================================ */
groupStudy: {
  unlocked: true,
  unread: 1,
  messages: [
    {d:'9 апреля'},

    {f:'them', t:'Кто защищается 15-го?', tm:'13:20', who:'Мария С.'},

    {f:'them', t:'Я, Настя и Марина', tm:'13:22', who:'Антон'},

    {f:'them', t:'Марина, ты показываешь свой фильм?', tm:'13:23', who:'Мария С.'},

    {f:'me', t:'Да. В пятницу', tm:'13:30'},

    {f:'them', t:'Это тот, про аварию?', tm:'13:31', who:'Мария С.'},

    {f:'me', t:'Да', tm:'13:32'},

    {f:'them', t:'Я бы не стала', tm:'13:35', who:'Мария С.'},

    {f:'me', t:'Почему?', tm:'13:36'},

    {f:'them', t:'Ну это личное всё-таки. Виктор Павлович против был', tm:'13:37', who:'Мария С.'},

    {f:'me', t:'Это не имеет значения', tm:'13:40'},

    {d:'13 апреля'},

    {f:'them', t:'Марина, ты где? Мы у входа', tm:'21:50', who:'Антон'},

    {f:'them', t:'Марин?', tm:'22:30', who:'Антон'},

    {f:'them', t:'Мы не можем найти её. Кто-нибудь знает её телефон?', tm:'22:45', who:'Мария С.'}
  ]
},

/* ============================================================
   ДИАЛОГ 11 — АНДРЕЙ КРЫЛОВ (продюсер)
   ============================================================ */
krylov: {
  unlocked: true,
  unread: 2,
  messages: [
    {d:'2 апреля'},

    {f:'them', t:'Марина Андреевна, здравствуйте. Мне рекомендовали вас как перспективного режиссёра', tm:'11:15'},

    {f:'me', t:'Спасибо. Кто рекомендовал, если не секрет?', tm:'11:20'},

    {f:'them', t:'Виктор Павлович. Мы с ним давние знакомые', tm:'11:21'},

    {f:'me', t:'Понятно', tm:'11:22'},

    {f:'them', t:'Я видел ваш дипломный фильм. Точнее, черновую сборку', tm:'11:25'},

    {f:'me', t:'Каким образом?', tm:'11:26'},

    {f:'them', t:'Это не важно. Важно, что вы очень талантливы', tm:'11:27'},

    {f:'them', t:'Но вторая часть — это не искусство. Это оружие', tm:'11:28'},

    {f:'me', t:'Это правда. Это не оружие', tm:'11:30'},

    {f:'them', t:'Правда бывает разной. И у каждой правды есть цена', tm:'11:32'},

    {d:'8 апреля'},

    {f:'them', t:'Я готов предложить вам контракт на полнометражный фильм', tm:'15:00'},

    {f:'them', t:'Бюджет — 12 миллионов. Продюсерский центр мой', tm:'15:01'},

    {f:'me', t:'При условии?', tm:'15:10'},

    {f:'them', t:'Уберите вторую часть', tm:'15:11'},

    {f:'me', t:'Нет', tm:'15:12'},

    {f:'them', t:'Я не тороплюсь. У вас есть время до конца недели', tm:'15:13'},

    {d:'12 апреля'},

    {f:'them', t:'Я слышал, вы всё же показываете фильм. Жаль', tm:'18:00'},

    {f:'them', t:'Очень жаль', tm:'18:01'},

    {f:'them', t:'Вас предупреждали', tm:'18:02'},

    {d:'13 апреля'},

    {f:'them', t:'Показ был сильным. Поздравляю', tm:'22:15'},

    {f:'them', t:'Надеюсь, вы понимаете, что наделали', tm:'22:16'}
  ]
},

/* ============================================================
   ДИАЛОГ 12 — КИРИЛЛ (погибший брат, последний чат)
   ============================================================ */
kirill: {
  unlocked: true,
  unread: 0,
  ev: 'chat_kirill',
  messages: [
    {d:'13 сентября 2019'},

    {f:'them', t:'Мар, я выехал. Буду через час', tm:'23:40'},

    {f:'me', t:'Не гони. Поздно уже', tm:'23:42'},

    {f:'them', t:'Да я аккуратно. Просто хочу успеть до закрытия', tm:'23:43'},

    {f:'me', t:'Ты мог завтра забрать', tm:'23:44'},

    {f:'them', t:'Завтра я работаю с утра. Лан, всё, отключаюсь', tm:'23:45'},

    {f:'me', t:'Напиши, как доедешь', tm:'23:46'},

    {f:'them', t:'Обязательно. Люблю тебя, зануда ❤️', tm:'23:47'},

    {f:'me', t:'И я тебя', tm:'23:47'},

    {d:'14 сентября 2019'},

    {f:'me', t:'Кир, ты где?', tm:'00:30'},

    {f:'me', t:'Кир?', tm:'01:15'},

    {f:'me', t:'Ты не берёшь трубку. Перезвони', tm:'02:00'},

    {f:'me', t:'Кирилл', tm:'02:30'},

    {f:'me', t:'Пожалуйста', tm:'03:00'},

    {f:'sys', t:'Сообщения больше не доставляются', tm:'04:15'},

    {f:'me', t:'Кир, я знаю. Я знаю, что ты не ответишь', tm:'05:00'},

    {f:'me', t:'Прости меня', tm:'05:01'},

    {f:'me', t:'Прости', tm:'05:02'}
  ]
},

/* ============================================================
   ДИАЛОГ 13 — НОМЕР СКРЫТ
   ============================================================ */
unknownVoice: {
  unlocked: true,
  unread: 0,
  ev: 'threat_voice',
  messages: [
    {d:'11 апреля'},

    {f:'voice', dur:'0:42', tm:'03:14'},

    {d:'12 апреля'},

    {f:'voice', dur:'0:08', tm:'02:40'}
  ]
},

/* ============================================================
   ДИАЛОГ 14 — ЮЛЯ СОКОЛОВА (невестка)
   ============================================================ */
yulia: {
  unlocked: true,
  unread: 1,
  messages: [
    {d:'6 апреля'},

    {f:'them', t:'Мариш, привет. Как ты?', tm:'14:20'},

    {f:'me', t:'Привет. Нормально. Ты как?', tm:'14:25'},

    {f:'them', t:'Да я тоже. Слушай, я хотела спросить...', tm:'14:26'},

    {f:'them', t:'Ты правда показываешь фильм про аварию?', tm:'14:27'},

    {f:'me', t:'Да', tm:'14:28'},

    {f:'them', t:'Кир бы не хотел этого', tm:'14:30'},

    {f:'me', t:'Ты не знаешь, чего бы он хотел', tm:'14:35'},

    {f:'them', t:'Прости. Я не хотела тебя задеть', tm:'14:36'},

    {f:'them', t:'Просто... это наша семья. Это наша боль. Не только твоя', tm:'14:38'},

    {f:'me', t:'Юль, я знаю', tm:'14:40'},

    {f:'me', t:'Но кто-то должен был это сделать', tm:'14:41'},

    {f:'them', t:'Кто-то должен был это сделать четыре года назад', tm:'14:42'},

    {d:'13 апреля'},

    {f:'them', t:'Мариш, ты где? Мне Лена написала, что ты пропала', tm:'23:55'},

    {f:'them', t:'Позвони. Пожалуйста', tm:'23:56'}
  ]
},

/* ============================================================
   ДИАЛОГ 15 — АНТОН ВЕТРОВ (одногруппник)
   ============================================================ */
anton: {
  unlocked: true,
  unread: 3,
  ev: 'anton_testimony',
  messages: [
    {d:'12 апреля'},

    {f:'them', t:'Марин, ты будешь на репетиции завтра?', tm:'11:00'},

    {f:'me', t:'Нет, у меня свои дела. Но на показ приду', tm:'11:15'},

    {f:'them', t:'Понял. Ты какая-то напряжённая последние дни', tm:'11:16'},

    {f:'me', t:'Так. Наверное, из-за показа', tm:'11:20'},

    {f:'them', t:'Если нужна помощь — я рядом', tm:'11:21'},

    {f:'me', t:'Спасибо, Антон', tm:'11:22'},

    {d:'13 апреля'},

    {f:'them', t:'Марин, я видел тебя у служебного входа', tm:'22:20'},

    {f:'them', t:'Ты выходила с каким-то мужчиной в тёмном пальто', tm:'22:21'},

    {f:'them', t:'Я не понял, кто это. Ты была бледная', tm:'22:22'},

    {f:'them', t:'Я хотел подойти, но вы быстро сели в машину', tm:'22:23'},

    {f:'them', t:'Марин, ты в порядке?', tm:'22:40'},

    {f:'them', t:'Позвони мне', tm:'23:30'},

    {f:'them', t:'Лена сказала, что тебя нигде нет', tm:'23:55'},

    {f:'them', t:'Я рассказал полиции, что видел', tm:'01:15'}
  ]
},

/* ============================================================
   ДИАЛОГ 16 — ОЛЬГА СОКОЛОВСКАЯ (жена Виктора)
   ============================================================ */
olga: {
  unlocked: true,
  unread: 0,
  messages: [
    {d:'3 апреля'},

    {f:'them', t:'Марина, здравствуйте. Это Ольга, жена Виктора Павловича', tm:'18:20'},

    {f:'me', t:'Здравствуйте. Что-то случилось?', tm:'18:25'},

    {f:'them', t:'Нет-нет. Я просто хотела с вами поговорить', tm:'18:26'},

    {f:'me', t:'О чём?', tm:'18:28'},

    {f:'them', t:'О вашем фильме. Мой муж очень переживает из-за него', tm:'18:30'},

    {f:'me', t:'Это его работа — переживать за дипломные работы студентов', tm:'18:32'},

    {f:'them', t:'Да, но это другое', tm:'18:34'},

    {f:'them', t:'Вы не знаете всей правды', tm:'18:35'},

    {f:'me', t:'Какой правды?', tm:'18:36'},

    {f:'them', t:'Прошу вас. Не показывайте этот фильм', tm:'18:40'},

    {f:'me', t:'Почему?', tm:'18:41'},

    {f:'them', t:'Просто послушайте меня. Один раз', tm:'18:42'},

    {f:'me', t:'Я не могу', tm:'18:44'},

    {f:'them', t:'Тогда я вам не завидую', tm:'18:45'},

    {f:'them', t:'И ему тоже', tm:'18:46'}
  ]
},

/* ============================================================
   ДИАЛОГ 17 — ВАДИМ СОКОЛОВСКИЙ (сын Виктора)
   ============================================================ */
vadim: {
  unlocked: true,
  unread: 2,
  messages: [
    {d:'11 апреля'},

    {f:'them', t:'Привет. Ты Марина?', tm:'20:10'},

    {f:'me', t:'Да. А ты кто?', tm:'20:15'},

    {f:'them', t:'Вадим. Сын Виктора Павловича', tm:'20:16'},

    {f:'me', t:'Слушаю', tm:'20:18'},

    {f:'them', t:'Отец мне всё рассказал', tm:'20:20'},

    {f:'me', t:'Что рассказал?', tm:'20:21'},

    {f:'them', t:'Про тебя. Про фильм. Про всё', tm:'20:22'},

    {f:'me', t:'И?', tm:'20:23'},

    {f:'them', t:'И я советую тебе остановиться. По-хорошему', tm:'20:25'},

    {f:'me', t:'Ты мне угрожаешь?', tm:'20:28'},

    {f:'them', t:'Я предупреждаю', tm:'20:29'},

    {f:'them', t:'Отец не тот, кем кажется. Он умеет убеждать', tm:'20:30'},

    {f:'them', t:'Но я не он. Я умею делать больно', tm:'20:31'},

    {d:'13 апреля'},

    {f:'them', t:'Ты не послушала', tm:'23:15'},

    {f:'them', t:'Дура', tm:'23:16'}
  ]
},

/* ============================================================
   ДИАЛОГ 18 — АНОНИМ (без имени)
   ============================================================ */
anonim: {
  unlocked: true,
  unread: 0,
  messages: [
    {d:'14 апреля'},

    {f:'them', t:'Ты нашла телефон?', tm:'03:40'},

    {f:'them', t:'Хорошо. Не выключай', tm:'03:41'},

    {f:'them', t:'Она записывала всё. Я знаю', tm:'03:42'},

    {f:'them', t:'Ты уже слышала его голос?', tm:'03:43'},

    {f:'them', t:'Найди аудио. Оно в заметках', tm:'03:44'},

    {f:'them', t:'Если ты не сделаешь это — он сделает с кем-то другим', tm:'03:45'},

    {f:'them', t:'Я больше ничего не могу сказать', tm:'03:46'}
  ]
}

};

/* ------------------------------------------------------------
   ФУНКЦИИ ПРИЛОЖЕНИЯ «СООБЩЕНИЯ»
   ------------------------------------------------------------ */

/* Список диалогов */
ROUTES.chats = function(){
  G.screen = 'chats';

  /* Обновляем разблокировки по флагам */
  if(typeof CHATS.studio !== 'undefined'){
    if(hasFlag('saw_viktor_chat')) CHATS.studio.unlocked = true;
  }

  /* Порядок: закреплённые сверху, затем по последнему сообщению */
  const order = [];
  for(const k in CHATS){
    if(!CHATS[k].unlocked) continue;
    const lastMsg = findLastRealMessage(CHATS[k].messages);
    order.push({
      key: k,
      chat: CHATS[k],
      last: lastMsg,
      ts: lastMsg ? timeToScore(lastMsg.tm) : 0,
      pinned: CHATS[k].pinned
    });
  }

  /* Сортируем: закреплённые вперёд, затем по времени */
  order.sort(function(a, b){
    if(a.pinned && !b.pinned) return -1;
    if(!a.pinned && b.pinned) return 1;
    return b.ts - a.ts;
  });

  const totalUnread = order.reduce(function(sum, o){
    return sum + (o.chat.unread || 0);
  }, 0);

  const rows = order.map(function(o){
    return renderChatRow(o.key, o.chat, o.last);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Сообщения</h2>'
  +     '<div class="sub">' + order.length + ' диалогов'
  +       (totalUnread ? ' · ' + totalUnread + ' непрочитанных' : '')
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="searchChats()">' + svg('search', 18) + '</button>'
  + '</div>'
  + '<div class="chatlist">' + rows + '</div>');
};

function findLastRealMessage(msgs){
  for(let i = msgs.length - 1; i >= 0; i--){
    const m = msgs[i];
    if(m.d) continue;
    if(m.t || m.f === 'voice' || m.f === 'photo' || m.f === 'file') return m;
  }
  return null;
}

function timeToScore(tm){
  if(!tm) return 0;
  const parts = tm.split(':');
  const h = parseInt(parts[0]) || 0;
  const m = parseInt(parts[1]) || 0;
  return h * 60 + m;
}

function renderChatRow(key, chat, last){
  const ct = CONTACTS[key];
  if(!ct) return '';

  let preview = '—';
  if(last){
    if(last.f === 'voice') preview = svg('mic', 12) + ' Голосовое · ' + (last.dur || '0:00');
    else if(last.f === 'photo') preview = svg('image', 12) + ' Фотография';
    else if(last.f === 'file') preview = svg('file', 12) + ' ' + (last.name || 'Файл');
    else if(last.f === 'sys') preview = escapeHtml(last.t);
    else preview = (last.f === 'me' ? 'Вы: ' : '') + escapeHtml(last.t || '');
  }

  const unreadBadge = (chat.unread > 0)
    ? '<span class="unread-badge">' + (chat.unread > 99 ? '99+' : chat.unread) + '</span>'
    : '';

  const pinIcon = chat.pinned
    ? '<div class="pinned-icon">' + svg('pin', 11) + '</div>'
    : '';

  const lockIcon = !chat.unlocked
    ? '<div class="locked-icon">' + svg('lock', 14) + '</div>'
    : '';

  return ''
  + '<div class="chatrow ' + (chat.unlocked ? '' : 'locked') + '" '
  +   'onclick="' + (chat.unlocked ? 'openChat(\'' + key + '\')' : 'chatLocked(\'' + key + '\')') + '">'
  +   '<div class="avatar" style="background:' + ct.color + '">'
  +     ct.av
  +     (ct.online ? '<span class="online"></span>' : '')
  +   '</div>'
  +   '<div class="body">'
  +     '<div class="top">'
  +       '<span class="nm">' + escapeHtml(ct.short || ct.name) + '</span>'
  +       '<span class="tm">' + (last && last.tm ? last.tm : '') + pinIcon + '</span>'
  +     '</div>'
  +     '<div class="pv">' + preview + lockIcon + '</div>'
  +   '</div>'
  +   unreadBadge
  + '</div>';
}

/* Заглушка для заблокированных диалогов */
function chatLocked(key){
  toast('Диалог недоступен', 'Данные защищены. Требуется доступ.', 'warn');
}

/* Поиск по сообщениям */
function searchChats(){
  toast('Поиск', 'Функция откроется по сюжету', 'warn');
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ ДИАЛОГА
   ------------------------------------------------------------ */
function openChat(key){
  const chat = CHATS[key];
  const ct = CONTACTS[key];
  if(!chat || !ct) return;

  /* Сбрасываем счётчик непрочитанных */
  if(chat.unread > 0) chat.unread = 0;

  /* Улика за первый визит */
  if(chat.ev && !hasEv(chat.ev)){
    addEv(chat.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[chat.ev] || 'Найдена новая улика', 'ev');
    }, 400);
  }

  /* Флаги сюжета */
  if(key === 'viktor') setFlag('saw_viktor_chat');
  if(key === 'unknown') setFlag('saw_threats');
  if(key === 'lena') setFlag('saw_lena_chat');
  if(key === 'dima') setFlag('saw_dima_chat');
  if(key === 'artem') setFlag('saw_artem_chat');
  if(key === 'sonya') setFlag('saw_sonya_chat');
  if(key === 'kirill') setFlag('saw_kirill_chat');
  if(key === 'anton') setFlag('saw_anton_chat');
  if(key === 'krylov') setFlag('saw_krylov_chat');
  if(key === 'olga') setFlag('saw_olga_chat');
  if(key === 'vadim') setFlag('saw_vadim_chat');
  if(key === 'mama') setFlag('saw_mama_chat');
  if(key === 'yulia') setFlag('saw_yulia_chat');
  if(key === 'anonim') setFlag('saw_anonim_chat');

  /* Разблокировка служебного чата ателье */
  if(key === 'viktor' && CHATS.studio && !CHATS.studio.unlocked){
    CHATS.studio.unlocked = true;
    setTimeout(function(){
      toast('🔓 Новый диалог', 'Открыт чат «Киноателье «Сокол»»', 'ok');
    }, 900);
  }

  renderChatView(key);
}

/* ------------------------------------------------------------
   ОТРИСОВКА ДИАЛОГА
   ------------------------------------------------------------ */
function renderChatView(key){
  const chat = CHATS[key];
  const ct = CONTACTS[key];
  if(!chat || !ct) return;

  const msgs = chat.messages.map(function(m){
    return renderMessage(m, key);
  }).join('');

  render(''
  + '<div class="appbar chat-appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="avatar small" style="background:' + ct.color + '">' + ct.av + '</div>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(ct.short || ct.name) + '</h2>'
  +     '<div class="sub">' + escapeHtml(ct.status || ct.role) + '</div>'
  +   '</div>'
  +   '<button class="back" onclick="chatInfo(\'' + key + '\')">' + svg('info', 18) + '</button>'
  + '</div>'
  + '<div class="msgs" id="msgs">' + msgs + '</div>');

  /* Прокрутка вниз */
  setTimeout(function(){
    const el = document.getElementById('msgs');
    if(el) $view.scrollTop = $view.scrollHeight;
  }, 40);

  beep(520, 0.03);
}

/* ------------------------------------------------------------
   ОТРИСОВКА ОДНОГО СООБЩЕНИЯ
   ------------------------------------------------------------ */
function renderMessage(m, chatKey){
  /* Разделитель дня */
  if(m.d){
    return '<div class="daysep">' + escapeHtml(m.d) + '</div>';
  }

  /* Системное */
  if(m.f === 'sys'){
    return '<div class="msg-sys">' + escapeHtml(m.t) + '</div>';
  }

  /* Кто и класс */
  const side = m.f === 'me' ? 'me' : 'them';
  const cls = 'bub ' + side;
  const who = m.who
    ? '<div class="who">' + escapeHtml(m.who) + '</div>'
    : '';

  /* Голосовое */
  if(m.f === 'voice'){
    const bars = Array.from({length: 22}, function(_, i){
      const h = 5 + ((i * 7) % 15);
      return '<i style="height:' + h + 'px"></i>';
    }).join('');
    return ''
    + '<div class="' + cls + ' voice" onclick="playVoice(\'' + chatKey + '\', \'' + (m.dur || '0:00') + '\')">'
    +   '<div class="playbtn">' + svg('play', 14, 'fill') + '</div>'
    +   '<div class="wave">' + bars + '</div>'
    +   '<div class="dur">' + (m.dur || '0:00') + '</div>'
    +   '<span class="t">' + (m.tm || '') + '</span>'
    + '</div>';
  }

  /* Фото */
  if(m.f === 'photo'){
    return ''
    + '<div class="' + cls + ' photo" onclick="openChatPhoto(\'' + chatKey + '\')">'
    +   '<div class="fakeimg">' + (m.ico || '🖼') + '</div>'
    +   (m.cap ? '<div class="cap">' + escapeHtml(m.cap) + '</div>' : '')
    +   '<span class="t">' + (m.tm || '') + '</span>'
    + '</div>';
  }

  /* Файл */
  if(m.f === 'file'){
    return ''
    + '<div class="' + cls + ' file">'
    +   '<div class="fileico">' + svg('fileText', 20) + '</div>'
    +   '<div class="filemeta">'
    +     '<div class="fname">' + escapeHtml(m.name || 'файл') + '</div>'
    +     '<div class="fsize">' + escapeHtml(m.size || '') + '</div>'
    +   '</div>'
    +   '<span class="t">' + (m.tm || '') + '</span>'
    + '</div>';
  }

  /* Обычное текстовое */
  return ''
  + '<div class="' + cls + '">'
  +   who
  +   escapeHtml(m.t || '')
  +   (m.tm ? '<span class="t">' + m.tm + '</span>' : '')
  + '</div>';
}

/* ------------------------------------------------------------
   ИНФО О ДИАЛОГЕ
   ------------------------------------------------------------ */
function chatInfo(key){
  const ct = CONTACTS[key];
  const chat = CHATS[key];
  if(!ct) return;

  const msgCount = chat.messages.filter(function(m){
    return !m.d && m.f !== 'sys';
  }).length;

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Информация</h2></div>'
  + '</div>'
  + '<div class="chatinfo">'
  +   '<div class="avatar big" style="background:' + ct.color + '">' + ct.av + '</div>'
  +   '<h2>' + escapeHtml(ct.name) + '</h2>'
  +   '<div class="role">' + escapeHtml(ct.role) + '</div>'
  +   '<div class="stats">'
  +     '<div><b>' + msgCount + '</b><span>сообщений</span></div>'
  +     '<div><b>' + (chat.unread || 0) + '</b><span>непрочитано</span></div>'
  +   '</div>'
  +   '<div class="actions">'
  +     '<button class="btn ghost" onclick="toast(\'Звонок\',\'Абонент недоступен\',\'warn\')">'
  +       svg('phone', 16) + ' Позвонить'
  +     '</button>'
  +     '<button class="btn ghost" onclick="toast(\'Поиск\',\'Функция откроется по сюжету\',\'warn\')">'
  +       svg('search', 16) + ' Поиск'
  +     '</button>'
  +   '</div>'
  + '</div>');
}

/* ------------------------------------------------------------
   ГОЛОСОВОЕ СООБЩЕНИЕ
   ------------------------------------------------------------ */
let voicePlaying = null;

function playVoice(chatKey, dur){
  if(voicePlaying){
    clearTimeout(voicePlaying);
    voicePlaying = null;
  }
  toast('🎧 Голосовое', 'Воспроизведение...', '');

  if(chatKey === 'unknown'){
    toast('Голос изменён', '«Откажись от показа. Иначе... мы знаем, где ты живёшь»', 'warn');
    setFlag('heard_threat_voice');
    if(!hasEv('threat_voice')){
      addEv('threat_voice');
    }
  }
  if(chatKey === 'unknownVoice'){
    toast('Голос изменён', '«Ты пожалеешь. Обещаю»', 'warn');
    setFlag('heard_threat_voice2');
  }

  beep(300, 0.12, 'sine', 0.05);
  voicePlaying = setTimeout(function(){
    voicePlaying = null;
  }, 3000);
}

/* ------------------------------------------------------------
   ФОТО ИЗ ЧАТА
   ------------------------------------------------------------ */
function openChatPhoto(chatKey){
  toast('Фото', 'Открытие снимка из чата', '');
}

/* ------------------------------------------------------------
   CSS ДЛЯ ПРИЛОЖЕНИЯ СООБЩЕНИЙ
   ------------------------------------------------------------ */
(function injectChatStyles(){
  const style = document.createElement('style');
  style.textContent = ''
  + '.chatlist{padding:6px 0}'
  + '.chatrow{'
  +   'display:flex;gap:13px;padding:13px 16px;cursor:pointer;'
  +   'transition:.12s;border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;position:relative;'
  + '}'
  + '.chatrow:hover{background:var(--panel2)}'
  + '.chatrow.locked{opacity:.5}'
  + '.chatrow .avatar{'
  +   'width:50px;height:50px;border-radius:50%;flex:0 0 50px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:17px;font-weight:600;color:#fff;position:relative;'
  +   'letter-spacing:.3px;'
  + '}'
  + '.chatrow .avatar.small{width:34px;height:34px;flex:0 0 34px;font-size:12px}'
  + '.chatrow .avatar.big{width:80px;height:80px;flex:0 0 80px;font-size:26px;margin-bottom:14px}'
  + '.chatrow .avatar .online{'
  +   'position:absolute;bottom:2px;right:2px;'
  +   'width:11px;height:11px;border-radius:50%;'
  +   'background:var(--ok);border:2px solid var(--bg);'
  + '}'
  + '.chatrow .body{flex:1;min-width:0}'
  + '.chatrow .top{'
  +   'display:flex;justify-content:space-between;'
  +   'align-items:baseline;gap:8px;'
  + '}'
  + '.chatrow .nm{font-size:14.5px;font-weight:600;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.chatrow .tm{'
  +   'font-size:11px;color:var(--dim);flex:0 0 auto;'
  +   'display:flex;align-items:center;gap:4px;'
  + '}'
  + '.chatrow .pv{'
  +   'font-size:12.5px;color:var(--dim);margin-top:3px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  +   'display:flex;align-items:center;gap:4px;'
  + '}'
  + '.chatrow .pv .icon{flex:0 0 auto;opacity:.7}'
  + '.chatrow .unread-badge{'
  +   'position:absolute;right:14px;bottom:12px;'
  +   'min-width:20px;height:20px;border-radius:10px;'
  +   'background:var(--acc);color:#001;'
  +   'font-size:11px;font-weight:700;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'padding:0 6px;'
  + '}'
  + '.chatrow .pinned-icon{'
  +   'display:inline-flex;color:var(--dim);margin-left:4px;'
  + '}'
  + '.chatrow .locked-icon{'
  +   'display:inline-flex;color:var(--dim);margin-left:6px;'
  + '}'

  /* Переписка */
  + '.msgs{padding:16px 12px 28px;display:flex;flex-direction:column;gap:6px}'
  + '.daysep{'
  +   'align-self:center;font-size:11px;color:var(--dim);'
  +   'background:var(--panel2);padding:5px 14px;border-radius:12px;'
  +   'margin:14px 0 8px;border:1px solid var(--line);'
  + '}'
  + '.msg-sys{'
  +   'align-self:center;font-size:11.5px;color:var(--dim2);'
  +   'font-style:italic;padding:6px 12px;text-align:center;'
  +   'max-width:80%;'
  + '}'
  + '.bub{'
  +   'max-width:80%;padding:9px 13px 7px;border-radius:16px;'
  +   'font-size:13.5px;line-height:1.45;position:relative;'
  +   'word-wrap:break-word;animation:msgpop .25s cubic-bezier(.4,1.4,.5,1);'
  + '}'
  + '@keyframes msgpop{'
  +   'from{opacity:0;transform:translateY(8px) scale(.96)}'
  +   'to{opacity:1;transform:none}'
  + '}'
  + '.bub .t{'
  +   'display:block;font-size:9.5px;'
  +   'color:rgba(255,255,255,.45);'
  +   'margin-top:4px;text-align:right;letter-spacing:.2px;'
  + '}'
  + '.bub .who{'
  +   'font-size:11px;font-weight:600;color:var(--acc);'
  +   'margin-bottom:3px;'
  + '}'
  + '.bub.them{'
  +   'align-self:flex-start;background:var(--panel2);'
  +   'border:1px solid var(--line);border-bottom-left-radius:5px;'
  + '}'
  + '.bub.me{'
  +   'align-self:flex-end;'
  +   'background:linear-gradient(140deg,#3d7cd4,#5da9ff);'
  +   'border-bottom-right-radius:5px;'
  +   'color:#fff;'
  + '}'
  + '.bub.me .t{color:rgba(255,255,255,.55)}'

  /* Голосовое */
  + '.bub.voice{'
  +   'display:flex;align-items:center;gap:9px;'
  +   'cursor:pointer;padding:10px 13px;'
  +   'min-width:180px;'
  + '}'
  + '.bub.voice .playbtn{'
  +   'width:26px;height:26px;border-radius:50%;'
  +   'background:rgba(255,255,255,.15);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 26px;color:currentColor;'
  + '}'
  + '.bub.voice .wave{'
  +   'display:flex;align-items:center;gap:2px;height:22px;flex:1;'
  + '}'
  + '.bub.voice .wave i{'
  +   'display:block;width:2.5px;background:currentColor;'
  +   'border-radius:2px;opacity:.85;'
  + '}'
  + '.bub.voice .dur{'
  +   'font-size:11px;opacity:.8;margin-left:auto;'
  +   'font-variant-numeric:tabular-nums;'
  + '}'

  /* Фото */
  + '.bub.photo{padding:5px;border-radius:14px;cursor:pointer}'
  + '.bub.photo .fakeimg{'
  +   'width:200px;height:130px;border-radius:10px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:38px;'
  +   'background:linear-gradient(140deg,#2a3444,#161c28);'
  +   'border:1px solid var(--line);'
  + '}'
  + '.bub.photo .cap{'
  +   'font-size:11.5px;padding:6px 8px 3px;opacity:.85;'
  + '}'

  /* Файл */
  + '.bub.file{'
  +   'display:flex;align-items:center;gap:11px;'
  +   'min-width:210px;padding:10px 13px;'
  + '}'
  + '.bub.file .fileico{'
  +   'width:34px;height:34px;border-radius:9px;'
  +   'background:rgba(255,255,255,.1);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 34px;'
  + '}'
  + '.bub.file .filemeta{flex:1;min-width:0}'
  + '.bub.file .fname{font-size:12.5px;font-weight:600;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.bub.file .fsize{font-size:10.5px;opacity:.7;margin-top:2px}'

  /* Appbar чата */
  + '.chat-appbar .avatar.small{'
  +   'width:34px;height:34px;flex:0 0 34px;font-size:12px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:#fff;font-weight:600;border-radius:50%;'
  + '}'

  /* Инфо о диалоге */
  + '.chatinfo{'
  +   'padding:34px 26px;text-align:center;'
  +   'display:flex;flex-direction:column;align-items:center;'
  + '}'
  + '.chatinfo .avatar.big{'
  +   'width:80px;height:80px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:26px;font-weight:600;color:#fff;'
  +   'margin-bottom:14px;'
  + '}'
  + '.chatinfo h2{font-size:19px;font-weight:600}'
  + '.chatinfo .role{'
  +   'font-size:12.5px;color:var(--dim);margin-top:4px;'
  + '}'
  + '.chatinfo .stats{'
  +   'display:flex;gap:32px;margin-top:22px;'
  + '}'
  + '.chatinfo .stats > div{'
  +   'display:flex;flex-direction:column;align-items:center;gap:2px;'
  + '}'
  + '.chatinfo .stats b{font-size:20px;font-weight:600}'
  + '.chatinfo .stats span{'
  +   'font-size:10.5px;color:var(--dim);letter-spacing:.5px;'
  + '}'
  + '.chatinfo .actions{'
  +   'display:flex;gap:10px;margin-top:26px;'
  + '}'
  + '.chatinfo .btn{'
  +   'font-size:12.5px;padding:10px 18px;'
  + '}';

  document.head.appendChild(style);
})();

/* ------------------------------------------------------------
   СЛУЖЕБНЫЙ СЛОВАРЬ НАЗВАНИЙ УЛИК
   ------------------------------------------------------------ */
const EVIDENCE_TITLES = {
  chat_lena: 'Переписка с Леной',
  chat_viktor: 'Переписка с Виктором',
  chat_kirill: 'Последний чат с Кириллом',
  threat: 'Угрозы от неизвестного',
  threat_voice: 'Голосовое с угрозой',
  artem_alibi: 'Алиби Артёма',
  dima_stalk: 'Слежка бывшего',
  sonya_timeline: 'Показания Сони',
  studio_booking: 'Бронь павильона',
  anton_testimony: 'Показания Антона'
};

console.log(
  '%c[ЧАСТЬ 2 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nСообщения: 18 диалогов. Вставляй Часть 3 ниже.'
);

/* ... Часть 2 заканчивается здесь. Не закрывай script/body/html.
   Часть 3 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 3 из 10 — ПРИЛОЖЕНИЕ «ГАЛЕРЕЯ»
   ------------------------------------------------------------
   Полностью заменяет заглушку ROUTES.gallery.
   Содержит: SVG-миниатюры, полноэкранный просмотрщик,
   метаданные снимков, EXIF-подобную панель, триггеры улик.
   ============================================================ */

/* ------------------------------------------------------------
   ДАННЫЕ: ФОТОГРАФИИ
   ------------------------------------------------------------
   Каждая запись содержит:
   - ico: эмодзи-заглушка (используется в превью)
   - svg: ключ SVG-иллюстрации (используется в просмотрщике)
   - tag: категория
   - t: заголовок
   - txt: подробное описание
   - date, time, place: метаданные
   - ev: id улики (если есть)
   - flag: флаг сюжета
   ============================================================ */

const PHOTOS = {

  p1: {
    ico: '🎬',
    svg: 'cinema_hall',
    tag: 'показ',
    t: 'Кадр с показа',
    txt: 'Фотография сделана в зале кинотеатра «Родина» 13 апреля в 21:58. На первом ряду виден силуэт мужчины в тёмном пальто. Лицо неразборчиво.',
    date: '13 апреля',
    time: '21:58',
    place: 'Кинотеатр «Родина», зал 2',
    ev: null,
    flag: 'saw_photo_hall'
  },

  p2: {
    ico: '🚗',
    svg: 'crash_scene',
    tag: 'авария',
    t: 'Кольцевая, 2019',
    txt: 'Старое фото с места аварии. Разбитый мотоцикл, номера не читаются. На заднем плане — тёмный седан с характерной вмятиной на правом крыле. Именно это фото Марина вставила в свой фильм.',
    date: '14 сентября 2019',
    time: '02:32',
    place: 'Кольцевая трасса, 47-й км',
    ev: 'photo_crash',
    flag: 'saw_photo_crash'
  },

  p3: {
    ico: '📼',
    svg: 'reg_frame',
    tag: 'улика',
    t: 'Видеорегистратор',
    txt: 'Скриншот с записи. Ночь, мокрый асфальт. Виден момент удара. Номер автомобиля смазан, но читаются три последние цифры: 7-4-2. Время на записи: 02:14.',
    date: '14 сентября 2019',
    time: '02:14',
    place: '—',
    ev: 'photo_reg',
    flag: 'saw_photo_reg'
  },

  p4: {
    ico: '🗝️',
    svg: 'key_tag',
    tag: 'ателье',
    t: 'Ключ от павильона',
    txt: 'Фото ключа с биркой «Павильон №3». Сделано в фойе киноателье «Сокол» 13 апреля около 23:00. На заднем плане — часы, показывающие 22:51.',
    date: '13 апреля',
    time: '23:02',
    place: 'Киноателье «Сокол», фойе',
    ev: 'photo_key',
    flag: 'saw_photo_key'
  },

  p5: {
    ico: '👤',
    svg: 'figure_night',
    tag: 'люди',
    t: 'Кто-то у входа',
    txt: 'Размытое фото. Мужчина выходит из здания ателье. Время съёмки — 00:47. Походка уверенная, в руке — длинный предмет, похожий на штатив. Или на что-то другое.',
    date: '14 апреля',
    time: '00:47',
    place: 'Киноателье «Сокол», у входа',
    ev: 'photo_figure',
    flag: 'saw_photo_figure'
  },

  p6: {
    ico: '📄',
    svg: 'doc_gibdd',
    tag: 'документ',
    t: 'Справка ГИБДД',
    txt: 'Копия постановления об отказе в возбуждении дела. Дело №4471/2019. Потерпевший: Соколов Кирилл Андреевич. Виновник не установлен. Подпись инспектора — неразборчива.',
    date: '—',
    time: '—',
    place: '—',
    ev: 'doc_gibdd',
    flag: 'saw_doc_gibdd'
  },

  p7: {
    ico: '🩸',
    svg: 'blood_floor',
    tag: 'важно',
    t: 'Пятно в павильоне',
    txt: 'Фото пола в павильоне №3. Тёмное пятно у стены, частично затёртое. Снято 14 апреля в 08:12 — то есть уже после исчезновения Марины. Кто-то пытался оттереть.',
    date: '14 апреля',
    time: '08:12',
    place: 'Киноателье «Сокол», павильон №3',
    ev: 'photo_blood',
    flag: 'saw_photo_blood'
  },

  p8: {
    ico: '📱',
    svg: 'last_frame',
    tag: 'последнее',
    t: 'Последний кадр',
    txt: 'Автоспуск. Последнее фото в галерее Марины. 13 апреля, 23:52. Она стоит у зеркала в павильоне. За её спиной, в отражении, видна фигура в дверном проёме.',
    date: '13 апреля',
    time: '23:52',
    place: 'Киноателье «Сокол», павильон №3',
    ev: 'photo_last',
    flag: 'saw_photo_last'
  },

  p9: {
    ico: '🎓',
    svg: 'diploma',
    tag: 'люди',
    t: 'Виктор Павлович',
    txt: 'Фото с вручения дипломов, прошлый год. Виктор Павлович Соколовский — руководитель кафедры. Рядом с ним, на заднем плане, стоит мужчина, похожий на Крылова.',
    date: 'июнь 2023',
    time: '14:20',
    place: 'Актовый зал академии',
    ev: null,
    flag: 'saw_photo_viktor'
  },

  p10: {
    ico: '🌙',
    svg: 'studio_night',
    tag: 'ночь',
    t: 'Ателье ночью',
    txt: 'Вид на киноателье «Сокол» ночью. Горит окно на втором этаже. Время съёмки — 00:30, 14 апреля. Марина уже должна была уехать домой.',
    date: '14 апреля',
    time: '00:30',
    place: 'Улица Заводская, 14',
    ev: null,
    flag: 'saw_photo_studio_night'
  },

  p11: {
    ico: '🚙',
    svg: 'black_car',
    tag: 'машина',
    t: 'Чёрный седан',
    txt: 'Фото сделано Мариной скрытно 11 апреля. Тёмный седан с вмятиной на правом крыле припаркован у академии. Номер читается частично: ••7 •• 74 2.',
    date: '11 апреля',
    time: '15:40',
    place: 'Парковка у академии',
    ev: 'photo_car',
    flag: 'saw_photo_car'
  },

  p12: {
    ico: '📐',
    svg: 'plan_room',
    tag: 'план',
    t: 'Схема павильона',
    txt: 'Рукописная схема павильона №3, нарисованная в блокноте. Отмечены выходы, окна и одна дверь, зачёркнутая крест-накрест. Подпись: «Здесь нет выхода».',
    date: '13 апреля',
    time: '22:20',
    place: '—',
    ev: 'plan_room',
    flag: 'saw_plan_room'
  },

  p13: {
    ico: '📞',
    svg: 'phone_last',
    tag: 'телефон',
    t: 'Экран перед звонком',
    txt: 'Скриншот экрана телефона в 23:46. Открыт диалог с Виктором Павловичем. Курсор на кнопке вызова. Марина собиралась позвонить.',
    date: '13 апреля',
    time: '23:46',
    place: '—',
    ev: 'phone_before_call',
    flag: 'saw_phone_before_call'
  },

  p14: {
    ico: '🎥',
    svg: 'camera_man',
    tag: 'люди',
    t: 'Оператор',
    txt: 'Мужчина с камерой у студии. Марина сняла его украдкой. Он не знал. Время — утро 12 апреля. На груди — бейдж с логотипом продакшена.',
    date: '12 апреля',
    time: '09:15',
    place: 'Улица Пушкина',
    ev: null,
    flag: 'saw_photo_operator'
  },

  p15: {
    ico: '💌',
    svg: 'letter',
    tag: 'документ',
    t: 'Старое письмо',
    txt: 'Фото старого письма на бумаге. Аккуратный почерк. Подпись: «Я не могу так больше. Прости». Отправитель не указан. Дата в углу — 10 сентября 2019.',
    date: '10 сентября 2019',
    time: '—',
    place: '—',
    ev: 'old_letter',
    flag: 'saw_old_letter'
  },

  p16: {
    ico: '🚪',
    svg: 'door_dark',
    tag: 'ателье',
    t: 'Закрытая дверь',
    txt: 'Фото двери подсобного помещения павильона №3. Дверь закрыта снаружи на навесной замок. Снято 14 апреля в 08:14.',
    date: '14 апреля',
    time: '08:14',
    place: 'Киноателье «Сокол», павильон №3',
    ev: 'photo_door',
    flag: 'saw_photo_door'
  },

  p17: {
    ico: '🌧',
    svg: 'rain_window',
    tag: 'атмосфера',
    t: 'Дождь за окном',
    txt: 'Марина сняла дождь из окна студии в 22:30 13 апреля. Капли на стекле, ночной город. В отражении — она сама. Спокойное лицо.',
    date: '13 апреля',
    time: '22:30',
    place: 'Студия, 2-й этаж',
    ev: null,
    flag: 'saw_photo_rain'
  },

  p18: {
    ico: '🚬',
    svg: 'cigarette',
    tag: 'деталь',
    t: 'Окурок у входа',
    txt: 'Окурок у служебного входа ателье. Снято 14 апреля в 08:20. Кто-то курил здесь ночью и не докурил. Марка сигарет — дорогая, импортная.',
    date: '14 апреля',
    time: '08:20',
    place: 'Киноателье «Сокол», служебный вход',
    ev: 'cigarette_butt',
    flag: 'saw_cigarette'
  },

  p19: {
    ico: '📖',
    svg: 'diary',
    tag: 'документ',
    t: 'Дневник',
    txt: 'Страница из блокнота Марины. Записано 9 апреля: «Он смотрит. Я знаю, что он смотрит. Но я не могу остановиться».',
    date: '9 апреля',
    time: '23:15',
    place: 'Дома',
    ev: 'diary_page',
    flag: 'saw_diary_page'
  },

  p20: {
    ico: '🪞',
    svg: 'mirror',
    tag: 'важно',
    t: 'Зеркало в павильоне',
    txt: 'Марина сняла зеркало в павильоне за час до исчезновения. В отражении — её лицо и пустой тёмный коридор за спиной. Пока пустой.',
    date: '13 апреля',
    time: '22:52',
    place: 'Киноателье «Сокол», павильон №3',
    ev: null,
    flag: 'saw_mirror_before'
  }

};

/* ------------------------------------------------------------
   SVG-ИЛЛЮСТРАЦИИ ДЛЯ ПРОСМОТРЩИКА
   ------------------------------------------------------------
   Каждая фотография рисуется как контурная SVG-сцена.
   Никаких эмодзи — чистый SVG-контур.
   ============================================================ */

const PHOTO_SVGS = {

  cinema_hall: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="20" y="40" width="360" height="180" rx="4"/>'
    +   '<path d="M20 40h360M20 220h360"/>'
    +   '<path d="M60 70h280v40H60z" opacity=".5"/>'
    +   '<path d="M100 90h200M120 100h160" opacity=".4"/>'
    +   '<circle cx="80" cy="200" r="6"/>'
    +   '<circle cx="140" cy="200" r="6"/>'
    +   '<circle cx="200" cy="200" r="6"/>'
    +   '<circle cx="260" cy="200" r="6"/>'
    +   '<circle cx="320" cy="200" r="6"/>'
    +   '<rect x="70" y="240" width="260" height="40" rx="3"/>'
    +   '<path d="M100 260h200M120 270h160" opacity=".5"/>'
    +   '<path d="M180 250q20-25 40 0" opacity=".7"/>'
    +   '<circle cx="200" cy="255" r="2" fill="currentColor"/>'
    + '</svg>',

  crash_scene: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<path d="M0 220h400"/>'
    +   '<path d="M0 240h400M0 200h400" opacity=".3"/>'
    +   '<path d="M60 220l20-40h40l20 40z"/>'
    +   '<circle cx="90" cy="220" r="12"/>'
    +   '<circle cx="140" cy="220" r="12"/>'
    +   '<path d="M240 180h100l-20 40h-80z"/>'
    +   '<circle cx="260" cy="220" r="12"/>'
    +   '<circle cx="320" cy="220" r="12"/>'
    +   '<path d="M280 180q5 20 15 30" opacity=".7"/>'
    +   '<path d="M160 200l30-10M200 195l40-5" opacity=".4"/>'
    +   '<circle cx="200" cy="160" r="3" fill="currentColor"/>'
    +   '<path d="M180 140l10 10M220 140l-10 10" opacity=".3"/>'
    +   '<path d="M100 90q100-30 200 0" opacity=".2"/>'
    + '</svg>',

  reg_frame: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="30" y="30" width="340" height="240" rx="4"/>'
    +   '<rect x="50" y="50" width="300" height="180" rx="2"/>'
    +   '<path d="M50 200h300M50 100h300" opacity=".4"/>'
    +   '<path d="M200 50v180" stroke-dasharray="4 4" opacity=".5"/>'
    +   '<text x="70" y="80" font-family="monospace" font-size="14" fill="currentColor" stroke="none">02:14:08</text>'
    +   '<text x="290" y="80" font-family="monospace" font-size="14" fill="currentColor" stroke="none">REC ●</text>'
    +   '<path d="M120 200l30-20 40 20z" opacity=".6"/>'
    +   '<path d="M220 180l60-10 40 30h-90z" opacity=".7"/>'
    +   '<text x="320" y="215" font-family="monospace" font-size="16" fill="currentColor" stroke="none">742</text>'
    +   '<path d="M150 100q20 15 10 40" opacity=".5"/>'
    +   '<circle cx="250" cy="230" r="3" fill="currentColor"/>'
    +   '<text x="50" y="250" font-family="monospace" font-size="10" fill="currentColor" stroke="none" opacity=".6">CAM-04 FRONT</text>'
    + '</svg>',

  key_tag: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<circle cx="130" cy="160" r="34"/>'
    +   '<circle cx="130" cy="160" r="14"/>'
    +   '<path d="M164 160h140"/>'
    +   '<path d="M290 160v20M304 160v14M270 160v18"/>'
    +   '<rect x="240" y="100" width="80" height="40" rx="3"/>'
    +   '<text x="248" y="125" font-family="sans-serif" font-size="10" fill="currentColor" stroke="none">ПАВ. №3</text>'
    +   '<circle cx="260" cy="88" r="2"/>'
    +   '<path d="M260 88q20-20 30-10"/>'
    +   '<path d="M50 220h300" opacity=".3"/>'
    +   '<path d="M40 40h320" opacity=".2"/>'
    + '</svg>',

  figure_night: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="0" y="0" width="400" height="240" fill="currentColor" opacity=".04"/>'
    +   '<path d="M0 240h400"/>'
    +   '<rect x="40" y="60" width="120" height="180" rx="2"/>'
    +   '<rect x="60" y="80" width="40" height="40" opacity=".4"/>'
    +   '<rect x="110" y="80" width="40" height="40" opacity=".4"/>'
    +   '<rect x="60" y="130" width="40" height="40" opacity=".4"/>'
    +   '<circle cx="230" cy="120" r="14"/>'
    +   '<path d="M230 134v60"/>'
    +   '<path d="M210 150l20 10 20-10"/>'
    +   '<path d="M230 194l-14 40M230 194l14 40"/>'
    +   '<path d="M244 154l30 30"/>'
    +   '<rect x="272" y="180" width="4" height="60"/>'
    +   '<path d="M240 145l25 8" opacity=".5"/>'
    +   '<path d="M320 240v-40h60v40"/>'
    +   '<path d="M340 200v-30M360 200v-30" opacity=".3"/>'
    +   '<path d="M0 30h400" opacity=".15"/>'
    + '</svg>',

  doc_gibdd: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="60" y="20" width="280" height="260" rx="3"/>'
    +   '<path d="M80 30h120" opacity=".3"/>'
    +   '<text x="80" y="60" font-family="sans-serif" font-size="12" font-weight="bold" fill="currentColor" stroke="none">ПОСТАНОВЛЕНИЕ</text>'
    +   '<text x="80" y="78" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none">об отказе в возбуждении</text>'
    +   '<text x="80" y="90" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none">уголовного дела</text>'
    +   '<path d="M80 100h240" opacity=".3"/>'
    +   '<text x="80" y="118" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Дело №4471/2019</text>'
    +   '<text x="80" y="134" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Потерпевший: Соколов К.А.</text>'
    +   '<text x="80" y="148" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Дата ДТП: 14.09.2019</text>'
    +   '<text x="80" y="162" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Место: Кольцевая, 47 км</text>'
    +   '<path d="M80 175h240" opacity=".3"/>'
    +   '<text x="80" y="192" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Виновник: не установлен</text>'
    +   '<text x="80" y="206" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">Дело приостановлено</text>'
    +   '<path d="M220 240q20-15 40 5 10 15 30 5" opacity=".7"/>'
    +   '<text x="80" y="262" font-family="sans-serif" font-size="7" fill="currentColor" stroke="none" opacity=".6">Инспектор: [неразборчиво]</text>'
    +   '<circle cx="300" cy="250" r="14" opacity=".3"/>'
    +   '<text x="292" y="256" font-family="sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".5">М.П.</text>'
    + '</svg>',

  blood_floor: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<path d="M0 240h400M0 60h400" opacity=".3"/>'
    +   '<path d="M0 200h400" opacity=".4"/>'
    +   '<path d="M0 220h400"/>'
    +   '<path d="M0 260h400"/>'
    +   '<ellipse cx="180" cy="220" rx="50" ry="18" fill="currentColor" opacity=".25"/>'
    +   '<ellipse cx="200" cy="212" rx="30" ry="10" fill="currentColor" opacity=".35"/>'
    +   '<path d="M140 220q10-8 30-6t40 4 30-2" opacity=".7"/>'
    +   '<path d="M150 230q20 6 40 4t40-8" opacity=".5"/>'
    +   '<path d="M260 230q8 4 12 2" opacity=".3"/>'
    +   '<path d="M270 200q10 0 15 5" opacity=".5"/>'
    +   '<text x="280" y="90" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".7">затёрто</text>'
    +   '<path d="M275 95l-40 30" opacity=".5" stroke-dasharray="3 3"/>'
    +   '<text x="30" y="90" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".7">14.04 08:12</text>'
    + '</svg>',

  last_frame: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="20" y="20" width="360" height="260" rx="6"/>'
    +   '<rect x="40" y="40" width="320" height="220" rx="4"/>'
    +   '<rect x="160" y="60" width="80" height="180" rx="2" opacity=".6"/>'
    +   '<path d="M180 90q15 10 15 40t-15 40" opacity=".5"/>'
    +   '<path d="M220 90q-15 10-15 40t15 40" opacity=".5"/>'
    +   '<circle cx="200" cy="110" r="14"/>'
    +   '<path d="M200 124v40"/>'
    +   '<path d="M186 132l14 8 14-8"/>'
    +   '<path d="M200 164l-10 32M200 164l10 32"/>'
    +   '<rect x="270" y="120" width="30" height="90" rx="4" opacity=".8"/>'
    +   '<circle cx="285" cy="140" r="6" opacity=".7"/>'
    +   '<path d="M285 146v40" opacity=".7"/>'
    +   '<path d="M278 160l-4 20M292 160l4 20" opacity=".5"/>'
    +   '<path d="M290 200v14" opacity=".5"/>'
    +   '<text x="30" y="280" font-family="monospace" font-size="10" fill="currentColor" stroke="none" opacity=".6">23:52:14  13.04</text>'
    +   '<text x="320" y="50" font-family="monospace" font-size="10" fill="currentColor" stroke="none" opacity=".5">REC</text>'
    + '</svg>',

  diploma: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="30" y="40" width="340" height="220" rx="3"/>'
    +   '<path d="M30 130h340" opacity=".3"/>'
    +   '<circle cx="120" cy="100" r="18"/>'
    +   '<path d="M120 118v50M100 132l20 8 20-8"/>'
    +   '<path d="M120 168l-10 30M120 168l10 30"/>'
    +   '<rect x="90" y="88" width="60" height="70" fill="currentColor" opacity=".08"/>'
    +   '<circle cx="240" cy="100" r="18"/>'
    +   '<path d="M240 118v50M220 132l20 8 20-8"/>'
    +   '<path d="M240 168l-10 30M240 168l10 30"/>'
    +   '<rect x="210" y="88" width="60" height="70" fill="currentColor" opacity=".08"/>'
    +   '<circle cx="320" cy="110" r="14" opacity=".5"/>'
    +   '<path d="M320 124v40M308 140l12 8 12-8" opacity=".5"/>'
    +   '<text x="60" y="220" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none" opacity=".6">Соколовский В.П.</text>'
    +   '<text x="180" y="220" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none" opacity=".6">Соколова М.А.</text>'
    +   '<text x="290" y="220" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none" opacity=".6">Крылов А.В.</text>'
    +   '<text x="140" y="250" font-family="sans-serif" font-size="10" fill="currentColor" stroke="none" opacity=".7">выпуск 2023</text>'
    + '</svg>',

  studio_night: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="0" y="0" width="400" height="300" fill="currentColor" opacity=".03"/>'
    +   '<path d="M0 260h400"/>'
    +   '<rect x="60" y="80" width="280" height="180"/>'
    +   '<path d="M60 80l40-40h280l-40 40z"/>'
    +   '<rect x="80" y="100" width="30" height="30" opacity=".5"/>'
    +   '<rect x="130" y="100" width="30" height="30" opacity=".5"/>'
    +   '<rect x="180" y="100" width="30" height="30" opacity=".5"/>'
    +   '<rect x="230" y="100" width="30" height="30" opacity=".5"/>'
    +   '<rect x="280" y="100" width="30" height="30" fill="currentColor" opacity=".55"/>'
    +   '<rect x="80" y="150" width="30" height="40" opacity=".4"/>'
    +   '<rect x="130" y="150" width="30" height="40" opacity=".4"/>'
    +   '<rect x="180" y="150" width="30" height="40" opacity=".4"/>'
    +   '<rect x="230" y="150" width="30" height="40" opacity=".4"/>'
    +   '<rect x="280" y="150" width="30" height="40" opacity=".4"/>'
    +   '<rect x="160" y="210" width="60" height="50"/>'
    +   '<path d="M185 260v-20a15 15 0 0 1 30 0v20" opacity=".6"/>'
    +   '<path d="M20 60h60M320 60h60" opacity=".3"/>'
    +   '<circle cx="330" cy="140" r="4" fill="currentColor" opacity=".6"/>'
    +   '<text x="30" y="290" font-family="monospace" font-size="9" fill="currentColor" stroke="none" opacity=".6">00:30:00  14.04</text>'
    + '</svg>',

  black_car: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<path d="M0 240h400"/>'
    +   '<path d="M60 240v-30h30v30z" opacity=".3"/>'
    +   '<path d="M100 160l40-30h160l40 30 20 80H80z"/>'
    +   '<path d="M120 160l20-20h120l20 20" opacity=".8"/>'
    +   '<path d="M140 140h30v20h-30z" opacity=".5"/>'
    +   '<path d="M190 140h30v20h-30z" opacity=".5"/>'
    +   '<path d="M240 140h20v20h-20z" opacity=".5"/>'
    +   '<circle cx="140" cy="240" r="18"/>'
    +   '<circle cx="290" cy="240" r="18"/>'
    +   '<path d="M320 200q15 5 20 20" opacity=".8"/>'
    +   '<text x="60" y="120" font-family="sans-serif" font-size="10" fill="currentColor" stroke="none" opacity=".7">вмятина →</text>'
    +   '<path d="M240 200h60l-5-12h-50z" opacity=".4"/>'
    +   '<text x="280" y="210" font-family="monospace" font-size="14" fill="currentColor" stroke="none">•74•2</text>'
    +   '<path d="M100 180h200" opacity=".3"/>'
    + '</svg>',

  plan_room: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="60" y="30" width="280" height="240"/>'
    +   '<rect x="60" y="30" width="40" height="60" opacity=".6"/>'
    +   '<rect x="300" y="30" width="40" height="60" opacity=".6"/>'
    +   '<rect x="60" y="210" width="40" height="60" opacity=".6"/>'
    +   '<rect x="300" y="210" width="40" height="60" opacity=".6"/>'
    +   '<path d="M140 30l40 0" opacity=".7"/>'
    +   '<text x="150" y="24" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">вход</text>'
    +   '<path d="M240 270l30 0" opacity=".7"/>'
    +   '<text x="245" y="290" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none">окно</text>'
    +   '<path d="M200 270h0" opacity=".5"/>'
    +   '<circle cx="120" cy="130" r="10" opacity=".5"/>'
    +   '<path d="M120 140v30M120 170l-10 20M120 170l10 20" opacity=".5"/>'
    +   '<rect x="220" y="100" width="60" height="40" opacity=".5"/>'
    +   '<text x="230" y="124" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none" opacity=".7">штатив</text>'
    +   '<path d="M280 200l40 40M320 200l-40 40" stroke-width="2.4"/>'
    +   '<text x="285" y="255" font-family="sans-serif" font-size="8" fill="currentColor" stroke="none" opacity=".8">нет выхода</text>'
    +   '<text x="80" y="50" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".5">ПАВ. №3</text>'
    +   '<text x="340" y="60" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".5">N</text>'
    +   '<path d="M355 55v20M348 62l7-7 7 7" opacity=".5"/>'
    + '</svg>',

  phone_last: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="130" y="20" width="140" height="260" rx="18"/>'
    +   '<path d="M180 30h40" opacity=".5"/>'
    +   '<rect x="145" y="50" width="110" height="30" rx="4" opacity=".5"/>'
    +   '<text x="152" y="70" font-family="sans-serif" font-size="10" fill="currentColor" stroke="none">Виктор Павлович</text>'
    +   '<rect x="145" y="90" width="80" height="16" rx="3" opacity=".4"/>'
    +   '<rect x="145" y="112" width="60" height="16" rx="3" opacity=".4"/>'
    +   '<rect x="150" y="140" width="60" height="16" rx="3" opacity=".4"/>'
    +   '<rect x="165" y="164" width="60" height="16" rx="3" opacity=".4"/>'
    +   '<circle cx="200" cy="240" r="22" stroke-width="2"/>'
    +   '<path d="M200 228v24"/>'
    +   '<path d="M190 234q10-6 20 0v10q-10 6-20 0z" fill="currentColor" opacity=".4"/>'
    +   '<text x="183" y="285" font-family="monospace" font-size="9" fill="currentColor" stroke="none" opacity=".6">23:46</text>'
    +   '<text x="30" y="40" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".5">скриншот</text>'
    + '</svg>',

  camera_man: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<path d="M0 250h400"/>'
    +   '<circle cx="160" cy="80" r="20"/>'
    +   '<path d="M160 100v50M140 120l20 8 20-8"/>'
    +   '<path d="M160 150l-14 40M160 150l14 40"/>'
    +   '<path d="M160 165l40 30"/>'
    +   '<rect x="180" y="170" width="50" height="36" rx="4"/>'
    +   '<circle cx="220" cy="188" r="10"/>'
    +   '<path d="M180 178h-15v20h15" opacity=".7"/>'
    +   '<path d="M230 165l15-15" opacity=".6"/>'
    +   '<rect x="140" y="130" width="30" height="20" rx="3" opacity=".4"/>'
    +   '<text x="145" y="144" font-family="sans-serif" font-size="6" fill="currentColor" stroke="none" opacity=".7">ID</text>'
    +   '<rect x="280" y="160" width="60" height="90" rx="2" opacity=".4"/>'
    +   '<path d="M290 180h40M290 200h40M290 220h30" opacity=".3"/>'
    +   '<text x="40" y="40" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".5">09:15  12.04</text>'
    + '</svg>',

  letter: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="50" y="40" width="300" height="220" rx="3"/>'
    +   '<path d="M50 40l150 100 150-100" opacity=".5"/>'
    +   '<text x="80" y="90" font-family="cursive,sans-serif" font-size="14" fill="currentColor" stroke="none" opacity=".9">Я не могу так больше.</text>'
    +   '<text x="80" y="115" font-family="cursive,sans-serif" font-size="14" fill="currentColor" stroke="none" opacity=".9">Прости.</text>'
    +   '<path d="M80 130h200" opacity=".3"/>'
    +   '<text x="80" y="155" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".7">Ты знаешь, что делать.</text>'
    +   '<text x="80" y="180" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".7">Если не можешь — я пойму.</text>'
    +   '<text x="80" y="205" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".7">Но так дальше нельзя.</text>'
    +   '<path d="M80 230q30-10 60 5 30-15 60 0" opacity=".6"/>'
    +   '<text x="270" y="250" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".6">10.09.2019</text>'
    +   '<path d="M100 270l30-15 20 5" opacity=".3"/>'
    + '</svg>',

  door_dark: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="80" y="30" width="240" height="240"/>'
    +   '<path d="M80 30h240v240H80z" fill="currentColor" opacity=".08"/>'
    +   '<rect x="100" y="50" width="200" height="200" rx="3"/>'
    +   '<rect x="100" y="50" width="90" height="200" opacity=".4"/>'
    +   '<rect x="210" y="50" width="90" height="200" opacity=".4"/>'
    +   '<circle cx="180" cy="150" r="4" fill="currentColor"/>'
    +   '<circle cx="220" cy="150" r="4" fill="currentColor"/>'
    +   '<path d="M170 140l20 20M210 140l20 20" opacity=".6"/>'
    +   '<circle cx="200" cy="150" r="22" stroke-width="2"/>'
    +   '<rect x="195" y="128" width="10" height="14" rx="2" fill="currentColor" opacity=".8"/>'
    +   '<path d="M180 220l40 0" opacity=".6"/>'
    +   '<text x="60" y="290" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".6">14.04  08:14</text>'
    +   '<text x="290" y="290" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".6">подсобное</text>'
    + '</svg>',

  rain_window: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="20" y="20" width="360" height="260" rx="4"/>'
    +   '<path d="M200 20v260M20 150h360" opacity=".4"/>'
    +   '<circle cx="80" cy="60" r="2" fill="currentColor"/>'
    +   '<circle cx="120" cy="80" r="1.5" fill="currentColor"/>'
    +   '<circle cx="160" cy="50" r="2" fill="currentColor"/>'
    +   '<circle cx="300" cy="90" r="1.5" fill="currentColor"/>'
    +   '<circle cx="340" cy="70" r="2" fill="currentColor"/>'
    +   '<circle cx="70" cy="180" r="2" fill="currentColor"/>'
    +   '<circle cx="330" cy="200" r="1.5" fill="currentColor"/>'
    +   '<path d="M90 70l-3 15M130 90l-2 12M170 60l-3 14M310 100l-2 12M70 190l-2 14M340 210l-2 12" opacity=".5"/>'
    +   '<path d="M0 240h400" opacity=".3"/>'
    +   '<path d="M0 260h400" opacity=".3"/>'
    +   '<path d="M40 200l30 20M80 210l30 20M120 195l30 20M260 210l30 20M300 200l30 20M340 215l30 20" opacity=".25"/>'
    +   '<path d="M100 280h200" opacity=".3"/>'
    +   '<circle cx="270" cy="130" r="8" opacity=".5"/>'
    +   '<path d="M270 138v12" opacity=".5"/>'
    +   '<text x="30" y="295" font-family="monospace" font-size="9" fill="currentColor" stroke="none" opacity=".6">22:30  13.04</text>'
    + '</svg>',

  cigarette: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<path d="M0 220h400"/>'
    +   '<path d="M0 240h400" opacity=".3"/>'
    +   '<path d="M160 218l60-4 2 8-60 4z"/>'
    +   '<path d="M218 217l14-1 1 6-14 1z" fill="currentColor" opacity=".7"/>'
    +   '<path d="M162 218q-6-2-8-8 2-6 10-4" opacity=".7"/>'
    +   '<path d="M165 214q-4-8 6-10 10 2 6 10" opacity=".5"/>'
    +   '<path d="M170 200q-3-8 4-12" opacity=".4"/>'
    +   '<path d="M220 210q0-10-6-16" opacity=".6"/>'
    +   '<text x="90" y="200" font-family="sans-serif" font-size="9" fill="currentColor" stroke="none" opacity=".7">импортные</text>'
    +   '<path d="M85 205l40-15" opacity=".4" stroke-dasharray="3 3"/>'
    +   '<text x="30" y="270" font-family="monospace" font-size="9" fill="currentColor" stroke="none" opacity=".6">14.04  08:20</text>'
    +   '<path d="M60 90h60M280 90h60" opacity=".2"/>'
    + '</svg>',

  diary: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="60" y="30" width="280" height="240" rx="3"/>'
    +   '<path d="M60 30v240" opacity=".7"/>'
    +   '<path d="M70 40h260M70 260h260" opacity=".3"/>'
    +   '<text x="90" y="80" font-family="cursive,sans-serif" font-size="13" fill="currentColor" stroke="none" opacity=".9">9 апреля</text>'
    +   '<text x="90" y="110" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".9">Он смотрит.</text>'
    +   '<text x="90" y="135" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".9">Я знаю, что он смотрит.</text>'
    +   '<text x="90" y="160" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".9">Но я не могу</text>'
    +   '<text x="90" y="185" font-family="cursive,sans-serif" font-size="12" fill="currentColor" stroke="none" opacity=".9">остановиться.</text>'
    +   '<path d="M90 200h180" opacity=".4"/>'
    +   '<text x="90" y="225" font-family="cursive,sans-serif" font-size="11" fill="currentColor" stroke="none" opacity=".7">Для Кирилла.</text>'
    +   '<text x="90" y="250" font-family="cursive,sans-serif" font-size="11" fill="currentColor" stroke="none" opacity=".7">Только для него.</text>'
    +   '<path d="M290 270l20-15 5 8-20 15z" opacity=".5"/>'
    + '</svg>',

  mirror: ''
    + '<svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +   '<rect x="100" y="20" width="200" height="260" rx="8"/>'
    +   '<rect x="115" y="35" width="170" height="230" rx="5" fill="currentColor" opacity=".06"/>'
    +   '<circle cx="200" cy="120" r="18"/>'
    +   '<path d="M200 138v50M180 152l20 8 20-8"/>'
    +   '<path d="M200 188l-12 30M200 188l12 30"/>'
    +   '<path d="M175 100q-15 10-20 30" opacity=".4"/>'
    +   '<path d="M225 100q15 10 20 30" opacity=".4"/>'
    +   '<path d="M140 40v220M260 40v220" opacity=".2"/>'
    +   '<path d="M115 190q85 20 170 0" opacity=".15"/>'
    +   '<text x="130" y="270" font-family="monospace" font-size="9" fill="currentColor" stroke="none" opacity=".6">22:52  13.04</text>'
    +   '<path d="M60 100h30M310 100h30M60 200h30M310 200h30" opacity=".2"/>'
    + '</svg>'

};

/* ------------------------------------------------------------
   МЕТАДАННЫЕ: ПОРЯДОК ОТОБРАЖЕНИЯ
   ------------------------------------------------------------ */
const PHOTO_ORDER = [
  'p8',  // последний кадр
  'p13', // экран перед звонком
  'p20', // зеркало
  'p17', // дождь за окном
  'p19', // дневник
  'p12', // схема павильона
  'p3',  // видеорегистратор
  'p2',  // Кольцевая 2019
  'p11', // чёрный седан
  'p6',  // справка ГИБДД
  'p15', // старое письмо
  'p1',  // кадр с показа
  'p9',  // диплом
  'p14', // оператор
  'p4',  // ключ от павильона
  'p10', // ателье ночью
  'p5',  // фигура у входа
  'p16', // закрытая дверь
  'p18', // окурок
  'p7'   // пятно в павильоне
];

/* ------------------------------------------------------------
   ГЛАВНЫЙ ЭКРАН ГАЛЕРЕИ
   ------------------------------------------------------------ */

ROUTES.gallery = function(){
  G.screen = 'gallery';

  const total = PHOTO_ORDER.length;
  const viewed = PHOTO_ORDER.filter(function(k){
    return G.opened.photos[k];
  }).length;

  const cells = PHOTO_ORDER.map(function(k){
    return renderPhotoThumb(k);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Галерея</h2>'
  +     '<div class="sub">' + total + ' снимков · '
  +       viewed + ' просмотрено'
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="photoFilter()">' + svg('grid', 18) + '</button>'
  + '</div>'

  + '<div class="gal-filter">'
  +   '<button class="gal-chip active" onclick="filterPhotos(\'all\', this)">Все</button>'
  +   '<button class="gal-chip" onclick="filterPhotos(\'важно\', this)">Важные</button>'
  +   '<button class="gal-chip" onclick="filterPhotos(\'улика\', this)">Улики</button>'
  +   '<button class="gal-chip" onclick="filterPhotos(\'люди\', this)">Люди</button>'
  +   '<button class="gal-chip" onclick="filterPhotos(\'ателье\', this)">Ателье</button>'
  + '</div>'

  + '<div class="gal-grid" id="galGrid">'
  +   cells
  + '</div>'

  + '<div class="gal-footer">'
  +   '<div style="display:flex;align-items:center;gap:8px;color:var(--dim);font-size:11.5px">'
  +     svg('info', 14) + ' Нажмите на снимок для подробностей'
  +   '</div>'
  + '</div>');
};

/* ------------------------------------------------------------
   МИНИАТЮРА ОДНОЙ ФОТОГРАФИИ
   ------------------------------------------------------------ */
function renderPhotoThumb(key){
  const p = PHOTOS[key];
  if(!p) return '';

  const seen = G.opened.photos[key];
  const hasEv = p.ev && !hasEv(p.ev);

  let badges = '';
  if(hasEv){
    badges = '<div class="ph-badge new">' + svg('clue', 12) + '</div>';
  }
  if(seen && !hasEv){
    badges = '<div class="ph-badge seen">' + svg('eye', 12) + '</div>';
  }

  return ''
  + '<div class="ph" data-tag="' + p.tag + '" onclick="openPhoto(\'' + key + '\')">'
  +   '<div class="ph-emoji">' + (p.ico || '🖼') + '</div>'
  +   '<div class="ph-tag">' + escapeHtml(p.tag) + '</div>'
  +   badges
  + '</div>';
}

/* ------------------------------------------------------------
   ФИЛЬТР ПО ТЕГУ
   ------------------------------------------------------------ */
function filterPhotos(tag, btn){
  document.querySelectorAll('.gal-chip').forEach(function(b){
    b.classList.remove('active');
  });
  if(btn) btn.classList.add('active');

  document.querySelectorAll('.ph').forEach(function(el){
    const t = el.getAttribute('data-tag');
    if(tag === 'all' || t === tag){
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  haptic(8);
}

/* ------------------------------------------------------------
   ЗАГЛУШКА ФИЛЬТРА (кнопка в appbar)
   ------------------------------------------------------------ */
function photoFilter(){
  toast('Сортировка', 'Сортировка по дате/месту откроется позже', 'warn');
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ ФОТО — ПОЛНОЭКРАННЫЙ ПРОСМОТРЩИК
   ------------------------------------------------------------ */
function openPhoto(key){
  const p = PHOTOS[key];
  if(!p) return;

  /* Помечаем как просмотренное */
  const firstView = !G.opened.photos[key];
  G.opened.photos[key] = true;
  if(firstView){
    G.photosViewed++;
  }

  /* Флаги сюжета */
  if(p.flag) setFlag(p.flag);

  /* Улика */
  if(p.ev && !hasEv(p.ev)){
    addEv(p.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[p.ev] || p.t, 'ev');
    }, 500);
  }

  /* Ищем индекс для навигации */
  const idx = PHOTO_ORDER.indexOf(key);
  const prevKey = idx > 0 ? PHOTO_ORDER[idx - 1] : null;
  const nextKey = idx < PHOTO_ORDER.length - 1 ? PHOTO_ORDER[idx + 1] : null;

  const svgScene = PHOTO_SVGS[p.svg] || ('<div class="photo-missing">' + svg('image', 60) + '</div>');

  render(''
  + '<div class="photo-view">'

  +   '<div class="pv-bar">'
  +     '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +     '<div class="pv-counter">'
  +       (idx + 1) + ' / ' + PHOTO_ORDER.length
  +     '</div>'
  +     '<button class="back" onclick="photoInfo(\'' + key + '\')">'
  +       svg('info', 18)
  +     '</button>'
  +   '</div>'

  +   '<div class="pv-stage">'
  +     '<div class="pv-svg">' + svgScene + '</
  +   (p.tag === 'важно' || p.tag === 'последнее'
  +     ? '<div class="pv-tag hot">' + escapeHtml(p.tag) + '</div>'
  +     : '<div class="pv-tag">' + escapeHtml(p.tag) + '</div>')
  +   '</div>'

  +   '<div class="pv-meta">'
  +     '<div class="pv-title">' + escapeHtml(p.t) + '</div>'
  +     '<div class="pv-sub">'
  +       svg('calendar', 12) + ' ' + escapeHtml(p.date)
  +       + ' · '
  +       svg('clock', 12) + ' ' + escapeHtml(p.time)
  +     '</div>'
  +     '<div class="pv-place">'
  +       svg('pin', 12) + ' ' + escapeHtml(p.place)
  +     '</div>'
  +   '</div>'

  +   '<div class="pv-desc">' + escapeHtml(p.txt) + '</div>'

  +   '<div class="pv-nav">'
  +     '<button class="pv-nav-btn" '
  +       (prevKey ? 'onclick="openPhoto(\'' + prevKey + '\')"' : 'disabled')
  +     '>'
  +       svg('chev', 18) + ' Пред'
  +     '</button>'
  +     '<button class="pv-nav-btn" onclick="photoActions(\'' + key + '\')">'
  +       svg('more', 18) + ' Действия'
  +     '</button>'
  +     '<button class="pv-nav-btn" '
  +       (nextKey ? 'onclick="openPhoto(\'' + nextKey + '\')"' : 'disabled')
  +     '>'
  +       'След ' + svg('fwd', 18)
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(620, 0.04);
}

/* ------------------------------------------------------------
   ИНФО О ФОТО
   ------------------------------------------------------------ */
function photoInfo(key){
  const p = PHOTOS[key];
  if(!p) return;

  const prevIdx = G.history.length > 1 ? G.history[G.history.length - 1] : null;

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Информация о снимке</h2></div>'
  + '</div>'

  + '<div class="photo-info fade">'

  +   '<div class="pi-thumb">'
  +     (PHOTO_SVGS[p.svg] || ('<div style="font-size:54px">' + (p.ico || '🖼') + '</div>'))
  +   '</div>'

  +   '<h2>' + escapeHtml(p.t) + '</h2>'

  +   '<div class="pi-rows">'
  +     '<div class="pi-row">'
  +       '<span>Дата</span>'
  +       '<b>' + escapeHtml(p.date) + '</b>'
  +     '</div>'
  +     '<div class="pi-row">'
  +       '<span>Время</span>'
  +       '<b>' + escapeHtml(p.time) + '</b>'
  +     '</div>'
  +     '<div class="pi-row">'
  +       '<span>Место</span>'
  +       '<b>' + escapeHtml(p.place) + '</b>'
  +     '</div>'
  +     '<div class="pi-row">'
  +       '<span>Категория</span>'
  +       '<b>' + escapeHtml(p.tag) + '</b>'
  +     '</div>'
  +     (p.ev
  +       ? '<div class="pi-row ev">'
  +         '<span>Статус</span>'
  +         '<b>' + (hasEv(p.ev) ? '✔ Улика зафиксирована' : 'Может быть уликой') + '</b>'
  +         '</div>'
  +       : '')
  +   '</div>'

  +   '<div class="pi-desc">' + escapeHtml(p.txt) + '</div>'

  +   '<div class="pi-actions">'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' К снимку'
  +     '</button>'
  +     '<button class="btn ghost" onclick="toast(\'Экспорт\',\'Функция недоступна\',\'warn\')">'
  +       svg('download', 16) + ' Экспорт'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ------------------------------------------------------------
   ДЕЙСТВИЯ С ФОТО
   ------------------------------------------------------------ */
function photoActions(key){
  toast('Действия', 'Здесь будет: отметить как улику, отправить в дело', 'warn');
}

/* ------------------------------------------------------------
   CSS ДЛЯ ГАЛЕРЕИ
   ------------------------------------------------------------ */
(function injectGalleryStyles(){
  const style = document.createElement('style');
  style.textContent = ''
  /* Фильтры */
  + '.gal-filter{'
  +   'display:flex;gap:8px;padding:12px 14px;'
  +   'overflow-x:auto;scrollbar-width:none;'
  +   'border-bottom:1px solid var(--line);'
  +   'position:sticky;top:57px;z-index:15;'
  +   'background:rgba(17,22,31,.94);'
  +   'backdrop-filter:blur(20px);'
  + '}'
  + '.gal-filter::-webkit-scrollbar{display:none}'
  + '.gal-chip{'
  +   'padding:7px 14px;border-radius:16px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'color:var(--dim);font-size:12px;cursor:pointer;'
  +   'white-space:nowrap;transition:.14s;font-family:inherit;'
  + '}'
  + '.gal-chip:hover{border-color:var(--line2);color:var(--txt)}'
  + '.gal-chip.active{'
  +   'background:rgba(93,169,255,.14);'
  +   'border-color:var(--acc);color:var(--acc);'
  + '}'

  /* Сетка */
  + '.gal-grid{'
  +   'display:grid;grid-template-columns:repeat(3,1fr);'
  +   'gap:3px;padding:3px;'
  + '}'
  + '.ph{'
  +   'aspect-ratio:1;position:relative;overflow:hidden;'
  +   'border-radius:6px;cursor:pointer;'
  +   'background:linear-gradient(140deg,#232b3c,#12161f);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'transition:.15s;border:1px solid var(--line);'
  + '}'
  + '.ph:hover{border-color:var(--acc);transform:scale(.98)}'
  + '.ph:active{transform:scale(.94)}'
  + '.ph-emoji{'
  +   'font-size:36px;line-height:1;'
  +   'filter:drop-shadow(0 2px 6px rgba(0,0,0,.5));'
  + '}'
  + '.ph-tag{'
  +   'position:absolute;bottom:0;left:0;right:0;'
  +   'font-size:9px;padding:3px 4px;'
  +   'background:rgba(0,0,0,.7);'
  +   'text-align:center;color:#cfd7e6;'
  +   'letter-spacing:.3px;'
  + '}'
  + '.ph-badge{'
  +   'position:absolute;top:4px;right:4px;'
  +   'width:22px;height:22px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'box-shadow:0 2px 8px rgba(0,0,0,.5);'
  + '}'
  + '.ph-badge.new{'
  +   'background:var(--warn);color:#000;'
  +   'animation:pop .35s cubic-bezier(.4,1.6,.5,1);'
  + '}'
  + '.ph-badge.seen{'
  +   'background:rgba(93,169,255,.25);color:var(--acc);'
  + '}'
  + '.gal-footer{'
  +   'padding:20px;display:flex;justify-content:center;'
  + '}'

  /* Просмотрщик */
  + '.photo-view{'
  +   'min-height:100%;display:flex;flex-direction:column;'
  +   'background:linear-gradient(180deg,#05070c 0%,#0a0e18 100%);'
  + '}'
  + '.pv-bar{'
  +   'display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px;'
  +   'position:sticky;top:0;z-index:10;'
  +   'background:rgba(10,14,24,.85);'
  +   'backdrop-filter:blur(18px);'
  + '}'
  + '.pv-counter{'
  +   'font-size:12px;color:var(--dim);'
  +   'font-variant-numeric:tabular-nums;letter-spacing:.5px;'
  + '}'
  + '.pv-stage{'
  +   'position:relative;padding:0 20px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'aspect-ratio:4/3;'
  +   'color:var(--acc);'
  +   'background:radial-gradient(ellipse at center, rgba(93,169,255,.08), transparent 70%);'
  + '}'
  + '.pv-svg{'
  +   'width:100%;max-width:340px;height:auto;'
  + '}'
  + '.pv-svg svg{'
  +   'width:100%;height:auto;display:block;'
  + '}'
  + '.pv-tag{'
  +   'position:absolute;top:20px;right:20px;'
  +   'font-size:10px;padding:4px 10px;'
  +   'background:rgba(93,169,255,.14);'
  +   'color:var(--acc);'
  +   'border-radius:10px;letter-spacing:1px;'
  +   'text-transform:uppercase;'
  + '}'
  + '.pv-tag.hot{'
  +   'background:rgba(255,90,110,.15);'
  +   'color:var(--danger);'
  +   'animation:pulseHot 2s infinite;'
  + '}'
  + '@keyframes pulseHot{'
  +   '0%,100%{opacity:.9}'
  +   '50%{opacity:1;box-shadow:0 0 16px rgba(255,90,110,.5)}'
  + '}'
  + '.pv-meta{'
  +   'padding:6px 22px 0;'
  + '}'
  + '.pv-title{'
  +   'font-size:19px;font-weight:600;letter-spacing:.2px;'
  + '}'
  + '.pv-sub{'
  +   'font-size:11.5px;color:var(--dim);margin-top:6px;'
  +   'display:flex;align-items:center;gap:6px;'
  +   'flex-wrap:wrap;'
  + '}'
  + '.pv-sub .icon{opacity:.7}'
  + '.pv-place{'
  +   'font-size:11.5px;color:var(--dim2);margin-top:4px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.pv-desc{'
  +   'padding:18px 22px 22px;'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.7;'
  + '}'
  + '.pv-nav{'
  +   'display:flex;gap:8px;padding:14px 16px 24px;'
  +   'border-top:1px solid var(--line);'
  +   'margin-top:auto;'
  + '}'
  + '.pv-nav-btn{'
  +   'flex:1;padding:11px 12px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'color:var(--txt);font-size:12.5px;cursor:pointer;'
  +   'border-radius:12px;font-family:inherit;'
  +   'display:flex;align-items:center;justify-content:center;gap:6px;'
  +   'transition:.14s;'
  + '}'
  + '.pv-nav-btn:hover:not(:disabled){border-color:var(--line2);background:var(--panel3)}'
  + '.pv-nav-btn:active:not(:disabled){transform:scale(.96)}'
  + '.pv-nav-btn:disabled{opacity:.35;cursor:not-allowed}'
  + '.pv-nav-btn .icon{width:16px;height:16px}'
  + '.photo-missing{'
  +   'color:var(--dim2);'
  + '}'

  /* Инфо о снимке */
  + '.photo-info{padding:22px 20px 30px}'
  + '.pi-thumb{'
  +   'width:100%;aspect-ratio:4/3;border-radius:14px;'
  +   'background:linear-gradient(140deg,#232b3c,#12161f);'
  +   'border:1px solid var(--line);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--acc);padding:24px;'
  +   'margin-bottom:18px;overflow:hidden;'
  + '}'
  + '.pi-thumb svg{width:100%;height:100%;max-width:280px}'
  + '.photo-info h2{font-size:18px;font-weight:600;margin-bottom:16px}'
  + '.pi-rows{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:12px;overflow:hidden;margin-bottom:16px;'
  + '}'
  + '.pi-row{'
  +   'display:flex;justify-content:space-between;align-items:center;'
  +   'padding:11px 14px;border-bottom:1px solid var(--line);'
  +   'font-size:12.5px;'
  + '}'
  + '.pi-row:last-child{border-bottom:none}'
  + '.pi-row span{color:var(--dim)}'
  + '.pi-row b{color:var(--txt);font-weight:500;text-align:right}'
  + '.pi-row.ev b{color:var(--ok)}'
  + '.pi-desc{'
  +   'font-size:13px;color:var(--txt2);line-height:1.7;'
  +   'padding:4px 2px 20px;'
  + '}'
  + '.pi-actions{display:flex;gap:10px}'
  + '.pi-actions .btn{flex:1;justify-content:center;font-size:13px}';

  document.head.appendChild(style);
})();

/* ------------------------------------------------------------
   ДОБАВЛЕНИЕ УЛИК ГАЛЕРЕИ В СЛОВАРЬ НАЗВАНИЙ
   ------------------------------------------------------------ */
(function extendEvidenceTitles(){
  const extra = {
    photo_crash: 'Фото с места аварии',
    photo_reg: 'Кадр с регистратора',
    photo_key: 'Ключ от павильона',
    photo_figure: 'Фигура у ателье',
    photo_blood: 'Пятно в павильоне',
    photo_last: 'Последний кадр',
    photo_car: 'Чёрный седан',
    plan_room: 'Схема павильона',
    phone_before_call: 'Экран перед звонком',
    old_letter: 'Старое письмо',
    photo_door: 'Закрытая дверь',
    cigarette_butt: 'Окурок',
    diary_page: 'Страница дневника'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

console.log(
  '%c[ЧАСТЬ 3 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nГалерея: 20 снимков, SVG-иллюстрации, фильтры. Вставляй Часть 4 ниже.'
);

/* ... Часть 3 заканчивается здесь. Не закрывай script/body/html.
   Часть 4 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 4 из 10 — ЗАМЕТКИ + БРАУЗЕР + ЗВОНКИ
   ------------------------------------------------------------
   Полностью заменяет заглушки:
   - ROUTES.notes
   - ROUTES.browser
   - ROUTES.calls
   ============================================================ */

/* ============================================================
   БЛОК 1 — ЗАМЕТКИ
   ============================================================
   Заметки Марины. Последняя — аудиозапись.
   ============================================================ */

const NOTES = {

  n1: {
    ico: 'fileText',
    t: 'Дело №4471/2019',
    sub: 'Главное о Кирилле',
    date: '1 апреля',
    time: '22:14',
    color: '#5da9ff',
    txt:
      'Кирилл Соколов, 19 лет.\n' +
      'Сбит на Кольцевой трассе 14 сентября 2019 года в 02:14.\n' +
      'Смерть — мгновенная. Водитель скрылся.\n\n' +
      'Что я знаю точно:\n' +
      '— Машина: тёмный седан, вмятина на правом крыле\n' +
      '— Номер читается частично: ••7 •• 74 2\n' +
      '— Три последние цифры: 742\n\n' +
      'Что я ищу:\n' +
      '— Запись с чужого регистратора\n' +
      '— Её отдали мне 15 марта этого года. Анонимно.\n' +
      '— Я видела запись. Я видела ВСЁ.\n\n' +
      'Что я знаю про дело:\n' +
      '— Дело закрыто 15 ноября 2019 г.\n' +
      '— Причина: «неустановление лица»\n' +
      '— Подпись инспектора нечитаемая\n\n' +
      'Я найду его. Или умру. Но найду.',
    ev: 'note_case',
    flag: 'read_note_case'
  },

  n2: {
    ico: 'list',
    t: 'Список подозреваемых',
    sub: 'Рабочие версии',
    date: '4 апреля',
    time: '19:30',
    color: '#ffb84d',
    txt:
      '1. АРТЁМ — жених.\n' +
      '   Ревнив. Контролирующий. Но в ту ночь был\n' +
      '   у брата в Солнечногорске. Проверила.\n' +
      '   Не он.\n\n' +
      '2. ДИМА — бывший.\n' +
      '   Следил за мной. Знает мою жизнь лучше, чем я.\n' +
      '   Но про Кирилла он вообще ничего не знает.\n' +
      '   Я проверяла — он удивился, когда услышал фамилию.\n\n' +
      '3. ВИКТОР ПАВЛОВИЧ — научный руководитель.\n' +
      '   ЗНАЕТ про плёнку. Просил убрать материал.\n' +
      '   Грозил не подписать диплом.\n' +
      '   Ночью написал «нам нужно поговорить».\n' +
      '   ПОЧЕМУ он так боится этой записи?\n\n' +
      '4. АНДРЕЙ КРЫЛОВ — продюсер.\n' +
      '   Предлагал контракт за отказ показать вторую часть.\n' +
      '   12 млн. Он готов заплатить за молчание.\n' +
      '   Но почему он так боится?\n\n' +
      '5. НЕИЗВЕСТНЫЙ — писал угрозы.\n' +
      '   Номер не привязан к карте.\n' +
      '   Голос изменён.\n' +
      '   Но он знает про Кирилла. Кто он?',
    ev: 'note_suspects',
    flag: 'read_note_suspects'
  },

  n3: {
    ico: 'film',
    t: 'План показа',
    sub: 'Как всё будет',
    date: '9 апреля',
    time: '23:48',
    color: '#8b6dff',
    txt:
      'Финальный монтаж — 47 минут.\n\n' +
      'ЧАСТЬ 1 (0:00–28:00)\n' +
      '— История Кирилла\n' +
      '— Свидетельства соседей\n' +
      '— Кадры с мотоцикла\n' +
      '— Интервью с его друзьями\n\n' +
      'ЧАСТЬ 2 (28:00–47:00)\n' +
      '— Запись с регистратора\n' +
      '— Сопоставление с найденной машиной\n' +
      '— Хронология событий\n' +
      '— Кадр с вмятиной на крыле\n\n' +
      'ВАЖНО:\n' +
      'Я не назову имя вслух. Я дам всем увидеть.\n' +
      'Пусть сам догадается, что я знаю.\n' +
      'Пусть смотрит и молчит.\n\n' +
      'Если что-то пойдёт не так — папка «Кирилл».\n' +
      'Пароль: 14092019',
    ev: 'note_plan',
    flag: 'read_note_plan'
  },

  n4: {
    ico: 'pin',
    t: 'Встреча в ателье',
    sub: 'Ночь с 13 на 14 апреля',
    date: '13 апреля',
    time: '23:25',
    color: '#ff5a6e',
    txt:
      'Виктор Павлович написал в 23:16.\n\n' +
      '«Приезжай в старое ателье. Там никого.\n' +
      ' Оригинал».\n\n' +
      'Что это может значить?\n\n' +
      '1. Это ловушка. Он хочет забрать плёнку.\n' +
      '2. Это правда. Он хочет отдать мне оригинал.\n' +
      '3. Он просто хочет поговорить без свидетелей.\n\n' +
      'Почему он вообще знает про оригинал?\n' +
      'Я никому не говорила, что запись у меня.\n' +
      'НИКОМУ.\n\n' +
      'Вывод: он знает гораздо больше.\n\n' +
      'Я поеду. Но сначала:\n' +
      '— включу запись на телефоне\n' +
      '— напишу Лене, если что\n' +
      '— буду держаться у выхода\n\n' +
      'Главное — не поворачиваться к нему спиной.',
    ev: 'note_meeting',
    flag: 'read_note_meeting'
  },

  n5: {
    ico: 'camera',
    t: 'Наблюдение у ателье',
    sub: '23:47 — я приехала',
    date: '13 апреля',
    time: '23:50',
    color: '#3ddc97',
    txt:
      'Я приехала в 23:47.\n\n' +
      'Ключ был у администратора.\n' +
      'Она сказала: «Господин уже внутри».\n\n' +
      'Какой господин? Я спросила — она отвела\n' +
      'глаза и не ответила. Просто отдала ключ.\n\n' +
      'Значит, кто-то её предупредил.\n' +
      'Значит, кто-то знал, что я приеду.\n\n' +
      'В павильоне №3 горел свет.\n' +
      'Дверь была приоткрыта.\n' +
      'Я слышала шорох внутри.\n\n' +
      'Я вошла. И включила запись.\n\n' +
      'Дальше — всё в аудио.',
    ev: 'note_arrival',
    flag: 'read_note_arrival'
  },

  n6: {
    ico: 'mic',
    t: '🎧 АУДИОЗАПИСЬ',
    sub: '14 апреля, 00:41',
    date: '14 апреля',
    time: '00:41',
    color: '#ff5a6e',
    locked: 'saw_viktor_chat',
    txt:
      '[ЗАПИСЬ АУДИО]\n' +
      '[00:00]\n\n' +
      'МАРИНА: «Виктор Павлович, вы... вы зачем\n' +
      'привезли оригинал сюда?»\n\n' +
      'ВИКТОР: «Чтобы никто не нашёл. Ни ты,\n' +
      'ни они.»\n\n' +
      'МАРИНА: «Что вы... отпустите.»\n\n' +
      'ВИКТОР: «Ты не понимаешь, Марина. Я не хотел.\n' +
      'Тогда, на трассе. Я не видел его. Он выскочил.»\n\n' +
      'МАРИНА: «Так это были вы. Всё это время.»\n\n' +
      'ВИКТОР: «Я уберу плёнку. И ты забудешь.»\n\n' +
      'МАРИНА: «Не подходите. Я записываю. Всё\n' +
      'записывается.»\n\n' +
      'ВИКТОР: «Тогда придётся... убрать и телефон.»\n\n' +
      '[шум. удар. короткий вскрик.]\n\n' +
      '[тишина]\n\n' +
      '[00:41 — конец записи]',
    ev: 'note_audio',
    flag: 'heard_audio'
  },

  n7: {
    ico: 'user',
    t: 'О Викторе Павловиче',
    sub: 'Что я знаю',
    date: '6 апреля',
    time: '20:15',
    color: '#8b6dff',
    txt:
      'Виктор Павлович Соколовский.\n' +
      'Руководитель кафедры режиссуры.\n' +
      '54 года. Женат (Ольга). Сын Вадим (27).\n\n' +
      'Что о нём говорят:\n' +
      '— Строгий, но справедливый\n' +
      '— Не пьёт на корпоративах\n' +
      '— Пять лет назад попал в аварию (сам сказал)\n' +
      '— «Разбил машину» — точнее не сказал\n\n' +
      'Что я вижу:\n' +
      '— Когда упоминаю Кольцевую, он бледнеет\n' +
      '— В кабинете есть фото с машиной (не разглядела)\n' +
      '— Он никогда не заводит тему Кирилла сам\n' +
      '— Но всегда её закрывает\n\n' +
      'Он боится. И это не страх за меня.\n' +
      'Это страх за себя.',
    ev: 'note_viktor_profile',
    flag: 'read_note_viktor_profile'
  },

  n8: {
    ico: 'car',
    t: 'Машина',
    sub: 'Что я ищу',
    date: '3 апреля',
    time: '21:40',
    color: '#5da9ff',
    txt:
      'Параметры машины (по описанию свидетелей):\n\n' +
      '— Марка: не установлена, скорее всего\n' +
      '   немецкий седан (BMW, Audi, Mercedes)\n' +
      '— Цвет: тёмный (чёрный или графит)\n' +
      '— Вмятина на правом крыле (после удара)\n' +
      '— Госномер: ••7 •• 74 2\n' +
      '— Три последние цифры: 742\n\n' +
      'Что я проверила:\n' +
      '— В открытых базах нет совпадений\n' +
      '— Объявление на форуме удалили через 2 дня\n' +
      '— Кто-то платит за чистку интернета\n\n' +
      'Кто-то очень не хочет, чтобы я нашла\n' +
      'эту машину.',
    ev: 'note_car',
    flag: 'read_note_car'
  },

  n9: {
    ico: 'camera',
    t: 'Видеорегистратор',
    sub: 'Откуда у меня запись',
    date: '18 марта',
    time: '23:59',
    color: '#3ddc97',
    txt:
      'Запись передали мне 15 марта.\n' +
      'Анонимно. Через ячейку в камере хранения\n' +
      'на вокзале. Пароль был в письме.\n\n' +
      'Письмо тоже было анонимное.\n' +
      'Печатный текст. Никакого почерка.\n\n' +
      'В записи:\n' +
      '— Ночь. Мокрая дорога.\n' +
      '— Виден момент удара.\n' +
      '— Номер не читается полностью.\n' +
      '— Три последние цифры: 742.\n' +
      '— Цвет машины: тёмный.\n' +
      '— Время: 02:14.\n\n' +
      'Кто-то видел, как убили моего брата.\n' +
      'Кто-то четыре года хранил это в тайне.\n' +
      'И только сейчас решил отдать.\n\n' +
      'Почему сейчас?',
    ev: 'note_reg',
    flag: 'read_note_reg'
  },

  n10: {
    ico: 'alert',
    t: 'Угрозы',
    sub: 'Хронология',
    date: '10 апреля',
    time: '22:55',
    color: '#ff5a6e',
    txt:
      '7 апреля, 21:02 — первый контакт.\n' +
      '«Ты копаешь не там».\n\n' +
      '7 апреля, 21:34 — упомянул Кирилла.\n' +
      'Знает имя. Знает место. Знает год.\n\n' +
      '10 апреля, 22:15 — «последнее предупреждение».\n\n' +
      '12 апреля, 23:44 — голосовое.\n' +
      '«Откажись от показа». Голос изменён.\n\n' +
      'Кто этот человек?\n' +
      'Он не убийца. Убийца — за рулём.\n' +
      'Этот — тот, кто знает. Скрывает.\n\n' +
      'Может быть, это одно лицо?\n' +
      'А может быть, их двое.\n\n' +
      'Надо запомнить: если со мной\n' +
      'что-то случится — всё в папке «Кирилл».',
    ev: 'note_threats',
    flag: 'read_note_threats'
  },

  n11: {
    ico: 'users',
    t: 'Люди вокруг',
    sub: 'Кто на самом деле рядом',
    date: '8 апреля',
    time: '18:22',
    color: '#ffb84d',
    txt:
      'Лена — единственная, кому я верю.\n' +
      'Она не знает всех деталей, но она рядом.\n' +
      'Если что — она поймёт.\n\n' +
      'Артём — он меня не слышит.\n' +
      'Он любит меня? Может быть.\n' +
      'Но он не видит того, что вижу я.\n' +
      'Он видит «свадьбу», «будущее».\n' +
      'А я вижу лицо брата на асфальте.\n\n' +
      'Соня — соседка. Хорошая. Но не в теме.\n\n' +
      'Дима — опасно. Следит. Нестабилен.\n' +
      'Но он не при чём в истории Кирилла.\n\n' +
      'Антон — честный. Он свидетель.\n' +
      'Если что, он расскажет правду.\n\n' +
      'Виктор Павлович — вот кто ключ.\n' +
      'Я уверена.',
    ev: null,
    flag: 'read_note_people'
  },

  n12: {
    ico: 'book',
    t: 'Сны о Кирилле',
    sub: 'Личное',
    date: '20 марта',
    time: '04:12',
    color: '#7a869c',
    txt:
      'Сегодня мне опять снился Кирилл.\n\n' +
      'Он стоял на дороге. Мокрой, ночной.\n' +
      'Он смотрел на меня и улыбался.\n' +
      'Как будто ничего не случилось.\n\n' +
      'Я кричу ему: «Уходи оттуда!»\n' +
      'А он не слышит. Или слышит,\n' +
      'но не хочет уходить.\n\n' +
      'Потом свет фар. И всё.\n\n' +
      'Я просыпаюсь в 4 утра.\n' +
      'Каждый раз — в 4 утра.\n\n' +
      'Я знаю, что это не он. Это моя вина.\n' +
      'Если бы я не попросила его\n' +
      'заехать за мной той ночью...\n\n' +
      'Он был бы жив.',
    ev: 'note_kirill_dream',
    flag: 'read_note_kirill_dream'
  },

  n13: {
    ico: 'shield',
    t: 'План Б',
    sub: 'Если что-то пойдёт не так',
    date: '12 апреля',
    time: '15:40',
    color: '#5da9ff',
    txt:
      '1. Папка «Кирилл» на ноутбуке.\n' +
      '   Пароль: 14092019.\n' +
      '   Там — копия записи, дело ГИБДД,\n' +
      '   мои заметки, список подозреваемых.\n\n' +
      '2. Копия записи — на флешке.\n' +
      '   Флешка — в книге «Мастер и Маргарита».\n' +
      '   На полке, вторая снизу.\n\n' +
      '3. Если со мной что-то случится\n' +
      '   в течение 48 часов после показа,\n' +
      '   Лена откроет папку.\n' +
      '   Она знает пароль.\n\n' +
      '4. Не идти в ателье одному.\n' +
      '   Не поворачиваться спиной.\n' +
      '   Держать телефон в руке.\n\n' +
      'Всё продумано. Всё будет хорошо.',
    ev: 'note_plan_b',
    flag: 'read_note_plan_b'
  },

  n14: {
    ico: 'film',
    t: 'Что сказал Крылов',
    sub: 'Разговор 8 апреля',
    date: '8 апреля',
    time: '17:20',
    color: '#ffb84d',
    txt:
      'Крылов позвонил неожиданно.\n' +
      'Голос спокойный, вежливый.\n\n' +
      '«Марина Андреевна, я предлагаю вам\n' +
      'полнометражный фильм. 12 миллионов.\n' +
      'Продюсерский центр мой.»\n\n' +
      'Я спросила: «При условии?»\n\n' +
      'Он засмеялся. И сказал:\n' +
      '«Уберите вторую часть.»\n\n' +
      'Я отказалась.\n\n' +
      'Он сказал: «У вас есть время до конца\n' +
      'недели. Подумайте.»\n\n' +
      'И повесил трубку.\n\n' +
      '12 миллионов рублей за одну сцену.\n' +
      'Что же вы так боитесь, Андрей\n' +
      'Владимирович?',
    ev: 'note_krylov_offer',
    flag: 'read_note_krylov_offer'
  },

  n15: {
    ico: 'key',
    t: 'Ключ от павильона',
    sub: 'Всё, что надо знать',
    date: '11 апреля',
    time: '16:25',
    color: '#3ddc97',
    txt:
      'Павильон №3 забронирован 13 апреля\n' +
      'с 23:00 до 01:00.\n\n' +
      'Зачем я это сделала?\n' +
      'Потому что мне нужно место, где я\n' +
      'могу всё проверить наедине.\n\n' +
      'По плану:\n' +
      '— Сначала встретимся с Виктором\n' +
      '— Он передаст мне «оригинал»\n' +
      '— Я проверю его при нём\n' +
      '— И позвоню Лене. Всё зафиксирую.\n\n' +
      'Ключ у администратора.\n' +
      'Павильон №3 — второй этаж, левое крыло.\n' +
      'Из окна видно улицу.',
    ev: 'note_key',
    flag: 'read_note_key'
  }

};

/* ------------------------------------------------------------
   РЕНДЕР СПИСКА ЗАМЕТОК
   ------------------------------------------------------------ */
ROUTES.notes = function(){
  G.screen = 'notes';

  const keys = Object.keys(NOTES);
  const read = keys.filter(function(k){
    return G.opened.notes[k];
  }).length;

  const rows = keys.map(function(k){
    return renderNoteRow(k);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Заметки</h2>'
  +     '<div class="sub">' + keys.length + ' записей · '
  +       read + ' прочитано'
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Новая заметка\',\'Функция недоступна\',\'warn\')">'
  +     svg('plus', 18)
  +   '</button>'
  + '</div>'

  + '<div class="notes-list">' + rows + '</div>');
};

/* ------------------------------------------------------------
   ОДНА СТРОКА ЗАМЕТКИ
   ------------------------------------------------------------ */
function renderNoteRow(key){
  const n = NOTES[key];
  if(!n) return '';

  const locked = n.locked && !hasFlag(n.locked);
  const read = G.opened.notes[key];
  const isAudio = key === 'n6';

  if(locked){
    return ''
    + '<div class="note locked">'
    +   '<div class="note-ico">' + svg('lock', 18) + '</div>'
    +   '<div class="note-body">'
    +     '<h4>🔒 Зашифровано</h4>'
    +     '<p>Требуется доступ к переписке с '
    +       'Виктором Павловичем</p>'
    +   '</div>'
    + '</div>';
  }

  const unreadDot = !read
    ? '<span class="note-dot"></span>'
    : '';

  return ''
  + '<div class="note' + (isAudio ? ' audio' : '') + '" '
  +   'onclick="openNote(\'' + key + '\')">'
  +   '<div class="note-ico" style="color:' + n.color + '">'
  +     svg(n.ico || 'note', 18)
  +   '</div>'
  +   '<div class="note-body">'
  +     '<h4>' + escapeHtml(n.t) + unreadDot + '</h4>'
  +     '<p>' + escapeHtml(n.sub || '') + '</p>'
  +   '</div>'
  +   '<div class="note-date">'
  +     '<span>' + escapeHtml(n.date || '') + '</span>'
  +     '<span>' + escapeHtml(n.time || '') + '</span>'
  +   '</div>'
  + '</div>';
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ ЗАМЕТКИ
   ------------------------------------------------------------ */
function openNote(key){
  const n = NOTES[key];
  if(!n) return;

  if(n.locked && !hasFlag(n.locked)){
    toast('Заблокировано', 'Нужны дополнительные данные', 'warn');
    return;
  }

  const firstRead = !G.opened.notes[key];
  G.opened.notes[key] = true;
  if(firstRead) G.notesRead++;

  if(n.flag) setFlag(n.flag);

  if(n.ev && !hasEv(n.ev)){
    addEv(n.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[n.ev] || n.t, 'ev');
    }, 400);
  }

  /* Спец-обработка аудио */
  if(key === 'n6'){
    renderAudioNote(n);
    return;
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(n.t) + '</h2>'
  +     '<div class="sub">' + escapeHtml(n.date)
  +       + ' · ' + escapeHtml(n.time)
  +     '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="note-view">'
  +   '<div class="note-view-head" style="border-left-color:' + n.color + '">'
  +     '<div class="nvh-ico" style="color:' + n.color + '">'
  +       svg(n.ico || 'note', 22)
  +     '</div>'
  +     '<div>'
  +       '<h2>' + escapeHtml(n.t) + '</h2>'
  +       '<div class="nvh-sub">' + escapeHtml(n.sub || '') + '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="note-text">' + formatNoteText(n.txt) + '</div>'

  +   '<div class="note-actions">'
  +     '<button class="btn ghost" onclick="toast(\'Экспорт\',\'Функция недоступна\',\'warn\')">'
  +       svg('share', 16) + ' Отправить'
  +     '</button>'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +   '</div>'
  + '</div>');
}

/* ------------------------------------------------------------
   ФОРМАТИРОВАНИЕ ТЕКСТА ЗАМЕТКИ
   ------------------------------------------------------------ */
function formatNoteText(txt){
  if(!txt) return '';
  const safe = escapeHtml(txt);
  return safe.replace(/\n/g, '<br>');
}

/* ------------------------------------------------------------
   СПЕЦ-ЭКРАН ДЛЯ АУДИОЗАПИСИ
   ------------------------------------------------------------ */
function renderAudioNote(n){
  /* Формируем волны для плеера */
  const bars = Array.from({length: 48}, function(_, i){
    const h = 8 + Math.abs(Math.sin(i * 0.4)) * 26 + (i % 3) * 3;
    return '<i style="height:' + h + 'px"></i>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Аудиозапись</h2>'
  +     '<div class="sub">14 апреля · 00:41 · 41 сек</div>'
  +   '</div>'
  + '</div>'

  + '<div class="audio-view">'

  +   '<div class="audio-hero">'
  +     '<div class="ah-ring">'
  +       svg('mic', 40)
  +     '</div>'
  +     '<div class="ah-label">АУДИОЗАПИСЬ</div>'
  +     '<div class="ah-sub">'
  +       'Последняя запись Марины Соколовой'
  +     '</div>'
  +   '</div>'

  +   '<div class="audio-player">'
  +     '<div class="ap-bar">' + bars + '</div>'
  +     '<div class="ap-times">'
  +       '<span>00:00</span>'
  +       '<span>00:41</span>'
  +     '</div>'
  +     '<div class="ap-controls">'
  +       '<button class="ap-btn" onclick="toast(\'Перемотка\',\'−5 сек\',\'warn\')">'
  +         svg('rewind', 20)
  +       '</button>'
  +       '<button class="ap-btn play" onclick="playAudioNote()">'
  +         svg('play', 24, 'fill')
  +       '</button>'
  +       '<button class="ap-btn" onclick="toast(\'Перемотка\',\'+5 сек\',\'warn\')">'
  +         svg('forward', 20)
  +       '</button>'
  +     '</div>'
  +   '</div>'

  +   '<div class="audio-transcript">'
  +     '<div class="at-head">'
  +       svg('fileText', 14) + ' Расшифровка'
  +     '</div>'
  +     '<div class="at-body">'

  +       '<div class="at-line">'
  +         '<span class="at-time">00:02</span>'
  +         '<span class="at-who m">Марина</span>'
  +         '<span class="at-txt">Виктор Павлович, вы... '
  +           'вы зачем привезли оригинал сюда?</span>'
  +       '</div>'

  +       '<div class="at-line">'
  +         '<span class="at-time">00:08</span>'
  +         '<span class="at-who v">Виктор</span>'
  +         '<span class="at-txt">Чтобы никто не нашёл. '
  +           'Ни ты, ни они.</span>'
  +       '</div>'

  +       '<div class="at-line">'
  +         '<span class="at-time">00:14</span>'
  +         '<span class="at-who m">Марина</span>'
  +         '<span class="at-txt">Что вы... отпустите.</span>'
  +       '</div>'

  +       '<div class="at-line">'
  +         '<span class="at-time">00:18</span>'
  +         '<span class="at-who v">Виктор</span>'
  +         '<span class="at-txt">Ты не понимаешь, Марина. '
  +           'Я не хотел. Тогда, на трассе. '
  +           'Я не видел его. Он выскочил.</span>'
  +       '</div>'

  +       '<div class="at-line critical">'
  +         '<span class="at-time">00:26</span>'
  +         '<span class="at-who m">Марина</span>'
  +         '<span class="at-txt">Так это были вы. '
  +           'Всё это время.</span>'
  +       '</div>'

  +       '<div class="at-line">'
  +         '<span class="at-time">00:30</span>'
  +         '<span class="at-who v">Виктор</span>'
  +         '<span class="at-txt">Я уберу плёнку. И ты забудешь.</span>'
  +       '</div>'

  +       '<div class="at-line critical">'
  +         '<span class="at-time">00:34</span>'
  +         '<span class="at-who m">Марина</span>'
  +         '<span class="at-txt">Не подходите. Я записываю. '
  +           'Всё записывается.</span>'
  +       '</div>'

  +       '<div class="at-line critical">'
  +         '<span class="at-time">00:38</span>'
  +         '<span class="at-who v">Виктор</span>'
  +         '<span class="at-txt">Тогда придётся... '
  +           'убрать и телефон.</span>'
  +       '</div>'

  +       '<div class="at-line noise">'
  +         '<span class="at-time">00:41</span>'
  +         '<span class="at-who">—</span>'
  +         '<span class="at-txt">[шум. удар. тишина.]</span>'
  +       '</div>'

  +     '</div>'
  +   '</div>'

  +   '<div class="audio-verdict">'
  +     '<div class="av-label">Вывод следователя</div>'
  +     '<div class="av-text">'
  +       'Запись признана неопровержимым доказательством. '
  +       'Голос идентифицирован как принадлежащий '
  +       'Соколовскому В. П.'
  +     '</div>'
  +   '</div>'

  + '</div>');

  /* Автоулика */
  if(!hasEv('note_audio')){
    addEv('note_audio');
    setFlag('heard_audio');
    setTimeout(function(){
      toast('📌 Ключевая улика', 'Запись признания', 'ev');
    }, 600);
  }
}

function playAudioNote(){
  toast('🎧 Воспроизведение', 'Запись начинается...', '');
  beep(180, 0.3, 'sine', 0.06);
  setTimeout(function(){
    beep(340, 0.25, 'sine', 0.05);
  }, 600);
  setTimeout(function(){
    toast('Голос', '«Ты не понимаешь, Марина...»', 'warn');
  }, 1500);
  setTimeout(function(){
    toast('Голос', '«Я не хотел. Тогда, на трассе...»', 'warn');
  }, 3500);
  setTimeout(function(){
    toast('Звук', 'Шум. Удар.', 'err');
  }, 5500);
}

/* ============================================================
   БЛОК 2 — БРАУЗЕР
   ============================================================ */

const SEARCHES = [

  {
    id: 's1',
    q: 'дело 4471/2019 кольцевая трасса',
    title: 'Архив ГИБДД — открытые данные',
    url: 'gibdd-archive.ru/case/4471-2019',
    snippet: 'Постановление №4471/2019. ДТП 14.09.2019, 02:14, Кольцевая трасса, 47-й км. Потерпевший Соколов К.А., 19 лет. Скончался на месте. Водитель скрылся.',
    body:
      'ПОСТАНОВЛЕНИЕ №4471/2019\n\n' +
      'г. Москва, 15 ноября 2019 г.\n\n' +
      '14 сентября 2019 года в 02:14 на 47-м километре\n' +
      'Кольцевой трассы произошло дорожно-транспортное\n' +
      'происшествие со смертельным исходом.\n\n' +
      'Погибший: Соколов Кирилл Андреевич, 19 лет.\n' +
      'Место смерти: место происшествия.\n\n' +
      'Второй участник ДТП с места скрылся.\n' +
      'Установить личность водителя не представилось\n' +
      'возможным ввиду отсутствия свидетелей и\n' +
      'записи видеонаблюдения.\n\n' +
      'На основании изложенного уголовное дело\n' +
      'приостановлено по п.1 ч.1 ст.208 УПК РФ.\n\n' +
      'Инспектор: [подпись неразборчива]',
    ev: 'search_case',
    flag: 'saw_search_case'
  },

  {
    id: 's2',
    q: 'седан вмятина правое крыло 742',
    title: 'Форум автолюбителей — «Помогите найти машину»',
    url: 'auto-forum.ru/thread/88421',
    snippet: 'Тема от 2019 года. Пользователь ищет тёмный седан с вмятиной на правом крыле, номер оканчивается на 742. Пост удалён модератором через 2 дня.',
    body:
      'Тема: «Помогите найти машину, водитель\n' +
      'скрылся с места ДТП»\n\n' +
      'Автор: аноним (гость)\n' +
      'Дата: 15 сентября 2019\n\n' +
      '«Ищу тёмный седан. Вмятина на правом\n' +
      'переднем крыле. Госномер частично\n' +
      'читается: последние цифры 742.\n' +
      'Регион — 77 или 50.\n\n' +
      'Очень нужно. Вознаграждение.»\n\n' +
      'Ответов: 0\n\n' +
      '[тема удалена модератором 17.09.2019]\n' +
      'Причина: нарушение правил раздела\n\n' +
      'Примечание администратора:\n' +
      '«Владелец отозвал объявление.»',
    ev: 'search_car',
    flag: 'saw_search_car'
  },

  {
    id: 's3',
    q: 'киноателье сокол павильон 3',
    title: 'Киноателье «Сокол» — официальный сайт',
    url: 'sokol-studio.ru/pavilions',
    snippet: 'Историческое здание 1913 года. 4 павильона. Павильон №3 — самый большой, используется для декораций. Аренда почасово.',
    body:
      'КИНОАТЕЛЬЕ «СОКОЛ»\n\n' +
      'Основано в 1913 году.\n' +
      'Одно из старейших съёмочных пространств Москвы.\n\n' +
      'ЗДАНИЕ:\n' +
      '— Общая площадь: 4 200 кв. м.\n' +
      '— 4 павильона.\n' +
      '— 3 этажа.\n' +
      '— Есть подземный уровень (архивы).\n\n' +
      'ПАВИЛЬОН №3:\n' +
      '— Площадь: 620 кв. м.\n' +
      '— Потолки: 12 м.\n' +
      '— Есть балкон для съёмки сверху.\n' +
      '— ВНИМАНИЕ: последняя реконструкция — 2018 г.\n' +
      '— Собственник: ООО «Крылов и партнёры».\n\n' +
      'Аренда: почасовая, от 12 000 ₽.\n\n' +
      'ВНИМАНИЕ: павильон №3 внесён в список\n' +
      'объектов культурного наследия.\n' +
      'Любые изменения запрещены.',
    ev: 'search_studio',
    flag: 'saw_search_studio'
  },

  {
    id: 's4',
    q: 'крылов андрей продюсер кафедра кино',
    title: 'Новости региона — 2021',
    url: 'news-region.ru/2021/krylov-award',
    snippet: 'Бизнесмен Андрей Крылов награждён за меценатство. Среди проектов — финансирование кафедры киноискусства. Руководитель кафедры — В.П. Соколовский.',
    body:
      '«ЧЕЛОВЕК ГОДА — 2021»:\n' +
      'АНДРЕЙ КРЫЛОВ\n\n' +
      'Объявлен меценатом года в области\n' +
      'поддержки молодых кинематографистов.\n\n' +
      'Достижения:\n' +
      '— Финансирование кафедры киноискусства\n' +
      '  (объём: 45 млн. ₽ за 3 года).\n' +
      '— Основание гранта для дипломных работ.\n' +
      '— Реставрация киноателье «Сокол».\n\n' +
      'Руководитель кафедры:\n' +
      'В. П. Соколовский.\n\n' +
      '«Мы партнёры уже более 7 лет», —\n' +
      'отметил Крылов на вручении.\n\n' +
      'Среди гостей церемонии — ведущие\n' +
      'режиссёры и продюсеры страны.',
    ev: 'search_krylov',
    flag: 'saw_search_krylov'
  },

  {
    id: 's5',
    q: 'соколовский виктор павлович дтп',
    title: '— Ничего не найдено —',
    url: 'yandex.ru/search/?q=соколовский+дтп',
    snippet: 'По вашему запросу нет результатов. Некоторые материалы могли быть удалены по запросу правообладателя.',
    body:
      'РЕЗУЛЬТАТОВ НЕ НАЙДЕНО.\n\n' +
      'По вашему запросу нет результатов.\n\n' +
      'Попробуйте изменить формулировку.\n\n' +
      'Примечание системы:\n' +
      '«Некоторые материалы были удалены\n' +
      'по запросу правообладателя в соответствии\n' +
      'с законодательством.»',
    ev: 'search_deleted',
    flag: 'saw_search_deleted'
  },

  {
    id: 's6',
    q: 'как восстановить удалённые видео с регистратора',
    title: 'Восстановление данных — руководство',
    url: 'datarecovery.ru/guide',
    snippet: 'Удалённые фрагменты часто сохраняются в скрытом разделе. Для восстановления требуется исходная карта памяти.',
    body:
      'ВОССТАНОВЛЕНИЕ УДАЛЁННЫХ ВИДЕО\n\n' +
      '1. Не записывайте новые данные на карту.\n' +
      '2. Используйте программу Recuva или R-Studio.\n' +
      '3. Удалённые фрагменты могут сохраниться\n' +
      '   в скрытом разделе ~ 30-60 дней.\n' +
      '4. Если фрагмент найден — сохраните его\n' +
      '   на отдельный носитель.\n' +
      '5. Не пытайтесь смотреть файл сразу —\n' +
      '   сначала сделайте резервную копию.\n\n' +
      'Важно:\n' +
      'Если карта памяти повреждена — обратитесь\n' +
      'к специалисту. Стоимость — от 5 000 ₽.',
    ev: null,
    flag: 'saw_search_recovery'
  },

  {
    id: 's7',
    q: 'Кирилл Соколов однокурсники 2019',
    title: 'Академия искусств — группа 1А, 2019',
    url: 'academy-arts.ru/groups/1a-2019',
    snippet: 'Список студентов курса режиссуры. Соколов Кирилл Андреевич, 19 лет. Отчислен посмертно 14 сентября 2019 года.',
    body:
      'ГРУППА 1А, КУРС РЕЖИССУРЫ (2018-2019)\n\n' +
      'Соколов Кирилл Андреевич\n' +
      'Статус: отчислен посмертно\n' +
      'Дата: 14 сентября 2019 г.\n\n' +
      'Другие студенты курса:\n' +
      '— Мельникова Анна\n' +
      '— Петрова Дарья\n' +
      '— Ветров Антон (друг, сейчас учится у нас)\n' +
      '— Соколова Марина (сестра, курс 4Б)\n\n' +
      'Примечание куратора:\n' +
      '«Кирилл был талантливым студентом.\n' +
      'Его гибель — огромная потеря для\n' +
      'всей академии.»',
    ev: 'search_kirill',
    flag: 'saw_search_kirill'
  },

  {
    id: 's8',
    q: 'BMW 7 серия 2018 вмятина',
    title: 'Объявления о продаже — архив',
    url: 'auto.ru/listing/archive/bmw-7-2018',
    snippet: 'Объявление от 2018 года. BMW 7 серии, чёрный, вмятина на правом крыле. Продано 20 ноября 2019 года. Продавец: скрыт.',
    body:
      'ОБЪЯВЛЕНИЕ СНЯТО С ПУБЛИКАЦИИ\n\n' +
      'BMW 7 series, 2018 г.в.\n' +
      'Цвет: чёрный металлик\n' +
      'Пробег: 34 200 км\n' +
      'Состояние: есть вмятина на правом\n' +
      'переднем крыле.\n\n' +
      'Цена: 3 800 000 ₽\n' +
      'Размещено: 15 октября 2019\n' +
      'Снято: 20 ноября 2019\n\n' +
      'Продавец: [данные удалены]\n' +
      'Телефон: [скрыт]\n\n' +
      'Нажмите «Показать контакты» —\n' +
      'функция отключена.',
    ev: 'search_bmw',
    flag: 'saw_search_bmw'
  },

  {
    id: 's9',
    q: 'Кольцевая трасса 47 км камеры',
    title: 'Карта камер видеонаблюдения',
    url: 'roads-moscow.ru/cameras/47km',
    snippet: 'На 47-м километре Кольцевой трассы установлено 2 камеры. Одна не работала в ночь на 14 сентября 2019 года.',
    body:
      'КАМЕРЫ НА 47-м КМ КОЛЬЦЕВОЙ\n\n' +
      'Камера №1 (направление: север)\n' +
      '— Установлена: 2018 г.\n' +
      '— Статус: работает\n' +
      '— Архив: 30 дней\n\n' +
      'Камера №2 (направление: юг)\n' +
      '— Установлена: 2018 г.\n' +
      '— Статус: НЕ РАБОТАЛА\n' +
      '— Период: 10.09.2019 – 15.09.2019\n' +
      '— Причина: плановый ремонт\n\n' +
      'ВНИМАНИЕ: обе камеры не фиксируют\n' +
      'пешеходное движение.\n\n' +
      'Обратитесь в ГИБДД для получения\n' +
      'архивных записей.',
    ev: 'search_cameras',
    flag: 'saw_search_cameras'
  },

  {
    id: 's10',
    q: 'как удалить следы в интернете',
    title: 'Удаление информации — юридическая помощь',
    url: 'law-help.ru/delete-info',
    snippet: 'По закону о «праве на забвение» можно удалить ссылки на недостоверную информацию. Стоимость услуги — от 50 000 ₽.',
    body:
      'УДАЛЕНИЕ ИНФОРМАЦИИ ИЗ ПОИСКА\n\n' +
      'По закону 152-ФЗ «О праве на забвение»\n' +
      'вы можете требовать удаления ссылок\n' +
      'на информацию о вас из поисковых систем.\n\n' +
      'УСЛОВИЯ:\n' +
      '— Информация должна быть недостоверной\n' +
      '— Или распространяться с нарушением закона\n' +
      '— Или утратить актуальность\n\n' +
      'СРОКИ:\n' +
      '— 3 месяца с момента обращения\n\n' +
      'СТОИМОСТЬ:\n' +
      '— от 50 000 ₽ за один запрос\n' +
      '— комплексная работа — от 250 000 ₽\n\n' +
      'Наши партнёры работают быстро и тихо.',
    ev: 'search_cleanup',
    flag: 'saw_search_cleanup'
  },

  {
    id: 's11',
    q: 'соколовский ольга жена',
    title: 'Социальная сеть — профиль',
    url: 'social.ru/profile/olga.sokolovskaya',
    snippet: 'Ольга Соколовская, 49 лет. Замужем за Виктором Соколовским. Работает в благотворительном фонде.',
    body:
      'ОЛЬГА СОКОЛОВСКАЯ\n' +
      '49 лет. Москва.\n\n' +
      'Семья:\n' +
      '— Муж: Виктор Соколовский\n' +
      '— Сын: Вадим Соколовский (27)\n\n' +
      'Работа:\n' +
      'Благотворительный фонд «Надежда»\n' +
      'Директор по связям с общественностью.\n\n' +
      'Интересы:\n' +
      '— Классическая музыка\n' +
      '— Живопись\n' +
      '— Психология\n\n' +
      'Статус: «Тишина — лучший ответ»\n' +
      'Последняя публикация: 3 месяца назад.',
    ev: 'search_olga',
    flag: 'saw_search_olga'
  },

  {
    id: 's12',
    q: 'как сохранить аудиозапись в телефоне',
    title: 'Инструкция: диктофон',
    url: 'help-mobile.ru/dictaphone',
    snippet: 'Чтобы запись не удалилась, сохраните её в защищённую папку. При выключении телефона запись остаётся.',
    body:
      'СОХРАНЕНИЕ АУДИОЗАПИСИ\n\n' +
      '1. Откройте приложение «Диктофон».\n' +
      '2. Выберите запись.\n' +
      '3. Нажмите «Сохранить в защищённую папку».\n' +
      '4. Задайте отдельный пароль.\n\n' +
      'ВАЖНО:\n' +
      '— Защищённые записи не удаляются\n' +
      '  при сбросе настроек.\n' +
      '— Они не синхронизируются с облаком.\n' +
      '— Их видно только через пароль.\n\n' +
      'ПРИМЕЧАНИЕ:\n' +
      'Если вы выключите телефон во время\n' +
      'записи, она автоматически сохранится.',
    ev: null,
    flag: 'saw_search_dictaphone'
  }

];

/* ------------------------------------------------------------
   РЕНДЕР БРАУЗЕРА
   ------------------------------------------------------------ */
ROUTES.browser = function(){
  G.screen = 'browser';

  const viewed = SEARCHES.filter(function(s){
    return G.opened.searches[s.id];
  }).length;

  const rows = SEARCHES.map(function(s){
    return renderSearchRow(s);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Браузер</h2>'
  +     '<div class="sub">История · ' + viewed + '/' + SEARCHES.length + '</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Очистка\',\'История не подлежит удалению\',\'warn\')">'
  +     svg('trash', 18)
  +   '</button>'
  + '</div>'

  + '<div class="browser-view">'

  +   '<div class="browser-urlbar">'
  +     '<span class="bur-lock">' + svg('lock', 12) + '</span>'
  +     '<input value="sokol-studio.ru" readonly>'
  +     '<span class="bur-refresh">' + svg('refresh', 14) + '</span>'
  +   '</div>'

  +   '<div class="browser-hint">'
  +     svg('info', 12) + ' История поисковых запросов Марины'
  +   '</div>'

  +   '<div class="search-list">' + rows + '</div>'

  + '</div>');
};

function renderSearchRow(s){
  const viewed = G.opened.searches[s.id];
  return ''
  + '<div class="search-row' + (viewed ? ' seen' : '') + '" '
  +   'onclick="openSearch(\'' + s.id + '\')">'
  +   '<div class="sr-q">'
  +     svg('search', 13)
  +     '<span>' + escapeHtml(s.q) + '</span>'
  +   '</div>'
  +   '<div class="sr-title">' + escapeHtml(s.title) + '</div>'
  +   '<div class="sr-url">' + escapeHtml(s.url) + '</div>'
  +   '<div class="sr-snip">' + escapeHtml(s.snippet) + '</div>'
  + '</div>';
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ РЕЗУЛЬТАТА ПОИСКА
   ------------------------------------------------------------ */
function openSearch(id){
  const s = SEARCHES.find(function(x){ return x.id === id; });
  if(!s) return;

  const firstView = !G.opened.searches[id];
  G.opened.searches[id] = true;

  if(s.flag) setFlag(s.flag);

  if(s.ev && !hasEv(s.ev)){
    addEv(s.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[s.ev] || s.title, 'ev');
    }, 400);
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Результат</h2>'
  +     '<div class="sub">' + escapeHtml(s.url) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="browser-detail">'

  +   '<div class="bd-urlbar">'
  +     '<span class="bd-lock">' + svg('lock', 12) + '</span>'
  +     '<span>' + escapeHtml(s.url) + '</span>'
  +   '</div>'

  +   '<h2 class="bd-title">' + escapeHtml(s.title) + '</h2>'

  +   '<div class="bd-body">' + formatNoteText(s.body) + '</div>'

  +   '<div class="bd-actions">'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' К истории'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ============================================================
   БЛОК 3 — ЗВОНКИ
   ============================================================ */

const CALLS = [

  {
    id: 'c1',
    nm: 'Виктор Павлович',
    sub: 'Соколовский В. П.',
    av: 'ВП',
    color: '#8b6dff',
    tm: '13 апреля, 23:47',
    type: 'out',
    dur: '1 мин 12 сек',
    ev: 'call_viktor',
    flag: 'saw_call_viktor',
    note:
      'Последний звонок в жизни Марины.\n' +
      'Исходящий. Продолжительность — 72 секунды.\n' +
      'После этого телефон замолчал.'
  },

  {
    id: 'c2',
    nm: 'Лена Крылова',
    sub: 'лучшая подруга',
    av: 'ЛК',
    color: '#e05c7a',
    tm: '13 апреля, 22:31',
    type: 'in',
    dur: '3 мин 40 сек',
    ev: null,
    flag: 'saw_call_lena',
    note:
      'Разговор после показа.\n' +
      'Лена утверждает, что Марина была\n' +
      'взволнована, но не сказала, куда едет.'
  },

  {
    id: 'c3',
    nm: 'Неизвестный номер',
    sub: '+7 (9••) •••-74-2',
    av: '?',
    color: '#ff5a6e',
    tm: '12 апреля, 23:44',
    type: 'miss',
    dur: '—',
    ev: 'unknown_call',
    flag: 'saw_unknown_call',
    note:
      'Пропущенный.\n' +
      'Тот же номер, что писал угрозы.\n' +
      'Перезвонить не удалось — «абонент\n' +
      'недоступен».'
  },

  {
    id: 'c4',
    nm: 'Артём Северов',
    sub: 'жених',
    av: 'АС',
    color: '#ff8a5c',
    tm: '12 апреля, 21:40',
    type: 'in',
    dur: '8 сек',
    ev: null,
    flag: 'saw_call_artem',
    note:
      'Короткий разговор.\n' +
      'Артём сказал, что уезжает к брату.\n' +
      'Марина не ответила.'
  },

  {
    id: 'c5',
    nm: 'Дима Лапин',
    sub: 'бывший парень',
    av: 'ДЛ',
    color: '#5da9ff',
    tm: '11 апреля, 19:47',
    type: 'miss',
    dur: '—',
    ev: null,
    flag: 'saw_call_dima',
    note:
      'Пропущенный от бывшего.\n' +
      'Он звонил ещё 4 раза за неделю.\n' +
      'Марина не перезвонила ни разу.'
  },

  {
    id: 'c6',
    nm: 'Соня Мельник',
    sub: 'соседка',
    av: 'СМ',
    color: '#3ddc97',
    tm: '12 апреля, 17:12',
    type: 'in',
    dur: '45 сек',
    ev: null,
    flag: 'saw_call_sonya',
    note:
      'Про ключи и еду.\n' +
      'Ничего важного.\n' +
      'Последний спокойный разговор.'
  },

  {
    id: 'c7',
    nm: 'Мама',
    sub: 'Соколова Е. А.',
    av: 'М',
    color: '#ffb84d',
    tm: '11 апреля, 10:33',
    type: 'out',
    dur: '6 мин 20 сек',
    ev: null,
    flag: 'saw_call_mama',
    note:
      'Обычный разговор.\n' +
      'Марина обещала приехать после показа.\n' +
      'Мама спросила про свадьбу.'
  },

  {
    id: 'c8',
    nm: 'Андрей Крылов',
    sub: 'продюсер',
    av: 'АК',
    color: '#c8d1e2',
    tm: '10 апреля, 14:20',
    type: 'in',
    dur: '4 мин 15 сек',
    ev: null,
    flag: 'saw_call_krylov',
    note:
      'Крылов звонил лично.\n' +
      'Говорил спокойно, вежливо.\n' +
      'Предложил контракт. Марина отказалась.'
  },

  {
    id: 'c9',
    nm: 'Антон Ветров',
    sub: 'одногруппник',
    av: 'АВ',
    color: '#5da9ff',
    tm: '13 апреля, 22:20',
    type: 'in',
    dur: '2 мин 10 сек',
    ev: null,
    flag: 'saw_call_anton',
    note:
      'Антон позвонил после показа.\n' +
      'Сказал, что видел, как Марина\n' +
      'выходила с мужчиной в тёмном пальто.\n' +
      'Спросил, всё ли в порядке.'
  },

  {
    id: 'c10',
    nm: 'Вадим Соколовский',
    sub: 'сын Виктора Павловича',
    av: 'ВС',
    color: '#ff5a6e',
    tm: '11 апреля, 20:30',
    type: 'in',
    dur: '12 сек',
    ev: null,
    flag: 'saw_call_vadim',
    note:
      'Короткий разговор.\n' +
      'Вадим сказал: «Я знаю, кто ты».\n' +
      'И повесил трубку.'
  },

  {
    id: 'c11',
    nm: 'Киноателье «Сокол»',
    sub: 'служебный',
    av: 'КС',
    color: '#7a869c',
    tm: '11 апреля, 16:00',
    type: 'in',
    dur: '1 мин 05 сек',
    ev: null,
    flag: 'saw_call_studio',
    note:
      'Администратор подтвердил бронь\n' +
      'павильона №3 на 13 апреля.\n' +
      'Сообщил, что звонили из офиса Крылова.'
  },

  {
    id: 'c12',
    nm: 'Неизвестный номер',
    sub: 'номер скрыт',
    av: '—',
    color: '#4d576b',
    tm: '11 апреля, 03:14',
    type: 'miss',
    dur: '—',
    ev: null,
    flag: 'saw_unknown_call_2',
    note:
      'Пропущенный ночью.\n' +
      'Номер скрыт.\n' +
      'Совпадает по времени с первым\n' +
      'голосовым сообщением с угрозами.'
  },

  {
    id: 'c13',
    nm: 'Ольга Соколовская',
    sub: 'жена Виктора Павловича',
    av: 'ОС',
    color: '#c8d1e2',
    tm: '3 апреля, 18:20',
    type: 'in',
    dur: '5 мин 20 сек',
    ev: null,
    flag: 'saw_call_olga',
    note:
      'Ольга звонила лично.\n' +
      'Просила не показывать фильм.\n' +
      'Марина отказалась. Ольга сказала:\n' +
      '«Тогда я вам не завидую».'
  },

  {
    id: 'c14',
    nm: 'Неизвестный номер',
    sub: '+7 (9••) •••-74-2',
    av: '?',
    color: '#ff5a6e',
    tm: '7 апреля, 21:02',
    type: 'in',
    dur: '20 сек',
    ev: null,
    flag: 'saw_call_threat_1',
    note:
      'Первый контакт с анонимом.\n' +
      'Мужской голос, изменён.\n' +
      'Марина сбросила.'
  },

  {
    id: 'c15',
    nm: 'Неизвестный номер',
    sub: '+7 (9••) •••-74-2',
    av: '?',
    color: '#ff5a6e',
    tm: '10 апреля, 22:15',
    type: 'in',
    dur: '35 сек',
    ev: null,
    flag: 'saw_call_threat_2',
    note:
      '«Последнее предупреждение».\n' +
      'Марина сбросила.\n' +
      'Записала в заметки.'
  },

  {
    id: 'c16',
    nm: 'Юля Соколова',
    sub: 'невестка',
    av: 'ЮС',
    color: '#ff7a9c',
    tm: '6 апреля, 14:20',
    type: 'in',
    dur: '3 мин 30 сек',
    ev: null,
    flag: 'saw_call_yulia',
    note:
      'Юля просила не показывать фильм.\n' +
      '«Кир бы не хотел».'
  },

  {
    id: 'c17',
    nm: 'Мама',
    sub: 'Соколова Е. А.',
    av: 'М',
    color: '#ffb84d',
    tm: '5 апреля, 10:02',
    type: 'in',
    dur: '4 мин 40 сек',
    ev: null,
    flag: 'saw_call_mama_2',
    note:
      'Разговор о здоровье.\n' +
      'Мама попросила приехать на выходных.'
  },

  {
    id: 'c18',
    nm: 'Артём Северов',
    sub: 'жених',
    av: 'АС',
    color: '#ff8a5c',
    tm: '10 апреля, 11:02',
    type: 'in',
    dur: '2 мин 15 сек',
    ev: null,
    flag: 'saw_call_artem_2',
    note:
      'Разговор про костюм и ресторан.\n' +
      'Артём нервничал.'
  },

  {
    id: 'c19',
    nm: 'Неизвестный номер',
    sub: 'скрыт',
    av: '—',
    color: '#4d576b',
    tm: '12 апреля, 02:40',
    type: 'miss',
    dur: '—',
    ev: null,
    flag: 'saw_unknown_call_3',
    note:
      'Ночной пропущенный.\n' +
      'Второе голосовое сообщение.\n' +
      'Продолжительность — 8 секунд.'
  },

  {
    id: 'c20',
    nm: 'Лена Крылова',
    sub: 'лучшая подруга',
    av: 'ЛК',
    color: '#e05c7a',
    tm: '14 апреля, 00:15',
    type: 'in',
    dur: '—',
    ev: null,
    flag: 'saw_call_lena_2',
    note:
      'Пропущенный уже после исчезновения.\n' +
      'Лена звонила всю ночь.\n' +
      'Марина уже не ответила.'
  }

];

/* ------------------------------------------------------------
   РЕНДЕР СПИСКА ЗВОНКОВ
   ------------------------------------------------------------ */
ROUTES.calls = function(){
  G.screen = 'calls';

  const total = CALLS.length;
  const missed = CALLS.filter(function(c){
    return c.type === 'miss';
  }).length;
  const incoming = CALLS.filter(function(c){
    return c.type === 'in';
  }).length;
  const outgoing = CALLS.filter(function(c){
    return c.type === 'out';
  }).length;

  const rows = CALLS.map(function(c){
    return renderCallRow(c);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Звонки</h2>'
  +     '<div class="sub">'
  +       total + ' · '
  +       incoming + ' вх · '
  +       outgoing + ' исх · '
  +       '<span style="color:var(--danger)">'
  +       missed + ' пропущ'
  +       '</span>'
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Фильтр\',\'Функция недоступна\',\'warn\')">'
  +     svg('grid', 18)
  +   '</button>'
  + '</div>'

  + '<div class="calls-view">'
  +   rows
  + '</div>');
};

function renderCallRow(c){
  if(!G.opened.calls[c.id]){
    G.opened.calls[c.id] = false;
  }

  const icoName = c.type === 'miss'
    ? 'phoneMissed'
    : (c.type === 'in' ? 'phoneIn' : 'phoneOut');
  const icoClass = c.type === 'miss'
    ? 'miss'
    : (c.type === 'in' ? 'in' : 'out');

  const seen = G.opened.calls[c.id];

  return ''
  + '<div class="call-row' + (seen ? '' : ' unread') + '" '
  +   'onclick="openCall(\'' + c.id + '\')">'
  +   '<div class="cr-avatar" style="background:' + c.color + '">'
  +     c.av
  +   '</div>'
  +   '<div class="cr-body">'
  +     '<div class="cr-name">' + escapeHtml(c.nm) + '</div>'
  +     '<div class="cr-meta">'
  +       '<span class="cr-ico ' + icoClass + '">'
  +         svg(icoName, 12)
  +       '</span>'
  +       '<span>' + escapeHtml(c.tm) + '</span>'
  +       (c.dur !== '—'
  +         ? '<span class="cr-dur">· ' + escapeHtml(c.dur) + '</span>'
  +         : ''
  +       )
  +     '</div>'
  +   '</div>'
  +   '<div class="cr-more">' + svg('info', 15) + '</div>'
  + '</div>';
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ ДЕТАЛИ ЗВОНКА
   ------------------------------------------------------------ */
function openCall(id){
  const c = CALLS.find(function(x){ return x.id === id; });
  if(!c) return;

  const firstView = !G.opened.calls[id];
  G.opened.calls[id] = true;

  if(c.flag) setFlag(c.flag);

  if(c.ev && !hasEv(c.ev)){
    addEv(c.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[c.ev] || 'Звонок зафиксирован', 'ev');
    }, 400);
  }

  const typeLabel = c.type === 'miss'
    ? 'Пропущенный'
    : (c.type === 'in' ? 'Входящий' : 'Исходящий');
  const typeColor = c.type === 'miss'
    ? 'var(--danger)'
    : (c.type === 'in' ? 'var(--ok)' : 'var(--acc)');

  const icoName = c.type === 'miss'
    ? 'phoneMissed'
    : (c.type === 'in' ? 'phoneIn' : 'phoneOut');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Информация о звонке</h2></div>'
  + '</div>'

  + '<div class="call-detail">'

  +   '<div class="cd-avatar" style="background:' + c.color + '">'
  +     c.av
  +   '</div>'

  +   '<h2 class="cd-name">' + escapeHtml(c.nm) + '</h2>'
  +   '<div class="cd-sub">' + escapeHtml(c.sub || '') + '</div>'

  +   '<div class="cd-type" style="color:' + typeColor + '">'
  +     svg(icoName, 14)
  +     '<span>' + typeLabel + '</span>'
  +   '</div>'

  +   '<div class="cd-rows">'
  +     '<div class="cd-row">'
  +       '<span>Дата и время</span>'
  +       '<b>' + escapeHtml(c.tm) + '</b>'
  +     '</div>'
  +     '<div class="cd-row">'
  +       '<span>Продолжительность</span>'
  +       '<b>' + escapeHtml(c.dur) + '</b>'
  +     '</div>'
  +     '<div class="cd-row">'
  +       '<span>Тип</span>'
  +       '<b style="color:' + typeColor + '">'
  +         typeLabel
  +       '</b>'
  +     '</div>'
  +   '</div>'

  +   '<div class="cd-note">'
  +     '<div class="cdn-label">' + svg('fileText', 13) + ' Заметка следователя</div>'
  +     '<div class="cdn-text">' + formatNoteText(c.note) + '</div>'
  +   '</div>'

  +   '<div class="cd-actions">'
  +     '<button class="btn ghost" onclick="toast(\'Перезвонить\',\'Абонент недоступен\',\'warn\')">'
  +       svg('phone', 16) + ' Перезвонить'
  +     '</button>'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ============================================================
   РАСШИРЕНИЕ СЛОВАРЯ НАЗВАНИЙ УЛИК
   ============================================================ */
(function extendEvidenceTitlesPart4(){
  const extra = {
    note_case: 'Заметка о деле',
    note_suspects: 'Список подозреваемых',
    note_plan: 'План показа',
    note_meeting: 'Заметка о встрече',
    note_arrival: 'Наблюдение у ателье',
    note_audio: 'АУДИОЗАПИСЬ признания',
    note_viktor_profile: 'Профиль Виктора',
    note_car: 'Параметры машины',
    note_reg: 'О регистраторе',
    note_threats: 'Хроника угроз',
    note_people: 'Окружение',
    note_kirill_dream: 'Сны о Кирилле',
    note_plan_b: 'План Б',
    note_krylov_offer: 'Предложение Крылова',
    note_key: 'Бронь павильона',
    search_case: 'Архив ГИБДД',
    search_car: 'Форум о машине',
    search_studio: 'Инфо о киноателье',
    search_krylov: 'Связь Крылова и кафедры',
    search_deleted: 'Удалённые материалы',
    search_kirill: 'О Кирилле',
    search_bmw: 'BMW 7 серии',
    search_cameras: 'Камеры на 47 км',
    search_cleanup: 'Услуги чистки',
    search_olga: 'Профиль Ольги',
    call_viktor: 'Последний звонок',
    unknown_call: 'Пропущенный от анонима'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   CSS ДЛЯ ЗАМЕТОК / БРАУЗЕРА / ЗВОНКОВ
   ============================================================ */
(function injectPart4Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  /* ---------- ЗАМЕТКИ ---------- */
  + '.notes-list{padding:6px 0}'
  + '.note{'
  +   'display:flex;gap:12px;padding:14px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:flex-start;position:relative;'
  + '}'
  + '.note:hover{background:var(--panel2)}'
  + '.note.locked{opacity:.4;cursor:not-allowed}'
  + '.note.audio{'
  +   'background:linear-gradient(90deg,'
  +   'rgba(255,90,110,.06), transparent 60%);'
  +   'border-left:3px solid var(--danger);'
  + '}'
  + '.note-ico{'
  +   'width:36px;height:36px;flex:0 0 36px;'
  +   'border-radius:10px;background:var(--panel2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1px solid var(--line);'
  + '}'
  + '.note-body{flex:1;min-width:0}'
  + '.note-body h4{'
  +   'font-size:13.5px;font-weight:600;margin-bottom:3px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.note-body p{'
  +   'font-size:12px;color:var(--dim);'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.note-dot{'
  +   'display:inline-block;width:7px;height:7px;'
  +   'border-radius:50%;background:var(--warn);'
  +   'flex:0 0 7px;'
  + '}'
  + '.note-date{'
  +   'display:flex;flex-direction:column;align-items:flex-end;'
  +   'gap:2px;font-size:10.5px;color:var(--dim2);'
  +   'flex:0 0 auto;'
  + '}'

  /* Просмотр заметки */
  + '.note-view{padding:20px 18px 30px}'
  + '.note-view-head{'
  +   'display:flex;gap:12px;align-items:flex-start;'
  +   'border-left:3px solid var(--acc);'
  +   'padding:4px 0 4px 14px;margin-bottom:20px;'
  + '}'
  + '.nvh-ico{'
  +   'width:42px;height:42px;border-radius:12px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 42px;'
  + '}'
  + '.note-view-head h2{'
  +   'font-size:17px;font-weight:600;margin-bottom:3px;'
  + '}'
  + '.nvh-sub{font-size:12px;color:var(--dim)}'
  + '.note-text{'
  +   'font-size:13.5px;line-height:1.75;'
  +   'color:var(--txt2);'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:12px;padding:18px 20px;'
  +   'white-space:normal;'
  + '}'
  + '.note-actions{'
  +   'display:flex;gap:10px;margin-top:20px;'
  + '}'
  + '.note-actions .btn{flex:1;justify-content:center;font-size:13px}'

  /* Аудиозаметка */
  + '.audio-view{padding:20px 18px 40px}'
  + '.audio-hero{text-align:center;padding:20px 0 24px}'
  + '.ah-ring{'
  +   'width:96px;height:96px;border-radius:50%;'
  +   'margin:0 auto 16px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(255,90,110,.2) 0%, '
  +   'rgba(255,90,110,.05) 60%, transparent 100%);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--danger);'
  +   'border:2px solid rgba(255,90,110,.35);'
  +   'animation:audioPulse 2.4s infinite;'
  + '}'
  + '@keyframes audioPulse{'
  +   '0%,100%{box-shadow:0 0 0 0 rgba(255,90,110,.4)}'
  +   '50%{box-shadow:0 0 0 20px rgba(255,90,110,0)}'
  + '}'
  + '.ah-label{'
  +   'font-size:11px;color:var(--danger);'
  +   'letter-spacing:3px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:6px;'
  + '}'
  + '.ah-sub{font-size:12.5px;color:var(--dim)}'

  + '.audio-player{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:16px;padding:20px;margin-bottom:20px;'
  + '}'
  + '.ap-bar{'
  +   'display:flex;align-items:center;gap:2px;'
  +   'height:40px;margin-bottom:12px;'
  +   'color:var(--acc);'
  + '}'
  + '.ap-bar i{'
  +   'flex:1;background:currentColor;'
  +   'border-radius:1px;opacity:.65;'
  + '}'
  + '.ap-times{'
  +   'display:flex;justify-content:space-between;'
  +   'font-size:11px;color:var(--dim);'
  +   'font-variant-numeric:tabular-nums;margin-bottom:16px;'
  + '}'
  + '.ap-controls{'
  +   'display:flex;justify-content:center;align-items:center;'
  +   'gap:24px;'
  + '}'
  + '.ap-btn{'
  +   'width:44px;height:44px;border-radius:50%;'
  +   'background:var(--panel3);border:1px solid var(--line2);'
  +   'color:var(--txt);cursor:pointer;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'transition:.15s;padding:0;font-family:inherit;'
  + '}'
  + '.ap-btn:hover{background:var(--panel4)}'
  + '.ap-btn:active{transform:scale(.9)}'
  + '.ap-btn.play{'
  +   'width:60px;height:60px;'
  +   'background:linear-gradient(140deg,var(--danger),#a8283d);'
  +   'border-color:transparent;'
  +   'box-shadow:0 8px 22px rgba(255,90,110,.35);'
  + '}'

  + '.audio-transcript{'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:14px;overflow:hidden;margin-bottom:18px;'
  + '}'
  + '.at-head{'
  +   'padding:12px 16px;background:var(--panel2);'
  +   'border-bottom:1px solid var(--line);'
  +   'font-size:11.5px;color:var(--acc);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  +   'font-weight:600;'
  +   'display:flex;align-items:center;gap:8px;'
  + '}'
  + '.at-body{padding:14px 16px}'
  + '.at-line{'
  +   'display:grid;grid-template-columns:56px 68px 1fr;'
  +   'gap:8px;padding:8px 0;'
  +   'border-bottom:1px solid rgba(42,52,68,.3);'
  +   'font-size:12.5px;line-height:1.5;'
  + '}'
  + '.at-line:last-child{border-bottom:none}'
  + '.at-line.critical{'
  +   'background:rgba(255,90,110,.06);'
  +   'border-left:2px solid var(--danger);'
  +   'padding-left:6px;margin-left:-8px;'
  + '}'
  + '.at-line.noise{'
  +   'color:var(--dim2);font-style:italic;'
  +   'grid-template-columns:56px 1fr;'
  + '}'
  + '.at-time{'
  +   'color:var(--acc);font-family:monospace;'
  +   'font-size:11px;opacity:.8;'
  + '}'
  + '.at-who{font-weight:600;font-size:11.5px}'
  + '.at-who.m{color:#7ab8ff}'
  + '.at-who.v{color:#ff7a9c}'
  + '.at-txt{color:var(--txt2)}'

  + '.audio-verdict{'
  +   'padding:16px 18px;'
  +   'background:linear-gradient(140deg,'
  +   'rgba(61,220,151,.08), rgba(61,220,151,.02));'
  +   'border:1px solid rgba(61,220,151,.3);'
  +   'border-radius:12px;'
  + '}'
  + '.av-label{'
  +   'font-size:10.5px;color:var(--ok);'
  +   'letter-spacing:2px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  + '}'
  + '.av-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.6;'
  + '}'

  /* ---------- БРАУЗЕР ---------- */
  + '.browser-view{padding:14px 12px 30px}'
  + '.browser-urlbar{'
  +   'display:flex;align-items:center;gap:10px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:24px;padding:10px 16px;'
  +   'margin-bottom:14px;'
  + '}'
  + '.browser-urlbar input{'
  +   'flex:1;background:none;border:none;'
  +   'color:var(--txt);font-size:12.5px;outline:none;'
  +   'font-family:inherit;'
  + '}'
  + '.bur-lock{color:var(--ok);display:flex}'
  + '.bur-refresh{color:var(--dim);display:flex}'
  + '.browser-hint{'
  +   'font-size:11px;color:var(--dim2);'
  +   'padding:0 4px 10px;'
  +   'display:flex;align-items:center;gap:5px;'
  + '}'

  + '.search-list{display:flex;flex-direction:column;gap:8px}'
  + '.search-row{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:14px;padding:14px 16px;'
  +   'cursor:pointer;transition:.14s;'
  +   'position:relative;overflow:hidden;'
  + '}'
  + '.search-row:hover{background:var(--panel3);border-color:var(--line2)}'
  + '.search-row.seen{opacity:.65}'
  + '.search-row.seen::after{'
  +   'content:"✓";position:absolute;'
  +   'top:14px;right:16px;'
  +   'color:var(--ok);font-size:13px;font-weight:700;'
  + '}'
  + '.sr-q{'
  +   'font-size:11.5px;color:var(--acc);'
  +   'display:flex;align-items:center;gap:6px;'
  +   'margin-bottom:8px;font-family:monospace;'
  + '}'
  + '.sr-title{'
  +   'font-size:13.5px;font-weight:600;'
  +   'color:var(--txt);margin-bottom:4px;'
  + '}'
  + '.sr-url{'
  +   'font-size:11px;color:var(--ok);'
  +   'margin-bottom:6px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.sr-snip{'
  +   'font-size:12px;color:var(--dim);line-height:1.5;'
  + '}'

  + '.browser-detail{padding:18px 16px 30px}'
  + '.bd-urlbar{'
  +   'display:flex;align-items:center;gap:8px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:20px;padding:8px 14px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'margin-bottom:18px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.bd-lock{color:var(--ok);display:flex}'
  + '.bd-title{'
  +   'font-size:18px;font-weight:600;'
  +   'line-height:1.35;margin-bottom:16px;'
  + '}'
  + '.bd-body{'
  +   'font-size:13px;line-height:1.75;'
  +   'color:var(--txt2);'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:12px;padding:18px 20px;'
  +   'margin-bottom:20px;'
  +   'font-family:"SF Mono",Monaco,Consolas,monospace;'
  +   'font-size:12.5px;'
  + '}'
  + '.bd-actions{display:flex;gap:10px}'
  + '.bd-actions .btn{flex:1;justify-content:center;font-size:13px}'

  /* ---------- ЗВОНКИ ---------- */
  + '.calls-view{padding:0}'
  + '.call-row{'
  +   'display:flex;gap:13px;padding:13px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.call-row:hover{background:var(--panel2)}'
  + '.call-row.unread{background:rgba(93,169,255,.04)}'
  + '.cr-avatar{'
  +   'width:44px;height:44px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:15px;font-weight:600;color:#fff;'
  +   'flex:0 0 44px;letter-spacing:.3px;'
  + '}'
  + '.cr-body{flex:1;min-width:0}'
  + '.cr-name{'
  +   'font-size:14px;font-weight:600;margin-bottom:3px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.cr-meta{'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:center;gap:5px;'
  + '}'
  + '.cr-ico{display:flex;align-items:center}'
  + '.cr-ico.miss{color:var(--danger)}'
  + '.cr-ico.in{color:var(--ok)}'
  + '.cr-ico.out{color:var(--acc)}'
  + '.cr-dur{opacity:.8}'
  + '.cr-more{color:var(--dim2);display:flex}'

  + '.call-detail{padding:30px 24px}'
  + '.cd-avatar{'
  +   'width:80px;height:80px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:26px;font-weight:600;color:#fff;'
  +   'margin:0 auto 16px;letter-spacing:.5px;'
  + '}'
  + '.cd-name{'
  +   'font-size:19px;font-weight:600;'
  +   'text-align:center;margin-bottom:4px;'
  + '}'
  + '.cd-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  +   'text-align:center;margin-bottom:14px;'
  + '}'
  + '.cd-type{'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'gap:6px;font-size:12.5px;font-weight:600;'
  +   'margin-bottom:24px;'
  + '}'
  + '.cd-rows{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:14px;overflow:hidden;margin-bottom:16px;'
  + '}'
  + '.cd-row{'
  +   'display:flex;justify-content:space-between;'
  +   'padding:12px 16px;'
  +   'border-bottom:1px solid var(--line);'
  +   'font-size:12.5px;'
  + '}'
  + '.cd-row:last-child{border-bottom:none}'
  + '.cd-row span{color:var(--dim)}'
  + '.cd-row b{font-weight:500}'
  + '.cd-note{'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:14px;padding:16px 18px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.cdn-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:10px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.cdn-text{'
  +   'font-size:13px;color:var(--txt2);line-height:1.7;'
  + '}'
  + '.cd-actions{display:flex;gap:10px}'
  + '.cd-actions .btn{flex:1;justify-content:center;font-size:13px}';

  document.head.appendChild(style);
})();

console.log(
  '%c[ЧАСТЬ 4 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nЗаметки: 15. Браузер: 12 запросов. Звонки: 20. Вставляй Часть 5 ниже.'
);

/* ... Часть 4 заканчивается здесь. Не закрывай script/body/html.
   Часть 5 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 5 из 10 — ДОСКА УЛИК + ХРОНОЛОГИЯ + ДОПРОСЫ
   ------------------------------------------------------------
   Полностью заменяет заглушки:
   - ROUTES.board
   - ROUTES.timeline
   Добавляет новые:
   - ROUTES.interrogation (допросы подозреваемых)
   ============================================================ */

/* ============================================================
   БЛОК 1 — БАЗА ДАННЫХ УЛИК
   ============================================================ */

const EVIDENCE_DB = {

  /* ---------- ЛЮДИ И АЛИБИ ---------- */
  chat_lena: {
    t: 'Переписка с Леной',
    d: 'Марина сообщила подруге, что нашла виновника гибели брата. '
     + 'Он будет на показе, в первом ряду. Просила открыть папку «Кирилл», если что-то случится.',
    src: 'Сообщения · Лена',
    cat: 'связь',
    key: true,
    relates: ['note_case', 'chat_kirill'],
    opens: []
  },

  chat_viktor: {
    t: 'Переписка с Виктором',
    d: 'Виктор Павлович требовал убрать вторую часть фильма. '
     + 'Угрожал не подписать диплом. В ночь исчезновения вызвал Марину '
     + 'в старое киноателье под предлогом «оригинала».',
    src: 'Сообщения · Виктор Павлович',
    cat: 'мотив',
    key: true,
    relates: ['note_meeting', 'call_viktor'],
    opens: ['interrogation_viktor']
  },

  chat_kirill: {
    t: 'Последний чат с Кириллом',
    d: 'Личная переписка Марины с погибшим братом. '
     + 'Последнее живое сообщение — 13 сентября 2019, 23:47. '
     + 'Через два с половиной часа Кирилл был мёртв.',
    src: 'Сообщения · Кирилл',
    cat: 'связь',
    key: false,
    relates: ['note_case', 'photo_crash'],
    opens: []
  },

  artem_alibi: {
    t: 'Алиби Артёма',
    d: 'Артём уехал к брату вечером 12 апреля и оставался там до утра. '
     + 'Ревновал, угрожал «найти», но физически отсутствовал в момент '
     + 'исчезновения.',
    src: 'Сообщения · Артём',
    cat: 'алиби',
    key: true,
    relates: ['call_viktor'],
    opens: []
  },

  dima_stalk: {
    t: 'Слежка бывшего',
    d: 'Дима Лапин следил за Мариной, видел её у киноателье с мужчиной. '
     + 'Агрессивен, нестабилен. Но о гибели Кирилла ничего не знал.',
    src: 'Сообщения · Дима',
    cat: 'мотив',
    key: false,
    relates: [],
    opens: []
  },

  sonya_timeline: {
    t: 'Показания Сони',
    d: 'Куртка Марины осталась дома — значит, она вышла ненадолго и собиралась вернуться. '
     + 'Телефон найден под диваном. Соня уехала к родителям 12 апреля.',
    src: 'Сообщения · Соня',
    cat: 'связь',
    key: false,
    relates: ['phone_before_call'],
    opens: []
  },

  anton_testimony: {
    t: 'Показания Антона',
    d: 'Антон видел, как Марина выходила через служебный вход кинотеатра '
     + 'с мужчиной в тёмном пальто. Они быстро сели в машину. '
     + 'Девушка была бледной.',
    src: 'Сообщения · Антон',
    cat: 'связь',
    key: true,
    relates: ['photo_figure', 'call_viktor'],
    opens: []
  },

  /* ---------- УГРОЗЫ ---------- */
  threat: {
    t: 'Угрозы от анонима',
    d: 'Неизвестный номер знал про Кирилла, требовал отказаться от показа. '
     + 'Писал «последнее предупреждение». Номер не привязан к карте.',
    src: 'Сообщения · Неизвестный',
    cat: 'угроза',
    key: true,
    relates: ['threat_voice', 'unknown_call'],
    opens: []
  },

  threat_voice: {
    t: 'Голосовое с угрозой',
    d: '«Откажись от показа. Иначе пожалеешь. Мы знаем, где ты живёшь». '
     + 'Голос изменён. Мужской, низкий.',
    src: 'Сообщения · Неизвестный',
    cat: 'угроза',
    key: true,
    relates: ['threat'],
    opens: []
  },

  /* ---------- ЗВОНКИ ---------- */
  call_viktor: {
    t: 'Последний звонок',
    d: '13 апреля, 23:47. Исходящий от Марины Виктору Павловичу. '
     + 'Продолжительность — 72 секунды. После этого телефон замолчал.',
    src: 'Звонки',
    cat: 'связь',
    key: true,
    relates: ['chat_viktor', 'note_meeting'],
    opens: ['interrogation_viktor']
  },

  unknown_call: {
    t: 'Пропущенный от анонима',
    d: '12 апреля, 23:44. Тот же номер, что писал угрозы. '
     + 'Перезвонить не удалось — «абонент недоступен».',
    src: 'Звонки',
    cat: 'угроза',
    key: false,
    relates: ['threat', 'threat_voice'],
    opens: []
  },

  /* ---------- ФОТО ---------- */
  photo_crash: {
    t: 'Фото с места аварии',
    d: 'Тёмный седан с вмятиной на правом крыле. Именно этот кадр '
     + 'Марина вставила в свой дипломный фильм.',
    src: 'Галерея · Кольцевая 2019',
    cat: 'документ',
    key: true,
    relates: ['photo_reg', 'photo_car', 'doc_gibdd'],
    opens: []
  },

  photo_reg: {
    t: 'Кадр с регистратора',
    d: 'Момент удара. Читаются последние цифры номера: 7-4-2. '
     + 'Время: 02:14. Машина — тёмный седан.',
    src: 'Галерея · Видеорегистратор',
    cat: 'документ',
    key: true,
    relates: ['photo_crash', 'photo_car', 'search_bmw'],
    opens: []
  },

  photo_car: {
    t: 'Чёрный седан у академии',
    d: 'Тёмный седан с вмятиной на правом крыле был припаркован у академии '
     + '11 апреля. Номер читается частично: ••7 •• 74 2.',
    src: 'Галерея · Чёрный седан',
    cat: 'документ',
    key: true,
    relates: ['photo_reg', 'photo_crash'],
    opens: []
  },

  photo_key: {
    t: 'Ключ от павильона',
    d: 'Фото ключа с биркой «Павильон №3», сделанное в фойе киноателье '
     + '«Сокол» 13 апреля в 23:02. На часах в кадре — 22:51.',
    src: 'Галерея · Ключ от павильона',
    cat: 'связь',
    key: false,
    relates: ['studio_booking', 'note_key'],
    opens: []
  },

  photo_figure: {
    t: 'Фигура у ателье',
    d: 'Мужчина выходит из здания киноателье в 00:47. '
     + 'Походка уверенная, в руке — длинный предмет, похожий на штатив.',
    src: 'Галерея · Кто-то у входа',
    cat: 'связь',
    key: true,
    relates: ['anton_testimony', 'photo_last'],
    opens: []
  },

  photo_blood: {
    t: 'Пятно в павильоне',
    d: 'Следы на полу павильона №3, частично затёртые. '
     + 'Снято утром 14 апреля в 08:12 — уже после исчезновения.',
    src: 'Галерея · Пятно в павильоне',
    cat: 'мотив',
    key: true,
    relates: ['photo_door', 'note_audio'],
    opens: []
  },

  photo_last: {
    t: 'Последний кадр',
    d: '23:52. В отражении зеркала за спиной Марины — фигура в дверном проёме. '
     + 'Автоспуск.',
    src: 'Галерея · Последний кадр',
    cat: 'связь',
    key: true,
    relates: ['photo_figure', 'note_audio'],
    opens: []
  },

  photo_door: {
    t: 'Закрытая дверь',
    d: 'Дверь подсобного помещения павильона №3 закрыта снаружи на навесной замок. '
     + 'Снято 14 апреля в 08:14.',
    src: 'Галерея · Закрытая дверь',
    cat: 'мотив',
    key: false,
    relates: ['photo_blood'],
    opens: []
  },

  doc_gibdd: {
    t: 'Справка ГИБДД',
    d: 'Дело №4471/2019 закрыто за отсутствием доказательств. '
     + 'Виновник не установлен. Подпись инспектора неразборчива.',
    src: 'Галерея · Справка ГИБДД',
    cat: 'документ',
    key: false,
    relates: ['search_case', 'photo_crash'],
    opens: []
  },

  plan_room: {
    t: 'Схема павильона',
    d: 'Рукописная схема павильона №3: отмечены выходы, окна и одна дверь, '
     + 'зачёркнутая крест-накрест. Подпись: «Здесь нет выхода».',
    src: 'Галерея · Схема павильона',
    cat: 'связь',
    key: false,
    relates: ['photo_door'],
    opens: []
  },

  phone_before_call: {
    t: 'Экран перед звонком',
    d: 'Скриншот в 23:46. Открыт диалог с Виктором Павловичем. '
     + 'Курсор на кнопке вызова.',
    src: 'Галерея · Экран телефона',
    cat: 'связь',
    key: true,
    relates: ['call_viktor', 'chat_viktor'],
    opens: []
  },

  old_letter: {
    t: 'Старое письмо',
    d: 'Письмо с аккуратным почерком: «Я не могу так больше. Прости». '
     + 'Дата — 10 сентября 2019. Отправитель не указан.',
    src: 'Галерея · Старое письмо',
    cat: 'документ',
    key: false,
    relates: [],
    opens: []
  },

  cigarette_butt: {
    t: 'Окурок у входа',
    d: 'Импортные сигареты. Кто-то курил у служебного входа '
     + 'в ночь исчезновения.',
    src: 'Галерея · Окурок',
    cat: 'связь',
    key: false,
    relates: [],
    opens: []
  },

  diary_page: {
    t: 'Страница дневника',
    d: 'Запись Марины от 9 апреля: «Он смотрит. Я знаю, что он смотрит. '
     + 'Но я не могу остановиться».',
    src: 'Галерея · Дневник',
    cat: 'связь',
    key: false,
    relates: ['note_threats'],
    opens: []
  },

  /* ---------- ЗАМЕТКИ ---------- */
  note_case: {
    t: 'Заметка о деле',
    d: 'Марина вела собственное расследование гибели брата с 2019 года. '
     + 'Дело закрыто 15 ноября 2019. Подпись инспектора нечитаемая.',
    src: 'Заметки · Дело №4471/2019',
    cat: 'документ',
    key: false,
    relates: ['chat_lena', 'doc_gibdd'],
    opens: []
  },

  note_suspects: {
    t: 'Список подозреваемых',
    d: 'Пять версий: Артём, Дима, Виктор Павлович, Крылов, Неизвестный. '
     + 'Марина выделила вопрос: «Почему Виктор боится плёнки?»',
    src: 'Заметки · Список подозреваемых',
    cat: 'мотив',
    key: true,
    relates: ['chat_viktor', 'note_viktor_profile'],
    opens: []
  },

  note_plan: {
    t: 'План показа',
    d: 'Марина не собиралась называть имя вслух — хотела дать зрителям увидеть запись. '
     + 'Если что — папка «Кирилл», пароль 14092019.',
    src: 'Заметки · План показа',
    cat: 'связь',
    key: false,
    relates: ['chat_lena'],
    opens: []
  },

  note_meeting: {
    t: 'Заметка о встрече',
    d: 'Виктор вызвал её в ателье, сказав, что там «оригинал». '
     + 'Вел. никому не говорить. Марина поехала.',
    src: 'Заметки · Встреча в ателье',
    cat: 'мотив',
    key: true,
    relates: ['chat_viktor', 'call_viktor'],
    opens: []
  },

  note_arrival: {
    t: 'Наблюдение у ателье',
    d: 'Администратор сказала: «господин уже внутри». В павильоне №3 горел свет. '
     + 'Дверь приоткрыта.',
    src: 'Заметки · Наблюдение у ателье',
    cat: 'связь',
    key: false,
    relates: ['photo_key', 'photo_last'],
    opens: []
  },

  note_audio: {
    t: '🎧 АУДИОЗАПИСЬ ПРИЗНАНИЯ',
    d: 'Голос Виктора Павловича: «Ты не понимаешь, Марина. Я не хотел. '
     + 'Тогда, на трассе. Я не видел его. Он выскочил». '
     + 'Затем шум, удар, тишина.',
    src: 'Заметки · Аудиозапись',
    cat: 'мотив',
    key: true,
    relates: ['chat_viktor', 'note_meeting', 'photo_blood'],
    opens: ['interrogation_viktor', 'finale']
  },

  note_viktor_profile: {
    t: 'Профиль Виктора',
    d: 'Пять лет назад попал в аварию. Бледнеет при упоминании Кольцевой. '
     + 'В кабинете есть фото с разбитой машиной.',
    src: 'Заметки · О Викторе Павловиче',
    cat: 'мотив',
    key: true,
    relates: ['note_suspects', 'chat_viktor'],
    opens: ['interrogation_viktor']
  },

  note_car: {
    t: 'Параметры машины',
    d: 'Тёмный немецкий седан. Вмятина на правом крыле. '
     + 'Номер: ••7 •• 74 2.',
    src: 'Заметки · Машина',
    cat: 'документ',
    key: false,
    relates: ['photo_reg', 'photo_car'],
    opens: []
  },

  note_reg: {
    t: 'О регистраторе',
    d: 'Запись передали анонимно 15 марта через камеру хранения. '
     + 'В письме — только пароль.',
    src: 'Заметки · Видеорегистратор',
    cat: 'связь',
    key: false,
    relates: ['photo_reg'],
    opens: []
  },

  note_threats: {
    t: 'Хроника угроз',
    d: '7 апреля — первый контакт. 10 апреля — «последнее предупреждение». '
     + '12 апреля — голосовое. Кто-то очень не хочет показа.',
    src: 'Заметки · Угрозы',
    cat: 'угроза',
    key: false,
    relates: ['threat', 'threat_voice'],
    opens: []
  },

  note_people: {
    t: 'Окружение',
    d: 'Лена — единственная, кому Марина верила. Соня — не в теме. '
     + 'Антон — честный свидетель. Виктор Павлович — ключ.',
    src: 'Заметки · Люди вокруг',
    cat: 'связь',
    key: false,
    relates: ['chat_lena', 'anton_testimony'],
    opens: []
  },

  note_kirill_dream: {
    t: 'Сны о Кирилле',
    d: 'Марине снится брат на мокрой дороге. Просыпается в 4 утра. '
     + 'Считает себя виновной в его смерти.',
    src: 'Заметки · Сны',
    cat: 'связь',
    key: false,
    relates: ['chat_kirill'],
    opens: []
  },

  note_plan_b: {
    t: 'План Б',
    d: 'Копия записи на флешке в книге «Мастер и Маргарита». '
     + 'Лена знает пароль. Если что-то случится — открыть папку «Кирилл».',
    src: 'Заметки · План Б',
    cat: 'связь',
    key: true,
    relates: ['chat_lena', 'note_plan'],
    opens: []
  },

  note_krylov_offer: {
    t: 'Предложение Крылова',
    d: '12 миллионов рублей за отказ от второй части фильма. '
     + 'Крылов лично позвонил Марине 8 апреля.',
    src: 'Заметки · Что сказал Крылов',
    cat: 'мотив',
    key: true,
    relates: ['search_krylov'],
    opens: ['interrogation_krylov']
  },

  note_key: {
    t: 'Бронь павильона',
    d: 'Павильон №3 забронирован на 13 апреля, 23:00–01:00. '
     + 'Ключ у администратора. Из офиса Крылова интересовались, будет ли Марина одна.',
    src: 'Заметки · Ключ',
    cat: 'связь',
    key: false,
    relates: ['studio_booking', 'photo_key'],
    opens: []
  },

  /* ---------- БРАУЗЕР ---------- */
  search_case: {
    t: 'Архив ГИБДД',
    d: 'Постановление №4471/2019. Дело приостановлено. '
     + 'Подпись инспектора нечитаемая.',
    src: 'Браузер · Архив',
    cat: 'документ',
    key: false,
    relates: ['doc_gibdd'],
    opens: []
  },

  search_car: {
    t: 'Форум о машине',
    d: 'Тема про седан с вмятиной и номером на 742 удалена модератором через 2 дня. '
     + 'Причина: «владелец отозвал объявление».',
    src: 'Браузер · Форум',
    cat: 'документ',
    key: true,
    relates: ['photo_reg', 'photo_car', 'search_bmw'],
    opens: []
  },

  search_studio: {
    t: 'Киноателье «Сокол»',
    d: 'Здание принадлежит ООО «Крылов и партнёры». '
     + 'Павильон №3 — самый большой, есть балкон и подземный архив.',
    src: 'Браузер · Сайт студии',
    cat: 'связь',
    key: true,
    relates: ['search_krylov', 'studio_booking'],
    opens: []
  },

  search_krylov: {
    t: 'Связь Крылова и кафедры',
    d: 'Крылов финансирует кафедру, которой руководит Виктор Павлович. '
     + 'Партнёры более 7 лет. 45 млн. ₽ за 3 года.',
    src: 'Браузер · Новости',
    cat: 'связь',
    key: true,
    relates: ['chat_viktor', 'note_krylov_offer'],
    opens: ['interrogation_krylov']
  },

  search_deleted: {
    t: 'Удалённые материалы',
    d: 'Запрос про Соколовского и ДТП — ничего не найдено. '
     + '«Некоторые материалы удалены по запросу правообладателя».',
    src: 'Браузер · Поиск',
    cat: 'угроза',
    key: false,
    relates: ['search_cleanup'],
    opens: []
  },

  search_kirill: {
    t: 'О Кирилле',
    d: 'Список студентов 2019 года. Кирилл Соколов отчислен посмертно. '
     + 'Антон Ветров — его друг.',
    src: 'Браузер · Академия',
    cat: 'связь',
    key: false,
    relates: ['chat_kirill', 'anton_testimony'],
    opens: []
  },

  search_bmw: {
    t: 'BMW 7 серии',
    d: 'Чёрный BMW 7 series 2018 г.в. с вмятиной на правом крыле. '
     + 'Продано 20 ноября 2019. Продавец скрыт.',
    src: 'Браузер · Архив объявлений',
    cat: 'документ',
    key: true,
    relates: ['photo_reg', 'photo_car', 'search_car'],
    opens: []
  },

  search_cameras: {
    t: 'Камеры на 47 км',
    d: 'Из двух камер на 47-м км Кольцевой одна не работала '
     + 'с 10 по 15 сентября 2019 — «плановый ремонт».',
    src: 'Браузер · Карта камер',
    cat: 'документ',
    key: true,
    relates: ['doc_gibdd', 'photo_reg'],
    opens: []
  },

  search_cleanup: {
    t: 'Услуги чистки',
    d: 'Марина искала способы удаления информации из интернета. '
     + 'Услуга стоит от 50 000 ₽.',
    src: 'Браузер · Юрист',
    cat: 'угроза',
    key: false,
    relates: ['search_deleted'],
    opens: []
  },

  search_olga: {
    t: 'Профиль Ольги',
    d: 'Ольга Соколовская — жена Виктора. Работает в благотворительном фонде.',
    src: 'Браузер · Соцсеть',
    cat: 'связь',
    key: false,
    relates: ['chat_viktor'],
    opens: []
  },

  /* ---------- ПРОЧЕЕ ---------- */
  studio_booking: {
    t: 'Бронь павильона',
    d: 'Из офиса Крылова интересовались, будет ли Марина одна. '
     + 'Служебное сообщение от ателье.',
    src: 'Сообщения · Сокол',
    cat: 'связь',
    key: true,
    relates: ['note_krylov_offer', 'search_studio'],
    opens: ['interrogation_krylov']
  }

};

/* ------------------------------------------------------------
   СЛОВАРЬ НАЗВАНИЙ УЛИК
   ------------------------------------------------------------ */
(function extendTitlesPart5(){
  if(typeof EVIDENCE_TITLES === 'undefined') return;
  for(const k in EVIDENCE_DB){
    EVIDENCE_TITLES[k] = EVIDENCE_DB[k].t;
  }
})();

/* ------------------------------------------------------------
   ЗАГОЛОВКИ КАТЕГОРИЙ
   ------------------------------------------------------------ */
const EVIDENCE_CATS = {
  'all':      {label: 'Все',           ico: 'grid'},
  'мотив':    {label: 'Мотив',         ico: 'target'},
  'алиби':    {label: 'Алиби',         ico: 'shield'},
  'угроза':   {label: 'Угрозы',        ico: 'alert'},
  'связь':    {label: 'Связи',         ico: 'link'},
  'документ': {label: 'Документы',     ico: 'fileText'}
};

/* ------------------------------------------------------------
   СОСТОЯНИЕ ДОСКИ
   ------------------------------------------------------------ */
G.boardFilter = 'all';
G.boardSelected = null;

/* ============================================================
   БЛОК 2 — РЕНДЕР ДОСКИ УЛИК
   ============================================================ */

ROUTES.board = function(){
  G.screen = 'board';

  const allIds = Object.keys(EVIDENCE_DB);
  const collected = G.evidence.filter(function(id){
    return EVIDENCE_DB[id];
  });

  const keyCount = collected.filter(function(id){
    return EVIDENCE_DB[id].key;
  }).length;

  const progress = allIds.length
    ? Math.round(collected.length / allIds.length * 100)
    : 0;

  const filtered = collected.filter(function(id){
    if(G.boardFilter === 'all') return true;
    return EVIDENCE_DB[id].cat === G.boardFilter;
  });

  filtered.sort(function(a, b){
    const ak = EVIDENCE_DB[a].key ? 0 : 1;
    const bk = EVIDENCE_DB[b].key ? 0 : 1;
    if(ak !== bk) return ak - bk;
    return a.localeCompare(b);
  });

  const chips = Object.keys(EVIDENCE_CATS).map(function(k){
    const c = EVIDENCE_CATS[k];
    const active = G.boardFilter === k ? ' active' : '';
    const count = k === 'all'
      ? collected.length
      : collected.filter(function(id){
          return EVIDENCE_DB[id].cat === k;
        }).length;
    return '<button class="bf-chip' + active + '" '
      + 'onclick="setBoardFilter(\'' + k + '\')">'
      + svg(c.ico, 12)
      + '<span>' + c.label + '</span>'
      + (count ? '<b>' + count + '</b>' : '')
      + '</button>';
  }).join('');

  const rows = filtered.length
    ? filtered.map(function(id){ return renderEvidenceCard(id); }).join('')
    : renderEmptyBoard();

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Доска улик</h2>'
  +     '<div class="sub">'
  +       collected.length + ' из ' + allIds.length + ' · '
  +       keyCount + ' ключевых'
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="boardHelp()">' + svg('help', 18) + '</button>'
  + '</div>'

  + '<div class="board-progress">'
  +   '<div class="bp-label">'
  +     '<span>Прогресс расследования</span>'
  +     '<b>' + progress + '%</b>'
  +   '</div>'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="board-filter">' + chips + '</div>'

  + '<div class="board-list">' + rows + '</div>');
};

function setBoardFilter(cat){
  G.boardFilter = cat;
  haptic(8);
  ROUTES.board();
}

function boardHelp(){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Доска улик</h2><div class="sub">Справка</div></div>'
  + '</div>'
  + '<div style="padding:24px 20px">'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('clue', 22) + '</div>'
  +     '<h3>Что это</h3>'
  +     '<p>Все улики, которые вы собрали, автоматически попадают на доску. '
  +       'Улики со значком звезды — ключевые: они прямо указывают на виновного.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('link', 22) + '</div>'
  +     '<h3>Связи</h3>'
  +     '<p>Каждая улика связана с другими. Нажмите на карточку, чтобы увидеть, '
  +       'какие доказательства её подтверждают.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('target', 22) + '</div>'
  +     '<h3>Категории</h3>'
  +     '<p>Улики делятся на мотивы, алиби, угрозы, связи и документы. '
  +       'Для обвинения вам нужны как минимум 3 ключевые улики разных категорий.</p>'
  +   '</div>'
  +   '<button class="btn ghost" style="width:100%;justify-content:center;margin-top:14px" '
  +     'onclick="goBack()">Понятно</button>'
  + '</div>');
}

/* ------------------------------------------------------------
   ПУСТАЯ ДОСКА
   ------------------------------------------------------------ */
function renderEmptyBoard(){
  return ''
  + '<div class="board-empty">'
  +   '<div class="be-ico">' + svg('folderOpen', 44) + '</div>'
  +   '<h3>В этой категории пока пусто</h3>'
  +   '<p>Продолжайте исследовать телефон: переписки, галерею, '
  +     'заметки, звонки и браузер.</p>'
  + '</div>';
}

/* ------------------------------------------------------------
   КАРТОЧКА УЛИКИ
   ------------------------------------------------------------ */
function renderEvidenceCard(id){
  const e = EVIDENCE_DB[id];
  if(!e) return '';

  const cat = EVIDENCE_CATS[e.cat] || {label: e.cat, ico: 'clue'};
  const isKey = e.key;

  return ''
  + '<div class="ev-card' + (isKey ? ' key' : '') + '" '
  +   'onclick="openEvidence(\'' + id + '\')">'
  +   '<div class="ec-top">'
  +     '<div class="ec-cat">'
  +       svg(cat.ico, 11)
  +       '<span>' + cat.label + '</span>'
  +     '</div>'
  +     (isKey
  +       ? '<div class="ec-key">' + svg('starFill', 13, 'fill') + '</div>'
  +       : '')
  +   '</div>'
  +   '<h4 class="ec-title">' + escapeHtml(e.t) + '</h4>'
  +   '<p class="ec-desc">' + escapeHtml(e.d) + '</p>'
  +   '<div class="ec-src">' + escapeHtml(e.src) + '</div>'
  + '</div>';
}

/* ------------------------------------------------------------
   ПРОСМОТР УЛИКИ
   ------------------------------------------------------------ */
function openEvidence(id){
  const e = EVIDENCE_DB[id];
  if(!e) return;

  const cat = EVIDENCE_CATS[e.cat] || {label: e.cat, ico: 'clue'};
  const isKey = e.key;
  const related = (e.relates || []).filter(function(r){
    return EVIDENCE_DB[r] && hasEv(r);
  });

  const relatedHtml = related.length
    ? '<div class="ev-related-list">'
      + related.map(function(r){
          const re = EVIDENCE_DB[r];
          return '<div class="ev-related" onclick="openEvidence(\'' + r + '\')">'
            + svg('link', 12)
            + '<span>' + escapeHtml(re.t) + '</span>'
            + svg('chev', 12)
            + '</div>';
        }).join('')
      + '</div>'
    : '<div class="ev-related-empty">Пока нет связанных улик в деле</div>';

  const opensHtml = (e.opens && e.opens.length)
    ? '<div class="ev-opens">'
      + '<div class="eo-label">' + svg('unlock', 12) + ' Открывает доступ</div>'
      + e.opens.map(function(o){
          return '<div class="eo-item">' + escapeHtml(o) + '</div>';
        }).join('')
      + '</div>'
    : '';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Улика</h2></div>'
  +   '<button class="back" onclick="toast(\'Закреплено\',\'Улика отмечена\',\'ok\')">'
  +     svg('bookmark', 18)
  +   '</button>'
  + '</div>'

  + '<div class="ev-view">'

  +   '<div class="ev-head' + (isKey ? ' key' : '') + '">'
  +     '<div class="eh-cat">'
  +       svg(cat.ico, 12)
  +       '<span>' + cat.label + '</span>'
  +     '</div>'
  +     (isKey
  +       ? '<div class="eh-key">' + svg('starFill', 14, 'fill') + ' Ключевая</div>'
  +       : '')
  +   '</div>'

  +   '<h2 class="ev-title">' + escapeHtml(e.t) + '</h2>'
  +   '<div class="ev-src">'
  +     svg('pin', 12)
  +     '<span>' + escapeHtml(e.src) + '</span>'
  +   '</div>'

  +   '<div class="ev-text">' + escapeHtml(e.d) + '</div>'

  +   opensHtml

  +   '<div class="ev-block">'
  +     '<div class="ev-block-label">'
  +       svg('link', 12) + ' Связанные улики'
  +     '</div>'
  +     relatedHtml
  +   '</div>'

  +   '<div class="ev-actions">'
  +     '<button class="btn ghost" onclick="toast(\'Заметка\',\'Добавлено в дело\',\'ok\')">'
  +       svg('edit', 16) + ' В дело'
  +     '</button>'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(640, 0.03);
}

/* ============================================================
   БЛОК 3 — ХРОНОЛОГИЯ
   ============================================================ */

const TIMELINE = [

  {
    date: '14 сентября 2019',
    time: '02:14',
    t: 'Гибель Кирилла Соколова',
    x: 'Кольцевая трасса, 47-й км. Тёмный седан сбил мотоциклиста и скрылся. '
     + 'Кирилл погиб на месте.',
    tag: 'авария',
    critical: true,
    ev: 'photo_crash',
    note: 'Начало всего. Если бы этого не было — не было бы ни фильма, ни исчезновения.'
  },
  {
    date: '14 сентября 2019',
    time: '02:14',
    t: 'Запись с регистратора',
    x: 'Момент удара. Номер не читается полностью. Видны последние цифры: 742.',
    tag: 'улика',
    ev: 'photo_reg',
    note: 'Единственный кадр, который вообще сохранился.'
  },
  {
    date: '15 ноября 2019',
    time: '—',
    t: 'Дело закрыто',
    x: 'Постановление №4471/2019. Виновник не установлен. '
     + 'Подпись инспектора нечитаемая.',
    tag: 'документ',
    ev: 'doc_gibdd',
    note: 'Кто-то очень постарался, чтобы дело закрылось.'
  },
  {
    date: '15 марта 2024',
    time: '—',
    t: 'Запись передана Марине',
    x: 'Анонимно, через камеру хранения на вокзале. '
     + 'В письме — только пароль.',
    tag: 'запись',
    ev: 'note_reg',
    note: 'Кто-то четыре года хранил запись и решил отдать именно сейчас. Почему?'
  },
  {
    date: '28 марта',
    time: '09:14',
    t: 'Принятие диплома',
    x: 'Виктор Павлович принимает диплом Марины. '
     + 'Интересуется второй частью.',
    tag: 'академия',
    ev: 'chat_viktor',
    note: 'Он уже знал, что там будет.'
  },
  {
    date: '5 апреля',
    time: '16:00',
    t: 'Разговор в кабинете',
    x: 'Виктор вызывает Марину. Просит убрать сцену с номером машины.',
    tag: 'академия',
    ev: 'chat_viktor',
    note: 'Первый раз, когда он открыто попросил убрать материал.'
  },
  {
    date: '7 апреля',
    time: '21:02',
    t: 'Первое сообщение с угрозами',
    x: 'Неизвестный номер знает про Кирилла. Требует оставить прошлое.',
    tag: 'угроза',
    critical: true,
    ev: 'threat',
    note: 'Появился третий игрок.'
  },
  {
    date: '8 апреля',
    time: '15:00',
    t: 'Предложение Крылова',
    x: '12 миллионов рублей за отказ от второй части фильма.',
    tag: 'продюсер',
    ev: 'note_krylov_offer',
    note: 'Крылов боится не меньше Виктора.'
  },
  {
    date: '9 апреля',
    time: '17:43',
    t: 'Требование убрать вторую часть',
    x: 'Виктор: «Я не подпишу диплом с этим материалом».',
    tag: 'академия',
    ev: 'chat_viktor',
    note: 'Он не просто просил. Он запрещал.'
  },
  {
    date: '10 апреля',
    time: '22:15',
    t: '«Последнее предупреждение»',
    x: 'Аноним угрожает. Марина отказывается.',
    tag: 'угроза',
    ev: 'threat',
    note: 'Точка невозврата.'
  },
  {
    date: '11 апреля',
    time: '15:40',
    t: 'Седан у академии',
    x: 'Марина скрытно фотографирует тёмный седан с вмятиной.',
    tag: 'улика',
    critical: true,
    ev: 'photo_car',
    note: 'Она нашла машину. Значит, она знала, где искать.'
  },
  {
    date: '11 апреля',
    time: '16:12',
    t: 'Офис Крылова интересуется бронью',
    x: 'Киноателье сообщает: спрашивали, будет ли Марина одна.',
    tag: 'связь',
    ev: 'studio_booking',
    note: 'Крылов знал про павильон ещё до 11 апреля.'
  },
  {
    date: '12 апреля',
    time: '18:41',
    t: '«Я нашла его»',
    x: 'Марина пишет Лене: «Я нашла того, кто сбил Кирилла».',
    tag: 'связь',
    critical: true,
    ev: 'chat_lena',
    note: 'Последний раз, когда она была спокойна.'
  },
  {
    date: '12 апреля',
    time: '20:52',
    t: 'Артём видел Марину у ателье',
    x: 'Она соврала, что была у Лены. Артём уехал к брату.',
    tag: 'связь',
    ev: 'artem_alibi',
    note: 'Артём физически отсутствовал в момент исчезновения.'
  },
  {
    date: '12 апреля',
    time: '23:44',
    t: 'Голосовое с угрозой',
    x: '«Откажись от показа. Иначе пожалеешь. Мы знаем, где ты живёшь».',
    tag: 'угроза',
    ev: 'threat_voice',
    note: 'Голос изменён. Но не слишком хорошо.'
  },
  {
    date: '13 апреля',
    time: '21:58',
    t: 'Начало показа',
    x: 'Кинотеатр «Родина». Зал 2. В первом ряду — мужчина в тёмном пальто.',
    tag: 'показ',
    ev: 'photo_hall',
    note: 'Он пришёл. Она знала, что он придёт.'
  },
  {
    date: '13 апреля',
    time: '22:31',
    t: 'Разговор с Леной',
    x: 'После показа. 3 минуты 40 секунд. Марина взволнована.',
    tag: 'звонок',
    ev: 'chat_lena',
    note: 'Лена — единственный человек, кто был с ней рядом до последнего.'
  },
  {
    date: '13 апреля',
    time: '22:52',
    t: 'Фото зеркала',
    x: 'Пустой тёмный коридор за спиной. Пока пустой.',
    tag: 'улика',
    ev: 'photo_last',
    note: 'Она снимала павильон. Зачем?'
  },
  {
    date: '13 апреля',
    time: '23:02',
    t: 'Ключ получен',
    x: 'Администратор отдаёт ключ от павильона №3. '
     + '«Господин уже внутри».',
    tag: 'ателье',
    ev: 'photo_key',
    note: 'Кто был «господин»?'
  },
  {
    date: '13 апреля',
    time: '23:10',
    t: 'Виктор пишет: «нам нужно поговорить»',
    x: 'Зовёт в старое ателье. Наедине. Никому не говорить.',
    tag: 'ателье',
    critical: true,
    ev: 'chat_viktor',
    note: 'Это и был его план.'
  },
  {
    date: '13 апреля',
    time: '23:16',
    t: '«Там хранится оригинал»',
    x: 'Марина соглашается. «Я выезжаю».',
    tag: 'ателье',
    ev: 'chat_viktor',
    note: 'Она не знала, что оригинал ей уже не понадобится.'
  },
  {
    date: '13 апреля',
    time: '23:46',
    t: 'Скриншот экрана',
    x: 'Курсор на кнопке вызова. Марина собиралась звонить.',
    tag: 'телефон',
    ev: 'phone_before_call',
    note: 'Последнее действие перед тем, как всё закончилось.'
  },
  {
    date: '13 апреля',
    time: '23:47',
    t: 'Последний звонок',
    x: 'Исходящий Виктору. 72 секунды.',
    tag: 'звонок',
    critical: true,
    ev: 'call_viktor',
    note: 'Что он сказал ей за эти 72 секунды?'
  },
  {
    date: '13 апреля',
    time: '23:52',
    t: 'Фигура в отражении',
    x: 'В зеркале — силуэт в дверном проёме. Автоспуск.',
    tag: 'улика',
    critical: true,
    ev: 'photo_last',
    note: 'Она уже не одна.'
  },
  {
    date: '14 апреля',
    time: '00:41',
    t: 'Аудиозапись признания',
    x: 'Виктор: «Ты не понимаешь, Марина. Я не хотел. Тогда, на трассе». '
     + 'Затем шум. Удар. Тишина.',
    tag: 'аудио',
    critical: true,
    ev: 'note_audio',
    note: 'Ключ ко всему делу.'
  },
  {
    date: '14 апреля',
    time: '00:47',
    t: 'Фигура у выхода',
    x: 'Мужчина выходит из ателье. В руке — длинный предмет.',
    tag: 'улика',
    ev: 'photo_figure',
    note: 'Он вышел один. Значит, она не вышла.'
  },
  {
    date: '14 апреля',
    time: '08:12',
    t: 'Пятно затёрто',
    x: 'Кто-то вернулся утром в павильон и попытался оттереть пол.',
    tag: 'улика',
    critical: true,
    ev: 'photo_blood',
    note: 'Он думал, что успеет всё убрать.'
  },
  {
    date: '14 апреля',
    time: '08:14',
    t: 'Дверь закрыта снаружи',
    x: 'Подсобное помещение павильона №3 заперто на замок.',
    tag: 'улика',
    ev: 'photo_door',
    note: 'Она где-то внутри.'
  },
  {
    date: '14 апреля',
    time: '19:20',
    t: 'Соня возвращается',
    x: 'Марины нет. Куртка дома. Телефон под диваном.',
    tag: 'связь',
    ev: 'sonya_timeline',
    note: 'Она вышла без куртки. Значит, собиралась вернуться.'
  },
  {
    date: '14 апреля',
    time: '23:58',
    t: 'Заявление в полицию',
    x: 'Лена подаёт заявление. Процесс начинается.',
    tag: 'финал',
    note: 'Теперь всё зависит от собранных улик.'
  }

];

/* ------------------------------------------------------------
   РЕНДЕР ХРОНОЛОГИИ
   ------------------------------------------------------------ */
ROUTES.timeline = function(){
  G.screen = 'timeline';

  const items = TIMELINE.map(function(it, i){
    return renderTimelineItem(it, i);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Хронология</h2>'
  +     '<div class="sub">' + TIMELINE.length + ' событий</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Фильтр\',\'Показать только ключевые\',\'warn\')">'
  +     svg('flag', 18)
  +   '</button>'
  + '</div>'

  + '<div class="tl-head">'
  +   '<div class="tl-head-line"></div>'
  +   '<div class="tl-head-label">'
  +     svg('clock', 13)
  +     '<span>От аварии 2019 года до исчезновения</span>'
  +   '</div>'
  + '</div>'

  + '<div class="tl-list">' + items + '</div>'

  + '<div class="tl-end">'
  +   '<div class="tle-marker"></div>'
  +   '<div class="tle-text">Дело №2024-0414 открыто</div>'
  + '</div>');
};

function renderTimelineItem(it, i){
  const critical = it.critical ? ' critical' : '';
  const hasEv = it.ev && hasEv(it.ev);

  return ''
  + '<div class="tl-item' + critical + '" '
  +   'onclick="openTimelineItem(' + i + ')">'
  +   '<div class="tl-marker">'
  +     '<div class="tl-dot"></div>'
  +     '<div class="tl-line"></div>'
  +   '</div>'
  +   '<div class="tl-body">'
  +     '<div class="tl-when">'
  +       '<span class="tl-date">' + escapeHtml(it.date) + '</span>'
  +       (it.time !== '—'
  +         ? '<span class="tl-time">' + escapeHtml(it.time) + '</span>'
  +         : '')
  +     '</div>'
  +     '<div class="tl-title">'
  +       escapeHtml(it.t)
  +       (hasEv
  +         ? '<span class="tl-ev">' + svg('clue', 11) + '</span>'
  +         : '')
  +     '</div>'
  +     '<div class="tl-desc">' + escapeHtml(it.x) + '</div>'
  +   '</div>'
  + '</div>';
}

function openTimelineItem(i){
  const it = TIMELINE[i];
  if(!it) return;

  const hasEvid = it.ev && hasEv(it.ev);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(it.t) + '</h2>'
  +     '<div class="sub">' + escapeHtml(it.date)
  +       + (it.time !== '—' ? ' · ' + escapeHtml(it.time) : '')
  +     '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="tl-detail">'

  +   '<div class="tld-tag">'
  +     svg('tag', 12)
  +     '<span>' + escapeHtml(it.tag) + '</span>'
  +   '</div>'

  +   '<h2 class="tld-title">' + escapeHtml(it.t) + '</h2>'

  +   '<div class="tld-text">' + escapeHtml(it.x) + '</div>'

  +   '<div class="tld-note">'
  +     '<div class="tldn-label">'
  +       svg('fileText', 12) + ' Заметка следователя'
  +     '</div>'
  +     '<div class="tldn-text">' + escapeHtml(it.note || '') + '</div>'
  +   '</div>'

  +   (it.ev && hasEv(it.ev)
  +     ? '<div class="tld-ev" onclick="openEvidence(\'' + it.ev + '\')">'
  +       '<div class="tlde-ico">' + svg('clue', 18) + '</div>'
  +       '<div class="tlde-body">'
  +         '<div class="tlde-label">Связанная улика</div>'
  +         '<div class="tlde-name">'
  +           escapeHtml(EVIDENCE_DB[it.ev] ? EVIDENCE_DB[it.ev].t : '')
  +         '</div>'
  +       '</div>'
  +       svg('chev', 16)
  +       '</div>'
  +     : '')

  +   '<div class="tld-actions">'
  +     '<button class="btn ghost" onclick="goBack()">'
  +       svg('back', 16) + ' К хронологии'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ============================================================
   БЛОК 4 — ДОПРОСЫ ПОДОЗРЕВАЕМЫХ
   ============================================================ */

const INTERROGATIONS = {

  interrogation_viktor: {
    id: 'interrogation_viktor',
    name: 'Виктор Павлович Соколовский',
    role: 'научный руководитель',
    av: 'ВП',
    color: '#8b6dff',
    unlock: 'note_audio',
    intro:
      'Вы вызвали Виктора Павловича на допрос под предлогом обсуждения диплома. '
      + 'Он сидит напротив, руки на столе. Спокоен. Но на лбу — капли пота.',
    questions: [
      {
        id: 'q1',
        q: 'Где вы были 13 апреля между 23:00 и 01:00?',
        answers: [
          {
            a: 'Дома. Смотрел телевизор.',
            reaction: 'Ложь. В переписке он сам вызвал Марину в ателье.',
            truth: false,
            ev: 'chat_viktor'
          },
          {
            a: 'Был в киноателье. Один.',
            reaction: 'Признаётся в присутствии, но отрицает встречу.',
            truth: 'partial'
          }
        ]
      },
      {
        id: 'q2',
        q: 'Почему вы требовали убрать вторую часть фильма Марины?',
        answers: [
          {
            a: 'Это плохой материал. Он бы не прошёл защиту.',
            reaction: 'Материал был лучшим, что Марина сделала.',
            truth: false
          },
          {
            a: 'Он касался лично меня.',
            reaction: 'Первое частичное признание.',
            truth: true,
            ev: 'note_viktor_profile'
          }
        ]
      },
      {
        id: 'q3',
        q: 'Вы знали о гибели Кирилла Соколова?',
        answers: [
          {
            a: 'Нет.',
            reaction: 'Вы знали. И вы знали, что Марина знала.',
            truth: false
          },
          {
            a: 'Да. Я был за рулём.',
            reaction: 'Признание.',
            truth: true,
            ev: 'note_audio',
            critical: true
          }
        ]
      },
      {
        id: 'q4',
        q: 'Что вы сделали с Мариной?',
        answers: [
          {
            a: 'Ничего. Я ушёл первым.',
            reaction: 'На записи слышен удар. Вы были последним, кто её видел.',
            truth: false
          },
          {
            a: 'Я не хотел. Оно вышло само.',
            reaction: 'Полное признание.',
            truth: true,
            ev: 'note_audio',
            critical: true
          }
        ]
      },
      {
        id: 'q5',
        q: 'Где тело Марины?',
        answers: [
          {
            a: 'В подсобке павильона №3. За той дверью, что снаружи.',
            reaction: 'Вы указали точное место. Это подтверждает версию следствия.',
            truth: true,
            ev: 'photo_door',
            critical: true
          },
          {
            a: 'Я не знаю.',
            reaction: 'Вы знаете. Вы вернулись утром, чтобы затереть пол.',
            truth: false
          }
        ]
      }
    ]
  },

  interrogation_krylov: {
    id: 'interrogation_krylov',
    name: 'Андрей Владимирович Крылов',
    role: 'продюсер, владелец студии',
    av: 'АК',
    color: '#c8d1e2',
    unlock: 'search_krylov',
    intro:
      'Крылов пришёл в сопровождении адвоката. Держится уверенно. '
      + 'Улыбается. Не понимает, зачем он здесь.',
    questions: [
      {
        id: 'q1',
        q: 'Почему вы предлагали Марине 12 миллионов за отказ показать вторую часть?',
        answers: [
          {
            a: 'Это деловое предложение. Мне важен был её талант.',
            reaction: 'Вы не предлагаете 12 миллионов за «талант».',
            truth: false
          },
          {
            a: 'Я хотел защитить её. И себя.',
            reaction: 'Первое осторожное признание.',
            truth: true,
            ev: 'note_krylov_offer'
          }
        ]
      },
      {
        id: 'q2',
        q: 'Зачем вы интересовались бронью павильона №3?',
        answers: [
          {
            a: 'Это моя собственность. Я имею право знать.',
            reaction: 'Вы интересовались, будет ли она одна. Это другое.',
            truth: false
          },
          {
            a: 'Я знал, что Соколовский что-то планирует.',
            reaction: 'Значит, вы знали о плане Виктора.',
            truth: true,
            ev: 'studio_booking'
          }
        ]
      },
      {
        id: 'q3',
        q: 'Вы знали, кто был за рулём в 2019 году?',
        answers: [
          {
            a: 'Нет.',
            reaction: 'Вы заплатили за закрытие дела. Вы знали всё.',
            truth: false
          },
          {
            a: 'Да. Но я не был за рулём. Я просто помог другу.',
            reaction: 'Соучастие в сокрытии преступления.',
            truth: true,
            ev: 'search_krylov',
            critical: true
          }
        ]
      }
    ]
  },

  /* ----------------------------------------------------------
     СОФЬЯ МЕЛЬНИК — объект объявлен заранее с пустым массивом
     questions, чтобы Часть 6 могла дополнить его без ошибки
     TypeError (Cannot read properties of undefined).
     ---------------------------------------------------------- */
  interrogation_sonya: {
    id: 'interrogation_sonya',
    name: 'Софья Мельник',
    role: 'соседка по квартире',
    av: 'СМ',
    color: '#3ddc97',
    unlock: 'sonya_timeline',
    intro:
      'Соня волнуется. Она не понимает, зачем её вызвали. '
      + 'Она жила с Мариной в одной квартире, но не была на показе.',
    questions: []
  }

};

/* ------------------------------------------------------------
   РЕНДЕР СПИСКА ДОПРОСОВ
   ------------------------------------------------------------ */
ROUTES.interrogation = function(){
  G.screen = 'interrogation';

  const available = Object.keys(INTERROGATIONS).filter(function(k){
    const it = INTERROGATIONS[k];
    return hasFlag('unlock_' + it.id) || hasEv(it.unlock);
  });

  if(!available.length){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>Допросы</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico">' + svg('users', 36) + '</div>'
    +   '<h2>Пока некого допрашивать</h2>'
    +   '<p>Соберите достаточно улик, чтобы вызвать '
    +     'подозреваемых на допрос.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Назад</button>'
    + '</div>');
    return;
  }

  const rows = available.map(function(k){
    const it = INTERROGATIONS[k];
    const passed = G.flags['interrogation_' + it.id + '_done'];
    return ''
    + '<div class="int-row" onclick="openInterrogation(\'' + it.id + '\')">'
    +   '<div class="ir-avatar" style="background:' + it.color + '">'
    +     it.av
    +   '</div>'
    +   '<div class="ir-body">'
    +     '<div class="ir-name">' + escapeHtml(it.name) + '</div>'
    +     '<div class="ir-role">' + escapeHtml(it.role) + '</div>'
    +   '</div>'
    +   (passed
    +     ? '<div class="ir-done">' + svg('checkCircle', 18) + '</div>'
    +     : '<div class="ir-new">Доступен</div>')
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Допросы</h2>'
  +     '<div class="sub">' + available.length + ' доступно</div>'
  +   '</div>'
  + '</div>'

  + '<div class="int-list">' + rows + '</div>');
};

/* ------------------------------------------------------------
   ОТКРЫТИЕ ДОПРОСА
   ------------------------------------------------------------ */
function openInterrogation(id){
  const it = INTERROGATIONS[id];
  if(!it) return;

  G.activeInterrogation = {
    id: id,
    qIndex: 0,
    answers: [],
    correct: 0,
    wrong: 0
  };

  showInterrogationIntro(it);
}

function showInterrogationIntro(it){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Допрос</h2>'
  +     '<div class="sub">' + escapeHtml(it.name) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="int-intro">'
  +   '<div class="ii-avatar" style="background:' + it.color + '">'
  +     it.av
  +   '</div>'
  +   '<h2>' + escapeHtml(it.name) + '</h2>'
  +   '<div class="ii-role">' + escapeHtml(it.role) + '</div>'
  +   '<div class="ii-scene">' + escapeHtml(it.intro) + '</div>'
  +   '<div class="ii-warn">'
  +     svg('alert', 14)
  +     '<span>Внимание: неправильные вопросы снижают доверие '
  +       'и могут закрыть доступ к допросу.</span>'
  +   '</div>'
  +   '<button class="btn" style="width:100%;justify-content:center" '
  +     'onclick="startInterrogation()">'
  +     svg('chat', 16) + ' Начать допрос'
  +   '</button>'
  + '</div>');
}

function startInterrogation(){
  const state = G.activeInterrogation;
  if(!state) return;
  const it = INTERROGATIONS[state.id];
  showInterrogationQuestion(it, state.qIndex);
}

function showInterrogationQuestion(it, qIdx){
  const q = it.questions[qIdx];
  if(!q){
    showInterrogationResult(it);
    return;
  }

  const answersHtml = q.answers.map(function(ans, i){
    return '<button class="int-answer" onclick="answerInterrogation(' + i + ')">'
      + escapeHtml(ans.a)
      + '</button>';
  }).join('');

  const state = G.activeInterrogation;
  const progress = Math.round(qIdx / it.questions.length * 100);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(it.name) + '</h2>'
  +     '<div class="sub">Вопрос ' + (qIdx + 1)
  +       + ' из ' + it.questions.length + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="int-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="int-scene">'

  +   '<div class="is-qblock">'
  +     '<div class="is-label">' + svg('info', 12) + ' Вопрос следователя</div>'
  +     '<div class="is-q">' + escapeHtml(q.q) + '</div>'
  +   '</div>'

  +   '<div class="is-suspect">'
  +     '<div class="iss-avatar" style="background:' + it.color + '">'
  +       it.av
  +     '</div>'
  +     '<div class="iss-bubble">'
  +       '<div class="iss-thinking">Он молчит. Выбирает ответ.</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="int-answers">' + answersHtml + '</div>'

  + '</div>');
}

function answerInterrogation(ansIdx){
  const state = G.activeInterrogation;
  if(!state) return;
  const it = INTERROGATIONS[state.id];
  const q = it.questions[state.qIndex];
  const ans = q.answers[ansIdx];
  if(!ans) return;

  state.answers.push({q: q.id, a: ansIdx, correct: ans.truth === true});
  if(ans.truth === true) state.correct++;
  else state.wrong++;

  if(ans.ev && !hasEv(ans.ev)){
    addEv(ans.ev);
    toast('📌 Улика', EVIDENCE_DB[ans.ev] ? EVIDENCE_DB[ans.ev].t : 'Зафиксировано', 'ev');
  }

  showInterrogationReaction(it, q, ans, function(){
    state.qIndex++;
    showInterrogationQuestion(it, state.qIndex);
  });
}

function showInterrogationReaction(it, q, ans, next){
  const cls = ans.truth === true ? 'ok'
    : ans.truth === 'partial' ? 'warn'
    : 'err';

  const label = ans.truth === true ? 'Признание'
    : ans.truth === 'partial' ? 'Полуправда'
    : 'Ложь';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(it.name) + '</h2>'
  +     '<div class="sub">Реакция</div>'
  +   '</div>'
  + '</div>'

  + '<div class="int-reaction ' + cls + '">'
  +   '<div class="ir-icon">'
  +     svg(ans.truth === true ? 'checkCircle'
  +       : ans.truth === 'partial' ? 'info' : 'close', 40)
  +   '</div>'
  +   '<div class="ir-label">' + label + '</div>'
  +   '<div class="ir-text">' + escapeHtml(ans.reaction) + '</div>'
  +   (ans.critical
  +     ? '<div class="ir-critical">'
  +       svg('starFill', 14, 'fill')
  +       '<span>Ключевое показание</span>'
  +       '</div>'
  +     : '')
  +   '<button class="btn" style="width:100%;justify-content:center" '
  +     'onclick="interrogationNext()">'
  +     'Продолжить' + svg('fwd', 16)
  +   '</button>'
  + '</div>');

  G.activeInterrogation._next = next;
}

function interrogationNext(){
  const state = G.activeInterrogation;
  if(!state || !state._next) return;
  const n = state._next;
  state._next = null;
  n();
}

function showInterrogationResult(it){
  const state = G.activeInterrogation;
  const total = it.questions.length;
  const correct = state.correct;
  const wrong = state.wrong;
  const passed = correct >= Math.ceil(total / 2);

  G.flags['interrogation_' + it.id + '_done'] = passed;
  G.flags['interrogation_' + it.id + '_correct'] = correct;
  G.flags['interrogation_' + it.id + '_wrong'] = wrong;

  const icoName = passed ? 'checkCircle' : 'alert';
  const cls = passed ? 'ok' : 'warn';
  const title = passed ? 'Допрос завершён' : 'Допрос неудачен';
  const verdict = passed
    ? 'Вы получили достаточно показаний. Материалы добавлены в дело.'
    : 'Подозреваемый закрылся. Часть улик осталась недоступной.';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Итог допроса</h2>'
  +     '<div class="sub">' + escapeHtml(it.name) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="int-result">'

  +   '<div class="irr-icon ' + cls + '">'
  +     svg(icoName, 44)
  +   '</div>'

  +   '<h2>' + title + '</h2>'
  +   '<p>' + verdict + '</p>'

  +   '<div class="irr-stats">'
  +     '<div>'
  +       '<b>' + correct + '/' + total + '</b>'
  +       '<span>правильных</span>'
  +     '</div>'
  +     '<div>'
  +       '<b>' + wrong + '</b>'
  +       '<span>ложных</span>'
  +     '</div>'
  +   '</div>'

  +   '<div class="irr-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="openInterrogation(\'' + it.id + '\')">'
  +       svg('refresh', 16) + ' Ещё раз'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       'Готово'
  +     '</button>'
  +   '</div>'

  + '</div>');

  if(passed){
    toast('✅ Допрос завершён', 'Показания приобщены к делу', 'ok');
  } else {
    toast('⚠️ Неудача', 'Часть улик осталась недоступной', 'warn');
  }

  G.activeInterrogation = null;
}

/* ============================================================
   CSS ДЛЯ ЧАСТИ 5
   ============================================================ */
(function injectPart5Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  /* ---------- ДОСКА ---------- */
  + '.board-progress{padding:14px 16px 8px}'
  + '.bp-label{'
  +   'display:flex;justify-content:space-between;'
  +   'align-items:baseline;margin-bottom:6px;'
  +   'font-size:11.5px;color:var(--dim);'
  + '}'
  + '.bp-label b{color:var(--txt);font-size:13px}'

  + '.board-filter{'
  +   'display:flex;gap:6px;padding:10px 14px 12px;'
  +   'overflow-x:auto;scrollbar-width:none;'
  +   'border-bottom:1px solid var(--line);'
  +   'position:sticky;top:57px;z-index:15;'
  +   'background:rgba(17,22,31,.94);'
  +   'backdrop-filter:blur(20px);'
  + '}'
  + '.board-filter::-webkit-scrollbar{display:none}'
  + '.bf-chip{'
  +   'display:flex;align-items:center;gap:5px;'
  +   'padding:6px 12px;border-radius:14px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'color:var(--dim);font-size:11.5px;cursor:pointer;'
  +   'white-space:nowrap;transition:.14s;font-family:inherit;'
  + '}'
  + '.bf-chip:hover{border-color:var(--line2);color:var(--txt)}'
  + '.bf-chip.active{'
  +   'background:rgba(93,169,255,.14);'
  +   'border-color:var(--acc);color:var(--acc);'
  + '}'
  + '.bf-chip b{'
  +   'font-size:10px;opacity:.8;margin-left:2px;'
  + '}'

  + '.board-list{padding:14px 12px 30px;display:flex;flex-direction:column;gap:10px}'
  + '.board-empty{'
  +   'padding:60px 30px;text-align:center;'
  + '}'
  + '.be-ico{'
  +   'color:var(--dim2);margin-bottom:14px;'
  +   'display:flex;justify-content:center;'
  + '}'
  + '.board-empty h3{font-size:15px;font-weight:600;margin-bottom:8px}'
  + '.board-empty p{'
  +   'font-size:12.5px;color:var(--dim);line-height:1.65;'
  + '}'

  + '.ev-card{'
  +   'background:linear-gradient(160deg,var(--panel2),var(--panel));'
  +   'border:1px solid var(--line);border-radius:14px;'
  +   'padding:14px 15px;cursor:pointer;transition:.15s;'
  +   'position:relative;overflow:hidden;'
  + '}'
  + '.ev-card:hover{border-color:var(--line2);transform:translateX(3px)}'
  + '.ev-card::before{'
  +   'content:"";position:absolute;'
  +   'left:0;top:0;bottom:0;width:3px;'
  +   'background:var(--acc);'
  + '}'
  + '.ev-card.key::before{'
  +   'background:var(--warn);'
  +   'box-shadow:0 0 12px var(--warn);'
  + '}'
  + '.ec-top{'
  +   'display:flex;justify-content:space-between;'
  +   'align-items:center;margin-bottom:8px;'
  + '}'
  + '.ec-cat{'
  +   'display:flex;align-items:center;gap:5px;'
  +   'font-size:10px;letter-spacing:1.2px;'
  +   'color:var(--dim);text-transform:uppercase;'
  + '}'
  + '.ec-key{color:var(--warn);display:flex}'
  + '.ec-title{'
  +   'font-size:14px;font-weight:600;'
  +   'margin-bottom:6px;line-height:1.35;'
  +   'padding-right:20px;'
  + '}'
  + '.ec-desc{'
  +   'font-size:12px;color:var(--dim);line-height:1.55;'
  +   'overflow:hidden;display:-webkit-box;'
  +   '-webkit-line-clamp:3;-webkit-box-orient:vertical;'
  + '}'
  + '.ec-src{'
  +   'font-size:10.5px;color:var(--dim2);'
  +   'margin-top:10px;padding-top:8px;'
  +   'border-top:1px dashed var(--line);'
  + '}'

  + '.help-block{'
  +   'display:flex;flex-direction:column;gap:10px;'
  +   'padding:18px;background:var(--panel2);'
  +   'border:1px solid var(--line);border-radius:14px;'
  +   'margin-bottom:12px;'
  + '}'
  + '.hb-ico{'
  +   'width:42px;height:42px;border-radius:12px;'
  +   'background:var(--panel);border:1px solid var(--line2);'
  +   'color:var(--acc);'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.help-block h3{font-size:14.5px;font-weight:600}'
  + '.help-block p{font-size:12.5px;color:var(--dim);line-height:1.65}'

  /* Просмотр улики */
  + '.ev-view{padding:20px 18px 40px}'
  + '.ev-head{'
  +   'display:flex;align-items:center;justify-content:space-between;'
  +   'margin-bottom:14px;'
  + '}'
  + '.eh-cat{'
  +   'display:flex;align-items:center;gap:6px;'
  +   'font-size:10.5px;letter-spacing:1.5px;'
  +   'color:var(--dim);text-transform:uppercase;'
  + '}'
  + '.eh-key{'
  +   'display:flex;align-items:center;gap:5px;'
  +   'font-size:10.5px;color:var(--warn);'
  +   'letter-spacing:1px;font-weight:700;'
  +   'text-transform:uppercase;'
  + '}'
  + '.ev-title{'
  +   'font-size:19px;font-weight:600;'
  +   'line-height:1.35;margin-bottom:10px;'
  + '}'
  + '.ev-src{'
  +   'display:flex;align-items:center;gap:6px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'margin-bottom:20px;'
  + '}'
  + '.ev-text{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.7;'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:12px;padding:16px 18px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.ev-opens{'
  +   'background:rgba(61,220,151,.08);'
  +   'border:1px solid rgba(61,220,151,.3);'
  +   'border-radius:12px;padding:14px 16px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.eo-label{'
  +   'font-size:10.5px;color:var(--ok);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.eo-item{font-size:12.5px;color:var(--txt2);margin-bottom:4px}'
  + '.ev-block{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:12px;padding:14px 16px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.ev-block-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:10px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.ev-related-list{display:flex;flex-direction:column;gap:6px}'
  + '.ev-related{'
  +   'display:flex;align-items:center;gap:8px;'
  +   'padding:9px 12px;background:var(--panel);'
  +   'border:1px solid var(--line);border-radius:9px;'
  +   'font-size:12px;color:var(--txt);cursor:pointer;'
  +   'transition:.14s;'
  + '}'
  + '.ev-related:hover{border-color:var(--acc);background:var(--panel3)}'
  + '.ev-related span{flex:1}'
  + '.ev-related .icon{color:var(--acc);opacity:.7}'
  + '.ev-related-empty{'
  +   'font-size:12px;color:var(--dim2);font-style:italic;'
  + '}'
  + '.ev-actions{display:flex;gap:10px}'
  + '.ev-actions .btn{flex:1;justify-content:center;font-size:13px}'

  /* ---------- ХРОНОЛОГИЯ ---------- */
  + '.tl-head{'
  +   'padding:16px 16px 8px;position:relative;'
  + '}'
  + '.tl-head-line{'
  +   'position:absolute;left:29px;top:24px;bottom:-8px;'
  +   'width:2px;background:var(--line);'
  + '}'
  + '.tl-head-label{'
  +   'display:flex;align-items:center;gap:8px;'
  +   'padding-left:44px;'
  +   'font-size:11.5px;color:var(--dim);'
  + '}'

  + '.tl-list{padding:0 16px}'
  + '.tl-item{'
  +   'display:flex;gap:14px;'
  +   'cursor:pointer;padding:8px 0;'
  +   'transition:.15s;'
  + '}'
  + '.tl-item:hover .tl-body{background:var(--panel2)}'
  + '.tl-marker{'
  +   'display:flex;flex-direction:column;align-items:center;'
  +   'flex:0 0 16px;padding-top:8px;'
  + '}'
  + '.tl-dot{'
  +   'width:14px;height:14px;border-radius:50%;'
  +   'background:var(--panel2);'
  +   'border:2px solid var(--acc);'
  +   'flex:0 0 14px;z-index:1;'
  + '}'
  + '.tl-item.critical .tl-dot{'
  +   'border-color:var(--danger);'
  +   'box-shadow:0 0 12px var(--danger);'
  +   'background:rgba(255,90,110,.15);'
  + '}'
  + '.tl-line{'
  +   'flex:1;width:2px;background:var(--line);'
  +   'margin-top:2px;'
  + '}'
  + '.tl-item:last-child .tl-line{display:none}'
  + '.tl-body{'
  +   'flex:1;padding:10px 14px;'
  +   'border-radius:12px;'
  +   'border:1px solid transparent;'
  +   'transition:.15s;'
  + '}'
  + '.tl-body:hover{border-color:var(--line)}'
  + '.tl-when{'
  +   'display:flex;align-items:baseline;gap:8px;'
  +   'margin-bottom:5px;'
  + '}'
  + '.tl-date{'
  +   'font-size:11.5px;color:var(--acc);'
  +   'font-weight:600;'
  + '}'
  + '.tl-time{'
  +   'font-size:11px;color:var(--dim2);'
  +   'font-family:monospace;'
  + '}'
  + '.tl-title{'
  +   'font-size:13.5px;font-weight:600;'
  +   'margin-bottom:4px;'
  +   'display:flex;align-items:center;gap:8px;'
  + '}'
  + '.tl-ev{'
  +   'display:inline-flex;align-items:center;'
  +   'padding:2px 7px;border-radius:8px;'
  +   'background:rgba(93,169,255,.14);'
  +   'color:var(--acc);'
  + '}'
  + '.tl-desc{'
  +   'font-size:12px;color:var(--dim);line-height:1.55;'
  + '}'

  + '.tl-end{'
  +   'padding:24px 16px 40px;'
  +   'display:flex;flex-direction:column;align-items:center;gap:12px;'
  + '}'
  + '.tle-marker{'
  +   'width:12px;height:12px;border-radius:50%;'
  +   'background:var(--ok);'
  +   'box-shadow:0 0 16px var(--ok);'
  + '}'
  + '.tle-text{'
  +   'font-size:12px;color:var(--dim);'
  +   'letter-spacing:.5px;'
  + '}'

  + '.tl-detail{padding:22px 18px 40px}'
  + '.tld-tag{'
  +   'display:inline-flex;align-items:center;gap:6px;'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.2px;text-transform:uppercase;'
  +   'padding:4px 10px;border-radius:10px;'
  +   'background:rgba(93,169,255,.1);'
  +   'border:1px solid rgba(93,169,255,.25);'
  +   'margin-bottom:14px;'
  + '}'
  + '.tld-title{'
  +   'font-size:20px;font-weight:600;'
  +   'line-height:1.3;margin-bottom:14px;'
  + '}'
  + '.tld-text{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.75;'
  +   'margin-bottom:20px;'
  + '}'
  + '.tld-note{'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-left:3px solid var(--warn);'
  +   'border-radius:10px;padding:14px 16px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.tldn-label{'
  +   'font-size:10.5px;color:var(--warn);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.tldn-text{'
  +   'font-size:12.5px;color:var(--dim);line-height:1.65;'
  +   'font-style:italic;'
  + '}'
  + '.tld-ev{'
  +   'display:flex;align-items:center;gap:12px;'
  +   'padding:14px 16px;'
  +   'background:linear-gradient(140deg, '
  +   'rgba(93,169,255,.1), rgba(93,169,255,.02));'
  +   'border:1px solid rgba(93,169,255,.3);'
  +   'border-radius:12px;cursor:pointer;'
  +   'margin-bottom:20px;transition:.15s;'
  + '}'
  + '.tld-ev:hover{border-color:var(--acc)}'
  + '.tlde-ico{'
  +   'width:38px;height:38px;border-radius:10px;'
  +   'background:rgba(93,169,255,.15);'
  +   'color:var(--acc);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 38px;'
  + '}'
  + '.tlde-body{flex:1;min-width:0}'
  + '.tlde-label{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1.2px;text-transform:uppercase;'
  +   'margin-bottom:2px;'
  + '}'
  + '.tlde-name{'
  +   'font-size:13px;font-weight:600;color:var(--txt);'
  + '}'
  + '.tld-actions .btn{width:100%;justify-content:center;font-size:13px}'

  /* ---------- ДОПРОСЫ ---------- */
  + '.int-list{padding:6px 0}'
  + '.int-row{'
  +   'display:flex;gap:13px;padding:14px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.int-row:hover{background:var(--panel2)}'
  + '.ir-avatar{'
  +   'width:48px;height:48px;border-radius:50%;flex:0 0 48px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:17px;font-weight:600;color:#fff;'
  + '}'
  + '.ir-body{flex:1;min-width:0}'
  + '.ir-name{font-size:14px;font-weight:600;margin-bottom:2px}'
  + '.ir-role{font-size:11.5px;color:var(--dim)}'
  + '.ir-done{color:var(--ok);display:flex}'
  + '.ir-new{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'padding:4px 10px;border-radius:10px;'
  +   'background:rgba(93,169,255,.14);'
  +   'letter-spacing:.5px;font-weight:600;'
  + '}'

  + '.int-intro{padding:30px 24px;text-align:center}'
  + '.ii-avatar{'
  +   'width:80px;height:80px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:28px;font-weight:600;color:#fff;'
  + '}'
  + '.int-intro h2{font-size:19px;font-weight:600;margin-bottom:4px}'
  + '.ii-role{font-size:12.5px;color:var(--dim);margin-bottom:20px}'
  + '.ii-scene{'
  +   'text-align:left;font-size:13px;color:var(--txt2);'
  +   'line-height:1.7;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-left:3px solid var(--acc);'
  +   'border-radius:10px;padding:16px 18px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.ii-warn{'
  +   'display:flex;gap:10px;align-items:flex-start;'
  +   'padding:12px 14px;'
  +   'background:rgba(255,184,77,.08);'
  +   'border:1px solid rgba(255,184,77,.25);'
  +   'border-radius:10px;'
  +   'font-size:12px;color:var(--warn);line-height:1.55;'
  +   'text-align:left;margin-bottom:20px;'
  + '}'
  + '.ii-warn .icon{flex:0 0 14px;margin-top:1px}'

  + '.int-progress{padding:12px 16px 0}'
  + '.int-scene{padding:20px 18px 30px;display:flex;flex-direction:column;gap:20px}'
  + '.is-qblock{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:14px;padding:16px 18px;'
  + '}'
  + '.is-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:10px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.is-q{'
  +   'font-size:14px;color:var(--txt);line-height:1.55;'
  +   'font-weight:500;'
  + '}'

  + '.is-suspect{display:flex;gap:12px;align-items:flex-start}'
  + '.iss-avatar{'
  +   'width:40px;height:40px;border-radius:50%;'
  +   'flex:0 0 40px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:14px;font-weight:600;color:#fff;'
  + '}'
  + '.iss-bubble{'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:16px 16px 16px 4px;'
  +   'padding:10px 14px;font-size:12.5px;'
  +   'color:var(--dim);font-style:italic;'
  + '}'
  + '.iss-thinking{opacity:.7}'

  + '.int-answers{display:flex;flex-direction:column;gap:10px}'
  + '.int-answer{'
  +   'text-align:left;padding:14px 16px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:12px;color:var(--txt);'
  +   'font-size:13px;cursor:pointer;transition:.15s;'
  +   'font-family:inherit;line-height:1.5;'
  + '}'
  + '.int-answer:hover{'
  +   'border-color:var(--acc);background:var(--panel3);'
  +   'transform:translateX(4px);'
  + '}'
  + '.int-answer:active{transform:scale(.98)}'

  + '.int-reaction{'
  +   'padding:40px 24px;text-align:center;'
  +   'display:flex;flex-direction:column;align-items:center;gap:16px;'
  +   'min-height:100%;justify-content:center;'
  + '}'
  + '.ir-icon{'
  +   'width:80px;height:80px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:2px solid;'
  + '}'
  + '.int-reaction.ok .ir-icon{'
  +   'color:var(--ok);border-color:var(--ok);'
  +   'background:rgba(61,220,151,.08);'
  +   'box-shadow:0 0 40px rgba(61,220,151,.25);'
  + '}'
  + '.int-reaction.warn .ir-icon{'
  +   'color:var(--warn);border-color:var(--warn);'
  +   'background:rgba(255,184,77,.08);'
  +   'box-shadow:0 0 40px rgba(255,184,77,.25);'
  + '}'
  + '.int-reaction.err .ir-icon{'
  +   'color:var(--danger);border-color:var(--danger);'
  +   'background:rgba(255,90,110,.08);'
  +   'box-shadow:0 0 40px rgba(255,90,110,.25);'
  + '}'
  + '.ir-label{'
  +   'font-size:11px;letter-spacing:3px;'
  +   'text-transform:uppercase;font-weight:700;'
  + '}'
  + '.int-reaction.ok .ir-label{color:var(--ok)}'
  + '.int-reaction.warn .ir-label{color:var(--warn)}'
  + '.int-reaction.err .ir-label{color:var(--danger)}'
  + '.ir-text{'
  +   'font-size:13px;color:var(--txt2);line-height:1.65;'
  +   'max-width:280px;'
  + '}'
  + '.ir-critical{'
  +   'display:flex;align-items:center;gap:8px;'
  +   'padding:8px 16px;border-radius:12px;'
  +   'background:rgba(255,184,77,.14);'
  +   'color:var(--warn);'
  +   'font-size:11px;letter-spacing:1.2px;'
  +   'text-transform:uppercase;font-weight:700;'
  + '}'
  + '.int-reaction .btn{'
  +   'margin-top:14px;'
  + '}'

  + '.int-result{padding:40px 24px;text-align:center}'
  + '.irr-icon{'
  +   'width:96px;height:96px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:2px solid;'
  + '}'
  + '.irr-icon.ok{'
  +   'color:var(--ok);border-color:var(--ok);'
  +   'background:rgba(61,220,151,.08);'
  +   'box-shadow:0 0 50px rgba(61,220,151,.3);'
  + '}'
  + '.irr-icon.warn{'
  +   'color:var(--warn);border-color:var(--warn);'
  +   'background:rgba(255,184,77,.08);'
  +   'box-shadow:0 0 50px rgba(255,184,77,.3);'
  + '}'
  + '.int-result h2{font-size:20px;font-weight:600;margin-bottom:10px}'
  + '.int-result > p{'
  +   'font-size:13px;color:var(--dim);line-height:1.7;'
  +   'margin-bottom:24px;max-width:280px;'
  +   'margin-left:auto;margin-right:auto;'
  + '}'
  + '.irr-stats{'
  +   'display:flex;gap:32px;justify-content:center;'
  +   'margin-bottom:28px;'
  + '}'
  + '.irr-stats > div{'
  +   'display:flex;flex-direction:column;align-items:center;gap:3px;'
  + '}'
  + '.irr-stats b{font-size:22px;font-weight:600}'
  + '.irr-stats span{font-size:10.5px;color:var(--dim);letter-spacing:.5px}'
  + '.irr-actions{display:flex;gap:10px}';

  document.head.appendChild(style);
})();

console.log(
  '%c[ЧАСТЬ 5 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nДоска улик: 42 карточки. Хронология: 30 событий. Допросы: 3 подозреваемых. Вставляй Часть 6 ниже.'
);

/* ... Часть 5 заканчивается здесь. Не закрывай script/body/html.
   Часть 6 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 6 из 10 — ФИНАЛЬНЫЕ ДОПРОСЫ + СИСТЕМА ОБВИНЕНИЯ
   ------------------------------------------------------------
   Расширяет систему допросов из Части 5, добавляет:
   - Допросы остальных подозреваемых (Соня, Вадим, Ольга, Юля)
   - Финальный допрос Лены
   - Систему выдвижения обвинения
   - Вердикт и развязку
   - Экран «Дело раскрыто»
   ============================================================ */

/* ============================================================
   БЛОК 1 — ПРОДОЛЖЕНИЕ БАЗЫ ДОПРОСОВ
   ============================================================ */

/* Защита: если Part 5 не объявил interrogation_sonya — создаём */
if(typeof INTERROGATIONS.interrogation_sonya === 'undefined'){
  INTERROGATIONS.interrogation_sonya = {
    id: 'interrogation_sonya',
    name: 'Софья Мельник',
    role: 'соседка по квартире',
    av: 'СМ',
    color: '#3ddc97',
    unlock: 'sonya_timeline',
    intro:
      'Соня волнуется. Она не понимает, зачем её вызвали. '
      + 'Она жила с Мариной в одной квартире, но не была на показе.',
    questions: []
  };
}

/* Дополняем Соню вопросами */
INTERROGATIONS.interrogation_sonya.questions = [
  {
    id: 'q1',
    q: 'Когда вы в последний раз видели Марину дома?',
    answers: [
      {
        a: '12 апреля вечером. Я собирала вещи.',
        reaction: 'Это подтверждается перепиской.',
        truth: true,
        ev: 'sonya_timeline'
      },
      {
        a: '13 апреля утром. Она пила кофе.',
        reaction: 'Вы были у родителей. Это невозможно.',
        truth: false
      }
    ]
  },
  {
    id: 'q2',
    q: 'Что вы заметили в квартире, когда вернулись 14 апреля?',
    answers: [
      {
        a: 'Куртка Марины висела на стуле. Она вышла без неё.',
        reaction: 'Ключевая деталь. Она собиралась вернуться.',
        truth: true,
        ev: 'photo_last',
        critical: true
      },
      {
        a: 'Всё было в обычном виде.',
        reaction: 'Телефон лежал под диваном. Это не «обычный вид».',
        truth: false
      }
    ]
  },
  {
    id: 'q3',
    q: 'Что вы знаете о женихе Марины?',
    answers: [
      {
        a: 'Артём часто бывал у нас. Добрый. Нервный.',
        reaction: 'Верно.',
        truth: true
      },
      {
        a: 'Он угрожал ей. Я слышала один раз.',
        reaction: 'Прямых угроз не было. Но вы что-то слышали.',
        truth: 'partial'
      }
    ]
  },
  {
    id: 'q4',
    q: 'Что вам известно о Викторе Павловиче?',
    answers: [
      {
        a: 'Марина его боялась. Она один раз упомянула «он смотрит».',
        reaction: 'Это совпадает с её заметкой от 9 апреля.',
        truth: true,
        ev: 'diary_page'
      },
      {
        a: 'Ничего. Она про него не говорила.',
        reaction: 'Говорила. Вы просто не придали значения.',
        truth: false
      }
    ]
  },
  {
    id: 'q5',
    q: 'Почему вы уехали к родителям именно 12 апреля?',
    answers: [
      {
        a: 'Совпадение. У мамы был день рождения.',
        reaction: 'Это подтверждается соцсетями. Вы не имеете отношения.',
        truth: true
      },
      {
        a: 'Марина попросила, чтобы я уехала.',
        reaction: 'В переписке этого нет. Она просила оставить ключи.',
        truth: 'partial'
      }
    ]
  }
];

INTERROGATIONS.interrogation_vadim = {
  id: 'interrogation_vadim',
  name: 'Вадим Соколовский',
  role: 'сын Виктора Павловича',
  av: 'ВС',
  color: '#ff5a6e',
  unlock: 'chat_viktor',
  intro:
    'Вадим сидит развязно. Улыбается. Он не понимает серьёзности. '
    + 'Но его руки выдают — он сжимает кулаки под столом.',
  questions: [
    {
      id: 'q1',
      q: 'Вы писали Марине угрозы?',
      answers: [
        {
          a: 'Я просто предупреждал. Она лезла не туда.',
          reaction: 'Это и есть угроза. И вы это знаете.',
          truth: true,
          ev: 'threat'
        },
        {
          a: 'Нет. Не я. Кто-то взломал мой аккаунт.',
          reaction: 'Логи показывают — это был ваш телефон.',
          truth: false
        }
      ]
    },
    {
      id: 'q2',
      q: 'Что вам рассказал отец про Марину?',
      answers: [
        {
          a: 'Что она копает про аварию 2019 года. Про брата.',
          reaction: 'Он рассказал вам про Кирилла? Значит, вы знали.',
          truth: true,
          ev: 'note_viktor_profile'
        },
        {
          a: 'Ничего. Я сам всё понял.',
          reaction: 'Вы не могли «понять» то, чего не знали.',
          truth: false
        }
      ]
    },
    {
      id: 'q3',
      q: 'Где вы были 13 апреля ночью?',
      answers: [
        {
          a: 'Дома. Смотрел фильм.',
          reaction: 'Камеры у вашего дома вас не зафиксировали.',
          truth: false
        },
        {
          a: 'Был у отца. Он попросил приехать.',
          reaction: 'Он вызвал вас? Зачем?',
          truth: true,
          critical: true
        }
      ]
    },
    {
      id: 'q4',
      q: 'Зачем отец вас вызвал в ту ночь?',
      answers: [
        {
          a: 'Сказал, что «есть проблема, надо решить».',
          reaction: 'Это «решение» касалось Марины.',
          truth: true,
          ev: 'note_audio',
          critical: true
        },
        {
          a: 'Я не помню. Я был пьян.',
          reaction: 'Вы были трезвы. Это подтверждает таксист.',
          truth: false
        }
      ]
    },
    {
      id: 'q5',
      q: 'Что вы сделали, когда приехали?',
      answers: [
        {
          a: 'Помог отцу убрать в павильоне. Я не знал, что там было.',
          reaction: 'Вы знали. Пятно на полу вы видели.',
          truth: 'partial',
          ev: 'photo_blood'
        },
        {
          a: 'Ничего. Я уехал сразу.',
          reaction: 'Вы помогали. Отпечатки ваших ботинок в павильоне.',
          truth: false
        }
      ]
    }
  ]
};

INTERROGATIONS.interrogation_olga = {
  id: 'interrogation_olga',
  name: 'Ольга Соколовская',
  role: 'жена Виктора Павловича',
  av: 'ОС',
  color: '#c8d1e2',
  unlock: 'chat_viktor',
  intro:
    'Ольга пришла в чёрном. Она знает, зачем её вызвали. '
    + 'Она не защищает мужа. Она защищает себя.',
  questions: [
    {
      id: 'q1',
      q: 'Вы знали о том, что произошло в 2019 году?',
      answers: [
        {
          a: 'Я знала, что он сбил кого-то. Но не знала, что насмерть.',
          reaction: 'Вы знали 4 года. И молчали.',
          truth: true,
          ev: 'note_viktor_profile'
        },
        {
          a: 'Нет. Он никогда не говорил.',
          reaction: 'В 2019 году у вас была машина, которую он «разбил». Вы знали.',
          truth: false
        }
      ]
    },
    {
      id: 'q2',
      q: 'Почему вы написали Марине в апреле?',
      answers: [
        {
          a: 'Я хотела её предупредить. Чтобы она не лезла.',
          reaction: 'Вы знали, что муж опасен. И не сказали прямо.',
          truth: true,
          ev: 'search_olga'
        },
        {
          a: 'Я просто хотела с ней поговорить.',
          reaction: 'Вы написали «я вам не завидую». Это не светская беседа.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q3',
      q: 'Что вам известно о ночи 13 апреля?',
      answers: [
        {
          a: 'Он уехал около 22:40 и вернулся в 4 утра. Весь в грязи.',
          reaction: 'Ключевое показание против Виктора.',
          truth: true,
          ev: 'note_audio',
          critical: true
        },
        {
          a: 'Он был дома всю ночь.',
          reaction: 'Вы только что сказали, что он уехал. Вы путаетесь.',
          truth: false
        }
      ]
    },
    {
      id: 'q4',
      q: 'Почему вы не сообщили в полицию, когда узнали про Марину?',
      answers: [
        {
          a: 'Я боялась. Я всю жизнь его боялась.',
          reaction: 'Понятно. Но ваше молчание — соучастие.',
          truth: true
        },
        {
          a: 'Я не знала, что это он. До сегодняшнего дня.',
          reaction: 'Вы знали. Он вернулся в 4 утра весь в грязи.',
          truth: false
        }
      ]
    }
  ]
};

INTERROGATIONS.interrogation_yulia = {
  id: 'interrogation_yulia',
  name: 'Юлия Соколова',
  role: 'невестка, вдова Кирилла',
  av: 'ЮС',
  color: '#ff7a9c',
  unlock: 'chat_kirill',
  intro:
    'Юля пришла с маленьким сыном. Мальчику 4 года. '
    + 'Он не знает, кем был его отец. Юля пришла, чтобы это изменить.',
  questions: [
    {
      id: 'q1',
      q: 'Что вы знаете о ночи гибели Кирилла?',
      answers: [
        {
          a: 'Он поехал к Марине. Больше я ничего не знаю.',
          reaction: 'Это совпадает с последними сообщениями.',
          truth: true,
          ev: 'chat_kirill'
        },
        {
          a: 'Он был не в себе. Мы поссорились.',
          reaction: 'Вы поссорились за два дня до. Это не связано.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q2',
      q: 'Почему вы просили Марину не показывать фильм?',
      answers: [
        {
          a: 'Я не хотела, чтобы сын узнал об отце такое.',
          reaction: 'Понятно. Но вы не давали ей шанса.',
          truth: true
        },
        {
          a: 'Мне было стыдно. Что я не смогла его удержать.',
          reaction: 'Вы не виноваты в его смерти.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q3',
      q: 'Знаете ли вы кого-то, кто мог быть за рулём?',
      answers: [
        {
          a: 'Нет. Я четыре года думала, что это случайность.',
          reaction: 'Но это была не случайность. Спасибо за честность.',
          truth: true
        },
        {
          a: 'Я слышала разговор Марины с кем-то по телефону. Про какого-то мужчину.',
          reaction: 'Она вам звонила? Когда?',
          truth: true,
          ev: 'call_viktor'
        }
      ]
    },
    {
      id: 'q4',
      q: 'Ваш сын — единственный наследник Кирилла. Что будет с ним?',
      answers: [
        {
          a: 'Он вырастет и узнает правду. От меня.',
          reaction: 'Это правильный выбор.',
          truth: true
        },
        {
          a: 'Я никогда ему не расскажу.',
          reaction: 'Он найдёт фильм Марины в интернете. Рано или поздно.',
          truth: 'partial'
        }
      ]
    }
  ]
};

INTERROGATIONS.interrogation_lena = {
  id: 'interrogation_lena',
  name: 'Елена Крылова',
  role: 'лучшая подруга Марины',
  av: 'ЛК',
  color: '#e05c7a',
  unlock: 'chat_lena',
  intro:
    'Лена — единственный человек, который был рядом до конца. '
    + 'Она не подозреваемая. Она — последний свидетель Марины.',
  questions: [
    {
      id: 'q1',
      q: 'Когда вы в последний раз говорили с Мариной?',
      answers: [
        {
          a: '13 апреля, в 22:31. После показа. Мы говорили 3 минуты.',
          reaction: 'Это последний звонок в её жизни.',
          truth: true,
          ev: 'chat_lena',
          critical: true
        },
        {
          a: '12 апреля. Она сказала, что нашла убийцу.',
          reaction: 'Она говорила это не вам, а в сообщении. Оба раза важны.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q2',
      q: 'Что она сказала вам в том разговоре?',
      answers: [
        {
          a: 'Что собирается в ателье. И что боится.',
          reaction: 'Ключевое. Она ехала к нему с опаской.',
          truth: true,
          ev: 'call_viktor',
          critical: true
        },
        {
          a: 'Ничего конкретного. Она была в панике.',
          reaction: 'В панике она бы не поехала. Она поехала осознанно.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q3',
      q: 'Что вы знаете про папку «Кирилл»?',
      answers: [
        {
          a: 'Она упомянула её 12 апреля. Сказала пароль я знаю.',
          reaction: 'Вы открыли папку?',
          truth: true,
          ev: 'note_plan_b',
          critical: true
        },
        {
          a: 'Ничего. Она никогда про такое не говорила.',
          reaction: 'В переписке она прямым текстом: «пароль ты знаешь».',
          truth: false
        }
      ]
    },
    {
      id: 'q4',
      q: 'Почему вы не поехали в ателье за ней?',
      answers: [
        {
          a: 'Я не знала, что она едет. Она не сказала адрес.',
          reaction: 'Это правда. Она защитила вас от этого.',
          truth: true
        },
        {
          a: 'Я боялась. Я побоялась идти туда.',
          reaction: 'Вас никто не осуждает. Но вы понимаете цену.',
          truth: 'partial'
        }
      ]
    },
    {
      id: 'q5',
      q: 'Что вы хотите сказать следователю?',
      answers: [
        {
          a: 'Марина знала, что не вернётся. Она оставила всё нам.',
          reaction: 'Вы правы. Она оставила правду.',
          truth: true,
          ev: 'note_plan_b'
        },
        {
          a: 'Найдите его. Пожалуйста. Найдите.',
          reaction: 'Мы найдём. Теперь у нас есть всё.',
          truth: true
        }
      ]
    }
  ]
};

/* ============================================================
   БЛОК 2 — ОБНОВЛЕНИЕ СПИСКА ДОСТУПНЫХ ДОПРОСОВ
   ============================================================ */

/* Переопределяем ROUTES.interrogation чтобы включить всех */
ROUTES.interrogation = function(){
  G.screen = 'interrogation';

  const allIds = Object.keys(INTERROGATIONS);
  const available = allIds.filter(function(k){
    const it = INTERROGATIONS[k];
    return hasEv(it.unlock) || hasFlag('unlock_' + it.id);
  });

  const done = available.filter(function(k){
    return G.flags['interrogation_' + k + '_done'];
  }).length;

  if(!available.length){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>Допросы</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico">' + svg('users', 36) + '</div>'
    +   '<h2>Пока некого допрашивать</h2>'
    +   '<p>Соберите достаточно улик, чтобы вызвать '
    +     'подозреваемых на допрос.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Назад</button>'
    + '</div>');
    return;
  }

  const rows = available.map(function(k){
    const it = INTERROGATIONS[k];
    const passed = G.flags['interrogation_' + it.id + '_done'];
    const correct = G.flags['interrogation_' + it.id + '_correct'] || 0;
    const total = it.questions.length;
    return ''
    + '<div class="int-row" onclick="openInterrogation(\'' + it.id + '\')">'
    +   '<div class="ir-avatar" style="background:' + it.color + '">'
    +     it.av
    +   '</div>'
    +   '<div class="ir-body">'
    +     '<div class="ir-name">' + escapeHtml(it.name) + '</div>'
    +     '<div class="ir-role">' + escapeHtml(it.role) + '</div>'
    +   '</div>'
    +   (passed
    +     ? '<div class="ir-done-stack">'
    +       '<div class="ir-done">' + svg('checkCircle', 18) + '</div>'
    +       '<div class="ir-score">' + correct + '/' + total + '</div>'
    +       '</div>'
    +     : '<div class="ir-new">Доступен</div>')
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Допросы</h2>'
  +     '<div class="sub">' + done + ' из ' + available.length + ' пройдено</div>'
  +   '</div>'
  +   '<button class="back" onclick="interrogationHelp()">' + svg('help', 18) + '</button>'
  + '</div>'

  + '<div class="int-list">' + rows + '</div>');
};

function interrogationHelp(){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Допросы</h2><div class="sub">Справка</div></div>'
  + '</div>'
  + '<div style="padding:24px 20px">'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('users', 22) + '</div>'
  +     '<h3>Как работают допросы</h3>'
  +     '<p>Каждый допрос открывается, когда вы находите ключевую улику, '
  +       'связанную с этим человеком. Вы задаёте вопросы и выбираете '
  +       'один из вариантов ответа подозреваемого.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('target', 22) + '</div>'
  +     '<h3>Правда или ложь</h3>'
  +     '<p>Один вариант — правда, второй — ложь. Иногда подозреваемый '
  +       'говорит полуправду. Правильные ответы дают улики.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('star', 22) + '</div>'
  +     '<h3>Ключевые показания</h3>'
  +     '<p>Некоторые ответы помечены как «ключевые». Они напрямую '
  +       'влияют на финальное обвинение.</p>'
  +   '</div>'
  +   '<button class="btn ghost" style="width:100%;justify-content:center;margin-top:14px" '
  +     'onclick="goBack()">Понятно</button>'
  + '</div>');
}

/* ============================================================
   БЛОК 3 — СИСТЕМА ОБВИНЕНИЯ
   ============================================================ */

const SUSPECTS = [
  {
    id: 'viktor',
    name: 'Виктор Павлович Соколовский',
    role: 'научный руководитель',
    av: 'ВП',
    color: '#8b6dff',
    correct: true,
    evidence_needed: ['note_audio', 'chat_viktor', 'note_meeting', 'call_viktor'],
    min_evidence: 3
  },
  {
    id: 'krylov',
    name: 'Андрей Владимирович Крылов',
    role: 'продюсер',
    av: 'АК',
    color: '#c8d1e2',
    correct: false,
    evidence_needed: ['search_krylov', 'note_krylov_offer', 'studio_booking'],
    min_evidence: 2
  },
  {
    id: 'artem',
    name: 'Артём Северов',
    role: 'жених',
    av: 'АС',
    color: '#ff8a5c',
    correct: false,
    evidence_needed: ['artem_alibi'],
    min_evidence: 1
  },
  {
    id: 'dima',
    name: 'Дмитрий Лапин',
    role: 'бывший парень',
    av: 'ДЛ',
    color: '#5da9ff',
    correct: false,
    evidence_needed: ['dima_stalk'],
    min_evidence: 1
  },
  {
    id: 'vadim',
    name: 'Вадим Соколовский',
    role: 'сын Виктора',
    av: 'ВС',
    color: '#ff5a6e',
    correct: false,
    evidence_needed: ['threat', 'chat_viktor'],
    min_evidence: 1
  },
  {
    id: 'unknown',
    name: 'Неизвестный (аноним)',
    role: 'номер скрыт',
    av: '?',
    color: '#4d576b',
    correct: false,
    evidence_needed: ['threat', 'threat_voice'],
    min_evidence: 1
  }
];

G.accusation = {
  suspect: null,
  evidence: [],
  step: 0
};

/* ------------------------------------------------------------
   ГЛАВНЫЙ ЭКРАН ОБВИНЕНИЯ
   ------------------------------------------------------------ */
ROUTES.accusation = function(){
  G.screen = 'accusation';

  const keyEv = G.evidence.filter(function(id){
    return EVIDENCE_DB[id] && EVIDENCE_DB[id].key;
  }).length;

  if(keyEv < 3){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>Обвинение</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico" style="color:var(--warn);border-color:var(--warn)">'
    +     svg('alert', 36)
    +   '</div>'
    +   '<h2>Недостаточно улик</h2>'
    +   '<p>Для выдвижения обвинения нужно как минимум '
    +     '<b style="color:var(--txt)">3 ключевые улики</b>. '
    +     'У вас сейчас: <b style="color:var(--warn)">' + keyEv + '</b>.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Вернуться к расследованию</button>'
    + '</div>');
    return;
  }

  const rows = SUSPECTS.map(function(s){
    return ''
    + '<div class="sus-row" onclick="selectSuspect(\'' + s.id + '\')">'
    +   '<div class="sr-avatar" style="background:' + s.color + '">'
    +     s.av
    +   '</div>'
    +   '<div class="sr-body">'
    +     '<div class="sr-name">' + escapeHtml(s.name) + '</div>'
    +     '<div class="sr-role">' + escapeHtml(s.role) + '</div>'
    +   '</div>'
    +   svg('chev', 16)
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Выдвинуть обвинение</h2>'
  +     '<div class="sub">Выберите подозреваемого</div>'
  +   '</div>'
  + '</div>'

  + '<div class="acc-warning">'
  +   '<div class="aw-icon">' + svg('alert', 18) + '</div>'
  +   '<div class="aw-text">'
  +     '<b>Внимание</b>'
  +     '<span>Обвинение необратимо. Если вы ошибётесь — '
  +       'настоящий убийца уйдёт от ответственности.</span>'
  +   '</div>'
  + '</div>'

  + '<div class="sus-list">' + rows + '</div>');
};

/* ------------------------------------------------------------
   ВЫБОР ПОДОЗРЕВАЕМОГО
   ------------------------------------------------------------ */
function selectSuspect(id){
  const s = SUSPECTS.find(function(x){ return x.id === id; });
  if(!s) return;

  G.accusation.suspect = id;
  G.accusation.evidence = [];

  haptic(10);
  showAccusationConfirm(s);
}

function showAccusationConfirm(s){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Подтверждение</h2></div>'
  + '</div>'

  + '<div class="acc-confirm">'
  +   '<div class="ac-avatar" style="background:' + s.color + '">'
  +     s.av
  +   '</div>'
  +   '<h2>' + escapeHtml(s.name) + '</h2>'
  +   '<div class="ac-role">' + escapeHtml(s.role) + '</div>'

  +   '<div class="ac-question">'
  +     'Вы уверены, что именно этот человек '
  +     'виновен в исчезновении Марины Соколовой?'
  +   '</div>'

  +   '<div class="ac-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +     '<button class="btn danger" style="flex:1;justify-content:center" '
  +       'onclick="startEvidencePresent()">'
  +       svg('shield', 16) + ' Обвинить'
  +     '</button>'
  +   '</div>'
  + '</div>');
}

/* ------------------------------------------------------------
   ПРЕДЪЯВЛЕНИЕ УЛИК
   ------------------------------------------------------------ */
function startEvidencePresent(){
  G.accusation.evidence = [];
  G.accusation.step = 1;
  showEvidencePresentScreen();
}

function showEvidencePresentScreen(){
  const s = SUSPECTS.find(function(x){ return x.id === G.accusation.suspect; });
  if(!s) return;

  const needed = s.min_evidence;
  const selected = G.accusation.evidence.length;

  const evidence = G.evidence.filter(function(id){
    return EVIDENCE_DB[id];
  }).map(function(id){
    return renderEvidenceSelect(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Предъявите улики</h2>'
  +     '<div class="sub">'
  +       escapeHtml(s.name) + ' · '
  +       selected + ' из ' + needed
  +     '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="ep-head">'
  +   '<div class="ep-avatar" style="background:' + s.color + '">'
  +     s.av
  +   '</div>'
  +   '<div class="ep-text">'
  +     'Выберите улики, которые прямо указывают на '
  +     '<b>' + escapeHtml(s.name) + '</b>. '
  +     'Нужно минимум ' + needed + '.'
  +   '</div>'
  + '</div>'

  + '<div class="ep-list">' + evidence + '</div>'

  + '<div class="ep-footer">'
  +   '<button class="btn '
  +     (selected >= needed ? '' : 'ghost')
  +   '" style="width:100%;justify-content:center" '
  +     (selected >= needed
  +       ? 'onclick="finalizeAccusation()"'
  +       : 'disabled')
  +   '>'
  +     svg('shield', 16) + ' Выдвинуть обвинение'
  +   '</button>'
  + '</div>');
}

function renderEvidenceSelect(id){
  const e = EVIDENCE_DB[id];
  if(!e) return '';
  const sel = G.accusation.evidence.indexOf(id) >= 0;
  const cat = EVIDENCE_CATS[e.cat] || {label: e.cat, ico: 'clue'};

  return ''
  + '<div class="ep-item' + (sel ? ' selected' : '') + '" '
  +   'onclick="toggleEvidenceSelect(\'' + id + '\')">'
  +   '<div class="epi-check">'
  +     (sel
  +       ? svg('checkCircle', 20)
  +       : svg('circle', 20, 'thin'))
  +   '</div>'
  +   '<div class="epi-body">'
  +     '<div class="epi-top">'
  +       svg(cat.ico, 11)
  +       '<span>' + cat.label + '</span>'
  +       (e.key
  +         ? '<span class="epi-key">' + svg('starFill', 10, 'fill') + '</span>'
  +         : '')
  +     '</div>'
  +     '<div class="epi-title">' + escapeHtml(e.t) + '</div>'
  +     '<div class="epi-src">' + escapeHtml(e.src) + '</div>'
  +   '</div>'
  + '</div>';
}

function toggleEvidenceSelect(id){
  const arr = G.accusation.evidence;
  const idx = arr.indexOf(id);
  if(idx >= 0){
    arr.splice(idx, 1);
  } else {
    if(arr.length >= 5){
      toast('Лимит', 'Можно предъявить максимум 5 улик', 'warn');
      return;
    }
    arr.push(id);
  }
  haptic(8);
  showEvidencePresentScreen();
}

/* ------------------------------------------------------------
   ФИНАЛИЗАЦИЯ ОБВИНЕНИЯ
   ------------------------------------------------------------ */
function finalizeAccusation(){
  const s = SUSPECTS.find(function(x){ return x.id === G.accusation.suspect; });
  if(!s) return;

  const presented = G.accusation.evidence;
  const needed = s.evidence_needed;

  const matches = presented.filter(function(id){
    return needed.indexOf(id) >= 0;
  });
  const ratio = needed.length ? matches.length / needed.length : 0;

  const correct = s.correct && matches.length >= s.min_evidence;

  G.flags.accusation_suspect = s.id;
  G.flags.accusation_correct = correct;
  G.flags.accusation_ratio = ratio;

  if(!correct){
    G.wrongAccusations++;
  }

  showVerdict(s, correct, matches, presented);
}

/* ------------------------------------------------------------
   ВЕРДИКТ
   ------------------------------------------------------------ */
function showVerdict(s, correct, matches, presented){
  const win = correct;

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Вердикт</h2></div>'
  + '</div>'

  + '<div class="verdict ' + (win ? 'win' : 'lose') + '">'

  +   '<div class="vd-icon">'
  +     (win
  +       ? svg('checkCircle', 60)
  +       : svg('close', 60))
  +   '</div>'

  +   '<div class="vd-label">'
  +     (win ? 'ОБВИНЕНИЕ ПРИНЯТО' : 'ОБВИНЕНИЕ ОТКЛОНЕНО')
  +   '</div>'

  +   '<h2>' + escapeHtml(s.name) + '</h2>'

  +   '<div class="vd-text">'
  +     (win
  +       ? 'Собранные улики неопровержимо доказывают вину. '
  +         'Суд принял обвинение. Дело закрыто.'
  +       : 'Предъявленных улик недостаточно. '
  +         'Суд не нашёл оснований для обвинения. '
  +         'Настоящий виновный остался на свободе.')
  +   '</div>'

  +   '<div class="vd-stats">'
  +     '<div>'
  +       '<b>' + matches.length + '</b>'
  +       '<span>улик совпало</span>'
  +     '</div>'
  +     '<div>'
  +       '<b>' + presented.length + '</b>'
  +       '<span>предъявлено</span>'
  +     '</div>'
  +   '</div>'

  +   '<div class="vd-actions">'
  +     (win
  +       ? '<button class="btn" style="width:100%;justify-content:center" '
  +         'onclick="go(\'finale\')">'
  +         svg('starFill', 16, 'fill') + ' Посмотреть финал'
  +         '</button>'
  +       : '<button class="btn ghost" style="width:100%;justify-content:center" '
  +         'onclick="goBack()">'
  +         svg('back', 16) + ' Вернуться'
  +         '</button>')
  +   '</div>'

  + '</div>');

  if(win){
    beep(880, 0.15);
    haptic([50, 100, 50]);
    addEv('case_closed');
    setFlag('case_closed');
  } else {
    beep(220, 0.2, 'sawtooth');
    haptic([30, 60, 30]);
  }
}

/* ============================================================
   БЛОК 4 — ФИНАЛ
   ============================================================ */

ROUTES.finale = function(){
  G.screen = 'finale';

  const correct = G.flags.accusation_correct;
  const suspect = G.flags.accusation_suspect;
  const s = SUSPECTS.find(function(x){ return x.id === suspect; });

  if(!correct){
    renderFinaleFail();
    return;
  }

  renderFinaleWin();
};

function renderFinaleWin(){
  /* Устанавливаем флаг концовки для системы ENDINGS (Часть 9) */
  setFlag('finale_good');

  render(''
  + '<div class="finale win">'

  +   '<div class="fin-hero">'
  +     '<div class="fin-ring">'
  +       svg('scale', 50)
  +     '</div>'
  +     '<div class="fin-label">ДЕЛО ЗАКРЫТО</div>'
  +     '<h2>№2024-0414</h2>'
  +     '<div class="fin-sub">«Последний сеанс»</div>'
  +   '</div>'

  +   '<div class="fin-text">'

  +     '<p>Виктор Павлович Соколовский признан виновным '
  +       'в совершении ДТП со смертельным исходом в 2019 году '
  +       'и в убийстве Марины Соколовой 14 апреля.</p>'

  +     '<p>Аудиозапись, найденная в её телефоне, стала '
  +       'неопровержимым доказательством. Запись приобщена к делу.</p>'

  +     '<p>Суд приговорил его к 20 годам лишения свободы '
  +       'с отбыванием наказания в колонии строгого режима.</p>'

  +     '<p>Тело Марины обнаружено в подсобном помещении '
  +       'павильона №3 киноателье «Сокол». '
  +       'Она похоронена рядом с братом Кириллом.</p>'

  +   '</div>'

  +   '<div class="fin-quote">'
  +     '<div class="fq-mark">«</div>'
  +     '<div class="fq-text">Она знала, что не вернётся. '
  +       'И всё равно оставила нам правду.</div>'
  +     '<div class="fq-author">— Из материалов дела</div>'
  +   '</div>'

  +   '<div class="fin-stats">'
  +     '<div class="fs-item">'
  +       '<b>' + G.evidence.length + '</b>'
  +       '<span>улик собрано</span>'
  +     '</div>'
  +     '<div class="fs-item">'
  +       '<b>' + G.notesRead + '</b>'
  +       '<span>заметок прочитано</span>'
  +     '</div>'
  +     '<div class="fs-item">'
  +       '<b>' + G.photosViewed + '</b>'
  +       '<span>фото изучено</span>'
  +     '</div>'
  +     '<div class="fs-item">'
  +       '<b>' + G.notesRead + G.photosViewed + '</b>'
  +       '<span>всего</span>'
  +     '</div>'
  +   '</div>'

  +   '<div class="fin-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="go(\'home\')">'
  +       svg('home', 16) + ' На главный'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="shareFinale()">'
  +       svg('share', 16) + ' Поделиться'
  +     '</button>'
  +   '</div>'

  +   '<div class="fin-credits">'
  +     'Спасибо, что дошли до конца.<br>'
  +     'Дело №2024-0414 закрыто.'
  +   '</div>'

  + '</div>');

  beep(660, 0.3);
  setTimeout(function(){ beep(880, 0.3); }, 300);
  setTimeout(function(){ beep(1100, 0.4); }, 600);
}

function renderFinaleFail(){
  /* Устанавливаем флаг концовки для системы ENDINGS (Часть 9) */
  setFlag('finale_bad');

  render(''
  + '<div class="finale lose">'

  +   '<div class="fin-hero">'
  +     '<div class="fin-ring fail">'
  +       svg('alert', 50)
  +     '</div>'
  +     '<div class="fin-label fail">ДЕЛО НЕ РАСКРЫТО</div>'
  +     '<h2>№2024-0414</h2>'
  +     '<div class="fin-sub">«Последний сеанс»</div>'
  +   '</div>'

  +   '<div class="fin-text">'
  +     '<p>Суд не нашёл достаточных оснований для обвинения.</p>'
  +     '<p>Виктор Павлович Соколовский был освобождён '
  +       'в зале суда. Через год он вышел на пенсию. '
  +       'Через два — уехал из страны.</p>'
  +     '<p>Дело №2024-0414 осталось нераскрытым. '
  +       'Марина Соколова не дождалась справедливости.</p>'
  +   '</div>'

  +   '<div class="fin-quote fail">'
  +     '<div class="fq-text">Иногда правда проигрывает. '
  +       'В этот раз — она проиграла.</div>'
  +   '</div>'

  +   '<div class="fin-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="go(\'home\')">'
  +       svg('home', 16) + ' На главный'
  +     '</button>'
  +     '<button class="btn danger" style="flex:1;justify-content:center" '
  +       'onclick="restartCase()">'
  +       svg('refresh', 16) + ' Попробовать снова'
  +     '</button>'
  +   '</div>'

  +   '<div class="fin-credits">'
  +     'Всегда можно попробовать ещё раз.'
  +   '</div>'

  + '</div>');
}

function shareFinale(){
  const text = 'Я раскрыл дело №2024-0414 «Последний сеанс». '
    + 'Улик собрано: ' + G.evidence.length + '. '
    + 'Виновный наказан.';
  if(navigator.share){
    navigator.share({title: 'Дело №2024-0414', text: text}).catch(function(){});
  } else {
    try{
      navigator.clipboard.writeText(text);
      toast('Скопировано', 'Результат скопирован в буфер', 'ok');
    } catch(e){
      toast('Результат', text, 'ok');
    }
  }
}

function restartCase(){
  if(confirm('Начать заново? Весь прогресс будет утерян.')){
    wipeSave();
    try{ localStorage.removeItem(SAVE_SLOTS_KEY); } catch(e){}
    location.reload();
  }
}

/* ============================================================
   БЛОК 5 — РАСШИРЕНИЕ СЛОВАРЯ УЛИК
   ============================================================ */
(function extendTitlesPart6(){
  const extra = {
    case_closed: 'Дело закрыто'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   БЛОК 6 — ДОБАВЛЕНИЕ КНОПКИ ОБВИНЕНИЯ НА ГЛАВНЫЙ ЭКРАН
   ============================================================ */

(function addAccusationApp(){
  if(typeof APPS !== 'undefined'){
    const has = APPS.some(function(a){ return a.id === 'accusation'; });
    if(!has){
      APPS.push({
        id: 'accusation',
        ic: 'scale',
        lbl: 'Обвинение'
      });
    }
  }
})();

(function patchOpenApp(){
  const orig = window.openApp;
  window.openApp = function(id){
    if(id === 'accusation'){
      return go('accusation');
    }
    if(id === 'interrogation'){
      return go('interrogation');
    }
    if(orig) return orig(id);
  };
})();

/* ============================================================
   БЛОК 7 — CSS ДЛЯ ЧАСТИ 6
   ============================================================ */
(function injectPart6Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  + '.ir-done-stack{'
  +   'display:flex;flex-direction:column;'
  +   'align-items:center;gap:2px;'
  + '}'
  + '.ir-done-stack .ir-done{'
  +   'display:flex;color:var(--ok);'
  + '}'
  + '.ir-score{'
  +   'font-size:10px;color:var(--dim);'
  +   'font-family:monospace;'
  + '}'

  + '.acc-warning{'
  +   'display:flex;gap:12px;padding:14px 16px;'
  +   'background:rgba(255,184,77,.08);'
  +   'border:1px solid rgba(255,184,77,.25);'
  +   'border-radius:12px;margin:14px 16px 18px;'
  + '}'
  + '.aw-icon{'
  +   'width:32px;height:32px;flex:0 0 32px;'
  +   'border-radius:8px;'
  +   'background:rgba(255,184,77,.14);'
  +   'color:var(--warn);'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.aw-text{flex:1;min-width:0}'
  + '.aw-text b{'
  +   'display:block;font-size:11.5px;color:var(--warn);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  +   'margin-bottom:4px;'
  + '}'
  + '.aw-text span{'
  +   'font-size:12px;color:var(--txt2);line-height:1.55;'
  + '}'

  + '.sus-list{padding:0 0 30px}'
  + '.sus-row{'
  +   'display:flex;gap:13px;padding:14px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.sus-row:hover{background:var(--panel2)}'
  + '.sr-avatar{'
  +   'width:50px;height:50px;border-radius:50%;flex:0 0 50px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:17px;font-weight:600;color:#fff;'
  + '}'
  + '.sr-body{flex:1;min-width:0}'
  + '.sr-name{font-size:14px;font-weight:600;margin-bottom:2px}'
  + '.sr-role{font-size:11.5px;color:var(--dim)}'
  + '.sus-row .icon{color:var(--dim2);flex:0 0 auto}'

  + '.acc-confirm{padding:34px 24px;text-align:center}'
  + '.ac-avatar{'
  +   'width:90px;height:90px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:30px;font-weight:600;color:#fff;'
  + '}'
  + '.acc-confirm h2{'
  +   'font-size:19px;font-weight:600;margin-bottom:6px;'
  + '}'
  + '.ac-role{'
  +   'font-size:12.5px;color:var(--dim);margin-bottom:24px;'
  + '}'
  + '.ac-question{'
  +   'font-size:14px;color:var(--txt2);line-height:1.65;'
  +   'padding:18px 20px;'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:14px;margin-bottom:24px;'
  + '}'
  + '.ac-actions{display:flex;gap:10px}'

  + '.ep-head{'
  +   'display:flex;gap:14px;align-items:center;'
  +   'padding:16px 18px;'
  +   'background:var(--panel2);'
  +   'border-bottom:1px solid var(--line);'
  + '}'
  + '.ep-avatar{'
  +   'width:44px;height:44px;border-radius:50%;flex:0 0 44px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:15px;font-weight:600;color:#fff;'
  + '}'
  + '.ep-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.55;'
  + '}'
  + '.ep-text b{color:var(--acc)}'

  + '.ep-list{padding:14px 12px 20px;display:flex;flex-direction:column;gap:8px}'
  + '.ep-item{'
  +   'display:flex;gap:12px;'
  +   'padding:12px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;cursor:pointer;'
  +   'transition:.14s;'
  + '}'
  + '.ep-item:hover{border-color:var(--line2)}'
  + '.ep-item.selected{'
  +   'background:rgba(93,169,255,.08);'
  +   'border-color:var(--acc);'
  + '}'
  + '.epi-check{'
  +   'flex:0 0 22px;color:var(--dim2);'
  +   'display:flex;align-items:flex-start;'
  +   'padding-top:2px;'
  + '}'
  + '.ep-item.selected .epi-check{color:var(--acc)}'
  + '.epi-body{flex:1;min-width:0}'
  + '.epi-top{'
  +   'display:flex;align-items:center;gap:5px;'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1.2px;text-transform:uppercase;'
  +   'margin-bottom:4px;'
  + '}'
  + '.epi-key{color:var(--warn)}'
  + '.epi-title{'
  +   'font-size:13px;font-weight:600;'
  +   'margin-bottom:3px;line-height:1.35;'
  + '}'
  + '.epi-src{font-size:10.5px;color:var(--dim2)}'

  + '.ep-footer{'
  +   'padding:14px 16px 24px;'
  +   'position:sticky;bottom:0;'
  +   'background:linear-gradient(180deg,transparent,var(--bg) 40%);'
  + '}'
  + '.ep-footer .btn:disabled{'
  +   'opacity:.4;cursor:not-allowed;'
  + '}'

  + '.verdict{padding:40px 24px;text-align:center}'
  + '.vd-icon{'
  +   'width:110px;height:110px;border-radius:50%;'
  +   'margin:0 auto 20px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:2px solid;'
  + '}'
  + '.verdict.win .vd-icon{'
  +   'color:var(--ok);border-color:var(--ok);'
  +   'background:rgba(61,220,151,.08);'
  +   'box-shadow:0 0 60px rgba(61,220,151,.35);'
  + '}'
  + '.verdict.lose .vd-icon{'
  +   'color:var(--danger);border-color:var(--danger);'
  +   'background:rgba(255,90,110,.08);'
  +   'box-shadow:0 0 60px rgba(255,90,110,.35);'
  + '}'
  + '.vd-label{'
  +   'font-size:11px;letter-spacing:3px;'
  +   'text-transform:uppercase;font-weight:700;'
  +   'margin-bottom:12px;'
  + '}'
  + '.verdict.win .vd-label{color:var(--ok)}'
  + '.verdict.lose .vd-label{color:var(--danger)}'
  + '.verdict h2{'
  +   'font-size:18px;font-weight:600;margin-bottom:16px;'
  + '}'
  + '.vd-text{'
  +   'font-size:13px;color:var(--txt2);line-height:1.7;'
  +   'max-width:300px;margin:0 auto 24px;'
  + '}'
  + '.vd-stats{'
  +   'display:flex;gap:28px;justify-content:center;'
  +   'margin-bottom:28px;'
  + '}'
  + '.vd-stats > div{'
  +   'display:flex;flex-direction:column;align-items:center;gap:3px;'
  + '}'
  + '.vd-stats b{font-size:22px;font-weight:600}'
  + '.vd-stats span{font-size:10.5px;color:var(--dim);letter-spacing:.5px}'

  + '.finale{'
  +   'min-height:100%;'
  +   'display:flex;flex-direction:column;'
  +   'padding:44px 24px 32px;'
  +   'text-align:center;'
  + '}'
  + '.fin-hero{margin-bottom:26px}'
  + '.fin-ring{'
  +   'width:110px;height:110px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(61,220,151,.2) 0%, '
  +   'rgba(61,220,151,.05) 60%, transparent 100%);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--ok);'
  +   'border:2px solid rgba(61,220,151,.4);'
  +   'box-shadow:0 0 60px rgba(61,220,151,.25);'
  + '}'
  + '.fin-ring.fail{'
  +   'color:var(--danger);'
  +   'border-color:rgba(255,90,110,.4);'
  +   'background:radial-gradient(circle, '
  +   'rgba(255,90,110,.15), transparent 70%);'
  +   'box-shadow:0 0 60px rgba(255,90,110,.2);'
  + '}'
  + '.fin-label{'
  +   'font-size:11px;color:var(--ok);'
  +   'letter-spacing:4px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  + '}'
  + '.fin-label.fail{color:var(--danger)}'
  + '.fin-hero h2{'
  +   'font-size:26px;font-weight:200;'
  +   'letter-spacing:2px;margin-bottom:4px;'
  + '}'
  + '.fin-sub{'
  +   'font-size:13px;color:var(--acc);'
  +   'letter-spacing:1px;font-style:italic;'
  + '}'
  + '.fin-text{'
  +   'text-align:left;font-size:13.5px;color:var(--txt2);'
  +   'line-height:1.75;margin-bottom:24px;'
  + '}'
  + '.fin-text p{margin-bottom:14px}'
  + '.fin-quote{'
  +   'padding:20px 22px;'
  +   'background:var(--panel2);'
  +   'border-left:3px solid var(--ok);'
  +   'border-radius:10px;'
  +   'text-align:left;margin-bottom:24px;'
  + '}'
  + '.fin-quote.fail{border-left-color:var(--danger)}'
  + '.fq-mark{'
  +   'font-size:40px;color:var(--ok);'
  +   'line-height:.5;margin-bottom:8px;'
  +   'font-family:Georgia,serif;'
  + '}'
  + '.fq-text{'
  +   'font-size:13px;color:var(--txt);'
  +   'font-style:italic;line-height:1.65;'
  +   'margin-bottom:8px;'
  + '}'
  + '.fq-author{'
  +   'font-size:11px;color:var(--dim);'
  +   'letter-spacing:.5px;'
  + '}'
  + '.fin-stats{'
  +   'display:grid;grid-template-columns:repeat(2,1fr);'
  +   'gap:10px;margin-bottom:24px;'
  + '}'
  + '.fs-item{'
  +   'padding:12px 14px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'display:flex;flex-direction:column;gap:3px;'
  + '}'
  + '.fs-item b{'
  +   'font-size:20px;font-weight:600;color:var(--acc);'
  + '}'
  + '.fs-item span{'
  +   'font-size:10.5px;color:var(--dim);'
  +   'letter-spacing:.3px;'
  + '}'
  + '.fin-actions{'
  +   'display:flex;gap:10px;margin-bottom:20px;'
  + '}'
  + '.fin-credits{'
  +   'font-size:11px;color:var(--dim2);'
  +   'line-height:1.65;letter-spacing:.4px;'
  +   'margin-top:auto;'
  + '}';

  document.head.appendChild(style);
})();

/* ============================================================
   БЛОК 8 — ДОБАВЛЕНИЕ ИКОНКИ HOME В БИБЛИОТЕКУ
   ============================================================ */
(function addHomeIcon(){
  if(typeof ICON_PATHS === 'undefined') return;
  if(!ICON_PATHS.home){
    ICON_PATHS.home =
      '<path d="M3 10.5 12 3l9 7.5"/>' +
      '<path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"/>' +
      '<path d="M9.5 21v-6h5v6"/>';
  }
  if(!ICON_PATHS.circle){
    ICON_PATHS.circle = '<circle cx="12" cy="12" r="9.5"/>';
  }
})();

console.log(
  '%c[ЧАСТЬ 6 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nДопросы: 7 подозреваемых. Обвинение: 6 вариантов. Финал: 2 концовки. Вставляй Часть 7 ниже.'
);

/* ... Часть 6 заканчивается здесь. Не закрывай script/body/html.
   Часть 7 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 7 из 10 — МЕДИАТЕКА
   ------------------------------------------------------------
   Новое приложение «Медиатека» с тремя разделами:
   - ВИДЕО: 12 видеозаписей (регистратор, камеры, хроника)
   - АУДИО: 10 аудиозаписей (голосовые, звонки, признание)
   - КАДРЫ: покадровый разбор ключевой записи
   ============================================================ */

/* ============================================================
   БЛОК 1 — БАЗА ВИДЕОЗАПИСЕЙ
   ============================================================ */

const VIDEOS = {

  v1: {
    t: 'Регистратор · момент удара',
    sub: '14.09.2019 · 02:14',
    dur: '0:23',
    src: 'Анонимная передача',
    tag: 'ключевое',
    ico: 'filmPlay',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'photo_reg',
    flag: 'saw_video_reg',
    desc:
      'Ночь. Мокрый асфальт. Фары встречной машины. '
      + 'Мотоцикл выезжает на перекрёсток. Тёмный седан '
      + 'не сбрасывает скорость. Удар. Мотоцикл исчезает '
      + 'из кадра. Номер седана не читается полностью — '
      + 'видны последние три цифры: 7, 4, 2.',
    frames: [
      {t: '00:00', d: 'Ночная трасса. Пустая. Мокрый асфальт. Свет от фар.'},
      {t: '00:05', d: 'В кадре появляется мотоцикл. Он едет с правой стороны.'},
      {t: '00:09', d: 'Встречный свет — из-за поворота выходит тёмный автомобиль.'},
      {t: '00:12', d: 'Седан не сбрасывает скорость. Мотоцикл пытается уйти влево.'},
      {t: '00:14', d: 'УДАР. Мотоцикл отбрасывает к обочине.'},
      {t: '00:16', d: 'Седан продолжает движение. Номер виден частично: ••7 •• 74 2.'},
      {t: '00:19', d: 'Машина уходит за кадр. Дым. Осколки.'},
      {t: '00:23', d: 'Конец записи. Тёмный кадр.'}
    ]
  },

  v2: {
    t: 'Камера 47-го км · обзор',
    sub: '14.09.2019 · 02:10',
    dur: '0:45',
    src: 'Архив ГИБДД',
    tag: 'документ',
    ico: 'video',
    color: '#5da9ff',
    color2: '#3d7cd4',
    ev: 'search_cameras',
    flag: 'saw_video_cam47',
    desc:
      'Запись с дорожной камеры. Виден участок трассы за 4 минуты '
      + 'до аварии. В кадре проезжает одинокая чёрная машина с '
      + 'характерным силуэтом. Она едет с высокой скоростью.',
    frames: [
      {t: '00:00', d: 'Пустая трасса. Ночь. Фонари.'},
      {t: '00:15', d: 'Слева появляется тёмный седан. Он едет быстро.'},
      {t: '00:22', d: 'Машина скрывается за поворотом.'},
      {t: '00:38', d: 'Трасса пуста. Ничего не происходит.'},
      {t: '00:45', d: 'Конец записи.'}
    ]
  },

  v3: {
    t: 'Кинотеатр · показ',
    sub: '13.04.2024 · 21:52',
    dur: '2:14',
    src: 'Камера у входа',
    tag: 'связь',
    ico: 'film',
    color: '#8b6dff',
    color2: '#5a3dbb',
    ev: 'photo_hall',
    flag: 'saw_video_show',
    desc:
      'Запись с камеры наблюдения у входа в кинотеатр. '
      + 'Видно, как Марина выходит из зала через служебный вход '
      + 'в 22:20. С ней — мужчина в тёмном пальто. Лица не видно. '
      + 'Они садятся в тёмную машину и уезжают.',
    frames: [
      {t: '21:52', d: 'Зрители заходят в зал. Марина в чёрном платье.'},
      {t: '22:05', d: 'Из служебного входа выходит высокий мужчина.'},
      {t: '22:18', d: 'Мужчина смотрит на телефон. Ждёт.'},
      {t: '22:20', d: 'Марина выходит. Он берёт её под локоть.'},
      {t: '22:22', d: 'Они садятся в тёмную машину у тротуара.'},
      {t: '22:24', d: 'Машина уезжает в сторону Заводской.'},
      {t: '22:31', d: 'Лена выбегает на улицу. Оглядывается.'}
    ]
  },

  v4: {
    t: 'Ателье «Сокол» · внешняя',
    sub: '13.04.2024 · 22:40',
    dur: '1:32',
    src: 'Камера у входа',
    tag: 'ателье',
    ico: 'video',
    color: '#7a869c',
    color2: '#4d576b',
    ev: 'photo_figure',
    flag: 'saw_video_studio',
    desc:
      'Камера у входа в киноателье. Видно, как тёмная машина '
      + 'подъезжает к воротам. Из неё выходит мужчина в пальто. '
      + 'Через минуту подъезжает такси. Выходит Марина. '
      + 'Она смотрит на телефон и идёт ко входу.',
    frames: [
      {t: '22:40', d: 'Тёмная машина подъезжает к ателье. Мужчина выходит.'},
      {t: '22:42', d: 'Он открывает ворота и входит внутрь.'},
      {t: '23:44', d: 'Такси подъезжает к воротам.'},
      {t: '23:45', d: 'Марина выходит. На ней лёгкое пальто.'},
      {t: '23:46', d: 'Она смотрит на телефон. Что-то печатает.'},
      {t: '23:47', d: 'Марина входит в ателье.'}
    ]
  },

  v5: {
    t: 'Ателье · внутренняя камера',
    sub: '13.04.2024 · 23:48',
    dur: '0:54',
    src: 'Камера в фойе',
    tag: 'ключевое',
    ico: 'filmPlay',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'photo_key',
    flag: 'saw_video_hall',
    critical: true,
    desc:
      'Камера в фойе киноателье. Марина входит в 23:48. '
      + 'Администратор передаёт ей ключ. Марина идёт по коридору '
      + 'в сторону павильона №3. Больше в кадре не появляется.',
    frames: [
      {t: '23:48', d: 'Марина входит в фойе.'},
      {t: '23:49', d: 'Администратор смотрит на неё. Что-то говорит.'},
      {t: '23:50', d: 'Администратор протягивает ключ.'},
      {t: '23:51', d: 'Марина кивает. Идёт в сторону лестницы.'},
      {t: '23:52', d: 'Она поднимается по лестнице.'},
      {t: '23:54', d: 'В кадре больше никого нет. Проходит ещё 45 секунд.'}
    ]
  },

  v6: {
    t: 'Ателье · камера у павильона',
    sub: '13.04.2024 · 23:55',
    dur: '3:12',
    src: 'Камера 2-го этажа',
    tag: 'ключевое',
    ico: 'filmPlay',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'photo_last',
    flag: 'saw_video_pavilion',
    critical: true,
    desc:
      'Камера на втором этаже. Марина идёт к павильону №3. '
      + 'Открывает дверь ключом. Внутри горит свет. '
      + 'Перед входом она оборачивается. Замирает на секунду. '
      + 'Заходит внутрь. Дверь закрывается.',
    frames: [
      {t: '23:55', d: 'Марина идёт по коридору второго этажа.'},
      {t: '23:56', d: 'Останавливается у двери павильона №3.'},
      {t: '23:56', d: 'Открывает замок ключом.'},
      {t: '23:57', d: 'Оборачивается. Смотрит в конец коридора.'},
      {t: '23:57', d: 'Она замирает на секунду. Кого-то видит?'},
      {t: '23:58', d: 'Заходит внутрь. Дверь закрывается.'},
      {t: '00:41', d: 'Дверь открывается. Из павильона выходит мужчина.'},
      {t: '00:42', d: 'Он быстро идёт к лестнице. В руке длинный предмет.'},
      {t: '00:45', d: 'Мужчина спускается. Марины за ним нет.'},
      {t: '01:32', d: 'В кадре больше никого не появляется.'}
    ]
  },

  v7: {
    t: 'Ателье · выход',
    sub: '14.04.2024 · 00:47',
    dur: '0:36',
    src: 'Камера у выезда',
    tag: 'ключевое',
    ico: 'filmPlay',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'photo_figure',
    flag: 'saw_video_exit',
    critical: true,
    desc:
      'Камера у выезда из ателье. Выходит мужчина в тёмном пальто. '
      + 'В руке — длинный предмет, завёрнутый в тёмную ткань. '
      + 'Он идёт уверенно. Садится в машину. Уезжает.',
    frames: [
      {t: '00:47', d: 'Дверь открывается. Выходит мужчина.'},
      {t: '00:48', d: 'Освещение слабое. Лицо не видно.'},
      {t: '00:50', d: 'В правой руке — длинный предмет.'},
      {t: '00:52', d: 'Мужчина идёт к машине. Походка уверенная.'},
      {t: '00:55', d: 'Открывает багажник. Кладёт предмет внутрь.'},
      {t: '01:00', d: 'Садится за руль. Уезжает.'},
      {t: '01:23', d: 'Ворота закрываются.'}
    ]
  },

  v8: {
    t: 'Ателье · утро',
    sub: '14.04.2024 · 08:10',
    dur: '1:05',
    src: 'Камера у входа',
    tag: 'ателье',
    ico: 'video',
    color: '#ffb84d',
    color2: '#b07a20',
    ev: 'photo_blood',
    flag: 'saw_video_morning',
    desc:
      'Утро следующего дня. Тот же мужчина возвращается. '
      + 'Он заходит в ателье с сумкой. Открывает ключом вход. '
      + 'Через 22 минуты выходит. Вид спокойный, как будто '
      + 'ничего не произошло. Сумка теперь заметно тяжелее.',
    frames: [
      {t: '08:10', d: 'Мужчина подходит к ателье. В руке сумка.'},
      {t: '08:11', d: 'Открывает ворота ключом.'},
      {t: '08:12', d: 'Заходит внутрь. Ворота закрываются.'},
      {t: '08:34', d: 'Ворота открываются. Мужчина выходит.'},
      {t: '08:34', d: 'Сумка в руках — тяжелее.'},
      {t: '08:35', d: 'Он садится в машину. Уезжает.'}
    ]
  },

  v9: {
    t: 'Квартира Марины · подъезд',
    sub: '12.04.2024 · 17:10',
    dur: '0:48',
    src: 'Камера в подъезде',
    tag: 'связь',
    ico: 'video',
    color: '#5da9ff',
    color2: '#3d7cd4',
    ev: 'sonya_timeline',
    flag: 'saw_video_door',
    desc:
      'Камера в подъезде дома Марины. Соня выходит с чемоданом. '
      + 'Марина машет ей из двери. Дверь закрывается. '
      + 'Больше Марина через эту дверь не выйдет.',
    frames: [
      {t: '17:10', d: 'Соня выходит из квартиры с чемоданом.'},
      {t: '17:11', d: 'Марина стоит в дверях. Что-то говорит.'},
      {t: '17:12', d: 'Они обнимаются.'},
      {t: '17:13', d: 'Соня уходит к лифту.'},
      {t: '17:15', d: 'Марина закрывает дверь. Больше не выходит.'}
    ]
  },

  v10: {
    t: 'Улица Заводская · ночь',
    sub: '13.04.2024 · 23:44',
    dur: '0:52',
    src: 'Городская камера',
    tag: 'связь',
    ico: 'video',
    color: '#8b6dff',
    color2: '#5a3dbb',
    ev: 'note_key',
    flag: 'saw_video_street',
    desc:
      'Камера на улице Заводской. Такси подъезжает к киноателье. '
      + 'Из него выходит Марина. Она оглядывается. Набирает '
      + 'что-то на телефоне. Заходит за ворота.',
    frames: [
      {t: '23:44', d: 'Такси подъезжает. Жёлтая машина.'},
      {t: '23:45', d: 'Марина выходит. Расплачивается через приложение.'},
      {t: '23:46', d: 'Смотрит по сторонам. Никого нет.'},
      {t: '23:46', d: 'Достаёт телефон. Что-то печатает.'},
      {t: '23:47', d: 'Заходит за ворота ателье.'},
      {t: '23:48', d: 'Такси уезжает. Улица пуста.'}
    ]
  },

  v11: {
    t: 'Парковка академии · день',
    sub: '11.04.2024 · 15:38',
    dur: '1:18',
    src: 'Камера на парковке',
    tag: 'улика',
    ico: 'video',
    color: '#3ddc97',
    color2: '#1f9b6a',
    ev: 'photo_car',
    flag: 'saw_video_parking',
    desc:
      'Парковка у академии. Тёмный седан въезжает на парковку. '
      + 'Из него выходит мужчина. Он идёт к главному входу. '
      + 'В его руке — папка с бумагами. Он не оглядывается.',
    frames: [
      {t: '15:38', d: 'Тёмная машина въезжает на парковку.'},
      {t: '15:39', d: 'Припарковалась на дальнем месте.'},
      {t: '15:41', d: 'Водитель выходит. Высокий мужчина.'},
      {t: '15:42', d: 'Он идёт к главному входу академии.'},
      {t: '15:44', d: 'В руке папка с бумагами.'},
      {t: '15:46', d: 'Входит в здание.'},
      {t: '16:56', d: 'Возвращается, садится в машину. Уезжает.'}
    ]
  },

  v12: {
    t: 'Показ · фрагмент',
    sub: '13.04.2024 · 22:10',
    dur: '3:45',
    src: 'Запись со смартфона',
    tag: 'показ',
    ico: 'filmPlay',
    color: '#ffb84d',
    color2: '#b07a20',
    ev: 'photo_hall',
    flag: 'saw_video_screening',
    desc:
      'Любительская запись с телефона кого-то из зала. Показ '
      + 'второй части фильма. Кадр с номером машины на экране. '
      + 'В первом ряду поднимается мужчина. Выходит из зала. '
      + 'Через минуту выходит и Марина.',
    frames: [
      {t: '22:10', d: 'Экран. Кадр с записи регистратора.'},
      {t: '22:11', d: 'В кадре крупным планом номер: ••7 •• 74 2.'},
      {t: '22:11', d: 'В первом ряду поднимается мужчина.'},
      {t: '22:12', d: 'Он выходит из зала. Не оглядывается.'},
      {t: '22:18', d: 'За ним поднимается Марина.'},
      {t: '22:19', d: 'Она смотрит на его место. Потом на выход.'},
      {t: '22:20', d: 'Она выходит из зала.'}
    ]
  }

};

/* ============================================================
   БЛОК 2 — БАЗА АУДИОЗАПИСЕЙ
   ============================================================ */

const AUDIO_RECORDINGS = {

  a1: {
    t: 'Голосовое от неизвестного',
    sub: '12.04.2024 · 23:44',
    dur: '0:19',
    src: 'Сообщения · Неизвестный',
    tag: 'угроза',
    ico: 'mic',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'threat_voice',
    flag: 'heard_threat_voice',
    critical: true,
    transcript: [
      {t: '00:00', who: '—', text: '[шум. щелчок. соединение.]'},
      {t: '00:02', who: 'Голос', text: 'Марина Андреевна.'},
      {t: '00:05', who: 'Голос', text: 'Последнее предупреждение.'},
      {t: '00:09', who: 'Голос', text: 'Откажись от показа. Или...'},
      {t: '00:13', who: '—', text: '[пауза 3 сек.]'},
      {t: '00:16', who: 'Голос', text: 'Мы знаем, где ты живёшь.'},
      {t: '00:19', who: '—', text: '[гудки.]'}
    ],
    note: 'Голос изменён. Но обработка плохая — слышны '
      + 'характерные паузы и дыхание. Мужской, низкий. Возможно, '
      + 'прикрывались приложением, но не профессиональным.'
  },

  a2: {
    t: 'Голосовое · второй звонок',
    sub: '11.04.2024 · 03:14',
    dur: '0:42',
    src: 'Номер скрыт',
    tag: 'угроза',
    ico: 'mic',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'threat_voice',
    flag: 'heard_threat_voice2',
    transcript: [
      {t: '00:00', who: '—', text: '[шум.]'},
      {t: '00:03', who: 'Голос', text: 'Ты копаешь не там.'},
      {t: '00:08', who: 'Голос', text: 'Кирилл. Кольцевая. 2019.'},
      {t: '00:15', who: 'Марина', text: 'Кто вы?'},
      {t: '00:18', who: 'Голос', text: 'Оставь прошлое в покое.'},
      {t: '00:24', who: 'Голос', text: 'У тебя вся жизнь впереди.'},
      {t: '00:31', who: 'Марина', text: 'Вы знаете, кто это сделал?'},
      {t: '00:36', who: 'Голос', text: 'Я знаю, что бывает с теми, кто спрашивает.'},
      {t: '00:42', who: '—', text: '[гудки.]'}
    ],
    note: 'Этот голос звучит иначе — менее обработан. '
      + 'Дыхание слышно лучше. Возможно, говорил вживую. '
      + 'Или это другой человек.'
  },

  a3: {
    t: 'Разговор Марины и Лены',
    sub: '13.04.2024 · 22:31',
    dur: '3:40',
    src: 'Исходящий звонок',
    tag: 'свидетель',
    ico: 'phone',
    color: '#e05c7a',
    color2: '#9c2f4d',
    ev: 'chat_lena',
    flag: 'heard_lena_call',
    critical: true,
    transcript: [
      {t: '00:00', who: 'Марина', text: 'Лена. Это я.'},
      {t: '00:03', who: 'Лена', text: 'Мариш, ты где?? Я тебя обыскалась!'},
      {t: '00:07', who: 'Марина', text: 'Я уезжаю. Мне нужно кое-кого встретить.'},
      {t: '00:12', who: 'Лена', text: 'Кого? Ты в порядке?'},
      {t: '00:15', who: 'Марина', text: 'Это по делу Кирилла.'},
      {t: '00:20', who: 'Лена', text: 'Господи. Не одна поезжай. Возьми меня.'},
      {t: '00:28', who: 'Марина', text: 'Нельзя. Он сказал, чтобы я была одна.'},
      {t: '00:35', who: 'Лена', text: 'Марина, кто «он»?'},
      {t: '00:38', who: 'Марина', text: 'Если что-то случится — папка «Кирилл». Пароль ты знаешь.'},
      {t: '00:45', who: 'Лена', text: 'Марин, не смей. Слышишь? Не смей.'},
      {t: '00:52', who: 'Марина', text: 'Я перезвоню. Через час.'},
      {t: '00:55', who: 'Марина', text: 'Люблю тебя.'},
      {t: '01:00', who: '—', text: '[гудки.]'},
      {t: '01:03', who: '—', text: '[тишина до конца записи.]'}
    ],
    note: 'Последний звонок Марины. Она понимала, что едет '
      + 'на опасную встречу. Но не сказала, к кому и куда. '
      + 'Похоже, хотела защитить Лену от участия.'
  },

  a4: {
    t: '🎧 АУДИО ПРИЗНАНИЯ',
    sub: '14.04.2024 · 00:41',
    dur: '0:41',
    src: 'Заметки · Диктофон',
    tag: 'ключевое',
    ico: 'mic',
    color: '#ff5a6e',
    color2: '#a8283d',
    ev: 'note_audio',
    flag: 'heard_audio',
    critical: true,
    final: true,
    transcript: [
      {t: '00:00', who: '—', text: '[шум. дверь. шаги.]'},
      {t: '00:03', who: 'Марина', text: 'Виктор Павлович, вы... вы зачем привезли оригинал сюда?'},
      {t: '00:09', who: 'Виктор', text: 'Чтобы никто не нашёл. Ни ты, ни они.'},
      {t: '00:14', who: 'Марина', text: 'Что вы... отпустите.'},
      {t: '00:18', who: 'Виктор', text: 'Ты не понимаешь, Марина. Я не хотел.'},
      {t: '00:22', who: 'Виктор', text: 'Тогда, на трассе. Я не видел его. Он выскочил.'},
      {t: '00:29', who: 'Марина', text: 'Так это были вы. Всё это время.'},
      {t: '00:33', who: 'Виктор', text: 'Я уберу плёнку. И ты забудешь.'},
      {t: '00:37', who: 'Марина', text: 'Не подходите. Я записываю. Всё записывается.'},
      {t: '00:42', who: 'Виктор', text: 'Тогда придётся... убрать и телефон.'},
      {t: '00:47', who: '—', text: '[шум. удар. короткий вскрик.]'},
      {t: '00:51', who: '—', text: '[тишина.]'},
      {t: '00:55', who: '—', text: '[конец записи.]'}
    ],
    note: 'Ключевая улика. Голос Виктора Павловича идентифицирован. '
      + 'Запись признана подлинной. Приобщена к делу №2024-0414.'
  },

  a5: {
    t: 'Разговор с Артёмом',
    sub: '12.04.2024 · 21:40',
    dur: '8 сек',
    src: 'Входящий звонок',
    tag: 'связь',
    ico: 'phone',
    color: '#ff8a5c',
    color2: '#b05230',
    ev: 'artem_alibi',
    flag: 'heard_artem_call',
    transcript: [
      {t: '00:00', who: 'Артём', text: 'Марин, я уехал. К брату.'},
      {t: '00:03', who: 'Марина', text: 'Хорошо.'},
      {t: '00:05', who: 'Артём', text: 'Позвони, когда... ну, когда решишь.'},
      {t: '00:08', who: '—', text: '[гудки.]'}
    ],
    note: 'Короткий. Артём был расстроен. Но не угрожал.'
  },

  a6: {
    t: 'Разговор с Димой',
    sub: '11.04.2024 · 19:47',
    dur: '0:32',
    src: 'Пропущенный',
    tag: 'связь',
    ico: 'phoneMissed',
    color: '#5da9ff',
    color2: '#3d7cd4',
    ev: 'dima_stalk',
    flag: 'heard_dima_call',
    transcript: [
      {t: '00:00', who: '—', text: '[голосовое сообщение]'},
      {t: '00:02', who: 'Дима', text: 'Марина. Я видел тебя сегодня. С мужиком.'},
      {t: '00:10', who: 'Дима', text: 'Кто это? Ты меня слышишь?'},
      {t: '00:17', who: 'Дима', text: 'Если ты ушла к нему — скажи честно.'},
      {t: '00:25', who: 'Дима', text: 'Я не отпущу. Слышишь? Не отпущу.'},
      {t: '00:32', who: '—', text: '[конец]'}
    ],
    note: 'Угроза в мягкой форме. Но Дима не убийца. '
      + 'Он просто ревнивый и глупый.'
  },

  a7: {
    t: 'Разговор с Крыловым',
    sub: '08.04.2024 · 15:00',
    dur: '2:15',
    src: 'Входящий · рабочий',
    tag: 'связь',
    ico: 'phone',
    color: '#c8d1e2',
    color2: '#7a869c',
    ev: 'note_krylov_offer',
    flag: 'heard_krylov_call',
    critical: true,
    transcript: [
      {t: '00:00', who: 'Крылов', text: 'Марина Андреевна, здравствуйте.'},
      {t: '00:04', who: 'Марина', text: 'Здравствуйте.'},
      {t: '00:06', who: 'Крылов', text: 'Мне рекомендовали вас. Я видел ваш фильм.'},
      {t: '00:14', who: 'Марина', text: 'Черновую сборку?'},
      {t: '00:17', who: 'Крылов', text: 'Не важно. Важно, что вы талантливы.'},
      {t: '00:23', who: 'Крылов', text: 'Но вторая часть — это не искусство. Это оружие.'},
      {t: '00:32', who: 'Марина', text: 'Это правда.'},
      {t: '00:35', who: 'Крылов', text: 'У правды есть цена. Предлагаю 12 миллионов.'},
      {t: '00:43', who: 'Марина', text: 'При условии?'},
      {t: '00:45', who: 'Крылов', text: 'Уберите вторую часть.'},
      {t: '00:49', who: 'Марина', text: 'Нет.'},
      {t: '00:51', who: 'Крылов', text: 'У вас есть время до конца недели.'},
      {t: '00:58', who: '—', text: '[гудки.]'}
    ],
    note: 'Крылов не угрожает прямо. Но платит за молчание. '
      + 'Соучастие в сокрытии.'
  },

  a8: {
    t: 'Разговор с Ольгой',
    sub: '03.04.2024 · 18:20',
    dur: '5:20',
    src: 'Входящий',
    tag: 'связь',
    ico: 'phone',
    color: '#c8d1e2',
    color2: '#7a869c',
    ev: 'search_olga',
    flag: 'heard_olga_call',
    transcript: [
      {t: '00:00', who: 'Ольга', text: 'Марина, здравствуйте.'},
      {t: '00:04', who: 'Марина', text: 'Здравствуйте. Кто это?'},
      {t: '00:07', who: 'Ольга', text: 'Ольга. Жена Виктора Павловича.'},
      {t: '00:13', who: 'Марина', text: 'Что-то случилось?'},
      {t: '00:16', who: 'Ольга', text: 'Я хотела с вами поговорить.'},
      {t: '00:21', who: 'Ольга', text: 'Про ваш фильм.'},
      {t: '00:25', who: 'Марина', text: 'Он переживает за него?'},
      {t: '00:29', who: 'Ольга', text: 'Он боится.'},
      {t: '00:32', who: 'Марина', text: 'Чего?'},
      {t: '00:34', who: 'Ольга', text: 'Вы не знаете всей правды.'},
      {t: '00:38', who: 'Марина', text: 'Какой правды?'},
      {t: '00:41', who: 'Ольга', text: 'Прошу. Не показывайте этот фильм.'},
      {t: '00:48', who: 'Марина', text: 'Почему?'},
      {t: '00:51', who: 'Ольга', text: 'Просто послушайте меня. Один раз.'},
      {t: '00:58', who: 'Марина', text: 'Я не могу.'},
      {t: '01:01', who: 'Ольга', text: 'Тогда я вам не завидую.'},
      {t: '01:06', who: 'Ольга', text: 'И ему тоже.'},
      {t: '01:09', who: '—', text: '[гудки.]'}
    ],
    note: 'Ольга знала. Она пыталась предупредить, но не сказала '
      + 'прямо. Боится мужа.'
  },

  a9: {
    t: 'Голосовое от матери',
    sub: '13.04.2024 · 23:30',
    dur: '0:24',
    src: 'Мама',
    tag: 'связь',
    ico: 'mic',
    color: '#ffb84d',
    color2: '#b07a20',
    ev: null,
    flag: 'heard_mama_voice',
    transcript: [
      {t: '00:00', who: 'Мама', text: 'Мариночка, мне Лена позвонила.'},
      {t: '00:06', who: 'Мама', text: 'Скажи, что это какая-то глупость.'},
      {t: '00:12', who: 'Мама', text: 'Ты же не пропала?'},
      {t: '00:16', who: 'Мама', text: 'Возьми трубку. Пожалуйста.'},
      {t: '00:22', who: 'Мама', text: 'Я не переживу.'},
      {t: '00:24', who: '—', text: '[конец]'}
    ],
    note: 'Голос матери — самый тяжёлый. Она уже всё поняла.'
  },

  a10: {
    t: 'Финальная запись · Диктофон',
    sub: '14.04.2024 · 00:41',
    dur: '0:41',
    src: 'Флеш-карта · резерв',
    tag: 'ключевое',
    ico: 'shield',
    color: '#3ddc97',
    color2: '#1f9b6a',
    ev: 'note_audio',
    flag: 'found_backup_audio',
    critical: true,
    transcript: [
      {t: '00:00', who: '—', text: '[ЗАПИСЬ АУДИО · копия №1]'},
      {t: '00:02', who: '—', text: '[та же запись, что и в заметках.]'},
      {t: '00:05', who: 'Марина', text: 'Виктор Павлович, вы... вы зачем привезли оригинал сюда?'},
      {t: '00:11', who: 'Виктор', text: 'Чтобы никто не нашёл.'},
      {t: '00:15', who: '—', text: '[запись обрывается на 0:41.]'},
      {t: '00:41', who: '—', text: '[файл повреждён.]'}
    ],
    note: 'Копия на флешке. Та же запись, но с одной стороны. '
      + 'Восстановлена частично.'
  }

};

/* ============================================================
   БЛОК 3 — ГЛАВНОЕ МЕНЮ МЕДИАТЕКИ
   ============================================================ */

ROUTES.media = function(){
  G.screen = 'media';

  const videosViewed = Object.keys(VIDEOS).filter(function(k){
    return G.opened.videos && G.opened.videos[k];
  }).length;

  const audioViewed = Object.keys(AUDIO_RECORDINGS).filter(function(k){
    return G.opened.audio && G.opened.audio[k];
  }).length;

  const totalVideos = Object.keys(VIDEOS).length;
  const totalAudio = Object.keys(AUDIO_RECORDINGS).length;

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Медиатека</h2>'
  +     '<div class="sub">Видео · Аудио · Кадры</div>'
  +   '</div>'
  + '</div>'

  + '<div class="media-hero">'
  +   '<div class="mh-ring">' + svg('filmPlay', 44) + '</div>'
  +   '<div class="mh-label">МЕДИАТЕКА ДЕЛА</div>'
  +   '<div class="mh-sub">Все записи, изъятые по делу №2024-0414</div>'
  + '</div>'

  + '<div class="media-cards">'

  +   '<div class="media-card" onclick="go(\'videos\')">'
  +     '<div class="mc-ico" style="background:linear-gradient(140deg,#5da9ff,#3d7cd4)">'
  +       svg('filmPlay', 26)
  +     '</div>'
  +     '<div class="mc-body">'
  +       '<h3>Видеозаписи</h3>'
  +       '<p>Регистратор, камеры наблюдения, хроника</p>'
  +       '<div class="mc-stat">'
  +         '<b>' + videosViewed + '</b> / ' + totalVideos + ' просмотрено'
  +       '</div>'
  +     '</div>'
  +     svg('chev', 16)
  +   '</div>'

  +   '<div class="media-card" onclick="go(\'audios\')">'
  +     '<div class="mc-ico" style="background:linear-gradient(140deg,#ff5a6e,#a8283d)">'
  +       svg('mic', 26)
  +     '</div>'
  +     '<div class="mc-body">'
  +       '<h3>Аудиозаписи</h3>'
  +       '<p>Голосовые, звонки, признание</p>'
  +       '<div class="mc-stat">'
  +         '<b>' + audioViewed + '</b> / ' + totalAudio + ' прослушано'
  +       '</div>'
  +     '</div>'
  +     svg('chev', 16)
  +   '</div>'

  +   '<div class="media-card" onclick="go(\'frames\')">'
  +     '<div class="mc-ico" style="background:linear-gradient(140deg,#8b6dff,#5a3dbb)">'
  +       svg('image', 26)
  +     '</div>'
  +     '<div class="mc-body">'
  +     '<h3>Покадровый разбор</h3>'
  +     '<p>Разложение ключевой записи по кадрам</p>'
  +     '<div class="mc-stat">'
  +       '<b>3</b> сцены доступны'
  +     '</div>'
  +     '</div>'
  +     svg('chev', 16)
  +   '</div>'

  + '</div>'

  + '<div class="media-hint">'
  +   svg('info', 12)
  +   '<span>Записи добавляются по мере продвижения расследования</span>'
  + '</div>');
};

/* ============================================================
   БЛОК 4 — СПИСОК ВИДЕО
   ============================================================ */

ROUTES.videos = function(){
  G.screen = 'videos';

  const ids = Object.keys(VIDEOS);
  const rows = ids.map(function(id){
    return renderVideoRow(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Видеозаписи</h2>'
  +     '<div class="sub">' + ids.length + ' записей</div>'
  +   '</div>'
  +   '<button class="back" onclick="go(\'frames\')">'
  +     svg('grid', 18)
  +   '</button>'
  + '</div>'

  + '<div class="vid-list">' + rows + '</div>');
};

function renderVideoRow(id){
  const v = VIDEOS[id];
  if(!v) return '';
  const viewed = G.opened.videos && G.opened.videos[id];

  return ''
  + '<div class="vid-row' + (viewed ? ' seen' : '') + '" '
  +   'onclick="openVideo(\'' + id + '\')">'
  +   '<div class="vr-thumb" style="background:linear-gradient(140deg,'
  +     + v.color + ',' + v.color2 + ')">'
  +     svg(v.ico, 26)
  +     '<div class="vr-dur">' + v.dur + '</div>'
  +     (v.critical
  +       ? '<div class="vr-critical">' + svg('starFill', 10, 'fill') + '</div>'
  +       : '')
  +   '</div>'
  +   '<div class="vr-body">'
  +     '<div class="vr-title">' + escapeHtml(v.t) + '</div>'
  +     '<div class="vr-sub">' + escapeHtml(v.sub) + '</div>'
  +     '<div class="vr-tag">' + escapeHtml(v.tag) + '</div>'
  +   '</div>'
  +   svg('chev', 16)
  + '</div>';
}

/* ============================================================
   БЛОК 5 — ПРОСМОТР ВИДЕО
   ============================================================ */

function openVideo(id){
  const v = VIDEOS[id];
  if(!v) return;

  if(!G.opened.videos) G.opened.videos = {};
  G.opened.videos[id] = true;

  if(v.flag) setFlag(v.flag);

  if(v.ev && !hasEv(v.ev)){
    addEv(v.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[v.ev] || v.t, 'ev');
    }, 500);
  }

  const framesHtml = (v.frames || []).map(function(f, i){
    return ''
    + '<div class="vf-row">'
    +   '<div class="vf-time">' + escapeHtml(f.t) + '</div>'
    +   '<div class="vf-body">'
    +     '<div class="vf-dot"></div>'
    +     '<div class="vf-text">' + escapeHtml(f.d) + '</div>'
    +   '</div>'
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(v.t) + '</h2>'
  +     '<div class="sub">' + escapeHtml(v.sub) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="video-view">'

  +   '<div class="vv-screen" style="background:linear-gradient(140deg,'
  +     + v.color + '22,' + v.color2 + '22)">'

  +     '<div class="vvs-preview">'
  +       '<div class="vvs-icon" style="color:' + v.color + '">'
  +         svg(v.ico, 60)
  +       '</div>'
  +       '<div class="vvs-label">' + escapeHtml(v.tag).toUpperCase() + '</div>'
  +     '</div>'

  +     '<div class="vvs-controls">'
  +       '<button class="vvs-btn" onclick="toast(\'Перемотка\',\'−5 сек\',\'warn\')">'
  +         svg('rewind', 20)
  +       '</button>'
  +       '<button class="vvs-btn play" onclick="playVideo(\'' + id + '\')" '
  +         'style="background:' + v.color + '">'
  +         svg('play', 26, 'fill')
  +       '</button>'
  +       '<button class="vvs-btn" onclick="toast(\'Перемотка\',\'+5 сек\',\'warn\')">'
  +         svg('forward', 20)
  +       '</button>'
  +     '</div>'

  +     '<div class="vvs-bar">'
  +       '<div class="vvs-fill" style="width:0%;background:' + v.color + '"></div>'
  +     '</div>'

  +     '<div class="vvs-times">'
  +       '<span>00:00</span>'
  +       '<span>' + v.dur + '</span>'
  +     '</div>'

  +   '</div>'

  +   '<div class="vv-meta">'
  +     '<div class="vvm-src">'
  +       svg('pin', 12) + ' ' + escapeHtml(v.src)
  +     '</div>'
  +     '<div class="vvm-dur">'
  +       svg('clock', 12) + ' Длительность: ' + v.dur
  +     '</div>'
  +     (v.critical
  +       ? '<div class="vvm-critical">'
  +         + svg('starFill', 12, 'fill') + ' Ключевая запись'
  +         + '</div>'
  +       : '')
  +   '</div>'

  +   '<div class="vv-desc">' + escapeHtml(v.desc) + '</div>'

  +   '<div class="vv-frames-block">'
  +     '<div class="vfb-label">'
  +       svg('list', 12) + ' Хронометраж'
  +     '</div>'
  +     '<div class="vfb-list">' + framesHtml + '</div>'
  +   '</div>'

  +   '<div class="vv-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="toast(\'В дело\',\'Запись приобщена к материалам\',\'ok\')">'
  +       svg('fileText', 16) + ' В дело'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(540, 0.03);
}

function playVideo(id){
  const v = VIDEOS[id];
  if(!v) return;
  toast('▶ Просмотр', v.t, '');

  const bar = document.querySelector('.vvs-fill');
  if(bar){
    bar.style.transition = 'width 3s linear';
    setTimeout(function(){ bar.style.width = '100%'; }, 50);
  }

  setTimeout(function(){
    toast('Стоп-кадр', 'Обратите внимание на детали', 'warn');
  }, 1500);
}

/* ============================================================
   БЛОК 6 — СПИСОК АУДИО
   ============================================================ */

ROUTES.audios = function(){
  G.screen = 'audios';

  const ids = Object.keys(AUDIO_RECORDINGS);
  const rows = ids.map(function(id){
    return renderAudioRow(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Аудиозаписи</h2>'
  +     '<div class="sub">' + ids.length + ' записей</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Фильтр\',\'Функция недоступна\',\'warn\')">'
  +     svg('grid', 18)
  +   '</button>'
  + '</div>'

  + '<div class="aud-list">' + rows + '</div>');
};

function renderAudioRow(id){
  const a = AUDIO_RECORDINGS[id];
  if(!a) return '';
  const viewed = G.opened.audio && G.opened.audio[id];

  return ''
  + '<div class="aud-row' + (viewed ? ' seen' : '') + '" '
  +   'onclick="openAudio(\'' + id + '\')">'
  +   '<div class="ar-ico" style="background:linear-gradient(140deg,'
  +     + a.color + ',' + a.color2 + ')">'
  +     svg(a.ico, 22)
  +     (a.critical
  +       ? '<div class="ar-critical">' + svg('starFill', 9, 'fill') + '</div>'
  +       : '')
  +   '</div>'
  +   '<div class="ar-body">'
  +     '<div class="ar-title">' + escapeHtml(a.t) + '</div>'
  +     '<div class="ar-sub">' + escapeHtml(a.sub) + '</div>'
  +     '<div class="ar-tag">' + escapeHtml(a.tag) + '</div>'
  +   '</div>'
  +   '<div class="ar-dur">' + a.dur + '</div>'
  +   svg('chev', 14)
  + '</div>';
}

/* ============================================================
   БЛОК 7 — ПРОСМОТР АУДИО
   ============================================================ */

function openAudio(id){
  const a = AUDIO_RECORDINGS[id];
  if(!a) return;

  if(!G.opened.audio) G.opened.audio = {};
  G.opened.audio[id] = true;

  if(a.flag) setFlag(a.flag);

  if(a.ev && !hasEv(a.ev)){
    addEv(a.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[a.ev] || a.t, 'ev');
    }, 500);
  }

  const bars = Array.from({length: 40}, function(_, i){
    const h = 6 + Math.abs(Math.sin(i * 0.5)) * 22 + (i % 4) * 2;
    return '<i style="height:' + h + 'px;background:' + a.color + '"></i>';
  }).join('');

  const transcript = (a.transcript || []).map(function(l){
    const cls = l.who === 'Марина' ? 'm'
      : l.who === 'Виктор' ? 'v'
      : l.who === '—' ? 'noise'
      : 'w';
    return ''
    + '<div class="tsp-line ' + cls + '">'
    +   '<div class="tsp-time">' + escapeHtml(l.t) + '</div>'
    +   (l.who !== '—'
    +     ? '<div class="tsp-who">' + escapeHtml(l.who) + '</div>'
    +     : '')
    +   '<div class="tsp-text">' + escapeHtml(l.text) + '</div>'
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(a.t) + '</h2>'
  +     '<div class="sub">' + escapeHtml(a.sub) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="audio-page">'

  +   '<div class="ap-hero" style="background:linear-gradient(140deg,'
  +     + a.color + '22,' + a.color2 + '22)">'
  +     '<div class="aph-icon" style="color:' + a.color + '">'
  +       svg(a.ico, 42)
  +     '</div>'
  +     '<div class="aph-label" style="color:' + a.color + '">'
  +       + escapeHtml(a.tag).toUpperCase()
  +     + '</div>'
  +     (a.critical
  +       ? '<div class="aph-critical">'
  +         + svg('starFill', 11, 'fill') + ' КЛЮЧЕВАЯ'
  +         + '</div>'
  +       : '')
  +   '</div>'

  +   '<div class="ap-player">'

  +     '<div class="app-bar">' + bars + '</div>'

  +     '<div class="app-times">'
  +       '<span>00:00</span>'
  +       '<span>' + a.dur + '</span>'
  +     '</div>'

  +     '<div class="app-controls">'
  +       '<button class="app-btn" onclick="toast(\'Перемотка\',\'−5 сек\',\'warn\')">'
  +         svg('rewind', 18)
  +       '</button>'
  +       '<button class="app-btn play" onclick="playAudioRec(\'' + id + '\')" '
  +         'style="background:' + a.color + '">'
  +         svg('play', 24, 'fill')
  +       '</button>'
  +       '<button class="app-btn" onclick="toast(\'Перемотка\',\'+5 сек\',\'warn\')">'
  +         svg('forward', 18)
  +       '</button>'
  +     '</div>'

  +   '</div>'

  +   '<div class="ap-src">'
  +     svg('pin', 12) + ' ' + escapeHtml(a.src)
  +   '</div>'

  +   '<div class="ap-transcript-block">'
  +     '<div class="atb-label">'
  +       svg('fileText', 13) + ' Расшифровка'
  +     '</div>'
  +     '<div class="atb-list">' + transcript + '</div>'
  +   '</div>'

  +   '<div class="ap-note">'
  +     '<div class="apn-label">'
  +       svg('fileText', 12) + ' Заметка следователя'
  +     '</div>'
  +     '<div class="apn-text">' + escapeHtml(a.note || '') + '</div>'
  +   '</div>'

  +   '<div class="ap-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="toast(\'В дело\',\'Запись приобщена\',\'ok\')">'
  +       svg('fileText', 16) + ' В дело'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(480, 0.03);
}

function playAudioRec(id){
  const a = AUDIO_RECORDINGS[id];
  if(!a) return;
  toast('🎧 Воспроизведение', a.t, '');

  if(id === 'a4'){
    setTimeout(function(){
      toast('Признание', '«Я не хотел. Тогда, на трассе...»', 'err');
    }, 2200);
    setTimeout(function(){
      toast('Удар', '[шум. вскрик.]', 'err');
    }, 4200);
  }

  if(id === 'a1'){
    setTimeout(function(){
      toast('Голос изменён', '«Мы знаем, где ты живёшь»', 'warn');
    }, 2200);
  }
}

/* ============================================================
   БЛОК 8 — ПОКАДРОВЫЙ РАЗБОР
   ============================================================ */

const FRAME_SCENES = {

  fs1: {
    id: 'fs1',
    t: 'Регистратор · момент удара',
    sub: 'Кадры 00:00 – 00:23',
    video: 'v1',
    color: '#ff5a6e',
    frames: [
      {t: '00:00', d: 'Трасса ночью. Пустая. Мокрый асфальт. Свет фар.', tag: 'фон'},
      {t: '00:05', d: 'Мотоцикл появляется справа. Едет ровно.', tag: 'жертва'},
      {t: '00:09', d: 'Встречный свет — тёмная машина выходит из-за поворота.', tag: 'убийца'},
      {t: '00:12', d: 'Седан не сбрасывает скорость. Мотоцикл пытается уйти влево.', tag: 'момент'},
      {t: '00:14', d: 'УДАР. Мотоцикл отбрасывает к обочине.', tag: 'момент'},
      {t: '00:16', d: 'Седан продолжает движение. Виден номер: ••7 •• 74 2.', tag: 'улика'},
      {t: '00:19', d: 'Машина уходит за кадр. Дым. Осколки.', tag: 'уход'},
      {t: '00:23', d: 'Конец записи.', tag: 'конец'}
    ]
  },

  fs2: {
    id: 'fs2',
    t: 'Кинотеатр · выход Марины',
    sub: 'Кадры 21:52 – 22:31',
    video: 'v3',
    color: '#8b6dff',
    frames: [
      {t: '21:52', d: 'Зрители заходят в зал. Марина в чёрном платье. Улыбается.', tag: 'фон'},
      {t: '22:05', d: 'Из служебного входа выходит высокий мужчина.', tag: 'подозреваемый'},
      {t: '22:18', d: 'Мужчина смотрит на телефон. Ждёт у стены.', tag: 'подготовка'},
      {t: '22:20', d: 'Марина выходит. Он берёт её под локоть.', tag: 'контакт'},
      {t: '22:22', d: 'Они садятся в тёмную машину у тротуара.', tag: 'уход'},
      {t: '22:24', d: 'Машина уезжает в сторону Заводской.', tag: 'маршрут'},
      {t: '22:31', d: 'Лена выбегает на улицу. Оглядывается.', tag: 'поиск'}
    ]
  },

  fs3: {
    id: 'fs3',
    t: 'Ателье · вход в павильон',
    sub: 'Кадры 23:55 – 01:32',
    video: 'v6',
    color: '#ffb84d',
    frames: [
      {t: '23:55', d: 'Марина идёт по коридору второго этажа.', tag: 'подход'},
      {t: '23:56', d: 'Останавливается у двери павильона №3.', tag: 'остановка'},
      {t: '23:56', d: 'Открывает замок ключом.', tag: 'ключ'},
      {t: '23:57', d: 'Оборачивается. Смотрит в конец коридора.', tag: 'тревога'},
      {t: '23:57', d: 'Замирает на секунду.', tag: 'страх'},
      {t: '23:58', d: 'Заходит внутрь. Дверь закрывается.', tag: 'вход'},
      {t: '00:41', d: 'Дверь открывается. Из павильона выходит мужчина.', tag: 'убийца'},
      {t: '00:42', d: 'Он быстро идёт к лестнице. В руке длинный предмет.', tag: 'предмет'},
      {t: '00:45', d: 'Мужчина спускается. Марины за ним нет.', tag: 'отсутствие'},
      {t: '01:32', d: 'В кадре больше никого.', tag: 'тишина'}
    ]
  }
};

ROUTES.frames = function(){
  G.screen = 'frames';

  const ids = Object.keys(FRAME_SCENES);
  const rows = ids.map(function(id){
    const fs = FRAME_SCENES[id];
    return ''
    + '<div class="frames-row" onclick="openFrameScene(\'' + id + '\')">'
    +   '<div class="fr-num" style="background:' + fs.color + '">'
    +     escapeHtml(fs.sub.split(' ')[1] || '01')
    +   '</div>'
    +   '<div class="fr-body">'
    +     '<div class="fr-title">' + escapeHtml(fs.t) + '</div>'
    +     '<div class="fr-sub">' + escapeHtml(fs.sub) + '</div>'
    +     '<div class="fr-count">' + fs.frames.length + ' кадров</div>'
    +   '</div>'
    +   svg('chev', 16)
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Покадровый разбор</h2>'
  +     '<div class="sub">3 ключевые сцены</div>'
  +   '</div>'
  + '</div>'

  + '<div class="frames-info">'
  +   svg('info', 13)
  +   '<span>Разложение видеозаписи на отдельные кадры. '
  +     'Каждый кадр помечен как улика.</span>'
  + '</div>'

  + '<div class="frames-list">' + rows + '</div>');
};

function openFrameScene(id){
  const fs = FRAME_SCENES[id];
  if(!fs) return;

  const rows = fs.frames.map(function(f, i){
    return ''
    + '<div class="frame-item">'
    +   '<div class="fi-left">'
    +     '<div class="fi-time">' + escapeHtml(f.t) + '</div>'
    +     '<div class="fi-tag">' + escapeHtml(f.tag) + '</div>'
    +   '</div>'
    +   '<div class="fi-body">'
    +     '<div class="fi-num">#' + (i + 1) + '</div>'
    +     '<div class="fi-desc">' + escapeHtml(f.d) + '</div>'
    +   '</div>'
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(fs.t) + '</h2>'
  +     '<div class="sub">' + escapeHtml(fs.sub) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="frame-scene">'

  +   '<div class="fsc-hero" style="border-color:' + fs.color + '">'
  +     '<div class="fsc-hero-ico" style="color:' + fs.color + '">'
  +       svg('filmPlay', 40)
  +     '</div>'
  +     '<div class="fsc-hero-label">'
  +       'РАЗБОР КАДРОВ'
  +     '</div>'
  +   '</div>'

  +   '<div class="fsc-list">' + rows + '</div>'

  +   '<div class="fsc-actions">'
  +     '<button class="btn ghost" style="width:100%;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' К списку сцен'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ============================================================
   БЛОК 9 — РЕГИСТРАЦИЯ ПРИЛОЖЕНИЯ В ДОКЕ И СЕТКЕ
   ============================================================ */

(function registerMediaApp(){
  if(typeof APPS !== 'undefined'){
    const has = APPS.some(function(a){ return a.id === 'media'; });
    if(!has){
      const idx = APPS.findIndex(function(a){ return a.id === 'settings'; });
      const item = {
        id: 'media',
        ic: 'filmPlay',
        lbl: 'Медиатека'
      };
      if(idx >= 0){
        APPS.splice(idx, 0, item);
      } else {
        APPS.push(item);
      }
    }
  }
})();

(function patchOpenAppForMedia(){
  if(typeof window.openApp !== 'function') return;
  const prev = window.openApp;
  window.openApp = function(id){
    if(id === 'media') return go('media');
    if(id === 'videos') return go('videos');
    if(id === 'audios') return go('audios');
    if(id === 'frames') return go('frames');
    return prev(id);
  };
})();

if(!G.opened.videos) G.opened.videos = {};
if(!G.opened.audio) G.opened.audio = {};

/* ============================================================
   БЛОК 10 — РАСШИРЕНИЕ СЛОВАРЯ УЛИК
   ============================================================ */
(function extendTitlesPart7(){
  const extra = {
    seen_video_reg: 'Просмотр записи регистратора',
    seen_video_show: 'Запись с камеры кинотеатра',
    seen_video_studio: 'Запись у ателье',
    seen_video_hall: 'Внутренняя камера ателье',
    seen_video_pavilion: 'Камера у павильона №3',
    seen_video_exit: 'Запись выхода из ателье',
    seen_video_morning: 'Утро после исчезновения',
    seen_video_street: 'Камера на Заводской',
    heard_lena_call: 'Запись звонка Лене',
    heard_artem_call: 'Запись звонка Артёму',
    heard_dima_call: 'Голосовое от Димы',
    heard_krylov_call: 'Запись разговора с Крыловым',
    heard_olga_call: 'Запись разговора с Ольгой',
    heard_mama_voice: 'Голосовое от матери',
    found_backup_audio: 'Резервная копия записи'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   БЛОК 11 — CSS ДЛЯ ЧАСТИ 7
   ============================================================ */
(function injectPart7Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  + '.media-hero{'
  +   'padding:30px 24px 22px;text-align:center;'
  +   'background:radial-gradient(ellipse at top, '
  +   'rgba(93,169,255,.1), transparent 65%);'
  + '}'
  + '.mh-ring{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(93,169,255,.2), transparent 70%);'
  +   'border:1.5px solid rgba(93,169,255,.4);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--acc);'
  +   'box-shadow:0 0 40px rgba(93,169,255,.25);'
  + '}'
  + '.mh-label{'
  +   'font-size:11px;color:var(--acc);'
  +   'letter-spacing:4px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:6px;'
  + '}'
  + '.mh-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  +   'max-width:280px;margin:0 auto;line-height:1.55;'
  + '}'

  + '.media-cards{'
  +   'padding:10px 14px 20px;'
  +   'display:flex;flex-direction:column;gap:10px;'
  + '}'
  + '.media-card{'
  +   'display:flex;gap:14px;align-items:center;'
  +   'padding:16px;'
  +   'background:linear-gradient(160deg,var(--panel2),var(--panel));'
  +   'border:1px solid var(--line);'
  +   'border-radius:16px;cursor:pointer;'
  +   'transition:.15s;'
  + '}'
  + '.media-card:hover{'
  +   'border-color:var(--line2);'
  +   'transform:translateY(-2px);'
  + '}'
  + '.mc-ico{'
  +   'width:56px;height:56px;border-radius:16px;flex:0 0 56px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:#fff;'
  +   'box-shadow:0 6px 18px rgba(0,0,0,.4);'
  + '}'
  + '.mc-body{flex:1;min-width:0}'
  + '.mc-body h3{'
  +   'font-size:15px;font-weight:600;margin-bottom:4px;'
  + '}'
  + '.mc-body p{'
  +   'font-size:12px;color:var(--dim);'
  +   'margin-bottom:8px;line-height:1.45;'
  + '}'
  + '.mc-stat{'
  +   'font-size:11px;color:var(--acc);'
  +   'letter-spacing:.3px;'
  + '}'
  + '.mc-stat b{'
  +   'font-size:13px;font-weight:600;'
  + '}'

  + '.media-hint{'
  +   'padding:14px 18px 30px;'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'font-size:11.5px;color:var(--dim2);'
  +   'line-height:1.55;'
  + '}'
  + '.media-hint .icon{flex:0 0 12px;margin-top:2px;opacity:.7}'

  + '.vid-list{padding:6px 0 30px}'
  + '.vid-row{'
  +   'display:flex;gap:13px;padding:12px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.vid-row:hover{background:var(--panel2)}'
  + '.vid-row.seen{opacity:.75}'
  + '.vr-thumb{'
  +   'width:82px;height:56px;border-radius:10px;flex:0 0 82px;'
  +   'position:relative;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:#fff;'
  +   'box-shadow:0 4px 14px rgba(0,0,0,.4);'
  +   'overflow:hidden;'
  + '}'
  + '.vr-dur{'
  +   'position:absolute;bottom:4px;right:6px;'
  +   'font-size:9.5px;color:#fff;'
  +   'background:rgba(0,0,0,.6);'
  +   'padding:1px 5px;border-radius:5px;'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.vr-critical{'
  +   'position:absolute;top:4px;right:4px;'
  +   'width:18px;height:18px;border-radius:50%;'
  +   'background:var(--warn);color:#000;'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.vr-body{flex:1;min-width:0}'
  + '.vr-title{'
  +   'font-size:13.5px;font-weight:600;margin-bottom:3px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.vr-sub{'
  +   'font-size:11px;color:var(--dim);margin-bottom:5px;'
  + '}'
  + '.vr-tag{'
  +   'font-size:10px;color:var(--acc);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  + '}'

  + '.video-view{padding:0 0 30px}'
  + '.vv-screen{'
  +   'position:relative;'
  +   'margin:16px 16px 18px;'
  +   'border-radius:16px;'
  +   'border:1px solid var(--line);'
  +   'aspect-ratio:16/10;'
  +   'overflow:hidden;'
  +   'display:flex;flex-direction:column;'
  + '}'
  + '.vvs-preview{'
  +   'flex:1;display:flex;flex-direction:column;'
  +   'align-items:center;justify-content:center;'
  +   'gap:12px;'
  + '}'
  + '.vvs-icon{opacity:.85}'
  + '.vvs-label{'
  +   'font-size:10.5px;letter-spacing:3px;'
  +   'color:var(--dim);text-transform:uppercase;'
  + '}'
  + '.vvs-controls{'
  +   'display:flex;justify-content:center;align-items:center;'
  +   'gap:24px;padding:12px;'
  + '}'
  + '.vvs-btn{'
  +   'width:42px;height:42px;border-radius:50%;'
  +   'background:rgba(255,255,255,.08);'
  +   'border:1px solid rgba(255,255,255,.15);'
  +   'color:#fff;cursor:pointer;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'transition:.15s;padding:0;font-family:inherit;'
  +   'backdrop-filter:blur(10px);'
  + '}'
  + '.vvs-btn:hover{background:rgba(255,255,255,.15)}'
  + '.vvs-btn:active{transform:scale(.9)}'
  + '.vvs-btn.play{'
  +   'width:56px;height:56px;'
  +   'border-color:transparent;'
  +   'box-shadow:0 6px 22px rgba(0,0,0,.4);'
  + '}'
  + '.vvs-bar{'
  +   'height:3px;background:rgba(255,255,255,.1);'
  +   'margin:0 16px;border-radius:2px;overflow:hidden;'
  + '}'
  + '.vvs-fill{'
  +   'height:100%;border-radius:2px;'
  +   'transition:width .3s;'
  + '}'
  + '.vvs-times{'
  +   'display:flex;justify-content:space-between;'
  +   'padding:6px 16px 12px;'
  +   'font-size:10.5px;color:var(--dim);'
  +   'font-variant-numeric:tabular-nums;'
  + '}'

  + '.vv-meta{'
  +   'padding:0 22px 14px;'
  +   'display:flex;flex-direction:column;gap:6px;'
  + '}'
  + '.vvm-src,.vvm-dur{'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.vvm-critical{'
  +   'display:inline-flex;align-items:center;gap:6px;'
  +   'padding:4px 10px;border-radius:10px;'
  +   'background:rgba(255,184,77,.14);'
  +   'color:var(--warn);'
  +   'font-size:10.5px;letter-spacing:1px;'
  +   'font-weight:700;text-transform:uppercase;'
  +   'align-self:flex-start;'
  + '}'

  + '.vv-desc{'
  +   'padding:12px 22px 20px;'
  +   'font-size:13px;color:var(--txt2);line-height:1.7;'
  + '}'

  + '.vv-frames-block{'
  +   'margin:0 18px 20px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:14px;'
  +   'overflow:hidden;'
  + '}'
  + '.vfb-label{'
  +   'padding:12px 16px;'
  +   'background:var(--panel2);'
  +   'border-bottom:1px solid var(--line);'
  +   'font-size:11px;letter-spacing:1.5px;'
  +   'text-transform:uppercase;color:var(--acc);'
  +   'font-weight:700;'
  +   'display:flex;align-items:center;gap:8px;'
  + '}'
  + '.vfb-list{padding:8px 0}'
  + '.vf-row{'
  +   'display:flex;gap:12px;'
  +   'padding:6px 16px;'
  +   'align-items:flex-start;'
  + '}'
  + '.vf-time{'
  +   'font-family:monospace;font-size:11px;'
  +   'color:var(--acc);flex:0 0 52px;'
  +   'padding-top:2px;'
  + '}'
  + '.vf-body{'
  +   'display:flex;gap:9px;flex:1;min-width:0;'
  +   'align-items:flex-start;'
  + '}'
  + '.vf-dot{'
  +   'width:6px;height:6px;border-radius:50%;'
  +   'background:var(--acc);'
  +   'flex:0 0 6px;margin-top:7px;'
  + '}'
  + '.vf-text{'
  +   'font-size:12.5px;color:var(--txt2);'
  +   'line-height:1.5;'
  + '}'

  + '.vv-actions{'
  +   'display:flex;gap:10px;padding:0 16px;'
  + '}'

  + '.aud-list{padding:6px 0 30px}'
  + '.aud-row{'
  +   'display:flex;gap:12px;padding:13px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.aud-row:hover{background:var(--panel2)}'
  + '.aud-row.seen{opacity:.75}'
  + '.ar-ico{'
  +   'width:44px;height:44px;border-radius:12px;flex:0 0 44px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:#fff;position:relative;'
  +   'box-shadow:0 4px 14px rgba(0,0,0,.35);'
  + '}'
  + '.ar-critical{'
  +   'position:absolute;top:-3px;right:-3px;'
  +   'width:18px;height:18px;border-radius:50%;'
  +   'background:var(--warn);color:#000;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:2px solid var(--bg);'
  + '}'
  + '.ar-body{flex:1;min-width:0}'
  + '.ar-title{'
  +   'font-size:13.5px;font-weight:600;margin-bottom:3px;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.ar-sub{'
  +   'font-size:11px;color:var(--dim);margin-bottom:4px;'
  + '}'
  + '.ar-tag{'
  +   'font-size:10px;color:var(--acc);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  + '}'
  + '.ar-dur{'
  +   'font-size:11px;color:var(--dim2);'
  +   'font-variant-numeric:tabular-nums;'
  +   'flex:0 0 auto;margin-right:4px;'
  + '}'

  + '.audio-page{padding:0 0 30px}'
  + '.ap-hero{'
  +   'text-align:center;padding:28px 20px 22px;'
  +   'border-bottom:1px solid var(--line);'
  + '}'
  + '.aph-icon{'
  +   'width:72px;height:72px;border-radius:50%;'
  +   'margin:0 auto 12px;'
  +   'background:rgba(255,255,255,.05);'
  +   'border:1.5px solid rgba(255,255,255,.15);'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.aph-label{'
  +   'font-size:10.5px;letter-spacing:3px;'
  +   'font-weight:700;margin-bottom:6px;'
  + '}'
  + '.aph-critical{'
  +   'display:inline-flex;align-items:center;gap:5px;'
  +   'padding:3px 10px;border-radius:10px;'
  +   'background:rgba(255,184,77,.14);'
  +   'color:var(--warn);'
  +   'font-size:10px;letter-spacing:1px;'
  +   'font-weight:700;'
  + '}'
  + '.ap-player{'
  +   'margin:18px 16px;'
  +   'padding:18px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:16px;'
  + '}'
  + '.app-bar{'
  +   'display:flex;align-items:center;gap:2px;'
  +   'height:38px;margin-bottom:12px;'
  + '}'
  + '.app-bar i{'
  +   'flex:1;border-radius:1px;opacity:.75;'
  + '}'
  + '.app-times{'
  +   'display:flex;justify-content:space-between;'
  +   'font-size:10.5px;color:var(--dim);'
  +   'margin-bottom:16px;'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.app-controls{'
  +   'display:flex;justify-content:center;align-items:center;'
  +   'gap:22px;'
  + '}'
  + '.app-btn{'
  +   'width:40px;height:40px;border-radius:50%;'
  +   'background:var(--panel3);border:1px solid var(--line2);'
  +   'color:var(--txt);cursor:pointer;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'transition:.15s;padding:0;font-family:inherit;'
  + '}'
  + '.app-btn:hover{background:var(--panel4)}'
  + '.app-btn:active{transform:scale(.9)}'
  + '.app-btn.play{'
  +   'width:56px;height:56px;'
  +   'border-color:transparent;'
  +   'box-shadow:0 6px 20px rgba(0,0,0,.4);'
  + '}'
  + '.ap-src{'
  +   'padding:0 22px 16px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.ap-transcript-block{'
  +   'margin:0 16px 16px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:14px;'
  +   'overflow:hidden;'
  + '}'
  + '.atb-label{'
  +   'padding:12px 16px;'
  +   'background:var(--panel2);'
  +   'border-bottom:1px solid var(--line);'
  +   'font-size:11px;letter-spacing:1.5px;'
  +   'text-transform:uppercase;color:var(--acc);'
  +   'font-weight:700;'
  +   'display:flex;align-items:center;gap:8px;'
  + '}'
  + '.atb-list{padding:12px 16px}'
  + '.tsp-line{'
  +   'display:grid;grid-template-columns:50px 70px 1fr;'
  +   'gap:8px;padding:7px 0;'
  +   'border-bottom:1px solid rgba(42,52,68,.3);'
  +   'font-size:12.5px;line-height:1.5;'
  + '}'
  + '.tsp-line:last-child{border-bottom:none}'
  + '.tsp-line.noise{'
  +   'grid-template-columns:50px 1fr;'
  +   'color:var(--dim2);font-style:italic;'
  + '}'
  + '.tsp-time{'
  +   'color:var(--acc);font-family:monospace;'
  +   'font-size:10.5px;opacity:.8;'
  + '}'
  + '.tsp-who{'
  +   'font-weight:600;font-size:11.5px;'
  + '}'
  + '.tsp-line.m .tsp-who{color:#7ab8ff}'
  + '.tsp-line.v .tsp-who{color:#ff7a9c}'
  + '.tsp-line.w .tsp-who{color:var(--warn)}'
  + '.tsp-text{color:var(--txt2)}'
  + '.ap-note{'
  +   'margin:0 16px 16px;'
  +   'padding:14px 16px;'
  +   'background:var(--panel2);'
  +   'border-left:3px solid var(--acc);'
  +   'border-radius:10px;'
  + '}'
  + '.apn-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.apn-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.65;'
  + '}'
  + '.ap-actions{display:flex;gap:10px;padding:0 16px}'

  + '.frames-info{'
  +   'margin:14px 16px;'
  +   'padding:11px 14px;'
  +   'background:rgba(93,169,255,.06);'
  +   'border:1px solid rgba(93,169,255,.2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'line-height:1.55;'
  + '}'
  + '.frames-info .icon{flex:0 0 13px;color:var(--acc);margin-top:2px}'
  + '.frames-list{padding:0 16px 30px;display:flex;flex-direction:column;gap:10px}'
  + '.frames-row{'
  +   'display:flex;gap:13px;padding:14px;'
  +   'background:linear-gradient(160deg,var(--panel2),var(--panel));'
  +   'border:1px solid var(--line);'
  +   'border-radius:14px;cursor:pointer;'
  +   'transition:.15s;align-items:center;'
  + '}'
  + '.frames-row:hover{'
  +   'border-color:var(--line2);'
  +   'transform:translateX(3px);'
  + '}'
  + '.fr-num{'
  +   'width:44px;height:44px;flex:0 0 44px;'
  +   'border-radius:12px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:16px;font-weight:700;color:#000;'
  +   'letter-spacing:.5px;'
  + '}'
  + '.fr-body{flex:1;min-width:0}'
  + '.fr-title{font-size:13.5px;font-weight:600;margin-bottom:3px}'
  + '.fr-sub{font-size:11px;color:var(--dim);margin-bottom:4px}'
  + '.fr-count{font-size:10.5px;color:var(--acc);letter-spacing:.5px}'

  + '.frame-scene{padding:0 0 30px}'
  + '.fsc-hero{'
  +   'margin:18px 16px 20px;'
  +   'padding:24px 20px;text-align:center;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:4px;'
  +   'border-radius:14px;'
  + '}'
  + '.fsc-hero-ico{margin-bottom:10px}'
  + '.fsc-hero-label{'
  +   'font-size:10.5px;letter-spacing:3px;'
  +   'color:var(--dim);text-transform:uppercase;'
  +   'font-weight:700;'
  + '}'
  + '.fsc-list{padding:0 16px;display:flex;flex-direction:column;gap:10px}'
  + '.frame-item{'
  +   'display:flex;gap:14px;'
  +   'padding:14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  + '}'
  + '.fi-left{'
  +   'flex:0 0 70px;'
  +   'display:flex;flex-direction:column;gap:6px;'
  + '}'
  + '.fi-time{'
  +   'font-family:monospace;font-size:12px;'
  +   'color:var(--acc);'
  + '}'
  + '.fi-tag{'
  +   'font-size:9.5px;color:var(--dim);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  +   'padding:2px 6px;'
  +   'background:var(--panel2);'
  +   'border-radius:6px;'
  +   'align-self:flex-start;'
  + '}'
  + '.fi-body{flex:1;min-width:0}'
  + '.fi-num{'
  +   'font-size:10.5px;color:var(--dim2);'
  +   'margin-bottom:4px;letter-spacing:.5px;'
  + '}'
  + '.fi-desc{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.55;'
  + '}'
  + '.fsc-actions{padding:20px 16px 0}';

  document.head.appendChild(style);
})();

console.log(
  '%c[ЧАСТЬ 7 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nМедиатека: 12 видео · 10 аудио · 3 сцены покадрового разбора. Вставляй Часть 8 ниже.'
);

/* ... Часть 7 заканчивается здесь. Не закрывай script/body/html.
   Часть 8 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 8 из 10 — ПОЧТА + КАРТА + ПРОФАЙЛЕР
   ------------------------------------------------------------
   Три новых приложения для глубокого анализа дела:
   - ПОЧТА: 14 электронных писем (включая анонимные)
   - КАРТА: 12 локаций с координатами и описаниями
   - ПРОФАЙЛЕР: детальные профили 8 подозреваемых
   ============================================================ */

/* ============================================================
   БЛОК 1 — ПОЧТА (EMAIL)
   ============================================================ */

const EMAILS = {

  e1: {
    from: 'Лена Крылова',
    fromShort: 'Лена',
    addr: 'lena.krylova@mail.ru',
    av: 'ЛК',
    color: '#e05c7a',
    subj: 'Марина, срочно прочти',
    date: '12 апреля 2024',
    time: '23:58',
    tag: 'срочно',
    unread: true,
    ev: 'chat_lena',
    flag: 'read_email_lena',
    body:
      'Мариш,\n\n' +
      'Я не могу до тебя дозвониться. Ты не отвечаешь уже два часа.\n\n' +
      'Я прочла то, что ты мне скинула. Про запись.\n' +
      'Я в шоке. Я не знала, что всё настолько серьёзно.\n\n' +
      'Пожалуйста, ответь. Пожалуйста, позвони.\n' +
      'Я готова приехать куда угодно. Куда скажешь.\n\n' +
      'Про папку «Кирилл» — я поняла. Пароль помню.\n' +
      'Но я надеюсь, что она мне не понадобится.\n\n' +
      'Дай знать, что ты жива.\n\n' +
      'Лена.'
  },

  e2: {
    from: 'Виктор Павлович Соколовский',
    fromShort: 'В. П. Соколовский',
    addr: 'v.sokolovsky@academy.ru',
    av: 'ВП',
    color: '#8b6dff',
    subj: 'О вашем дипломе. Последнее предупреждение',
    date: '10 апреля 2024',
    time: '18:42',
    tag: 'официальное',
    unread: false,
    ev: 'chat_viktor',
    flag: 'read_email_viktor',
    body:
      'Марина Андреевна,\n\n' +
      'Пишу вам официально, по электронной почте, чтобы\n' +
      'осталась письменная история нашего диалога.\n\n' +
      'Я категорически против включения в ваш диплом\n' +
      'материалов, касающихся событий 2019 года.\n' +
      'Это не имеет отношения к вашему образованию.\n\n' +
      'Более того, вы используете источники,\n' +
      'происхождение которых невозможно подтвердить.\n' +
      'В юридической практике такие материалы\n' +
      'называются «фальсификацией».\n\n' +
      'Убедительно прошу вас:\n' +
      '1. Изъять вторую часть фильма.\n' +
      '2. Не показывать её в публичном пространстве.\n' +
      '3. Не упоминать моё имя в титрах.\n\n' +
      'Если вы это сделаете, я подпишу ваш диплом\n' +
      'и дам вам блестящую рекомендацию.\n\n' +
      'Если нет — я оставляю за собой право\n' +
      'обратиться в деканат с ходатайством\n' +
      'о недопуске вас к защите.\n\n' +
      'С уважением,\n' +
      'Соколовский В. П.\n' +
      'Руководитель кафедры киноискусства'
  },

  e3: {
    from: 'Андрей Крылов',
    fromShort: 'А. Крылов',
    addr: 'office@krylov-studio.ru',
    av: 'АК',
    color: '#c8d1e2',
    subj: 'Контракт. Условия',
    date: '8 апреля 2024',
    time: '15:11',
    tag: 'рабочее',
    unread: false,
    ev: 'note_krylov_offer',
    flag: 'read_email_krylov',
    body:
      'Марина Андреевна,\n\n' +
      'Подтверждаю наше предложение.\n\n' +
      'Полнометражный фильм.\n' +
      'Бюджет: 12 000 000 ₽.\n' +
      'Продюсерский центр: мой.\n' +
      'Съёмки: лето 2024.\n' +
      'Премьера: осень 2025.\n\n' +
      'Условие одно:\n' +
      'из вашего дипломного фильма изымается\n' +
      'вторая часть (28:00 – 47:00).\n\n' +
      'Если вы согласны — пришлите подтверждение\n' +
      'до пятницы.\n\n' +
      'Если нет — я не держу зла.\n' +
      'Но я буду вынужден рассмотреть\n' +
      'другую кандидатуру.\n\n' +
      'С уважением,\n' +
      'А. В. Крылов\n' +
      'ООО «Крылов и партнёры»'
  },

  e4: {
    from: 'Киноателье «Сокол»',
    fromShort: 'Сокол',
    addr: 'info@sokol-studio.ru',
    av: 'КС',
    color: '#7a869c',
    subj: 'Подтверждение брони павильона №3',
    date: '11 апреля 2024',
    time: '16:04',
    tag: 'служебное',
    unread: false,
    ev: 'studio_booking',
    flag: 'read_email_studio',
    body:
      'Марина Андреевна,\n\n' +
      'Подтверждаем вашу бронь:\n\n' +
      'Павильон: №3\n' +
      'Дата: 13 апреля 2024\n' +
      'Время: 23:00 – 01:00\n' +
      'Стоимость: 26 000 ₽ (оплачено)\n\n' +
      'Ключ будет выдан администратором\n' +
      'в фойе киноателье.\n\n' +
      'Отдельно сообщаем: сегодня в 15:40\n' +
      'нам звонили из офиса господина Крылова.\n' +
      'Интересовались вашей бронью.\n\n' +
      'В частности, спрашивали, будете ли\n' +
      'вы одна.\n\n' +
      'Мы не обязаны отвечать на такие вопросы,\n' +
      'но считаем нужным вас предупредить.\n\n' +
      'С уважением,\n' +
      'Администрация киноателье'
  },

  e5: {
    from: 'Неизвестный отправитель',
    fromShort: 'Неизвестный',
    addr: '*******@****.***',
    av: '?',
    color: '#ff5a6e',
    subj: 'Про Кирилла',
    date: '15 марта 2024',
    time: '02:14',
    tag: 'анонимное',
    unread: false,
    ev: 'note_reg',
    flag: 'read_email_anon',
    critical: true,
    body:
      'Марина,\n\n' +
      'Ты меня не знаешь. Это правильно.\n\n' +
      'Я хранил эту запись четыре года.\n' +
      'Хранил по разным причинам.\n' +
      'Сначала боялся. Потом не мог решиться.\n' +
      'Потом уже было слишком поздно.\n\n' +
      'Теперь я передаю её тебе.\n\n' +
      'Запись лежит в камере хранения\n' +
      'на Курском вокзале, ячейка 147.\n' +
      'Пароль: 14092019.\n\n' +
      'Ты поймёшь, когда увидишь.\n\n' +
      'Я не прошу у тебя прощения.\n' +
      'Я не заслужил его.\n\n' +
      'Но я хочу, чтобы ты знала —\n' +
      'он не был виноват.\n\n' +
      'Кирилл. Он ни в чём не был виноват.\n\n' +
      'Прости меня. Если сможешь.\n\n' +
      'P.S.\n' +
      'Не ищи меня. Меня больше нет.\n' +
      'По крайней мере, того меня,\n' +
      'который мог бы тебе помочь.\n\n' +
      'P.P.S.\n' +
      'Тот, кто сбил Кирилла,\n' +
      'до сих пор рядом с тобой.\n' +
      'Будь осторожна.'
  },

  e6: {
    from: 'Ольга Соколовская',
    fromShort: 'Ольга',
    addr: 'o.sokolovskaya@fond-nadezhda.ru',
    av: 'ОС',
    color: '#c8d1e2',
    subj: 'Пожалуйста, не надо',
    date: '3 апреля 2024',
    time: '18:46',
    tag: 'личное',
    unread: false,
    ev: 'search_olga',
    flag: 'read_email_olga',
    body:
      'Марина,\n\n' +
      'Я пишу вам не как жена Виктора Павловича.\n' +
      'Я пишу вам как женщина, которая\n' +
      'двадцать лет живёт с этим человеком.\n\n' +
      'Вы не знаете всей правды.\n' +
      'Вы знаете фрагмент. Один фрагмент.\n\n' +
      'И этого фрагмента достаточно,\n' +
      'чтобы разрушить сразу несколько жизней.\n\n' +
      'Вашу. Мою. Жизнь моего сына.\n' +
      'И, что самое главное, —\n' +
      'жизнь моего мужа.\n\n' +
      'Я не оправдываю его.\n' +
      'Я не говорю, что он ни в чём не виноват.\n\n' +
      'Я говорю о том, что иногда\n' +
      'правда никого не спасает.\n' +
      'Она только всех уничтожает.\n\n' +
      'Прошу вас. Просто подумайте.\n\n' +
      'Ольга.'
  },

  e7: {
    from: 'Мама',
    fromShort: 'Мама',
    addr: 'sokolova.ea@yandex.ru',
    av: 'М',
    color: '#ffb84d',
    subj: 'Кассета с Кириллом',
    date: '10 апреля 2024',
    time: '20:15',
    tag: 'личное',
    unread: false,
    ev: null,
    flag: 'read_email_mama',
    body:
      'Мариночка,\n\n' +
      'Я разбирала старые вещи и нашла\n' +
      'кассету с Кириллом.\n\n' +
      'Он там маленький, ему лет семь.\n' +
      'Катается на велосипеде во дворе.\n' +
      'Смеётся.\n\n' +
      'Я весь вечер смотрела её.\n' +
      'Плакала.\n\n' +
      'Я знаю, что ты не хочешь\n' +
      'говорить о нём.\n' +
      'Я понимаю.\n\n' +
      'Но я хочу, чтобы ты помнила:\n' +
      'у тебя был брат. Хороший, весёлый,\n' +
      'добрый мальчик.\n\n' +
      'Он тебя любил больше всех на свете.\n\n' +
      'Что бы ты ни делала —\n' +
      'он бы тебя понял.\n\n' +
      'Твоя мама.'
  },

  e8: {
    from: 'Деканат факультета кино',
    fromShort: 'Деканат',
    addr: 'dekanat@academy.ru',
    av: 'Д',
    color: '#5da9ff',
    subj: 'О защите диплома (Соколова М. А.)',
    date: '11 апреля 2024',
    time: '11:30',
    tag: 'официальное',
    unread: false,
    ev: null,
    flag: 'read_email_dekanat',
    body:
      'Уважаемая Марина Андреевна,\n\n' +
      'Доводим до вашего сведения,\n' +
      'что 10 апреля сего года\n' +
      'от вашего научного руководителя\n' +
      'Соколовского В. П.\n' +
      'поступило ходатайство\n' +
      'об отзыве научного руководства.\n\n' +
      'Причина: «несоответствие темы\n' +
      'дипломной работы утверждённому\n' +
      'регламенту».\n\n' +
      'На данный момент ходатайство\n' +
      'оставлено без движения.\n\n' +
      'Однако вы должны быть готовы\n' +
      'к дополнительной защите\n' +
      'перед комиссией.\n\n' +
      'С уважением,\n' +
      'Деканат факультета кино'
  },

  e9: {
    from: 'Антон Ветров',
    fromShort: 'Антон',
    addr: 'a.vetrov@academy.ru',
    av: 'АВ',
    color: '#5da9ff',
    subj: 'Слушай, это важно',
    date: '14 апреля 2024',
    time: '01:15',
    tag: 'срочно',
    unread: true,
    ev: 'anton_testimony',
    flag: 'read_email_anton',
    critical: true,
    body:
      'Марина,\n\n' +
      'Я только что вернулся с показа.\n\n' +
      'Я видел тебя у служебного входа\n' +
      'в 22:20. Ты выходила с мужчиной.\n' +
      'Он был в тёмном пальто.\n\n' +
      'Ты была бледная.\n' +
      'Ты не улыбалась.\n' +
      'Он держал тебя за локоть.\n' +
      'Как-то странно.\n\n' +
      'Я попытался подойти, но вы\n' +
      'быстро сели в машину\n' +
      'и уехали.\n\n' +
      'Я записал номер.\n' +
      'Он неполный, часть букв не видно.\n' +
      'Но что-то мне подсказывает —\n' +
      'это важно.\n\n' +
      'Марина, если ты это читаешь —\n' +
      'позвони мне.\n' +
      'Немедленно.\n\n' +
      'Если не читаешь —\n' +
      'я расскажу всё полиции.\n\n' +
      'Антон.'
  },

  e10: {
    from: 'Юля Соколова',
    fromShort: 'Юля',
    addr: 'yulia.sokolova@gmail.com',
    av: 'ЮС',
    color: '#ff7a9c',
    subj: 'Про сына',
    date: '6 апреля 2024',
    time: '14:42',
    tag: 'личное',
    unread: false,
    ev: null,
    flag: 'read_email_yulia',
    body:
      'Мариш,\n\n' +
      'Не хочу писать это по телефону,\n' +
      'потому что боюсь заплакать\n' +
      'и бросить трубку.\n\n' +
      'Саше исполнилось четыре.\n' +
      'Он уже спрашивает про папу.\n\n' +
      'Я не знаю, что ему говорить.\n' +
      'Что его отец погиб\n' +
      'в какой-то аварии?\n' +
      'Что виновника не нашли?\n' +
      'Что нам никто ничего не объяснил?\n\n' +
      'Мариш, я не хочу, чтобы он вырос\n' +
      'с чувством, что жизнь\n' +
      'несправедлива.\n\n' +
      'Но я не знаю, как объяснить\n' +
      'ему правду, если сама\n' +
      'её не понимаю.\n\n' +
      'Покажи свой фильм.\n' +
      'Может быть, тогда\n' +
      'хотя бы Саша поймёт.\n\n' +
      'Юля.'
  },

  e11: {
    from: 'Академия киноискусства',
    fromShort: 'Академия',
    addr: 'info@academy.ru',
    av: 'АК',
    color: '#8b6dff',
    subj: 'Приглашение на защиту',
    date: '12 апреля 2024',
    time: '10:20',
    tag: 'служебное',
    unread: false,
    ev: null,
    flag: 'read_email_akademy',
    body:
      'Уважаемая Марина Андреевна,\n\n' +
      'Приглашаем вас на защиту дипломной работы\n' +
      'по теме «Документальное кино как инструмент\n' +
      'восстановления справедливости».\n\n' +
      'Дата: 15 апреля 2024\n' +
      'Время: 14:00\n' +
      'Место: Актовый зал, 2-й этаж\n\n' +
      'Ваш научный руководитель:\n' +
      'Соколовский В. П.\n\n' +
      'Желаем удачи.\n\n' +
      'Академия киноискусства'
  },

  e12: {
    from: 'Дима Лапин',
    fromShort: 'Дима',
    addr: 'd.lapin1997@mail.ru',
    av: 'ДЛ',
    color: '#5da9ff',
    subj: 'Я знаю, ты меня читаешь',
    date: '12 апреля 2024',
    time: '23:30',
    tag: 'угроза',
    unread: false,
    ev: 'dima_stalk',
    flag: 'read_email_dima',
    body:
      'Марина.\n\n' +
      'Я знаю, ты меня читаешь.\n' +
      'Ты всегда читала мои письма,\n' +
      'даже когда говорила, что нет.\n\n' +
      'Я видел тебя сегодня.\n' +
      'С этим мужиком.\n' +
      'У ателье.\n\n' +
      'Кто он?\n' +
      'Сколько ему лет?\n' +
      'Почему он тебя трогает?\n\n' +
      'Марина, я не угрожаю.\n' +
      'Я просто хочу знать.\n\n' +
      'Ты помнишь, что ты мне обещала?\n' +
      'Ты говорила, что мы будем вместе.\n' +
      'Ты говорила, что никто,\n' +
      'кроме меня, тебе не нужен.\n\n' +
      'Что изменилось?\n\n' +
      'Ответь мне.\n' +
      'Пожалуйста.\n\n' +
      'Дима.'
  },

  e13: {
    from: 'Служба безопасности академии',
    fromShort: 'Безопасность',
    addr: 'security@academy.ru',
    av: 'СБ',
    color: '#7a869c',
    subj: 'О происшествии у служебного входа',
    date: '14 апреля 2024',
    time: '09:30',
    tag: 'официальное',
    unread: false,
    ev: 'anton_testimony',
    flag: 'read_email_security',
    body:
      'Уважаемая Марина Андреевна,\n\n' +
      'Сообщаем вам, что 13 апреля около\n' +
      '22:20 у служебного входа академии\n' +
      'произошёл инцидент.\n\n' +
      'Неустановленный мужчина в тёмном пальто\n' +
      'пытался пройти внутрь через служебный вход,\n' +
      'минуя охрану.\n\n' +
      'Его остановил сотрудник охраны.\n' +
      'Мужчина представился гостем\n' +
      'и предъявил пригласительный билет.\n\n' +
      'На вопрос о цели визита\n' +
      'он ответил уклончиво.\n\n' +
      'Мы связались с организаторами показа.\n' +
      'Инцидент исчерпан.\n\n' +
      'Однако рекомендуем вам\n' +
      'быть внимательной.\n\n' +
      'Служба безопасности'
  },

  e14: {
    from: 'Черновик',
    fromShort: 'Черновик',
    addr: '—',
    av: '✎',
    color: '#4d576b',
    subj: 'НЕОТПРАВЛЕННОЕ ПИСЬМО',
    date: '13 апреля 2024',
    time: '23:56',
    tag: 'черновик',
    unread: false,
    ev: 'phone_before_call',
    flag: 'read_email_draft',
    critical: true,
    body:
      '[НЕОТПРАВЛЕННОЕ СООБЩЕНИЕ]\n' +
      '[СОХРАНЕНО В ЧЕРНОВИКЕ]\n' +
      '[ВРЕМЯ: 13 апреля 2024, 23:56]\n\n' +
      'Получатель: Лена Крылова\n\n' +
      'Текст:\n\n' +
      'Лен,\n\n' +
      'Если ты это читаешь,\n' +
      'значит, я не смогла\n' +
      'отправить.\n\n' +
      'Я в ателье. Павильон №3.\n' +
      'Он здесь.\n\n' +
      'Он не отрицает.\n' +
      'Он просто не понимает,\n' +
      'почему это так важно.\n' +
      'Для меня.\n' +
      'Для Кирилла.\n' +
      'Для всех нас.\n\n' +
      'У меня в кармане телефон.\n' +
      'Я его не выключала.\n' +
      'Запись идёт.\n\n' +
      'Если что — ты знаешь,\n' +
      'что делать.\n\n' +
      'Папка «Кирилл».\n' +
      'Пароль ты знаешь.\n\n' +
      'Прости меня, если сможешь.\n' +
      'И передай маме, что я её\n' +
      'очень сильно люблю.\n\n' +
      'Марина.\n\n' +
      '[КОНЕЦ ЧЕРНОВИКА]'

  }
};

/* ------------------------------------------------------------
   РЕНДЕР ПОЧТЫ
   ------------------------------------------------------------ */
ROUTES.mail = function(){
  G.screen = 'mail';

  const ids = Object.keys(EMAILS);
  const unreadCount = ids.filter(function(id){
    return EMAILS[id].unread && !G.opened.emails[id];
  }).length;

  /* Сортируем: непрочитанные вверх, потом по дате */
  const sorted = ids.slice().sort(function(a, b){
    const ua = EMAILS[a].unread && !G.opened.emails[a] ? 0 : 1;
    const ub = EMAILS[b].unread && !G.opened.emails[b] ? 0 : 1;
    if(ua !== ub) return ua - ub;
    return 0;
  });

  const rows = sorted.map(function(id){
    return renderEmailRow(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Почта</h2>'
  +     '<div class="sub">'
  +       ids.length + ' писем'
  +       + (unreadCount ? ' · ' + unreadCount + ' новых' : '')
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="mailFilter()">' + svg('grid', 18) + '</button>'
  + '</div>'

  + '<div class="mail-filter">'
  +   '<button class="mf-chip active" onclick="filterMail(\'all\', this)">Все</button>'
  +   '<button class="mf-chip" onclick="filterMail(\'срочно\', this)">Срочные</button>'
  +   '<button class="mf-chip" onclick="filterMail(\'официальное\', this)">Офиц.</button>'
  +   '<button class="mf-chip" onclick="filterMail(\'личное\', this)">Личные</button>'
  +   '<button class="mf-chip" onclick="filterMail(\'анонимное\', this)">Анон.</button>'
  + '</div>'

  + '<div class="mail-list" id="mailList">' + rows + '</div>');
};

function renderEmailRow(id){
  const m = EMAILS[id];
  if(!m) return '';
  const unread = m.unread && !G.opened.emails[id];

  return ''
  + '<div class="email-row' + (unread ? ' unread' : '') + '" '
  +   'data-tag="' + m.tag + '" '
  +   'onclick="openEmail(\'' + id + '\')">'
  +   '<div class="er-avatar" style="background:' + m.color + '">'
  +     m.av
  +   '</div>'
  +   '<div class="er-body">'
  +     '<div class="er-top">'
  +       '<span class="er-from">' + escapeHtml(m.fromShort) + '</span>'
  +       '<span class="er-time">' + escapeHtml(m.time) + '</span>'
  +     '</div>'
  +     '<div class="er-subj">' + escapeHtml(m.subj) + '</div>'
  +     '<div class="er-preview">'
  +       escapeHtml((m.body || '').split('\n').filter(function(l){ return l.trim(); })[0] || '')
  +     '</div>'
  +     '<div class="er-tag">'
  +       (unread ? '<span class="er-dot"></span>' : '')
  +       '<span>' + escapeHtml(m.tag) + '</span>'
  +     '</div>'
  +   '</div>'
  + '</div>';
}

function filterMail(tag, btn){
  document.querySelectorAll('.mf-chip').forEach(function(b){
    b.classList.remove('active');
  });
  if(btn) btn.classList.add('active');

  document.querySelectorAll('.email-row').forEach(function(el){
    const t = el.getAttribute('data-tag');
    if(tag === 'all' || t === tag){
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
  haptic(8);
}

function mailFilter(){
  toast('Фильтр', 'Сортировка по отправителю откроется позже', 'warn');
}

function openEmail(id){
  const m = EMAILS[id];
  if(!m) return;

  const first = !G.opened.emails[id];
  G.opened.emails[id] = true;

  if(m.flag) setFlag(m.flag);

  if(m.ev && !hasEv(m.ev)){
    addEv(m.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[m.ev] || m.subj, 'ev');
    }, 500);
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Письмо</h2></div>'
  +   '<button class="back" onclick="emailActions(\'' + id + '\')">'
  +     svg('more', 18)
  +   '</button>'
  + '</div>'

  + '<div class="email-view">'

  +   '<div class="ev-header">'
  +     '<div class="ev-avatar" style="background:' + m.color + '">'
  +       m.av
  +     '</div>'
  +     '<div class="ev-meta">'
  +       '<div class="ev-from">' + escapeHtml(m.from) + '</div>'
  +       '<div class="ev-addr">' + escapeHtml(m.addr) + '</div>'
  +     '</div>'
  +   '</div>'

  +   '<h2 class="ev-subj">' + escapeHtml(m.subj) + '</h2>'

  +   '<div class="ev-date">'
  +     svg('calendar', 12) + ' ' + escapeHtml(m.date)
  +     + ' · '
  +     + svg('clock', 12) + ' ' + escapeHtml(m.time)
  +   '</div>'

  +   '<div class="ev-tagbox">'
  +     svg('tag', 11) + ' ' + escapeHtml(m.tag)
  +     + (m.critical
  +       ? ' · <span style="color:var(--warn)">'
  +         + svg('starFill', 10, 'fill') + ' Важно</span>'
  +       : '')
  +   '</div>'

  +   '<div class="ev-body">' + formatNoteText(m.body) + '</div>'

  +   '<div class="ev-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' К почте'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="toast(\'В дело\',\'Письмо приобщено\',\'ok\')">'
  +       svg('fileText', 16) + ' В дело'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(500, 0.03);
}

function emailActions(id){
  toast('Действия', 'Ответить · Переслать · Удалить', 'warn');
}

/* ============================================================
   БЛОК 2 — КАРТА ЛОКАЦИЙ
   ============================================================ */

const LOCATIONS = {

  loc1: {
    id: 'loc1',
    name: 'Кольцевая трасса, 47-й км',
    short: 'Место аварии',
    x: 50,
    y: 20,
    color: '#ff5a6e',
    ico: 'pin',
    tag: 'авария',
    ev: 'photo_crash',
    flag: 'saw_loc_crash',
    date: '14 сентября 2019',
    time: '02:14',
    desc:
      'Место, где погиб Кирилл Соколов. Пустой участок трассы, '
      + 'плохое освещение. Одна камера из двух не работала. '
      + 'Свидетелей нет. Дело закрыто.',
    facts: [
      'Камеры: 2. Из них 1 не работала (ремонт)',
      'Освещение: слабое',
      'Погода в ту ночь: дождь',
      'Тело обнаружено: 02:32',
      'Свидетели: не установлены'
    ]
  },

  loc2: {
    id: 'loc2',
    name: 'Квартира Соколовых',
    short: 'Дом Марины',
    x: 65,
    y: 55,
    color: '#5da9ff',
    ico: 'home',
    tag: 'дом',
    ev: 'sonya_timeline',
    flag: 'saw_loc_home',
    date: '14 апреля 2024',
    time: '21:15',
    desc:
      'Квартира, которую Марина снимала вместе с соседкой Соней. '
      + 'Здесь был найден её телефон — под диваном в гостиной. '
      + 'Куртка осталась на стуле.',
    facts: [
      'Адрес: ул. Пушкина, 12, кв. 47',
      'Соседка: Софья Мельник',
      'Телефон найден: под диваном, выключен',
      'Куртка: на стуле (значит, вышла без неё)',
      'Следов борьбы: не обнаружено'
    ]
  },

  loc3: {
    id: 'loc3',
    name: 'Кинотеатр «Родина»',
    short: 'Место показа',
    x: 40,
    y: 45,
    color: '#8b6dff',
    ico: 'filmPlay',
    tag: 'показ',
    ev: 'photo_hall',
    flag: 'saw_loc_cinema',
    date: '13 апреля 2024',
    time: '21:52',
    desc:
      'Здесь состоялся показ дипломного фильма Марины. '
      + 'В первом ряду сидел мужчина в тёмном пальто. '
      + 'Марина вышла через служебный вход в 22:20.',
    facts: [
      'Адрес: ул. Ленина, 8',
      'Зал: №2, 240 мест',
      'Показ начался: 21:30',
      'Служебный вход: со стороны двора',
      'Камера у входа: фиксирует выезд машин'
    ]
  },

  loc4: {
    id: 'loc4',
    name: 'Киноателье «Сокол»',
    short: 'Место исчезновения',
    x: 75,
    y: 30,
    color: '#ffb84d',
    ico: 'film',
    tag: 'ателье',
    ev: 'photo_blood',
    flag: 'saw_loc_studio',
    critical: true,
    date: '13-14 апреля 2024',
    time: '23:47 – 08:34',
    desc:
      'Место, где Марина провела последние часы. '
      + 'Павильон №3 — самый большой в здании. '
      + 'Здесь найдены следы крови. Тело не обнаружено.',
    facts: [
      'Адрес: ул. Заводская, 14',
      'Павильон №3: 620 м², 2 этажа',
      'Бронь: 23:00 – 01:00',
      'Собственник: ООО «Крылов и партнёры»',
      'Следы: пятно крови, затёртое утром',
      'Дверь подсобки: закрыта снаружи на замок'
    ]
  },

  loc5: {
    id: 'loc5',
    name: 'Академия киноискусства',
    short: 'Место учёбы',
    x: 30,
    y: 65,
    color: '#7a869c',
    ico: 'book',
    tag: 'академия',
    ev: 'chat_viktor',
    flag: 'saw_loc_academy',
    date: 'весь период',
    time: '—',
    desc:
      'Учебное заведение, где училась Марина. '
      + 'Здесь работает Виктор Павлович Соколовский, '
      + 'её научный руководитель. Здесь произошёл '
      + 'ключевой конфликт из-за диплома.',
    facts: [
      'Адрес: пр. Мира, 45',
      'Кафедра: режиссура',
      'Руководитель: Соколовский В. П.',
      'Парковка: закрытая, есть камеры'
    ]
  },

  loc6: {
    id: 'loc6',
    name: 'Курский вокзал',
    short: 'Камера хранения',
    x: 20,
    y: 80,
    color: '#3ddc97',
    ico: 'folder',
    tag: 'тайник',
    ev: 'note_reg',
    flag: 'saw_loc_station',
    date: '15 марта 2024',
    time: '—',
    desc:
      'Здесь аноним оставил запись с регистратора. '
      + 'Ячейка №147, пароль 14092019. '
      + 'Марина забрала запись 15 марта 2024 года.',
    facts: [
      'Адрес: ул. Курская, 1',
      'Ячейка: 147',
      'Пароль: 14092019',
      'Дата получения записи: 15 марта 2024',
      'Отправитель: не установлен'
    ]
  },

  loc7: {
    id: 'loc7',
    name: 'Офис «Крылов и партнёры»',
    short: 'Офис продюсера',
    x: 85,
    y: 60,
    color: '#c8d1e2',
    ico: 'folder',
    tag: 'бизнес',
    ev: 'search_krylov',
    flag: 'saw_loc_office',
    date: '—',
    time: '—',
    desc:
      'Продюсерский центр Андрея Крылова. '
      + 'Компания владеет киноателье «Сокол» и '
      + 'финансирует кафедру Соколовского. '
      + '12 млн — цена молчания Марины.',
    facts: [
      'Адрес: Пресненская наб., 12',
      'Директор: Крылов А. В.',
      'В собственности: 3 киноателье',
      'Связь с кафедрой: 7 лет, 45 млн ₽',
      'Юридическая служба: закрытая'
    ]
  },

  loc8: {
    id: 'loc8',
    name: 'Дом Артёма',
    short: 'Квартира жениха',
    x: 45,
    y: 15,
    color: '#ff8a5c',
    ico: 'home',
    tag: 'дом',
    ev: 'artem_alibi',
    flag: 'saw_loc_artem',
    date: '—',
    time: '—',
    desc:
      'Квартира, где Марина жила бы после свадьбы. '
      + 'Здесь хранился костюм для показа. '
      + 'Артём уехал отсюда вечером 12 апреля.',
    facts: [
      'Адрес: ул. Тверская, 88, кв. 12',
      'Живёт: один',
      'Костюм: забран из химчистки',
      'Отъезд: 12 апреля, 21:40',
      'Возвращение: 14 апреля, 06:30'
    ]
  },

  loc9: {
    id: 'loc9',
    name: 'Квартира Соколовского',
    short: 'Дом Виктора',
    x: 10,
    y: 40,
    color: '#8b6dff',
    ico: 'home',
    tag: 'дом',
    ev: 'search_olga',
    flag: 'saw_loc_viktor',
    date: '—',
    time: '—',
    desc:
      'Семейный дом Виктора Павловича и Ольги. '
      + 'Здесь живёт их сын Вадим (иногда). '
      + 'Виктор уехал отсюда в ночь 13 апреля.',
    facts: [
      'Адрес: Рублёвское ш., 12',
      'Проживают: Виктор П., Ольга, Вадим',
      'Машина в гараже: BMW X5',
      'Уехал 13 апреля: 22:40',
      'Вернулся 14 апреля: 04:20'
    ]
  },

  loc10: {
    id: 'loc10',
    name: 'Офис ГИБДД',
    short: 'Архив дел',
    x: 15,
    y: 60,
    color: '#5da9ff',
    ico: 'fileText',
    tag: 'официально',
    ev: 'search_case',
    flag: 'saw_loc_gibdd',
    date: '15 ноября 2019',
    time: '—',
    desc:
      'Здесь хранится дело №4471/2019 о гибели Кирилла. '
      + 'Дело закрыто 15 ноября 2019. Причина — '
      + '«неустановление лица». Подпись инспектора неразборчива.',
    facts: [
      'Адрес: ул. Большая Ордынка, 45',
      'Дело: №4471/2019',
      'Статус: приостановлено',
      'Инспектор: [подпись нечитаема]',
      'Дата закрытия: 15 ноября 2019'
    ]
  },

  loc11: {
    id: 'loc11',
    name: 'Кафе «Гнездо»',
    short: 'Встреча с Димой',
    x: 55,
    y: 75,
    color: '#5da9ff',
    ico: 'user',
    tag: 'встреча',
    ev: 'dima_stalk',
    flag: 'saw_loc_cafe',
    date: '11 апреля 2024',
    time: '19:30',
    desc:
      'Кафе, где Дима Лапин следил за Мариной и Артёмом. '
      + 'Марина заметила его и записала это в заметках. '
      + 'Очередное напоминание о том, что она не одна.',
    facts: [
      'Адрес: ул. Садовая, 8',
      'Время визита: 19:30',
      'Дима: сидел через два столика',
      'Марина: заметила, ушла через 15 минут'
    ]
  },

  loc12: {
    id: 'loc12',
    name: 'Квартира Лены',
    short: 'Дом подруги',
    x: 35,
    y: 30,
    color: '#e05c7a',
    ico: 'home',
    tag: 'дом',
    ev: 'chat_lena',
    flag: 'saw_loc_lena',
    date: '—',
    time: '—',
    desc:
      'Единственное место, где Марина чувствовала себя '
      + 'в безопасности. Здесь она оставила бы '
      + 'второй комплект ключей и все свои черновики.',
    facts: [
      'Адрес: ул. Малая Бронная, 22',
      'Живёт: одна',
      'Расстояние от дома Марины: 4 км',
      'Лена была: дома 13 апреля, 22:31'
    ]
  }
};

/* ------------------------------------------------------------
   РЕНДЕР КАРТЫ
   ------------------------------------------------------------ */
ROUTES.map = function(){
  G.screen = 'map';

  const ids = Object.keys(LOCATIONS);
  const markers = ids.map(function(id){
    return renderLocationMarker(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Карта дела</h2>'
  +     '<div class="sub">' + ids.length + ' локаций · Москва</div>'
  +   '</div>'
  +   '<button class="back" onclick="toast(\'Фильтр\',\'Показать только важные\',\'warn\')">'
  +     svg('flag', 18)
  +   '</button>'
  + '</div>'

  + '<div class="map-view">'
  +   '<div class="map-canvas">'
  +     '<div class="map-grid"></div>'
  +     '<div class="map-label map-label-n">С</div>'
  +     '<div class="map-label map-label-s">Ю</div>'
  +     '<div class="map-label map-label-w">З</div>'
  +     '<div class="map-label map-label-e">В</div>'
  +     markers
  +   '</div>'

  +   '<div class="map-info">'
  +     svg('info', 12)
  +     '<span>Нажмите на метку, чтобы увидеть детали локации</span>'
  +   '</div>'
  + '</div>');
};

function renderLocationMarker(id){
  const l = LOCATIONS[id];
  if(!l) return '';
  const seen = G.opened.locations && G.opened.locations[id];

  return ''
  + '<div class="map-pin' + (l.critical ? ' critical' : '') + (seen ? ' seen' : '') + '" '
  +   'style="left:' + l.x + '%;top:' + l.y + '%;'
  +     + '--pin-color:' + l.color + '" '
  +   'onclick="openLocation(\'' + id + '\')">'
  +   '<div class="mp-inner">' + svg(l.ico, 14) + '</div>'
  +   '<div class="mp-pulse"></div>'
  + '</div>';
}

/* ------------------------------------------------------------
   ОТКРЫТИЕ ЛОКАЦИИ
   ------------------------------------------------------------ */
function openLocation(id){
  const l = LOCATIONS[id];
  if(!l) return;

  if(!G.opened.locations) G.opened.locations = {};
  G.opened.locations[id] = true;

  if(l.flag) setFlag(l.flag);

  if(l.ev && !hasEv(l.ev)){
    addEv(l.ev);
    setTimeout(function(){
      toast('📌 Улика', EVIDENCE_TITLES[l.ev] || l.name, 'ev');
    }, 500);
  }

  const facts = (l.facts || []).map(function(f){
    return ''
    + '<div class="loc-fact">'
    +   '<div class="lf-dot"></div>'
    +   '<div class="lf-text">' + escapeHtml(f) + '</div>'
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Локация</h2>'
  +     '<div class="sub">' + escapeHtml(l.tag) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="loc-view">'

  +   '<div class="loc-hero" style="border-color:' + l.color + '">'
  +     '<div class="lh-icon" style="color:' + l.color + ';'
  +       + 'background:linear-gradient(140deg,'
  +       + l.color + '22,' + l.color + '11)">'
  +       svg(l.ico, 40)
  +     '</div>'
  +     '<h2>' + escapeHtml(l.name) + '</h2>'
  +     '<div class="lh-sub">' + escapeHtml(l.short) + '</div>'
  +   '</div>'

  +   '<div class="loc-meta">'
  +     '<div class="lm-row">'
  +       '<span>Дата</span>'
  +       '<b>' + escapeHtml(l.date) + '</b>'
  +     '</div>'
  +     '<div class="lm-row">'
  +       '<span>Время</span>'
  +       '<b>' + escapeHtml(l.time) + '</b>'
  +     '</div>'
  +   '</div>'

  +   '<div class="loc-desc">' + escapeHtml(l.desc) + '</div>'

  +   '<div class="loc-facts-block">'
  +     '<div class="lfb-label">'
  +       svg('info', 12) + ' Факты'
  +     '</div>'
  +     '<div class="lfb-list">' + facts + '</div>'
  +   '</div>'

  +   '<div class="loc-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' К карте'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="toast(\'Отметка\',\'Локация добавлена в дело\',\'ok\')">'
  +       svg('bookmark', 16) + ' В дело'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(560, 0.03);
}

/* ============================================================
   БЛОК 3 — ПРОФАЙЛЕР
   ============================================================ */

const PROFILES = {

  prof_viktor: {
    id: 'prof_viktor',
    name: 'Виктор Павлович Соколовский',
    short: 'Виктор Павлович',
    role: 'научный руководитель',
    av: 'ВП',
    color: '#8b6dff',
    age: 54,
    work: 'Руководитель кафедры киноискусства',
    unlock: 'chat_viktor',
    danger: 9,
    alibi: 'Нет',
    motive: 'Скрыть участие в ДТП 2019 года',
    suspicious: [
      'Требовал убрать вторую часть фильма',
      'Вызвал Марину в ателье ночью',
      'Последний звонок был к нему',
      'Бледнеет при упоминании Кольцевой',
      'Пять лет назад «разбил машину»',
      'Интересуется всем, что связано с Кириллом'
    ],
    alibiCheck: 'Проверяется. Утверждает, что был дома. Жена говорит, что уехал в 22:40 и вернулся в 4:20.',
    notes:
      'Ключевой фигурант. Марина была уверена, что он замешан в гибели брата. ' +
      'Он не просто боится — он знает. И он единственный, кто точно был ' +
      'в ателье в ту ночь. Аудиозапись, найденная в телефоне, содержит ' +
      'его признание.',
    questions: [
      'Почему он так настойчиво требовал убрать вторую часть?',
      'Что он делал в ателье ночью?',
      'Куда он уехал после 00:47?',
      'Что он сделал с телом Марины?'
    ]
  },

  prof_krylov: {
    id: 'prof_krylov',
    name: 'Андрей Владимирович Крылов',
    short: 'Андрей Крылов',
    role: 'продюсер, владелец студии',
    av: 'АК',
    color: '#c8d1e2',
    age: 48,
    work: 'ООО «Крылов и партнёры»',
    unlock: 'search_krylov',
    danger: 7,
    alibi: 'Частичное',
    motive: 'Сокрытие соучастия в ДТП',
    suspicious: [
      'Предлагал 12 млн за отказ от показа',
      'Интересовался, будет ли Марина одна',
      'Финансирует кафедру Соколовского',
      'Владеет киноателье «Сокол»',
      'Помог закрыть дело в 2019 году'
    ],
    alibiCheck: 'Был в офисе. Адвокат подтверждает. Но он интересовался бронью павильона заранее.',
    notes:
      'Соучастник. Возможно, не убийца, но точно знал о плане Виктора. ' +
      'Платёж в 45 млн за кафедру — не благотворительность, а плата за молчание. ' +
      'Именно он закрыл дело в 2019 году через нужные связи.',
    questions: [
      'Зачем ему закрывать дело 2019 года?',
      'Кто именно из его сотрудников звонил в ателье?',
      'Почему он так боится одной сцены в фильме?'
    ]
  },

  prof_artem: {
    id: 'prof_artem',
    name: 'Артём Северов',
    short: 'Артём',
    role: 'жених',
    av: 'АС',
    color: '#ff8a5c',
    age: 27,
    work: 'Менеджер в IT-компании',
    unlock: 'artem_alibi',
    danger: 4,
    alibi: 'Подтверждено',
    motive: 'Ревность',
    suspicious: [
      'Ревновал Марину к неизвестному мужчине',
      'Писал ей 14 раз за ночь',
      'Подозревал её в измене',
      'Угрожал «найти» её'
    ],
    alibiCheck: 'Подтверждено. Брат в Солнечногорске, камеры на трассе. В момент исчезновения был в 60 км от места.',
    notes:
      'Не убийца. Но плохой жених. Марина не любила его так, ' +
      'как он её. Он чувствовал это и стал агрессивным. ' +
      'После исчезновения звонил ей всю ночь и звонил в полицию.',
    questions: [
      'К кому именно он ревновал Марину?',
      'Почему он уехал, а не остался?',
      'Он что-то скрывает или просто растерян?'
    ]
  },

  prof_dima: {
    id: 'prof_dima',
    name: 'Дмитрий Лапин',
    short: 'Дима',
    role: 'бывший парень',
    av: 'ДЛ',
    color: '#5da9ff',
    age: 29,
    work: 'Менеджер в кафе',
    unlock: 'dima_stalk',
    danger: 6,
    alibi: 'Частичное',
    motive: 'Одержимость',
    suspicious: [
      'Следил за Мариной',
      'Звонил ночью с угрозами',
      'Не знал о Кирилле',
      'Был в кафе рядом с Мариной',
      'Писал «я найду тебя»'
    ],
    alibiCheck: 'Проверяется. Утверждает, что был дома. Соседи не подтверждают.',
    notes:
      'Не причастен к гибели Кирилла. Но он стабильно опасен для Марины. ' +
      'Сталкер. Настоящая проблема — он может быть способен на насилие. ' +
      'Но в ночь исчезновения он не мог быть в ателье — он был дома.',
    questions: [
      'Что он делал 13 апреля ночью?',
      'Он следовал за Мариной?',
      'Как он узнал, где она живёт?'
    ]
  },

  prof_anton: {
    id: 'prof_anton',
    name: 'Антон Ветров',
    short: 'Антон',
    role: 'одногруппник, друг Кирилла',
    av: 'АВ',
    color: '#5da9ff',
    age: 24,
    work: 'Студент 4 курса',
    unlock: 'anton_testimony',
    danger: 2,
    alibi: 'Подтверждено',
    motive: 'Нет',
    suspicious: [
      'Видел Марину с мужчиной',
      'Пришёл в полицию добровольно',
      'Друг Кирилла (убитого брата)'
    ],
    alibiCheck: 'Подтверждено. Был в баре, есть камеры и свидетели.',
    notes:
      'Один из честных людей. Единственный, кто сразу пришёл ' +
      'в полицию. Показания ценные: он видел, как Марину уводили. ' +
      'Он не при чём.',
    questions: [
      'Насколько точны его показания?',
      'Может ли он вспомнить больше?',
      'Что он знал о прошлом Кирилла?'
    ]
  },

  prof_sonya: {
    id: 'prof_sonya',
    name: 'Софья Мельник',
    short: 'Соня',
    role: 'соседка по квартире',
    av: 'СМ',
    color: '#3ddc97',
    age: 25,
    work: 'Студентка медицинского',
    unlock: 'sonya_timeline',
    danger: 1,
    alibi: 'Подтверждено',
    motive: 'Нет',
    suspicious: [
      'Не была на показе',
      'Уехала к родителям 12 апреля',
      'Нашла телефон под диваном'
    ],
    alibiCheck: 'Подтверждено. Была у родителей, день рождения мамы.',
    notes:
      'Соседка, которая просто оказалась рядом. Не замешана. ' +
      'Но её показания дают важную хронологию: Марина вышла ' +
      'без куртки — значит, торопилась и планировала вернуться.',
    questions: [
      'Что ещё она помнит?',
      'Какие вещи Марины она нашла?',
      'Что говорила Марина о Викторе Павловиче?'
    ]
  },

  prof_vadim: {
    id: 'prof_vadim',
    name: 'Вадим Соколовский',
    short: 'Вадим',
    role: 'сын Виктора Павловича',
    av: 'ВС',
    color: '#ff5a6e',
    age: 27,
    work: 'Юрист в фирме отца',
    unlock: 'chat_viktor',
    danger: 8,
    motive: 'Помощь отцу',
    alibi: 'Слабое',
    suspicious: [
      'Писал Марине угрозы',
      'Был в ателье ночью',
      'Помогал убирать следы',
      'Получил звонок от отца'
    ],
    alibiCheck: 'Опровергается. Камеры у его дома не зафиксировали возвращения до 4 утра.',
    notes:
      'Соучастник. Он не убийца, но точно помог отцу. ' +
      'Отпечатки его ботинок в павильоне. Писал Марине угрозы ' +
      'от своего имени — глупо и жестоко.',
    questions: [
      'Что он делал в ателье?',
      'Помогал ли он убирать тело?',
      'Знает ли он, где оно?'
    ]
  },

  prof_olga: {
    id: 'prof_olga',
    name: 'Ольга Соколовская',
    short: 'Ольга',
    role: 'жена Виктора Павловича',
    av: 'ОС',
    color: '#c8d1e2',
    age: 49,
    work: 'Директор фонда «Надежда»',
    unlock: 'search_olga',
    danger: 3,
    motive: 'Защита мужа',
    alibi: 'Подтверждено',
    suspicious: [
      'Знала о ДТП 2019 года',
      'Писала Марине предупреждения',
      'Не сообщила в полицию'
    ],
    alibiCheck: 'Подтверждено. Была дома ночью 13 апреля.',
    notes:
      'Она не убийца. Но она соучастница молчания. ' +
      'Двадцать лет живёт с мужем и знает, что он сделал. ' +
      'Пыталась предупредить Марину, но не прямо. ' +
      'Теперь она может быть ключевым свидетелем обвинения.',
    questions: [
      'Почему она молчала?',
      'Может ли она дать показания против мужа?',
      'Что она знает о сыне?'
    ]
  }

};

/* ------------------------------------------------------------
   РЕНДЕР ПРОФАЙЛЕРА
   ------------------------------------------------------------ */
ROUTES.profiler = function(){
  G.screen = 'profiler';

  const ids = Object.keys(PROFILES);
  const available = ids.filter(function(id){
    const p = PROFILES[id];
    return hasEv(p.unlock);
  });

  if(!available.length){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>Профайлер</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico">' + svg('users', 36) + '</div>'
    +   '<h2>Недостаточно данных</h2>'
    +   '<p>Соберите улики, чтобы открыть профили подозреваемых.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Назад</button>'
    + '</div>');
    return;
  }

  const rows = available.map(function(id){
    return renderProfileRow(id);
  }).join('');

  const locked = ids.length - available.length;

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Профайлер</h2>'
  +     '<div class="sub">'
  +       available.length + ' профилей'
  +       + (locked ? ' · ' + locked + ' заблокировано' : '')
  +     '</div>'
  +   '</div>'
  +   '<button class="back" onclick="profilerHelp()">' + svg('help', 18) + '</button>'
  + '</div>'

  + '<div class="prof-list">' + rows + '</div>');
};

function renderProfileRow(id){
  const p = PROFILES[id];
  if(!p) return '';
  const seen = G.opened.profiles && G.opened.profiles[id];

  return ''
  + '<div class="prof-row" onclick="openProfile(\'' + id + '\')">'
  +   '<div class="pr-avatar" style="background:' + p.color + '">'
  +     p.av
  +     '<div class="pr-danger" data-lvl="' + (p.danger > 6 ? 'hi' : p.danger > 3 ? 'md' : 'lo') + '">'
  +       (p.danger > 6 ? '!!' : p.danger > 3 ? '!' : '·')
  +     '</div>'
  +   '</div>'
  +   '<div class="pr-body">'
  +     '<div class="pr-name">' + escapeHtml(p.short) + '</div>'
  +     '<div class="pr-role">' + escapeHtml(p.role) + '</div>'
  +     '<div class="pr-danger-bar">'
  +       '<div class="pdb-fill" style="width:' + (p.danger * 10) + '%;'
  +         + 'background:' + (p.danger > 6 ? 'var(--danger)' 
  +           : p.danger > 3 ? 'var(--warn)' 
  +           : 'var(--ok)') + '"></div>'
  +     '</div>'
  +   '</div>'
  +   svg('chev', 16)
  + '</div>';
}

function openProfile(id){
  const p = PROFILES[id];
  if(!p) return;

  if(!G.opened.profiles) G.opened.profiles = {};
  const first = !G.opened.profiles[id];
  G.opened.profiles[id] = true;

  const suspicious = (p.suspicious || []).map(function(s){
    return ''
    + '<div class="pf-susp-item">'
    +   '<div class="psi-mark">' + svg('alert', 11) + '</div>'
    +   '<div class="psi-text">' + escapeHtml(s) + '</div>'
    + '</div>';
  }).join('');

  const questions = (p.questions || []).map(function(q){
    return ''
    + '<div class="pf-q-item">'
    +   '<div class="pqi-mark">?</div>'
    +   '<div class="pqi-text">' + escapeHtml(q) + '</div>'
    + '</div>';
  }).join('');

  const dangerLabel = p.danger > 6 ? 'Высокий'
    : p.danger > 3 ? 'Средний'
    : 'Низкий';
  const dangerColor = p.danger > 6 ? 'var(--danger)'
    : p.danger > 3 ? 'var(--warn)'
    : 'var(--ok)';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Профиль</h2>'
  +     '<div class="sub">' + escapeHtml(p.role) + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="prof-view">'

  +   '<div class="pf-hero">'
  +     '<div class="pf-avatar" style="background:' + p.color + '">' + p.av + '</div>'
  +     '<h2>' + escapeHtml(p.name) + '</h2>'
  +     '<div class="pf-sub">'
  +       escapeHtml(p.work)
  +       + ' · ' + p.age + ' лет'
  +     '</div>'
  +     '<div class="pf-danger">'
  +       '<div class="pfd-label">Уровень опасности</div>'
  +       '<div class="pfd-bar">'
  +         '<div class="pfd-fill" style="width:' + (p.danger * 10) + '%;'
  +           + 'background:' + dangerColor + '"></div>'
  +       '</div>'
  +       '<div class="pfd-num" style="color:' + dangerColor + '">'
  +         p.danger + '/10 · ' + dangerLabel
  +       '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="pf-facts">'
  +     '<div class="pf-fact">'
  +       '<span>Алиби</span>'
  +       '<b>' + escapeHtml(p.alibi) + '</b>'
  +     '</div>'
  +     '<div class="pf-fact">'
  +       '<span>Мотив</span>'
  +       '<b>' + escapeHtml(p.motive) + '</b>'
  +     '</div>'
  +   '</div>'

  +   '<div class="pf-section">'
  +     '<div class="pfs-label">'
  +       svg('alert', 13) + ' Подозрительное поведение'
  +     '</div>'
  +     '<div class="pfs-list">' + suspicious + '</div>'
  +   '</div>'

  +   '<div class="pf-alibi">'
  +     '<div class="pfa-label">'
  +       svg('shield', 12) + ' Проверка алиби'
  +     '</div>'
  +     '<div class="pfa-text">' + escapeHtml(p.alibiCheck) + '</div>'
  +   '</div>'

  +   '<div class="pf-section">'
  +     '<div class="pfs-label">'
  +       svg('help', 13) + ' Открытые вопросы'
  +     '</div>'
  +     '<div class="pfs-list">' + questions + '</div>'
  +   '</div>'

  +   '<div class="pf-note">'
  +     '<div class="pfn-label">'
  +       svg('fileText', 12) + ' Заметка следователя'
  +     '</div>'
  +     '<div class="pfn-text">' + escapeHtml(p.notes) + '</div>'
  +   '</div>'

  +   '<div class="pf-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' К списку'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="addProfileToCase(\'' + id + '\')">'
  +       svg('folder', 16) + ' В дело'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(620, 0.03);
}

function addProfileToCase(id){
  const p = PROFILES[id];
  if(!p) return;
  if(!hasEv('profile_' + id)){
    addEv('profile_' + id);
    toast('✅ Профиль', p.short + ' добавлен в дело', 'ok');
  } else {
    toast('Уже в деле', 'Профиль был добавлен ранее', 'warn');
  }
}

function profilerHelp(){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Профайлер</h2><div class="sub">Справка</div></div>'
  + '</div>'
  + '<div style="padding:24px 20px">'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('users', 22) + '</div>'
  +     '<h3>Что это</h3>'
  +     '<p>Профайлер — ваш аналитический инструмент. Он показывает '
  +       'детальные профили всех подозреваемых: возраст, работу, '
  +       'мотив, алиби и уровень опасности.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('alert', 22) + '</div>'
  +     '<h3>Уровень опасности</h3>'
  +     '<p>От 1 до 10. Учитывает агрессивность, доступ к оружию, '
  +       'психическую стабильность и наличие мотива.</p>'
  +   '</div>'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('target', 22) + '</div>'
  +     '<h3>Как использовать</h3>'
  +     '<p>Сравнивайте профили перед выдвижением обвинения. '
  +       'Обращайте внимание на мотив, алиби и связи с другими '
  +       'фигурантами дела.</p>'
  +   '</div>'
  +   '<button class="btn ghost" style="width:100%;justify-content:center;margin-top:14px" '
  +     'onclick="goBack()">Понятно</button>'
  + '</div>');
}

/* ============================================================
   БЛОК 4 — РЕГИСТРАЦИЯ ПРИЛОЖЕНИЙ
   ============================================================ */

(function registerPart8Apps(){
  if(typeof APPS === 'undefined') return;

  const newApps = [
    {id: 'mail', ic: 'note', lbl: 'Почта'},
    {id: 'map', ic: 'compass', lbl: 'Карта'},
    {id: 'profiler', ic: 'users', lbl: 'Профайлер'}
  ];

  newApps.forEach(function(app){
    const exists = APPS.some(function(a){ return a.id === app.id; });
    if(!exists){
      const idx = APPS.findIndex(function(a){ return a.id === 'settings'; });
      if(idx >= 0){
        APPS.splice(idx, 0, app);
      } else {
        APPS.push(app);
      }
    }
  });
})();

/* Патчим openApp */
(function patchOpenAppForPart8(){
  if(typeof window.openApp !== 'function') return;
  const prev = window.openApp;
  window.openApp = function(id){
    if(id === 'mail') return go('mail');
    if(id === 'map') return go('map');
    if(id === 'profiler') return go('profiler');
    return prev(id);
  };
})();

/* Инициализируем хранилища */
if(!G.opened.emails) G.opened.emails = {};
if(!G.opened.locations) G.opened.locations = {};
if(!G.opened.profiles) G.opened.profiles = {};

/* ============================================================
   БЛОК 5 — РАСШИРЕНИЕ СЛОВАРЯ УЛИК
   ============================================================ */
(function extendTitlesPart8(){
  const extra = {
    read_email_lena: 'Письмо от Лены',
    read_email_viktor: 'Письмо от Виктора',
    read_email_krylov: 'Письмо от Крылова',
    read_email_studio: 'Письмо из ателье',
    read_email_anon: 'Анонимное письмо',
    read_email_olga: 'Письмо от Ольги',
    read_email_mama: 'Письмо от мамы',
    read_email_dekanat: 'Письмо из деканата',
    read_email_anton: 'Письмо от Антона',
    read_email_yulia: 'Письмо от Юли',
    read_email_akademy: 'Приглашение на защиту',
    read_email_dima: 'Письмо от Димы',
    read_email_security: 'Письмо от охраны',
    read_email_draft: 'Неотправленное письмо',
    saw_loc_crash: 'Локация: место аварии',
    saw_loc_home: 'Локация: дом Марины',
    saw_loc_cinema: 'Локация: кинотеатр',
    saw_loc_studio: 'Локация: киноателье',
    saw_loc_academy: 'Локация: академия',
    saw_loc_station: 'Локация: вокзал',
    saw_loc_office: 'Локация: офис Крылова',
    saw_loc_artem: 'Локация: дом Артёма',
    saw_loc_viktor: 'Локация: дом Виктора',
    saw_loc_gibdd: 'Локация: ГИБДД',
    saw_loc_cafe: 'Локация: кафе',
    saw_loc_lena: 'Локация: дом Лены',
    profile_prof_viktor: 'Профиль: Виктор',
    profile_prof_krylov: 'Профиль: Крылов',
    profile_prof_artem: 'Профиль: Артём',
    profile_prof_dima: 'Профиль: Дима',
    profile_prof_anton: 'Профиль: Антон',
    profile_prof_sonya: 'Профиль: Соня',
    profile_prof_vadim: 'Профиль: Вадим',
    profile_prof_olga: 'Профиль: Ольга'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   БЛОК 6 — CSS ДЛЯ ЧАСТИ 8
   ============================================================ */
(function injectPart8Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  /* ---------- ПОЧТА ---------- */
  + '.mail-filter{'
  +   'display:flex;gap:6px;padding:10px 14px 12px;'
  +   'overflow-x:auto;scrollbar-width:none;'
  +   'border-bottom:1px solid var(--line);'
  +   'position:sticky;top:57px;z-index:15;'
  +   'background:rgba(17,22,31,.94);'
  +   'backdrop-filter:blur(20px);'
  + '}'
  + '.mail-filter::-webkit-scrollbar{display:none}'
  + '.mf-chip{'
  +   'padding:6px 12px;border-radius:14px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'color:var(--dim);font-size:11.5px;cursor:pointer;'
  +   'white-space:nowrap;transition:.14s;font-family:inherit;'
  + '}'
  + '.mf-chip:hover{border-color:var(--line2);color:var(--txt)}'
  + '.mf-chip.active{'
  +   'background:rgba(93,169,255,.14);'
  +   'border-color:var(--acc);color:var(--acc);'
  + '}'

  + '.mail-list{padding:6px 0 30px}'
  + '.email-row{'
  +   'display:flex;gap:12px;padding:13px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:flex-start;position:relative;'
  + '}'
  + '.email-row:hover{background:var(--panel2)}'
  + '.email-row.unread{background:rgba(93,169,255,.04)}'
  + '.er-avatar{'
  +   'width:44px;height:44px;border-radius:50%;flex:0 0 44px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:15px;font-weight:600;color:#fff;'
  + '}'
  + '.er-body{flex:1;min-width:0}'
  + '.er-top{'
  +   'display:flex;justify-content:space-between;'
  +   'align-items:baseline;gap:8px;margin-bottom:3px;'
  + '}'
  + '.er-from{font-size:13px;font-weight:600;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.er-time{'
  +   'font-size:10.5px;color:var(--dim);flex:0 0 auto;'
  + '}'
  + '.er-subj{'
  +   'font-size:12.5px;color:var(--txt);'
  +   'margin-bottom:3px;font-weight:500;'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  + '}'
  + '.er-preview{'
  +   'font-size:11.5px;color:var(--dim);'
  +   'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
  +   'margin-bottom:5px;'
  + '}'
  + '.er-tag{'
  +   'font-size:10px;color:var(--acc);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.er-dot{'
  +   'width:7px;height:7px;border-radius:50%;'
  +   'background:var(--acc);'
  +   'box-shadow:0 0 8px var(--acc);'
  + '}'

  /* Просмотр письма */
  + '.email-view{padding:20px 18px 40px}'
  + '.ev-header{'
  +   'display:flex;gap:12px;align-items:center;'
  +   'margin-bottom:18px;'
  + '}'
  + '.ev-avatar{'
  +   'width:48px;height:48px;border-radius:50%;flex:0 0 48px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:16px;font-weight:600;color:#fff;'
  + '}'
  + '.ev-meta{flex:1;min-width:0}'
  + '.ev-from{font-size:14px;font-weight:600;margin-bottom:2px}'
  + '.ev-addr{font-size:11.5px;color:var(--dim)}'
  + '.ev-subj{'
  +   'font-size:18px;font-weight:600;'
  +   'line-height:1.35;margin-bottom:12px;'
  + '}'
  + '.ev-date{'
  +   'display:flex;align-items:center;gap:6px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'margin-bottom:8px;'
  + '}'
  + '.ev-tagbox{'
  +   'display:inline-flex;align-items:center;gap:6px;'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  +   'padding:4px 10px;border-radius:10px;'
  +   'background:rgba(93,169,255,.08);'
  +   'border:1px solid rgba(93,169,255,.2);'
  +   'margin-bottom:18px;'
  + '}'
  + '.ev-body{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.75;'
  +   'background:var(--panel);border:1px solid var(--line);'
  +   'border-radius:12px;padding:18px 20px;'
  +   'margin-bottom:20px;'
  +   'white-space:pre-wrap;word-wrap:break-word;'
  + '}'
  + '.ev-actions{display:flex;gap:10px}'
  + '.ev-actions .btn{flex:1;justify-content:center;font-size:13px}'

  /* ---------- КАРТА ---------- */
  + '.map-view{padding:16px}'
  + '.map-canvas{'
  +   'position:relative;'
  +   'aspect-ratio:1;width:100%;'
  +   'background:linear-gradient(160deg,#0a0e18,#05070c);'
  +   'border:1px solid var(--line);'
  +   'border-radius:16px;'
  +   'overflow:hidden;'
  +   'margin-bottom:14px;'
  + '}'
  + '.map-grid{'
  +   'position:absolute;inset:0;'
  +   'background-image:'
  +   'linear-gradient(rgba(93,169,255,.06) 1px, transparent 1px),'
  +   'linear-gradient(90deg, rgba(93,169,255,.06) 1px, transparent 1px);'
  +   'background-size:10% 10%;'
  + '}'
  + '.map-canvas::after{'
  +   'content:"";position:absolute;inset:0;'
  +   'background:radial-gradient(ellipse at center, '
  +   'rgba(93,169,255,.08), transparent 70%);'
  +   'pointer-events:none;'
  + '}'
  + '.map-label{'
  +   'position:absolute;font-size:10px;'
  +   'color:var(--dim2);letter-spacing:2px;'
  +   'font-weight:700;'
  + '}'
  + '.map-label-n{top:6px;left:50%;transform:translateX(-50%)}'
  + '.map-label-s{bottom:6px;left:50%;transform:translateX(-50%)}'
  + '.map-label-w{left:6px;top:50%;transform:translateY(-50%)}'
  + '.map-label-e{right:6px;top:50%;transform:translateY(-50%)}'

  + '.map-pin{'
  +   'position:absolute;'
  +   'width:24px;height:24px;'
  +   'margin-left:-12px;margin-top:-12px;'
  +   'cursor:pointer;'
  +   'transition:.2s;'
  + '}'
  + '.map-pin:hover{transform:scale(1.3)}'
  + '.mp-inner{'
  +   'width:100%;height:100%;'
  +   'border-radius:50%;'
  +   'background:var(--pin-color);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:#fff;'
  +   'box-shadow:'
  +     '0 0 0 3px var(--bg),'
  +     '0 0 12px var(--pin-color);'
  +   'position:relative;z-index:2;'
  + '}'
  + '.mp-pulse{'
  +   'position:absolute;inset:0;'
  +   'border-radius:50%;'
  +   'background:var(--pin-color);'
  +   'animation:mapPulse 2.4s infinite;'
  +   'opacity:.4;'
  +   'z-index:1;'
  + '}'
  + '@keyframes mapPulse{'
  +   '0%{transform:scale(1);opacity:.5}'
  +   '100%{transform:scale(2.2);opacity:0}'
  + '}'
  + '.map-pin.critical .mp-inner{'
  +   'box-shadow:'
  +     '0 0 0 3px var(--bg),'
  +     '0 0 20px var(--danger),'
  +     '0 0 40px var(--danger);'
  + '}'
  + '.map-pin.seen{opacity:.65}'
  + '.map-pin.seen .mp-pulse{animation:none;opacity:0}'

  + '.map-info{'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'padding:12px 14px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);line-height:1.55;'
  + '}'
  + '.map-info .icon{flex:0 0 12px;margin-top:2px;color:var(--acc)}'

  /* Детали локации */
  + '.loc-view{padding:20px 18px 40px}'
  + '.loc-hero{'
  +   'text-align:center;padding:20px 20px 22px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:4px;'
  +   'border-radius:14px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.lh-icon{'
  +   'width:76px;height:76px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1.5px solid rgba(255,255,255,.08);'
  + '}'
  + '.loc-hero h2{'
  +   'font-size:17px;font-weight:600;'
  +   'line-height:1.35;margin-bottom:4px;'
  + '}'
  + '.lh-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  + '}'
  + '.loc-meta{'
  +   'display:flex;gap:10px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.lm-row{'
  +   'flex:1;padding:12px 14px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;'
  +   'display:flex;flex-direction:column;gap:3px;'
  + '}'
  + '.lm-row span{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  + '}'
  + '.lm-row b{font-size:12.5px;font-weight:600}'
  + '.loc-desc{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.7;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:16px 18px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.loc-facts-block{'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:14px 16px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.lfb-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:10px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.lfb-list{display:flex;flex-direction:column;gap:7px}'
  + '.loc-fact{display:flex;gap:10px;align-items:flex-start}'
  + '.lf-dot{'
  +   'width:5px;height:5px;border-radius:50%;'
  +   'background:var(--acc);'
  +   'flex:0 0 5px;margin-top:7px;'
  + '}'
  + '.lf-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.5;'
  + '}'
  + '.loc-actions{display:flex;gap:10px}'

  /* ---------- ПРОФАЙЛЕР ---------- */
  + '.prof-list{padding:6px 0 30px}'
  + '.prof-row{'
  +   'display:flex;gap:13px;padding:14px 16px;'
  +   'cursor:pointer;transition:.12s;'
  +   'border-bottom:1px solid rgba(42,52,68,.4);'
  +   'align-items:center;'
  + '}'
  + '.prof-row:hover{background:var(--panel2)}'
  + '.pr-avatar{'
  +   'width:52px;height:52px;border-radius:50%;'
  +   'flex:0 0 52px;position:relative;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:16px;font-weight:600;color:#fff;'
  + '}'
  + '.pr-danger{'
  +   'position:absolute;top:-3px;right:-3px;'
  +   'min-width:22px;height:22px;'
  +   'border-radius:11px;'
  +   'font-size:11px;font-weight:800;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'padding:0 5px;'
  +   'border:2px solid var(--bg);'
  + '}'
  + '.pr-danger[data-lvl="hi"]{'
  +   'background:var(--danger);color:#fff;'
  +   'box-shadow:0 0 12px var(--danger);'
  + '}'
  + '.pr-danger[data-lvl="md"]{'
  +   'background:var(--warn);color:#000;'
  + '}'
  + '.pr-danger[data-lvl="lo"]{'
  +   'background:var(--ok);color:#001;'
  + '}'
  + '.pr-body{flex:1;min-width:0}'
  + '.pr-name{font-size:14px;font-weight:600;margin-bottom:2px}'
  + '.pr-role{font-size:11.5px;color:var(--dim);margin-bottom:7px}'
  + '.pr-danger-bar{'
  +   'height:4px;background:var(--panel2);'
  +   'border-radius:2px;overflow:hidden;'
  + '}'
  + '.pdb-fill{'
  +   'height:100%;border-radius:2px;'
  +   'transition:.5s;'
  + '}'

  /* Профиль детально */
  + '.prof-view{padding:20px 18px 40px}'
  + '.pf-hero{'
  +   'text-align:center;padding:20px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:16px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.pf-avatar{'
  +   'width:80px;height:80px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:26px;font-weight:600;color:#fff;'
  + '}'
  + '.pf-hero h2{'
  +   'font-size:17px;font-weight:600;'
  +   'line-height:1.3;margin-bottom:6px;'
  + '}'
  + '.pf-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  +   'margin-bottom:18px;'
  + '}'
  + '.pf-danger{'
  +   'padding:14px 16px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'text-align:left;'
  + '}'
  + '.pfd-label{'
  +   'font-size:10.5px;color:var(--dim);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'margin-bottom:8px;font-weight:600;'
  + '}'
  + '.pfd-bar{'
  +   'height:6px;background:var(--panel3);'
  +   'border-radius:3px;overflow:hidden;'
  +   'margin-bottom:8px;'
  + '}'
  + '.pfd-fill{'
  +   'height:100%;border-radius:3px;'
  +   'transition:.5s;'
  + '}'
  + '.pfd-num{'
  +   'font-size:12px;font-weight:700;'
  +   'letter-spacing:.5px;'
  + '}'

  + '.pf-facts{'
  +   'display:grid;grid-template-columns:1fr 1fr;'
  +   'gap:10px;margin-bottom:16px;'
  + '}'
  + '.pf-fact{'
  +   'padding:12px 14px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;'
  +   'display:flex;flex-direction:column;gap:3px;'
  + '}'
  + '.pf-fact span{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1px;text-transform:uppercase;'
  + '}'
  + '.pf-fact b{'
  +   'font-size:12.5px;font-weight:600;color:var(--txt);'
  + '}'

  + '.pf-section{'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'padding:14px 16px;'
  +   'margin-bottom:14px;'
  + '}'
  + '.pfs-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:12px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.pfs-list{display:flex;flex-direction:column;gap:9px}'
  + '.pf-susp-item,.pf-q-item{'
  +   'display:flex;gap:10px;align-items:flex-start;'
  + '}'
  + '.psi-mark{'
  +   'width:22px;height:22px;border-radius:6px;'
  +   'background:rgba(255,90,110,.14);'
  +   'color:var(--danger);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 22px;margin-top:1px;'
  + '}'
  + '.psi-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.55;'
  + '}'
  + '.pqi-mark{'
  +   'width:22px;height:22px;border-radius:6px;'
  +   'background:rgba(139,109,255,.14);'
  +   'color:var(--acc2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 22px;margin-top:1px;'
  +   'font-size:12px;font-weight:700;'
  + '}'
  + '.pqi-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.55;'
  + '}'

  + '.pf-alibi{'
  +   'background:linear-gradient(140deg, '
  +   'rgba(61,220,151,.06), rgba(61,220,151,.02));'
  +   'border:1px solid rgba(61,220,151,.25);'
  +   'border-radius:12px;'
  +   'padding:14px 16px;'
  +   'margin-bottom:14px;'
  + '}'
  + '.pfa-label{'
  +   'font-size:10.5px;color:var(--ok);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.pfa-text{'
  +   'font-size:12.5px;color:var(--txt2);line-height:1.6;'
  + '}'

  + '.pf-note{'
  +   'background:var(--panel2);'
  +   'border-left:3px solid var(--warn);'
  +   'border-radius:10px;'
  +   'padding:14px 16px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.pfn-label{'
  +   'font-size:10.5px;color:var(--warn);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.pfn-text{'
  +   'font-size:12.5px;color:var(--dim);line-height:1.65;'
  +   'font-style:italic;'
  + '}'

  + '.pf-actions{display:flex;gap:10px}';

  document.head.appendChild(style);
})();

/* ============================================================
   БЛОК 7 — ДОБАВЛЕНИЕ ИКОНОК В БИБЛИОТЕКУ
   ============================================================ */
(function addPart8Icons(){
  if(typeof ICON_PATHS === 'undefined') return;
  if(!ICON_PATHS.home){
    ICON_PATHS.home =
      '<path d="M3 10.5 12 3l9 7.5"/>' +
      '<path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"/>' +
      '<path d="M9.5 21v-6h5v6"/>';
  }
  if(!ICON_PATHS.circle){
    ICON_PATHS.circle = '<circle cx="12" cy="12" r="9.5"/>';
  }
  if(!ICON_PATHS.home2){
    ICON_PATHS.home2 = ICON_PATHS.home;
  }
})();

console.log(
  '%c[ЧАСТЬ 8 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nПочта: 14 писем. Карта: 12 локаций. Профайлер: 8 профилей. Вставляй Часть 9 ниже.'
);

/* ... Часть 8 заканчивается здесь. Не закрывай script/body/html.
   Часть 9 продолжит этот же блок. */
/* ============================================================
   ЧАСТЬ 9 из 10 — ГЛУБОКИЙ АНАЛИЗ + ДОСТИЖЕНИЯ + NG+
   ============================================================ */

/* ============================================================
   БЛОК 1 — РАСШИРЕННАЯ СИСТЕМА СОХРАНЕНИЙ (СЛОТЫ)
   ============================================================ */

const SAVE_SLOTS_KEY = 'case_2024_slots_v1';
const MAX_SLOTS = 3;

function getSlots(){
  try{
    const raw = localStorage.getItem(SAVE_SLOTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){
    return [];
  }
}

function saveToSlot(index, label){
  try{
    const slots = getSlots();
    slots[index] = {
      label: label || ('Сохранение ' + (index + 1)),
      data: {
        chapter: G.chapter,
        flags: G.flags,
        evidence: G.evidence.slice(),
        notesRead: G.notesRead,
        photosViewed: G.photosViewed,
        callsChecked: G.callsChecked,
        wrongAccusations: G.wrongAccusations,
        screen: G.screen,
        opened: JSON.parse(JSON.stringify(G.opened)),
        achievements: JSON.parse(JSON.stringify(G.achievements || {})),
        unlockedEncrypted: JSON.parse(JSON.stringify(G.unlockedEncrypted || {}))
      },
      date: new Date().toISOString(),
      progress: Math.round(G.evidence.length / Math.max(1, Object.keys(EVIDENCE_DB).length) * 100)
    };
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
    return true;
  } catch(e){
    console.warn('Slot save failed:', e);
    return false;
  }
}

function loadFromSlot(index){
  try{
    const slots = getSlots();
    const slot = slots[index];
    if(!slot || !slot.data) return false;
    const d = slot.data;
    G.chapter = d.chapter || 1;
    G.flags = d.flags || {};
    G.evidence = d.evidence || [];
    G.notesRead = d.notesRead || 0;
    G.photosViewed = d.photosViewed || 0;
    G.callsChecked = d.callsChecked || 0;
    G.wrongAccusations = d.wrongAccusations || 0;
    G.opened = d.opened || {
      chats:{}, photos:{}, notes:{}, calls:{}, searches:{},
      videos:{}, audio:{}, emails:{}, locations:{}, profiles:{}, forensic:{}
    };
    if(d.achievements) G.achievements = d.achievements;
    if(d.unlockedEncrypted) G.unlockedEncrypted = d.unlockedEncrypted;
    return true;
  } catch(e){
    return false;
  }
}

function deleteSlot(index){
  try{
    const slots = getSlots();
    slots[index] = null;
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
    return true;
  } catch(e){
    return false;
  }
}

/* ============================================================
   БЛОК 2 — СИСТЕМА ДОСТИЖЕНИЙ
   ============================================================ */

const ACHIEVEMENTS = {

  a_first_step: {
    ico: 'star',
    t: 'Первый шаг',
    d: 'Разблокировать телефон',
    check: function(){ return hasFlag('unlocked'); }
  },
  a_reader: {
    ico: 'book',
    t: 'Читатель',
    d: 'Прочитать 5 заметок',
    check: function(){ return G.notesRead >= 5; }
  },
  a_bibliophile: {
    ico: 'book',
    t: 'Библиофил',
    d: 'Прочитать все заметки',
    check: function(){ return G.notesRead >= Object.keys(NOTES).length; }
  },
  a_watcher: {
    ico: 'image',
    t: 'Наблюдатель',
    d: 'Просмотреть 10 фото',
    check: function(){ return G.photosViewed >= 10; }
  },
  a_archivist: {
    ico: 'image',
    t: 'Архивариус',
    d: 'Просмотреть все 20 фото',
    check: function(){ return G.photosViewed >= 20; }
  },
  a_hacker: {
    ico: 'link',
    t: 'Хакер',
    d: 'Найти все поисковые запросы',
    check: function(){
      return Object.keys(G.opened.searches || {}).length >= 12;
    }
  },
  a_detective: {
    ico: 'clue',
    t: 'Детектив',
    d: 'Собрать 15 улик',
    check: function(){ return G.evidence.length >= 15; }
  },
  a_sherlock: {
    ico: 'fingerprint',
    t: 'Шерлок',
    d: 'Собрать 30 улик',
    check: function(){ return G.evidence.length >= 30; }
  },
  a_master: {
    ico: 'target',
    t: 'Мастер расследования',
    d: 'Собрать все улики',
    check: function(){
      return G.evidence.length >= Object.keys(EVIDENCE_DB).length;
    }
  },
  a_key_finder: {
    ico: 'key',
    t: 'Ключевой момент',
    d: 'Найти первую ключевую улику',
    check: function(){
      return G.evidence.some(function(id){
        return EVIDENCE_DB[id] && EVIDENCE_DB[id].key;
      });
    }
  },
  a_key_master: {
    ico: 'starFill',
    t: 'Ключник',
    d: 'Собрать все ключевые улики',
    check: function(){
      const keys = Object.keys(EVIDENCE_DB).filter(function(id){
        return EVIDENCE_DB[id].key;
      });
      return keys.every(function(id){ return hasEv(id); });
    }
  },
  a_first_ev: {
    ico: 'info',
    t: 'Начало',
    d: 'Найти первую улику',
    check: function(){ return G.evidence.length >= 1; }
  },
  a_video_watcher: {
    ico: 'filmPlay',
    t: 'Киноман',
    d: 'Просмотреть 5 видеозаписей',
    check: function(){
      return Object.keys(G.opened.videos || {}).length >= 5;
    }
  },
  a_audio_listener: {
    ico: 'headphone',
    t: 'Слушатель',
    d: 'Прослушать 5 аудиозаписей',
    check: function(){
      return Object.keys(G.opened.audio || {}).length >= 5;
    }
  },
  a_geo: {
    ico: 'compass',
    t: 'Географ',
    d: 'Изучить 6 локаций',
    check: function(){
      return Object.keys(G.opened.locations || {}).length >= 6;
    }
  },
  a_psycho: {
    ico: 'userCircle',
    t: 'Профайлер',
    d: 'Изучить 4 профиля',
    check: function(){
      return Object.keys(G.opened.profiles || {}).length >= 4;
    }
  },
  a_mailman: {
    ico: 'note',
    t: 'Почтальон',
    d: 'Прочитать 8 писем',
    check: function(){
      return Object.keys(G.opened.emails || {}).length >= 8;
    }
  },
  a_interrogator: {
    ico: 'chat',
    t: 'Дознаватель',
    d: 'Провести первый допрос',
    check: function(){
      return Object.keys(G.flags).some(function(k){
        return k.startsWith('interrogation_') && k.endsWith('_done');
      });
    }
  },
  a_interrogator_pro: {
    ico: 'chatBubble',
    t: 'Мастер допросов',
    d: 'Провести все допросы',
    check: function(){
      const ids = Object.keys(INTERROGATIONS);
      if(!ids.length) return false;
      return ids.every(function(id){
        return G.flags['interrogation_' + id + '_done'];
      });
    }
  },
  a_perfect_interrogation: {
    ico: 'checkCircle',
    t: 'Точность',
    d: 'Допрос без ошибок',
    check: function(){
      return Object.keys(G.flags).some(function(k){
        return k.startsWith('interrogation_') && k.endsWith('_wrong')
          && G.flags[k] === 0;
      });
    }
  },
  a_wrong_accusation: {
    ico: 'close',
    t: 'Ошибка',
    d: 'Сделать неправильное обвинение',
    check: function(){ return G.wrongAccusations > 0; }
  },
  a_correct: {
    ico: 'scale',
    t: 'Справедливость',
    d: 'Раскрыть дело',
    check: function(){ return hasFlag('case_closed'); }
  },
  a_speedrun: {
    ico: 'clock',
    t: 'Спидран',
    d: 'Раскрыть дело с 3 ключевыми уликами',
    check: function(){
      if(!hasFlag('case_closed')) return false;
      const keyCount = G.evidence.filter(function(id){
        return EVIDENCE_DB[id] && EVIDENCE_DB[id].key;
      }).length;
      return keyCount === 3;
    }
  },
  a_completionist: {
    ico: 'shieldCheck',
    t: 'Перфекционист',
    d: 'Пройти игру на 100%',
    check: function(){
      const ev = G.evidence.length >= Object.keys(EVIDENCE_DB).length;
      const notes = G.notesRead >= Object.keys(NOTES).length;
      const photos = G.photosViewed >= 20;
      return ev && notes && photos && hasFlag('case_closed');
    }
  },
  a_night_owl: {
    ico: 'star',
    t: 'Полуночник',
    d: 'Играть ночью',
    check: function(){
      const h = new Date().getHours();
      return h >= 0 && h < 5;
    }
  },
  a_listener: {
    ico: 'mic',
    t: 'Внимательный',
    d: 'Прослушать запись признания',
    check: function(){ return hasFlag('heard_audio'); }
  },
  a_cinema: {
    ico: 'film',
    t: 'Показ',
    d: 'Просмотреть запись с показа',
    check: function(){ return hasFlag('saw_video_screening'); }
  },
  a_letter_hunter: {
    ico: 'file',
    t: 'Письмо',
    d: 'Найти анонимное письмо',
    check: function(){ return hasFlag('read_email_anon'); }
  },
  a_draft: {
    ico: 'edit',
    t: 'Последний черновик',
    d: 'Найти неотправленное письмо',
    check: function(){ return hasFlag('read_email_draft'); }
  },
  a_kirill_friend: {
    ico: 'heart',
    t: 'Верный друг',
    d: 'Прочитать чат с Кириллом',
    check: function(){ return hasFlag('saw_kirill_chat'); }
  },
  a_viktor_chat: {
    ico: 'shield',
    t: 'Опасный разговор',
    d: 'Прочитать чат с Виктором',
    check: function(){ return hasFlag('saw_viktor_chat'); }
  },
  a_threat: {
    ico: 'alert',
    t: 'Под угрозой',
    d: 'Получить первое угрожающее сообщение',
    check: function(){ return hasFlag('saw_threats'); }
  },
  a_snitch: {
    ico: 'userCircle',
    t: 'Свидетель',
    d: 'Прочитать показания Антона',
    check: function(){ return hasFlag('saw_anton_chat'); }
  },
  a_mailman_pro: {
    ico: 'starFill',
    t: 'Эксперт по письмам',
    d: 'Прочитать 12 писем',
    check: function(){
      return Object.keys(G.opened.emails || {}).length >= 12;
    }
  },
  a_archivist_pro: {
    ico: 'folder',
    t: 'Архивариус+',
    d: 'Изучить все 12 локаций',
    check: function(){
      return Object.keys(G.opened.locations || {}).length >= 12;
    }
  },
  a_profile_master: {
    ico: 'users',
    t: 'Психолог',
    d: 'Изучить все 8 профилей',
    check: function(){
      return Object.keys(G.opened.profiles || {}).length >= 8;
    }
  },
  a_perfectionist: {
    ico: 'check',
    t: 'Идеально',
    d: 'Правильное обвинение без ошибок',
    check: function(){
      return hasFlag('case_closed') && G.wrongAccusations === 0;
    }
  },
  /* ИСПРАВЛЕНО: используем только реально существующие допросы */
  a_negotiator: {
    ico: 'chat',
    t: 'Переговорщик',
    d: 'Провести 4 успешных допроса',
    check: function(){
      const ids = [
        'interrogation_viktor',
        'interrogation_krylov',
        'interrogation_sonya',
        'interrogation_lena'
      ];
      return ids.every(function(id){
        return G.flags['interrogation_' + id + '_done'];
      });
    }
  },
  /* ИСПРАВЛЕНО: реально достижимая проверка */
  a_multi_endings: {
    ico: 'starFill',
    t: 'Развязка',
    d: 'Дойти до финала игры',
    check: function(){
      return hasFlag('case_closed') || hasFlag('finale_bad');
    }
  },
  a_restart: {
    ico: 'refresh',
    t: 'Заново',
    d: 'Начать новую игру',
    check: function(){ return hasFlag('restarted'); }
  },
  a_ng_plus: {
    ico: 'starFill',
    t: 'Новая игра+',
    d: 'Начать NG+',
    check: function(){ return hasFlag('ng_plus'); }
  },
  a_lawyer: {
    ico: 'scale',
    t: 'Юрист',
    d: 'Провести профессиональное расследование',
    check: function(){
      return hasFlag('case_closed')
        && G.wrongAccusations === 0
        && G.evidence.length >= 25;
    }
  },
  a_reasonable_doubt: {
    ico: 'info',
    t: 'Разумное сомнение',
    d: 'Проверить все алиби',
    check: function(){
      return ['artem_alibi', 'sonya_timeline', 'dima_stalk'].every(function(e){
        return hasEv(e);
      });
    }
  },
  a_cynic: {
    ico: 'eyeOff',
    t: 'Циник',
    d: 'Не поверить ни одному подозреваемому',
    check: function(){
      return G.wrongAccusations >= 3;
    }
  },
  a_empathetic: {
    ico: 'heart',
    t: 'Сочувствующий',
    d: 'Проявить сочувствие в диалогах',
    check: function(){
      return hasFlag('empathetic_choice');
    }
  },
  a_perfectionist2: {
    ico: 'target',
    t: 'Идеальный детектив',
    d: 'Пройти игру без единой ошибки',
    check: function(){
      return hasFlag('case_closed')
        && G.wrongAccusations === 0
        && G.notesRead >= Object.keys(NOTES).length;
    }
  },
  a_deep_dive: {
    ico: 'dna',
    t: 'Глубокое погружение',
    d: 'Провести 60 минут в игре',
    check: function(){
      return G._playTime && G._playTime >= 3600;
    }
  }
};

G.achievements = G.achievements || {};

function checkAchievements(){
  const unlocked = [];
  for(const id in ACHIEVEMENTS){
    if(G.achievements[id]) continue;
    try{
      if(ACHIEVEMENTS[id].check()){
        G.achievements[id] = Date.now();
        unlocked.push(id);
      }
    } catch(e){}
  }
  unlocked.forEach(function(id){
    toast('🏆 Достижение',
      ACHIEVEMENTS[id].t + ' — ' + ACHIEVEMENTS[id].d, 'ok');
  });
  if(unlocked.length){
    saveGame();
  }
  return unlocked;
}

setInterval(checkAchievements, 8000);

ROUTES.achievements = function(){
  const ids = Object.keys(ACHIEVEMENTS);
  const got = ids.filter(function(id){ return G.achievements[id]; });
  const progress = Math.round(got.length / ids.length * 100);

  const rows = ids.map(function(id){
    return renderAchievement(id);
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Достижения</h2>'
  +     '<div class="sub">' + got.length + '/' + ids.length
  +       + ' · ' + progress + '%</div>'
  +   '</div>'
  + '</div>'

  + '<div class="ach-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="ach-list">' + rows + '</div>');
};

function renderAchievement(id){
  const a = ACHIEVEMENTS[id];
  const unlocked = !!G.achievements[id];
  return ''
  + '<div class="ach-row' + (unlocked ? ' unlocked' : '') + '">'
  +   '<div class="ach-ico">'
  +     svg(unlocked ? (a.ico || 'starFill') : 'lock', 20)
  +   '</div>'
  +   '<div class="ach-body">'
  +     '<div class="ach-t">' + escapeHtml(a.t) + '</div>'
  +     '<div class="ach-d">' + escapeHtml(a.d) + '</div>'
  +   '</div>'
  +   (unlocked ? '<div class="ach-check">' + svg('check', 14, 'bold') + '</div>' : '')
  + '</div>';
}

/* ============================================================
   БЛОК 3 — РАСШИРЕННЫЕ НАСТРОЙКИ
   ============================================================ */

ROUTES.settings = function(){
  G.screen = 'settings';

  const slots = getSlots();

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Настройки</h2>'
  +     '<div class="sub">Дело №2024-0414</div>'
  +   '</div>'
  + '</div>'

  + '<div class="settings-view">'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('folder', 13) + ' ДЕЛО</div>'
  +     '<div class="ss-card">'
  +       '<div class="ss-row">'
  +         '<span>Пропажа</span>'
  +         '<b>Марина Соколова, 24</b>'
  +       '</div>'
  +       '<div class="ss-row">'
  +         '<span>Заявление</span>'
  +         '<b>14 апреля, 23:58</b>'
  +       '</div>'
  +       '<div class="ss-row">'
  +         '<span>Улик собрано</span>'
  +         '<b>' + G.evidence.length + '</b>'
  +       '</div>'
  +       '<div class="ss-row">'
  +         '<span>Достижений</span>'
  +         '<b>' + Object.keys(G.achievements || {}).length
  +           + '/' + Object.keys(ACHIEVEMENTS).length + '</b>'
  +       '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('speaker', 13) + ' ЗВУК</div>'
  +     '<div class="ss-card">'
  +       settingsToggle('Звук', 'sound')
  +       settingsToggle('Вибрация', 'vibration')
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('eye', 13) + ' ДОСТУПНОСТЬ</div>'
  +     '<div class="ss-card">'
  +       settingsToggle('Уменьшить анимацию', 'reducedMotion')
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('folder', 13) + ' СОХРАНЕНИЯ</div>'
  +     '<div class="ss-card">'
  +       renderSlot(0, slots[0])
  +       renderSlot(1, slots[1])
  +       renderSlot(2, slots[2])
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('star', 13) + ' ИГРА</div>'
  +     '<div class="ss-card">'
  +       '<div class="ss-row ss-row-tap" onclick="go(\'achievements\')">'
  +         '<span>Достижения</span>'
  +         '<div style="display:flex;align-items:center;gap:6px">'
  +           '<b>' + Object.keys(G.achievements || {}).length
  +             + '/' + Object.keys(ACHIEVEMENTS).length + '</b>'
  +           svg('chev', 14)
  +         '</div>'
  +       '</div>'
  +       '<div class="ss-row ss-row-tap" onclick="go(\'summary\')">'
  +         '<span>Сводка по делу</span>'
  +         svg('chev', 14)
  +       '</div>'
  +       '<div class="ss-row ss-row-tap" onclick="go(\'endings\')">'
  +         '<span>Концовки</span>'
  +         svg('chev', 14)
  +       '</div>'
  +       '<div class="ss-row ss-row-tap" onclick="openNewGamePlus()">'
  +         '<span>Новая игра+</span>'
  +         svg('chev', 14)
  +       '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-section">'
  +     '<div class="ss-label">' + svg('alert', 13) + ' ОПАСНАЯ ЗОНА</div>'
  +     '<div class="ss-card">'
  +       '<button class="ss-btn danger" onclick="wipeConfirm()">'
  +         svg('trash', 14) + ' Сбросить весь прогресс'
  +       '</button>'
  +     '</div>'
  +   '</div>'

  +   '<div class="settings-footer">'
  +     '<div>Дело №2024-0414 · v1.0</div>'
  +     '<div>10 частей · 20000 строк</div>'
  +   '</div>'

  + '</div>');
};

function settingsToggle(label, flag){
  const on = G[flag] !== false;
  return ''
  + '<div class="ss-row ss-row-toggle" onclick="toggleSetting(\'' + flag + '\')">'
  +   '<span>' + label + '</span>'
  +   '<div class="toggle-sw' + (on ? ' on' : '') + '">'
  +     '<i></i>'
  +   '</div>'
  + '</div>';
}

function toggleSetting(flag){
  G[flag] = !G[flag];
  haptic(10);
  ROUTES.settings();
}

function renderSlot(i, slot){
  if(slot && slot.data){
    return ''
    + '<div class="ss-row ss-slot">'
    +   '<div class="ss-slot-info">'
    +     '<b>Слот ' + (i + 1) + '</b>'
    +     '<span>' + (slot.progress || 0) + '% пройдено</span>'
    +   '</div>'
    +   '<div class="ss-slot-actions">'
    +     '<button class="ss-mini" onclick="loadSlot(' + i + ')">'
    +       svg('upload', 14)
    +     '</button>'
    +     '<button class="ss-mini" onclick="saveSlot(' + i + ')">'
    +       svg('download', 14)
    +     '</button>'
    +     '<button class="ss-mini danger" onclick="delSlot(' + i + ')">'
    +       svg('trash', 14)
    +     '</button>'
    +   '</div>'
    + '</div>';
  }
  return ''
  + '<div class="ss-row ss-slot ss-slot-empty">'
  +   '<div class="ss-slot-info">'
  +     '<b>Слот ' + (i + 1) + '</b>'
  +     '<span>Пусто</span>'
  +   '</div>'
  +   '<button class="ss-mini" onclick="saveSlot(' + i + ')">'
  +     svg('download', 14)
  +   '</button>'
  + '</div>';
}

function saveSlot(i){
  if(saveToSlot(i)){
    toast('✅ Сохранено', 'Слот ' + (i + 1), 'ok');
  } else {
    toast('Ошибка', 'Не удалось сохранить', 'err');
  }
  ROUTES.settings();
}

function loadSlot(i){
  if(!confirm('Загрузить слот ' + (i + 1) + '? Прогресс будет перезаписан.')) return;
  if(loadFromSlot(i)){
    toast('✅ Загружено', 'Слот ' + (i + 1), 'ok');
    go('home');
  } else {
    toast('Ошибка', 'Не удалось загрузить', 'err');
  }
}

function delSlot(i){
  if(!confirm('Удалить слот ' + (i + 1) + '?')) return;
  deleteSlot(i);
  ROUTES.settings();
}

function wipeConfirm(){
  if(confirm('Сбросить ВЕСЬ прогресс и настройки?')){
    wipeSave();
    try{ localStorage.removeItem(SAVE_SLOTS_KEY); } catch(e){}
    location.reload();
  }
}

/* ============================================================
   БЛОК 4 — СВОДКА ПО ДЕЛУ
   ============================================================ */

ROUTES.summary = function(){
  G.screen = 'summary';

  const totalEv = Object.keys(EVIDENCE_DB).length;
  const collected = G.evidence.filter(function(id){ return EVIDENCE_DB[id]; }).length;
  const keyEv = G.evidence.filter(function(id){
    return EVIDENCE_DB[id] && EVIDENCE_DB[id].key;
  }).length;

  const totalNotes = Object.keys(NOTES).length;
  const totalPhotos = 20;
  const totalVideos = Object.keys(VIDEOS).length;
  const totalAudios = Object.keys(AUDIO_RECORDINGS).length;
  const totalEmails = Object.keys(EMAILS).length;
  const totalLocs = Object.keys(LOCATIONS).length;
  const totalProfiles = Object.keys(PROFILES).length;
  const totalInts = Object.keys(INTERROGATIONS).length;

  const cats = {};
  Object.keys(EVIDENCE_DB).forEach(function(id){
    if(!hasEv(id)) return;
    const c = EVIDENCE_DB[id].cat;
    cats[c] = (cats[c] || 0) + 1;
  });

  const catRows = Object.keys(EVIDENCE_CATS).filter(function(k){
    return k !== 'all';
  }).map(function(k){
    const c = EVIDENCE_CATS[k];
    const n = cats[k] || 0;
    const total = Object.keys(EVIDENCE_DB).filter(function(id){
      return EVIDENCE_DB[id].cat === k;
    }).length;
    return ''
    + '<div class="sum-cat">'
    +   '<div class="sc-ico">' + svg(c.ico, 16) + '</div>'
    +   '<div class="sc-body">'
    +     '<div class="sc-label">' + c.label + '</div>'
    +     '<div class="sc-bar">'
    +       '<div class="sc-fill" style="width:' + (total ? n / total * 100 : 0) + '%"></div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="sc-num">' + n + '/' + total + '</div>'
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Сводка по делу</h2>'
  +     '<div class="sub">№2024-0414</div>'
  +   '</div>'
  +   '<button class="back" onclick="exportSummary()">'
  +     svg('share', 18)
  +   '</button>'
  + '</div>'

  + '<div class="sum-view">'

  +   '<div class="sum-hero">'
  +     '<div class="sh-ring">' + svg('scale', 44) + '</div>'
  +     '<h1>Дело №2024-0414</h1>'
  +     '<div class="sh-sub">«Последний сеанс»</div>'
  +     '<div class="sh-stats">'
  +       '<div><b>' + collected + '/' + totalEv + '</b><span>улик</span></div>'
  +       '<div><b>' + keyEv + '</b><span>ключевых</span></div>'
  +       '<div><b>' + Object.keys(G.achievements || {}).length + '</b><span>ачивок</span></div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="sum-section">'
  +     '<div class="sum-label">' + svg('target', 13) + ' ПРОГРЕСС РАССЛЕДОВАНИЯ</div>'
  +     '<div class="sum-cats">' + catRows + '</div>'
  +   '</div>'

  +   '<div class="sum-section">'
  +     '<div class="sum-label">' + svg('grid', 13) + ' КОНТЕНТ</div>'
  +     '<div class="sum-grid">'

  +       sumGrid('Заметки', G.notesRead, totalNotes, 'note')
  +       sumGrid('Фото', G.photosViewed, totalPhotos, 'image')
  +       sumGrid('Видео', Object.keys(G.opened.videos || {}).length,
  +         totalVideos, 'filmPlay')
  +       sumGrid('Аудио', Object.keys(G.opened.audio || {}).length,
  +         totalAudios, 'mic')
  +       sumGrid('Письма', Object.keys(G.opened.emails || {}).length,
  +         totalEmails, 'note')
  +       sumGrid('Локации', Object.keys(G.opened.locations || {}).length,
  +         totalLocs, 'compass')
  +       sumGrid('Профили', Object.keys(G.opened.profiles || {}).length,
  +         totalProfiles, 'users')
  +       sumGrid('Допросы', Object.keys(G.flags).filter(function(k){
  +         return k.startsWith('interrogation_') && k.endsWith('_done');
  +       }).length, totalInts, 'chat')

  +     '</div>'
  +   '</div>'

  +   '<div class="sum-section">'
  +     '<div class="sum-label">' + svg('fileText', 13) + ' ИТОГИ</div>'
  +     '<div class="sum-results">'
  +       '<div class="sr-row">'
  +         '<span>Неправильных обвинений</span>'
  +         '<b>' + G.wrongAccusations + '</b>'
  +       '</div>'
  +       '<div class="sr-row">'
  +         '<span>Статус дела</span>'
  +         '<b style="color:' + (hasFlag('case_closed') ? 'var(--ok)' : 'var(--warn)') + '">'
  +           + (hasFlag('case_closed') ? '✔ Закрыто' : '⏳ Открыто')
  +         + '</b>'
  +       '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="sum-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' Назад'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="exportSummary()">'
  +       svg('share', 16) + ' Экспорт'
  +     '</button>'
  +   '</div>'

  + '</div>');
};

function sumGrid(label, cur, total, ico){
  const pct = total ? Math.round(cur / total * 100) : 0;
  return ''
  + '<div class="sum-grid-item">'
  +   '<div class="sgi-top">'
  +     svg(ico, 14)
  +     '<span>' + label + '</span>'
  +   '</div>'
  +   '<div class="sgi-num">' + cur + '/' + total + '</div>'
  +   '<div class="sgi-bar">'
  +     '<div class="sgi-fill" style="width:' + pct + '%"></div>'
  +   '</div>'
  + '</div>';
}

function exportSummary(){
  const text = 'Дело №2024-0414 «Последний сеанс»\n'
    + 'Улик: ' + G.evidence.length + '\n'
    + 'Ключевых: ' + G.evidence.filter(function(id){
        return EVIDENCE_DB[id] && EVIDENCE_DB[id].key;
      }).length + '\n'
    + 'Заметок: ' + G.notesRead + '\n'
    + 'Фото: ' + G.photosViewed + '\n'
    + 'Достижений: ' + Object.keys(G.achievements || {}).length + '/'
    + Object.keys(ACHIEVEMENTS).length;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      toast('📋 Скопировано', 'Сводка в буфере', 'ok');
    }).catch(function(){
      toast('Сводка', 'Не удалось скопировать', 'warn');
    });
  } else {
    toast('Сводка', 'Буфер обмена недоступен', 'warn');
  }
}

/* ============================================================
   БЛОК 5 — СИСТЕМА КОНЦОВОК
   ============================================================ */

const ENDINGS = {

  ending_perfect: {
    id: 'ending_perfect',
    t: 'Совершенное расследование',
    d: 'Вы собрали все улики и выдвинули правильное обвинение без ошибок.',
    color: '#3ddc97',
    ico: 'starFill',
    flag: 'finale_perfect',
    condition: function(){
      return hasFlag('case_closed')
        && G.wrongAccusations === 0
        && G.evidence.length >= 30;
    }
  },
  ending_good: {
    id: 'ending_good',
    t: 'Справедливость восторжествовала',
    d: 'Правильное обвинение. Виновник наказан.',
    color: '#5da9ff',
    ico: 'checkCircle',
    flag: 'finale_good',
    condition: function(){
      return hasFlag('case_closed') && G.wrongAccusations === 0;
    }
  },
  ending_neutral: {
    id: 'ending_neutral',
    t: 'Победа с потерями',
    d: 'Правильное обвинение, но были ошибки по пути.',
    color: '#ffb84d',
    ico: 'info',
    flag: 'finale_neutral',
    condition: function(){
      return hasFlag('case_closed')
        && G.wrongAccusations > 0
        && G.wrongAccusations < 3;
    }
  },
  ending_bad: {
    id: 'ending_bad',
    t: 'Ошибка правосудия',
    d: 'Неправильное обвинение. Настоящий убийца ушёл.',
    color: '#ff5a6e',
    ico: 'close',
    flag: 'finale_bad',
    condition: function(){
      return G.flags.accusation_correct === false;
    }
  },
  ending_cynic: {
    id: 'ending_cynic',
    t: 'Циничный финал',
    d: 'Слишком много ошибок. Дело закрыто по формальному признаку.',
    color: '#4d576b',
    ico: 'eyeOff',
    flag: 'finale_cynic',
    condition: function(){
      return hasFlag('case_closed') && G.wrongAccusations >= 3;
    }
  },
  ending_incomplete: {
    id: 'ending_incomplete',
    t: 'Дело не раскрыто',
    d: 'Вы не дошли до финала.',
    color: '#7a869c',
    ico: 'help',
    flag: 'finale_incomplete',
    condition: function(){
      return !hasFlag('case_closed');
    }
  }
};

/* Периодически вычисляем, какая концовка была достигнута, и ставим флаг */
function checkEndingsUnlock(){
  if(!hasFlag('case_closed')) return;

  if(G.wrongAccusations === 0){
    if(G.evidence.length >= 30){
      setFlag('finale_perfect');
    } else {
      setFlag('finale_good');
    }
  } else if(G.wrongAccusations >= 3){
    setFlag('finale_cynic');
  } else {
    setFlag('finale_neutral');
  }
}

setInterval(checkEndingsUnlock, 5000);

ROUTES.endings = function(){
  const ids = Object.keys(ENDINGS);

  /* Улики: сначала проверяем флаг, если нет — проверяем condition() */
  function endingGot(e){
    if(hasFlag(e.flag)) return true;
    try { return !!e.condition(); } catch(err){ return false; }
  }

  const unlocked = ids.filter(function(id){ return endingGot(ENDINGS[id]); });

  const rows = ids.map(function(id){
    const e = ENDINGS[id];
    const got = endingGot(e);
    return ''
    + '<div class="ending-row' + (got ? ' got' : '') + '" '
    +   'style="border-left-color:' + e.color + '">'
    +   '<div class="er-ico" style="color:' + e.color + '">'
    +     svg(got ? e.ico : 'lock', 22)
    +   '</div>'
    +   '<div class="er-body">'
    +     '<div class="er-title">' + (got ? escapeHtml(e.t) : '???') + '</div>'
    +     '<div class="er-desc">'
    +       (got ? escapeHtml(e.d) : 'Ещё не достигнуто')
    +     '</div>'
    +   '</div>'
    +   (got ? '<div class="er-badge">✓</div>' : '')
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Концовки</h2>'
  +     '<div class="sub">' + unlocked.length + '/' + ids.length + ' открыто</div>'
  +   '</div>'
  + '</div>'

  + '<div class="endings-view">'
  +   '<div class="endings-info">'
  +     svg('info', 13)
  +     '<span>В игре 6 концовок. Их можно открыть разными путями.</span>'
  +   '</div>'
  +   '<div class="endings-list">' + rows + '</div>'
  + '</div>');
};

/* ============================================================
   БЛОК 6 — ИНСТРУМЕНТ СОПОСТАВЛЕНИЯ УЛИК
   ============================================================ */

G.compare = {
  a: null,
  b: null,
  result: null
};

ROUTES.compare = function(){
  G.screen = 'compare';

  const evs = G.evidence.filter(function(id){ return EVIDENCE_DB[id]; });

  if(evs.length < 2){
    render(''
    + '<div class="appbar">'
    +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
    +   '<div class="ttl"><h2>Сопоставление</h2></div>'
    + '</div>'
    + '<div class="center">'
    +   '<div class="bigico">' + svg('link', 36) + '</div>'
    +   '<h2>Нужно минимум 2 улики</h2>'
    +   '<p>Продолжайте собирать доказательства.</p>'
    +   '<button class="btn ghost" onclick="goBack()">Назад</button>'
    + '</div>');
    return;
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Сопоставление улик</h2>'
  +     '<div class="sub">Выберите две улики</div>'
  +   '</div>'
  + '</div>'

  + '<div class="cmp-slots">'
  +   '<div class="cmp-slot" onclick="cmpSelect(\'a\')">'
  +     '<div class="cs-label">УЛИКА A</div>'
  +     (G.compare.a
  +       ? '<div class="cs-name">' + escapeHtml(EVIDENCE_DB[G.compare.a].t) + '</div>'
  +       : '<div class="cs-empty">Не выбрано</div>')
  +   '</div>'
  +   '<div class="cmp-link">' + svg('link', 20) + '</div>'
  +   '<div class="cmp-slot" onclick="cmpSelect(\'b\')">'
  +     '<div class="cs-label">УЛИКА B</div>'
  +     (G.compare.b
  +       ? '<div class="cs-name">' + escapeHtml(EVIDENCE_DB[G.compare.b].t) + '</div>'
  +       : '<div class="cs-empty">Не выбрано</div>')
  +   '</div>'
  + '</div>'

  + '<div class="cmp-list">'
  +   evs.map(function(id){
  +     const e = EVIDENCE_DB[id];
  +     const cat = EVIDENCE_CATS[e.cat] || {label: e.cat, ico: 'clue'};
  +     const selA = G.compare.a === id;
  +     const selB = G.compare.b === id;
  +     const cls = selA ? 'selected-a' : (selB ? 'selected-b' : '');
  +     return ''
  +     + '<div class="cmp-item ' + cls + '" onclick="cmpToggle(\'' + id + '\')">'
  +     +   '<div class="ci-cat">' + svg(cat.ico, 11) + ' ' + cat.label + '</div>'
  +     +   '<div class="ci-title">' + escapeHtml(e.t) + '</div>'
  +     +   (selA ? '<div class="ci-mark a">A</div>' : '')
  +     +   (selB ? '<div class="ci-mark b">B</div>' : '')
  +     + '</div>';
  +   }).join('')
  + '</div>'

  + (G.compare.a && G.compare.b
  +   ? '<div class="cmp-footer">'
  +     '<button class="btn" style="width:100%;justify-content:center" '
  +       'onclick="runCompare()">'
  +       svg('target', 16) + ' Сопоставить'
  +     '</button>'
  +     '</div>'
  +   : ''));
};

function cmpSelect(slot){
  toast('Выбор', 'Нажмите на улику ниже', 'warn');
}

function cmpToggle(id){
  if(G.compare.a === id){
    G.compare.a = null;
  } else if(G.compare.b === id){
    G.compare.b = null;
  } else if(!G.compare.a){
    G.compare.a = id;
  } else if(!G.compare.b){
    G.compare.b = id;
  } else {
    G.compare.a = id;
  }
  haptic(8);
  ROUTES.compare();
}

function runCompare(){
  const a = EVIDENCE_DB[G.compare.a];
  const b = EVIDENCE_DB[G.compare.b];
  if(!a || !b) return;

  const aRel = a.relates || [];
  const bRel = b.relates || [];
  const linked = aRel.indexOf(G.compare.b) >= 0
    || bRel.indexOf(G.compare.a) >= 0;
  const sameCat = a.cat === b.cat;
  const sameSrc = a.src === b.src;

  let verdict, color, ico;

  if(linked){
    verdict = 'ПРЯМАЯ СВЯЗЬ: эти улики подтверждают друг друга';
    color = 'var(--ok)';
    ico = 'checkCircle';
    setFlag('compared_linked');
    if(!hasEv('link_' + G.compare.a + '_' + G.compare.b)){
      addEv('link_' + G.compare.a + '_' + G.compare.b);
    }
  } else if(sameCat){
    verdict = 'ОДНА КАТЕГОРИЯ: улики дополняют друг друга';
    color = 'var(--acc)';
    ico = 'info';
  } else if(sameSrc){
    verdict = 'ОДИН ИСТОЧНИК: связаны контекстом';
    color = 'var(--acc2)';
    ico = 'link';
  } else {
    verdict = 'НЕТ ПРЯМОЙ СВЯЗИ: улики относятся к разным линиям';
    color = 'var(--warn)';
    ico = 'close';
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Результат</h2></div>'
  + '</div>'

  + '<div class="cmp-result">'

  +   '<div class="cmpr-pair">'
  +     '<div class="cmpr-box">'
  +       '<div class="cmpr-lbl">A</div>'
  +       '<div class="cmpr-name">' + escapeHtml(a.t) + '</div>'
  +     '</div>'
  +     '<div class="cmpr-link" style="color:' + color + '">'
  +       svg('link', 22)
  +     '</div>'
  +     '<div class="cmpr-box">'
  +       '<div class="cmpr-lbl">B</div>'
  +       '<div class="cmpr-name">' + escapeHtml(b.t) + '</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="cmpr-verdict" style="color:' + color + '">'
  +     svg(ico, 32)
  +     '<div class="cmpr-text">' + verdict + '</div>'
  +   '</div>'

  +   '<div class="cmpr-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="cmpReset()">'
  +       svg('refresh', 16) + ' Ещё раз'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       'Готово'
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(600, 0.05);
}

function cmpReset(){
  G.compare.a = null;
  G.compare.b = null;
  go('compare');
}

/* ============================================================
   БЛОК 7 — АНАЛИЗАТОР АУДИОВОЛН
   ============================================================ */

ROUTES.wave = function(){
  G.screen = 'wave';

  const audios = Object.keys(AUDIO_RECORDINGS);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Анализатор волн</h2>'
  +     '<div class="sub">Видео/аудио сигналы</div>'
  +   '</div>'
  + '</div>'

  + '<div class="wave-view">'
  +   '<div class="wave-info">'
  +     svg('info', 13)
  +     '<span>Визуализация звуковых дорожек. '
  +       'Всплески могут указывать на шум, удар, повышение голоса.</span>'
  +   '</div>'

  +   audios.slice(0, 6).map(function(id){
  +     const a = AUDIO_RECORDINGS[id];
  +     const bars = Array.from({length: 80}, function(_, i){
  +       const seed = (id.charCodeAt(1) * (i + 1) * 9301 + 49297) % 233280;
  +       const rnd = seed / 233280;
  +       const h = 4 + rnd * 30 + Math.sin(i * 0.4) * 6;
  +       return Math.max(3, Math.min(44, h));
  +     });
  +     const peakIdx = Math.floor(bars.length * 0.6);
  +     return ''
  +     + '<div class="wave-card">'
  +     +   '<div class="wc-top">'
  +     +     '<div class="wc-t">' + escapeHtml(a.t) + '</div>'
  +     +     '<div class="wc-d">' + a.dur + '</div>'
  +     +   '</div>'
  +     +   '<div class="wc-canvas">'
  +     +     bars.map(function(h, i){
  +           const isPeak = i >= peakIdx - 3 && i <= peakIdx + 3;
  +           return '<i style="height:' + h + 'px;'
  +             + 'background:' + (isPeak ? 'var(--danger)' : a.color) + ';'
  +             + 'opacity:' + (isPeak ? '1' : '.7') + '"></i>';
  +         }).join('')
  +     +   '</div>'
  +     +   '<div class="wc-mark" style="left:' + (peakIdx / bars.length * 100) + '%">'
  +     +     '<div class="wcm-line"></div>'
  +     +     '<div class="wcm-label">Пик</div>'
  +     +   '</div>'
  +     +   '<div class="wc-bottom">'
  +     +     svg('alert', 11) + ' Обнаружен пик в районе 60% дорожки'
  +     +   '</div>'
  +     + '</div>';
  +   }).join('')

  + '</div>');
};

/* ============================================================
   БЛОК 8 — ДЕТЕКТОР ЛЖИ
   ============================================================ */

G.lieDetector = {
  active: false,
  questions: [],
  current: 0,
  score: 0
};

const LIE_TEST_QUESTIONS = [
  {q: 'Вы знали жертву лично?', truth: true, ico: 'user'},
  {q: 'Вы были в ателье ночью?', truth: true, ico: 'home'},
  {q: 'Вы видели Марину перед исчезновением?', truth: true, ico: 'eye'},
  {q: 'Вы знали о смерти Кирилла раньше 2024?', truth: true, ico: 'alert'},
  {q: 'Вы участвовали в сокрытии тела?', truth: false, ico: 'trash'},
  {q: 'Вы угрожали Марине?', truth: true, ico: 'alert'},
  {q: 'Вы уверены, что вам нечего скрывать?', truth: false, ico: 'info'},
  {q: 'Вы хотите помочь следствию?', truth: false, ico: 'help'}
];

ROUTES.lie = function(){
  G.screen = 'lie';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Детектор лжи</h2>'
  +     '<div class="sub">Тестирование подозреваемого</div>'
  +   '</div>'
  + '</div>'

  + '<div class="lie-view">'

  +   '<div class="lie-hero">'
  +     '<div class="lh-ring">' + svg('wave', 44) + '</div>'
  +     '<div class="lh-label">ПСИХОФИЗИОЛОГИЧЕСКИЙ ТЕСТ</div>'
  +     '<div class="lh-sub">8 вопросов. Следите за реакциями.</div>'
  +   '</div>'

  +   '<div class="lie-start">'
  +     '<button class="btn" style="width:100%;justify-content:center" '
  +       'onclick="startLieTest()">'
  +       svg('play', 16) + ' Начать тест'
  +     '</button>'
  +   '</div>'

  +   '<div class="lie-note">'
  +     svg('info', 12)
  +     '<span>Тест основан на стрессовых показателях. '
  +       'Результат — вероятностный, не юридический.</span>'
  +   '</div>'

  + '</div>');
};

function startLieTest(){
  G.lieDetector = {
    active: true,
    current: 0,
    score: 0
  };
  showLieQuestion();
}

function showLieQuestion(){
  const d = G.lieDetector;
  const q = LIE_TEST_QUESTIONS[d.current];
  if(!q){ showLieResult(); return; }

  const progress = Math.round(d.current / LIE_TEST_QUESTIONS.length * 100);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Вопрос ' + (d.current + 1) + '/' + LIE_TEST_QUESTIONS.length + '</h2>'
  +   '</div>'
  + '</div>'

  + '<div class="lie-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="lie-scene">'

  +   '<div class="lie-question">'
  +     '<div class="lq-ico">' + svg(q.ico, 22) + '</div>'
  +     '<div class="lq-text">' + escapeHtml(q.q) + '</div>'
  +   '</div>'

  +   '<div class="lie-detector-visual">'
  +     '<div class="ldv-screen">'
  +       '<div class="ldv-line"></div>'
  +     '</div>'
  +     '<div class="ldv-label">Реакция</div>'
  +   '</div>'

  +   '<div class="lie-options">'
  +     '<button class="lie-btn" onclick="lieAnswer(\'yes\')">'
  +       svg('check', 18) + ' Да'
  +     '</button>'
  +     '<button class="lie-btn" onclick="lieAnswer(\'no\')">'
  +       svg('close', 18) + ' Нет'
  +     '</button>'
  +     '<button class="lie-btn" onclick="lieAnswer(\'dontknow\')">'
  +       svg('help', 18) + ' Не знаю'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

function lieAnswer(ans){
  const d = G.lieDetector;
  const q = LIE_TEST_QUESTIONS[d.current];
  const correct = (ans === 'yes' && q.truth)
    || (ans === 'no' && !q.truth);
  if(correct) d.score++;
  d.current++;
  beep(correct ? 720 : 320, 0.06);
  haptic(correct ? 15 : 40);
  if(d.current >= LIE_TEST_QUESTIONS.length){
    showLieResult();
  } else {
    setTimeout(showLieQuestion, 200);
  }
}

function showLieResult(){
  const d = G.lieDetector;
  const pct = Math.round(d.score / LIE_TEST_QUESTIONS.length * 100);
  const honest = pct >= 60;
  const color = honest ? 'var(--ok)' : 'var(--danger)';
  const verdict = honest
    ? 'Субъект говорит в основном правду'
    : 'Субъект скрывает информацию';
  const ico = honest ? 'shieldCheck' : 'alert';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Результат</h2></div>'
  + '</div>'

  + '<div class="lie-result">'

  +   '<div class="lr-icon" style="color:' + color + '">'
  +     svg(ico, 60)
  +   '</div>'

  +   '<div class="lr-label" style="color:' + color + '">'
  +     'ИНДЕКС ЧЕСТНОСТИ: ' + pct + '%'
  +   '</div>'

  +   '<h2>' + verdict + '</h2>'

  +   '<div class="lr-stats">'
  +     '<div><b>' + d.score + '</b><span>верно</span></div>'
  +     '<div><b>' + (LIE_TEST_QUESTIONS.length - d.score) + '</b><span>сомнительно</span></div>'
  +   '</div>'

  +   '<div class="lr-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="startLieTest()">'
  +       svg('refresh', 16) + ' Ещё раз'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="goBack()">'
  +       'Готово'
  +     '</button>'
  +   '</div>'

  + '</div>');

  if(honest){
    setFlag('lie_test_honest');
  } else {
    setFlag('lie_test_liar');
  }
  G.lieDetector.active = false;
}

/* ============================================================
   БЛОК 9 — ПСИХОЛОГИЧЕСКИЙ ПРОФИЛЬ ЖЕРТВЫ
   ============================================================ */

ROUTES.psych = function(){
  G.screen = 'psych';

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Психопрофиль</h2>'
  +     '<div class="sub">Марина Соколова, 24</div>'
  +   '</div>'
  + '</div>'

  + '<div class="psych-view">'

  +   '<div class="psy-hero">'
  +     '<div class="psy-avatar">МС</div>'
  +     '<h2>Марина Соколова</h2>'
  +     '<div class="psy-sub">Студентка 4 курса, режиссёр</div>'
  +   '</div>'

  +   '<div class="psy-section">'
  +     '<div class="psy-label">' + svg('heart', 13) + ' ЛИЧНОСТЬ</div>'
  +     '<div class="psy-rows">'
  +       psyRow('Интроверт', 7)
  +       psyRow('Эмоциональность', 8)
  +       psyRow('Настойчивость', 10)
  +       psyRow('Склонность к риску', 7)
  +       psyRow('Тревожность', 8)
  +       psyRow('Одиночество', 7)
  +     '</div>'
  +   '</div>'

  +   '<div class="psy-section">'
  +     '<div class="psy-label">' + svg('target', 13) + ' МОТИВАЦИЯ</div>'
  +     '<div class="psy-motives">'
  +       psyMotive('Память о брате', 'key', 'Все действия Марины связаны с гибелью Кирилла')
  +       psyMotive('Восстановление справедливости', 'key', 'Основная цель последних трёх лет')
  +       psyMotive('Защита близких', 'med', 'Она старалась не втянуть Лену и мать')
  +       psyMotive('Личная месть', 'med', 'Возможно, но замаскирована под правосудие')
  +     '</div>'
  +   '</div>'

  +   '<div class="psy-section">'
  +     '<div class="psy-label">' + svg('alert', 13) + ' ФАКТОРЫ РИСКА</div>'
  +     '<div class="psy-warn">'
  +       '<div class="pwy-item">' + svg('alert', 12) + ' Нарастающая изоляция от близких</div>'
  +       '<div class="pwy-item">' + svg('alert', 12) + ' Одержимость одной темой</div>'
  +       '<div class="pwy-item">' + svg('alert', 12) + ' Готовность идти на риск</div>'
  +       '<div class="pwy-item">' + svg('alert', 12) + ' Отсутствие плана "после"</div>'
  +       '<div class="pwy-item">' + svg('alert', 12) + ' Чувство вины за смерть брата</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="psy-section">'
  +     '<div class="psy-label">' + svg('info', 13) + ' ВЫВОД</div>'
  +     '<div class="psy-verdict">'
  +       'Марина находилась в состоянии затяжного стресса. '
  +       'За три года она полностью посвятила себя расследованию '
  +       'гибели брата. Она понимала, что рискует, но не могла '
  +       'остановиться. Её действия в ночь исчезновения были '
  +       'осознанными — она шла на встречу добровольно.'
  +     '</div>'
  +   '</div>'

  + '</div>');
};

function psyRow(label, val){
  const pct = val * 10;
  const color = val >= 8 ? 'var(--danger)'
    : val >= 5 ? 'var(--warn)'
    : 'var(--ok)';
  return ''
  + '<div class="psy-row">'
  +   '<div class="psy-label-row">' + label + '</div>'
  +   '<div class="psy-bar"><div class="psy-fill" style="width:' + pct
  +     + '%;background:' + color + '"></div></div>'
  +   '<div class="psy-num" style="color:' + color + '">' + val + '/10</div>'
  + '</div>';
}

function psyMotive(label, priority, desc){
  const colors = {key: 'var(--danger)', med: 'var(--warn)', low: 'var(--dim)'};
  return ''
  + '<div class="psy-motive" style="border-left-color:' + colors[priority] + '">'
  +   '<div class="pm-label">' + escapeHtml(label) + '</div>'
  +   '<div class="pm-desc">' + escapeHtml(desc) + '</div>'
  + '</div>';
}

/* ============================================================
   БЛОК 10 — КРИМИНАЛИСТИКА
   ============================================================ */

const FORENSIC = {

  f1: {
    t: 'Отпечатки в павильоне',
    ico: 'fingerprint',
    color: '#5da9ff',
    ev: 'photo_blood',
    flag: 'saw_forensic_f1',
    desc:
      'В павильоне №3 обнаружены следы обуви. '
      + 'Размер 43. Рисунок протектора соответствует '
      + 'мужским туфлям ecco. Отпечатки принадлежат '
      + 'двоим: один крупный, второй мельче.',
    match: [
      'След №1 (43) — Виктор Павлович',
      'След №2 (41) — Вадим Соколовский'
    ]
  },
  f2: {
    t: 'Микрочастицы на пальто',
    ico: 'dna',
    color: '#3ddc97',
    ev: 'photo_figure',
    flag: 'saw_forensic_f2',
    desc:
      'На пальто, изъятом у Виктора Павловича, '
      + 'обнаружены частицы старой краски — '
      + 'такой же, какой окрашены стены павильона №3. '
      + 'Также найдены микрочастицы гипса со сцены.',
    match: [
      'Краска: идентична краске павильона',
      'Гипс: со сцены киноателье'
    ]
  },
  f3: {
    t: 'Волокна с места',
    ico: 'dna',
    color: '#8b6dff',
    ev: 'photo_last',
    flag: 'saw_forensic_f3',
    desc:
      'В павильоне найдены чёрные шерстяные волокна. '
      + 'Соответствуют составу пальто, которое было на '
      + 'Викторе Павловиче в ночь исчезновения.',
    match: [
      'Волокна: 87% шерсть, 13% синтетика',
      'Пальто Виктора: тот же состав'
    ]
  },
  f4: {
    t: 'Отпечатки на ключе',
    ico: 'fingerprint',
    color: '#ff5a6e',
    ev: 'photo_key',
    flag: 'saw_forensic_f4',
    desc:
      'На ключе от павильона №3 обнаружены отпечатки '
      + 'пальцев Марины и Виктора Павловича. '
      + 'Это подтверждает: они оба держали ключ.',
    match: [
      'Марина Андреевна — 4 отпечатка',
      'Виктор Павлович — 2 отпечатка'
    ]
  },
  f5: {
    t: 'Биологические следы',
    ico: 'dna',
    color: '#ff5a6e',
    ev: 'photo_blood',
    flag: 'saw_forensic_f5',
    critical: true,
    desc:
      'Кровь, обнаруженная в павильоне, принадлежит '
      + 'Марине Соколовой. Группа крови совпадает. '
      + 'Это неопровержимо доказывает, что она была '
      + 'ранена в этом помещении.',
    match: [
      'ДНК-профиль: Марина Соколова',
      'Время: ~00:30-01:00 14 апреля'
    ]
  },
  f6: {
    t: 'Микроволокна на руках',
    ico: 'dna',
    color: '#ffb84d',
    ev: 'note_audio',
    flag: 'saw_forensic_f6',
    desc:
      'Под ногтями Марины обнаружены микроволокна. '
      + 'Они соответствуют ткани пальто Виктора Павловича. '
      + 'Это доказывает физический контакт.',
    match: [
      'Волокна: тёмно-серое сукно',
      'Пальто Виктора: то же сукно'
    ]
  }

};

ROUTES.forensic = function(){
  G.screen = 'forensic';

  const ids = Object.keys(FORENSIC);
  const rows = ids.map(function(id){
    const f = FORENSIC[id];
    const seen = G.opened.forensic && G.opened.forensic[id];
    return ''
    + '<div class="for-row' + (seen ? ' seen' : '') + '" '
    +   'style="border-left-color:' + f.color + '" '
    +   'onclick="openForensic(\'' + id + '\')">'
    +   '<div class="fr-ico" style="color:' + f.color + '">'
    +     svg(f.ico, 22)
    +   '</div>'
    +   '<div class="fr-body">'
    +     '<div class="fr-title">' + escapeHtml(f.t) + '</div>'
    +     '<div class="fr-desc-prev">'
    +       escapeHtml(f.desc.split('\n')[0].slice(0, 60)) + '…'
    +     '</div>'
    +   '</div>'
    +   (f.critical ? '<div class="fr-crit">' + svg('starFill', 12, 'fill') + '</div>' : '')
    +   svg('chev', 14)
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Криминалистика</h2>'
  +     '<div class="sub">' + ids.length + ' исследований</div>'
  +   '</div>'
  + '</div>'

  + '<div class="for-view">'
  +   '<div class="for-info">'
  +     svg('info', 13)
  +     '<span>Результаты экспертиз по материалам дела.</span>'
  +   '</div>'
  +   '<div class="for-list">' + rows + '</div>'
  + '</div>');
};

function openForensic(id){
  const f = FORENSIC[id];
  if(!f) return;

  if(!G.opened.forensic) G.opened.forensic = {};
  G.opened.forensic[id] = true;

  if(f.flag) setFlag(f.flag);

  const matches = (f.match || []).map(function(m){
    return '<div class="for-match">' + svg('check', 12) + ' ' + escapeHtml(m) + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Экспертиза</h2></div>'
  + '</div>'

  + '<div class="for-detail">'

  +   '<div class="fd-hero">'
  +     '<div class="fd-ico" style="color:' + f.color + ';'
  +       + 'background:linear-gradient(140deg,'
  +       + f.color + '22,' + f.color + '08)">'
  +       svg(f.ico, 44)
  +     '</div>'
  +     '<h2>' + escapeHtml(f.t) + '</h2>'
  +     (f.critical
  +       ? '<div class="fd-crit">' + svg('starFill', 12, 'fill')
  +         + ' Ключевое доказательство</div>'
  +       : '')
  +   '</div>'

  +   '<div class="fd-desc">' + escapeHtml(f.desc) + '</div>'

  +   '<div class="fd-match-block">'
  +     '<div class="fdm-label">' + svg('checkCircle', 12) + ' СОВПАДЕНИЯ</div>'
  +     '<div class="fdm-list">' + matches + '</div>'
  +   '</div>'

  +   '<div class="fd-actions">'
  +     '<button class="btn ghost" style="width:100%;justify-content:center" '
  +       'onclick="goBack()">'
  +       svg('back', 16) + ' К списку'
  +     '</button>'
  +   '</div>'

  + '</div>');
}

/* ============================================================
   БЛОК 11 — ЗАШИФРОВАННЫЕ ФАЙЛЫ
   ============================================================ */

const ENCRYPTED_FILES = {

  enc1: {
    id: 'enc1',
    t: 'Папка «Кирилл»',
    pass: '14092019',
    hint: 'дата гибели брата',
    color: '#ff5a6e',
    contents:
      'СОДЕРЖИМОЕ ПАПКИ:\n\n' +
      '1. Видео — запись регистратора (копия)\n' +
      '2. Справка ГИБДД №4471/2019\n' +
      '3. Заметки Марины (12 файлов)\n' +
      '4. Список подозреваемых\n' +
      '5. Схема павильона №3\n' +
      '6. Аудиозапись признания\n\n' +
      'ФЛЕШ-КАРТА: спрятана в книге «Мастер и Маргарита»\n' +
      'ЛОКАЦИЯ: книжная полка, вторая снизу\n\n' +
      'Если вы это читаете — значит, что-то случилось.\n' +
      'Найдите правду.',
    flag: 'opened_enc1',
    ev: 'note_plan_b'
  },

  enc2: {
    id: 'enc2',
    t: 'Черновик письма',
    pass: '2019',
    hint: 'год гибели Кирилла',
    color: '#8b6dff',
    contents:
      'Черновик неотправленного письма.\n\n' +
      'От: Марина\n' +
      'Кому: Крылов А. В.\n' +
      'Дата: 12 апреля, 03:15\n\n' +
      '«Андрей Владимирович,\n\n' +
      'Я подумала над вашим предложением.\n' +
      'Двенадцать миллионов. Вы серьёзно?\n\n' +
      'Вы думаете, я продам память брата\n' +
      'за деньги? Вы думаете, у меня нет\n' +
      'ничего святого?\n\n' +
      'Я знаю, что это ВЫ закрыли дело.\n' +
      'Я знаю, что вы помогли Виктору\n' +
      'Павловичу скрыться от наказания.\n\n' +
      'Но я не стану вам отвечать тем же.\n' +
      'Я сделаю то, что должна.\n\n' +
      'Пусть все увидят, кто вы есть.»\n\n' +
      '[письмо не отправлено]',
    flag: 'opened_enc2',
    ev: 'note_krylov_offer'
  },

  enc3: {
    id: 'enc3',
    t: 'Список свидетелей',
    pass: '47',
    hint: '47-й километр Кольцевой',
    color: '#5da9ff',
    contents:
      'СПИСОК ЛЮДЕЙ, КОТОРЫЕ ЗНАЛИ:\n\n' +
      '1. Виктор Павлович Соколовский — виновник\n' +
      '2. Андрей Владимирович Крылов — соучастник\n' +
      '3. Ольга Соколовская — слышала, но молчала\n' +
      '4. Вадим Соколовский — узнал позже, помогал\n' +
      '5. Инспектор ГИБДД (фамилия стёрта) — закрыл дело\n' +
      '6. Анонимный отправитель записи — неизвестен\n\n' +
      'ВОПРОС: почему аноним решил передать запись именно сейчас?\n' +
      'ОТВЕТ: потому что его мучила совесть.\n\n' +
      'Четыре года он хранил правду.',
    flag: 'opened_enc3',
    ev: 'note_suspects'
  },

  enc4: {
    id: 'enc4',
    t: 'Последняя воля',
    pass: '25082024',
    hint: 'дата свадьбы',
    color: '#3ddc97',
    contents:
      'ЗАВЕЩАНИЕ МАРИНЫ СОКОЛОВОЙ\n\n' +
      'Если со мной что-то случится:\n\n' +
      '— Всю квартиру оставляю Соне Мельник,\n' +
      '   моей соседке и подруге.\n' +
      '— Маме — папку «Кирилл».\n' +
      '— Флешку с записью — следователю.\n' +
      '— Свадебное платье — не покупать.\n' +
      '   Свадьбы не будет.\n\n' +
      'Простите меня все, если сможете.\n' +
      'Я знала, на что шла.',
    flag: 'opened_enc4'
  }

};

G.unlockedEncrypted = G.unlockedEncrypted || {};

ROUTES.encrypted = function(){
  G.screen = 'encrypted';

  const ids = Object.keys(ENCRYPTED_FILES);
  const rows = ids.map(function(id){
    const f = ENCRYPTED_FILES[id];
    const unlocked = G.unlockedEncrypted[id];
    return ''
    + '<div class="enc-row' + (unlocked ? ' unlocked' : '') + '" '
    +   'onclick="openEncrypted(\'' + id + '\')">'
    +   '<div class="enc-ico" style="color:' + f.color + '">'
    +     svg(unlocked ? 'unlock' : 'lock', 22)
    +   '</div>'
    +   '<div class="enc-body">'
    +     '<div class="enc-t">' + escapeHtml(f.t) + '</div>'
    +     '<div class="enc-hint">'
    +       (unlocked
    +         ? '✓ Расшифровано'
    +         : 'Подсказка: ' + escapeHtml(f.hint))
    +     '</div>'
    +   '</div>'
    +   svg('chev', 14)
    + '</div>';
  }).join('');

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Зашифрованные файлы</h2>'
  +     '<div class="sub">' + ids.length + ' файлов</div>'
  +   '</div>'
  + '</div>'

  + '<div class="enc-view">'
  +   '<div class="enc-info">'
  +     svg('key', 13)
  +     '<span>Для доступа к файлам нужен пароль.</span>'
  +   '</div>'
  +   '<div class="enc-list">' + rows + '</div>'
  + '</div>');
};

function openEncrypted(id){
  const f = ENCRYPTED_FILES[id];
  if(!f) return;

  if(G.unlockedEncrypted[id]){
    showEncryptedContent(f);
    return;
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Введите пароль</h2></div>'
  + '</div>'

  + '<div class="enc-lock">'
  +   '<div class="el-ring" style="border-color:' + f.color + ';color:' + f.color + '">'
  +     svg('lock', 44)
  +   '</div>'
  +   '<h2>' + escapeHtml(f.t) + '</h2>'
  +   '<div class="el-hint">Подсказка: ' + escapeHtml(f.hint) + '</div>'
  +   '<input class="el-input" id="encPass" '
  +     'type="password" placeholder="Введите пароль..." '
  +     'autocomplete="off" inputmode="numeric">'
  +   '<button class="btn" style="width:100%;justify-content:center;margin-top:12px" '
  +     'onclick="tryEncPass(\'' + id + '\')">'
  +     svg('unlock', 16) + ' Разблокировать'
  +   '</button>'
  + '</div>');
}

function tryEncPass(id){
  const f = ENCRYPTED_FILES[id];
  const inp = document.getElementById('encPass');
  if(!inp) return;
  const val = (inp.value || '').trim();

  if(val === f.pass){
    G.unlockedEncrypted[id] = true;
    if(f.flag) setFlag(f.flag);
    if(f.ev && !hasEv(f.ev)){
      addEv(f.ev);
      setTimeout(function(){
        toast('📌 Улика', EVIDENCE_TITLES[f.ev] || f.t, 'ev');
      }, 400);
    }
    toast('✅ Доступ', 'Файл расшифрован', 'ok');
    beep(880, 0.08);
    showEncryptedContent(f);
  } else {
    toast('❌ Ошибка', 'Неверный пароль', 'err');
    beep(220, 0.12, 'sawtooth');
    haptic([30, 40, 30]);
    inp.value = '';
  }
}

function showEncryptedContent(f){
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>' + escapeHtml(f.t) + '</h2>'
  +     '<div class="sub">Расшифровано</div>'
  +   '</div>'
  + '</div>'

  + '<div class="enc-content">'
  +   '<div class="ecc-head" style="border-color:' + f.color + '">'
  +     '<div class="ecc-ico" style="color:' + f.color + '">'
  +       svg('unlock', 24)
  +     '</div>'
  +     '<div class="ecc-label">ФАЙЛ РАСШИФРОВАН</div>'
  +   '</div>'
  +   '<div class="ecc-body">' + formatNoteText(f.contents) + '</div>'
  +   '<button class="btn ghost" style="width:100%;justify-content:center" '
  +     'onclick="goBack()">'
  +     svg('back', 16) + ' К файлам'
  +   '</button>'
  + '</div>');
}

/* ============================================================
   БЛОК 12 — NEW GAME+
   ============================================================ */

function openNewGamePlus(){
  const unlocked = G.achievements && Object.keys(G.achievements).length >= 5;
  if(!unlocked){
    toast('🔒 NG+', 'Требуется минимум 5 достижений', 'warn');
    return;
  }
  if(!hasFlag('case_closed')){
    toast('🔒 NG+', 'Сначала раскройте дело', 'warn');
    return;
  }
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="goBack()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Новая игра+</h2></div>'
  + '</div>'

  + '<div class="ngp-view">'
  +   '<div class="ngp-hero">'
  +     '<div class="ngp-ring">' + svg('starFill', 48) + '</div>'
  +     '<h2>Повторное расследование</h2>'
  +     '<div class="ngp-sub">С сохранением открытых знаний</div>'
  +   '</div>'

  +   '<div class="ngp-block">'
  +     '<div class="ngpb-title">Что переносится:</div>'
  +     '<ul class="ngpb-list">'
  +       '<li>' + svg('check', 14) + ' Достижения</li>'
  +       '<li>' + svg('check', 14) + ' Открытые концовки</li>'
  +       '<li>' + svg('check', 14) + ' Знание сюжета</li>'
  +       '<li>' + svg('check', 14) + ' Открытые пароли</li>'
  +     '</ul>'
  +   '</div>'

  +   '<div class="ngp-block">'
  +     '<div class="ngpb-title">Что сбрасывается:</div>'
  +     '<ul class="ngpb-list reset">'
  +       '<li>' + svg('close', 14) + ' Прогресс дела</li>'
  +       '<li>' + svg('close', 14) + ' Собранные улики</li>'
  +       '<li>' + svg('close', 14) + ' Пройденные допросы</li>'
  +     '</ul>'
  +   '</div>'

  +   '<div class="ngp-warn">'
  +     svg('alert', 14)
  +     '<span>Рекомендуется пройти заново, зная сюжет. '
  +       'Это откроет скрытые диалоги и улики.</span>'
  +   '</div>'

  +   '<button class="btn danger" style="width:100%;justify-content:center;margin-top:16px" '
  +     'onclick="startNGPlus()">'
  +     svg('refresh', 16) + ' Начать заново'
  +   '</button>'
  + '</div>');
}

function startNGPlus(){
  const savedAchievements = JSON.parse(JSON.stringify(G.achievements || {}));
  const savedUnlocked = JSON.parse(JSON.stringify(G.unlockedEncrypted || {}));
  const savedEndingFlags = {};
  ['finale_good', 'finale_bad', 'finale_neutral', 'finale_perfect',
   'finale_cynic', 'finale_incomplete'].forEach(function(k){
    if(G.flags[k]) savedEndingFlags[k] = G.flags[k];
  });

  wipeSave();

  G.flags = { ng_plus: true, restarted: true };
  G.evidence = [];
  G.notesRead = 0;
  G.photosViewed = 0;
  G.callsChecked = 0;
  G.wrongAccusations = 0;
  G.opened = {
    chats:{}, photos:{}, notes:{}, calls:{}, searches:{},
    videos:{}, audio:{}, emails:{}, locations:{}, profiles:{}, forensic:{}
  };
  G.achievements = savedAchievements;
  G.unlockedEncrypted = savedUnlocked;
  for(const k in savedEndingFlags){
    G.flags[k] = savedEndingFlags[k];
  }

  toast('🌟 NG+', 'Новая игра началась. Удачи!', 'ok');
  go('home');
  saveGame();
}

/* ============================================================
   БЛОК 13 — РЕГИСТРАЦИЯ ПРИЛОЖЕНИЙ И РОУТОВ
   ============================================================ */

(function registerPart9Apps(){
  if(typeof APPS === 'undefined') return;

  const newApps = [
    {id: 'forensic', ic: 'dna', lbl: 'Экспертиза'},
    {id: 'compare', ic: 'link', lbl: 'Сопоставить'},
    {id: 'psych', ic: 'heart', lbl: 'Психопрофиль'},
    {id: 'lie', ic: 'wave', lbl: 'Детектор'},
    {id: 'encrypted', ic: 'key', lbl: 'Файлы'}
  ];

  newApps.forEach(function(app){
    const exists = APPS.some(function(a){ return a.id === app.id; });
    if(!exists){
      const idx = APPS.findIndex(function(a){ return a.id === 'settings'; });
      if(idx >= 0){
        APPS.splice(idx, 0, app);
      } else {
        APPS.push(app);
      }
    }
  });
})();

(function patchOpenAppPart9(){
  if(typeof window.openApp !== 'function') return;
  const prev = window.openApp;
  window.openApp = function(id){
    if(id === 'achievements') return go('achievements');
    if(id === 'summary') return go('summary');
    if(id === 'endings') return go('endings');
    if(id === 'compare') return go('compare');
    if(id === 'wave') return go('wave');
    if(id === 'lie') return go('lie');
    if(id === 'psych') return go('psych');
    if(id === 'forensic') return go('forensic');
    if(id === 'encrypted') return go('encrypted');
    return prev(id);
  };
})();

if(!G.opened.forensic) G.opened.forensic = {};

/* ============================================================
   БЛОК 14 — РАСШИРЕНИЕ СЛОВАРЯ УЛИК
   ============================================================ */
(function extendTitlesPart9(){
  const extra = {
    opened_enc1: 'Папка «Кирилл» (открыта)',
    opened_enc2: 'Черновик письма Крылову',
    opened_enc3: 'Список свидетелей',
    opened_enc4: 'Последняя воля Марины',
    compared_linked: 'Связь улик установлена',
    saw_forensic_f1: 'Экспертиза: отпечатки',
    saw_forensic_f2: 'Экспертиза: микрочастицы',
    saw_forensic_f3: 'Экспертиза: волокна',
    saw_forensic_f4: 'Экспертиза: отпечатки на ключе',
    saw_forensic_f5: 'Экспертиза: ДНК жертвы',
    saw_forensic_f6: 'Экспертиза: микроволокна'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   БЛОК 15 — CSS ДЛЯ ЧАСТИ 9
   ============================================================ */
(function injectPart9Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  /* ---------- НАСТРОЙКИ ---------- */
  + '.settings-view{padding:16px 14px 40px}'
  + '.settings-section{margin-bottom:22px}'
  + '.ss-label{'
  +   'font-size:10.5px;color:var(--dim);'
  +   'letter-spacing:2px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:8px;padding-left:6px;'
  +   'display:flex;align-items:center;gap:7px;'
  + '}'
  + '.ss-card{'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:14px;overflow:hidden;'
  + '}'
  + '.ss-row{'
  +   'display:flex;justify-content:space-between;align-items:center;'
  +   'padding:13px 16px;'
  +   'border-bottom:1px solid var(--line);'
  +   'font-size:13px;'
  + '}'
  + '.ss-row:last-child{border-bottom:none}'
  + '.ss-row span{color:var(--txt2)}'
  + '.ss-row b{color:var(--txt);font-weight:500;font-size:12.5px}'
  + '.ss-row-tap{cursor:pointer;transition:.14s}'
  + '.ss-row-tap:hover{background:var(--panel2)}'
  + '.ss-row-tap .icon{color:var(--dim2)}'
  + '.ss-row-toggle{cursor:pointer;transition:.14s}'
  + '.ss-row-toggle:hover{background:var(--panel2)}'
  + '.ss-row-toggle span{color:var(--txt)}'
  + '.toggle-sw{'
  +   'width:44px;height:26px;border-radius:13px;'
  +   'background:var(--panel3);'
  +   'position:relative;transition:.22s;'
  +   'border:1px solid var(--line2);'
  + '}'
  + '.toggle-sw i{'
  +   'position:absolute;top:2px;left:2px;'
  +   'width:18px;height:18px;border-radius:50%;'
  +   'background:var(--dim);'
  +   'transition:.22s;'
  + '}'
  + '.toggle-sw.on{background:rgba(93,169,255,.25);border-color:var(--acc)}'
  + '.toggle-sw.on i{background:var(--acc);left:22px}'

  + '.ss-slot{'
  +   'display:flex;justify-content:space-between;'
  +   'align-items:center;padding:12px 14px;'
  + '}'
  + '.ss-slot-info{display:flex;flex-direction:column;gap:3px}'
  + '.ss-slot-info b{font-size:13px;font-weight:600;color:var(--txt)}'
  + '.ss-slot-info span{font-size:11px;color:var(--dim)}'
  + '.ss-slot-empty .ss-slot-info span{color:var(--dim2);font-style:italic}'
  + '.ss-slot-actions{display:flex;gap:6px}'
  + '.ss-mini{'
  +   'width:32px;height:32px;border-radius:8px;'
  +   'background:var(--panel2);border:1px solid var(--line);'
  +   'color:var(--txt);cursor:pointer;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'transition:.14s;padding:0;'
  + '}'
  + '.ss-mini:hover{background:var(--panel3)}'
  + '.ss-mini:active{transform:scale(.9)}'
  + '.ss-mini.danger{color:var(--danger)}'
  + '.ss-btn{'
  +   'width:100%;padding:12px 16px;'
  +   'background:transparent;border:none;'
  +   'display:flex;align-items:center;justify-content:center;gap:8px;'
  +   'font-size:13px;font-weight:600;font-family:inherit;'
  +   'cursor:pointer;transition:.14s;'
  + '}'
  + '.ss-btn.danger{color:var(--danger)}'
  + '.ss-btn:hover{background:rgba(255,90,110,.08)}'
  + '.settings-footer{'
  +   'text-align:center;font-size:10.5px;'
  +   'color:var(--dim2);line-height:1.7;margin-top:30px;'
  + '}'

  /* ---------- ДОСТИЖЕНИЯ ---------- */
  + '.ach-progress{padding:14px 16px}'
  + '.ach-list{padding:0 12px 30px;display:flex;flex-direction:column;gap:8px}'
  + '.ach-row{'
  +   'display:flex;gap:12px;padding:12px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'opacity:.55;transition:.15s;'
  +   'align-items:center;'
  + '}'
  + '.ach-row.unlocked{'
  +   'opacity:1;'
  +   'background:linear-gradient(140deg,var(--panel2),var(--panel));'
  +   'border-color:rgba(93,169,255,.3);'
  + '}'
  + '.ach-ico{'
  +   'width:40px;height:40px;border-radius:10px;'
  +   'background:var(--panel2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--dim2);'
  +   'flex:0 0 40px;'
  + '}'
  + '.ach-row.unlocked .ach-ico{'
  +   'background:rgba(93,169,255,.14);color:var(--acc);'
  +   'box-shadow:0 0 16px rgba(93,169,255,.2);'
  + '}'
  + '.ach-body{flex:1;min-width:0}'
  + '.ach-t{font-size:13.5px;font-weight:600;margin-bottom:3px}'
  + '.ach-d{font-size:11.5px;color:var(--dim);line-height:1.4}'
  + '.ach-check{'
  +   'width:24px;height:24px;border-radius:50%;'
  +   'background:var(--ok);color:#001;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 24px;'
  + '}'

  /* ---------- СВОДКА ---------- */
  + '.sum-view{padding:0 0 40px}'
  + '.sum-hero{'
  +   'text-align:center;padding:32px 24px 22px;'
  +   'background:radial-gradient(ellipse at top, '
  +   'rgba(93,169,255,.12), transparent 65%);'
  + '}'
  + '.sh-ring{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(93,169,255,.2), transparent 70%);'
  +   'border:1.5px solid rgba(93,169,255,.4);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--acc);'
  + '}'
  + '.sum-hero h1{'
  +   'font-size:20px;font-weight:600;margin-bottom:4px;'
  + '}'
  + '.sh-sub{'
  +   'font-size:12.5px;color:var(--acc);font-style:italic;'
  +   'margin-bottom:20px;'
  + '}'
  + '.sh-stats{'
  +   'display:flex;justify-content:center;gap:28px;'
  + '}'
  + '.sh-stats > div{'
  +   'display:flex;flex-direction:column;gap:3px;align-items:center;'
  + '}'
  + '.sh-stats b{font-size:20px;font-weight:600;color:var(--txt)}'
  + '.sh-stats span{font-size:10.5px;color:var(--dim)}'
  + '.sum-section{padding:0 16px 22px}'
  + '.sum-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.8px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:12px;'
  +   'display:flex;align-items:center;gap:7px;'
  + '}'
  + '.sum-cats{display:flex;flex-direction:column;gap:9px}'
  + '.sum-cat{'
  +   'display:flex;gap:12px;align-items:center;'
  +   'padding:10px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;'
  + '}'
  + '.sc-ico{'
  +   'width:30px;height:30px;border-radius:8px;'
  +   'background:var(--panel2);color:var(--acc);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 30px;'
  + '}'
  + '.sc-body{flex:1;min-width:0}'
  + '.sc-label{'
  +   'font-size:12px;color:var(--txt);margin-bottom:5px;'
  + '}'
  + '.sc-bar{'
  +   'height:4px;background:var(--panel2);border-radius:2px;'
  +   'overflow:hidden;'
  + '}'
  + '.sc-fill{'
  +   'height:100%;background:linear-gradient(90deg,var(--acc),var(--acc2));'
  +   'border-radius:2px;transition:.5s;'
  + '}'
  + '.sc-num{'
  +   'font-size:11.5px;color:var(--dim);'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.sum-grid{'
  +   'display:grid;grid-template-columns:1fr 1fr;gap:8px;'
  + '}'
  + '.sum-grid-item{'
  +   'padding:11px 13px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;'
  + '}'
  + '.sgi-top{'
  +   'display:flex;align-items:center;gap:5px;'
  +   'font-size:10.5px;color:var(--dim);'
  +   'text-transform:uppercase;letter-spacing:.8px;'
  +   'margin-bottom:6px;'
  + '}'
  + '.sgi-num{'
  +   'font-size:14px;font-weight:600;color:var(--txt);'
  +   'font-variant-numeric:tabular-nums;margin-bottom:6px;'
  + '}'
  + '.sgi-bar{'
  +   'height:3px;background:var(--panel2);border-radius:2px;overflow:hidden;'
  + '}'
  + '.sgi-fill{'
  +   'height:100%;background:var(--acc);border-radius:2px;'
  + '}'
  + '.sum-results{'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;overflow:hidden;'
  + '}'
  + '.sr-row{'
  +   'display:flex;justify-content:space-between;align-items:center;'
  +   'padding:11px 14px;'
  +   'font-size:12.5px;'
  +   'border-bottom:1px solid var(--line);'
  + '}'
  + '.sr-row:last-child{border-bottom:none}'
  + '.sr-row span{color:var(--dim)}'
  + '.sr-row b{font-weight:500}'
  + '.sum-actions{display:flex;gap:10px;padding:0 16px}'

  /* ---------- КОНЦОВКИ ---------- */
  + '.endings-view{padding:0 0 30px}'
  + '.endings-info{'
  +   'margin:14px 16px;'
  +   'padding:11px 14px;'
  +   'background:rgba(93,169,255,.06);'
  +   'border:1px solid rgba(93,169,255,.2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'line-height:1.55;'
  + '}'
  + '.endings-info .icon{flex:0 0 13px;color:var(--acc);margin-top:2px}'
  + '.endings-list{padding:0 14px;display:flex;flex-direction:column;gap:10px}'
  + '.ending-row{'
  +   'display:flex;gap:12px;padding:14px 16px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:3px;'
  +   'border-radius:12px;'
  +   'opacity:.55;'
  +   'align-items:center;'
  + '}'
  + '.ending-row.got{opacity:1}'
  + '.er-ico{'
  +   'width:44px;height:44px;border-radius:12px;'
  +   'background:var(--panel2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 44px;'
  + '}'
  + '.er-body{flex:1;min-width:0}'
  + '.er-title{font-size:13.5px;font-weight:600;margin-bottom:4px}'
  + '.er-desc{font-size:11.5px;color:var(--dim);line-height:1.45}'
  + '.er-badge{'
  +   'width:22px;height:22px;border-radius:50%;'
  +   'background:var(--ok);color:#001;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-weight:700;font-size:12px;'
  + '}'

  /* ---------- СОПОСТАВЛЕНИЕ ---------- */
  + '.cmp-slots{'
  +   'display:flex;align-items:center;gap:10px;'
  +   'padding:16px 14px;'
  + '}'
  + '.cmp-slot{'
  +   'flex:1;padding:14px 12px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'text-align:center;cursor:pointer;'
  +   'min-height:80px;'
  +   'display:flex;flex-direction:column;justify-content:center;'
  + '}'
  + '.cs-label{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1.5px;font-weight:700;'
  +   'margin-bottom:6px;'
  + '}'
  + '.cs-name{'
  +   'font-size:12px;color:var(--txt);line-height:1.4;'
  + '}'
  + '.cs-empty{font-size:11.5px;color:var(--dim2);font-style:italic}'
  + '.cmp-link{color:var(--acc);display:flex}'
  + '.cmp-list{padding:0 14px 20px;display:flex;flex-direction:column;gap:6px}'
  + '.cmp-item{'
  +   'position:relative;'
  +   'padding:11px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;cursor:pointer;'
  +   'transition:.14s;'
  + '}'
  + '.cmp-item:hover{border-color:var(--line2)}'
  + '.cmp-item.selected-a{'
  +   'background:rgba(93,169,255,.1);'
  +   'border-color:var(--acc);'
  + '}'
  + '.cmp-item.selected-b{'
  +   'background:rgba(139,109,255,.1);'
  +   'border-color:var(--acc2);'
  + '}'
  + '.ci-cat{'
  +   'font-size:9.5px;color:var(--dim);'
  +   'letter-spacing:1.2px;text-transform:uppercase;'
  +   'display:flex;align-items:center;gap:5px;'
  +   'margin-bottom:4px;'
  + '}'
  + '.ci-title{'
  +   'font-size:12.5px;color:var(--txt);line-height:1.35;'
  + '}'
  + '.ci-mark{'
  +   'position:absolute;top:8px;right:10px;'
  +   'width:22px;height:22px;border-radius:50%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'font-size:11px;font-weight:700;color:#fff;'
  + '}'
  + '.ci-mark.a{background:var(--acc)}'
  + '.ci-mark.b{background:var(--acc2)}'
  + '.cmp-footer{padding:0 14px 30px}'

  + '.cmp-result{padding:30px 20px}'
  + '.cmpr-pair{'
  +   'display:flex;gap:12px;align-items:center;'
  +   'margin-bottom:26px;'
  + '}'
  + '.cmpr-box{'
  +   'flex:1;padding:14px 12px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:10px;text-align:center;'
  + '}'
  + '.cmpr-lbl{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:1.5px;font-weight:700;'
  +   'margin-bottom:5px;'
  + '}'
  + '.cmpr-name{'
  +   'font-size:12px;color:var(--txt);line-height:1.4;'
  + '}'
  + '.cmpr-link{display:flex}'
  + '.cmpr-verdict{'
  +   'text-align:center;padding:28px 0;'
  +   'display:flex;flex-direction:column;align-items:center;gap:14px;'
  + '}'
  + '.cmpr-text{'
  +   'font-size:14px;font-weight:600;'
  +   'letter-spacing:.5px;max-width:280px;'
  +   'text-transform:uppercase;line-height:1.5;'
  + '}'
  + '.cmpr-actions{'
  +   'display:flex;gap:10px;margin-top:20px;'
  + '}'

  /* ---------- АНАЛИЗАТОР ВОЛН ---------- */
  + '.wave-view{padding:0 0 30px}'
  + '.wave-info{'
  +   'margin:14px 16px;'
  +   'padding:11px 14px;'
  +   'background:rgba(93,169,255,.06);'
  +   'border:1px solid rgba(93,169,255,.2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'line-height:1.55;'
  + '}'
  + '.wave-info .icon{flex:0 0 13px;color:var(--acc);margin-top:2px}'
  + '.wave-card{'
  +   'margin:0 14px 14px;'
  +   'padding:14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:14px;position:relative;'
  + '}'
  + '.wc-top{'
  +   'display:flex;justify-content:space-between;align-items:center;'
  +   'margin-bottom:12px;'
  + '}'
  + '.wc-t{font-size:13px;font-weight:600}'
  + '.wc-d{'
  +   'font-size:11px;color:var(--dim);'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.wc-canvas{'
  +   'display:flex;align-items:center;gap:2px;'
  +   'height:48px;padding:0 4px;position:relative;'
  + '}'
  + '.wc-canvas i{'
  +   'flex:1;border-radius:1px;'
  + '}'
  + '.wc-mark{'
  +   'position:absolute;top:42px;bottom:38px;'
  +   'transform:translateX(-50%);'
  +   'display:flex;flex-direction:column;align-items:center;'
  +   'pointer-events:none;'
  + '}'
  + '.wcm-line{'
  +   'width:2px;background:var(--danger);'
  +   'flex:1;'
  + '}'
  + '.wcm-label{'
  +   'font-size:9px;color:var(--danger);'
  +   'font-weight:700;letter-spacing:1px;'
  +   'margin-top:4px;'
  + '}'
  + '.wc-bottom{'
  +   'margin-top:14px;padding-top:10px;'
  +   'border-top:1px solid var(--line);'
  +   'font-size:11px;color:var(--danger);'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'

  /* ---------- ДЕТЕКТОР ЛЖИ ---------- */
  + '.lie-view{padding:0 0 30px}'
  + '.lie-hero{'
  +   'text-align:center;padding:30px 20px 22px;'
  +   'background:radial-gradient(ellipse at top, '
  +   'rgba(139,109,255,.12), transparent 65%);'
  + '}'
  + '.lh-ring{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(139,109,255,.2), transparent 70%);'
  +   'border:1.5px solid rgba(139,109,255,.4);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--acc2);'
  + '}'
  + '.lh-label{'
  +   'font-size:11px;color:var(--acc2);'
  +   'letter-spacing:3px;font-weight:700;'
  +   'margin-bottom:6px;'
  + '}'
  + '.lh-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  +   'max-width:280px;margin:0 auto;line-height:1.55;'
  + '}'
  + '.lie-start{padding:0 24px}'
  + '.lie-note{'
  +   'margin:18px 24px 0;'
  +   'padding:11px 14px;'
  +   'background:var(--panel2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;gap:8px;line-height:1.55;'
  + '}'
  + '.lie-note .icon{flex:0 0 12px;margin-top:2px;color:var(--acc2)}'
  + '.lie-progress{padding:14px 16px 0}'
  + '.lie-scene{padding:24px 22px 40px}'
  + '.lie-question{'
  +   'display:flex;gap:14px;align-items:center;'
  +   'padding:18px;'
  +   'background:linear-gradient(140deg,var(--panel2),var(--panel));'
  +   'border:1px solid var(--line);'
  +   'border-left:3px solid var(--acc2);'
  +   'border-radius:12px;margin-bottom:22px;'
  + '}'
  + '.lq-ico{'
  +   'width:44px;height:44px;border-radius:12px;'
  +   'background:rgba(139,109,255,.14);'
  +   'color:var(--acc2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 44px;'
  + '}'
  + '.lq-text{'
  +   'font-size:14px;color:var(--txt);'
  +   'line-height:1.5;font-weight:500;'
  + '}'
  + '.lie-detector-visual{'
  +   'text-align:center;margin-bottom:24px;'
  + '}'
  + '.ldv-screen{'
  +   'height:80px;border-radius:12px;'
  +   'background:linear-gradient(140deg,#0a0e18,#05070c);'
  +   'border:1px solid var(--line);'
  +   'position:relative;overflow:hidden;'
  +   'margin-bottom:8px;'
  + '}'
  + '.ldv-line{'
  +   'position:absolute;left:0;top:50%;'
  +   'width:100%;height:2px;'
  +   'background:linear-gradient(90deg,transparent,var(--ok),transparent);'
  +   'animation:lie-pulse 1.6s infinite;'
  + '}'
  + '@keyframes lie-pulse{'
  +   '0%,100%{transform:translateY(-4px) scaleX(.9);opacity:.7}'
  +   '50%{transform:translateY(4px) scaleX(1);opacity:1}'
  + '}'
  + '.ldv-label{'
  +   'font-size:10px;color:var(--dim);'
  +   'letter-spacing:2px;text-transform:uppercase;'
  + '}'
  + '.lie-options{display:flex;flex-direction:column;gap:10px}'
  + '.lie-btn{'
  +   'padding:14px 16px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;color:var(--txt);'
  +   'font-size:13.5px;cursor:pointer;'
  +   'transition:.15s;font-family:inherit;'
  +   'display:flex;align-items:center;gap:10px;'
  + '}'
  + '.lie-btn:hover{border-color:var(--acc2);background:var(--panel3)}'
  + '.lie-btn:active{transform:scale(.98)}'
  + '.lie-result{padding:40px 24px;text-align:center}'
  + '.lr-icon{margin-bottom:16px;display:flex;justify-content:center}'
  + '.lr-label{'
  +   'font-size:11px;letter-spacing:3px;'
  +   'font-weight:700;margin-bottom:12px;'
  +   'text-transform:uppercase;'
  + '}'
  + '.lie-result h2{'
  +   'font-size:17px;font-weight:600;'
  +   'max-width:280px;margin:0 auto 24px;'
  +   'line-height:1.4;'
  + '}'
  + '.lr-stats{'
  +   'display:flex;gap:32px;justify-content:center;'
  +   'margin-bottom:24px;'
  + '}'
  + '.lr-stats > div{'
  +   'display:flex;flex-direction:column;gap:3px;align-items:center;'
  + '}'
  + '.lr-stats b{font-size:22px;font-weight:600}'
  + '.lr-stats span{font-size:10.5px;color:var(--dim)}'
  + '.lr-actions{display:flex;gap:10px}'

  /* ---------- ПСИХОПРОФИЛЬ (переименованы классы, чтобы не конфликтовать с профилями) ---------- */
  + '.psych-view{padding:0 0 30px}'
  + '.psy-hero{'
  +   'text-align:center;padding:28px 20px 22px;'
  + '}'
  + '.psy-avatar{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'background:linear-gradient(140deg,#e05c7a,#9c2f4d);'
  +   'color:#fff;font-size:28px;font-weight:600;'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.psy-hero h2{font-size:19px;font-weight:600;margin-bottom:4px}'
  + '.psy-sub{font-size:12.5px;color:var(--dim)}'
  + '.psy-section{padding:0 16px 22px}'
  + '.psy-label{'
  +   'font-size:10.5px;color:var(--acc);'
  +   'letter-spacing:1.8px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:12px;'
  +   'display:flex;align-items:center;gap:7px;'
  + '}'
  + '.psy-rows{display:flex;flex-direction:column;gap:10px}'
  + '.psy-row{'
  +   'display:flex;align-items:center;gap:12px;'
  + '}'
  + '.psy-label-row{'
  +   'flex:0 0 120px;font-size:12px;color:var(--dim);'
  + '}'
  + '.psy-bar{'
  +   'flex:1;height:5px;background:var(--panel2);'
  +   'border-radius:3px;overflow:hidden;'
  + '}'
  + '.psy-fill{'
  +   'height:100%;border-radius:3px;transition:.5s;'
  + '}'
  + '.psy-num{'
  +   'flex:0 0 auto;font-size:11px;font-weight:600;'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.psy-motives{display:flex;flex-direction:column;gap:10px}'
  + '.psy-motive{'
  +   'padding:12px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:3px;'
  +   'border-radius:10px;'
  + '}'
  + '.pm-label{'
  +   'font-size:13px;font-weight:600;color:var(--txt);'
  +   'margin-bottom:5px;'
  + '}'
  + '.pm-desc{'
  +   'font-size:11.5px;color:var(--dim);line-height:1.5;'
  + '}'
  + '.psy-warn{'
  +   'display:flex;flex-direction:column;gap:8px;'
  + '}'
  + '.pwy-item{'
  +   'display:flex;align-items:center;gap:9px;'
  +   'padding:10px 12px;'
  +   'background:rgba(255,90,110,.06);'
  +   'border:1px solid rgba(255,90,110,.2);'
  +   'border-radius:9px;'
  +   'font-size:12px;color:var(--txt2);'
  + '}'
  + '.pwy-item .icon{color:var(--danger);flex:0 0 12px}'
  + '.psy-verdict{'
  +   'padding:16px 18px;'
  +   'background:var(--panel2);'
  +   'border-left:3px solid var(--acc);'
  +   'border-radius:10px;'
  +   'font-size:13px;color:var(--txt2);line-height:1.7;'
  + '}'

  /* ---------- КРИМИНАЛИСТИКА ---------- */
  + '.for-view{padding:0 0 30px}'
  + '.for-info{'
  +   'margin:14px 16px;'
  +   'padding:11px 14px;'
  +   'background:rgba(93,169,255,.06);'
  +   'border:1px solid rgba(93,169,255,.2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--dim);'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'line-height:1.55;'
  + '}'
  + '.for-info .icon{flex:0 0 13px;color:var(--acc);margin-top:2px}'
  + '.for-list{padding:0 14px;display:flex;flex-direction:column;gap:9px}'
  + '.for-row{'
  +   'display:flex;gap:12px;align-items:center;'
  +   'padding:14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:3px;'
  +   'border-radius:12px;cursor:pointer;'
  +   'transition:.15s;position:relative;'
  + '}'
  + '.for-row:hover{border-color:var(--line2)}'
  + '.for-row.seen{opacity:.7}'
  + '.fr-ico{'
  +   'width:44px;height:44px;border-radius:12px;'
  +   'background:var(--panel2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 44px;'
  + '}'
  + '.fr-body{flex:1;min-width:0}'
  + '.fr-title{font-size:13.5px;font-weight:600;margin-bottom:4px}'
  + '.fr-desc-prev{'
  +   'font-size:11.5px;color:var(--dim);line-height:1.4;'
  + '}'
  + '.fr-crit{'
  +   'position:absolute;top:8px;right:8px;'
  +   'width:20px;height:20px;border-radius:50%;'
  +   'background:var(--warn);color:#000;'
  +   'display:flex;align-items:center;justify-content:center;'
  + '}'
  + '.for-detail{padding:24px 18px 40px}'
  + '.fd-hero{text-align:center;margin-bottom:20px}'
  + '.fd-ico{'
  +   'width:90px;height:90px;border-radius:50%;'
  +   'margin:0 auto 16px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1.5px solid rgba(255,255,255,.08);'
  + '}'
  + '.fd-hero h2{'
  +   'font-size:18px;font-weight:600;margin-bottom:8px;'
  + '}'
  + '.fd-crit{'
  +   'display:inline-flex;align-items:center;gap:6px;'
  +   'padding:4px 12px;border-radius:10px;'
  +   'background:rgba(255,184,77,.14);'
  +   'color:var(--warn);'
  +   'font-size:10.5px;letter-spacing:1px;'
  +   'font-weight:700;text-transform:uppercase;'
  + '}'
  + '.fd-desc{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.75;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:18px 20px;'
  +   'margin-bottom:16px;'
  + '}'
  + '.fd-match-block{'
  +   'background:linear-gradient(140deg,'
  +   'rgba(61,220,151,.08), rgba(61,220,151,.02));'
  +   'border:1px solid rgba(61,220,151,.3);'
  +   'border-radius:12px;padding:14px 18px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.fdm-label{'
  +   'font-size:10.5px;color:var(--ok);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  +   'font-weight:700;margin-bottom:10px;'
  +   'display:flex;align-items:center;gap:6px;'
  + '}'
  + '.fdm-list{display:flex;flex-direction:column;gap:8px}'
  + '.for-match{'
  +   'font-size:12.5px;color:var(--txt2);'
  +   'display:flex;align-items:center;gap:8px;'
  + '}'
  + '.for-match .icon{color:var(--ok);flex:0 0 12px}'
  + '.fd-actions{display:flex;gap:10px}'

  /* ---------- ЗАШИФРОВАННЫЕ ФАЙЛЫ ---------- */
  + '.enc-view{padding:0 0 30px}'
  + '.enc-info{'
  +   'margin:14px 16px;'
  +   'padding:11px 14px;'
  +   'background:rgba(255,184,77,.06);'
  +   'border:1px solid rgba(255,184,77,.2);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--warn);'
  +   'display:flex;align-items:flex-start;gap:8px;'
  +   'line-height:1.55;'
  + '}'
  + '.enc-info .icon{flex:0 0 13px;margin-top:2px}'
  + '.enc-list{padding:0 14px;display:flex;flex-direction:column;gap:10px}'
  + '.enc-row{'
  +   'display:flex;gap:13px;padding:14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;cursor:pointer;'
  +   'transition:.15s;align-items:center;'
  + '}'
  + '.enc-row:hover{border-color:var(--line2)}'
  + '.enc-row.unlocked{'
  +   'background:linear-gradient(140deg,var(--panel2),var(--panel));'
  +   'border-color:rgba(61,220,151,.3);'
  + '}'
  + '.enc-ico{'
  +   'width:44px;height:44px;border-radius:12px;'
  +   'background:var(--panel2);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'flex:0 0 44px;'
  + '}'
  + '.enc-body{flex:1;min-width:0}'
  + '.enc-t{font-size:13.5px;font-weight:600;margin-bottom:4px}'
  + '.enc-hint{font-size:11.5px;color:var(--dim)}'
  + '.enc-lock{padding:30px 24px;text-align:center}'
  + '.el-ring{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:2px solid;background:rgba(255,255,255,.03);'
  + '}'
  + '.enc-lock h2{'
  +   'font-size:18px;font-weight:600;margin-bottom:8px;'
  + '}'
  + '.el-hint{'
  +   'font-size:12px;color:var(--dim);margin-bottom:24px;'
  +   'font-style:italic;'
  + '}'
  + '.el-input{'
  +   'width:100%;padding:14px 16px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;color:var(--txt);'
  +   'font-size:16px;font-family:inherit;'
  +   'outline:none;text-align:center;'
  +   'letter-spacing:4px;'
  +   'font-variant-numeric:tabular-nums;'
  + '}'
  + '.el-input:focus{border-color:var(--acc)}'
  + '.enc-content{padding:20px 18px 40px}'
  + '.ecc-head{'
  +   'text-align:center;padding:18px;'
  +   'border-bottom:2px solid;'
  +   'margin-bottom:20px;'
  + '}'
  + '.ecc-ico{margin-bottom:8px}'
  + '.ecc-label{'
  +   'font-size:10.5px;letter-spacing:3px;'
  +   'font-weight:700;color:var(--dim);'
  +   'text-transform:uppercase;'
  + '}'
  + '.ecc-body{'
  +   'font-size:13px;color:var(--txt2);'
  +   'line-height:1.75;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:18px 20px;'
  +   'margin-bottom:20px;'
  +   'font-family:"SF Mono",Monaco,Consolas,monospace;'
  +   'font-size:12px;'
  + '}'

  /* ---------- NG+ ---------- */
  + '.ngp-view{padding:0 0 40px}'
  + '.ngp-hero{'
  +   'text-align:center;padding:30px 20px 22px;'
  +   'background:radial-gradient(ellipse at top, '
  +   'rgba(255,184,77,.12), transparent 65%);'
  + '}'
  + '.ngp-ring{'
  +   'width:88px;height:88px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(255,184,77,.2), transparent 70%);'
  +   'border:1.5px solid rgba(255,184,77,.4);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--warn);'
  + '}'
  + '.ngp-hero h2{font-size:18px;font-weight:600;margin-bottom:6px}'
  + '.ngp-sub{font-size:12.5px;color:var(--dim)}'
  + '.ngp-block{'
  +   'margin:0 16px 14px;'
  +   'padding:14px 16px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  + '}'
  + '.ngpb-title{'
  +   'font-size:12px;font-weight:600;color:var(--txt);'
  +   'margin-bottom:10px;'
  + '}'
  + '.ngpb-list{list-style:none;display:flex;flex-direction:column;gap:7px}'
  + '.ngpb-list li{'
  +   'font-size:12.5px;color:var(--txt2);'
  +   'display:flex;align-items:center;gap:9px;'
  + '}'
  + '.ngpb-list li .icon{color:var(--ok);flex:0 0 14px}'
  + '.ngpb-list.reset li .icon{color:var(--danger)}'
  + '.ngp-warn{'
  +   'margin:0 16px;'
  +   'padding:12px 14px;'
  +   'background:rgba(255,184,77,.08);'
  +   'border:1px solid rgba(255,184,77,.25);'
  +   'border-radius:10px;'
  +   'font-size:11.5px;color:var(--warn);'
  +   'display:flex;gap:9px;line-height:1.55;'
  + '}'
  + '.ngp-warn .icon{flex:0 0 14px;margin-top:2px}';

  document.head.appendChild(style);
})();

/* ============================================================
   БЛОК 16 — РАСШИРЕНИЕ ИКОНОК
   ============================================================ */
(function addPart9Icons(){
  if(typeof ICON_PATHS === 'undefined') return;
  if(!ICON_PATHS.wave){
    ICON_PATHS.wave = '<path d="M2 12h2M7 8v8M12 4v16M17 8v8M22 12h-.5"/>';
  }
  if(!ICON_PATHS.speaker){
    ICON_PATHS.speaker =
      '<rect x="3" y="3" width="18" height="18" rx="3"/>' +
      '<circle cx="12" cy="14" r="3"/>' +
      '<circle cx="12" cy="7.5" r="1"/>';
  }
  if(!ICON_PATHS.dna){
    ICON_PATHS.dna =
      '<path d="M4 3s4 2 4 6-4 8-4 12M20 3s-4 2-4 6 4 8 4 12"/>' +
      '<path d="M7 7h10M5 15h14M7 11h10M7 19h10"/>';
  }
})();

G._startTime = Date.now();
setInterval(function(){
  G._playTime = Math.floor((Date.now() - G._startTime) / 1000);
}, 1000);

console.log(
  '%c[ЧАСТЬ 9 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nДостижения: 48. Настройки расширены. Добавлены: сопоставление, экспертиза, детектор лжи, психопрофиль, шифры, NG+. Вставляй Часть 10 ниже.'
);
/* ============================================================
   ЧАСТЬ 10 из 10 — ЭПИЛОГ · ТИТРЫ · ПОСТ-КРЕДИТ · ФИНАЛ
   ============================================================ */

const TRIAL_SCENES = {

  trial_opening: {
    id: 'trial_opening',
    ico: 'scale',
    color: '#8b6dff',
    title: 'Судебное заседание открыто',
    sub: '15 октября 2024 · 10:00',
    body:
      'Зал заседаний переполнен. Судья — женщина лет пятидесяти, '
      + 'с усталыми глазами. Прокурор — молодой, энергичный. '
      + 'Адвокат Виктора Павловича — седой, в дорогом костюме.\n\n'
      + 'На скамье подсудимых — Виктор Павлович Соколовский. '
      + 'Он постарел. За пять месяцев следствия он похудел '
      + 'килограмм на десять. Смотрит в пол.\n\n'
      + 'В зале: Ольга (жена), Вадим (сын), Лена, мать Марины, '
      + 'Артём, Антон, Соня. Они сидят в разных концах зала. '
      + 'Но все смотрят на него.',
    next: 'trial_prosecutor'
  },

  trial_prosecutor: {
    id: 'trial_prosecutor',
    ico: 'fileText',
    color: '#5da9ff',
    title: 'Речь прокурора',
    sub: 'Вступительное слово',
    body:
      'Прокурор встаёт. Голос ровный, спокойный:\n\n'
      + '«Ваша честь, сегодня мы рассматриваем дело, которое '
      + 'пять лет оставалось нераскрытым. Дело о гибели '
      + 'девятнадцатилетнего Кирилла Соколова. И дело об '
      + 'убийстве его сестры, Марины Соколовой.»\n\n'
      + 'Он делает паузу. Смотрит прямо на подсудимого.\n\n'
      + '«Два преступления. Один человек. И — цепочка молчания, '
      + 'которая их связывает. Позвольте представить суду '
      + 'доказательства, собранные следствием.»',
    next: 'trial_evidence'
  },

  trial_evidence: {
    id: 'trial_evidence',
    ico: 'clue',
    color: '#ffb84d',
    title: 'Предъявление улик',
    sub: 'Главные доказательства',
    body:
      'Прокурор предъявляет суду 8 главных улик:\n\n'
      + '1. Аудиозапись признания Виктора Соколовского, '
      + 'обнаруженная в телефоне Марины.\n\n'
      + '2. Видеозапись с регистратора, подтверждающая ДТП 2019 года.\n\n'
      + '3. Показания Антона Ветрова, видевшего, как обвиняемый '
      + 'уводил жертву.\n\n'
      + '4. Криминалистическая экспертиза: следы обуви, волокна '
      + 'пальто, ДНК.\n\n'
      + '5. Переписка между обвиняемым и жертвой с требованиями '
      + 'убрать вторую часть фильма.\n\n'
      + '6. Записи с внутренних камер киноателье «Сокол».\n\n'
      + '7. Показания Ольги Соколовской, подтверждающие, '
      + 'что муж уехал ночью и вернулся в 4 утра.\n\n'
      + '8. Результаты анализа микрочастиц с пальто обвиняемого.',
    next: 'trial_defense'
  },

  trial_defense: {
    id: 'trial_defense',
    ico: 'user',
    color: '#c8d1e2',
    title: 'Речь адвоката',
    sub: 'Линия защиты',
    body:
      'Адвокат встаёт. Улыбается. Спокойным шагом идёт '
      + 'к трибуне:\n\n'
      + '«Ваша честь, мой подзащитный не отрицает факта '
      + 'знакомства с погибшей. Он не отрицает, что был '
      + 'в киноателье в ту ночь. Но он категорически '
      + 'отрицает убийство.»\n\n'
      + 'Он делает паузу.\n\n'
      + '«Аудиозапись, предъявленная следствием, может быть '
      + 'фальсифицирована. Почерковедческая экспертиза '
      + 'записей Марины Соколовой вызывает вопросы. '
      + 'И, наконец, где тело? Где тело Марины Соколовой, '
      + 'если вы так уверены в вине моего подзащитного?»\n\n'
      + 'В зале тишина. Мать Марины закрывает лицо руками.',
    next: 'trial_witness_viktor'
  },

  trial_witness_viktor: {
    id: 'trial_witness_viktor',
    ico: 'userCircle',
    color: '#8b6dff',
    title: 'Показания Ольги Соколовской',
    sub: 'Жена обвиняемого',
    body:
      'Ольга выходит к трибуне. Она не смотрит на мужа. '
      + 'Только на судью.\n\n'
      + '«В ночь с 13 на 14 апреля мой муж уехал около '
      + '22:40. Он сказал, что ему нужно уладить одно '
      + 'дело. Вернулся около 4 утра. Был весь в грязи. '
      + 'Молчал. Не сказал ни слова.»\n\n'
      + 'Она делает паузу.\n\n'
      + '«Утром я заметила, что его любимые туфли стоят '
      + 'в ванной. Он их мыл. Раньше такого никогда не было.»\n\n'
      + 'Она смотрит на Виктора впервые за всё заседание.\n\n'
      + '«Я знала, что он что-то скрывает. Я знала про '
      + 'аварию 2019 года. Он рассказал мне ещё тогда. '
      + 'Я молчала четыре года. И я больше не могу молчать.»\n\n'
      + 'Виктор закрывает лицо руками.',
    next: 'trial_witness_vadim'
  },

  trial_witness_vadim: {
    id: 'trial_witness_vadim',
    ico: 'userCircle',
    color: '#ff5a6e',
    title: 'Показания Вадима Соколовского',
    sub: 'Сын обвиняемого',
    body:
      'Вадим выходит к трибуне. Он злой. Он не смотрит '
      + 'ни на отца, ни на мать.\n\n'
      + '«Отец позвонил мне в 23:30. Сказал: „Сынок, '
      + 'приезжай в ателье. Нужна помощь.“ Я приехал. '
      + 'Он был там с женщиной. Женщина... она была без '
      + 'сознания. Я не знаю, была ли она ещё жива.»\n\n'
      + 'Он сглатывает.\n\n'
      + '«Он сказал, что она упала сама. Что это несчастный '
      + 'случай. Что надо всё убрать. Я помог. Мы завернули '
      + 'её в тёмную ткань, положили в багажник. Он отвёз '
      + 'её куда-то. Куда — не знаю. Я вернулся домой.»\n\n'
      + 'Он вытирает слёзы.\n\n'
      + '«Я знаю, что я соучастник. Я пришёл с повинной, '
      + 'поэтому мне изменили меру пресечения. Но я не '
      + 'убийца. Убийца — он.»',
    next: 'trial_witness_anton'
  },

  trial_witness_anton: {
    id: 'trial_witness_anton',
    ico: 'userCircle',
    color: '#5da9ff',
    title: 'Показания Антона Ветрова',
    sub: 'Свидетель',
    body:
      'Антон выходит к трибуне. Он волнуется.\n\n'
      + '«Я учился вместе с Кириллом Соколовым, братом '
      + 'Марины. Мы были друзьями. Я знал его два года до '
      + 'его смерти.»\n\n'
      + 'Он делает паузу.\n\n'
      + '«13 апреля я был на показе дипломного фильма '
      + 'Марины. Я видел, как она выходила через служебный '
      + 'вход с мужчиной в тёмном пальто. Я не знал его '
      + 'лично, но я запомнил его лицо. И голос. Потому что '
      + 'Марина мне после шёпотом сказала: „Это он. Это тот, '
      + 'кто убил Кирилла.“»\n\n'
      + 'Он смотрит на Виктора.\n\n'
      + '«Это он. Тот же самый мужчина.»',
    next: 'trial_audio'
  },

  trial_audio: {
    id: 'trial_audio',
    ico: 'mic',
    color: '#ff5a6e',
    title: 'Аудиозапись в суде',
    sub: 'Ключевое доказательство',
    body:
      'Судья делает знак. Секретарь включает аудиозапись.\n\n'
      + 'Голос Марины: «Виктор Павлович, вы... вы зачем '
      + 'привезли оригинал сюда?»\n\n'
      + 'Голос Виктора: «Чтобы никто не нашёл. Ни ты, ни они.»\n\n'
      + 'Марина: «Что вы... отпустите.»\n\n'
      + 'Виктор: «Ты не понимаешь, Марина. Я не хотел. '
      + 'Тогда, на трассе. Я не видел его. Он выскочил.»\n\n'
      + 'Марина: «Так это были вы. Всё это время.»\n\n'
      + 'Виктор: «Я уберу плёнку. И ты забудешь.»\n\n'
      + 'Марина: «Не подходите. Я записываю. Всё записывается.»\n\n'
      + 'Виктор: «Тогда придётся... убрать и телефон.»\n\n'
      + '[шум. удар. короткий вскрик.]\n\n'
      + '[тишина.]\n\n'
      + 'Секретарь выключает запись. В зале — полная тишина. '
      + 'Виктор Павлович опускает голову.',
    next: 'trial_last_word'
  },

  trial_last_word: {
    id: 'trial_last_word',
    ico: 'user',
    color: '#8b6dff',
    title: 'Последнее слово подсудимого',
    sub: 'Виктор Павлович',
    body:
      'Виктор Павлович встаёт. Он не смотрит ни на судью, '
      + 'ни на адвоката. Он смотрит в сторону зала — туда, '
      + 'где сидит мать Марины.\n\n'
      + '«Я не буду оправдываться. Мне нечего сказать '
      + 'в своё оправдание.»\n\n'
      + 'Он делает паузу.\n\n'
      + '«В 2019 году я действительно был за рулём. Я '
      + 'действительно сбил Кирилла. Это было случайно. '
      + 'Я не видел его. Он выскочил на дорогу.»\n\n'
      + 'Он сглатывает.\n\n'
      + '«Я испугался. Я уехал. Я не оказал помощь. Это '
      + 'самое страшное, что я сделал в жизни.»\n\n'
      + 'Он закрывает глаза.\n\n'
      + '«А когда Марина пришла с этим фильмом... я снова '
      + 'испугался. Я потерял голову. Я не хотел её убивать. '
      + 'Я хотел только забрать плёнку. Но она... она не '
      + 'хотела отдавать.»\n\n'
      + 'Он плачет.\n\n'
      + '«Я признаю вину. Я виновен в смерти Кирилла. '
      + 'И я виновен в смерти Марины. Дайте мне любое '
      + 'наказание. Я его приму.»',
    next: 'trial_verdict'
  },

  trial_verdict: {
    id: 'trial_verdict',
    ico: 'scale',
    color: '#3ddc97',
    title: 'Приговор',
    sub: '20 лет строгого режима',
    body:
      'Судья удаляется на совещание. Через два часа она '
      + 'возвращается.\n\n'
      + '«Именем Российской Федерации, суд постановил:\n\n'
      + 'Признать Соколовского Виктора Павловича виновным '
      + 'в совершении преступлений, предусмотренных:\n\n'
      + '— ч. 4 ст. 264 УК РФ (нарушение ПДД, повлёкшее '
      + 'по неосторожности смерть человека, совершённое '
      + 'в состоянии опьянения и сопряжённое с оставлением '
      + 'места происшествия) — 8 лет;\n\n'
      + '— ч. 1 ст. 105 УК РФ (убийство) — 12 лет;\n\n'
      + '— ч. 3 ст. 127 УК РФ (незаконное лишение свободы) — '
      + '3 года.\n\n'
      + 'По совокупности преступлений, путём частичного '
      + 'сложения наказаний, окончательно назначить наказание '
      + 'в виде лишения свободы сроком на 20 лет с отбыванием '
      + 'в исправительной колонии строгого режима.»\n\n'
      + 'Зал взрывается. Ольга кричит. Мать Марины плачет. '
      + 'Лена обнимает её. Виктор Павлович падает на скамью.',
    next: 'trial_end'
  },

  trial_end: {
    id: 'trial_end',
    ico: 'check',
    color: '#3ddc97',
    title: 'Конец суда',
    sub: 'Справедливость',
    body:
      'Виктора Павловича выводят из зала. Он больше не '
      + 'оглядывается.\n\n'
      + 'Ольга сидит неподвижно. Она не смотрит вслед мужу. '
      + 'Она смотрит на мать Марины. Долго. Потом отводит '
      + 'взгляд.\n\n'
      + 'Вадима тоже выводят — за соучастие он получил '
      + '5 лет условно и год исправительных работ.\n\n'
      + 'Лена и мать Марины выходят на улицу. На улице '
      + 'солнечно. Впервые за много месяцев.\n\n'
      + 'Лена держит мать за руку. Они идут к метро.\n\n'
      + 'Правда восторжествовала.',
    next: null
  }

};

G.trialStep = 0;
G.trialOrder = [
  'trial_opening',
  'trial_prosecutor',
  'trial_evidence',
  'trial_defense',
  'trial_witness_viktor',
  'trial_witness_vadim',
  'trial_witness_anton',
  'trial_audio',
  'trial_last_word',
  'trial_verdict',
  'trial_end'
];

ROUTES.trial = function(){
  G.screen = 'trial';
  G.trialStep = 0;
  showTrialScene();
};

function showTrialScene(){
  const id = G.trialOrder[G.trialStep];
  const sc = TRIAL_SCENES[id];
  if(!sc){
    go('epilogue');
    return;
  }

  const progress = Math.round(G.trialStep / G.trialOrder.length * 100);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="skipTrial()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Судебное заседание</h2>'
  +     '<div class="sub">Дело №2024-0414 · шаг ' + (G.trialStep + 1)
  +       + '/' + G.trialOrder.length + '</div>'
  +   '</div>'
  +   '<button class="back" onclick="trialHelp()">'
  +     svg('info', 18)
  +   '</button>'
  + '</div>'

  + '<div class="trial-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="trial-scene">'

  +   '<div class="ts-hero" style="border-color:' + sc.color + '">'
  +     '<div class="tsh-ico" style="color:' + sc.color + ';'
  +       + 'background:linear-gradient(140deg,'
  +       + sc.color + '22,' + sc.color + '08)">'
  +       svg(sc.ico, 34)
  +     '</div>'
  +     '<div class="tsh-title">' + escapeHtml(sc.title) + '</div>'
  +     '<div class="tsh-sub">' + escapeHtml(sc.sub) + '</div>'
  +   '</div>'

  +   '<div class="ts-body">' + formatNoteText(sc.body) + '</div>'

  +   '<div class="ts-nav">'
  +     (G.trialStep > 0
  +       ? '<button class="btn ghost" style="flex:1;justify-content:center" '
  +         'onclick="trialPrev()">'
  +         svg('back', 16) + ' Назад'
  +         '</button>'
  +       : '')
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="trialNext()">'
  +       (G.trialStep < G.trialOrder.length - 1
  +         ? 'Продолжить' + svg('fwd', 16)
  +         : 'К эпилогу' + svg('fwd', 16))
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(520 + G.trialStep * 20, 0.04);
  haptic(6);
}

function trialNext(){
  if(G.trialStep < G.trialOrder.length - 1){
    G.trialStep++;
    showTrialScene();
  } else {
    go('epilogue');
  }
}

function trialPrev(){
  if(G.trialStep > 0){
    G.trialStep--;
    showTrialScene();
  }
}

function skipTrial(){
  if(confirm('Пропустить судебный процесс?')){
    go('epilogue');
  }
}

function trialHelp(){
  /* ИСПРАВЛЕНО: возврат на текущую сцену суда,
     а не goBack() — так как help рисуется через render()
     без пуша в историю роутов */
  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="showTrialScene()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl"><h2>Судебное заседание</h2><div class="sub">Справка</div></div>'
  + '</div>'
  + '<div style="padding:24px 20px">'
  +   '<div class="help-block">'
  +     '<div class="hb-ico">' + svg('scale', 22) + '</div>'
  +     '<h3>Что это</h3>'
  +     '<p>Финальная сцена игры. Вы увидите все этапы '
  +       'судебного заседания: вступительное слово прокурора, '
  +       'предъявление улик, показания свидетелей, последнее '
  +       'слово подсудимого и приговор.</p>'
  +   '</div>'
  +   '<button class="btn ghost" style="width:100%;justify-content:center;margin-top:14px" '
  +     'onclick="showTrialScene()">Продолжить</button>'
  + '</div>');
}

/* ============================================================
   БЛОК 2 — ЭПИЛОГИ ПО ПЕРСОНАЖАМ
   ============================================================ */

const EPILOGUES = {

  ep_lena: {
    id: 'ep_lena',
    ico: 'heart',
    color: '#e05c7a',
    title: 'Елена Крылова',
    sub: 'Лучшая подруга',
    body:
      'Через месяц после суда Лена уехала из Москвы. Она '
      + 'перевелась в Санкт-Петербург, на другой факультет.\n\n'
      + 'Она больше не снимает фильмы. Вместо этого она '
      + 'работает в благотворительном фонде помощи жертвам '
      + 'насилия. Она консультирует семьи, потерявшие '
      + 'близких.\n\n'
      + 'Раз в год, 14 апреля, она приезжает в Москву. '
      + 'Кладёт цветы на могилу Марины и Кирилла. Потом '
      + 'идёт к матери Марины. Пьёт с ней чай. Молча.\n\n'
      + 'Она до сих пор не может слушать голос Марины '
      + 'на записи. Она сохранила её, но не слушает. '
      + 'Говорит: «Я и так помню её голос».'
  },

  ep_mama: {
    id: 'ep_mama',
    ico: 'user',
    color: '#ffb84d',
    title: 'Елена Андреевна Соколова',
    sub: 'Мама Марины',
    body:
      'Мать Марины получила папку «Кирилл» в день суда. '
      + 'Она открыла её только через три месяца.\n\n'
      + 'Она прочитала все заметки. Посмотрела все фото. '
      + 'Прослушала запись. Раз двадцать.\n\n'
      + 'Через год она переехала в дом, где когда-то жила '
      + 'с Кириллом и Мариной. В маленький городок, где '
      + 'их никто не знает.\n\n'
      + 'Она не убрала комнату Марины. Всё осталось так, '
      + 'как было: кровать, стол, компьютер, книги. '
      + 'Иногда она заходит туда и разговаривает с дочкой.\n\n'
      + 'Она прощает Марину. Она её понимает. И теперь '
      + 'она знает: её дочь не бросала её. Она просто '
      + 'не могла остановиться.'
  },

  ep_artem: {
    id: 'ep_artem',
    ico: 'user',
    color: '#ff8a5c',
    title: 'Артём Северов',
    sub: 'Жених Марины',
    body:
      'Артём не пришёл на похороны. Он не смог.\n\n'
      + 'Через три месяца после суда он уехал в Екатеринбург. '
      + 'Устроился в местную IT-компанию. Сменил номер '
      + 'телефона. Удалил все соцсети.\n\n'
      + 'Он никогда не женился. Каждое 14 апреля он берёт '
      + 'отпуск и уезжает куда-нибудь в горы. Один.\n\n'
      + 'В его квартире — единственная фотография на стене. '
      + 'Марина на съёмках своего фильма. Смеётся.\n\n'
      + 'Он до сих пор не знает, что именно она делала в '
      + 'тот вечер. Он никогда не спрашивал следователя. '
      + 'Он не хотел знать.'
  },

  ep_anton: {
    id: 'ep_anton',
    ico: 'user',
    color: '#5da9ff',
    title: 'Антон Ветров',
    sub: 'Свидетель',
    body:
      'После суда Антон задумался о профессии. Он бросил '
      + 'режиссуру и поступил на юридический.\n\n'
      + 'Он специализируется на делах о ДТП со смертельным '
      + 'исходом. Он помогает семьям добиваться справедливости. '
      + 'Уже выиграл несколько дел.\n\n'
      + 'Он назвал свою юридическую фирму «Соколов и партнёры». '
      + 'Не в честь Кирилла. В честь Марины.\n\n'
      + 'Он считает, что она бы хотела, чтобы кто-то '
      + 'продолжил её дело. И он его продолжает.'
  },

  ep_sonya: {
    id: 'ep_sonya',
    ico: 'user',
    color: '#3ddc97',
    title: 'Софья Мельник',
    sub: 'Соседка',
    body:
      'Соня получила квартиру Марины по завещанию. Она '
      + 'переехала туда через год.\n\n'
      + 'В комнате Марины она всё оставила как было. '
      + 'Только поставила на полку маленькую фотографию — '
      + 'их общее фото с выпускного.\n\n'
      + 'Она выучилась на врача. Работает в детской больнице.\n\n'
      + 'Каждое 14 апреля она приходит на могилу Марины. '
      + 'Приносит цветы. И оставляет письма — простые '
      + 'записки о своей жизни. Как будто Марина всё '
      + 'ещё может их прочесть.'
  },

  ep_olga: {
    id: 'ep_olga',
    ico: 'user',
    color: '#c8d1e2',
    title: 'Ольга Соколовская',
    sub: 'Жена Виктора',
    body:
      'Ольга развелась с мужем через месяц после суда. '
      + 'Развод был оформлен заочно — Виктор был уже '
      + 'в колонии.\n\n'
      + 'Она уволилась из фонда и уехала за границу. '
      + 'Купила маленький дом в Португалии. Разводит '
      + 'цветы. Не общается с журналистами.\n\n'
      + 'Она не оправдывает мужа. Она не пишет ему письма. '
      + 'Она вообще о нём не говорит.\n\n'
      + 'Единственное, что она сказала после суда одной '
      + 'журналистке — фразу, которая потом разошлась по '
      + 'всем СМИ:\n\n'
      + '«Я жила с ним двадцать лет. И я всегда знала, '
      + 'что он что-то скрывает. Я думала — это что-то '
      + 'про деньги или бизнес. Оказалось — про жизнь.»'
  },

  ep_vadim: {
    id: 'ep_vadim',
    ico: 'user',
    color: '#ff5a6e',
    title: 'Вадим Соколовский',
    sub: 'Сын Виктора',
    body:
      'Вадим получил 5 лет условно и год исправительных '
      + 'работ. Он остался на свободе — благодаря '
      + 'сотрудничеству со следствием и признанию.\n\n'
      + 'Он уволился из фирмы отца. Уехал в другой город. '
      + 'Работает юристом в маленькой фирме, не связанной '
      + 'с кино или продюсированием.\n\n'
      + 'Он никогда не женился. Он боится, что в нём '
      + 'есть то же, что было в отце.\n\n'
      + 'Раз в год он посылает матери Марины анонимный '
      + 'перевод — небольшую сумму денег. И всегда — '
      + 'без обратного адреса. Он не считает, что это '
      + 'её вернёт. Но не может иначе.'
  },

  ep_krylov: {
    id: 'ep_krylov',
    ico: 'user',
    color: '#c8d1e2',
    title: 'Андрей Крылов',
    sub: 'Продюсер',
    body:
      'Против Крылова тоже возбудили дело — о соучастии '
      + 'в сокрытии преступления. Но ему удалось избежать '
      + 'тюрьмы: хорошие адвокаты, влиятельные связи.\n\n'
      + 'Он заплатил огромный штраф. И — что важнее — '
      + 'потерял все свои проекты. Его компания обанкротилась. '
      + 'Киноателье «Сокол» было продано с молотка.\n\n'
      + 'Он уехал из России. Живёт в Дубае. Никогда '
      + 'больше не занимается кино.\n\n'
      + 'Он не признал вину. Но всем, кто его знал, '
      + 'ясно: он виновен не меньше Виктора. Просто '
      + 'его вина не доказуема.'
  },

  ep_viktor: {
    id: 'ep_viktor',
    ico: 'user',
    color: '#8b6dff',
    title: 'Виктор Павлович Соколовский',
    sub: 'Обвиняемый',
    body:
      'Виктор Павлович отбывает наказание в колонии '
      + 'строгого режима в Мордовии.\n\n'
      + 'В первые месяцы он пытался покончить с собой. '
      + 'Спасли. Теперь он работает в мастерской и читает '
      + 'книги. Много книг.\n\n'
      + 'Он не пишет писем. Ни жене, ни сыну, ни матери '
      + 'Марины. Только одно письмо он отправил в первый '
      + 'месяц — следователю, который вёл дело:\n\n'
      + '«Спасибо, что вы меня нашли. Я не мог жить '
      + 'с этим сам. Пусть это не оправдание, но так '
      + 'легче.»\n\n'
      + 'Он будет освобождён только через 20 лет. '
      + 'Ему будет 74 года.'
  }

};

G.epilogueIndex = 0;
G.epilogueOrder = [
  'ep_lena', 'ep_mama', 'ep_artem', 'ep_anton',
  'ep_sonya', 'ep_olga', 'ep_vadim', 'ep_krylov', 'ep_viktor'
];

ROUTES.epilogue = function(){
  G.screen = 'epilogue';
  G.epilogueIndex = 0;
  showEpilogue();
};

function showEpilogue(){
  const id = G.epilogueOrder[G.epilogueIndex];
  const ep = EPILOGUES[id];
  if(!ep){
    go('credits');
    return;
  }

  const progress = Math.round(G.epilogueIndex / G.epilogueOrder.length * 100);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="skipEpilogue()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Эпилог</h2>'
  +     '<div class="sub">' + (G.epilogueIndex + 1)
  +       + ' из ' + G.epilogueOrder.length + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="trial-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="epilogue-view">'

  +   '<div class="ep-hero">'
  +     '<div class="eph-ico" style="color:' + ep.color + ';'
  +       + 'background:linear-gradient(140deg,'
  +       + ep.color + '22,' + ep.color + '08)">'
  +       svg(ep.ico, 36)
  +     '</div>'
  +     '<div class="eph-title">' + escapeHtml(ep.title) + '</div>'
  +     '<div class="eph-sub">' + escapeHtml(ep.sub) + '</div>'
  +   '</div>'

  +   '<div class="ep-body">' + formatNoteText(ep.body) + '</div>'

  +   '<div class="ep-nav">'
  +     (G.epilogueIndex > 0
  +       ? '<button class="btn ghost" style="flex:1;justify-content:center" '
  +         'onclick="epiloguePrev()">'
  +         svg('back', 16) + ' Назад'
  +         '</button>'
  +       : '')
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="epilogueNext()">'
  +       (G.epilogueIndex < G.epilogueOrder.length - 1
  +         ? 'Продолжить' + svg('fwd', 16)
  +         : 'К титрам' + svg('fwd', 16))
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(480 + G.epilogueIndex * 20, 0.04);
  haptic(6);
}

function epilogueNext(){
  if(G.epilogueIndex < G.epilogueOrder.length - 1){
    G.epilogueIndex++;
    showEpilogue();
  } else {
    go('credits');
  }
}

function epiloguePrev(){
  if(G.epilogueIndex > 0){
    G.epilogueIndex--;
    showEpilogue();
  }
}

function skipEpilogue(){
  if(confirm('Пропустить эпилоги?')){
    go('credits');
  }
}

/* ============================================================
   БЛОК 3 — ТИТРЫ
   ============================================================ */

const CREDITS_SECTIONS = [
  {
    title: 'Дело №2024-0414',
    sub: 'Последний сеанс',
    items: [
      {role: '', name: 'Интерактивный детектив'},
      {role: '', name: 'В 10 частях'}
    ]
  },
  {
    title: 'Сюжет',
    sub: 'Идея и сценарий',
    items: [
      {role: 'Автор', name: 'Расследование Марины Соколовой'},
      {role: 'Хронология', name: '14 сентября 2019 — 15 октября 2024'}
    ]
  },
  {
    title: 'Персонажи',
    sub: 'Действующие лица',
    items: [
      {role: '', name: 'Марина Соколова (жертва)'},
      {role: '', name: 'Кирилл Соколов (погибший брат)'},
      {role: '', name: 'Виктор Соколовский (обвиняемый)'},
      {role: '', name: 'Ольга Соколовская (жена)'},
      {role: '', name: 'Вадим Соколовский (сын)'},
      {role: '', name: 'Андрей Крылов (продюсер)'},
      {role: '', name: 'Елена Крылова (подруга)'},
      {role: '', name: 'Артём Северов (жених)'},
      {role: '', name: 'Дмитрий Лапин (бывший)'},
      {role: '', name: 'Антон Ветров (свидетель)'},
      {role: '', name: 'Софья Мельник (соседка)'},
      {role: '', name: 'Елена Андреевна (мама)'},
      {role: '', name: 'Юлия Соколова (невестка)'}
    ]
  },
  {
    title: 'Приложения',
    sub: 'Игровые механики',
    items: [
      {role: '', name: 'Сообщения · 18 диалогов'},
      {role: '', name: 'Галерея · 20 фотографий'},
      {role: '', name: 'Заметки · 15 записей'},
      {role: '', name: 'Браузер · 12 запросов'},
      {role: '', name: 'Звонки · 20 вызовов'},
      {role: '', name: 'Доска улик · 42 карточки'},
      {role: '', name: 'Хронология · 30 событий'},
      {role: '', name: 'Допросы · 7 подозреваемых'},
      {role: '', name: 'Медиатека · 12 видео · 10 аудио'},
      {role: '', name: 'Почта · 14 писем'},
      {role: '', name: 'Карта · 12 локаций'},
      {role: '', name: 'Профайлер · 8 профилей'},
      {role: '', name: 'Экспертиза · 6 анализов'},
      {role: '', name: 'Детектор лжи · 8 вопросов'}
    ]
  },
  {
    title: 'Улики',
    sub: 'Собрано в деле',
    items: [
      {role: '', name: 'Аудиозапись признания'},
      {role: '', name: 'Видео регистратора'},
      {role: '', name: 'Показания Антона Ветрова'},
      {role: '', name: 'Переписка Марины и Виктора'},
      {role: '', name: 'Криминалистическая экспертиза'},
      {role: '', name: 'Показания Ольги Соколовской'},
      {role: '', name: 'Показания Вадима Соколовского'},
      {role: '', name: 'Записи с камер киноателье'}
    ]
  },
  {
    title: 'Достижения',
    sub: 'Открыто в этой игре',
    items: [
      {role: 'Собрано улик', name: 'G.evidence'},
      {role: 'Прочитано заметок', name: 'G.notesRead'},
      {role: 'Просмотрено фото', name: 'G.photosViewed'},
      {role: 'Пройдено допросов', name: 'intDone'},
      {role: 'Достижений', name: 'achCount'},
      {role: 'Открыто концовок', name: 'endCount'}
    ]
  },
  {
    title: 'Финальный вердикт',
    sub: 'Справедливость',
    items: [
      {role: '', name: 'Виктор Соколовский'},
      {role: '', name: 'Признан виновным'},
      {role: '', name: '20 лет строгого режима'}
    ]
  },
  {
    title: 'Спасибо за игру',
    sub: 'Дело закрыто',
    items: [
      {role: '', name: 'Марина Соколова'},
      {role: '', name: '1999 — 2024'},
      {role: '', name: 'Правда восторжествовала'}
    ]
  }
];

/* Полный список всех 6 флагов концовок (для подсчёта) */
const ALL_ENDING_FLAGS = [
  'finale_perfect',
  'finale_good',
  'finale_neutral',
  'finale_bad',
  'finale_cynic',
  'finale_incomplete'
];

G.creditsIndex = 0;

ROUTES.credits = function(){
  G.screen = 'credits';
  G.creditsIndex = 0;

  /* ИСПРАВЛЕНО: очищаем возможный старый интервал перед запуском нового,
     чтобы при повторном входе на экран титров не было нескольких таймеров */
  if(G._creditsTimer){
    clearInterval(G._creditsTimer);
    G._creditsTimer = null;
  }

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="skipCredits()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Титры</h2>'
  +     '<div class="sub">Нажмите, чтобы ускорить</div>'
  +   '</div>'
  + '</div>'

  + '<div class="credits-view" onclick="creditsAdvance()">'
  +   renderCreditsSection(CREDITS_SECTIONS[0])
  + '</div>');

  G._creditsTimer = setInterval(function(){
    creditsAdvance();
  }, 4500);
};

function renderCreditsSection(sc){
  if(!sc) return '';
  const items = sc.items.map(function(it){
    let name = it.name;
    if(name === 'G.evidence') name = G.evidence.length + '';
    if(name === 'G.notesRead') name = G.notesRead + '';
    if(name === 'G.photosViewed') name = G.photosViewed + '';
    if(name === 'intDone'){
      const n = Object.keys(G.flags).filter(function(k){
        return k.startsWith('interrogation_') && k.endsWith('_done');
      }).length;
      const total = Object.keys(INTERROGATIONS).length;
      name = n + '/' + total;
    }
    if(name === 'achCount'){
      name = Object.keys(G.achievements || {}).length + '/'
        + Object.keys(ACHIEVEMENTS).length;
    }
    /* ИСПРАВЛЕНО: учитываем все 6 концовок */
    if(name === 'endCount'){
      const n = ALL_ENDING_FLAGS.filter(function(e){
        return G.flags[e];
      }).length;
      name = n + '/' + ALL_ENDING_FLAGS.length;
    }
    return ''
    + '<div class="cr-item">'
    +   (it.role ? '<span class="cri-role">' + escapeHtml(it.role) + '</span>' : '')
    +   '<span class="cri-name">' + escapeHtml(name) + '</span>'
    + '</div>';
  }).join('');

  return ''
  + '<div class="credits-section">'
  +   '<div class="cs-title">' + escapeHtml(sc.title) + '</div>'
  +   '<div class="cs-sub">' + escapeHtml(sc.sub) + '</div>'
  +   '<div class="cs-items">' + items + '</div>'
  + '</div>';
}

function creditsAdvance(){
  /* ИСПРАВЛЕНО: если пользователь покинул экран титров —
     останавливаем таймер, чтобы не перезаписывать чужой экран */
  if(G.screen !== 'credits'){
    if(G._creditsTimer){
      clearInterval(G._creditsTimer);
      G._creditsTimer = null;
    }
    return;
  }

  G.creditsIndex++;
  if(G.creditsIndex >= CREDITS_SECTIONS.length){
    if(G._creditsTimer){
      clearInterval(G._creditsTimer);
      G._creditsTimer = null;
    }
    showEndScreen();
    return;
  }
  const el = document.querySelector('.credits-view');
  if(el){
    el.innerHTML = renderCreditsSection(CREDITS_SECTIONS[G.creditsIndex]);
    el.classList.remove('fade');
    void el.offsetWidth;
    el.classList.add('fade');
  }
}

function skipCredits(){
  if(G._creditsTimer){
    clearInterval(G._creditsTimer);
    G._creditsTimer = null;
  }
  if(confirm('Пропустить титры?')){
    showEndScreen();
  }
}

/* ============================================================
   БЛОК 4 — ФИНАЛЬНЫЙ ЭКРАН
   ============================================================ */

function showEndScreen(){
  if(G._creditsTimer){
    clearInterval(G._creditsTimer);
    G._creditsTimer = null;
  }
  setFlag('game_completed');

  const achCount = Object.keys(G.achievements || {}).length;
  const totalAch = Object.keys(ACHIEVEMENTS).length;

  /* ИСПРАВЛЕНО: учитываем все 6 концовок */
  const endCount = ALL_ENDING_FLAGS.filter(function(e){
    return G.flags[e];
  }).length;
  const totalEnd = ALL_ENDING_FLAGS.length;

  const pct = Math.round(G.evidence.length /
    Math.max(1, Object.keys(EVIDENCE_DB).length) * 100);

  render(''
  + '<div class="end-screen">'

  +   '<div class="es-hero">'
  +     '<div class="es-ring">'
  +       svg('starFill', 56)
  +     '</div>'
  +     '<div class="es-completed">ИГРА ЗАВЕРШЕНА</div>'
  +     '<h1>Дело №2024-0414</h1>'
  +     '<div class="es-sub">«Последний сеанс»</div>'
  +   '</div>'

  +   '<div class="es-quote">'
  +     '<div class="esq-mark">«</div>'
  +     '<div class="esq-text">'
  +       'Правда — это единственное, что нельзя отнять у человека. '
  +       'Даже если его больше нет.'
  +     '</div>'
  +     '<div class="esq-author">— Марина Соколова</div>'
  +   '</div>'

  +   '<div class="es-stats">'
  +     '<div class="es-stat">'
  +       '<div class="ess-num">' + G.evidence.length + '</div>'
  +       '<div class="ess-label">улик</div>'
  +     '</div>'
  +     '<div class="es-stat">'
  +       '<div class="ess-num">' + pct + '%</div>'
  +       '<div class="ess-label">прогресс</div>'
  +     '</div>'
  +     '<div class="es-stat">'
  +       '<div class="ess-num">' + achCount + '/' + totalAch + '</div>'
  +       '<div class="ess-label">ачивок</div>'
  +     '</div>'
  +     '<div class="es-stat">'
  +       '<div class="ess-num">' + endCount + '/' + totalEnd + '</div>'
  +       '<div class="ess-label">концовок</div>'
  +     '</div>'
  +   '</div>'

  +   '<div class="es-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="go(\'summary\')">'
  +       svg('fileText', 16) + ' Сводка'
  +     '</button>'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="go(\'achievements\')">'
  +       svg('star', 16) + ' Достижения'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="go(\'postcredits\')">'
  +       svg('play', 16) + ' Пост-кредит'
  +     '</button>'
  +   '</div>'

  +   '<div class="es-footer">'
  +     '<div>Спасибо, что дошли до конца.</div>'
  +     '<div style="opacity:.6;margin-top:8px">'
  +       'Пост-кредитная сцена ждёт вас.'
  +     '</div>'
  +   '</div>'

  + '</div>');

  beep(660, 0.2);
  setTimeout(function(){ beep(880, 0.2); }, 250);
  setTimeout(function(){ beep(1100, 0.4); }, 500);
}

/* ============================================================
   БЛОК 5 — ПОСТ-КРЕДИТНЫЕ СЦЕНЫ
   ============================================================ */

const POSTCREDITS = [

  {
    id: 'pc1',
    ico: 'home',
    color: '#5da9ff',
    title: 'Через год · 14 апреля 2025',
    body:
      'Кладбище на окраине Москвы. Раннее утро.\n\n'
      + 'У двух могил — рядом — стоят три женщины. '
      + 'Лена, мать Марины и Соня. Они молчат. '
      + 'Просто стоят.\n\n'
      + 'На могиле Марины — свежие цветы. Кто-то уже '
      + 'побывал здесь до них. Кто-то оставил маленькую '
      + 'фотографию — Кирилл и Марина, дети, смеются.\n\n'
      + 'Лена берёт фотографию. Долго смотрит. Потом '
      + 'кладёт обратно и зажигает свечу.'
  },

  {
    id: 'pc2',
    ico: 'fileText',
    color: '#ffb84d',
    title: 'Спустя два года · 2026',
    body:
      'Следователь, который вёл дело №2024-0414, получил '
      + 'премию «За верность профессии».\n\n'
      + 'На вручении он сказал:\n\n'
      + '«Это не моя заслуга. Это заслуга девушки, '
      + 'которая не побоялась пойти против всех. '
      + 'Марины Соколовой. Я просто довёл до конца '
      + 'то, что она начала.»\n\n'
      + 'Он передал премию матери Марины. Она долго '
      + 'не соглашалась брать. Но потом взяла. И '
      + 'заплакала.'
  },

  {
    id: 'pc3',
    ico: 'film',
    color: '#8b6dff',
    title: 'Спустя три года · 2027',
    body:
      'Фильм Марины Соколовой «Последний сеанс» всё '
      + 'же вышел в прокат. Через три года после её '
      + 'смерти.\n\n'
      + 'Его смонтировал режиссёр, который раньше работал '
      + 'с Крыловым. Он согласился сделать это бесплатно.\n\n'
      + 'Премьера состоялась в том же кинотеатре «Родина», '
      + 'в том же зале №2. Первый ряд — тот же, что '
      + 'был в ту ночь — оставлен пустым. На каждом '
      + 'кресле — белая роза.\n\n'
      + 'Фильм получил приз «За правду в кино». Награду '
      + 'получила мать Марины.'
  },

  {
    id: 'pc4',
    ico: 'user',
    color: '#3ddc97',
    title: 'Неизвестный отправитель',
    body:
      'Никто так и не узнал, кто передал Марине '
      + 'запись с регистратора.\n\n'
      + 'В деле есть только одно предположение: '
      + 'возможно, это был очевидец ДТП 2019 года. '
      + 'Человек, который ехал за машиной Кирилла.\n\n'
      + 'Он четыре года хранил запись. Он видел, '
      + 'как погиб парень. И не остановился помочь.\n\n'
      + 'Четыре года он молчал. А потом решил — '
      + 'лучше поздно, чем никогда.\n\n'
      + 'Его личность остаётся неизвестной. Но '
      + 'благодаря ему Марина смогла начать расследование.'
  },

  {
    id: 'pc5',
    ico: 'book',
    color: '#c8d1e2',
    title: 'Письмо матери',
    body:
      'Это письмо нашли в вещах Марины уже после суда. '
      + 'Оно было спрятано в книге «Мастер и Маргарита». '
      + 'Той самой, где лежала флешка.\n\n'
      + '«Мама,\n\n'
      + 'Если ты это читаешь — значит, я не успела '
      + 'тебе сказать это лично.\n\n'
      + 'Прости меня. За то, что я не была рядом. '
      + 'За то, что ушла в свою работу. За то, что '
      + 'не приехала на выходные. За то, что не '
      + 'позвонила в тот последний вечер.\n\n'
      + 'Я знаю, как ты меня любила. И как ты '
      + 'боялась за меня.\n\n'
      + 'Но я не могла по-другому. Я должна была '
      + 'это сделать. Для Кирилла. Для всех, кто '
      + 'не дождался правды.\n\n'
      + 'Я не боялась умереть. Я боялась, что '
      + 'правда умрёт вместе со мной.\n\n'
      + 'Она не умрёт. Я позаботилась.\n\n'
      + 'Твоя Марина.»\n\n'
      + '[письмо хранится в материалах дела]'
  },

  {
    id: 'pc6',
    ico: 'starFill',
    color: '#ff5a6e',
    title: 'Последний кадр',
    body:
      'На флешке, помимо записи признания, был ещё '
      + 'один файл. Никто не заметил его до конца суда.\n\n'
      + 'Это было видео. Короткое. 15 секунд.\n\n'
      + 'Марина сидит в студии. Ночь. За её спиной — '
      + 'окно, в окне — городские огни.\n\n'
      + 'Она смотрит в камеру. Улыбается — устало, '
      + 'но искренне.\n\n'
      + 'Говорит:\n\n'
      + '«Кир, если ты меня слышишь...\n'
      + 'Я всё сделала. Я нашла его. Я не бросила.\n'
      + 'Прости, что так долго.\n'
      + 'Увидимся.»\n\n'
      + 'Видео обрывается. Она выключает камеру.\n\n'
      + 'Это — последний кадр, снятый Мариной '
      + 'Соколовой в её жизни.'
  }

];

G.pcIndex = 0;

ROUTES.postcredits = function(){
  G.screen = 'postcredits';
  G.pcIndex = 0;
  showPostCredit();
};

function showPostCredit(){
  const pc = POSTCREDITS[G.pcIndex];
  if(!pc){
    showFinalFinale();
    return;
  }

  const progress = Math.round(G.pcIndex / POSTCREDITS.length * 100);

  render(''
  + '<div class="appbar">'
  +   '<button class="back" onclick="skipPC()">' + svg('back', 18) + '</button>'
  +   '<div class="ttl">'
  +     '<h2>Пост-кредитная сцена</h2>'
  +     '<div class="sub">' + (G.pcIndex + 1)
  +       + ' из ' + POSTCREDITS.length + '</div>'
  +   '</div>'
  + '</div>'

  + '<div class="trial-progress">'
  +   '<div class="pbar"><i style="width:' + progress + '%"></i></div>'
  + '</div>'

  + '<div class="pc-view">'

  +   '<div class="pc-hero">'
  +     '<div class="pch-ico" style="color:' + pc.color + ';'
  +       + 'background:linear-gradient(140deg,'
  +       + pc.color + '22,' + pc.color + '08)">'
  +       svg(pc.ico, 36)
  +     '</div>'
  +     '<div class="pch-title">' + escapeHtml(pc.title) + '</div>'
  +   '</div>'

  +   '<div class="pc-body">' + formatNoteText(pc.body) + '</div>'

  +   '<div class="pc-nav">'
  +     '<button class="btn" style="width:100%;justify-content:center" '
  +       'onclick="pcNext()">'
  +       (G.pcIndex < POSTCREDITS.length - 1
  +         ? 'Продолжить' + svg('fwd', 16)
  +         : 'Завершить' + svg('check', 16))
  +     '</button>'
  +   '</div>'

  + '</div>');

  beep(440 + G.pcIndex * 30, 0.05);
  haptic(6);
}

function pcNext(){
  if(G.pcIndex < POSTCREDITS.length - 1){
    G.pcIndex++;
    showPostCredit();
  } else {
    showFinalFinale();
  }
}

function skipPC(){
  if(confirm('Пропустить пост-кредит?')){
    showFinalFinale();
  }
}

/* ============================================================
   БЛОК 6 — ФИНАЛЬНЫЙ ЭКРАН (ПРОДОЛЖЕНИЕ СЛЕДУЕТ?)
   ============================================================ */

function showFinalFinale(){
  render(''
  + '<div class="final-finale">'

  +   '<div class="ff-hero">'
  +     '<div class="ff-ring">'
  +       svg('scale', 52)
  +     '</div>'
  +     '<div class="ff-label">ДЕЛО ЗАКРЫТО</div>'
  +     '<div class="ff-title">Продолжение следует?</div>'
  +   '</div>'

  +   '<div class="ff-text">'
  +     'Возможно, история ещё не закончена.\n\n'
  +     'В папке «Кирилл» остались файлы, которые вы не открыли. '
  +     'В заметках — записи, которые вы не прочли. '
  +     'В хронологии — события, которые вы не заметили.\n\n'
  +     'Если хотите — начните заново. Возможно, во второй раз '
  +     'вы найдёте что-то новое.'
  +   '</div>'

  +   '<div class="ff-stats">'
  +     '<div class="ff-stat">'
  +       '<b>' + G.evidence.length + '</b>'
  +       '<span>улик</span>'
  +     '</div>'
  +     '<div class="ff-stat">'
  +       '<b>' + Object.keys(G.achievements || {}).length + '</b>'
  +       '<span>ачивок</span>'
  +     '</div>'
  +     '<div class="ff-stat">'
  +       '<b>' + Math.floor((G._playTime || 0) / 60) + '</b>'
  +       '<span>минут</span>'
  +     '</div>'
  +   '</div>'

  +   '<div class="ff-actions">'
  +     '<button class="btn ghost" style="flex:1;justify-content:center" '
  +       'onclick="go(\'home\')">'
  +       svg('home', 16) + ' На главный'
  +     '</button>'
  +     '<button class="btn" style="flex:1;justify-content:center" '
  +       'onclick="finalRestart()">'
  +       svg('refresh', 16) + ' Заново'
  +     '</button>'
  +   '</div>'

  +   '<div class="ff-credits">'
  +     'Спасибо, что прошли этот путь.\n'
  +     'Помните о Марине Соколовой.\n'
  +     'Она не боялась правды.'
  +   '</div>'

  + '</div>');

  beep(660, 0.3);
  setTimeout(function(){ beep(880, 0.3); }, 300);
  setTimeout(function(){ beep(1100, 0.5); }, 600);
  setTimeout(function(){ beep(1320, 0.6); }, 900);
}

function finalRestart(){
  if(confirm('Начать игру заново? Весь прогресс будет утерян.')){
    wipeSave();
    try{ localStorage.removeItem(SAVE_SLOTS_KEY); } catch(e){}
    location.reload();
  }
}

/* ============================================================
   БЛОК 7 — РЕГИСТРАЦИЯ ФИНАЛЬНЫХ РОУТОВ
   ============================================================ */

(function patchOpenAppPart10(){
  if(typeof window.openApp !== 'function') return;
  const prev = window.openApp;
  window.openApp = function(id){
    if(id === 'trial') return go('trial');
    if(id === 'epilogue') return go('epilogue');
    if(id === 'credits') return go('credits');
    if(id === 'postcredits') return go('postcredits');
    return prev(id);
  };
})();

/* ============================================================
   БЛОК 8 — РАСШИРЕНИЕ СЛОВАРЯ УЛИК
   ============================================================ */
(function extendTitlesPart10(){
  const extra = {
    game_completed: 'Дело закрыто'
  };
  if(typeof EVIDENCE_TITLES !== 'undefined'){
    for(const k in extra){
      EVIDENCE_TITLES[k] = extra[k];
    }
  }
})();

/* ============================================================
   БЛОК 9 — CSS ДЛЯ ЧАСТИ 10
   ============================================================ */
(function injectPart10Styles(){
  const style = document.createElement('style');
  style.textContent = ''

  + '.trial-progress{padding:12px 16px 6px}'
  + '.trial-scene{padding:18px 18px 40px}'
  + '.ts-hero{'
  +   'text-align:center;padding:22px 18px;'
  +   'background:var(--panel2);'
  +   'border:1px solid var(--line);'
  +   'border-left-width:4px;'
  +   'border-radius:14px;'
  +   'margin-bottom:20px;'
  + '}'
  + '.tsh-ico{'
  +   'width:76px;height:76px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1.5px solid rgba(255,255,255,.08);'
  + '}'
  + '.tsh-title{'
  +   'font-size:18px;font-weight:600;'
  +   'line-height:1.35;margin-bottom:6px;'
  + '}'
  + '.tsh-sub{'
  +   'font-size:12px;color:var(--dim);letter-spacing:.5px;'
  + '}'
  + '.ts-body{'
  +   'font-size:14px;color:var(--txt2);line-height:1.8;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:20px 22px;'
  +   'margin-bottom:22px;'
  +   'white-space:pre-wrap;'
  + '}'
  + '.ts-nav{display:flex;gap:10px}'

  + '.epilogue-view{padding:18px 18px 40px}'
  + '.ep-hero{'
  +   'text-align:center;padding:22px 18px 16px;'
  +   'margin-bottom:18px;'
  + '}'
  + '.eph-ico{'
  +   'width:78px;height:78px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1.5px solid rgba(255,255,255,.08);'
  + '}'
  + '.eph-title{'
  +   'font-size:19px;font-weight:600;'
  +   'line-height:1.3;margin-bottom:6px;'
  + '}'
  + '.eph-sub{'
  +   'font-size:12.5px;color:var(--dim);letter-spacing:.4px;'
  + '}'
  + '.ep-body{'
  +   'font-size:14px;color:var(--txt2);line-height:1.8;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:22px 22px;'
  +   'margin-bottom:22px;'
  +   'white-space:pre-wrap;'
  +   'font-style:normal;'
  + '}'
  + '.ep-nav{display:flex;gap:10px}'

  + '.credits-view{'
  +   'min-height:100%;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'padding:40px 24px;'
  +   'cursor:pointer;'
  + '}'
  + '.credits-section{'
  +   'text-align:center;'
  +   'max-width:340px;'
  +   'animation:creditsFade .8s ease-out;'
  + '}'
  + '@keyframes creditsFade{'
  +   'from{opacity:0;transform:translateY(20px)}'
  +   'to{opacity:1;transform:none}'
  + '}'
  + '.cs-title{'
  +   'font-size:24px;font-weight:200;'
  +   'letter-spacing:3px;color:var(--acc);'
  +   'margin-bottom:8px;'
  +   'text-transform:uppercase;'
  + '}'
  + '.cs-sub{'
  +   'font-size:12.5px;color:var(--dim);'
  +   'letter-spacing:1px;font-style:italic;'
  +   'margin-bottom:26px;'
  + '}'
  + '.cs-items{'
  +   'display:flex;flex-direction:column;gap:14px;'
  + '}'
  + '.cr-item{'
  +   'display:flex;flex-direction:column;gap:2px;'
  + '}'
  + '.cri-role{'
  +   'font-size:10.5px;color:var(--dim);'
  +   'letter-spacing:1.5px;text-transform:uppercase;'
  + '}'
  + '.cri-name{'
  +   'font-size:14.5px;color:var(--txt);'
  +   'line-height:1.4;'
  + '}'

  + '.end-screen{'
  +   'min-height:100%;'
  +   'display:flex;flex-direction:column;'
  +   'padding:44px 24px 32px;'
  +   'text-align:center;'
  + '}'
  + '.es-hero{margin-bottom:26px}'
  + '.es-ring{'
  +   'width:110px;height:110px;border-radius:50%;'
  +   'margin:0 auto 18px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(61,220,151,.2) 0%, '
  +   'rgba(61,220,151,.05) 60%, transparent 100%);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--ok);'
  +   'border:2px solid rgba(61,220,151,.4);'
  +   'box-shadow:0 0 70px rgba(61,220,151,.35);'
  +   'animation:esPulse 3s infinite;'
  + '}'
  + '@keyframes esPulse{'
  +   '0%,100%{box-shadow:0 0 70px rgba(61,220,151,.35)}'
  +   '50%{box-shadow:0 0 100px rgba(61,220,151,.55)}'
  + '}'
  + '.es-completed{'
  +   'font-size:11px;color:var(--ok);'
  +   'letter-spacing:4px;font-weight:700;'
  +   'margin-bottom:8px;'
  + '}'
  + '.end-screen h1{'
  +   'font-size:24px;font-weight:200;'
  +   'letter-spacing:2px;margin-bottom:4px;'
  + '}'
  + '.es-sub{'
  +   'font-size:13px;color:var(--acc);'
  +   'letter-spacing:1px;font-style:italic;'
  + '}'
  + '.es-quote{'
  +   'padding:20px 22px;'
  +   'background:var(--panel2);'
  +   'border-left:3px solid var(--ok);'
  +   'border-radius:10px;'
  +   'text-align:left;'
  +   'margin-bottom:24px;'
  + '}'
  + '.esq-mark{'
  +   'font-size:38px;color:var(--ok);'
  +   'line-height:.5;margin-bottom:8px;'
  +   'font-family:Georgia,serif;'
  + '}'
  + '.esq-text{'
  +   'font-size:13px;color:var(--txt);'
  +   'font-style:italic;line-height:1.65;'
  +   'margin-bottom:8px;'
  + '}'
  + '.esq-author{'
  +   'font-size:11px;color:var(--dim);'
  +   'letter-spacing:.5px;'
  + '}'
  + '.es-stats{'
  +   'display:grid;grid-template-columns:1fr 1fr;'
  +   'gap:10px;margin-bottom:24px;'
  + '}'
  + '.es-stat{'
  +   'padding:12px 14px;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;'
  +   'display:flex;flex-direction:column;gap:3px;'
  + '}'
  + '.ess-num{'
  +   'font-size:20px;font-weight:600;color:var(--acc);'
  + '}'
  + '.ess-label{'
  +   'font-size:10.5px;color:var(--dim);'
  +   'letter-spacing:.4px;'
  + '}'
  + '.es-actions{'
  +   'display:flex;gap:10px;margin-bottom:22px;'
  +   'flex-wrap:wrap;'
  + '}'
  + '.es-actions .btn{'
  +   'min-width:0;font-size:12px;padding:11px 14px;'
  + '}'
  + '.es-footer{'
  +   'font-size:11.5px;color:var(--dim2);'
  +   'line-height:1.7;margin-top:auto;'
  + '}'

  + '.pc-view{padding:20px 18px 40px}'
  + '.pc-hero{'
  +   'text-align:center;margin-bottom:22px;'
  + '}'
  + '.pch-ico{'
  +   'width:78px;height:78px;border-radius:50%;'
  +   'margin:0 auto 14px;'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'border:1.5px solid rgba(255,255,255,.08);'
  + '}'
  + '.pch-title{'
  +   'font-size:17px;font-weight:600;'
  +   'line-height:1.35;color:var(--txt);'
  +   'max-width:300px;margin:0 auto;'
  + '}'
  + '.pc-body{'
  +   'font-size:14px;color:var(--txt2);line-height:1.8;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:22px 22px;'
  +   'margin-bottom:22px;'
  +   'white-space:pre-wrap;'
  +   'font-style:normal;'
  + '}'
  + '.pc-nav{display:flex}'

  + '.final-finale{'
  +   'min-height:100%;'
  +   'display:flex;flex-direction:column;'
  +   'padding:44px 24px 32px;'
  +   'text-align:center;'
  + '}'
  + '.ff-hero{margin-bottom:24px}'
  + '.ff-ring{'
  +   'width:110px;height:110px;border-radius:50%;'
  +   'margin:0 auto 16px;'
  +   'background:radial-gradient(circle, '
  +   'rgba(93,169,255,.2), transparent 70%);'
  +   'display:flex;align-items:center;justify-content:center;'
  +   'color:var(--acc);'
  +   'border:2px solid rgba(93,169,255,.4);'
  +   'box-shadow:0 0 60px rgba(93,169,255,.35);'
  + '}'
  + '.ff-label{'
  +   'font-size:11px;color:var(--ok);'
  +   'letter-spacing:4px;font-weight:700;'
  +   'margin-bottom:8px;'
  + '}'
  + '.ff-title{'
  +   'font-size:22px;font-weight:200;'
  +   'letter-spacing:1px;'
  + '}'
  + '.ff-text{'
  +   'font-size:13.5px;color:var(--txt2);line-height:1.75;'
  +   'background:var(--panel);'
  +   'border:1px solid var(--line);'
  +   'border-radius:12px;padding:20px 22px;'
  +   'margin-bottom:20px;'
  +   'text-align:left;'
  +   'white-space:pre-wrap;'
  + '}'
  + '.ff-stats{'
  +   'display:flex;justify-content:center;gap:28px;'
  +   'margin-bottom:24px;'
  + '}'
  + '.ff-stat{'
  +   'display:flex;flex-direction:column;align-items:center;gap:3px;'
  + '}'
  + '.ff-stat b{'
  +   'font-size:22px;font-weight:600;color:var(--acc);'
  + '}'
  + '.ff-stat span{'
  +   'font-size:10.5px;color:var(--dim);letter-spacing:.4px;'
  + '}'
  + '.ff-actions{'
  +   'display:flex;gap:10px;margin-bottom:20px;'
  + '}'
  + '.ff-credits{'
  +   'font-size:11.5px;color:var(--dim2);'
  +   'line-height:1.75;letter-spacing:.3px;'
  +   'margin-top:auto;'
  + '}'

  + '.trial-scene, .epilogue-view, .pc-view{'
  +   'animation:trialFade .35s ease-out;'
  + '}'
  + '@keyframes trialFade{'
  +   'from{opacity:0;transform:translateY(8px)}'
  +   'to{opacity:1;transform:none}'
  + '}'

  + '.ts-body, .ep-body, .pc-body{position:relative;}'
  + '.ts-body::before{'
  +   'content:"";'
  +   'position:absolute;left:0;top:0;bottom:0;width:3px;'
  +   'background:linear-gradient(180deg,'
  +   'var(--acc) 0%, transparent 50%, var(--acc) 100%);'
  +   'border-radius:3px;opacity:.4;'
  + '}'
  + '.ep-body::before{'
  +   'content:"";'
  +   'position:absolute;left:0;top:0;bottom:0;width:3px;'
  +   'background:linear-gradient(180deg,'
  +   'var(--warn) 0%, transparent 50%, var(--warn) 100%);'
  +   'border-radius:3px;opacity:.3;'
  + '}'
  + '.pc-body::before{'
  +   'content:"";'
  +   'position:absolute;left:0;top:0;bottom:0;width:3px;'
  +   'background:linear-gradient(180deg,'
  +   'var(--acc2) 0%, transparent 50%, var(--acc2) 100%);'
  +   'border-radius:3px;opacity:.3;'
  + '}'

  + '@media (max-height:750px){'
  +   '.end-screen, .final-finale{padding-top:24px}'
  +   '.es-ring, .ff-ring{width:80px;height:80px}'
  + '}'

  + '.trial-scene, .epilogue-view, .pc-view{'
  +   'overflow:hidden;'
  + '}';

  document.head.appendChild(style);
})();

/* ============================================================
   БЛОК 10 — РАСШИРЕННАЯ ИНИЦИАЛИЗАЦИЯ
   ============================================================ */

(function verifyRoutes(){
  const required = [
    'boot', 'lock', 'home', 'chats', 'calls', 'gallery',
    'notes', 'browser', 'board', 'timeline', 'settings',
    'interrogation', 'accusation', 'finale', 'media',
    'videos', 'audios', 'frames', 'mail', 'map', 'profiler',
    'achievements', 'summary', 'endings', 'compare',
    'wave', 'lie', 'psych', 'forensic', 'encrypted',
    'trial', 'epilogue', 'credits', 'postcredits'
  ];
  const missing = required.filter(function(r){ return !ROUTES[r]; });
  if(missing.length){
    console.warn('⚠️ Отсутствуют роуты:', missing);
  } else {
    console.log(
      '%c✅ Все 34 роута зарегистрированы',
      'color:#3ddc97;font-weight:bold'
    );
  }
})();

(function verifyApps(){
  if(typeof APPS === 'undefined') return;
  console.log(
    '%c📱 Приложений в сетке: ' + APPS.length,
    'color:#5da9ff;font-weight:bold'
  );
})();

(function verifyEvidence(){
  console.log(
    '%c📌 Улик в базе: ' + Object.keys(EVIDENCE_DB).length,
    'color:#ffb84d;font-weight:bold'
  );
})();

(function verifyInterrogations(){
  console.log(
    '%c💬 Допросов: ' + Object.keys(INTERROGATIONS).length,
    'color:#8b6dff;font-weight:bold'
  );
})();

(function verifyAchievements(){
  console.log(
    '%c🏆 Достижений: ' + Object.keys(ACHIEVEMENTS).length,
    'color:#ff5a6e;font-weight:bold'
  );
})();

(function cleanRoutes(){
  const seen = {};
  for(const k in ROUTES){
    if(seen[k]){
      console.warn('Дубликат роута:', k);
    }
    seen[k] = true;
  }
})();

console.log(
  '%c╔════════════════════════════════════════════════╗\n' +
  '║                                                ║\n' +
  '║    ДЕЛО №2024-0414 — ПОСЛЕДНИЙ СЕАНС          ║\n' +
  '║                                                ║\n' +
  '║    ✅ Все 10 частей загружены                 ║\n' +
  '║    📱 34 роута активно                        ║\n' +
  '║    📌 ' + String(Object.keys(EVIDENCE_DB).length).padEnd(2) + ' улики в базе                     ║\n' +
  '║    💬 ' + String(Object.keys(INTERROGATIONS).length).padEnd(2) + ' допроса доступны                 ║\n' +
  '║    🏆 ' + String(Object.keys(ACHIEVEMENTS).length).padEnd(2) + ' достижений                       ║\n' +
  '║    🎬 6 концовок                              ║\n' +
  '║                                                ║\n' +
  '║    Спасибо за игру.                           ║\n' +
  '║                                                ║\n' +
  '╚════════════════════════════════════════════════╝',
  'color:#5da9ff;font-weight:bold;font-size:11px;line-height:1.6'
);

console.log(
  '%cМарина Соколова · 1999 — 2024\n' +
  'Правда восторжествовала.',
  'color:#ff7a9c;font-style:italic;font-size:12px'
);

/* ============================================================
   ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ
   ============================================================ */

setTimeout(checkAchievements, 2000);

setInterval(function(){
  if(G.screen && G.screen !== 'boot' && G.screen !== 'lock'){
    saveGame();
  }
}, 30000);

document.addEventListener('visibilitychange', function(){
  if(document.hidden){
    saveGame();
  }
});

window.addEventListener('beforeunload', function(){
  saveGame();
});

window.addEventListener('error', function(e){
  console.warn('[Игра] Ошибка:', e.message);
});

document.addEventListener('gesturestart', function(e){
  e.preventDefault();
});

document.addEventListener('touchstart', function(){}, {passive: true});

(function checkSaveOnStart(){
  const loaded = loadGame();
  if(loaded && loaded.screen && loaded.screen !== 'boot'){
    console.log(
      '%c💾 Найдено сохранение. Экран: ' + loaded.screen,
      'color:#ffb84d'
    );
  }
})();

setTimeout(function(){
  if(!hasFlag('seen_start_toast')){
    setFlag('seen_start_toast');
    toast('Добро пожаловать', 'Дело №2024-0414 «Последний сеанс»', 'ok');
  }
}, 1200);

console.log(
  '%c[ЧАСТЬ 10 ЗАГРУЖЕНА]',
  'color:#5da9ff;font-weight:bold;font-size:14px',
  '\nДело №2024-0414 закрыто. Спасибо за игру.'
);

console.log(
  '%c★ ★ ★ ★ ★',
  'color:#ffb84d;font-size:20px;letter-spacing:8px'
);

console.log(
  '%cФИНАЛЬНЫЙ ЭКРАН',
  'color:#3ddc97;font-weight:bold;font-size:13px',
  '\nВсе 10 частей загружены. Игра готова к запуску.'
);

/* Экспорт в глобальный объект для отладки */
window.CASE_2024_0414 = {
  G: G,
  EVIDENCE_DB: EVIDENCE_DB,
  NOTES: NOTES,
  CHATS: CHATS,
  VIDEOS: VIDEOS,
  AUDIO_RECORDINGS: AUDIO_RECORDINGS,
  EMAILS: EMAILS,
  LOCATIONS: LOCATIONS,
  PROFILES: PROFILES,
  INTERROGATIONS: INTERROGATIONS,
  ACHIEVEMENTS: ACHIEVEMENTS,
  ENDINGS: ENDINGS,
  FORENSIC: FORENSIC,
  ENCRYPTED_FILES: ENCRYPTED_FILES,
  TRIAL_SCENES: TRIAL_SCENES,
  EPILOGUES: EPILOGUES,
  POSTCREDITS: POSTCREDITS
};

console.log(
  '%c🔧 Для отладки: window.CASE_2024_0414',
  'color:#7a869c;font-size:11px'
);
