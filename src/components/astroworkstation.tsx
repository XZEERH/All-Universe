import React, { useState, useEffect } from 'react';
import './AstroWorkstation.css';

// Konfigurasi Tombol Kalkulator
const CALC_KEYS = [
    { t: '2nd', v: '' }, { t: 'deg', v: '' }, { t: 'sin', v: 'sin(' }, { t: 'cos', v: 'cos(' }, { t: 'tan', v: 'tan(' },
    { t: 'xʸ', v: '^' }, { t: 'lg', v: 'log(' }, { t: 'ln', v: 'ln(' }, { t: '(', v: '(' }, { t: ')', v: ')' },
    { t: '√', v: 'sqrt(' }, { t: 'AC', v: 'AC', c: 'btn-act' }, { t: 'DEL', v: 'DEL', c: 'btn-act' }, { t: '%', v: '%', c: 'btn-op' }, { t: '÷', v: '/', c: 'btn-op' },
    { t: 'x!', v: '!' }, { t: '7', v: '7' }, { t: '8', v: '8' }, { t: '9', v: '9' }, { t: '×', v: '*', c: 'btn-op' },
    { t: '1/x', v: '1/' }, { t: '4', v: '4' }, { t: '5', v: '5' }, { t: '6', v: '6' }, { t: '-', v: '-', c: 'btn-op' },
    { t: 'π', v: 'pi' }, { t: '1', v: '1' }, { t: '2', v: '2' }, { t: '3', v: '3' }, { t: '+', v: '+', c: 'btn-op' },
    { t: 'Inv', v: '' }, { t: 'e', v: 'e' }, { t: '0', v: '0' }, { t: '.', v: '.' }, { t: '=', v: '=', c: 'btn-eq' }
];

