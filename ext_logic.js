/* ============================================================
   EAC EXTENSION LOGIC — ext_logic.js (FINAL)
   Entry: DOMContentLoaded saja.
   Failsafe 5 detik mutlak.
   Semua transisi via class CSS, bukan style langsung.
   ============================================================ */

(function () {
    'use strict';

    /* ── CONFIG ──────────────────────────────────────────────── */
    var C = {
        progressMs : 2600,
        loaderFade : 1500,
        welcomeMs  : 2300,
        welcomeFade: 850,
        failsafe   : 5000
    };

    var _done    = false;
    var _fsTimer = null;

    /* ── FORCE SHOW (failsafe nuklir) ────────────────────────── */
    function forceShow() {
        if (_done) return;
        _done = true;
        clearTimeout(_fsTimer);
        hide('loading-screen');
        hide('ext_welcome_screen');
        show('portal-content');
        safeCall(function () {
            if (typeof revealCards === 'function') revealCards();
            ext_startMarquee();
        });
    }

    /* ── UTIL ────────────────────────────────────────────────── */
    function el(id) { return document.getElementById(id); }

    function hide(id) {
        try {
            var e = el(id);
            if (e) { e.style.setProperty('display', 'none', 'important'); }
        } catch(x){}
    }

    function show(id) {
        try {
            var e = el(id);
            if (e) e.style.display = 'block';
        } catch(x){}
    }

    function safeCall(fn) { try { fn(); } catch(x){} }

    function addCls(id, cls) {
        safeCall(function() {
            var e = el(id); if (e) e.classList.add(cls);
        });
    }

    function rmCls(id, cls) {
        safeCall(function() {
            var e = el(id); if (e) e.classList.remove(cls);
        });
    }

    /* ── 1. PROGRESS BAR ─────────────────────────────────────── */
    function runProgress(done) {
        try {
            var fill = el('ext_progress_fill');
            var pct  = el('ext_percent_text');
            var txt  = el('ext_init_text');
            if (!fill || !pct) { done(); return; }

            var cur  = 0;
            var tick = 28;
            var step = 100 / (C.progressMs / tick);

            var t = setInterval(function () {
                try {
                    cur = Math.min(cur + step, 100);
                    var v = Math.floor(cur);
                    fill.style.width    = v + '%';
                    pct.textContent     = v + '%';

                    if (v >= 90 && txt && !txt.classList.contains('ext_granted')) {
                        txt.textContent = 'ACCESS GRANTED';
                        txt.classList.add('ext_granted');
                    }

                    if (v >= 100) {
                        clearInterval(t);
                        fill.classList.add('ext_done');
                        pct.classList.add('ext_done');
                        setTimeout(done, 280);
                    }
                } catch(x) { clearInterval(t); done(); }
            }, tick);

        } catch(x) { done(); }
    }

    /* ── 2. FADE LOADER (via CSS class, 1.5 detik) ───────────── */
    function fadeLoader(done) {
        try {
            var loader = el('loading-screen');
            if (!loader) { done(); return; }
            loader.classList.add('ext_fade_out');
            setTimeout(function () {
                loader.style.setProperty('display', 'none', 'important');
                done();
            }, C.loaderFade);
        } catch(x) { done(); }
    }

    /* ── 3. WELCOME SCREEN + TYPING ──────────────────────────── */
    function showWelcome(done) {
        try {
            var scr    = el('ext_welcome_screen');
            var typEl  = scr ? scr.querySelector('.ext_welcome_typing') : null;
            if (!scr) { done(); return; }

            scr.style.display = '';
            /* reflow sebelum transisi */
            void scr.offsetWidth;
            scr.classList.add('ext_visible');

            /* Satu frame lagi untuk trigger fade-up children */
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    scr.classList.add('ext_show');
                });
            });

            /* Typing animation */
            if (typEl) {
                typEl.classList.add('ext_cursor');
                var text = 'EAC ASTRONOMI SYSTEM READY';
                var i = 0;
                typEl.textContent = '';
                var typer = setInterval(function () {
                    typEl.textContent = text.substring(0, i);
                    i++;
                    if (i > text.length) clearInterval(typer);
                }, 58);
            }

            /* Setelah welcomeMs, fade keluar */
            setTimeout(function () {
                try {
                    scr.classList.remove('ext_show');
                    scr.classList.add('ext_fade_out');
                    setTimeout(function () {
                        scr.style.setProperty('display', 'none', 'important');
                        done();
                    }, C.welcomeFade);
                } catch(x) { done(); }
            }, C.welcomeMs);

        } catch(x) { done(); }
    }

    /* ── FULL SEQUENCE ───────────────────────────────────────── */
    function runSequence() {
        if (_done) return;
        try {
            /* Kunci loader agar tidak bisa di-override script.js */
            var loader = el('loading-screen');
            if (loader) {
                loader.style.cssText =
                    'position:fixed!important;top:0!important;left:0!important;' +
                    'width:100vw!important;height:100vh!important;' +
                    'background:#050505!important;' +
                    'display:flex!important;flex-direction:column!important;' +
                    'justify-content:center!important;align-items:center!important;' +
                    'z-index:999999!important;opacity:1;gap:0!important;' +
                    'transition:opacity 1.5s ease;pointer-events:auto!important;';
            }

            /* Sembunyikan teks lama script.js */
            var status = el('load-status');
            if (status) status.style.display = 'none';

            /* Pipeline: progress → fade loader → welcome → portal */
            runProgress(function () {
                fadeLoader(function () {
                    showWelcome(function () {
                        if (_done) return;
                        _done = true;
                        clearTimeout(_fsTimer);

                        show('portal-content');
                        safeCall(function () {
                            if (typeof revealCards === 'function') revealCards();
                        });
                        ext_showNotif('Sistem Aktif',   0);
                        ext_showNotif('Halaman Stabil', 800);
                        ext_startMarquee();
                    });
                });
            });

        } catch(x) { forceShow(); }
    }

    /* ── PATCH goto() ────────────────────────────────────────── */
    window.goto = function (url) {
        try {
            var loader = el('loading-screen');
            var fill   = el('ext_progress_fill');
            var pct    = el('ext_percent_text');
            var txt    = el('ext_init_text');
            var status = el('load-status');

            if (fill)   { fill.style.width = '0%'; fill.classList.remove('ext_done'); }
            if (pct)    { pct.textContent  = '0%'; pct.classList.remove('ext_done'); }
            if (status) { status.style.display = 'none'; }
            if (txt)    {
                txt.textContent = 'SYSTEM INITIALIZING...';
                txt.classList.remove('ext_granted');
            }

            if (loader) {
                loader.classList.remove('ext_fade_out');
                void loader.offsetWidth;  /* force reflow */
                loader.style.cssText =
                    'position:fixed!important;top:0!important;left:0!important;' +
                    'width:100vw!important;height:100vh!important;' +
                    'background:#050505!important;' +
                    'display:flex!important;flex-direction:column!important;' +
                    'justify-content:center!important;align-items:center!important;' +
                    'z-index:999999!important;opacity:1;gap:0!important;' +
                    'transition:opacity 1.5s ease;pointer-events:auto!important;';
            }

            runProgress(function () {
                if (loader) loader.classList.add('ext_fade_out');
                setTimeout(function () {
                    window.location.href = url;
                }, C.loaderFade);
            });

        } catch(x) { window.location.href = url; }
    };

    /* ── DOMCONTENTLOADED — SATU-SATUNYA ENTRY ───────────────── */
    document.addEventListener('DOMContentLoaded', function () {

        /* Failsafe absolut */
        _fsTimer = setTimeout(function () {
            console.warn('[EAC] Failsafe 5s triggered.');
            forceShow();
        }, C.failsafe);

        /* Mulai sequence setelah semua skrip ter-parse */
        setTimeout(runSequence, 50);

        /* ── SETTINGS LISTENERS ─────────────────────────────── */
        safeCall(function () {
            el('ext_settings_overlay')?.addEventListener('click', ext_closeSettings);
            el('ext_rules_overlay')?.addEventListener('click', ext_closeRules);
        });

        var toggleMap = [
            ['ext_toggle_fullscreen', function(on) {
                if (on) document.documentElement.requestFullscreen?.();
                else    document.exitFullscreen?.();
            }],
            ['ext_toggle_light',  function(on) { document.body.classList.toggle('ext_light', on); }],
            ['ext_toggle_power',  function(on) { document.body.classList.toggle('ext_power_saver', on); }],
            ['ext_toggle_anim',   function(on) { document.body.classList.toggle('ext_no_anim', on); }]
        ];

        toggleMap.forEach(function(pair) {
            safeCall(function() {
                el(pair[0])?.addEventListener('change', function() { pair[1](this.checked); });
            });
        });

        safeCall(function() {
            var amb = el('ext_ambient_audio');
            el('ext_toggle_ambient')?.addEventListener('change', function() {
                if (this.checked) amb?.play().catch(function(){});
                else              amb?.pause();
            });
        });

        safeCall(function() {
            var sfx = el('ext_sfx_audio');
            el('ext_toggle_sfx')?.addEventListener('change', function() {
                if (this.checked && sfx) { sfx.currentTime = 0; sfx.play().catch(function(){}); }
            });
        });

        safeCall(function() {
            var sl  = el('ext_slider_text');
            var lbl = el('ext_slider_label');
            sl?.addEventListener('input', function() {
                document.documentElement.style.fontSize = this.value + 'px';
                if (lbl) lbl.textContent = this.value + 'px';
            });
        });

        safeCall(function() {
            var batt = el('ext_battery_val');
            if (batt && navigator.getBattery) {
                navigator.getBattery().then(function(b) {
                    var upd = function() { batt.textContent = Math.round(b.level * 100) + '%'; };
                    upd();
                    b.addEventListener('levelchange', upd);
                }).catch(function() { if (batt) batt.textContent = 'N/A'; });
            } else if (batt) { batt.textContent = 'N/A'; }
        });

    }); // end DOMContentLoaded

})(); // end IIFE


