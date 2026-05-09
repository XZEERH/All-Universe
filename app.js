// ==========================================
// 1. DATABASE ALAM SEMESTA
// ==========================================
const MAIN_VIEWS =[
    { id: "solar", label: "Tata Surya" },
    { id: "milky", label: "Bima Sakti" },
    { id: "andromeda", label: "Andromeda" }
];

const EXTRA_VIEWS =[
    { id: "nebula", label: "Nebula" }, { id: "quasar", label: "Quasar" },
    { id: "supernova", label: "Supernova" }, { id: "pulsar", label: "Pulsar" },
    { id: "blackhole", label: "Black Hole" }, { id: "wormhole", label: "Wormhole" },
    { id: "magnetar", label: "Magnetar" }, { id: "binary", label: "Bintang Ganda" },    
    { id: "uyscuti", label: "UY Scuti" }, { id: "exoplanet", label: "Exoplanet" }      
];

const SOLAR_DATA = {
    "Matahari": { viewId: "solar", radius: 40, distance: 0, color: "#FDB813", emissive: true, info: { Kategori: "Bintang Tipe G", Diameter: "1.39 juta km", Suhu: "5.778 K", Massa: "1.989 × 10³⁰ kg" }, desc: "Pusat tata surya kita. Menghasilkan energi melalui fusi nuklir hidrogen menjadi helium.", layers:["Inti", "Zona Radiatif", "Fotosfer", "Korona"] },
    "Merkurius": { viewId: "solar", radius: 5, distance: 80, speed: 4.7, color: "#94a3b8", info: { Kategori: "Planet Terestrial", Suhu: "430°C", Gravitasi: "3.7 m/s²" }, desc: "Planet terkecil dan terdekat dari Matahari. Penuh kawah menyerupai bulan.", layers:["Inti Besi", "Mantel", "Kerak Tipis"] },
    "Venus": { viewId: "solar", radius: 9, distance: 120, speed: 3.5, color: "#d6bc9a", info: { Kategori: "Planet Terestrial", Suhu: "462°C", Gravitasi: "8.87 m/s²" }, desc: "Planet terpanas karena efek rumah kaca ekstrem. Berputar terbalik.", layers:["Inti Besi", "Mantel Silikat", "Atmosfer CO₂ Tebal"] },
    "Bumi": { viewId: "solar", radius: 10, distance: 170, speed: 3.0, color: "#38bdf8", info: { Kategori: "Planet Terestrial", Suhu: "15°C", Gravitasi: "9.8 m/s²" }, desc: "Rumah kita. Memiliki 70% permukaan air dan dilindungi medan magnet kuat.", layers:["Inti Dalam", "Inti Luar Cair", "Mantel", "Kerak"] },
    "Bulan": { viewId: "solar", radius: 3, distance: 190, speed: 8.0, color: "#d4d4d8", info: { Kategori: "Satelit Alami", Suhu: "-233 s/d 123°C", Gravitasi: "1.62 m/s²" }, desc: "Satelit alami Bumi. Mengontrol pasang surut lautan dunia.", layers:["Inti Kecil", "Mantel", "Kerak Penuh Kawah"] },
    "Mars": { viewId: "solar", radius: 7, distance: 230, speed: 2.4, color: "#f87171", info: { Kategori: "Planet Terestrial", Suhu: "-65°C", Gravitasi: "3.72 m/s²" }, desc: "Planet merah dengan gunung berapi terbesar Olympus Mons.", layers:["Inti Besi-Sulfida", "Kerak Berbatu", "Atmosfer Tipis"] },
    "Jupiter": { viewId: "solar", radius: 28, distance: 310, speed: 1.3, color: "#d97706", info: { Kategori: "Raksasa Gas", Suhu: "-110°C", Gravitasi: "24.79 m/s²" }, desc: "Planet terbesar dengan badai abadi Great Red Spot.", layers:["Inti Berbatu", "Hidrogen Metalik", "Atmosfer Tebal"] },
    "Europa": { viewId: "solar", radius: 4, distance: 355, speed: 3.5, color: "#fef08a", info: { Kategori: "Satelit Jupiter", Suhu: "-160°C", Karakteristik: "Lautan Bawah Es" }, desc: "Bulan milik Jupiter yang diyakini menyimpan lautan air cair luas di bawah esnya.", layers:["Inti Berbatu", "Lautan Cair", "Kerak Es Tebal"] },
    "Saturnus": { viewId: "solar", radius: 24, distance: 420, speed: 0.96, color: "#fcd34d", ring: true, info: { Kategori: "Raksasa Gas", Suhu: "-140°C", Gravitasi: "10.44 m/s²" }, desc: "Planet tercantik dengan sistem cincin yang terbuat dari es dan batuan.", layers:["Inti Berbatu", "Hidrogen", "Sistem Cincin Es"] },
    "Titan": { viewId: "solar", radius: 5, distance: 465, speed: 2.0, color: "#fb923c", info: { Kategori: "Satelit Saturnus", Suhu: "-179°C", Atmosfer: "Nitrogen Tebal" }, desc: "Bulan Saturnus dengan atmosfer tebal dan danau metana cair.", layers:["Inti Silikat", "Lautan Bawah Tanah", "Kerak Es", "Atmosfer Tebal"] },
    "Uranus": { viewId: "solar", radius: 17, distance: 510, speed: 0.68, color: "#67e8f9", info: { Kategori: "Raksasa Es", Suhu: "-195°C", Rotasi: "Miring 98°" }, desc: "Planet biru es yang menggelinding miring di orbitnya.", layers:["Inti Berbatu", "Mantel Es Air/Metana", "Atmosfer H₂/He"] },
    "Neptunus": { viewId: "solar", radius: 16, distance: 580, speed: 0.54, color: "#3b82f6", info: { Kategori: "Raksasa Es", Suhu: "-200°C", Angin: "2.100 km/jam" }, desc: "Planet terjauh yang dilanda badai super kencang berwarna biru pekat.", layers:["Inti Berbatu", "Mantel Es", "Atmosfer Berbadai"] },
    "Pluto": { viewId: "solar", radius: 3, distance: 640, speed: 0.4, color: "#e2e8f0", info: { Kategori: "Planet Kerdil", Suhu: "-225°C", Gravitasi: "0.62 m/s²" }, desc: "Planet kerdil di sabuk Kuiper dengan dataran es berbentuk hati.", layers:["Inti Berbatu", "Mantel Es Air", "Kerak Nitrogen Beku"] }
};

