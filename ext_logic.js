/* =========================
   EXT LOADING REVAMP
========================= */
.ext_loader_wrap {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    text-align: center;
}

.ext_loader_percent {
    font-family: 'Orbitron';
    font-size: 12px;
    margin-bottom: 8px;
    color: #38bdf8;
    letter-spacing: 2px;
}

.ext_loader_bar {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    overflow: hidden;
}

.ext_loader_fill {
    height: 100%;
    width: 0%;
    background: #38bdf8;
    transition: width 0.1s linear;
}

.ext_loader_done {
    background: #00ffaa !important;
}

/* =========================
   WELCOME TEXT
========================= */
.ext_welcome {
    position: absolute;
    top: 40%;
    text-align: center;
    width: 100%;
    font-family: 'Orbitron';
    font-size: 26px;
    letter-spacing: 6px;
    opacity: 0;
    transition: all 0.8s ease;
}

.ext_welcome.show {
    opacity: 1;
    transform: scale(1.1);
}

/* =========================
   NOTIFICATION
========================= */
.ext_notif {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 11px;
    font-family: 'Orbitron';
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    transition: 0.4s;
}

.ext_notif.show {
    opacity: 1;
    transform: translateY(0);
}

/* =========================
   SETTINGS PANEL
========================= */
.ext_settings_btn, .ext_rules_btn {
    margin-left: 10px;
    cursor: pointer;
}

.ext_panel {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 320px;
    height: 100%;
    background: rgba(20,20,30,0.7);
    backdrop-filter: blur(20px);
    border-left: 1px solid rgba(255,255,255,0.1);
    transition: 0.4s;
    z-index: 9999;
    padding: 20px;
    overflow-y: auto;
}

.ext_panel.show {
    right: 0;
}

.ext_panel h3 {
    font-family: 'Orbitron';
    margin-bottom: 20px;
}

.ext_option {
    margin-bottom: 15px;
    font-size: 13px;
}

/* =========================
   MARQUEE
========================= */
.ext_marquee {
    white-space: nowrap;
    overflow: hidden;
    font-size: 11px;
    font-family: 'Orbitron';
    color: #38bdf8;
    margin: 10px 0;
}

.ext_marquee span {
    display: inline-block;
    padding-left: 100%;
    animation: ext_marquee_anim 25s linear infinite;
}

@keyframes ext_marquee_anim {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
}