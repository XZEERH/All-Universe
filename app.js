document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOGIKA LOADING SCREEN (4 DETIK)
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const uiLayer = document.getElementById('uiLayer');
    const loadingText = document.getElementById('loadingText');
    const loadingPercent = document.getElementById('loadingPercent');

    const texts =["Menginisialisasi Alam Semesta...", "Membentuk Galaksi...", "Menghitung Orbit Planet...", "Membuka Ruang & Waktu..."];
    let textIdx = 0;
    
    const textInterval = setInterval(() => {
        textIdx = (textIdx + 1) % texts.length;
        if(loadingText) loadingText.innerText = texts[textIdx];
    }, 1000);

    let percent = 0;
    const progressInterval = setInterval(() => {
        percent += 100 / (4000 / 40); // Selesai dalam 4 detik
        if (percent >= 100) { percent = 100; clearInterval(progressInterval); }
        if(loadingPercent) loadingPercent.innerText = Math.floor(percent) + "%";
    }, 40);

    setTimeout(() => {
        clearInterval(textInterval);
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            uiLayer.classList.remove('hidden');
        }, 500); 
    }, 4000); // TEPAT 4 DETIK


    // ==========================================
    // 2. DATABASE ALAM SEMESTA
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
        "Magnetar": { viewId: "magnetar", color: "#e879f9", info: { Kategori: "Bintang Neutron", Magnet: "1.000 Triliun Gauss" }, desc: "Benda dengan medan magnet terkuat di alam semesta, mampu menghancurkan atom.", layers: ["Medan Magnet Ekstrem", "Kerak Neutron", "Plasma Cair"] },
        "Bintang Ganda": { viewId: "binary", color: "#818cf8", info: { Kategori: "Sistem Biner (Sirius)", Jarak: "8.6 Tahun Cahaya" }, desc: "Dua bintang yang saling mengorbit; bintang terang kebiruan raksasa dan katai putih padat.", layers:["Bintang Utama", "Katai Putih", "Pusat Massa Gravitasi"] },
        "UY Scuti": { viewId: "uyscuti", color: "#fca5a5", info: { Kategori: "Maha Raksasa Merah", Radius: "1.700x Matahari" }, desc: "Salah satu bintang terbesar yang pernah ditemukan. Ukurannya menelan orbit Jupiter.", layers:["Fotosfer Bergolak", "Lidah Api Raksasa", "Inti Fusi Karbon"] },
        "Exoplanet": { viewId: "exoplanet", color: "#14b8a6", info: { Kategori: "Planet Ekstrasurya", Bintang Induk: "Kepler-186", Status: "Habitable Zone" }, desc: "Planet kembaran bumi di tata surya lain yang diyakini memiliki danau dan lautan beriklim stabil.", layers:["Atmosfer Asing", "Lautan Cair", "Benua Bebatuan", "Inti Magma"] }
    };

    const ALL_DATA = { ...SOLAR_DATA, ...DEEP_SPACE_DATA };

    // ==========================================
    // 3. FUNGSI MENGGAMBAR KANVAS
    // ==========================================
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
        const r = Math.min(w,h)*0.35 + Math.sin(frame*0.03)*