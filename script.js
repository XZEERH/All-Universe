/* ==================== FITUR BARU: LOADER & WELCOME SCREEN ==================== */
(function() {
    // Cegah loader tampil ulang saat navigasi dalam sesi yang sama
    if (sessionStorage.getItem('eac_new_loader_shown')) return;
    sessionStorage.setItem('eac_new_loader_shown', 'true');

    // Sembunyikan loader lama
    const oldLoader = document.getElementById('loading-screen');
    if (oldLoader) {
        oldLoader.style.display = 'none';
    }

    // Buat loader baru
    const loaderScreen = document.createElement('div');
    loaderScreen.id = 'new-loader-screen';
    loaderScreen.innerHTML = `
        <div class="loader-content">
            <div id="loader-percentage">0%</div>
            <div class="loader-bar-container">
                <div id="loader-bar"></div>
            </div>
            <div class="welcome-message" id="welcomeMessage">
                <div class="welcome-text">WELCOME</div>
                <div class="angkasa-text">ANGKASA</div>
            </div>
        </div>
    `;
    document.body.insertBefore(loaderScreen, document.body.firstChild);

    const percentEl = document.getElementById('loader-percentage');
    const barEl = document.getElementById('loader-bar');
    const welcomeMsg = document.getElementById('welcomeMessage');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 3) + 2;
        if (progress >= 100) {
            progress = 100;
            percentEl.textContent = '100%';
            barEl.style.width = '100%';
            barEl.classList.add('complete');
            clearInterval(interval);
            
            // Tampilkan teks Welcome & Angkasa
            setTimeout(() => {
                welcomeMsg.style.opacity = '1';
            }, 250);
            
            // Fade out loader
            setTimeout(() => {
                loaderScreen.style.opacity = '0';
                setTimeout(() => {
                    loaderScreen.remove();
                    // Tampilkan notifikasi pojok
                    showPortalNotification();
                    // Pastikan portal content terlihat
                    const portalContent = document.getElementById('portal-content');
                    if (portalContent) {
                        portalContent.style.display = 'block';
                        revealCards();
                    }
                    // Inisialisasi Marquee
                    setTimeout(initSmoothMarquee, 300);
                }, 1200);
            }, 2200);
        } else {
            percentEl.textContent = progress + '%';
            barEl.style.width = progress + '%';
        }
    }, 35);

    function showPortalNotification() {
        const notif = document.createElement('div');
        notif.className = 'portal-notification';
        notif.innerHTML = `
            <span><i class="notif-dot">●</i> SISTEM AKTIF</span>
            <span><i class="notif-dot">●</i> HALAMAN STABIL</span>
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.transition = 'opacity 0.6s';
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 700);
        }, 4500);
    }
})();

/* ==================== FITUR BARU: HEADER ICONS, PANEL & ATURAN ==================== */

// Tambahkan ikon Gear dan Aturan ke header
function injectHeaderIcons() {
    const header = document.querySelector('.header-section');
    if (!header) return;
    if (document.querySelector('.eac-header-icons')) return;
    
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'eac-header-icons';
    
    // Ikon Gear (Pengaturan)
    const gearBtn = document.createElement('button');
    gearBtn.className = 'eac-icon-btn';
    gearBtn.setAttribute('aria-label', 'Pengaturan');
    gearBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.33-.02-.64-.06-.94l2.02-1.58c.18-.14.23-.38.12-.56l-1.89-3.28c-.12-.19-.36-.26-.56-.18l-2.38.96c-.5-.38-1.06-.68-1.66-.88L14.45 3.5c-.04-.2-.2-.36-.4-.4l-3.78-.9c-.2-.04-.4.04-.54.2l-1.3 2.14c-.6.06-1.18.2-1.72.42l-2.2-.94c-.2-.08-.42 0-.54.18l-1.9 3.28c-.1.18-.06.4.12.56l1.94 1.52c-.04.3-.06.62-.06.94 0 .32.02.64.06.94l-1.94 1.52c-.18.14-.22.38-.12.56l1.9 3.28c.12.18.34.26.54.18l2.2-.94c.54.22 1.12.36 1.72.42l1.3 2.14c.14.16.34.24.54.2l3.78-.9c.2-.04.36-.2.4-.4l.3-2.6c.6-.2 1.16-.5 1.66-.88l2.38.96c.2.08.44 0 .56-.18l1.89-3.28c.1-.18.06-.42-.12-.56l-2.02-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>`;
    
    // Ikon Aturan (Dokumen)
    const rulesBtn = document.createElement('button');
    rulesBtn.className = 'eac-icon-btn';
    rulesBtn.setAttribute('aria-label', 'Aturan');
    rulesBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 2h12v2H6V2zm0 4h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2zm10 0h2v6h-2v-6zM4 20h16v2H4v-2z"/></svg>`;
    
    iconsContainer.appendChild(gearBtn);
    iconsContainer.appendChild(rulesBtn);
    
    // Sisipkan setelah time-display atau di akhir header
    const timeDisplay = header.querySelector('.time-display');
    if (timeDisplay) {
        timeDisplay.insertAdjacentElement('afterend', iconsContainer);
    } else {
        header.appendChild(iconsContainer);
    }
    
    return { gearBtn, rulesBtn };
}

