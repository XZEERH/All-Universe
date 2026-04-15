import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import './EacRegistration.css'; // Gunakan file CSS yang sama

// CONFIG FIREBASE KHUSUS REGISTRASI 2
const firebaseConfig = {
    databaseURL: "https://registrasi-2-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Definisi Tipe Data
interface Registrant {
    nama: string;
    umur: string;
    status: string;
    tiktok: string;
    alasan: string;
}

export default function EacRegistration2() {
    // State Management
    const [view, setView] = useState<'form' | 'loading' | 'preview'>('form');
    const [formData, setFormData] = useState<Registrant>({
        nama: '',
        umur: '',
        status: 'lainnya',
        tiktok: '',
        alasan: ''
    });
    const [dbList, setDbList] = useState<Registrant[]>([]);
    
    // Ref untuk target download kartu
    const cardRef = useRef<HTMLDivElement>(null);

    // Mengambil data secara realtime dari Firebase
    useEffect(() => {
        const pendaftarRef = ref(database, 'pendaftar');
        const unsubscribe = onValue(pendaftarRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Konversi object ke array dan balik urutannya (data terbaru di atas)
                const list = Object.values(data) as Registrant[];
                setDbList(list.reverse());
            } else {
                setDbList([]);
            }
        });

        // Cleanup listener saat komponen unmount
        return () => unsubscribe();
    }, []);

    // Handle perubahan input di form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Eksekusi Tombol Kirim
    const generateIDCard = () => {
        if (!formData.nama || !formData.alasan) {
            return alert("Isi data dengan lengkap!");
        }

        setView('loading'); // Tampilkan loader

        const pendaftarRef = ref(database, 'pendaftar');
        // Push ke Firebase
        push(pendaftarRef, formData).then(() => {
            // Simulasi delay biar animasi loading terlihat
            setTimeout(() => {
                setView('preview'); // Tampilkan kartu ID
            }, 2000);
        });
    };

    // Eksekusi Tombol Unduh
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
            {/* LOGO ANIMASI */}
            <div className="logo-area">
                <div className="orbit o1" style={{ '--tw-rotate': '45deg' } as React.CSSProperties}></div>
                <div className="orbit o2" style={{ '--tw-rotate': '-45deg' } as React.CSSProperties}></div>
                <div className="orbit o3" style={{ '--tw-rotate': '90deg' } as React.CSSProperties}></div>
                <div className="eac-badge">EAC</div>
            </div>

            {/* JUDUL */}
            <div className="main-title">EAC <span>REGISTRASI 2</span></div>
            <div className="desc-title">Education Astronomy Creator</div>

            {/* SECTION: FORM */}
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
                            <option value="lainnya">lainnya</option>
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

            {/* SECTION: LOADER */}
            {view === 'loading' && (
                <div className="loader-container">
                    <div className="spin"></div>
                    <p style={{ fontFamily: 'Orbitron', fontSize: '10px', marginTop: '10px', color: 'var(--accent-purple)' }}>
                        MENGHUBUNGKAN DATABASE...
                    </p>
                </div>
            )}

            {/* SECTION: PREVIEW & DOWNLOAD */}
            {view === 'preview' && (
                <div className="form-container preview-section">
                    <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '15px' }}>KARTU IDENTITAS ANDA</p>

                    <div id="id-card-capture" ref={cardRef} style={{ display: 'block' }}>
                        <p className="card-header-text">EAC COMMUNITY 2</p>
                        <div className="card-title">KARTU IDENTITAS EAC</div>
                        <div className="card-line"></div>
                        <div className="card-info-row"><div className="card-label">NAMA:</div><div className="card-value">{formData.nama}</div></div>
                        <div className="card-info-row"><div className="card-label">UMUR:</div><div className="card-value">{formData.umur}</div></div>
                        <div className="card-info-row"><div className="card-label">STATUS:</div><div className="card-value">{formData.status}</div></div>
                        <div className="card-info-row"><div className="card-label">TIKTOK:</div><div className="card-value">{formData.tiktok}</div></div>
                        <div className="card-info-row"><div className="card-label">ALASAN:</div><div className="card-value">{formData.alasan}</div></div>
                    </div>

                    <button className="btn-generate" style={{ background: '#22c55e' }} onClick={downloadAction}>UNDUH KARTU</button>
                    {/* LINK WHATSAPP SESUAI KODE KEDUA */}
                    <button className="btn-generate" onClick={() => window.location.href = 'https://chat.whatsapp.com/H9PAUxpULbFG8xB87nc5ls'}>GABUNG GRUP</button>
                </div>
            )}

            {/* SECTION: DATABASE AKTIVITAS */}
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