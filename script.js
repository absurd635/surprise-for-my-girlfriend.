const CORRECT_PIN = '240726';

const page1 = document.getElementById('page1');
const pinInput = document.getElementById('pinInput');
const pinBtn = document.getElementById('pinBtn');
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const restartBtn = document.getElementById('restartBtn');

let isPlaying = false;

pinBtn.addEventListener('click', checkPin);
pinInput.addEventListener('keydown', (e) => e.key === 'Enter' && checkPin());

function checkPin() {
    if (pinInput.value === CORRECT_PIN) {
        switchPage('page1', 'page2');
        playMusic();
        pinInput.value = '';
        window.scrollTo(0, 0);
    } else {
        pinInput.style.border = '2px solid #ff6b6b';
        pinInput.value = '';
        alert('PIN salah ya, coba lagi 💜');
        setTimeout(() => pinInput.style.border = 'none', 2000);
    }
}

document.querySelectorAll('.nextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const current = btn.closest('.page').id;
        const next = btn.dataset.next;
        switchPage(current, next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

document.querySelectorAll('.prevBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const current = btn.closest('.page').id;
        const prev = btn.dataset.prev;
        switchPage(current, prev);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

restartBtn.addEventListener('click', () => {
    switchPage('page6', 'page1');
    pinInput.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function switchPage(from, to) {
    document.getElementById(from)?.classList.remove('active');
    document.getElementById(to)?.classList.add('active');
}

musicBtn.addEventListener('click', () => isPlaying ? pauseMusic() : playMusic());

function playMusic() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = '🔊';
        musicBtn.classList.add('playing');
    }).catch(() => {
        isPlaying = false;
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    });
}

function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');
}

bgMusic.addEventListener('pause', () => {
    if (!bgMusic.ended) {
        isPlaying = false;
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    }
});

bgMusic.addEventListener('play', () => {
    isPlaying = true;
    musicBtn.textContent = '🔊';
    musicBtn.classList.add('playing');
});
