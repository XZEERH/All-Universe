/* ============================================================
   EAC EXTENSION LOGIC — ext_logic.js (ROMBAK TOTAL)
   - IIFE + try/catch di setiap blok
   - DOMContentLoaded sebagai entry point utama
   - Failsafe 5 detik: portal PASTI nyala
   - Tidak ada window.onload
   - Minimal manipulasi style langsung (pakai class)
   ============================================================ */

(function () {
    'use strict';

    /* ── KONSTANTA ─────────────────────────────────────────────── */
    var PROGRESS_DURATION = 2800; // ms
    var FAILSAFE_TIMEOUT  = 5000; // ms — portal PAKSA tampil
    var _failsafeTimer    = null;
    var _sequenceDone     = false;

    /* ── UTILITY: Paksa tampilkan portal (failsafe) ─────────────── */
    function forceShowPortal() {
        if (_sequenceDone) return;
        _sequenceDone = true;

        try {
            var loader = document.getElementById('loading-screen');
            var welcome = document.getElementById('ext_welcome_screen');
            var portal  = document.getElementById('portal-content');

            if (loader)  { loader.className = '';  loader.style.cssText  = 'display:none!important'; }
            if (welcome) { welcome.style.cssText = 'display:none!important'; }
            if (portal)  { portal.style.cssText  = 'display:block!important'; }

            if (typeof revealCards === 'function') revealCards();
            ext_startMarquee();
        } catch (e) {
            // Worst case: paksa tampil portal via brute force
            var p = document.getElementById('portal-content');
            if (p) p.style.cssText = 'display:block!important';
        }
    }

    /* ── PROGRESS BAR ───────────────────────────────────────────── */
    function ext_runProgress(onComplete) {
        try {
            var fill    = document.getElementById('ext_progress_fill');
            var percent = document.getElementById('ext_percent_text');

            if (!fill || !percent) { onComplete && onComplete(); return; }

            var current  = 0;
            var interval = 28;
            var step     = 100 / (PROGRESS_DURATION / interval);

            var timer = setInterval(function () {
                try {
                    current = Math.min(current + step, 100);
                    var val = Math.floor(current);

                    fill.style.width    = val + '%';
                    percent.textContent = val + '%';

                    if (val >= 100) {
                        clearInterval(timer);
                        fill.classList.add('ext_done');
                        percent.classList.add('ext_done');
                        setTimeout(function () {
                            onComplete && onComplete();
                        }, 300);
                    }
                } catch (e) { clearInterval(timer); onComplete && onComplete(); }
            }, interval);

        } catch (e) { onComplete && onComplete(); }
    }

    /* ── WELCOME SCREEN ─────────────────────────────────────────── */
    function ext_showWelcome(onComplete) {
        try {
            var screen = document.getElementById('ext_welcome_screen');
            if (!screen) { onComplete && onComplete(); return; }

            screen.classList.add('ext_visible');

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    screen.classList.add('ext_show');
                });
            });

            setTimeout(function () {
                try {
                    screen.classList.remove('ext_show');
                    screen.classList.add('ext_fadeout');
                    setTimeout(function () {
                        screen.style.display = 'none';
                        onComplete && onComplete();
                    }, 550);
                } catch (e) { onComplete && onComplete(); }
            }, 1800);

        } catch (e) { onComplete && onComplete(); }
    }

    /* ── SEQUENCE UTAMA ─────────────────────────────────────────── */
    function ext_runSequence() {
        if (_sequenceDone) return;

        try {
            var loader = document.getElementById('loading-screen');
            var status = document.getElementById('load-status');

            // Sembunyikan teks lama dari script.js
            if (status) status.style.display = 'none';

            // Jalankan progress bar
            ext_runProgress(function () {
                try {
                    // Fade out loader via class
                    if (loader) loader.classList.add('ext_loader_fadeout');

                    setTimeout(function () {
                        try {
                            if (loader) loader.style.display = 'none';

                            // Tampilkan welcome
                            ext_showWelcome(function () {
                                if (_sequenceDone) return;
                                _sequenceDone = true;
                                clearTimeout(_failsafeTimer);

                                try {
                                    var portal = document.getElementById('portal-content');
                                    if (portal) portal.style.display = 'block';

                                    if (typeof revealCards === 'function') revealCards();

                                    ext_showNotif('Sistem Aktif',   0);
                                    ext_showNotif('Halaman Stabil', 750);
                                    ext_startMarquee();
                                } catch (e) { forceShowPortal(); }
                            });

                        } catch (e) { forceShowPortal(); }
                    }, 580);

                } catch (e) { forceShowPortal(); }
            });

        } catch (e) { forceShowPortal(); }
    }

    /* ── PATCH goto() ───────────────────────────────────────────── */
    window.goto = function (url, target) {
        try {
            var loader  = document.getElementById('loading-screen');
            var fill    = document.getElementById('ext_progress_fill');
            var percent = document.getElementById('ext_percent_text');
            var status  = document.getElementById('load-status');

            // Reset state
            if (fill)    { fill.style.width = '0%'; fill.classList.remove('ext_done'); }
            if (percent) { percent.textContent = '0%'; percent.classList.remove('ext_done'); }
            if (status)  { status.style.display = 'none'; }

            if (loader) {
                loader.classList.remove('ext_loader_fadeout');
                loader.style.display = 'flex';
                // Force reflow agar class benar-benar hilang
                void loader.offsetWidth;
            }

            ext_runProgress(function () {
                setTimeout(function () {
                    window.location.href = url;
                }, 300);
            });

        } catch (e) {
            window.location.href = url; // Fallback langsung pindah
        }
    };

    /* ── ENTRY POINT: DOMContentLoaded ─────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {

        /* Failsafe 5 detik — portal PASTI nyala */
        _failsafeTimer = setTimeout(function () {
            console.warn('[EAC-EXT] Failsafe triggered — memaksa tampil portal.');
            forceShowPortal();
        }, FAILSAFE_TIMEOUT);

        /* Intersep event 'load' dari script.js agar tidak konflik.
           Caranya: sembunyikan loader sebelum script.js sempat menampilkan portal,
           lalu biarkan ext_runSequence yang menjadi satu-satunya pengendali. */
        try {
            var loader = document.getElementById('loading-screen');
            if (loader) {
                // Pastikan loader full-screen & terlihat
                loader.style.cssText = [
                    'position:fixed',
                    'top:0', 'left:0',
                    'width:100%', 'height:100%',
                    'background:#0b0b0f',
                    'display:flex',
                    'flex-direction:column',
                    'justify-content:center',
                    'align-items:center',
                    'z-index:99999',
                    'opacity:1'
                ].join('!important;') + '!important';
            }
        } catch (e) {}

        /* Jalankan sekuens setelah semua skrip siap */
        setTimeout(ext_runSequence, 50);

        /* ── SETTINGS & RULES LISTENERS ──────────────────────── */
        try {
            document.getElementById('ext_settings_overlay')
                ?.addEventListener('click', ext_closeSettings);
            document.getElementById('ext_rules_overlay')
                ?.addEventListener('click', ext_closeRules);
        } catch (e) {}

        try {
            document.getElementById('ext_toggle_fullscreen')
                ?.addEventListener('change', function () {
                    if (this.checked) document.documentElement.requestFullscreen?.();
                    else document.exitFullscreen?.();
                });
        } catch (e) {}

        try {
            var ambientAudio = document.getElementById('ext_ambient_audio');
            document.getElementById('ext_toggle_ambient')
                ?.addEventListener('change', function () {
                    if (this.checked) ambientAudio?.play().catch(function(){});
                    else ambientAudio?.pause();
                });
        } catch (e) {}

        try {
            var sfxAudio = document.getElementById('ext_sfx_audio');
            document.getElementById('ext_toggle_sfx')
                ?.addEventListener('change', function () {
                    if (this.checked && sfxAudio) {
                        sfxAudio.currentTime = 0;
                        sfxAudio.play().catch(function(){});
                    }
                });
        } catch (e) {}

        try {
            document.getElementById('ext_toggle_light')
                ?.addEventListener('change', function () {
                    document.body.classList.toggle('ext_light', this.checked);
                });
        } catch (e) {}

        try {
            document.getElementById('ext_toggle_power')
                ?.addEventListener('change', function () {
                    document.body.classList.toggle('ext_power_saver', this.checked);
                });
        } catch (e) {}

        try {
            document.getElementById('ext_toggle_anim')
                ?.addEventListener('change', function () {
                    document.body.classList.toggle('ext_no_anim', this.checked);
                });
        } catch (e) {}

        try {
            var sliderText  = document.getElementById('ext_slider_text');
            var sliderLabel = document.getElementById('ext_slider_label');
            sliderText?.addEventListener('input', function () {
                document.documentElement.style.fontSize = this.value + 'px';
                if (sliderLabel) sliderLabel.textContent = this.value + 'px';
            });
        } catch (e) {}

        try {
            var battEl = document.getElementById('ext_battery_val');
            if (battEl && navigator.getBattery) {
                navigator.getBattery().then(function (batt) {
                    var update = function () {
                        battEl.textContent = Math.round(batt.level * 100) + '%';
                    };
                    update();
                    batt.addEventListener('levelchange', update);
                }).catch(function () { if (battEl) battEl.textContent = 'N/A'; });
            } else if (battEl) {
                battEl.textContent = 'N/A';
            }
        } catch (e) {}

    }); // end DOMContentLoaded

})(); // end IIFE