const DEEP_SPACE_DATA = {
    "Bima Sakti": { viewId: "milky", color: "#fcd34d", info: { Kategori: "Galaksi Spiral", Diameter: "105.700 tc", Usia: "13.6 Miliar Thn" }, desc: "Rumah bagi tata surya kita. Galaksi luas dipenuhi ratusan miliar bintang.", layers:["Halo Galaksi", "Lengan Spiral", "Supermasif Black Hole"] },
    "Andromeda": { viewId: "andromeda", color: "#7dd3fc", info: { Kategori: "Galaksi Spiral", Jarak: "2.5 Juta tc", Bintang: "1 Triliun" }, desc: "Galaksi tetangga kita yang akan bertabrakan dengan Bima Sakti 4 miliar tahun lagi.", layers:["Gugus Bintang Bola", "Lengan Debu", "Inti Ganda"] },
    "Nebula": { viewId: "nebula", color: "#f472b6", info: { Kategori: "Awan Antarbintang", Jarak: "1.344 tc", Suhu: "10.000 K" }, desc: "Pabrik bintang. Awan gas raksasa yang menyusut untuk melahirkan bintang baru.", layers:["Awan Molekuler Gelap", "Gas Hidrogen Terionisasi"] },
    "Quasar": { viewId: "quasar", color: "#c084fc", info: { Kategori: "Inti Galaksi Aktif", Luminositas: "4 Triliun Matahari" }, desc: "Ditenagai oleh Lubang Hitam supermasif yang menembakkan pilar energi relativistik.", layers:["Jet Energi (Pilar)", "Piringan Akresi Padat"] },
    "Pulsar": { viewId: "pulsar", color: "#38bdf8", info: { Kategori: "Bintang Neutron", Rotasi: "30 Putaran/Detik" }, desc: "Sisa bintang mati yang berputar sangat liar memancarkan radiasi elektromagnetik.", layers:["Kerak Ion Besi", "Inti Superkonduktor"] },
    "Black Hole": { viewId: "blackhole", color: "#f59e0b", info: { Kategori: "Lubang Hitam Supermasif", Massa: "66 Miliar M☉" }, desc: "Memiliki gravitasi absolut hingga partikel cahaya pun tak bisa kabur darinya.", layers:["Cincin Foton", "Piringan Akresi", "Event Horizon", "Singularitas"] },
    "Supernova": { viewId: "supernova", color: "#fb923c", info: { Kategori: "Ledakan Bintang Mati", Kecerahan: "-7.5 Magnitudo" }, desc: "Kematian epik sebuah bintang raksasa yang menyebarkan unsur material kehidupan ke kosmos.", layers:["Gelombang Kejut", "Material Terlontar", "Sisa Inti"] },
    "Wormhole": { viewId: "wormhole", color: "#5eead4", info: { Kategori: "Anomali Ruang-Waktu", Teori: "Einstein-Rosen" }, desc: "Jembatan jalan pintas alam semesta (Hipotetis) yang melipat dimensi ruang dan waktu.", layers:["Mulut Masuk", "Lengkungan Waktu", "Lorong Penghubung"] },
    "Magnetar": { viewId: "magnetar", color: "#e879f9", info: { Kategori: "Bintang Neutron", Magnet: "1.000 Triliun Gauss" }, desc: "Benda dengan medan magnet terkuat di alam semesta, mampu menghancurkan atom.", layers:["Medan Magnet Ekstrem", "Kerak Neutron", "Plasma Cair"] },
    "Bintang Ganda": { viewId: "binary", color: "#818cf8", info: { Kategori: "Sistem Biner (Sirius)", Jarak: "8.6 Tahun Cahaya" }, desc: "Dua bintang yang saling mengorbit; bintang terang kebiruan raksasa dan katai putih padat.", layers:["Bintang Utama", "Katai Putih", "Pusat Massa Gravitasi"] },
    "UY Scuti": { viewId: "uyscuti", color: "#fca5a5", info: { Kategori: "Maha Raksasa Merah", Radius: "1.700x Matahari" }, desc: "Salah satu bintang terbesar yang pernah ditemukan. Ukurannya menelan orbit Jupiter.", layers:["Fotosfer Bergolak", "Lidah Api Raksasa", "Inti Fusi Karbon"] },
    "Exoplanet": { viewId: "exoplanet", color: "#14b8a6", info: { Kategori: "Planet Ekstrasurya", Bintang Induk: "Kepler-186", Status: "Habitable Zone" }, desc: "Planet kembaran bumi di tata surya lain yang diyakini memiliki danau dan lautan beriklim stabil.", layers:["Atmosfer Asing", "Lautan Cair", "Benua Bebatuan", "Inti Magma"] }
};

