// SFX Setup
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
let sfxEnabled = true;

function playSfx() {
    if (sfxEnabled) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

// Global Click Listener for Sound
document.addEventListener('click', (e) => {
    if (e.target.closest('.card, .fab-item, .fab-main, .settings-item, button')) {
        playSfx();
    }
});

// FAB & Settings Control
function toggleFab() {
    document.getElementById('fabWrapper').classList.toggle('active');
}

function openSettings() {
    document.getElementById('settings-overlay').classList.add('active');
    toggleFab(); // Close FAB menu when opening settings
}

function closeSettings() {
    document.getElementById('settings-overlay').classList.remove('active');
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    document.getElementById('sfx-status').innerText = sfxEnabled ? "ON" : "OFF";
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert("Gagal mengaktifkan layar penuh: " + err.message);
        });
    } else {
        document.exitFullscreen();
    }
}

// Search Function
function searchMenu() {
    let input = document.getElementById('portalSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

// Battery Info
navigator.getBattery().then(battery => {
    const updateBattery = () => {
        document.getElementById('battery-level').innerText = Math.round(battery.level * 100) + "%";
    };
    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
});

// Font Size Control
let fontSize = 100;
function changeFontSize(delta) {
    fontSize += (delta * 5);
    document.documentElement.style.fontSize = fontSize + "%";
}

// Clock & Loading Logic
setInterval(() => {
    document.getElementById('eac-time').innerText = new Date().toLocaleTimeString('en-GB') + " // EAC-TIME";
}, 1000);

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    const status = document.getElementById('load-status');

    setTimeout(() => {
        status.innerText = "ACCESS GRANTED";
        status.style.color = "#00ffaa";
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.getElementById('portal-content').style.display = 'block';
                revealCards();
            }, 600);
        }, 1000);
    }, 2000);
});

function revealCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('reveal'));
}

// NASA API Fetch
fetch(`https://api.nasa.gov/planetary/apod?api_key=JMcJ1UGIgdFUs4qDWRaPEONheF5zazhnIdMhs4eH`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('nasa-data').innerHTML = `
            <img src="${data.url}" style="width:100%; display:block;">
            <div class="nasa-info">
                <h4>NASA DAILY:</h4>
                <p>${data.title}</p>
            </div>`;
    }).catch(() => {
        document.getElementById('nasa-data').innerHTML = `<p style="padding:20px; text-align:center;">Failed to fetch NASA data</p>`;
    });

// PING Simulator
setInterval(() => {
    const ping = Math.floor(Math.random() * 80) + 10;
    const el = document.getElementById('ping-val');
    if(el) {
        el.innerText = ping;
        el.style.color = ping < 50 ? "#00ffaa" : "#f59e0b";
    }
}, 3000);
