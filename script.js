const audio = document.getElementById('bgMusic');
let isMusicStarted = false;
let isUserPaused = false;

// Fungsi Navigasi Antar Halaman/Screen
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Membuka Halaman Utama & Memutar Musik Pertama Kali
function openFirstTime() {
    goToScreen('screen2');
    if (!isMusicStarted && !isUserPaused) {
        audio.play().then(() => {
            isMusicStarted = true;
        }).catch(err => {
            console.log("Autoplay ditolak browser: ", err);
        });
    }
}

// Toggle On/Off Musik via Tombol Kanan Atas
function toggleAudio() {
    if (audio.paused) {
        audio.play();
        isUserPaused = false;
        isMusicStarted = true;
    } else {
        audio.pause();
        isUserPaused = true;
    }
}

// Otomatis Pause jika Tab/Browser Ditutup atau Diminimalkan
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (!audio.paused) {
            audio.pause();
        }
    } else {
        if (isMusicStarted && !isUserPaused) {
            audio.play().catch(() => {});
        }
    }
});