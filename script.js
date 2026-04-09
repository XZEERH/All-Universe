/* ============================================================
   EXT_LOGIC.JS — EAC PORTAL EXTENSION LAYER
   Berjalan SETELAH script.js | Tidak menimpa logika lama
   ============================================================ */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────
       1. REVAMP LOADING SCREEN
       Mengganti animasi loader lama dengan progress
       bar baru + interstitial WELCOME / ANGKASA
    ───────────────────────────────────────────── */

    // Data marquee astronomi (dipakai juga saat init)
    const EXT_MARQUEE_ITEMS = [
        "James Webb Space Telescope temukan galaksi paling jauh: JADES-GS-z14-0 — 290 juta tahun setelah Big Bang",
        "NASA Artemis III dijadwalkan 2026 — manusia kembali ke Bulan setelah 50 tahun",
        "ESA rilis peta Bima Sakti terbaru dari Gaia DR3 — 1,8 miliar bintang dipetakan",
        "Mars Sample Return Mission masuki fase desain ulang di 2025",
        "Parker Solar Probe capai jarak terdekat dengan Matahari — 6,1 juta km",
        "Teleskop Vera Rubin Observatory mulai survei langit penuh pertama kali",
        "Penemuan exoplanet baru: K2-18b menunjukkan tanda-tanda dimethyl sulfide (DMS) di atmosfernya",
        "ISRO Chandrayaan-4 direncanakan untuk membawa sampel Bulan ke Bumi pada 2027",
        "SpaceX Starship IFT-7 berhasil splash down di Teluk Meksiko",
        "Badai matahari X-class pukul magnetosfer Bumi — aurora terlihat hingga lintang rendah"
    ];

    // Buat elemen WELCOME SCREEN (interstitial)
    function ext_buildWelcomeScreen() {
        if (document.getElementById('ext_welcome_screen')) return;
        const ws = document.createElement('div');
        ws.id = 'ext_welcome_screen';
        ws.innerHTML = `
            <canvas id="ext_star_canvas"></canvas>
            <div class="ext_welcome_word ext_w1" id="ext_ww1">WELCOME</div>
            <div class="ext_welcome_line" id="ext_wline"></div>
            <div class="ext_welcome_word ext_w2" id="ext_ww2">ANGKASA</div>
            <div class="ext_welcome_sub" id="ext_wsub">EAC · PUSAT INFORMASI ASTRONOMI</div>
        `;
        document.body.appendChild(ws);
        ext_initStarCanvas();
    }

    // Starfield canvas animasi
    function ext_initStarCanvas() {
        const canvas = document.getElementById('ext_star_canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let stars = [];
        let raf;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < 140; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.2 + 0.2,
                a: Math.random(),
                speed: Math.random() * 0.4 + 0.1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => {
                s.a += s.speed * 0.01;
                if (s.a > 1) s.a = 0;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${Math.sin(s.a * Math.PI)})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        }
        draw();

        // Simpan raf di element agar bisa dibersihkan
        canvas._stopAnim = () => cancelAnimationFrame(raf);
    }

    // Ganti loading screen lama dengan versi baru
    function ext_overrideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        // Sembunyikan elemen lama di dalam loading screen
        const oldLoader = loadingScreen.querySelector('.premium-loader');
        const oldStatus = document.getElementById('load-status');
        if (oldLoader) oldLoader.style.display = 'none';
        if (oldStatus) oldStatus.style.display = 'none';

        // Inject wrapper baru
        const wrap = document.createElement('div');
        wrap.id = 'ext_loader_wrap';
        wrap.innerHTML = `
            <div id="ext_progress_pct">0%</div>
            <div id="ext_progress_bar_track">
                <div id="ext_progress_bar_fill"></div>
            </div>
            <div id="load-status-ext" style="font-family:'Orbitron',sans-serif;font-size:9px;color:#444;letter-spacing:2px;margin-top:10px;">SYSTEM INITIALIZING</div>
        `;
        loadingScreen.appendChild(wrap);
    }

    // Jalankan progress bar baru (4 detik) lalu welcome
    function ext_runLoadingSequence(onComplete) {
        const fill = document.getElementById('ext_progress_bar_fill');
        const pct = document.getElementById('ext_progress_pct');
        const status = document.getElementById('load-status-ext');
        if (!fill || !pct) { if (onComplete) onComplete(); return; }

        let progress = 0;
        const totalMs = 3200; // 3.2s untuk progress, 0.8s sisanya untuk welcome
        const interval = 40;
        const steps = totalMs / interval;
        const increment = 100 / steps;

        const messages = [
            [0, 'SYSTEM INITIALIZING'],
            [25, 'LOADING MODULES'],
            [50, 'VERIFYING ACCESS'],
            [80, 'SYNCING DATA'],
            [95, 'FINALIZING']
        ];

        const timer = setInterval(() => {
            progress = Math.min(progress + increment, 100);
            const rounded = Math.floor(progress);
            fill.style.width = progress + '%';
            pct.textContent = rounded + '%';
            pct.style.color = progress >= 100 ? '#00ffaa' : '#38bdf8';

            // Status text
            const msg = messages.slice().reverse().find(m => rounded >= m[0]);
            if (msg && status) status.textContent = msg[1];

            if (progress >= 100) {
                clearInterval(timer);
                fill.classList.add('ext_done');
                pct.textContent = '100%';
                if (status) { status.textContent = 'ACCESS GRANTED'; status.style.color = '#00ffaa'; }

                setTimeout(() => {
                    // Sembunyikan loading screen
                    const ls = document.getElementById('loading-screen');
                    if (ls) { ls.style.opacity = '0'; }

                    // Tampilkan welcome interstitial
                    setTimeout(() => {
                        if (ls) ls.style.display = 'none';
                        ext_showWelcome(onComplete);
                    }, 500);
                }, 400);
            }
        }, interval);
    }

    // Interstitial WELCOME ANGKASA
    function ext_showWelcome(onComplete) {
        const ws = document.getElementById('ext_welcome_screen');
        if (!ws) { if (onComplete) onComplete(); return; }

        ws.classList.add('ext_visible');

        const ww1 = document.getElementById('ext_ww1');
        const wline = document.getElementById('ext_wline');
        const ww2 = document.getElementById('ext_ww2');
        const wsub = document.getElementById('ext_wsub');

        // Stagger animations
        setTimeout(() => ww1 && ww1.classList.add('ext_show'), 200);
        setTimeout(() => wline && wline.classList.add('ext_show'), 600);
        setTimeout(() => ww2 && ww2.classList.add('ext_show'), 800);
        setTimeout(() => wsub && wsub.classList.add('ext_show'), 1200);

        // Fade out dan ke portal
        setTimeout(() => {
            ws.style.transition = 'opacity 0.7s ease';
            ws.style.opacity = '0';
            const starCanvas = document.getElementById('ext_star_canvas');
            if (starCanvas && starCanvas._stopAnim) starCanvas._stopAnim();

            setTimeout(() => {
                ws.style.display = 'none';
                if (onComplete) onComplete();
            }, 700);
        }, 2600);
    }

    /* ─────────────────────────────────────────────
       2. SUCCESS NOTIFICATIONS
    ───────────────────────────────────────────── */

    function ext_buildNotifContainer() {
        if (document.getElementById('ext_notif_container')) return;
        const c = document.createElement('div');
        c.id = 'ext_notif_container';
        document.body.appendChild(c);
    }

    function ext_showNotif(text, delay) {
        setTimeout(() => {
            const container = document.getElementById('ext_notif_container');
            if (!container) return;
            const n = document.createElement('div');
            n.className = 'ext_notif';
            n.innerHTML = `<div class="ext_notif_dot"></div>${text}`;
            container.appendChild(n);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => n.classList.add('ext_show'));
            });

            setTimeout(() => {
                n.classList.add('ext_hide');
                setTimeout(() => n.remove(), 400);
            }, 2800);
        }, delay);
    }

    function ext_showPortalNotifs() {
        ext_showNotif('SISTEM AKTIF', 400);
        ext_showNotif('HALAMAN STABIL', 1400);
    }

    /* ─────────────────────────────────────────────
       3. SETTINGS PANEL
    ───────────────────────────────────────────── */

    const EXT_SETTINGS_STATE = {
        fullscreen: false,
        music: false,
        lightMode: false,
        sfx: true,
        powerSave: false,
        noAnim: false,
        textSize: 14
    };

    function ext_buildSettingsPanel() {
        if (document.getElementById('ext_settings_overlay')) return;

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'ext_settings_overlay';
        overlay.onclick = ext_closeSettings;
        document.body.appendChild(overlay);

        // Panel
        const panel = document.createElement('div');
        panel.id = 'ext_settings_panel';
        panel.onclick = e => e.stopPropagation();
        panel.innerHTML = `
            <div class="ext_panel_handle"></div>
            <div class="ext_panel_title">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                PENGATURAN SISTEM
            </div>

            <div class="ext_settings_grid">

                <div class="ext_setting_item">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">LAYAR PENUH</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_fullscreen" onchange="extToggleFullscreen(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">MUSIK AMBIENT</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_music" onchange="extToggleMusic(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item">
                    <div class="ext_setting_label">STATUS DAYA</div>
                    <div class="ext_setting_value" style="color:#00ffaa;">⚡ 49%</div>
                </div>

                <div class="ext_setting_item">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">MODE TERANG</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_light" onchange="extToggleLight(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">SFX</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_sfx" checked onchange="extToggleSFX(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">HEMAT DAYA</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_power" onchange="extTogglePower(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item" style="grid-column:1/-1;">
                    <div class="ext_toggle_row">
                        <div class="ext_setting_label">MATIKAN ANIMASI</div>
                        <label class="ext_toggle">
                            <input type="checkbox" id="ext_s_anim" onchange="extToggleAnim(this)">
                            <span class="ext_toggle_slider"></span>
                        </label>
                    </div>
                </div>

                <div class="ext_setting_item ext_full">
                    <div class="ext_setting_label">UKURAN TEKS — <span id="ext_textsize_val">14</span>px</div>
                    <input type="range" class="ext_range_slider" id="ext_s_textsize"
                        min="12" max="20" value="14"
                        oninput="extChangeTextSize(this.value)">
                </div>

            </div>

            <div class="ext_close_btn" onclick="ext_closeSettings()">TUTUP PANEL</div>
        `;
        document.body.appendChild(panel);
    }

    function ext_openSettings() {
        document.getElementById('ext_settings_overlay').classList.add('ext_open');
        document.getElementById('ext_settings_panel').classList.add('ext_open');
    }

    function ext_closeSettings() {
        document.getElementById('ext_settings_overlay').classList.remove('ext_open');
        document.getElementById('ext_settings_panel').classList.remove('ext_open');
    }

    // Settings toggle handlers (global scope)
    window.extToggleFullscreen = function(el) {
        if (el.checked) {
            document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen && document.exitFullscreen();
        }
    };

    window.extToggleMusic = function(el) {
        if (el.checked) {
            if (!window._extAmbient) {
                // Oscillator-based ambient tone (tidak butuh file audio)
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = 60;
                    gain.gain.value = 0.04;
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    window._extAmbient = { ctx, osc, gain };
                } catch(e) {}
            }
        } else {
            if (window._extAmbient) {
                try { window._extAmbient.osc.stop(); window._extAmbient.ctx.close(); } catch(e) {}
                window._extAmbient = null;
            }
        }
    };

    window.extToggleLight = function(el) {
        document.body.classList.toggle('ext_light_mode', el.checked);
    };

    window.extToggleSFX = function(el) {
        EXT_SETTINGS_STATE.sfx = el.checked;
    };

    window.extTogglePower = function(el) {
        document.body.classList.toggle('ext_power_save', el.checked);
    };

    window.extToggleAnim = function(el) {
        document.body.classList.toggle('ext_no_anim', el.checked);
    };

    window.extChangeTextSize = function(val) {
        document.body.style.fontSize = val + 'px';
        const lbl = document.getElementById('ext_textsize_val');
        if (lbl) lbl.textContent = val;
    };

    // Expose close untuk HTML onclick
    window.ext_closeSettings = ext_closeSettings;
    window.ext_openSettings = ext_openSettings;

    /* ─────────────────────────────────────────────
       4. RULES / ATURAN EAC PANEL
    ───────────────────────────────────────────── */

    function ext_buildRulesPanel() {
        if (document.getElementById('ext_rules_overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'ext_rules_overlay';
        overlay.onclick = ext_closeRules;
        document.body.appendChild(overlay);

        const panel = document.createElement('div');
        panel.id = 'ext_rules_panel';
        panel.onclick = e => e.stopPropagation();
        panel.innerHTML = `
            <div class="ext_panel_handle"></div>
            <div class="ext_panel_title">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                ATURAN EAC
            </div>

            <div class="ext_rules_section">
                <div class="ext_rules_category">◆ KOMUNITAS</div>
                <div class="ext_rules_list">
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">01</span>
                        Jaga Etika — Hormati sesama anggota & jaga sopan santun di seluruh platform EAC.
                    </div>
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">02</span>
                        No Spam — Dilarang mengirim pesan/konten berulang yang mengganggu kenyamanan komunitas.
                    </div>
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">03</span>
                        Saling Berbagi Ilmu — Budayakan berbagi pengetahuan astronomi & sains untuk kemajuan bersama.
                    </div>
                </div>
            </div>

            <div class="ext_rules_section">
                <div class="ext_rules_category">◆ PENGGUNAAN WEB</div>
                <div class="ext_rules_list">
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">01</span>
                        Gunakan Bijak — Portal ini hanya untuk keperluan edukasi dan informasi resmi EAC.
                    </div>
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">02</span>
                        Lapor Bug ke Admin — Temukan bug? Segera hubungi admin melalui tombol "Hubungi Admin".
                    </div>
                    <div class="ext_rule_item">
                        <span class="ext_rule_num">03</span>
                        Dilarang Re-upload Asset — Aset visual & kode portal EAC tidak boleh digunakan ulang tanpa izin resmi.
                    </div>
                </div>
            </div>

            <div class="ext_rules_btns">
                <button class="ext_btn_close" onclick="ext_closeRules()">TUTUP PANEL</button>
                <button class="ext_btn_agree" onclick="ext_agreeRules()">SAYA PAHAM</button>
            </div>
        `;
        document.body.appendChild(panel);
    }

    function ext_openRules() {
        document.getElementById('ext_rules_overlay').classList.add('ext_open');
        document.getElementById('ext_rules_panel').classList.add('ext_open');
    }

    function ext_closeRules() {
        document.getElementById('ext_rules_overlay').classList.remove('ext_open');
        document.getElementById('ext_rules_panel').classList.remove('ext_open');
    }

    function ext_agreeRules() {
        ext_closeRules();
        ext_showNotif('ATURAN DISETUJUI ✓', 200);
    }

    window.ext_openRules = ext_openRules;
    window.ext_closeRules = ext_closeRules;
    window.ext_agreeRules = ext_agreeRules;

    /* ─────────────────────────────────────────────
       5. INJECT ICONS KE STATUS CAPSULE & MINI-STATUS
    ───────────────────────────────────────────── */

    function ext_injectIcons() {
        // Gear icon di sebelah status-capsule
        const capsule = document.querySelector('.status-capsule');
        if (capsule && !document.getElementById('ext_settings_btn')) {
            const gear = document.createElement('span');
            gear.id = 'ext_settings_btn';
            gear.title = 'Pengaturan';
            gear.onclick = ext_openSettings;
            gear.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
            capsule.insertAdjacentElement('afterend', gear);
        }

        // Document/rules icon di mini-status
        const miniStatus = document.querySelector('.mini-status');
        if (miniStatus && !document.getElementById('ext_rules_btn')) {
            const docBtn = document.createElement('span');
            docBtn.id = 'ext_rules_btn';
            docBtn.title = 'Aturan EAC';
            docBtn.onclick = ext_openRules;
            docBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
            miniStatus.appendChild(docBtn);
        }
    }

    /* ─────────────────────────────────────────────
       6. MARQUEE BAR
    ───────────────────────────────────────────── */

    function ext_buildMarquee() {
        if (document.getElementById('ext_marquee_bar')) return;

        const bar = document.createElement('div');
        bar.id = 'ext_marquee_bar';

        // Duplikat item untuk infinite loop seamless
        const allItems = [...EXT_MARQUEE_ITEMS, ...EXT_MARQUEE_ITEMS];
        const itemsHTML = allItems.map(t => `<div class="ext_marquee_item">${t}</div>`).join('');

        bar.innerHTML = `
            <div class="ext_marquee_track">
                <div class="ext_marquee_inner">${itemsHTML}</div>
            </div>
        `;

        // Sisipkan setelah .mini-status
        const miniStatus = document.querySelector('.mini-status');
        if (miniStatus) {
            miniStatus.insertAdjacentElement('afterend', bar);
        } else {
            const cardContainer = document.getElementById('cardContainer');
            if (cardContainer) cardContainer.insertAdjacentElement('beforebegin', bar);
        }
    }

    /* ─────────────────────────────────────────────
       7. OVERRIDE FUNGSI goto() LAMA
       Tambahkan loading screen 4 detik sebagai
       transisi premium sebelum pindah halaman
    ───────────────────────────────────────────── */

    window.goto = function(url, target) {
        const loader = document.getElementById('loading-screen');
        const oldStatus = document.getElementById('load-status');
        const extStatus = document.getElementById('load-status-ext');
        const fill = document.getElementById('ext_progress_bar_fill');
        const pct = document.getElementById('ext_progress_pct');

        // Reset progress bar
        if (fill) { fill.style.width = '0%'; fill.classList.remove('ext_done'); }
        if (pct) { pct.textContent = '0%'; pct.style.color = '#38bdf8'; }
        if (oldStatus) oldStatus.style.display = 'none';
        if (extStatus) { extStatus.textContent = 'CONNECTING TO ' + target.toUpperCase(); extStatus.style.color = '#444'; }

        // Tampilkan loading screen
        if (loader) { loader.style.display = 'flex'; loader.style.opacity = '1'; }

        // Jalankan progress bar 4 detik lalu redirect
        let progress = 0;
        const totalMs = 3400;
        const interval = 40;
        const steps = totalMs / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            progress = Math.min(progress + increment, 100);
            const rounded = Math.floor(progress);
            if (fill) fill.style.width = progress + '%';
            if (pct) { pct.textContent = rounded + '%'; pct.style.color = progress >= 100 ? '#00ffaa' : '#38bdf8'; }

            if (progress >= 100) {
                clearInterval(timer);
                if (fill) fill.classList.add('ext_done');
                if (extStatus) { extStatus.textContent = 'ACCESS GRANTED → ' + target.toUpperCase(); extStatus.style.color = '#00ffaa'; }
                setTimeout(() => { window.location.href = url; }, 500);
            }
        }, interval);
    };

    /* ─────────────────────────────────────────────
       8. INISIALISASI UTAMA
    ───────────────────────────────────────────── */

    function ext_init() {
        // Build semua elemen
        ext_buildWelcomeScreen();
        ext_buildNotifContainer();
        ext_buildSettingsPanel();
        ext_buildRulesPanel();

        // Override loading screen visual
        ext_overrideLoadingScreen();

        // Intercept window.load — jalankan sequence baru
        // (Kita hapus pendengar lama jika belum terlambat,
        //  kalau sudah load, kita trigger manual via MutationObserver)
        const portalContent = document.getElementById('portal-content');

        // Gunakan MutationObserver untuk tahu kapan portal-content muncul
        // (script.js yang tampilkan portal-content, kita observe itu)
        let alreadyObserved = false;

        function onPortalVisible() {
            if (alreadyObserved) return;
            alreadyObserved = true;

            ext_injectIcons();
            ext_buildMarquee();
            ext_showPortalNotifs();
        }

        // Observer untuk portal-content display change
        const observer = new MutationObserver(() => {
            const pc = document.getElementById('portal-content');
            if (pc && pc.style.display !== 'none' && pc.style.display !== '') {
                observer.disconnect();
                onPortalVisible();
            }
        });

        observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });

        // Fallback: jika portal sudah visible
        if (portalContent && portalContent.style.display !== 'none' && portalContent.style.display !== '') {
            observer.disconnect();
            onPortalVisible();
        }

        // Override fungsi revealCards dari script.js (patching agar marquee ikut terlihat)
        // Tidak diperlukan — hanya pastikan marquee ada sebelum revealCards pertama
    }

    // Override window.load untuk inject sequence baru
    // Kita wrap: tunggu DOMContentLoaded untuk setup, lalu intercept load event
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ext_init);
    } else {
        ext_init();
    }

    // Intercept loading sequence: jalankan progress bar kita
    // sebelum script.js sempat hide loading screen
    window.addEventListener('load', function ext_loadHandler() {
        window.removeEventListener('load', ext_loadHandler);

        // Blok script.js dari hide-nya sendiri dengan temporary override
        // Script.js pakai setTimeout 2000ms + 1000ms = 3000ms total
        // Kita jalankan sequence kita (4 detik) yang akan selesai duluan
        // dan sudah menyembunyikan loading screen sebelum script.js mencoba

        const loader = document.getElementById('loading-screen');

        // Reset: pastikan loader masih terlihat
        if (loader) { loader.style.display = 'flex'; loader.style.opacity = '1'; }

        ext_runLoadingSequence(() => {
            // Setelah welcome selesai, tampilkan portal content
            const portalContent = document.getElementById('portal-content');
            if (portalContent) portalContent.style.display = 'block';

            // Trigger revealCards dari script.js lama
            if (typeof revealCards === 'function') revealCards();
        });
    }, true); // useCapture: true agar berjalan sebelum script.js listener

})();