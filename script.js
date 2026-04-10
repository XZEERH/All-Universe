/* ============================================
   EAC EXTENSION LOGIC — ext_logic.js
   Hanya kontrol logika & trigger animasi.
   Semua HTML sudah ada di index.html.
   ============================================ */

// ─── OVERRIDE: Intercept loading screen dari script.js ───────────────────────
// Kita override window.addEventListener 'load' dengan sekuens baru (4 detik)
// Fungsi goto() juga di-patch agar menggunakan durasi baru

(function () {

    // ─── PROGRESS BAR LOGIC ─────────────────────────────────────────────────
    function ext_runProgress(onComplete) {
        const fill = document.getElementById('ext_progress_fill');
        const percent = document.getElementById('ext_percent_text');
        if (!fill || !percent) { onComplete && onComplete(); return; }

        let current = 0;
        const total = 100;
        const duration = 2800; // ms untuk mencapai 100%
        const interval = 30;
        const step = (total / (duration / interval));

        const timer = setInterval(() => {
            current = Math.min(current + step, total);
            const rounded = Math.floor(current);
            fill.style.width = rounded + '%';
            percent.textContent = rounded + '%';

            if (rounded >= 100) {
                clearInterval(timer);
                fill.classList.add('ext_done');
                percent.classList.add('ext_done');
                setTimeout(() => onComplete && onComplete(), 300);
            }
        }, interval);
    }

    // ─── WELCOME INTERSTITIAL ────────────────────────────────────────────────
    function ext_showWelcome(onComplete) {
        const screen = document.getElementById('ext_welcome_screen');
        if (!screen) { onComplete && onComplete(); return; }

        screen.classList.add('ext_visible');
        setTimeout(() => screen.classList.add('ext_show'), 50);

        setTimeout(() => {
            screen.style.transition = 'opacity 0.6s ease';
            screen.style.opacity = '0';
            setTimeout(() => {
                screen.style.display = 'none';
                onComplete && onComplete();
            }, 600);
        }, 1800);
    }

    // ─── FULL LOADING SEQUENCE (menggantikan script.js load listener) ────────
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-screen');
        const status = document.getElementById('load-status');

        // Sembunyikan status text lama karena kita pakai progress bar
        if (status) status.style.display = 'none';

        ext_runProgress(() => {
            // Fade out loading screen
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';

                // Tampilkan welcome interstitial
                ext_showWelcome(() => {
                    // Tampilkan portal
                    const portal = document.getElementById('portal-content');
                    if (portal) portal.style.display = 'block';

                    // Trigger reveal cards dari script.js
                    if (typeof revealCards === 'function') revealCards();

                    // Tampilkan notifikasi sukses
                    ext_showNotif('Sistem Aktif', 0);
                    ext_showNotif('Halaman Stabil', 700);

                    // Jalankan marquee
                    ext_startMarquee();
                });
            }, 600);
        });
    });

    // ─── PATCH goto() — tambahkan durasi 4 detik ────────────────────────────
    // Menggantikan goto dari script.js dengan versi yang lebih lama
    window.goto = function (url, target) {
        const loader = document.getElementById('loading-screen');
        const status = document.getElementById('load-status');
        const fill = document.getElementById('ext_progress_fill');
        const percent = document.getElementById('ext_percent_text');

        // Reset progress bar
        if (fill) { fill.style.width = '0%'; fill.classList.remove('ext_done'); }
        if (percent) { percent.textContent = '0%'; percent.classList.remove('ext_done'); }
        if (status) status.style.display = 'none';

        loader.style.display = 'flex';
        loader.style.opacity = '1';

        ext_runProgress(() => {
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        });
    };

})();

// ─── SUCCESS NOTIFICATIONS ────────────────────────────────────────────────────
function ext_showNotif(message, delay) {
    setTimeout(() => {
        const stack = document.getElementById('ext_notif_stack');
        if (!stack) return;

        const notif = document.createElement('div');
        notif.className = 'ext_notif';
        notif.textContent = '● ' + message.toUpperCase();
        stack.appendChild(notif);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => notif.classList.add('ext_show'));
        });

        setTimeout(() => {
            notif.classList.remove('ext_show');
            setTimeout(() => notif.remove(), 500);
        }, 2800);
    }, delay);
}

// ─── SETTINGS PANEL ───────────────────────────────────────────────────────────
function ext_openSettings() {
    document.getElementById('ext_settings_overlay').classList.add('ext_visible');
    document.getElementById('ext_settings_panel').classList.add('ext_visible');
}

function ext_closeSettings() {
    document.getElementById('ext_settings_overlay').classList.remove('ext_visible');
    document.getElementById('ext_settings_panel').classList.remove('ext_visible');
}

