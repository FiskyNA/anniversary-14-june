/* ========================================
   Anniversary Website - Interactive Features
   ======================================== */

// ========================================
// Constants & Configuration
// ========================================
const CONFIG = {
    anniversary: {
        date: new Date('2026-03-14T00:00:00+05:30'), // IST - We met on 14 March 2026
        hindiMonths: [
            { name: 'Chaitra', start: 'March', end: 'April' },
            { name: 'Vaishakh', start: 'April', end: 'May' },
            { name: 'Jyeshtha', start: 'May', end: 'June' },
            { name: 'Ashadha', start: 'June', end: 'July' },
            { name: 'Shravan', start: 'July', end: 'August' },
            { name: 'Bhadrapada', start: 'August', end: 'September' },
            { name: 'Ashwin', start: 'September', end: 'October' },
            { name: 'Kartik', start: 'October', end: 'November' },
            { name: 'Margashirsha', start: 'November', end: 'December' },
            { name: 'Pausha', start: 'December', end: 'January' },
            { name: 'Magha', start: 'January', end: 'February' },
            { name: 'Phalguna', start: 'February', end: 'March' }
        ]
    },
    particles: {
        count: 50,
        colors: ['#FF6B8A', '#C9B1FF', '#FFD700', '#FF8FA3']
    }
};

