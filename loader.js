document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const uiLayer = document.getElementById('uiLayer');
    const loadingText = document.getElementById('loadingText');
    const loadingPercent = document.getElementById('loadingPercent');

    const texts =[
        "Menginisialisasi Alam Semesta...", 
        "Membentuk Galaksi...", 
        "Menghitung Orbit Planet...", 
        "Membuka Ruang & Waktu..."
    ];
    let textIdx = 0;
    
    // Ganti teks tiap 1 detik
    const textInterval = setInterval(() => {
        textIdx = (textIdx + 1) % texts.length;
        if(loadingText) loadingText.innerText = texts[textIdx];
    }, 1000);

    // Hitung persentase 0 sampai 100% dalam 4 detik
    let percent = 0;
    const duration = 4000; // 4 Detik
    const intervalTime = 40; 
    const step = 100 / (duration / intervalTime);

    const progressInterval = setInterval(() => {
        percent += step;
        if (percent >= 100) {
            percent = 100;
            clearInterval(progressInterval);
        }
        if(loadingPercent) loadingPercent.innerText = Math.floor(percent) + "%";
    }, intervalTime);

    // Tepat setelah 4 detik, hilangkan loading screen
    setTimeout(() => {
        clearInterval(textInterval);
        loadingScreen.style.opacity = '0'; // Efek pudar
        
        // Hapus elemen setelah pudar dan tampilkan UI utama
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            uiLayer.classList.remove('hidden');
        }, 500); 
    }, 4000); // Waktu Eksekusi 4 Detik
});