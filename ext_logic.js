/* ============================================
   EAC EXTENSION LOGIC — ext_logic.js (FIXED)
   Logika murni, tidak ada innerHTML masif.
   Override load sequence & goto() dari script.js
   ============================================ */

(function () {

    /* ── PROGRESS BAR ─────────────────────────────────────────── */
    function ext_runProgress(onComplete) {
        const fill    = document.getElementById('ext_progress_fill');
        const percent = document.getElementById('ext_percent_text');
        if (!fill || !percent) { onComplete && onComplete(); return; }

        let current = 0;
        const interval  = 28;          // ms per tick
        const totalTime = 2700;        // ms to reach 100%
        const step = 100 / (totalTime / interval);

        const timer = setInterval(() => {
            current = Math.min(current + step, 100);
            const val = Math.floor(current);

            fill.style.width   = val + '%';
            percent.textContent = val + '%';

            if (val >= 100) {
                clearInterval(timer);
                fill.classList.add('ext_done');
                percent.classList.add('ext_done');
                setTimeout(() => onComplete && onComplete(), 350);
            }
        }, interval);
    }

    /* ── WELCOME INTERSTITIAL ─────────────────────────────────── */
    function ext_showWelcome(onComplete) {
        const screen = document.getElementById('ext_welcome_screen');
        if (!screen) { onComplete && onComplete(); return; }

        screen.classList.add('ext_visible');
        // Tunda sedikit agar transisi opacity bisa terpicu
        requestAnimationFrame(() => {
            requestAnimationFrame(() => screen.classList.add('ext_show'));
        });

        // Setelah 1.8 detik, fade out
        setTimeout(() => {
            screen.classList.remove('ext_show');
            screen.style.opacity = '0';
            setTimeout(() => {
                screen.style.display = 'none';
                onComplete && onComplete();
            }, 550);
        }, 1800);
    }

    /* ── MAIN LOAD SEQUENCE (override script.js load listener) ── */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-screen');
        const status = document.getElementById('load-status');

        // Sembunyikan teks lama — progress bar yang memimpin
        if (status) status.style.display = 'none';

        ext_runProgress(() => {
            // Fade out loading screen
            loader.style.transition = 'opacity 0.55s ease';
            loader.style.opacity    = '0';

            setTimeout(() => {
                loader.style.display = 'none';

                // Tampilkan welcome interstitial
                ext_showWelcome(() => {
                    const portal = document.getElementById('portal-content');
                    if (portal) {
                        portal.style.display = 'block';
                        // Trigger revealCards dari script.js
                        if (typeof revealCards === 'function') revealCards();
                    }

                    // Notifikasi sukses
                    ext_showNotif('Sistem Aktif',   0);
                    ext_showNotif('Halaman Stabil', 750);

                    // Mulai marquee
                    ext_startMarquee();
                });

            }, 580);
        });
    });

    /* ── PATCH goto() ─────────────────────────────────────────── */
    window.goto = function (url, target) {
        const loader  = document.getElementById('loading-screen');
        const fill    = document.getElementById('ext_progress_fill');
        const percent = document.getElementById('ext_percent_text');
        const status  = document.getElementById('load-status');

        // Reset progress
        if (fill)    { fill.style.width = '0%'; fill.classList.remove('ext_done'); }
        if (percent) { percent.textContent = '0%'; percent.classList.remove('ext_done'); }
        if (status)  { status.style.display = 'none'; }

        // Tampilkan loader
        loader.style.transition = 'none';
        loader.style.opacity    = '1';
        loader.style.display    = 'flex';

        ext_runProgress(() => {
            setTimeout(() => { window.location.href = url; }, 300);
        });
    };

})();

/* ── NOTIFICATIONS ────────────────────────────────────────────────── */
function ext_showNotif(message, delay) {
    setTimeout(() => {
        const stack = document.getElementById('ext_notif_stack');
        if (!stack) return;

        const notif = document.createElement('div');
        notif.className   = 'ext_notif';
        notif.textContent = '● ' + message.toUpperCase();
        stack.appendChild(notif);

        // Double rAF untuk memastikan transisi berjalan
        requestAnimationFrame(() => {
            requestAnimationFrame(() => notif.classList.add('ext_show'));
        });

        setTimeout(() => {
            notif.classList.remove('ext_show');
            setTimeout(() => notif.remove(), 450);
        }, 2800);
    }, delay);
}

