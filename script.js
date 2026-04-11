/* ============================================
   PORTAL EAC — script.js (LENGKAP)
   ============================================ */

// ── Audio elements ──────────────────────────
const sfxAudio     = document.getElementById('audio-sfx');
const ambientAudio = document.getElementById('audio-ambient');

// ── FAB Toggle ───────────────────────────────
function toggleFab() {
    document.getElementById('fabWrapper').classList.toggle('active');
}

// ── Search Menu ──────────────────────────────
function searchMenu() {
    const input = document.getElementById('portalSearch').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        const title = cards[i].querySelector('h3').innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? '' : 'none';
    }
}

// ── Jam EAC ──────────────────────────────────
setInterval(() => {
    document.getElementById('eac-time').innerText =
        new Date().toLocaleTimeString('en-GB') + ' // EAC-TIME';
}, 1000);

// ── Bfcache reload ───────────────────────────
window.onpageshow = function(event) {
    if (event.persisted) window.location.reload();
};

// ── LOADING SCREEN (Smart Progress) ──────────
window.addEventListener('load', () => {
    const loader   = document.getElementById('loading-screen');
    const bar      = document.getElementById('loader-bar');
    const pct      = document.getElementById('load-percent');
    const status   = document.getElementById('load-status');
    const granted  = document.getElementById('load-granted');
    const welcome  = document.getElementById('welcome-sequence');
    const marquee  = document.getElementById('marquee-container');
    const notif    = document.getElementById('sys-notif');

    let prog = 0;

    const interval = setInterval(() => {
        prog += Math.random() * 4 + 1.8;
        if (prog >= 100) prog = 100;

        bar.style.width = prog + '%';
        pct.innerText   = Math.floor(prog) + '%';

        if (prog >= 75) {
            bar.classList.add('done');
            pct.classList.add('done');
        }

        if (prog >= 100) {
            clearInterval(interval);

            // Fade keluar elemen loading utama
            bar.style.opacity    = '0';
            pct.style.opacity    = '0';
            status.style.opacity = '0';

            // Munculkan ACCESS GRANTED
            setTimeout(() => {
                granted.classList.add('show');

                // Ganti ke WELCOME + ANGKASA
                setTimeout(() => {
                    granted.style.opacity = '0';
                    welcome.classList.add('show');

                    // Fade-out seluruh loading screen
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            document.getElementById('portal-content').style.display = 'block';
                            revealCards();

                            // Tampilkan notifikasi "Sistem Aktif"
                            setTimeout(() => {
                                if (notif) {
                                    notif.classList.add('show');
                                    setTimeout(() => notif.classList.remove('show'), 4000);
                                }
                            }, 600);
                        }, 600);
                    }, 1300);
                }, 900);
            }, 350);
        }
    }, 55);
});

// ── Goto (dengan loading transition) ─────────
function goto(url, target) {
    const loader = document.getElementById('loading-screen');
    const status = document.getElementById('load-status');
    const bar    = document.getElementById('loader-bar');
    const pct    = document.getElementById('load-percent');

    // Reset komponen loading ke tampilan standar
    bar.style.opacity    = '1';
    pct.style.opacity    = '1';
    status.style.opacity = '1';
    bar.style.width      = '0%';
    bar.classList.remove('done');
    pct.classList.remove('done');
    pct.innerText = '0%';

    loader.style.display = 'flex';
    loader.style.opacity = '1';
    status.innerText     = 'CONNECTING TO ' + target.toUpperCase();
    status.style.color   = '#555';

    // Animasikan bar menuju ~90%
    let prog = 0;
    const iv = setInterval(() => {
        prog += Math.random() * 6 + 2;
        if (prog >= 90) { prog = 90; clearInterval(iv); }
        bar.style.width = prog + '%';
        pct.innerText   = Math.floor(prog) + '%';
    }, 80);

    setTimeout(() => {
        clearInterval(iv);
        bar.style.width  = '100%';
        pct.innerText    = '100%';
        bar.classList.add('done');
        pct.classList.add('done');
        status.innerText = 'ACCESS GRANTED TO ' + target.toUpperCase();
        status.style.color = '#00ffaa';

        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    }, 2400);
}

// ── NASA APOD ─────────────────────────────────
fetch('https://api.nasa.gov/planetary/apod?api_key=JMcJ1UGIgdFUs4qDWRaPEONheF5zazhnIdMhs4eH')
    .then(res => res.json())
    .then(data => {
        document.getElementById('nasa-data').innerHTML =
            `<img src="${data.url}">
             <div class="nasa-info">
               <h4>NASA DAILY:</h4>
               <p>${data.title}</p>
             </div>`;
    })
    .catch(() => {
        document.getElementById('nasa-data').innerHTML =
            '<div style="padding:20px;color:#555;font-size:12px;text-align:center;">Gagal memuat data NASA</div>';
    });

// ── Ping Simulator ────────────────────────────
setInterval(() => {
    const p  = Math.floor(Math.random() * 100) + 10;
    const el = document.getElementById('ping-val');
    if (el) {
        el.innerText   = p;
        el.style.color = p < 50 ? '#00ffaa' : '#f59e0b';
    }
}, 3000);

// ── Reveal Cards on Scroll ───────────────────
function revealCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 50 && top > 0) {
            card.classList.add('reveal');
            card.classList.remove('exit');
        } else {
            card.classList.remove('reveal');
            card.classList.add('exit');
        }
    });
}
window.addEventListener('scroll', revealCards);

// ── MODAL ─────────────────────────────────────
function openModal(id) {
    // Tutup FAB
    document.getElementById('fabWrapper').classList.remove('active');

    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');

    // SFX jika aktif
    const sfxToggle = document.getElementById('toggle-sfx');
    if (sfxToggle && sfxToggle.checked && sfxAudio) {
        sfxAudio.currentTime = 0;
        sfxAudio.play().catch(() => {});
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
}

function closeModalOverlay(id, event) {
    // Tutup hanya jika klik tepat di overlay (bukan di dalam modal-glass)
    if (event && event.target === document.getElementById(id)) {
        closeModal(id);
    }
}

// ── Musik Ambient ─────────────────────────────
function toggleMusic(el) {
    if (!ambientAudio) return;
    if (el.checked) {
        ambientAudio.volume = 0.4;
        ambientAudio.play().catch(() => {});
    } else {
        ambientAudio.pause();
        ambientAudio.currentTime = 0;
    }
}

// ── Fullscreen ────────────────────────────────
function toggleFullscreen(el) {
    if (el.checked) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
    }
}

// ── Light Mode ────────────────────────────────
function toggleLightMode(el) {
    document.body.classList.toggle('light-mode', el.checked);
}

// ── Hemat Daya ────────────────────────────────
function togglePowerSave(el) {
    document.body.classList.toggle('power-save', el.checked);
}

// ── Ukuran Teks ───────────────────────────────
function adjustFontSize(val) {
    document.documentElement.style.fontSize = val + '%';
    const label = document.getElementById('font-size-label');
    if (label) label.innerText = val + '%';
}

// ── Status Baterai ────────────────────────────
if (navigator.getBattery) {
    navigator.getBattery().then(bat => {
        const updateBat = () => {
            const el = document.getElementById('battery-val');
            if (el) {
                const pct = Math.floor(bat.level * 100);
                el.innerText = pct + '%';
                el.style.color = pct < 20 ? '#ef4444' : pct < 50 ? '#f59e0b' : '#00ffaa';
            }
        };
        updateBat();
        bat.addEventListener('levelchange', updateBat);
    }).catch(() => {});
}