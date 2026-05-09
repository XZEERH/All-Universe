export function drawBlackHole(ctx, cx, cy, frame, w, h) {
    for (let i = 0; i < 40; i++) {
        const r = Math.random() * Math.min(w,h)/2 + 70, a = Math.random() * Math.PI * 2 + frame * 0.0005;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a)*r, cy + Math.sin(a)*r, Math.random()*1.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.8})`; ctx.fill();
    }
    const pulse = Math.sin(frame * 0.05) * 5; 
    const photonGrd = ctx.createRadialGradient(cx, cy, 35, cx, cy, 80 + pulse);
    photonGrd.addColorStop(0, "rgba(252, 211, 77, 0.9)"); photonGrd.addColorStop(0.3, "rgba(249, 115, 22, 0.5)"); photonGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 80 + pulse, 0, Math.PI * 2); ctx.fillStyle = photonGrd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.15); ctx.scale(1, 0.25);
    const diskBackGrd = ctx.createRadialGradient(0, 0, 40, 0, 0, 160 + pulse);
    diskBackGrd.addColorStop(0, "transparent"); diskBackGrd.addColorStop(0.3, "rgba(252, 211, 77, 1)"); diskBackGrd.addColorStop(0.6, "rgba(239, 68, 68, 0.8)"); diskBackGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(0, 0, 160 + pulse, Math.PI, Math.PI*2); ctx.fillStyle = diskBackGrd; ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = "#000000"; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(252, 211, 77, 0.8)"; ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.15); ctx.scale(1, 0.25);
    const diskFrontGrd = ctx.createRadialGradient(0, 0, 40, 0, 0, 160 + pulse);
    diskFrontGrd.addColorStop(0, "transparent"); diskFrontGrd.addColorStop(0.3, "rgba(253, 230, 138, 1)"); diskFrontGrd.addColorStop(0.6, "rgba(249, 115, 22, 0.9)"); diskFrontGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(0, 0, 160 + pulse, 0, Math.PI); ctx.fillStyle = diskFrontGrd; ctx.fill(); ctx.restore();
}

export function drawPulsar(ctx, cx, cy, frame, w, h) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
    grd.addColorStop(0, "#ffffff"); grd.addColorStop(0.2, "#38bdf8"); grd.addColorStop(0.6, "#0284c740"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
    const angle1 = frame * 0.08, angle2 = angle1 + Math.PI;
    [[angle1, angle2],[angle2, angle1 + Math.PI]].forEach(([a]) => {
        const pulse = Math.abs(Math.sin(frame * 0.1)) * 0.8 + 0.2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
        const beamGrd = ctx.createLinearGradient(0, 0, Math.min(w, h) * 0.8, 0);
        beamGrd.addColorStop(0, `rgba(56,189,248,${pulse})`); beamGrd.addColorStop(0.4, `rgba(14,165,233,${pulse * 0.4})`); beamGrd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(Math.min(w, h) * 0.8, -1); ctx.lineTo(Math.min(w, h) * 0.8, 1); ctx.lineTo(0, 6);
        ctx.fillStyle = beamGrd; ctx.fill(); ctx.restore();
    });
}

export function drawQuasar(ctx, cx, cy, frame, w, h) {
    for (let i = 0; i < 50; i++) {
        const r = (frame * 2 + i * 20) % (Math.min(w,h)), a = (i * Math.PI * 2) / 50;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a)*r, cy + Math.sin(a)*r, Math.random()*2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${1 - r/Math.min(w,h)})`; ctx.fill();
    }
    const pulse = Math.sin(frame * 0.1) * 10;
    const coreGrd = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120 + pulse);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.2, "#a855f7"); coreGrd.addColorStop(0.5, "#3b82f680"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 120 + pulse, 0, Math.PI * 2); ctx.fillStyle = coreGrd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy);
    const jetPulse = Math.random() * 0.3 + 0.7, jetGrd = ctx.createLinearGradient(0, -h/2, 0, h/2);
    jetGrd.addColorStop(0, "transparent"); jetGrd.addColorStop(0.3, `rgba(168, 85, 247, ${jetPulse})`); jetGrd.addColorStop(0.5, "#ffffff"); jetGrd.addColorStop(0.7, `rgba(168, 85, 247, ${jetPulse})`); jetGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-40, -h/2); ctx.lineTo(40, -h/2); ctx.lineTo(15, 0); ctx.lineTo(40, h/2); ctx.lineTo(-40, h/2); ctx.lineTo(-15, 0);
    ctx.fillStyle = jetGrd; ctx.fill(); ctx.restore();
}

export function drawNebula(ctx, cx, cy, frame, w, h) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(frame * 0.001);
    const colors =["rgba(236, 72, 153, 0.15)", "rgba(56, 189, 248, 0.15)", "rgba(168, 85, 247, 0.15)"];
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2, dist = 60 + Math.sin(frame * 0.02 + i) * 20;
        const x = Math.cos(a) * dist, y = Math.sin(a) * dist, r = 100 + Math.sin(frame * 0.01 + i) * 30;
        const cloudGrd = ctx.createRadialGradient(x, y, 0, x, y, r);
        cloudGrd.addColorStop(0, colors[i % colors.length]); cloudGrd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = cloudGrd; ctx.fill();
    }
    ctx.restore();
}