/* ── SETTINGS ─────────────────────────────────────────────────────── */
function ext_openSettings() {
    document.getElementById('ext_settings_overlay').classList.add('ext_visible');
    document.getElementById('ext_settings_panel').classList.add('ext_visible');
}

function ext_closeSettings() {
    document.getElementById('ext_settings_overlay').classList.remove('ext_visible');
    document.getElementById('ext_settings_panel').classList.remove('ext_visible');
}

/* ── RULES ────────────────────────────────────────────────────────── */
function ext_openRules() {
    document.getElementById('ext_rules_overlay').classList.add('ext_visible');
    document.getElementById('ext_rules_panel').classList.add('ext_visible');
}

function ext_closeRules() {
    document.getElementById('ext_rules_overlay').classList.remove('ext_visible');
    document.getElementById('ext_rules_panel').classList.remove('ext_visible');
}

/* ── MARQUEE ──────────────────────────────────────────────────────── */
function ext_startMarquee() {
    const track = document.getElementById('ext_marquee_track');
    if (!track) return;

    const items = [
        'Selamat datang di portal EAC • Nikmatin fitur yang tersedia disini • Akses kelola pusat untuk mendapatkan informasi • EAC pusat informasi',
    ];

    // Duplikat untuk efek seamless loop
    const doubled = [...items, ...items];
    track.innerHTML = doubled
        .map(t => `<span class="ext_marquee_item"><span class="ext_marquee_dot">◈</span>${t}</span>`)
        .join('');
}

/* ── EVENT LISTENERS (setelah DOM ready) ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    // Overlay menutup panel saat diklik
    document.getElementById('ext_settings_overlay')
        ?.addEventListener('click', ext_closeSettings);
    document.getElementById('ext_rules_overlay')
        ?.addEventListener('click', ext_closeRules);

    // Fullscreen
    document.getElementById('ext_toggle_fullscreen')
        ?.addEventListener('change', function () {
            if (this.checked) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });

    // Ambient audio
    const ambientAudio = document.getElementById('ext_ambient_audio');
    document.getElementById('ext_toggle_ambient')
        ?.addEventListener('change', function () {
            if (this.checked) ambientAudio?.play().catch(() => {});
            else ambientAudio?.pause();
        });

    // SFX
    const sfxAudio = document.getElementById('ext_sfx_audio');
    document.getElementById('ext_toggle_sfx')
        ?.addEventListener('change', function () {
            if (this.checked) {
                if (sfxAudio) { sfxAudio.currentTime = 0; sfxAudio.play().catch(() => {}); }
            }
        });

    // Light mode
    document.getElementById('ext_toggle_light')
        ?.addEventListener('change', function () {
            document.body.classList.toggle('ext_light', this.checked);
        });

    // Power saver
    document.getElementById('ext_toggle_power')
        ?.addEventListener('change', function () {
            document.body.classList.toggle('ext_power_saver', this.checked);
        });

    // No animation
    document.getElementById('ext_toggle_anim')
        ?.addEventListener('change', function () {
            document.body.classList.toggle('ext_no_anim', this.checked);
        });

    // Text size slider
    const sliderText  = document.getElementById('ext_slider_text');
    const sliderLabel = document.getElementById('ext_slider_label');
    sliderText?.addEventListener('input', function () {
        document.documentElement.style.fontSize = this.value + 'px';
        if (sliderLabel) sliderLabel.textContent = this.value + 'px';
    });

    // Battery API
    const battEl = document.getElementById('ext_battery_val');
    if (battEl && navigator.getBattery) {
        navigator.getBattery().then(batt => {
            const update = () => battEl.textContent = Math.round(batt.level * 100) + '%';
            update();
            batt.addEventListener('levelchange', update);
        }).catch(() => { if (battEl) battEl.textContent = 'N/A'; });
    } else if (battEl) {
        battEl.textContent = 'N/A';
    }

});