// Bangun Panel Pengaturan & Aturan
function buildPanels() {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'eac-overlay-backdrop';
    document.body.appendChild(backdrop);
    
    // Panel Pengaturan
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'eac-settings-panel';
    settingsPanel.innerHTML = `
        <div class="eac-panel-header">
            <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.33-.02-.64-.06-.94l2.02-1.58c.18-.14.23-.38.12-.56l-1.89-3.28c-.12-.19-.36-.26-.56-.18l-2.38.96c-.5-.38-1.06-.68-1.66-.88L14.45 3.5c-.04-.2-.2-.36-.4-.4l-3.78-.9c-.2-.04-.4.04-.54.2l-1.3 2.14c-.6.06-1.18.2-1.72.42l-2.2-.94c-.2-.08-.42 0-.54.18l-1.9 3.28c-.1.18-.06.4.12.56l1.94 1.52c-.04.3-.06.62-.06.94 0 .32.02.64.06.94l-1.94 1.52c-.18.14-.22.38-.12.56l1.9 3.28c.12.18.34.26.54.18l2.2-.94c.54.22 1.12.36 1.72.42l1.3 2.14c.14.16.34.24.54.2l3.78-.9c.2-.04.36-.2.4-.4l.3-2.6c.6-.2 1.16-.5 1.66-.88l2.38.96c.2.08.44 0 .56-.18l1.89-3.28c.1-.18.06-.42-.12-.56l-2.02-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>
            <h3>PENGATURAN EAC</h3>
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><path d="M5 5h5V3H5v2zm14 14h-5v-2h5v2zm0-14h-5v2h5V5zM5 19h5v-2H5v2zM3 7h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg> Mode Layar Penuh</label>
            <input type="checkbox" id="fullscreenMode">
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg> Musik Ambient</label>
            <input type="checkbox" id="ambientMusic">
        </div>
        <div class="eac-setting-item">
            <label class="eac-battery-indicator"><svg viewBox="0 0 24 24"><path d="M17 6h-3V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg> Daya Perangkat</label>
            <span style="color:#00ffaa;">87%</span>
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Mode Terang</label>
            <input type="checkbox" id="lightMode">
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg> Efek Suara (SFX)</label>
            <input type="checkbox" id="sfxToggle" checked>
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><path d="M20 12c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8 8-3.59 8-8zm-8 6c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg> Hemat Daya</label>
            <input type="checkbox" id="powerSaver">
        </div>
        <div class="eac-setting-item">
            <label><svg viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4H5z"/></svg> Ukuran Teks</label>
            <input type="range" min="80" max="150" value="100" id="textSizeSlider">
        </div>
    `;
    document.body.appendChild(settingsPanel);
    
    // Panel Aturan
    const rulesPanel = document.createElement('div');
    rulesPanel.className = 'eac-rules-panel';
    rulesPanel.innerHTML = `
        <div class="eac-panel-header">
            <svg viewBox="0 0 24 24"><path d="M6 2h12v2H6V2zm0 4h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2zm10 0h2v6h-2v-6zM4 20h16v2H4v-2z"/></svg>
            <h3>ATURAN EAC</h3>
        </div>
        <div class="eac-rules-content">
            <div class="eac-rules-section">
                <strong><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> Komunitas</strong>
                <ul>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 1. Etika Sopan</li>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 2. No Spam</li>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 3. Saling Berbagi</li>
                </ul>
            </div>
            <div class="eac-rules-section">
                <strong><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Web</strong>
                <ul>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 1. Gunakan untuk Riset</li>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 2. Lapor Bug</li>
                    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> 3. No Re-upload</li>
                </ul>
            </div>
        </div>
        <button class="eac-btn-understand" id="understandRulesBtn">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            SAYA PAHAM
        </button>
    `;
    document.body.appendChild(rulesPanel);
    
    // Event listeners
    const { gearBtn, rulesBtn } = injectHeaderIcons();
    
    gearBtn.addEventListener('click', () => {
        settingsPanel.style.display = 'block';
        backdrop.style.display = 'block';
    });
    
    rulesBtn.addEventListener('click', () => {
        rulesPanel.style.display = 'block';
        backdrop.style.display = 'block';
    });
    
    backdrop.addEventListener('click', () => {
        settingsPanel.style.display = 'none';
        rulesPanel.style.display = 'none';
        backdrop.style.display = 'none';
    });
    
    document.getElementById('understandRulesBtn').addEventListener('click', () => {
        rulesPanel.style.display = 'none';
        backdrop.style.display = 'none';
    });
    
    // SFX Audio
    const sfxCheck = document.getElementById('sfxToggle');
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    sfxCheck.addEventListener('change', (e) => {
        if (e.target.checked) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }
    });
    
    // Fullscreen
    document.getElementById('fullscreenMode').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Text size slider
    document.getElementById('textSizeSlider').addEventListener('input', (e) => {
        document.body.style.fontSize = e.target.value + '%';
    });
    
    // Light mode (simulasi)
    document.getElementById('lightMode').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.style.filter = 'brightness(1.2) contrast(0.9)';
        } else {
            document.body.style.filter = 'none';
        }
    });
}