const ALL_DATA = { ...SOLAR_DATA, ...DEEP_SPACE_DATA };

// ==========================================
// 2. FUNGSI LOGIKA GAMBAR (CANVAS)
// ==========================================
function lightenColor(hex, amount) {
    const n = parseInt(hex.slice(1), 16), r = Math.min(255, (n >> 16) + amount), g = Math.min(255, ((n >> 8) & 0xff) + amount), b = Math.min(255, (n & 0xff) + amount);
    return `rgb(${r},${g},${b})`;
}
function darkenColor(hex, amount) {
    const n = parseInt(hex.slice(1), 16), r = Math.max(0, (n >> 16) - amount), g = Math.max(0, ((n >> 8) & 0xff) - amount), b = Math.max(0, (n & 0xff) - amount);
    return `rgb(${r},${g},${b})`;
}

function drawBlackHole(ctx, cx, cy, frame, w, h) {
    for (let i = 0; i < 40; i++) {
        const r = Math.random() * Math.min(w,h)/2 + 70, a = Math.random() * Math.PI * 2 + frame * 0.0005;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a)*r, cy + Math.sin(a)*r, Math.random()*1.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.8})`; ctx.fill();
    }
    const pulse = Math.sin(frame * 0.05) * 5; 
    const photonGrd = ctx.createRadialGradient(cx, cy, 35, cx, cy, 80 + pulse);
    photonGrd.addColorStop(0, "rgba(252, 211, 77, 0.9)"); photonGrd.addColorStop(0.3, "rgba(249, 115, 22, 0.5)"); photonGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 80 + pulse, 0, Math.PI * 2); ctx.fillStyle = photonGrd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.15); ctx.scale(1, 0.25);
    const diskBackGrd = ctx.createRadialGradient(0, 0, 40, 0, 0, 160 + pulse);
    diskBackGrd.addColorStop(0, "transparent"); diskBackGrd.addColorStop(0.3, "rgba(252, 211, 77, 1)"); diskBackGrd.addColorStop(0.6, "rgba(239, 68, 68, 0.8)"); diskBackGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(0, 0, 160 + pulse, Math.PI, Math.PI*2); ctx.fillStyle = diskBackGrd; ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = "#000000"; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(252, 211, 77, 0.8)"; ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.15); ctx.scale(1, 0.25);
    const diskFrontGrd = ctx.createRadialGradient(0, 0, 40, 0, 0, 160 + pulse);
    diskFrontGrd.addColorStop(0, "transparent"); diskFrontGrd.addColorStop(0.3, "rgba(253, 230, 138, 1)"); diskFrontGrd.addColorStop(0.6, "rgba(249, 115, 22, 0.9)"); diskFrontGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(0, 0, 160 + pulse, 0, Math.PI); ctx.fillStyle = diskFrontGrd; ctx.fill(); ctx.restore();
}

function drawPulsar(ctx, cx, cy, frame, w, h) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
    grd.addColorStop(0, "#ffffff"); grd.addColorStop(0.2, "#38bdf8"); grd.addColorStop(0.6, "#0284c740"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
    const angle1 = frame * 0.08, angle2 = angle1 + Math.PI;
    [[angle1, angle2],[angle2, angle1 + Math.PI]].forEach(([a]) => {
        const pulse = Math.abs(Math.sin(frame * 0.1)) * 0.8 + 0.2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
        const beamGrd = ctx.createLinearGradient(0, 0, Math.min(w, h) * 0.8, 0);
        beamGrd.addColorStop(0, `rgba(56,189,248,${pulse})`); beamGrd.addColorStop(0.4, `rgba(14,165,233,${pulse * 0.4})`); beamGrd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(Math.min(w, h) * 0.8, -1); ctx.lineTo(Math.min(w, h) * 0.8, 1); ctx.lineTo(0, 6);
        ctx.fillStyle = beamGrd; ctx.fill(); ctx.restore();
    });
}

function drawQuasar(ctx, cx, cy, frame, w, h) {
    for (let i = 0; i < 50; i++) {
        const r = (frame * 2 + i * 20) % (Math.min(w,h)), a = (i * Math.PI * 2) / 50;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a)*r, cy + Math.sin(a)*r, Math.random()*2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${1 - r/Math.min(w,h)})`; ctx.fill();
    }
    const pulse = Math.sin(frame * 0.1) * 10;
    const coreGrd = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120 + pulse);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.2, "#a855f7"); coreGrd.addColorStop(0.5, "#3b82f680"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 120 + pulse, 0, Math.PI * 2); ctx.fillStyle = coreGrd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy);
    const jetPulse = Math.random() * 0.3 + 0.7, jetGrd = ctx.createLinearGradient(0, -h/2, 0, h/2);
    jetGrd.addColorStop(0, "transparent"); jetGrd.addColorStop(0.3, `rgba(168, 85, 247, ${jetPulse})`); jetGrd.addColorStop(0.5, "#ffffff"); jetGrd.addColorStop(0.7, `rgba(168, 85, 247, ${jetPulse})`); jetGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-40, -h/2); ctx.lineTo(40, -h/2); ctx.lineTo(15, 0); ctx.lineTo(40, h/2); ctx.lineTo(-40, h/2); ctx.lineTo(-15, 0);
    ctx.fillStyle = jetGrd; ctx.fill(); ctx.restore();
}

