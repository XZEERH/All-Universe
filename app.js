import { ALL_DATA, SOLAR_DATA, DEEP_SPACE_DATA, MAIN_VIEWS, EXTRA_VIEWS } from './data.js';
import * as Draw from './drawings.js';

// --- LAYAR LOADING ---
const loadingScreen = document.getElementById('loadingScreen');
const uiLayer = document.getElementById('uiLayer');
const texts =["Menginisialisasi Alam Semesta...", "Membentuk Galaksi...", "Menghitung Orbit Planet...", "Membuka Ruang & Waktu..."];
let textIdx = 0;
setInterval(() => {
  const lt = document.getElementById('loadingText');
  if(lt) lt.innerText = texts[textIdx = (textIdx + 1) % texts.length];
}, 800);

setTimeout(() => {
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    uiLayer.classList.remove('hidden');
  }, 500);
}, 3000); // Selesai dalam 3 detik

// --- STATE APLIKASI ---
let view = "solar";
let selected = null;
let zoom = 1;
let currentTab = "data";
let frame = 0;
const angles = {};

Object.keys(SOLAR_DATA).forEach(k => {
  if (SOLAR_DATA[k].speed) angles[k] = Math.random() * Math.PI * 2;
});

// --- PENGATURAN KANVAS ---
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

// --- ANTARMUKA & TOMBOL ---
document.getElementById('zoomInBtn').onclick = () => zoom = Math.min(2.5, zoom + 0.2);
document.getElementById('zoomOutBtn').onclick = () => zoom = Math.max(0.3, zoom - 0.2);
document.getElementById('zoomResetBtn').onclick = () => zoom = 1;

const subMenu = document.getElementById('subMenu');
document.getElementById('menuBtn').onclick = () => {
  if (subMenu.classList.contains('hidden')) {
    subMenu.classList.remove('hidden');
    setTimeout(() => subMenu.classList.add('fade-enter-active'), 10);
  } else {
    subMenu.classList.remove('fade-enter-active');
    setTimeout(() => subMenu.classList.add('hidden'), 300);
  }
};

// --- RENDER MENU BAWAH ---
const mainContainer = document.getElementById('mainMenuContainer');
const subContainer = document.getElementById('subMenuContainer');

function renderMenu() {
  mainContainer.innerHTML = '';
  MAIN_VIEWS.forEach(v => {
    const btn = document.createElement('button');
    btn.className = `px-3 md:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${view === v.id ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`;
    btn.innerText = v.label;
    btn.onclick = () => { view = v.id; selected = null; updateInfoPanel(); renderMenu(); };
    mainContainer.appendChild(btn);
  });

  subContainer.innerHTML = '';
  EXTRA_VIEWS.forEach(v => {
    const btn = document.createElement('button');
    btn.className = `px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${view === v.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700 hover:text-white'}`;
    btn.innerText = v.label;
    btn.onclick = () => {
      view = v.id; selected = null; updateInfoPanel(); renderMenu();
      subMenu.classList.remove('fade-enter-active');
      setTimeout(() => subMenu.classList.add('hidden'), 300);
    };
    subContainer.appendChild(btn);
  });
}

// --- PANEL INFORMASI ---
const infoPanel = document.getElementById('infoPanel');
const hintText = document.getElementById('hintText');
document.getElementById('closeInfoBtn').onclick = () => { selected = null; updateInfoPanel(); };

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.onclick = (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('border-cyan-400', 'text-cyan-400');
      b.classList.add('border-transparent', 'text-slate-500');
    });
    e.target.classList.remove('border-transparent', 'text-slate-500');
    e.target.classList.add('border-cyan-400', 'text-cyan-400');
    currentTab = e.target.getAttribute('data-tab');
    renderPanelContent();
  }
});

function updateInfoPanel() {
  if (!selected) {
    infoPanel.classList.remove('fade-enter-active');
    setTimeout(() => infoPanel.classList.add('hidden'), 300);
    return;
  }
  
  infoPanel.classList.remove('hidden');
  setTimeout(() => infoPanel.classList.add('fade-enter-active'), 10);
  
  const data = ALL_DATA[selected];
  document.getElementById('infoTitle').innerText = selected;
  document.getElementById('infoCategory').innerText = data.info.Kategori;
  document.getElementById('infoColor').style.background = data.color;
  document.getElementById('infoColor').style.boxShadow = `0 0 20px ${data.color}50`;
  
  currentTab = "data";
  document.querySelectorAll('.tab-btn')[0].click(); // Reset tab ke "Data"
}

function renderPanelContent() {
  if (!selected) return;
  const data = ALL_DATA[selected];
  const content = document.getElementById('infoContent');
  content.innerHTML = '';
  
  if (currentTab === 'data') {
    for (let key in data.info) {
      content.innerHTML += `<div class="flex justify-between items-center py-2 border-b border-slate-800/60 last:border-0"><span class="text-xs text-slate-400 font-medium">${key}</span><span class="text-xs font-bold text-slate-100 text-right ml-4">${data.info[key]}</span></div>`;
    }
  } else if (currentTab === 'struktur') {
    const wrap = document.createElement('div');
    wrap.className = 'space-y-3 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-slate-700/50';
    (data.layers ||[]).forEach((l, i) => {
      wrap.innerHTML += `<div class="flex items-center gap-4 relative z-10"><div class="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[9px] text-cyan-400 font-mono font-bold flex-shrink-0 shadow-md">${i+1}</div><p class="text-xs text-slate-200 py-1 font-medium">${l}</p></div>`;
    });
    content.appendChild(wrap);
  } else {
    content.innerHTML = `<p class="text-sm text-slate-300 leading-relaxed font-normal">${data.desc}</p>`;
  }
}