/* ── FUNGSI GLOBAL (dipanggil dari HTML onclick) ─────────────── */

function ext_showNotif(msg, delay) {
    setTimeout(function() {
        try {
            var stack = document.getElementById('ext_notif_stack');
            if (!stack) return;
            var n = document.createElement('div');
            n.className   = 'ext_notif';
            n.textContent = '● ' + msg.toUpperCase();
            stack.appendChild(n);
            requestAnimationFrame(function() {
                requestAnimationFrame(function() { n.classList.add('ext_show'); });
            });
            setTimeout(function() {
                n.classList.remove('ext_show');
                setTimeout(function() { n.remove(); }, 450);
            }, 2800);
        } catch(x){}
    }, delay || 0);
}

function ext_openSettings() {
    try {
        document.getElementById('ext_settings_overlay').classList.add('ext_visible');
        document.getElementById('ext_settings_panel').classList.add('ext_visible');
    } catch(x){}
}

function ext_closeSettings() {
    try {
        document.getElementById('ext_settings_overlay').classList.remove('ext_visible');
        document.getElementById('ext_settings_panel').classList.remove('ext_visible');
    } catch(x){}
}

function ext_openRules() {
    try {
        document.getElementById('ext_rules_overlay').classList.add('ext_visible');
        document.getElementById('ext_rules_panel').classList.add('ext_visible');
    } catch(x){}
}