/* ── FUNGSI GLOBAL (dipanggil dari HTML onclick) ─────────────────── */

function ext_showNotif(message, delay) {
    setTimeout(function () {
        try {
            var stack = document.getElementById('ext_notif_stack');
            if (!stack) return;

            var notif = document.createElement('div');
            notif.className   = 'ext_notif';
            notif.textContent = '● ' + message.toUpperCase();
            stack.appendChild(notif);

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    notif.classList.add('ext_show');
                });
            });

            setTimeout(function () {
                notif.classList.remove('ext_show');
                setTimeout(function () { notif.remove(); }, 450);
            }, 2800);
        } catch (e) {}
    }, delay || 0);
}

function ext_openSettings() {
    try {
        document.getElementById('ext_settings_overlay').classList.add('ext_visible');
        document.getElementById('ext_settings_panel').classList.add('ext_visible');
    } catch (e) {}
}

function ext_closeSettings() {
    try {
        document.getElementById('ext_settings_overlay').classList.remove('ext_visible');
        document.getElementById('ext_settings_panel').classList.remove('ext_visible');
    } catch (e) {}
}

function ext_openRules() {
    try {
        document.getElementById('ext_rules_overlay').classList.add('ext_visible');
        document.getElementById('ext_rules_panel').classList.add('ext_visible');
    } catch (e) {}
}