// ========================================
// DOM Elements
// ========================================
const elements = {
    loader: document.getElementById('loader'),
    mainSite: document.getElementById('main-site'),
    cursor: document.getElementById('cursor'),
    canvas: document.getElementById('particles-canvas'),
    heroImage: document.getElementById('heroImage'),
    quotesCarousel: document.getElementById('quotesCarousel'),
    quoteDots: document.getElementById('quoteDots'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    togetherYears: document.getElementById('togetherYears'),
    togetherMonths: document.getElementById('togetherMonths'),
    togetherDays: document.getElementById('togetherDays'),
    togetherHours: document.getElementById('togetherHours'),
    togetherMinutes: document.getElementById('togetherMinutes'),
    togetherSeconds: document.getElementById('togetherSeconds'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    confetti: document.getElementById('confetti'),
    dayNight: document.getElementById('dayNight'),
    bgMusic: document.getElementById('bgMusic'),
    footerDate: document.getElementById('footerDate'),
    floatingHearts: document.getElementById('floatingHearts'),
    galleryGrid: document.getElementById('galleryGrid'),
    letterContainer: document.getElementById('letterContainer'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText')
};

// ========================================
// Particle System
// ========================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)],
            opacity: Math.random() * 0.5 + 0.3,
            pulse: Math.random() * Math.PI * 2
        };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, i) => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;
            
            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                p.x -= dx * 0.01;
                p.y -= dy * 0.01;
            }
            
            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Draw particle
            const pulseSize = p.size + Math.sin(p.pulse) * 1;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (dist2 < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = (1 - dist2 / 100) * 0.2;
                    this.ctx.stroke();
                }
            }
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Custom Cursor
// ========================================
class CustomCursor {
    constructor() {
        this.cursor = elements.cursor;
        this.pos = { x: 0, y: 0 };
        this.visible = false;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.pos.x = e.clientX;
            this.pos.y = e.clientY;
            if (!this.visible) {
                this.visible = true;
                this.cursor.classList.add('visible');
            }
            this.update();
        });

        document.addEventListener('mouseleave', () => {
            this.visible = false;
            this.cursor.classList.remove('visible');
        });

        document.addEventListener('click', (e) => {
            this.createHeartBurst(e.clientX, e.clientY);
        });
    }

    update() {
        this.cursor.style.left = this.pos.x + 'px';
        this.cursor.style.top = this.pos.y + 'px';
    }

    createHeartBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                font-size: 20px;
                z-index: 10000;
                transition: all 0.8s ease;
                opacity: 1;
            `;
            document.body.appendChild(heart);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            
            setTimeout(() => {
                heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                heart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => heart.remove(), 800);
        }
    }
}

// ========================================
// Floating Hearts
// ========================================
class FloatingHearts {
    constructor(container) {
        this.container = container;
        this.createHearts();
    }

    createHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '✨', '🌟'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 15 + 's';
            heart.style.animationDuration = 15 + Math.random() * 10 + 's';
            this.container.appendChild(heart);
        }
    }
}

// ========================================
// Quotes Carousel
// ========================================
class QuotesCarousel {
    constructor() {
        this.quotes = document.querySelectorAll('.quote-card');
        this.currentIndex = 0;
        this.dotsContainer = elements.quoteDots;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.startAutoplay();
        this.showQuote(0);
    }

    createDots() {
        this.quotes.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'quote-dot';
            dot.addEventListener('click', () => this.showQuote(i));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.quote-dot');
    }

    bindEvents() {
        document.querySelector('.quote-btn.prev').addEventListener('click', () => {
            this.prev();
            this.resetAutoplay();
        });
        
        document.querySelector('.quote-btn.next').addEventListener('click', () => {
            this.next();
            this.resetAutoplay();
        });
    }

    showQuote(index) {
        this.quotes.forEach((q, i) => {
            q.classList.remove('active');
            this.dots[i].classList.remove('active');
        });
        
        this.quotes[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentIndex = index;
    }

    next() {
        this.showQuote((this.currentIndex + 1) % this.quotes.length);
    }

    prev() {
        this.showQuote((this.currentIndex - 1 + this.quotes.length) % this.quotes.length);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
}

// ========================================
// IST Helper
// ========================================
function getISTDate() {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 5.5 * 60 * 60 * 1000);
}

function istDateStr(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// ========================================
// Countdown Timer
// ========================================
class CountdownTimer {
    constructor() {
        this.startY = 2026;
        this.startM = 2;
        this.startD = 14;
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const ist = getISTDate();
        const y = ist.getFullYear();
        const m = ist.getMonth();
        const d = ist.getDate();
        const h = ist.getHours();
        const min = ist.getMinutes();
        const s = ist.getSeconds();

        // Next 14th
        let nextY = y, nextM = m;
        if (d >= 14) {
            nextM++;
            if (nextM > 11) { nextM = 0; nextY++; }
        }
        const targetMs = new Date(nextY, nextM, 14, 0, 0, 0).getTime();
        const currentMs = new Date(y, m, d, h, min, s).getTime();
        const diff = targetMs - currentMs;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        this.animate(elements.days, days);
        this.animate(elements.hours, hours);
        this.animate(elements.minutes, minutes);
        this.animate(elements.seconds, seconds);

        // Milestone label
        const totalMonths = (y - this.startY) * 12 + (m - this.startM);
        const nextMonths = totalMonths + 1;
        const emojis = ['🌸','💕','💖','💗','💝','✨','🌟','💫','🎆','🎇','🎉','🎂'];
        const emoji = emojis[(nextMonths - 1) % emojis.length] || '❤️';
        let label;
        if (nextMonths <= 12) {
            label = `${nextMonths} Month${nextMonths > 1 ? 's' : ''}`;
        } else {
            const y2 = Math.floor(nextMonths / 12);
            const m2 = nextMonths % 12;
            label = `${y2} Year${y2 > 1 ? 's' : ''}${m2 ? ' ' + m2 + ' Month' + (m2 > 1 ? 's' : '') : ''}`;
        }
        const labelEl = document.getElementById('nextMilestoneLabel');
        if (labelEl) labelEl.textContent = `${emoji} Next: ${label} — 14/${String(nextM + 1).padStart(2, '0')}/${nextY}`;

        // Together counter
        let tMonths = totalMonths;
        let tDays = d - this.startD;
        if (tDays < 0) {
            tMonths--;
            tDays += new Date(y, m, 0).getDate();
        }
        const years = Math.floor(tMonths / 12);
        const remMonths = tMonths % 12;

        // Live clock - hours, minutes, seconds from current time
        if (elements.togetherYears) elements.togetherYears.textContent = years;
        if (elements.togetherMonths) elements.togetherMonths.textContent = remMonths;
        if (elements.togetherDays) elements.togetherDays.textContent = tDays;
        if (elements.togetherHours) elements.togetherHours.textContent = h;
        if (elements.togetherMinutes) elements.togetherMinutes.textContent = min;
        if (elements.togetherSeconds) elements.togetherSeconds.textContent = s;
    }

    animate(el, val) {
        if (!el) return;
        if (parseInt(el.textContent) !== val) {
            el.style.transform = 'translateY(-10px)';
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = String(val).padStart(2, '0');
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 150);
        }
    }
}

// ========================================
// Milestones Animation
// ========================================
class MilestonesAnimator {
    constructor() {
        this.milestones = document.querySelectorAll('.milestone-card');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        this.milestones.forEach(m => this.observer.observe(m));
    }
}

// ========================================
// Scroll Reveal
// ========================================
class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        this.revealElements.forEach(el => this.observer.observe(el));
    }
}

// ========================================
// Gallery
// ========================================
class Gallery {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        this.bindEvents();
    }

    bindEvents() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption')?.textContent || '';
                this.openLightbox(img.src, caption);
            });
        });
        
        document.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        elements.lightbox.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) this.closeLightbox();
        });
    }

    openLightbox(src, caption) {
        elements.lightboxImage.src = src;
        elements.lightboxCaption.textContent = caption;
        elements.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        elements.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// Typewriter Effect (replaces LoveLetterReveal)
// ========================================
class TypewriterEffect {
    constructor() {
        this.paragraphs = document.querySelectorAll('.letter-paragraph');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    this.typeParagraph(entry.target);
                }
            });
        }, { threshold: 0.3 });
        this.paragraphs.forEach(p => {
            if (!p.dataset.text) return;
            p.textContent = '';
            this.observer.observe(p);
        });
    }

    typeParagraph(el) {
        const text = el.dataset.text;
        if (!text) return;
        let i = 0;
        el.classList.add('visible', 'typing');
        const interval = setInterval(() => {
            el.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                el.classList.remove('typing');
            }
        }, 50);
    }
}

// ========================================
// Preloader
// ========================================
class Preloader {
    constructor() {
        this.complete = false;
        this.progress = 0;
        this.bar = elements.progressBar;
        this.text = elements.progressText;
        this.tick = setInterval(() => this.advance(), 400);
        this.safetyTimer();
    }

    advance() {
        if (this.complete) return;
        this.progress += Math.random() * 18 + 8;
        if (this.progress >= 100) this.progress = 100;
        this.update();
        if (this.progress >= 100) this.finish();
    }

    finish() {
        this.complete = true;
        clearInterval(this.tick);
    }

    safetyTimer() {
        setTimeout(() => {
            if (!this.complete) {
                this.progress = 100;
                this.update();
                this.finish();
            }
        }, 5000);
    }

    update() {
        if (this.bar) this.bar.style.width = Math.round(this.progress) + '%';
        if (this.text) this.text.textContent = Math.round(this.progress) + '%';
    }

    isComplete() {
        return this.complete;
    }
}

// ========================================
// Parallax Scrolling
// ========================================
class ParallaxScroll {
    constructor() {
        this.layers = document.querySelectorAll('[data-parallax]');
        if (this.layers.length === 0) return;
        this.ticking = false;
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    }

    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                this.layers.forEach(el => {
                    const speed = parseFloat(el.dataset.parallax) || 0.5;
                    el.style.transform = `translateY(${scrollY * speed * -0.1}px)`;
                });
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}

// ========================================
// Cherry Blossom Petal Rain
// ========================================
class PetalRain {
    constructor() {
        this.container = document.getElementById('petalContainer');
        if (!this.container) return;
        this.petals = ['🌸', '🌸', '🌸', '🌸', '🌸', '🌺', '🌸'];
        this.interval = setInterval(() => this.spawn(), 600);
    }

    spawn() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = this.petals[Math.floor(Math.random() * this.petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (Math.random() * 12 + 14) + 'px';
        petal.style.animation = `petalFall ${Math.random() * 7 + 10}s linear forwards`;
        this.container.appendChild(petal);
        setTimeout(() => petal.remove(), 17000);
    }
}

// ========================================
// Photo Slideshow
// ========================================
class PhotoSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slideshow-slide');
        this.dotsContainer = document.getElementById('slideshowDots');
        this.toggleBtn = document.getElementById('slideshowToggle');
        if (this.slides.length === 0) return;
        this.currentIndex = 0;
        this.playing = true;
        this.interval = null;
        this.init();
    }

    init() {
        this.createDots();
        this.showSlide(0);
        this.startAutoplay();
        this.bindEvents();
        this.slides.forEach(s => {
            s.addEventListener('click', () => {
                const img = s.querySelector('img');
                const caption = s.querySelector('.gallery-caption')?.textContent || '';
                if (elements.lightbox && elements.lightboxImage) {
                    elements.lightboxImage.src = img.src;
                    elements.lightboxCaption.textContent = caption;
                    elements.lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    createDots() {
        if (!this.dotsContainer) return;
        this.slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'slideshow-dot';
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        });
    }

    showSlide(index) {
        this.slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        if (this.dotsContainer) {
            this.dotsContainer.querySelectorAll('.slideshow-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        }
        this.currentIndex = index;
    }

    goTo(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }

    next() {
        this.showSlide((this.currentIndex + 1) % this.slides.length);
    }

    startAutoplay() {
        this.interval = setInterval(() => this.next(), 4000);
    }

    resetAutoplay() {
        clearInterval(this.interval);
        this.startAutoplay();
    }

    toggle() {
        if (this.playing) {
            clearInterval(this.interval);
            if (this.toggleBtn) this.toggleBtn.textContent = '▶';
        } else {
            this.startAutoplay();
            if (this.toggleBtn) this.toggleBtn.textContent = '⏸';
        }
        this.playing = !this.playing;
    }

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }
}

// ========================================
// Confetti Effect
// ========================================
class ConfettiEffect {
    constructor() {
        this.colors = ['#FF6B8A', '#C9B1FF', '#FFD700', '#FF8FA3', '#FFFFFF'];
    }

    create() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                left: ${Math.random() * 100}%;
                top: -10px;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${this.colors[Math.floor(Math.random() * this.colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            elements.confetti.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// ========================================
// Day/Night Mode
// ========================================
class DayNightMode {
    constructor() {
        this.isNight = false;
        this.bindEvents();
    }

    bindEvents() {
        elements.dayNight.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isNight = !this.isNight;
        document.body.classList.toggle('night-mode', this.isNight);
    }
}

// ========================================
// Keyboard Shortcuts
// ========================================
class KeyboardShortcuts {
    constructor(confetti) {
        this.confetti = confetti;
        this.musicPlaying = false;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'l':
                    this.confetti.create();
                    break;
                case 'h':
                    this.createHeartRain();
                    break;
                case 'm':
                    this.toggleMusic();
                    break;
            }
        });
    }

    createHeartRain() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${Math.random() * 20 + 20}px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }

    toggleMusic() {
        const fabMusic = document.getElementById('fabMusic');
        if (!elements.bgMusic.src && !elements.bgMusic.currentSrc) return;
        
        if (this.musicPlaying) {
            elements.bgMusic.pause();
            if (fabMusic) fabMusic.textContent = '🎵';
            if (fabMusic) fabMusic.classList.remove('playing');
            if (window.audioWave) window.audioWave.hide();
        } else {
            elements.bgMusic.play().catch(() => {});
            if (fabMusic) fabMusic.textContent = '🎶';
            if (fabMusic) fabMusic.classList.add('playing');
            if (window.audioWave) window.audioWave.show();
        }
        this.musicPlaying = !this.musicPlaying;
    }
}

// ========================================
// Navigation
// ========================================
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.links = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.bindEvents();
    }

    bindEvents() {
        // Show nav after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.classList.add('visible');
            } else {
                this.nav.classList.remove('visible');
            }
        });
        
        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
        
        // Smooth scroll for nav links
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    updateActiveLink() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ========================================
// Hero Image 3D Effect
// ========================================
class HeroImage3D {
    constructor() {
        this.image = elements.heroImage;
        this.wrapper = document.querySelector('.hero-image-wrapper');
        this.bindEvents();
    }

    bindEvents() {
        this.wrapper.addEventListener('mousemove', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            this.image.style.transform = `
                perspective(1000px)
                rotateY(${x * 20}deg)
                rotateX(${-y * 20}deg)
                scale(1.05)
            `;
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            this.image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    }
}

// ========================================
// Long Press Hidden Message
// ========================================
class LongPress {
    constructor() {
        this.heroImage = document.getElementById('heroImage');
        this.overlay = document.getElementById('secretOverlay');
        this.timer = null;
        this.hint = document.getElementById('longPressHint');
        this.bindEvents();
    }

    bindEvents() {
        if (!this.heroImage || !this.overlay) return;

        // Mouse events
        this.heroImage.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startTimer();
        });

        this.heroImage.addEventListener('mouseup', () => this.cancelTimer());
        this.heroImage.addEventListener('mouseleave', () => this.cancelTimer());

        // Touch events
        this.heroImage.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startTimer();
        }, { passive: false });

        this.heroImage.addEventListener('touchend', () => this.cancelTimer());
        this.heroImage.addEventListener('touchcancel', () => this.cancelTimer());

        // Dismiss overlay
        this.overlay.addEventListener('click', () => this.hideOverlay());
        this.overlay.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.hideOverlay();
        });
    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.showOverlay();
        }, 500);
    }

    cancelTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    showOverlay() {
        this.overlay.classList.add('show');
        if (this.hint) this.hint.style.opacity = '0';
    }

    hideOverlay() {
        this.overlay.classList.remove('show');
    }
}

// ========================================
// Audio Wave Visualizer
// ========================================
class AudioWave {
    constructor() {
        this.wave = document.getElementById('audioWave');
    }

    show() {
        if (this.wave) this.wave.classList.add('playing');
    }

    hide() {
        if (this.wave) this.wave.classList.remove('playing');
    }
}

// ========================================
// Loader
// ========================================
class Loader {
    constructor(preloader) {
        this.preloader = preloader;
        this.dismissed = false;
        this.bindEvents();
        this.checkAutoDismiss();
    }

    bindEvents() {
        elements.loader.addEventListener('click', () => this.hide());
    }

    checkAutoDismiss() {
        const check = () => {
            if (this.dismissed) return;
            if (this.preloader.isComplete()) {
                setTimeout(() => {
                    if (!this.dismissed) this.hide();
                }, 800);
            } else {
                setTimeout(check, 300);
            }
        };
        setTimeout(check, 1000);
    }

    hide() {
        if (this.dismissed) return;
        this.dismissed = true;
        elements.loader.classList.add('hidden');
        elements.mainSite.classList.remove('hidden');
        elements.mainSite.classList.add('visible');
        document.body.style.overflow = '';
        
        // Show music popup after a short delay
        setTimeout(() => {
            const popup = document.getElementById('musicPopup');
            if (popup) popup.classList.add('show');
        }, 800);
    }
}

// ========================================
// Music Permission Popup
// ========================================
function initMusicPopup() {
    const popup = document.getElementById('musicPopup');
    const yesBtn = document.getElementById('musicYes');
    const noBtn = document.getElementById('musicNo');
    const fabMusic = document.getElementById('fabMusic');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Play the song
            elements.bgMusic.play().catch(() => {});
            if (fabMusic) {
                fabMusic.textContent = '🎶';
                fabMusic.classList.add('playing');
            }
            if (window.audioWave) window.audioWave.show();
            // Update keyboard shortcuts state
            if (window.musicShortcut) window.musicShortcut.musicPlaying = true;
            // Close popup
            popup.classList.remove('show');
        });
    }
    
    if (noBtn) {
        noBtn.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    }
}
function updateFooterDate() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    elements.footerDate.textContent = now.toLocaleDateString('en-IN', options);
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    // Initialize all components
    const preloader = new Preloader();
    const particleSystem = new ParticleSystem(elements.canvas);
    const customCursor = new CustomCursor();
    const floatingHearts = new FloatingHearts(elements.floatingHearts);
    const petalRain = new PetalRain();
    const loader = new Loader(preloader);
    
    // Initialize after loader
    const quotesCarousel = new QuotesCarousel();
    const countdownTimer = new CountdownTimer();
    const milestonesAnimator = new MilestonesAnimator();
    const scrollReveal = new ScrollReveal();
    const gallery = new Gallery();
    const typewriter = new TypewriterEffect();
    const confetti = new ConfettiEffect();
    const dayNightMode = new DayNightMode();
    const keyboardShortcuts = new KeyboardShortcuts(confetti);
    const navigation = new Navigation();
    const heroImage3D = new HeroImage3D();
    const parallaxScroll = new ParallaxScroll();
    const slideshow = new PhotoSlideshow();
    const longPress = new LongPress();
    window.audioWave = new AudioWave();
    window.musicShortcut = keyboardShortcuts;
    
    // Update footer date
    updateFooterDate();
    
    // Initialize music popup
    initMusicPopup();
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                quotesCarousel.next();
            } else {
                quotesCarousel.prev();
            }
        }
    }
    
    console.log('❤️ Anniversary Website Loaded - Press L for confetti, H for hearts, M for music');

    // ========================================
    // Floating Action Buttons (Mobile Friendly)
    // ========================================
    const fabToggle = document.getElementById('fabToggle');
    const fabMenu = document.getElementById('fabMenu');
    const fabConfetti = document.getElementById('fabConfetti');
    const fabHearts = document.getElementById('fabHearts');
    const fabMusic = document.getElementById('fabMusic');

    if (fabToggle) {
        fabToggle.addEventListener('click', () => {
            fabToggle.classList.toggle('open');
            fabMenu.classList.toggle('open');
        });
    }

    if (fabConfetti) {
        fabConfetti.addEventListener('click', () => {
            confetti.create();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }

    if (fabHearts) {
        fabHearts.addEventListener('click', () => {
            keyboardShortcuts.createHeartRain();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }

    if (fabMusic) {
        fabMusic.addEventListener('click', () => {
            keyboardShortcuts.toggleMusic();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }
});
