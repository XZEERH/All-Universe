import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import './EacRegistration.css'; // Sesuaikan lokasi import css

// Konfigurasi Firebase
const firebaseConfig = {
    databaseURL: "https://registrasi-1-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface Registrant {
    nama: string;
    umur: string;
    status: string;
    tiktok: string;
    alasan: string;
}

export default function EacRegistration() {
    // States
    const [view, setView] = useState<'form' | 'loading' | 'preview'>('form');
    const [formData, setFormData] = useState<Registrant>({
        nama: '',
        umur: '',
        status: 'Lainnya',
        tiktok: '',
        alasan: ''
    });
    const [dbList, setDbList] = useState<Registrant[]>([]);
    
    // Ref untuk kartu agar bisa di capture html2canvas
    const cardRef = useRef<HTMLDivElement>(null);

    // Ambil Data Realtime Firebase
    useEffect(() => {
        const pendaftarRef = ref(database, 'pendaftar');
        const unsubscribe = onValue(pendaftarRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Ubah object ke array lalu di reverse agar yang terbaru ada di atas (seperti afterbegin)
                const list = Object.values(data) as Registrant[];
                setDbList(list.reverse());
            } else {
                setDbList([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit ke Firebase
    const generateIDCard = () => {
        if (!formData.nama || !formData.alasan) {
            return alert("Isi data dengan lengkap!");
        }

        setView('loading');

        const pendaftarRef = ref(database, 'pendaftar');
        push(pendaftarRef, formData).then(() => {
            setTimeout(() => {
                setView('preview');
            }, 2000);
        });
    };

    // Download ID Card
    const downloadAction = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: '#01040a' });
            const url = canvas.toDataURL("image/png");
            
            const a = document.createElement('a');
            a.download = `EAC_CARD_${formData.nama}.png`;
            a.href = url;
            a.click();
        }
    };

    return (
        <div className="eac-container">
            <div className="logo-area">
                <div className="orbit o1" style={{ '--tw-rotate': '45deg' } as React.CSSProperties}></div>
                <div className="orbit o2" style={{ '--tw-rotate': '-45deg' } as React.CSSProperties}></div>
                <div className="orbit o3" style={{ '--tw-rotate': '90deg' } as React.CSSProperties}></div>
                <div className="eac-badge">EAC</div>
            </div>

            <div className="main-title">EAC <span>REGISTRASI 1</span></div>
            <div className="desc-title">Education Astronomy Creator</div>

            {/* FORM VIEW */}
            {view === 'form' && (
                <div className="form-container">
                    <div className="field">
                        <label>Nama Lengkap</label>
                        <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Nama asli..." />
                    </div>
                    <div className="field">
                        <label>Umur</label>
                        <input type="number" name="umur" value={formData.umur} onChange={handleInputChange} placeholder="minimal 12" />
                    </div>
                    <div className="field">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange}>
                            <option value="Lainnya">Lainnya</option>
                            <option value="Pelajar">Pelajar</option>
                            <option value="Mahasiswa">Mahasiswa</option>
                            <option value="Umum">Umum</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Nama akun Tiktok</label>
                        <input type="text" name="tiktok" value={formData.tiktok} onChange={handleInputChange} placeholder="tiktok.com/@username" />
                    </div>
                    <div className="field">
                        <label>Alasan Bergabung</label>
                        <textarea name="alasan" value={formData.alasan} onChange={handleInputChange} rows={2} placeholder="Tulis alasan..."></textarea>
                    </div>

                    <button className="btn-generate" onClick={generateIDCard}>KIRIM KE SISTEM DATA</button>
                </div>
            )}

            {/* LOADING VIEW */}
            {view === 'loading' && (
                <div className="loader-container">
                    <div className="spin"></div>
                    <p style={{ fontFamily: 'Orbitron', fontSize: '10px', marginTop: '10px', color: 'var(--accent-purple)' }}>
                        MENGHUBUNGKAN SISTEM DATABASE...
                    </p>
                </div>
            )}

            {/* PREVIEW VIEW */}
            {view === 'preview' && (
                <div className="form-container preview-section">
                    <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '15px' }}>KARTU IDENTITAS ANDA</p>

                    <div id="id-card-capture" ref={cardRef}>
                        <p className="card-header-text">EAC COMMUNITY 1</p>
                        <div className="card-title">KARTU IDENTITAS EAC</div>
                        <div className="card-line"></div>
                        <div className="card-info-row"><div className="card-label">NAMA:</div><div className="card-value">{formData.nama}</div></div>
                        <div className="card-info-row"><div className="card-label">UMUR:</div><div className="card-value">{formData.umur}</div></div>
                        <div className="card-info-row"><div className="card-label">STATUS:</div><div className="card-value">{formData.status}</div></div>
                        <div className="card-info-row"><div className="card-label">TIKTOK:</div><div className="card-value">{formData.tiktok}</div></div>
                        <div className="card-info-row"><div className="card-label">ALASAN:</div><div className="card-value">{formData.alasan}</div></div>
                    </div>

                    <button className="btn-generate" style={{ background: '#22c55e' }} onClick={downloadAction}>UNDUH KARTU</button>
                    <button className="btn-generate" onClick={() => window.location.href = 'https://chat.whatsapp.com/J3oPwax10tE8QFQVkBylMS'}>GABUNG GRUP</button>
                </div>
            )}

            {/* DATABASE TABLE */}
            <div className="db-box">
                <p style={{ fontFamily: 'Orbitron', color: 'var(--accent-purple)', fontSize: '12px' }}>DATABASE AKTIVITAS</p>
                <table>
                    <thead>
                        <tr><th>ANGGOTA</th><th>USIA</th><th>STATUS</th></tr>
                    </thead>
                    <tbody>
                        {dbList.map((val, index) => (
                            <tr key={index}>
                                <td>{val.nama}</td>
                                <td>{val.umur} Thn</td>
                                <td className="status-terdaftar">VERIFIED</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}