const title = document.querySelector('.title')
const text = `Buat Elza Khusus Coba Next`.split('')

// Create container for better responsive layout
title.style.display = 'flex'
title.style.flexWrap = 'wrap'
title.style.justifyContent = 'center'
title.style.gap = '0.5rem'

for (let index = 0; index < text.length; index++) {
  if (text[index] !== ' ') {
    title.innerHTML += `<span>${text[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

const textElements = document.querySelectorAll('.title span');
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3;
  element.style.animationDelay = `${randomDelay}s`;
});

// ===== NEON ELZA SEQUENTIAL FLICKER =====
const neonLetters = ['neon-e', 'neon-l', 'neon-z', 'neon-a'];
const ON_DURATION = 500;   // ms huruf menyala aktif (flicker)
const OFF_DURATION = 150;   // ms jeda sebelum huruf berikutnya
const PAUSE_AFTER = 800;   // ms jeda setelah semua huruf selesai satu putaran

// State tiap huruf: 'on' | 'off'
function setLetterOn(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none';
  el.style.color = '#fff';
  el.style.opacity = '1';
  el.style.textShadow = `
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #ff6ec7,
    0 0 40px #ff6ec7,
    0 0 80px #ff6ec7,
    0 0 90px #ff6ec7
  `;
  // Trigger reflow lalu pasang animasi flicker
  void el.offsetWidth;
  el.style.animation = 'neon-flicker-on 0.5s ease forwards';
}

function setLetterOff(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'neon-off 1s ease infinite';
  el.style.color = '#555';
  el.style.textShadow = 'none';
}

// Matikan semua di awal
neonLetters.forEach(id => setLetterOff(id));

let currentIndex = 0;

function runSequence() {
  const id = neonLetters[currentIndex];

  // Nyalakan huruf saat ini
  setLetterOn(id);

  setTimeout(() => {
    // Matikan huruf saat ini
    setLetterOff(id);

    currentIndex++;

    if (currentIndex < neonLetters.length) {
      // Jeda singkat antar huruf, lalu nyalakan berikutnya
      setTimeout(runSequence, OFF_DURATION);
    } else {
      // Semua huruf sudah ditampilkan, jeda lalu mulai lagi dari E
      currentIndex = 0;
      setTimeout(runSequence, PAUSE_AFTER);
    }
  }, ON_DURATION);
}

// Mulai setelah sedikit delay (biar halaman sempat load)
setTimeout(runSequence, 800);