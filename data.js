export const MAIN_VIEWS =[
    { id: "solar", label: "Tata Surya" },
    { id: "milky", label: "Bima Sakti" },
    { id: "andromeda", label: "Andromeda" }
];

export const EXTRA_VIEWS =[
    { id: "nebula", label: "Nebula" }, { id: "quasar", label: "Quasar" },
    { id: "supernova", label: "Supernova" }, { id: "pulsar", label: "Pulsar" },
    { id: "blackhole", label: "Black Hole" }, { id: "wormhole", label: "Wormhole" },
    { id: "magnetar", label: "Magnetar" }, { id: "binary", label: "Bintang Ganda" },    
    { id: "uyscuti", label: "UY Scuti" }, { id: "exoplanet", label: "Exoplanet" }      
];

export const SOLAR_DATA = {
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

export const DEEP_SPACE_DATA = {
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

export const ALL_DATA = { ...SOLAR_DATA, ...DEEP_SPACE_DATA };