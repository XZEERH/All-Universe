/* LOGIKA ASTRO-WORKSTATION */

// A. LOADING SEQUENCE
window.addEventListener('DOMContentLoaded', () => {
    let prog = 0;
    const fill = document.querySelector('.progress-fill');
    const load = setInterval(() => {
        prog += Math.random() * 30;
        fill.style.width = prog + '%';
        if (prog >= 100) {
            clearInterval(load);
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
                switchTab('calc', document.querySelector('.nav-item'));
            }, 500);
        }
    }, 150);
});

// B. TAB SWITCHER
function switchTab(type, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    
    const content = document.getElementById('content');
    const disp = document.getElementById('display-section');
    
    // Tampilkan display hanya di kalkulator
    disp.style.display = (type === 'calc') ? 'block' : 'none';

    if (type === 'calc') renderCalc();
    else if (type === 'astro') renderAstro();
    else if (type === 'unit') renderUnit();
    else if (type === 'notes') renderNotes();
}

// C. MODUL KALKULATOR
let formula = "";
let ans = 0;

function renderCalc() {
    const keys = ['sin','cos','tan','log','ln','sqrt','^','(',')','/','7','8','9','*','pi','4','5','6','-','e','1','2','3','+','AC','0','.','=','DEL','Ans'];
    let h = '<div class="calc-grid">';
    keys.forEach(k => h += `<button onclick="action('${k}')">${k}</button>`);
    document.getElementById('content').innerHTML = h + '</div>';
}

function action(v) {
    const d = document.getElementById('current-op');
    const p = document.getElementById('prev-op');
    if(v==='AC'){ formula=""; d.innerText="0"; p.innerText=""; }
    else if(v==='DEL'){ formula=formula.slice(0,-1); d.innerText=formula||"0"; }
    else if(v==='Ans'){ formula += ans; d.innerText=formula; }
    else if(v==='='){
        try {
            let s = formula.replace(/pi/g, Math.PI).replace(/e/g, Math.E)
                .replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/tan/g,'Math.tan')
                .replace(/log/g,'Math.log10').replace(/ln/g,'Math.log').replace(/sqrt/g,'Math.sqrt').replace(/\^/g,'**');
            ans = eval(s);
            p.innerText = formula + " =";
            d.innerText = ans;
            formula = ans.toString();
        } catch { d.innerText = "Error"; }
    } else { formula += v; d.innerText = formula; }
}

// D. MODUL ASTROFISIKA
function renderAstro() {
    document.getElementById('content').innerHTML = `
        <div class="astro-panel">
            <h4 style="color:var(--neon)">Gaya Gravitasi (N)</h4>
            <input type="number" id="m1" placeholder="Massa 1 (kg)">
            <input type="number" id="m2" placeholder="Massa 2 (kg)">
            <input type="number" id="r" placeholder="Jarak (m)">
            <button onclick="goAstro('g')" style="width:100%; padding:10px; margin-top:5px">Hitung</button>
            <div id="res-a" class="res-box">Hasil akan muncul di sini...</div>
            <hr style="margin:20px 0; opacity:0.1">
            <h4 style="color:var(--neon)">Schwarzschild (Black Hole)</h4>
            <input type="number" id="ms" placeholder="Massa Benda (kg)">
            <button onclick="goAstro('s')" style="width:100%; padding:10px; margin-top:5px">Cek Radius</button>
        </div>`;
}

function goAstro(mode) {
    const G = 6.674e-11; const c = 299792458;
    let res = "";
    if(mode === 'g') {
        const m1 = document.getElementById('m1').value, m2 = document.getElementById('m2').value, r = document.getElementById('r').value;
        res = "Gaya: " + ((G*m1*m2)/(r*r)).toExponential(3) + " N";
    } else {
        const m = document.getElementById('ms').value;
        res = "Radius: " + ((2*G*m)/(c*c)).toFixed(2) + " m";
    }
    document.getElementById('res-a').innerText = res;
}

// E. MODUL UNIT & NOTES
function renderUnit() {
    document.getElementById('content').innerHTML = `
        <div class="unit-panel">
            <h4 style="color:var(--neon)">Convert Massa Bintang</h4>
            <input type="number" id="uin" placeholder="Masukkan nilai">
            <select id="utyp"><option value="1">Kg ke Massa Matahari</option><option value="2">Massa Bumi ke Matahari</option></select>
            <button onclick="goUnit()" style="width:100%; padding:10px">Convert</button>
            <div id="res-u" class="res-box"></div>
        </div>`;
}

function goUnit() {
    const v = document.getElementById('uin').value;
    const t = document.getElementById('utyp').value;
    let r = (t==="1") ? v / 1.989e30 : (v * 5.972e24) / 1.989e30;
    document.getElementById('res-u').innerText = "Hasil: " + r.toExponential(4) + " M☉";
}

function renderNotes() {
    const s = localStorage.getItem('a_n') || "";
    document.getElementById('content').innerHTML = `
        <div class="notes-container">
            <h4 style="color:var(--purple)">Catatan Privat</h4>
            <textarea id="ni" oninput="localStorage.setItem('a_n', this.value)" placeholder="Tulis rumus rahasiamu...">${s}</textarea>
        </div>`;
}

// JAM
setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