function ext_closeRules() {
    try {
        document.getElementById('ext_rules_overlay').classList.remove('ext_visible');
        document.getElementById('ext_rules_panel').classList.remove('ext_visible');
    } catch (e) {}
}

function ext_startMarquee() {
    try {
        var track = document.getElementById('ext_marquee_track');
        if (!track) return;

        var items = [
            'Selamat datang di portal EAC',
            'Nikmatin fitur yang tersedia disini',
            'Akses pengelolaan pusat informasi astro',
            'James Webb deteksi atmosfer baru di exoplanet K2-18b',
            'NASA konfirmasi air es di kutub selatan Bulan',
            'Parker Solar Probe cetak rekor pendekatan terdekat ke Matahari',
            'Artemis II dijadwalkan mengorbit Bulan bersama kru manusia',
            'Teleskop Hubble abadikan galaksi spiral baru di rasi Virgo',
            'Mars Perseverance kumpulkan sampel batuan kuno terbaru',
            'Fenomena Aurora langka terlihat hingga garis khatulistiwa',
        ];

        var doubled = items.concat(items);
        track.innerHTML = doubled.map(function (t) {
            return '<span class="ext_marquee_item"><span class="ext_marquee_dot">◈</span>' + t + '</span>';
        }).join('');
    } catch (e) {}
}