export function drawSupernova(ctx, cx, cy, frame, w, h) {
    const ringRadius = 80 + (frame * 0.5) % 80, ringOpacity = 1 - ((ringRadius - 80) / 80);
    ctx.beginPath(); ctx.arc(cx, cy, ringRadius, 0, Math.PI*2);
    ctx.lineWidth = 4; ctx.strokeStyle = `rgba(251, 146, 60, ${ringOpacity * 0.6})`; ctx.stroke();
    for(let i=0; i<30; i++) {
        const a = (i/30)*Math.PI*2 + frame*0.01, r = 30 + Math.sin(frame*0.05 + i)*25;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 4, 0, Math.PI*2); ctx.fillStyle = `rgba(239, 68, 68, 0.5)`; ctx.fill();
    }
    const coreGrd = ctx.createRadialGradient(cx,cy,0, cx,cy, 70);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.3, "#fdba74"); coreGrd.addColorStop(0.7, "#ea580c80"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx,cy, 70, 0, Math.PI*2); ctx.fillStyle = coreGrd; ctx.fill();
}

export function drawWormhole(ctx, cx, cy, frame, w, h) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-frame * 0.005);
    for(let i=0; i<24; i++) {
        const a = (i/24)*Math.PI*2;
        ctx.beginPath();
        for(let r=10; r<w; r+=15) {
            const swirl = a + r*0.008, x = Math.cos(swirl)*r, y = Math.sin(swirl)*r;
            if(r===10) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.1 + Math.sin(frame*0.02 + i)*0.15})`; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.restore();
    const coreGrd = ctx.createRadialGradient(cx,cy,0, cx,cy, 40);
    coreGrd.addColorStop(0, "#000000"); coreGrd.addColorStop(0.6, "#0f172a"); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx,cy, 50, 0, Math.PI*2); ctx.fillStyle = coreGrd; ctx.fill();
}

export function drawGalaxy(ctx, cx, cy, frame, w, h, type) {
    const isAndromeda = type === "andromeda", arms = isAndromeda ? 4 : 2, coreColor = isAndromeda ? "rgba(186,230,253,1)" : "rgba(253,230,138,1)", colorArr = isAndromeda ?[125, 211, 252] :[252, 211, 77];
    for (let arm = 0; arm < arms; arm++) {
        const baseAngle = (arm / arms) * Math.PI * 2 - frame * (isAndromeda ? 0.0015 : 0.002);
        for (let i = 0; i < 300; i++) {
            const t = i / 300, spiral = t * Math.PI * 5 + baseAngle, r = t * Math.min(w, h) * 0.45;
            const scatter = (Math.random() - 0.5) * (30 * (1-t) + 5), x = cx + Math.cos(spiral) * r + scatter, y = cy + Math.sin(spiral) * r * (isAndromeda ? 0.3 : 0.4) + scatter * 0.3;
            ctx.beginPath(); ctx.arc(x, y, Math.random() * 1.5 + 0.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},${(1 - t) * 0.7 + 0.1})`; ctx.fill();
        }
    }
    const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    coreGrd.addColorStop(0, "#ffffff"); coreGrd.addColorStop(0.3, coreColor); coreGrd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fillStyle = coreGrd; ctx.fill();
}

export function drawMagnetar(ctx, cx, cy, frame, w, h) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    grd.addColorStop(0, "#ffffff"); grd.addColorStop(0.3, "#e879f9"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(frame * 0.05);
    for(let i=0; i<16; i++){
        ctx.beginPath(); ctx.ellipse(0, 0, 100 + Math.sin(frame*0.1)*20, 20, i * Math.PI/8, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(232, 121, 249, ${0.2 + Math.sin(frame*0.2+i)*0.2})`; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
}

export function drawBinaryStar(ctx, cx, cy, frame, w, h) {
    const a1 = frame * 0.02, a2 = a1 + Math.PI;
    const x1 = cx + Math.cos(a1)*40, y1 = cy + Math.sin(a1)*40;
    const x2 = cx + Math.cos(a2)*90, y2 = cy + Math.sin(a2)*90;
    const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, 60);
    g1.addColorStop(0, "#ffffff"); g1.addColorStop(0.3, "#818cf8"); g1.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(x1, y1, 60, 0, Math.PI * 2); ctx.fillStyle = g1; ctx.fill();
    const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 20);
    g2.addColorStop(0, "#ffffff"); g2.addColorStop(0.5, "#cbd5e1"); g2.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(x2, y2, 20, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
}

export function drawUYScuti(ctx, cx, cy, frame, w, h) {
    const r = Math.min(w,h)*0.35 + Math.sin(frame*0.03)*15;
    const grd = ctx.createRadialGradient(cx, cy, r*0.2, cx, cy, r);
    grd.addColorStop(0, "#fef08a"); grd.addColorStop(0.6, "#f97316"); grd.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
    for(let i=0; i<12; i++){
        const a = (i/12)*Math.PI*2 + frame*0.005;
        const flareR = r + Math.sin(frame*0.1 + i)*20;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*flareR, cy+Math.sin(a)*flareR, 15, 0, Math.PI*2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)"; ctx.fill();
    }
}

export function drawExoplanet(ctx, cx, cy, frame, w, h) {
    ctx.beginPath(); ctx.arc(cx - w/4, cy - h/4, 50, 0, Math.PI*2);
    ctx.fillStyle = "#f87171"; ctx.shadowBlur = 40; ctx.shadowColor = "#fca5a5"; ctx.fill(); ctx.shadowBlur = 0;
    const r = Math.min(w,h)*0.4;
    const pGrd = ctx.createRadialGradient(cx+r*0.2, cy+r*0.2, 0, cx, cy, r);
    pGrd.addColorStop(0, "#14b8a6"); pGrd.addColorStop(0.7, "#0f766e"); pGrd.addColorStop(1, "#022c22");
    ctx.beginPath(); ctx.arc(cx, cy + h/6, r, 0, Math.PI*2); ctx.fillStyle = pGrd; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy + h/6, r+10, 0, Math.PI*2);
    ctx.strokeStyle = "rgba(45, 212, 191, 0.2)"; ctx.lineWidth = 8; ctx.stroke();
}