function ext_closeRules() {
    try {
        document.getElementById('ext_rules_overlay').classList.remove('ext_visible');
        document.getElementById('ext_rules_panel').classList.remove('ext_visible');
    } catch(x){}
}

function ext_startMarquee() {
    try {
        var track = document.getElementById('ext_marquee_track');
        if (!track || track.children.length > 0) return;
        var items = [
            'Selamat datang di portal EAC',
            'Nikmatin fitur yang tersedia disini',
            'Akses pengelolaan pusat informasi astro',
            'James Webb deteksi atmosfer baru di exoplanet K2-18b',
            'NASA konfirmasi air es di kutub selatan Bulan',
            'Parker Solar Probe cetak rekor pendekatan terdekat ke Matahari',
            'Artemis II dijadwalkan mengorbit Bulan bersama kru manusia',
            'Teleskop Hubble abadikan galaksi spiral di rasi Virgo',
            'Mars Perseverance kumpulkan sampel batuan kuno terbaru',
            'Fenomena Aurora langka terlihat hingga khatulistiwa',
        ];
        var out = items.concat(items).map(function(t) {
            return '<span class="ext_marquee_item">' +
                   '<span class="ext_marquee_dot">◈</span>' + t +
                   '</span>';
        }).join('');
        track.innerHTML = out;
    } catch(x){}
}