export default function AstroWorkstation() {
    // --- STATES ---
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState<'calc' | 'astro' | 'unit' | 'notes'>('calc');
    const [clock, setClock] = useState('00:00:00');

    // State Kalkulator
    const [formula, setFormula] = useState('');
    const [currentOp, setCurrentOp] = useState('0');
    const [prevOp, setPrevOp] = useState('');

    // State Astrofisika
    const [astroInputs, setAstroInputs] = useState({ m1: '', m2: '', r: '', ms: '' });
    const [astroResult, setAstroResult] = useState('');

    // State Unit
    const [unitInput, setUnitInput] = useState('');
    const [unitType, setUnitType] = useState('1');
    const [unitResult, setUnitResult] = useState('');

    // State Notes
    const [notes, setNotes] = useState('');

    // --- EFFECTS ---
    // 1. Loading Simulation
    useEffect(() => {
        let p = 0;
        const l = setInterval(() => {
            p += Math.random() * 25;
            setProgress(p);
            if (p >= 100) {
                clearInterval(l);
                setTimeout(() => setIsLoading(false), 500);
            }
        }, 150);
        return () => clearInterval(l);
    }, []);

    // 2. Clock Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 3. Load Notes from LocalStorage
    useEffect(() => {
        setNotes(localStorage.getItem('a_n') || '');
    }, []);

    // --- HANDLERS ---
    // Kalkulator Logika
    const handleCalcAction = (val: string) => {
        if (val === 'AC') {
            setFormula(''); setCurrentOp('0'); setPrevOp('');
        }
        else if (val === 'DEL') {
            const newF = formula.slice(0, -1);
            setFormula(newF); setCurrentOp(newF || '0');
        }
        else if (val === '=') {
            try {
                let s = formula.replace(/pi/g, Math.PI.toString())
                    .replace(/e/g, Math.E.toString())
                    .replace(/sin/g, 'Math.sin')
                    .replace(/cos/g, 'Math.cos')
                    .replace(/tan/g, 'Math.tan')
                    .replace(/log/g, 'Math.log10')
                    .replace(/ln/g, 'Math.log')
                    .replace(/sqrt/g, 'Math.sqrt')
                    .replace(/\^/g, '**');
                
                // eslint-disable-next-line no-eval
                const ans = eval(s);
                setPrevOp(formula + " =");
                setCurrentOp(ans.toString());
                setFormula(ans.toString());
            } catch {
                setCurrentOp("Error");
            }
        }
        else if (val !== '') {
            const newF = formula + val;
            setFormula(newF); setCurrentOp(newF);
        }
    };

    // Astro Logika
    const handleAstroInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAstroInputs({ ...astroInputs, [e.target.name]: e.target.value });
    };

    const calcAstro = (mode: 'g' | 's') => {
        const G = 6.674e-11; const c = 299792458;
        if (mode === 'g') {
            const m1 = parseFloat(astroInputs.m1);
            const m2 = parseFloat(astroInputs.m2);
            const d = parseFloat(astroInputs.r);
            if (m1 && m2 && d) setAstroResult(`F: ${((G * m1 * m2) / (d * d)).toExponential(3)} N`);
        } else {
            const ms = parseFloat(astroInputs.ms);
            if (ms) setAstroResult(`Radius: ${((2 * G * ms) / (c * c)).toFixed(2)} m`);
        }
    };

    // Unit Logika
    const calcUnit = () => {
        const v = parseFloat(unitInput);
        if (!isNaN(v)) {
            let r = (unitType === "1") ? v / 1.989e30 : (v * 5.972e24) / 1.989e30;
            setUnitResult(`Hasil: ${r.toExponential(4)} M☉`);
        }
    };

    // Notes Logika
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setNotes(val);
        localStorage.setItem('a_n', val);
    };

    // --- RENDERS ---
    if (isLoading) {
        return (
            <div className="astro-body">
                <div className="loader-container">
                    <div className="astro-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="9" strokeDasharray="40 10" />
                            <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                        </svg>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
                    <p>Membuka sistem ilmiah...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="astro-body">
            <main className="app-container">
                <header>
                    <div className="header-info">
                        <span className="brand">ASTRO-STATION</span>
                        <span>{clock}</span>
                    </div>

                    <nav className="top-nav">
                        <button onClick={() => setActiveTab('calc')} className={`nav-item ${activeTab === 'calc' ? 'active' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 12h10M12 7v10" /></svg>
                            <span>CALC</span>
                        </button>
                        <button onClick={() => setActiveTab('astro')} className={`nav-item ${activeTab === 'astro' ? 'active' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>
                            <span>ASTRO</span>
                        </button>
                        <button onClick={() => setActiveTab('unit')} className={`nav-item ${activeTab === 'unit' ? 'active' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-9M14 17H5M7 7l-2 2 2 2M17 17l2-2-2-2" /></svg>
                            <span>UNIT</span>
                        </button>
                        <button onClick={() => setActiveTab('notes')} className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <span>NOTES</span>
                        </button>
                    </nav>
                </header>

                {/* Layar Output Hanya Muncul Saat Kalkulator Aktif */}
                {activeTab === 'calc' && (
                    <section className="display-area">
                        <div className="prev-op">{prevOp}</div>
                        <div className="current-op">{currentOp}</div>
                    </section>
                )}

                {/* Konten Tab */}
                <section>
                    {activeTab === 'calc' && (
                        <div className="calc-grid">
                            {CALC_KEYS.map((k, index) => (
                                <button key={index} className={k.c || ''} onClick={() => handleCalcAction(k.v || k.t)}>
                                    {k.t}
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === 'astro' && (
                        <div className="astro-panel">
                            <h4 style={{ color: 'var(--neon)' }}>Gaya Gravitasi (N)</h4>
                            <input type="number" name="m1" value={astroInputs.m1} onChange={handleAstroInput} placeholder="Massa 1 (kg)" />
                            <input type="number" name="m2" value={astroInputs.m2} onChange={handleAstroInput} placeholder="Massa 2 (kg)" />
                            <input type="number" name="r" value={astroInputs.r} onChange={handleAstroInput} placeholder="Jarak (m)" />
                            <button onClick={() => calcAstro('g')} style={{ width: '100%', padding: '10px', background: 'var(--purple)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Hitung</button>
                            {astroResult && astroResult.startsWith('F:') && <div className="res-box">{astroResult}</div>}

                            <h4 style={{ color: 'var(--neon)', marginTop: '20px' }}>Radius Schwarzschild</h4>
                            <input type="number" name="ms" value={astroInputs.ms} onChange={handleAstroInput} placeholder="Massa (kg)" />
                            <button onClick={() => calcAstro('s')} style={{ width: '100%', padding: '10px', background: 'var(--purple)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Hitung</button>
                            {astroResult && astroResult.startsWith('Radius:') && <div className="res-box">{astroResult}</div>}
                        </div>
                    )}

                    {activeTab === 'unit' && (
                        <div className="unit-panel">
                            <h4 style={{ color: 'var(--neon)' }}>Unit Converter</h4>
                            <input type="number" value={unitInput} onChange={(e) => setUnitInput(e.target.value)} placeholder="Nilai" />
                            <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                                <option value="1">Kg ke Massa Matahari</option>
                                <option value="2">Bumi ke Matahari</option>
                            </select>
                            <button onClick={calcUnit} style={{ width: '100%', padding: '10px', background: 'var(--purple)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Convert</button>
                            {unitResult && <div className="res-box">{unitResult}</div>}
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="notes-container">
                            <h4 style={{ color: 'var(--purple)' }}>Catatan Privat</h4>
                            <textarea value={notes} onChange={handleNotesChange} placeholder="Tulis rumus..."></textarea>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}