document.addEventListener('DOMContentLoaded', () => {

    // Overlay klik tutup settings
    const settingsOverlay = document.getElementById('ext_settings_overlay');
    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', ext_closeSettings);
    }

    // ─── TOGGLE: Layar Penuh ───────────────────────────────────────────────
    const toggleFullscreen = document.getElementById('ext_toggle_fullscreen');
    if (toggleFullscreen) {
        toggleFullscreen.addEventListener('change', () => {
            if (toggleFullscreen.checked) {
                document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen && document.exitFullscreen();
            }
        });
    }

    // ─── TOGGLE: Musik Ambient ─────────────────────────────────────────────
    const ambientAudio = document.getElementById('ext_ambient_audio');
    const toggleAmbient = document.getElementById('ext_toggle_ambient');
    if (toggleAmbient && ambientAudio) {
        toggleAmbient.addEventListener('change', () => {
            if (toggleAmbient.checked) {
                ambientAudio.play().catch(() => {});
            } else {
                ambientAudio.pause();
            }
        });
    }

    // ─── TOGGLE: SFX ──────────────────────────────────────────────────────
    const sfxAudio = document.getElementById('ext_sfx_audio');
    const toggleSFX = document.getElementById('ext_toggle_sfx');
    if (toggleSFX && sfxAudio) {
        toggleSFX.addEventListener('change', () => {
            if (toggleSFX.checked) {
                sfxAudio.currentTime = 0;
                sfxAudio.play().catch(() => {});
            }
        });
    }

    // ─── TOGGLE: Mode Terang ───────────────────────────────────────────────
    const toggleLight = document.getElementById('ext_toggle_light');
    if (toggleLight) {
        toggleLight.addEventListener('change', () => {
            document.body.classList.toggle('ext_light_mode', toggleLight.checked);
        });
    }

    // ─── TOGGLE: Hemat Daya ────────────────────────────────────────────────
    const togglePower = document.getElementById('ext_toggle_power');
    if (togglePower) {
        togglePower.addEventListener('change', () => {
            document.body.classList.toggle('ext_power_saver', togglePower.checked);
        });
    }

    // ─── TOGGLE: Matikan Animasi ────────────────────────────────────────────
    const toggleAnim = document.getElementById('ext_toggle_anim');
    if (toggleAnim) {
        toggleAnim.addEventListener('change', () => {
            document.body.classList.toggle('ext_no_anim', toggleAnim.checked);
        });
    }

    // ─── SLIDER: Ukuran Teks ───────────────────────────────────────────────
    const sliderText = document.getElementById('ext_slider_text');
    const sliderLabel = document.getElementById('ext_slider_label');
    if (sliderText) {
        sliderText.addEventListener('input', () => {
            const val = sliderText.value;
            document.documentElement.style.fontSize = val + 'px';
            if (sliderLabel) sliderLabel.textContent = val + 'px';
        });
    }

    // ─── STATUS DAYA ───────────────────────────────────────────────────────
    const battEl = document.getElementById('ext_battery_val');
    if (battEl && navigator.getBattery) {
        navigator.getBattery().then(batt => {
            battEl.textContent = Math.round(batt.level * 100) + '%';
            batt.addEventListener('levelchange', () => {
                battEl.textContent = Math.round(batt.level * 100) + '%';
            });
        });
    } else if (battEl) {
        battEl.textContent = 'N/A';
    }

});

// ─── RULES PANEL ──────────────────────────────────────────────────────────────
function ext_openRules() {
    document.getElementById('ext_rules_overlay').classList.add('ext_visible');
    document.getElementById('ext_rules_panel').classList.add('ext_visible');
}

function ext_closeRules() {
    document.getElementById('ext_rules_overlay').classList.remove('ext_visible');
    document.getElementById('ext_rules_panel').classList.remove('ext_visible');
}

document.addEventListener('DOMContentLoaded', () => {
    const rulesOverlay = document.getElementById('ext_rules_overlay');
    if (rulesOverlay) {
        rulesOverlay.addEventListener('click', ext_closeRules);
    }
});

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function ext_startMarquee() {
    const track = document.getElementById('ext_marquee_track');
    if (!track) return;

    const items = [
        'Selamat datang di portal EAC • nikmatin fitur yang tersedia disini • Akses pengelola informasi yang lengkap • EAC pusat informasi',
    ];

    // Duplikat agar marquee seamless
    const allItems = [...items, ...items];
    track.innerHTML = allItems.map(text =>
        `<span class="ext_marquee_item"><span>◈</span>${text}</span>`
    ).join('');
}