// Smooth Marquee
function initSmoothMarquee() {
    if (document.querySelector('.eac-smooth-marquee-container')) return;
    
    const container = document.createElement('div');
    container.className = 'eac-smooth-marquee-container';
    
    const marquee = document.createElement('div');
    marquee.className = 'eac-smooth-marquee';
    
    const news = [
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg> Artemis II Siap Luncur Akhir 2026',
        '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> Komet C/2024 E3 Melintas Dekat Bumi',
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg> James Webb Temukan Exoplanet Layak Huni',
        '<svg viewBox="0 0 24 24"><path d="M20 12H4M12 4v16"/></svg> Starship Uji Terbang Ke-7 Sukses',
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg> Saturnus Tampak Paling Terang Bulan Ini'
    ];
    
    let content = '';
    for (let i = 0; i < 8; i++) {
        content += `<span>${news[i % news.length]}</span> <span class="eac-marquee-separator">✦</span> `;
    }
    marquee.innerHTML = content + content;
    container.appendChild(marquee);
    
    const nasaCard = document.querySelector('.nasa-card');
    if (nasaCard) {
        nasaCard.insertAdjacentElement('afterend', container);
    } else {
        const header = document.querySelector('.header-section');
        if (header) {
            header.insertAdjacentElement('afterend', container);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }
}

// Jalankan setelah DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPanels);
} else {
    buildPanels();
}

// Override fungsi goto untuk tidak mengganggu loader baru
const originalGoto = window.goto;
window.goto = function(url, target) {
    // Reset session storage agar loader muncul lagi di halaman baru
    sessionStorage.removeItem('eac_new_loader_shown');
    if (originalGoto) {
        originalGoto(url, target);
    } else {
        window.location.href = url;
    }
};