export function jalankanLoader(onSelesai) {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    const loadingPercent = document.getElementById('loadingPercent');
    const uiLayer = document.getElementById('uiLayer');

    const texts =[
        "Menginisialisasi Kosmos...", 
        "Menghitung Gravitasi Planet...", 
        "Memuat Lubang Hitam...", 
        "Membuka Ruang & Waktu..."
    ];
    
    const startTime = Date.now();
    const duration = 4000; // 4 Detik Pasti Selesai

    function update() {
        const elapsed = Date.now() - startTime;
        let percent = (elapsed / duration) * 100;
        
        if (percent > 100) percent = 100;
        if (loadingPercent) loadingPercent.innerText = Math.floor(percent) + "%";

        const textIdx = Math.floor(elapsed / 1000) % texts.length;
        if (loadingText) loadingText.innerText = texts[textIdx];

        if (percent < 100) {
            requestAnimationFrame(update);
        } else {
            // Animasi Selesai
            if (loadingScreen) loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (uiLayer) uiLayer.classList.remove('hidden');
                
                // Beri tahu aplikasi utama untuk mulai merender kanvas
                if (onSelesai) onSelesai();
            }, 500);
        }
    }
    
    requestAnimationFrame(update);
}