function drawNebula(ctx, cx, cy, frame, w, h) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(frame * 0.001);
    const colors =["rgba(236, 72, 153, 0.15)", "rgba(56, 189, 248, 0.15)", "rgba(168, 85, 247, 0.15)"];
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2, dist = 60 + Math.sin(frame * 0.02 + i) * 20;
        const x = Math.cos(a) * dist, y = Math.sin(a) * dist, r = 100 + Math.sin(frame * 0.01 + i) * 30;
        const cloudGrd = ctx.createRadialGradient(x, y, 0, x, y, r);
        cloudGrd.addColorStop(0, colors[i % colors.length]); cloudGrd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = cloudGrd; ctx.fill();
    }
    ctx.restore();
}

function drawSupernova(ctx, cx, cy, frame, w, h) {
    const ringRadius = 80 + (frame * 0.5) % 80, ringOpacity = 1 - ((ringRadius - 80) / 80);
    ctx.beginPath(); ctx.arc(cx, cy, ringRadius, 0, Math.PI*2);
    ctx.lineWidth = 4; ctx.strokeStyle = `rgba(251, 146, 60, ${ringOpacity * 0.6})`; ctx.stroke();
    for(let i=0; i<30; i++) {
        const a = (i/30)*Math.PI*2 + frame*0.01, r = 30 + Math.sin(frame*0.05 + i)*25;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 4, 0, Math.PI*2); ctx.fillStyle = `rgba(239, 68, 68, 0.5)`; ctx.fill();
    }
    const coreGrd = ctx.createRadialGradient(cx,cy,0, cx,cy, 70);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.3, "#fdba74"); coreGrd.addColorStop(0.7, "#ea580c80"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx,cy, 70, 0, Math.PI*2); ctx.fillStyle = coreGrd; ctx.fill();
}

