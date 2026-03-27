import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Globe, Info, ArrowRight } from 'lucide-react';

export const Calculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'conversion' | 'physics'>('conversion');

  // Conversion State
  const [ly, setLy] = useState('');
  const [km, setKm] = useState('');

  // Physics State (Gravity)
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [r, setR] = useState('');
  const [force, setForce] = useState<number | null>(null);

  const G = 6.67430e-11;

  const handleLyToKm = (val: string) => {
    setLy(val);
    if (!val) {
      setKm('');
      return;
    }
    const result = parseFloat(val) * 9.461e12;
    setKm(result.toExponential(4));
  };

  const calculateGravity = () => {
    const mass1 = parseFloat(m1);
    const mass2 = parseFloat(m2);
    const radius = parseFloat(r);

    if (mass1 && mass2 && radius) {
      const f = (G * mass1 * mass2) / Math.pow(radius, 2);
      setForce(f);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-16">
      <button
        onClick={onBack}
        className="mb-8 md:mb-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors font-orbitron text-[9px] md:text-[10px] tracking-[0.3em] uppercase"
      >
        <ArrowLeft size={14} /> KEMBALI KE HUB
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5"
      >
        <div className="flex border-b border-white/5">
          <button
            onClick={() => setActiveTab('conversion')}
            className={`flex-1 py-6 md:py-8 font-orbitron text-[9px] md:text-[10px] tracking-[0.4em] transition-all uppercase ${activeTab === 'conversion' ? 'bg-white/[0.05] text-white' : 'text-white/30 hover:text-white/50'}`}
          >
            Konversi Data
          </button>
          <button
            onClick={() => setActiveTab('physics')}
            className={`flex-1 py-6 md:py-8 font-orbitron text-[9px] md:text-[10px] tracking-[0.4em] transition-all uppercase ${activeTab === 'physics' ? 'bg-white/[0.05] text-white' : 'text-white/30 hover:text-white/50'}`}
          >
            Rumus Fisika
          </button>
        </div>

        <div className="p-8 md:p-16">
          {activeTab === 'conversion' ? (
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-center gap-4 md:gap-5 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Zap className="text-white" size={20} />
                </div>
                <h3 className="font-orbitron text-lg md:text-xl font-bold tracking-widest uppercase">Konversi Tahun Cahaya</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                <div className="space-y-3">
                  <label className="block text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em]">Tahun Cahaya (ly)</label>
                  <input
                    type="number"
                    value={ly}
                    onChange={(e) => handleLyToKm(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 md:py-6 px-8 focus:border-white/30 focus:outline-none font-orbitron text-xl md:text-2xl text-white placeholder:text-white/5"
                    placeholder="0.0"
                  />
                </div>
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="text-white/20" size={24} />
                </div>
                <div className="space-y-3">
                  <label className="block text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em]">Kilometer (km)</label>
                  <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 md:py-6 px-8 text-white font-orbitron text-xl md:text-2xl overflow-hidden text-ellipsis min-h-[68px] md:min-h-[84px] flex items-center">
                    {km || '0.0'}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 md:gap-5 items-start">
                <Info className="text-white/40 shrink-0 mt-0.5" size={20} />
                <p className="text-[10px] md:text-xs text-white/50 leading-relaxed font-light">
                  Satu tahun cahaya adalah jarak yang ditempuh cahaya dalam ruang hampa selama satu tahun Julian (365,25 hari). 
                  Nilai pastinya adalah 9.460.730.472.580,8 km.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-center gap-4 md:gap-5 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Globe className="text-white" size={20} />
                </div>
                <h3 className="font-orbitron text-lg md:text-xl font-bold tracking-widest uppercase">Gravitasi Universal</h3>
              </div>

              <div className="flex justify-center py-6 md:py-10">
                <div className="font-orbitron text-lg md:text-2xl text-white/80 bg-white/[0.02] px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/10 tracking-widest">
                  F = G <span className="mx-1 md:mx-2">·</span> (m₁ <span className="mx-1 md:mx-2">·</span> m₂) / r²
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="block text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em]">Massa Benda 1 (kg)</label>
                  <input
                    type="number"
                    value={m1}
                    onChange={(e) => setM1(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 md:py-5 px-6 focus:border-white/30 focus:outline-none text-white font-light text-sm"
                    placeholder="5.97e24"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em]">Massa Benda 2 (kg)</label>
                  <input
                    type="number"
                    value={m2}
                    onChange={(e) => setM2(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 md:py-5 px-6 focus:border-white/30 focus:outline-none text-white font-light text-sm"
                    placeholder="7.34e22"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em]">Jarak Pusat (m)</label>
                  <input
                    type="number"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 md:py-5 px-6 focus:border-white/30 focus:outline-none text-white font-light text-sm"
                    placeholder="3.84e8"
                  />
                </div>
              </div>

              <button
                onClick={calculateGravity}
                className="w-full neon-button py-5 md:py-6 rounded-2xl font-orbitron font-bold tracking-[0.4em] text-white text-[10px] uppercase"
              >
                Hitung Gaya (Newton)
              </button>

              {force !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 text-center"
                >
                  <p className="text-[8px] md:text-[9px] font-orbitron text-white/30 uppercase tracking-[0.4em] mb-4">Hasil Perhitungan Gaya</p>
                  <p className="font-orbitron text-3xl md:text-4xl font-black text-white tracking-tighter">{force.toExponential(4)} N</p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/[0.02] p-8 md:p-10 border-t border-white/5">
          <h4 className="font-orbitron text-[8px] md:text-[9px] font-bold text-white/30 mb-6 tracking-[0.4em] uppercase">Konstanta Fisika</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8px] md:text-[9px] text-white/40 font-orbitron tracking-widest uppercase">Kec. Cahaya (c)</span>
              <span className="text-[10px] md:text-xs text-white font-mono tracking-tighter">299,792,458 m/s</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8px] md:text-[9px] text-white/40 font-orbitron tracking-widest uppercase">Gravitasi (G)</span>
              <span className="text-[10px] md:text-xs text-white font-mono tracking-tighter">6.6743 × 10⁻¹¹</span>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-12 md:mt-16 font-orbitron text-[8px] tracking-[0.4em] text-white/20 uppercase text-center">
        EAC Education Astronomy Creator & copy; 2026 <span className="mx-4">|</span> Dibuat oleh XZEERH
      </p>
    </div>
  );
};