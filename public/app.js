// ---------- Countdown ----------
function getTomorrowMidnight() {
    const now = new Date();
    const t = new Date(now);
    t.setDate(now.getDate() + 1);
    t.setHours(0, 0, 0, 0);
    return t;
}

function pad(n) { return String(n).padStart(2, "0"); }

function startCountdown() {
    const el = document.getElementById("countdownText");
    const target = getTomorrowMidnight();

    function tick() {
        const now = new Date();
        const ms = target - now;
        if (ms <= 0) {
            el.textContent = "It’s your birthday! 🎂✨";
            return;
        }
        const s = Math.floor(ms / 1000);
        const hh = Math.floor(s / 3600);
        const mm = Math.floor((s % 3600) / 60);
        const ss = s % 60;
        el.textContent = `Countdown: ${pad(hh)}:${pad(mm)}:${pad(ss)} 🎈`;
        requestAnimationFrame(() => setTimeout(tick, 250));
    }
    tick();
}

// ---------- Confetti ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let W, H, confetti = [], running = false;

function resize() {
    W = canvas.width = window.innerWidth * devicePixelRatio;
    H = canvas.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

function rand(min, max) { return Math.random() * (max - min) + min; }

function burstConfetti(count = 200) {
    for (let i = 0; i < count; i++) {
        confetti.push({
            x: rand(0, W),
            y: rand(-100, 0),
            vx: rand(-2, 2),
            vy: rand(2, 6),
            r: rand(4, 8),
            life: rand(60, 120)
        });
    }
    if (!running) {
        running = true;
        animate();
    }
}

function animate() {
    ctx.clearRect(0, 0, W, H);

    for (let i = confetti.length - 1; i >= 0; i--) {
        const p = confetti[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;

        ctx.fillStyle = `hsl(${Math.random()*360},90%,60%)`;
        ctx.fillRect(p.x, p.y, p.r, p.r);

        if (p.life <= 0 || p.y > H) confetti.splice(i, 1);
    }

    if (confetti.length > 0) {
        requestAnimationFrame(animate);
    } else {
        running = false;
    }
}

// ---------- Surprise ----------
const surprise = document.getElementById("surprise");

document.getElementById("giftBtn").addEventListener("click", () => {
    surprise.classList.remove("hidden");
    burstConfetti(250);
});

document.getElementById("closeSurprise").addEventListener("click", () => {
    surprise.classList.add("hidden");
});

// ---------- Party Button ----------
document.getElementById("partyBtn").addEventListener("click", () => {
    burstConfetti(350);
    document.querySelector(".badge").textContent = "🥳 PARTY MODE: ON 🥳";
});

// ---------- Music Toggle ----------
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
let musicOn = false;

musicBtn.addEventListener("click", async () => {
    try {
        if (!musicOn) {
            await bgm.play();
            musicOn = true;
            musicBtn.textContent = "Music: On 🎵";
        } else {
            bgm.pause();
            musicOn = false;
            musicBtn.textContent = "Music: Off 🎵";
        }
    } catch (err) {
        alert("Add a music file at music/song.mp3");
    }
});

// ---------- Init ----------
startCountdown();
burstConfetti(200);