function drawWormhole(ctx, cx, cy, frame, w, h) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-frame * 0.005);
    for(let i=0; i<24; i++) {
        const a = (i/24)*Math.PI*2;
        ctx.beginPath();
        for(let r=10; r<w; r+=15) {
            const swirl = a + r*0.008, x = Math.cos(swirl)*r, y = Math.sin(swirl)*r;
            if(r===10) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.1 + Math.sin(frame*0.02 + i)*0.15})`; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.restore();
    const coreGrd = ctx.createRadialGradient(cx,cy,0, cx,cy, 40);
    coreGrd.addColorStop(0, "#000000"); coreGrd.addColorStop(0.6, "#0f172a"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx,cy, 50, 0, Math.PI*2); ctx.fillStyle = coreGrd; ctx.fill();
}

function drawGalaxy(ctx, cx, cy, frame, w, h, type) {
    const isAndromeda = type === "andromeda", arms = isAndromeda ? 4 : 2, coreColor = isAndromeda ? "rgba(186,230,253,1)" : "rgba(253,230,138,1)", colorArr = isAndromeda ?[125, 211, 252] :[252, 211, 77];
    for (let arm = 0; arm < arms; arm++) {
        const baseAngle = (arm / arms) * Math.PI * 2 - frame * (isAndromeda ? 0.0015 : 0.002);
        for (let i = 0; i < 300; i++) {
            const t = i / 300, spiral = t * Math.PI * 5 + baseAngle, r = t * Math.min(w, h) * 0.45;
            const scatter = (Math.random() - 0.5) * (30 * (1-t) + 5), x = cx + Math.cos(spiral) * r + scatter, y = cy + Math.sin(spiral) * r * (isAndromeda ? 0.3 : 0.4) + scatter * 0.3;
            ctx.beginPath(); ctx.arc(x, y, Math.random() * 1.5 + 0.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},${(1 - t) * 0.7 + 0.1})`; ctx.fill();
        }
    }
    const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.3, coreColor); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = coreGrd; ctx.fill();
}