// --- LOGIKA PENCARIAN ---
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const indoAlias = { 
  "Matahari": "sun", "Bumi": "earth", "Bima Sakti": "milky way", "Black Hole": "lubang hitam ton 618", "Wormhole": "lubang cacing", "Nebula": "awan gas", "Pulsar": "bintang neutron", "Quasar": "inti galaksi", "Supernova": "ledakan bintang mati"
};

searchInput.oninput = (e) => {
  const val = e.target.value.toLowerCase();
  searchResults.innerHTML = '';
  if (!val) { searchResults.classList.add('hidden'); return; }
  
  let found = false;
  for (let key in ALL_DATA) {
    const alias = indoAlias[key] ? indoAlias[key].toLowerCase() : "";
    if (key.toLowerCase().includes(val) || alias.includes(val)) {
      found = true;
      const btn = document.createElement('button');
      btn.className = "w-full text-left px-4 py-3 hover:bg-slate-800/80 text-sm text-slate-200 transition border-b border-slate-800/50 last:border-0 flex items-center gap-3";
      btn.innerHTML = `<div class="w-2.5 h-2.5 rounded-full shadow-sm" style="background: ${ALL_DATA[key].color}"></div> ${key}`;
      btn.onclick = () => {
        view = ALL_DATA[key].viewId;
        selected = key;
        searchInput.value = '';
        searchResults.classList.add('hidden');
        updateInfoPanel();
        renderMenu();
      };
      searchResults.appendChild(btn);
    }
  }
  if (found) searchResults.classList.remove('hidden');
  else searchResults.classList.add('hidden');
}
document.addEventListener('click', (e) => {
  if (e.target !== searchInput) searchResults.classList.add('hidden');
});

// --- KLIK KANVAS ---
canvas.onclick = (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  const cx = canvas.width / 2, cy = canvas.height / 2;

  if (view === "solar") {
    let clicked = null;
    for (const key in SOLAR_DATA) {
      const p = SOLAR_DATA[key];
      let px = cx + (p.distance ? Math.cos(angles[key]) * p.distance * zoom : 0);
      let py = cy + (p.distance ? Math.sin(angles[key]) * p.distance * zoom : 0);
      if (Math.hypot(mx - px, my - py) < p.radius * zoom + 15) clicked = key;
    }
    selected = clicked; updateInfoPanel();
  } else {
    if (Math.hypot(mx - cx, my - cy) < 150) {
      const objName = Object.keys(DEEP_SPACE_DATA).find(k => DEEP_SPACE_DATA[k].viewId === view);
      if (objName) { selected = objName; updateInfoPanel(); }
    } else { selected = null; updateInfoPanel(); }
  }
};

// --- LOOPING ANIMASI ---
function loop() {
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;
  ctx.clearRect(0, 0, w, h);

  if (view === "blackhole") Draw.drawBlackHole(ctx, cx, cy, frame, w, h);
  else if (view === "pulsar") Draw.drawPulsar(ctx, cx, cy, frame, w, h);
  else if (view === "quasar") Draw.drawQuasar(ctx, cx, cy, frame, w, h);
  else if (view === "nebula") Draw.drawNebula(ctx, cx, cy, frame, w, h);
  else if (view === "supernova") Draw.drawSupernova(ctx, cx, cy, frame, w, h);
  else if (view === "wormhole") Draw.drawWormhole(ctx, cx, cy, frame, w, h);
  else if (view === "magnetar") Draw.drawMagnetar(ctx, cx, cy, frame, w, h);
  else if (view === "binary") Draw.drawBinaryStar(ctx, cx, cy, frame, w, h);
  else if (view === "uyscuti") Draw.drawUYScuti(ctx, cx, cy, frame, w, h);
  else if (view === "exoplanet") Draw.drawExoplanet(ctx, cx, cy, frame, w, h);
  else if (view === "milky" || view === "andromeda") Draw.drawGalaxy(ctx, cx, cy, frame, w, h, view);
  else {
    for(let i=0; i<10; i++) { ctx.fillStyle=`rgba(255,255,255,${Math.random()})`; ctx.fillRect(Math.random()*w, Math.random()*h, 1, 1); }
    for (const key in SOLAR_DATA) {
      const p = SOLAR_DATA[key];
      const d = p.distance * zoom;
      let px = cx, py = cy;
      if (p.speed) {
        angles[key] += p.speed * 0.003;
        px = cx + Math.cos(angles[key]) * d;
        py = cy + Math.sin(angles[key]) * d;
        ctx.beginPath(); ctx.arc(cx, cy, d, 0, Math.PI * 2); ctx.strokeStyle = "rgba(255,255,255,0.03)"; ctx.stroke();
      }
      const r = p.radius * zoom;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)"; ctx.font = `500 ${Math.max(9, 10 * zoom)}px sans-serif`; ctx.textAlign = "center";
      ctx.fillText(key, px, py + r + 16);
    }
  }
  
  if (view !== "solar" && !selected) hintText.classList.remove('hidden');
  else hintText.classList.add('hidden');

  frame++;
  requestAnimationFrame(loop);
}

renderMenu();
loop();