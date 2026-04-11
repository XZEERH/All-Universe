/* ============================================
   PORTAL EAC — script.js FINAL
   ============================================ */

// ── Audio elements ───────────────────────────
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
    const el = document.getElementById('eac-time');
    if (el) el.innerText = new Date().toLocaleTimeString('en-GB') + ' // EAC-TIME';
}, 1000);

// ── Bfcache reload ───────────────────────────
window.onpageshow = function(event) {
    if (event.persisted) window.location.reload();
};

// ── NASA APOD ────────────────────────────────
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

// ── Ping Simulator ───────────────────────────
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

// ── Tampilkan 2 Notifikasi Bertumpuk ─────────
function showNotifications() {
    const notif1 = document.getElementById('sys-notif');
    const notif2 = document.getElementById('sys-notif-2');

    if (notif1) {
        setTimeout(() => {
            notif1.classList.add('show');
            setTimeout(() => notif1.classList.remove('show'), 3500);
        }, 500);
    }
    if (notif2) {
        setTimeout(() => {
            notif2.classList.add('show');
            setTimeout(() => notif2.classList.remove('show'), 3500);
        }, 1200);
    }
}

// ── LOADING SCREEN — Smart Progress ──────────
window.addEventListener('load', () => {
    const loader  = document.getElementById('loading-screen');
    const bar     = document.getElementById('loader-bar');
    const pct     = document.getElementById('load-percent');
    const status  = document.getElementById('load-status');
    const granted = document.getElementById('load-granted');
    const welcome = document.getElementById('welcome-sequence');

    let prog = 0;

    const interval = setInterval(() => {
        prog += Math.random() * 4 + 2;
        if (prog >= 100) prog = 100;

        bar.style.width = prog + '%';
        pct.innerText   = Math.floor(prog) + '%';

        if (prog >= 75) {
            bar.classList.add('done');
            pct.classList.add('done');
        }

        if (prog >= 100) {
            clearInterval(interval);

            // FASE 1: Sembunyikan bar, persen, status
            bar.style.opacity    = '0';
            pct.style.opacity    = '0';
            status.style.opacity = '0';

            setTimeout(() => {
                // Benar-benar hilang dari layout
                bar.style.visibility    = 'hidden';
                pct.style.visibility    = 'hidden';
                status.style.visibility = 'hidden';

                // FASE 2: ACCESS GRANTED di tengah layar
                granted.classList.add('show');

                setTimeout(() => {
                    // FASE 3: Ganti ke WELCOME ANGKASA
                    granted.style.opacity    = '0';
                    granted.style.transition = 'opacity 0.5s ease';

                    setTimeout(() => {
                        granted.style.visibility = 'hidden';
                        welcome.classList.add('show');

                        // FASE 2: Tahan 2 detik, lalu masuk portal
                        setTimeout(() => {
                            loader.style.opacity = '0';
                            setTimeout(() => {
                                loader.style.display = 'none';
                                document.getElementById('portal-content').style.display = 'block';
                                revealCards();
                                showNotifications();
                            }, 700);
                        }, 2000); // ← 2 detik menikmati welcome

                    }, 300);
                }, 1200); // ACCESS GRANTED tampil 1.2 detik

            }, 450); // tunggu fade selesai
        }
    }, 55);
});

// ── Goto — navigasi tanpa welcome screen ─────
function goto(url, target) {
    const loader  = document.getElementById('loading-screen');
    const status  = document.getElementById('load-status');
    const bar     = document.getElementById('loader-bar');
    const pct     = document.getElementById('load-percent');
    const granted = document.getElementById('load-granted');
    const welcome = document.getElementById('welcome-sequence');

    // Pastikan welcome & granted tidak muncul
    if (granted) { granted.classList.remove('show'); granted.style.opacity = '0'; granted.style.visibility = 'hidden'; }
    if (welcome) { welcome.classList.remove('show'); welcome.style.opacity = '0'; }

    // Reset elemen loader
    bar.style.opacity = '1'; bar.style.visibility = 'visible';
    pct.style.opacity = '1'; pct.style.visibility = 'visible';
    status.style.opacity = '1'; status.style.visibility = 'visible';
    bar.style.width = '0%';
    bar.classList.remove('done');
    pct.classList.remove('done');
    pct.innerText = '0%';

    loader.style.display = 'flex';
    loader.style.opacity = '1';
    status.innerText     = 'CONNECTING TO ' + target.toUpperCase();
    status.style.color   = '#555';

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
        status.innerText   = 'ACCESS GRANTED TO ' + target.toUpperCase();
        status.style.color = '#00ffaa';
        setTimeout(() => { window.location.href = url; }, 1000);
    }, 2400);
}

// ── MODAL ────────────────────────────────────
function openModal(id) {
    document.getElementById('fabWrapper').classList.remove('active');
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');

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
    if (event && event.target === document.getElementById(id)) closeModal(id);
}

// ── Musik Ambient ─────────────────────────────
function toggleMusic(el) {
    if (!ambientAudio) return;
    if (el.checked) {
        ambientAudio.loop   = true;
        ambientAudio.volume = 0.4;
        const p = ambientAudio.play();
        if (p !== undefined) {
            p.catch(() => {
                // Fallback: mainkan saat ada interaksi pertama
                const resume = () => {
                    ambientAudio.play().catch(() => {});
                    document.removeEventListener('touchstart', resume);
                    document.removeEventListener('click', resume);
                };
                document.addEventListener('touchstart', resume, { once: true });
                document.addEventListener('click', resume, { once: true });
            });
        }
    } else {
        ambientAudio.pause();
        ambientAudio.currentTime = 0;
    }
}

// ── Fullscreen ────────────────────────────────
function toggleFullscreen(el) {
    if (el.checked) {
        if (document.documentElement.requestFullscreen)
            document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
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

// ── Ukuran Teks — real-time scale ────────────
function adjustFontSize(val) {
    const scale  = val / 100;
    const portal = document.getElementById('portal-content');
    if (portal) {
        // Judul utama
        const title = portal.querySelector('.title-portal');
        if (title) title.style.fontSize = (32 * scale) + 'px';

        // H3 cards
        portal.querySelectorAll('.card h3').forEach(h => {
            h.style.fontSize = (18 * scale) + 'px';
        });

        // P cards
        portal.querySelectorAll('.card p').forEach(p => {
            p.style.fontSize = (13 * scale) + 'px';
        });

        // Jam
        const time = portal.querySelector('.time-display');
        if (time) time.style.fontSize = (12 * scale) + 'px';

        // Welcome greet
        const greet = portal.querySelector('.welcome-greet');
        if (greet) greet.style.fontSize = (14 * scale) + 'px';
    }

    const label = document.getElementById('font-size-label');
    if (label) label.innerText = Math.round(val) + '%';
}

// ── Status Baterai ────────────────────────────
if (navigator.getBattery) {
    navigator.getBattery().then(bat => {
        const updateBat = () => {
            const el = document.getElementById('battery-val');
            if (el) {
                const p = Math.floor(bat.level * 100);
                el.innerText   = p + '%';
                el.style.color = p < 20 ? '#ef4444' : p < 50 ? '#f59e0b' : '#00ffaa';
            }
        };
        updateBat();
        bat.addEventListener('levelchange', updateBat);
    }).catch(() => {});
}