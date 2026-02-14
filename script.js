const letter = document.getElementById("letter");
const envelopeWrap = document.getElementById("envelopeWrap");
const envelope = document.getElementById("envelope");
const hearts = document.getElementById("hearts");

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

let musicOn = false;
let heartsInterval = null;

// Start hearts gently
function startHearts() {
  if (heartsInterval) return;

  heartsInterval = setInterval(() => {
    createHeart();
  }, 260);
}

// Create a single heart
function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > 0.5 ? "💗" : "💖";

  const left = Math.random() * 100; // vw
  const size = 14 + Math.random() * 18;
  const duration = 5 + Math.random() * 4;

  h.style.left = left + "vw";
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";

  hearts.appendChild(h);

  setTimeout(() => h.remove(), (duration + 0.5) * 1000);
}

// Opens letter
function openLetter() {
  // flip envelope flap
  envelope.classList.add("open");

  // show letter after a small delay (cute timing)
  setTimeout(() => {
    envelopeWrap.style.display = "none";
    letter.classList.add("show");
    letter.setAttribute("aria-hidden", "false");
  }, 750);

  // start hearts
  startHearts();

  // Try to start music AFTER user click (allowed by browsers)
  // If it fails (some browsers), she can turn it on using the button.
  bgm.volume = 0.35;
  bgm.play()
    .then(() => {
      musicOn = true;
      musicBtn.textContent = "🎵 Music: On";
    })
    .catch(() => {
      musicOn = false;
      musicBtn.textContent = "🎵 Music: Tap to play";
    });
}

// Toggle music button inside letter
function toggleMusic(e) {
  e.stopPropagation();

  if (!musicOn) {
    bgm.volume = 0.35;
    bgm.play().then(() => {
      musicOn = true;
      musicBtn.textContent = "🎵 Music: On";
    }).catch(() => {
      musicBtn.textContent = "🎵 Music: Tap again";
    });
  } else {
    bgm.pause();
    musicOn = false;
    musicBtn.textContent = "🎵 Music: Off";
  }
}