function drawMagnetar(ctx, cx, cy, frame, w, h) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    grd.addColorStop(0, "#ffffff"); grd.addColorStop(0.3, "#e879f9"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(frame * 0.05);
    for(let i=0; i<16; i++){
        ctx.beginPath(); ctx.ellipse(0, 0, 100 + Math.sin(frame*0.1)*20, 20, i * Math.PI/8, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(232, 121, 249, ${0.2 + Math.sin(frame*0.2+i)*0.2})`; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
}

function drawBinaryStar(ctx, cx, cy, frame, w, h) {
    const a1 = frame * 0.02, a2 = a1 + Math.PI;
    const x1 = cx + Math.cos(a1)*40, y1 = cy + Math.sin(a1)*40;
    const x2 = cx + Math.cos(a2)*90, y2 = cy + Math.sin(a2)*90;
    const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, 60);
    g1.addColorStop(0, "#ffffff"); g1.addColorStop(0.3, "#818cf8"); g1.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(x1, y1, 60, 0, Math.PI * 2); ctx.fillStyle = g1; ctx.fill();
    const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 20);
    g2.addColorStop(0, "#ffffff"); g2.addColorStop(0.5, "#cbd5e1"); g2.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(x2, y2, 20, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
}

function drawUYScuti(ctx, cx, cy, frame, w, h) {
    const r = Math.min(w,h)*0.35 + Math.sin(frame*0.03)*15;
    const grd = ctx.createRadialGradient(cx, cy, r*0.2, cx, cy, r);
    grd.addColorStop(0, "#fef08a"); grd.addColorStop(0.6, "#f97316"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
    for(let i=0; i<12; i++){
        const a = (i/12)*Math.PI*2 + frame*0.005;
        const flareR = r + Math.sin(frame*0.1 + i)*20;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*flareR, cy+Math.sin(a)*flareR, 15, 0, Math.PI*2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)"; ctx.fill();
    }
}

function drawExoplanet(ctx, cx, cy, frame, w, h) {
    ctx.beginPath(); ctx.arc(cx - w/4, cy - h/4, 50, 0, Math.PI*2);
    ctx.fillStyle = "#f87171"; ctx.shadowBlur = 40; ctx.shadowColor = "#fca5a5"; ctx.fill(); ctx.shadowBlur = 0;
    const r = Math.min(w,h)*0.4;
    const pGrd = ctx.createRadialGradient(cx+r*0.2, cy+r*0.2, 0, cx, cy, r);
    pGrd.addColorStop(0, "#14b8a6"); pGrd.addColorStop(0.7, "#0f766e"); pGrd.addColorStop(1, "#022c22");
    ctx.beginPath(); ctx.arc(cx, cy + h/6, r, 0, Math.PI*2); ctx.fillStyle = pGrd; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy + h/6, r+10, 0, Math.PI*2);
    ctx.strokeStyle = "rgba(45, 212, 191, 0.2)"; ctx.lineWidth = 8; ctx.stroke();
}


// ==========================================
// 3. FUNGSI UTAMA UI & ANIMASI KANVAS
// ==========================================

// Fungsi ini akan dieksekusi 100% setelah Loading Screen selesai
window.addEventListener('loaderSelesai', () => {

    let view = "solar";
    let selected = null;
    let zoom = 1;
    let currentTab = "data";
    let frame = 0;
    const angles = {};

    Object.keys(SOLAR_DATA).forEach(k => {
      if (SOLAR_DATA[k].speed) angles[k] = Math.random() * Math.PI * 2;
    });

    const canvas = document.getElementById('simCanvas');
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

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
      document.querySelectorAll('.tab-btn')[0].click(); 
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
            view = ALL_DATA[key].viewId; selected = key;
            searchInput.value = ''; searchResults.classList.add('hidden');
            updateInfoPanel(); renderMenu();
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

    function loop() {
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      if (view === "blackhole") drawBlackHole(ctx, cx, cy, frame, w, h);
      else if (view === "pulsar") drawPulsar(ctx, cx, cy, frame, w, h);
      else if (view === "quasar") drawQuasar(ctx, cx, cy, frame, w, h);
      else if (view === "nebula") drawNebula(ctx, cx, cy, frame, w, h);
      else if (view === "supernova") drawSupernova(ctx, cx, cy, frame, w, h);
      else if (view === "wormhole") drawWormhole(ctx, cx, cy, frame, w, h);
      else if (view === "magnetar") drawMagnetar(ctx, cx, cy, frame, w, h);
      else if (view === "binary") drawBinaryStar(ctx, cx, cy, frame, w, h);
      else if (view === "uyscuti") drawUYScuti(ctx, cx, cy, frame, w, h);
      else if (view === "exoplanet") drawExoplanet(ctx, cx, cy, frame, w, h);
      else if (view === "milky" || view === "andromeda") drawGalaxy(ctx, cx, cy, frame, w, h, view);
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
          
          ctx.fillStyle = "rgba(148, 163, 184, 0.8)"; 
          ctx.font = `500 ${Math.max(9, 10 * zoom)}px sans-serif`; 
          ctx.textAlign = "center";
          
          // Mengatasi bug tulisan planet yang hilang sebelumnya
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

});