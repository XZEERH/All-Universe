/* =========================
   LOADING REVAMP SYSTEM
========================= */
window.addEventListener('load', () => {

    const loader = document.getElementById('loading-screen');

    // Inject UI
    loader.innerHTML += `
        <div class="ext_loader_wrap">
            <div class="ext_loader_percent" id="ext_percent">0%</div>
            <div class="ext_loader_bar">
                <div class="ext_loader_fill" id="ext_fill"></div>
            </div>
        </div>
        <div class="ext_welcome" id="ext_welcome"></div>
    `;

    let percent = 0;
    const fill = document.getElementById('ext_fill');
    const text = document.getElementById('ext_percent');

    const interval = setInterval(() => {
        percent++;
        fill.style.width = percent + "%";
        text.innerText = percent + "%";

        if (percent >= 100) {
            clearInterval(interval);
            fill.classList.add('ext_loader_done');

            // Welcome Sequence
            const welcome = document.getElementById('ext_welcome');

            setTimeout(() => {
                welcome.innerText = "WELCOME";
                welcome.classList.add('show');
            }, 500);

            setTimeout(() => {
                welcome.innerText = "ANGKASA";
            }, 1500);

            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    document.getElementById('portal-content').style.display = 'block';
                    revealCards();
                    showNotif("Sistem Aktif");
                    setTimeout(()=>showNotif("Halaman Stabil"),1500);
                }, 600);
            }, 3000);
        }
    }, 40);
});

/* =========================
   NOTIFICATION
========================= */
function showNotif(msg) {
    const el = document.createElement('div');
    el.className = "ext_notif";
    el.innerText = msg;
    document.body.appendChild(el);

    setTimeout(()=>el.classList.add('show'),100);

    setTimeout(()=>{
        el.classList.remove('show');
        setTimeout(()=>el.remove(),500);
    },2000);
}

/* =========================
   SETTINGS PANEL
========================= */
function ext_togglePanel(id){
    document.getElementById(id).classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", ()=>{

    // Inject buttons
    document.querySelector('.status-capsule').innerHTML += `
        <svg class="ext_settings_btn" onclick="ext_togglePanel('ext_settings')" width="16" viewBox="0 0 24 24"><path fill="white" d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4a7.9 7.9 0 01-.34 2l2.04 1.6-2 3.4-2.4-.8a8 8 0 01-1.7 1l-.4 2.5H9.8l-.4-2.5a8 8 0 01-1.7-1l-2.4.8-2-3.4 2.04-1.6A8 8 0 013 12c0-.7.1-1.4.34-2L1.3 8.4l2-3.4 2.4.8c.5-.4 1.1-.7 1.7-1l.4-2.5h4.4l.4 2.5c.6.3 1.2.6 1.7 1l2.4-.8 2 3.4-2.04 1.6c.24.6.34 1.3.34 2z"/></svg>
    `;

    document.querySelector('.mini-status').innerHTML += `
        <svg class="ext_rules_btn" onclick="ext_togglePanel('ext_rules')" width="16" viewBox="0 0 24 24"><path fill="white" d="M6 2h9l5 5v15H6z"/></svg>
    `;

    // Inject panels
    document.body.innerHTML += `
        <div id="ext_settings" class="ext_panel">
            <h3>SETTINGS</h3>
            <div class="ext_option"><input type="checkbox"> Fullscreen</div>
            <div class="ext_option"><input type="checkbox"> Musik Ambient</div>
            <div class="ext_option"><input type="checkbox"> Status Daya</div>
            <div class="ext_option"><input type="checkbox"> Mode Terang</div>
            <div class="ext_option"><input type="checkbox" id="ext_sfx"> SFX</div>
            <div class="ext_option"><input type="checkbox"> Hemat Daya</div>
            <div class="ext_option"><input type="checkbox"> Matikan Animasi</div>
            <div class="ext_option">Ukuran Teks <input type="range" min="12" max="20"></div>
            <button onclick="ext_togglePanel('ext_settings')">TUTUP PANEL</button>
        </div>

        <div id="ext_rules" class="ext_panel">
            <h3>ATURAN EAC</h3>
            <p>Komunitas:<br>1. Jaga Etika<br>2. No Spam<br>3. Saling Berbagi Ilmu</p>
            <p>Web:<br>1. Gunakan Bijak<br>2. Lapor Bug ke Admin<br>3. Dilarang Re-upload Asset</p>
            <button onclick="ext_togglePanel('ext_rules')">SAYA PAHAM</button>
        </div>
    `;

    // SFX
    const sfx = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
    document.addEventListener('click', ()=>{
        if(document.getElementById('ext_sfx')?.checked){
            sfx.currentTime = 0;
            sfx.play();
        }
    });

    /* =========================
       MARQUEE
    ========================= */
    const marquee = document.createElement("div");
    marquee.className = "ext_marquee";
    marquee.innerHTML = `<span>Update: Fenomena Pink Moon • Misi Artemis • Aktivitas Matahari meningkat • Observasi langit malam terbaik minggu ini</span>`;
    
    document.querySelector('.header-section').appendChild(marquee);
});

/* =========================
   GLOBAL TRANSITION OVERRIDE
========================= */
const oldGoto = window.goto;
window.goto = function(url, target){

    const loader = document.getElementById('loading-screen');
    loader.style.display = "flex";
    loader.style.opacity = "1";

    let percent = 0;
    const interval = setInterval(()=>{
        percent+=2;
        if(percent>=100){
            clearInterval(interval);
            setTimeout(()=> window.location.href = url, 500);
        }
    },40);
};