const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');
let stars = []; let shootingStars = []; let fireworks = []; let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas); resizeCanvas();
class Star {
    constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 1.5; this.alpha = Math.random(); this.speed = Math.random() * 0.02; }
    update() { this.alpha += this.speed; if (this.alpha > 1 || this.alpha < 0) this.speed = -this.speed; }
    draw() { ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`; ctx.fillRect(this.x, this.y, this.size, this.size); }
}
class ShootingStar {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * (canvas.height / 2); this.len = Math.random() * 80 + 40; this.speed = Math.random() * 10 + 5; this.alpha = 1; }
    update() { this.x += this.speed; this.y += this.speed * 0.5; this.alpha -= 0.02; if (this.alpha <= 0) this.reset(); }
    draw() { ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x - this.len, this.y - this.len * 0.5); ctx.stroke(); }
}
for (let i = 0; i < 150; i++) stars.push(new Star());
for (let i = 0; i < 2; i++) shootingStars.push(new ShootingStar());
function animateCosmos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    shootingStars.forEach(sStar => { sStar.update(); sStar.draw(); });
    fireworks.forEach((fw, idx) => { fw.update(); fw.draw(); if (fw.done) fireworks.splice(idx, 1); });
    particles.forEach((p, idx) => { p.update(); p.draw(); if (p.alpha <= 0) particles.splice(idx, 1); });
    requestAnimationFrame(animateCosmos);
}
animateCosmos();
const phrase = "Hey Batkiii ... 🚀"; let charIndex = 0;
const typewriterElement = document.getElementById('typewriter');
const enterBtn = document.getElementById('enter-btn');
function typeAnimation() {
    if (charIndex < phrase.length) { typewriterElement.textContent += phrase.charAt(charIndex); charIndex++; setTimeout(typeAnimation, 120); } else { enterBtn.classList.remove('disabled'); }
}
setTimeout(typeAnimation, 1000);
enterBtn.addEventListener('click', () => {
    if (enterBtn.classList.contains('disabled')) return;
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('portal-screen').classList.add('active');
    initHeartsGenerator();
});
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => { document.getElementById('portal-screen').classList.remove('active'); document.getElementById('main-content').classList.add('active'); }, 1800);
});
function createHeart() {
    const heart = document.createElement('div'); heart.classList.add('heart'); heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw'; heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart); setTimeout(() => heart.remove(), 4000);
}
function initHeartsGenerator() { setInterval(createHeart, 400); }
const musicToggle = document.getElementById('music-toggle'); const bgMusic = document.getElementById('bg-music'); let playing = false;
musicToggle.addEventListener('click', () => {
    if (!playing) { bgMusic.play().catch(e => console.log("Audio started")); musicToggle.textContent = '⏸️'; } else { bgMusic.pause(); musicToggle.textContent = '🎵'; }
    playing = !playing;
});
let currentImgIndex = 0; const photoThumbs = document.querySelectorAll('.photo-thumb img');
const lightbox = document.getElementById('lightbox'); const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.photo-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => { currentImgIndex = parseInt(thumb.getAttribute('data-index')); updateLightboxSource(); lightbox.style.display = 'flex'; });
});
function updateLightboxSource() { lightboxImg.src = photoThumbs[currentImgIndex] ? photoThumbs[currentImgIndex].src : 'https://picsum.photos' + currentImgIndex; }
document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.style.display = 'none');
document.querySelector('.next-btn').addEventListener('click', () => { currentImgIndex = (currentImgIndex + 1) % 10; updateLightboxSource(); });
document.querySelector('.prev-btn').addEventListener('click', () => { currentImgIndex = (currentImgIndex - 1 + 10) % 10; updateLightboxSource(); });
let inputBuffer = ''; const secretKey = 'badiiii';
window.addEventListener('keydown', (e) => {
    inputBuffer += e.key.toLowerCase(); if (inputBuffer.length > 20) inputBuffer = inputBuffer.substring(1);
    if (inputBuffer.includes(secretKey)) { document.getElementById('easter-egg-modal').style.display = 'flex'; inputBuffer = ''; triggerExplosionFinale(); }
});
document.getElementById('close-modal').addEventListener('click', () => { document.getElementById('easter-egg-modal').style.display = 'none'; });
class Firework {
    constructor(tx, ty) { this.x = Math.random() * canvas.width; this.y = canvas.height; this.tx = tx; this.ty = ty; this.speed = 4; this.done = false; }
    update() {
        let dx = this.tx - this.x; let dy = this.ty - this.y; let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 5) { this.done = true; createExplosionParticles(this.tx, this.ty); } else { this.x += (dx / dist) * this.speed; this.y += (dy / dist) * this.speed; }
    }
    draw() { ctx.fillStyle = '#ff3b30'; ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI*2); ctx.fill(); }
}
class Particle {
    constructor(x, y) { this.x = x; this.y = y; this.vx = (Math.random() - 0.5) * 8; this.vy = (Math.random() - 0.5) * 8; this.alpha = 1; this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; }
    update() { this.x += this.vx; this.y += this.vy; this.alpha -= 0.015; }
    draw() { ctx.fillStyle = this.color; ctx.globalAlpha = this.alpha; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2); ctx.fill(); ctx.globalAlpha = 1.0; }
}
function createExplosionParticles(x, y) { for(let i=0; i<40; i++) particles.push(new Particle(x, y)); }
function triggerExplosionFinale() { for(let i=0; i<5; i++) { setTimeout(() => { fireworks.push(new Firework(Math.random()*canvas.width, Math.random()*(canvas.height/2))); }, i * 300); } }
document.getElementById('finale-btn').addEventListener('click', triggerExplosionFinale);
