(function () {
    'use strict';

    // Aset Audio SFX Owner
    const SFX_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
    const clickSound = new Audio(SFX_URL);

    // Fungsi Global SFX
    window.ext_playSFX = function() {
        const isSfxOn = document.getElementById('ext_s_sfx')?.checked;
        if (isSfxOn) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    };

    // 1. Progress Bar Logic (4 Detik)
    function ext_runLoadingSequence(onComplete) {
        const loadingScreen = document.getElementById('loading-screen');
        // Inject visual loader ke loading screen lama (minimalist inject)
        loadingScreen.innerHTML += `
            <div id="ext_loader_wrap">
                <div id="ext_progress_pct">0%</div>
                <div id="ext_progress_bar_track"><div id="ext_progress_bar_fill"></div></div>
            </div>`;

        let progress = 0;
        const fill = document.getElementById('ext_progress_bar_fill');
        const pct = document.getElementById('ext_progress_pct');

        const timer = setInterval(() => {
            progress += 1.25; // 4 detik total
            if (progress > 100) progress = 100;
            
            fill.style.width = progress + '%';
            pct.textContent = Math.floor(progress) + '%';
            fill.style.background = progress >= 100 ? '#00ffaa' : '#38bdf8';

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    ext_startWelcome(onComplete);
                }, 500);
            }
        }, 50);
    }

    // 2. Welcome Sequence
    function ext_startWelcome(onComplete) {
        const ws = document.getElementById('ext_welcome_screen');
        ws.style.display = 'flex';
        ws.classList.add('ext_visible');
        
        // Animasi Teks (CSS handled)
        setTimeout(() => document.getElementById('ext_ww1').classList.add('ext_show'), 500);
        setTimeout(() => document.getElementById('ext_ww2').classList.add('ext_show'), 1200);

        setTimeout(() => {
            ws.style.opacity = '0';
            setTimeout(() => {
                ws.style.display = 'none';
                if (onComplete) onComplete();
            }, 1000);
        }, 3500);
    }

    // 3. Settings & Rules Toggles
    window.ext_openSettings = function() { 
        ext_playSFX();
        document.getElementById('ext_settings_panel').classList.add('ext_open'); 
        document.getElementById('ext_settings_overlay').classList.add('ext_open');
    };
    window.ext_closeSettings = function() { 
        document.getElementById('ext_settings_panel').classList.remove('ext_open'); 
        document.getElementById('ext_settings_overlay').classList.remove('ext_open');
    };

    // Override goto() lama untuk Loading Transisi
    const originalGoto = window.goto;
    window.goto = function(url, target) {
        ext_playSFX();
        const ls = document.getElementById('loading-screen');
        ls.style.display = 'flex';
        ls.style.opacity = '1';
        // Jalankan loading singkat 2 detik sebelum pindah
        setTimeout(() => { window.location.href = url; }, 2000);
    };

    // Init saat window load
    window.addEventListener('load', () => {
        ext_runLoadingSequence(() => {
            const portal = document.getElementById('portal-content');
            portal.style.display = 'block';
            if (typeof revealCards === 'function') revealCards();
            
            // Notif Sukses
            ext_showNotif("SISTEM AKTIF");
        });
    });

    function ext_showNotif(msg) {
        const container = document.getElementById('ext_notif_container');
        const n = document.createElement('div');
        n.className = 'ext_notif';
        n.innerText = msg;
        container.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }

})();
