const particles = document.getElementById('particles');
const snippets = ['<div>', 'React', 'const', 'CSS', 'HTML', 'Git', 'state', 'props', '</>', 'quest++', 'levelUp()'];

if (particles) {
  for (let i = 0; i < 42; i++) {
    const item = document.createElement('span');
    item.className = 'particle';
    item.textContent = snippets[Math.floor(Math.random() * snippets.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDelay = `${Math.random() * 10}s`;
    item.style.animationDuration = `${8 + Math.random() * 10}s`;
    particles.appendChild(item);
  }
}

const world = document.getElementById('world');
const progress = document.getElementById('progress');
const runner = document.getElementById('runner');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const navBtns = [...document.querySelectorAll('.nav-btn')];
const levels = [...document.querySelectorAll('.level')];

let current = 0;
let lock = false;
let runTimer;

function setLevel(index) {
  if (!world || levels.length === 0) return;

  current = Math.max(0, Math.min(levels.length - 1, index));
  world.style.transform = `translateX(-${current * 100}vw)`;

  if (progress) {
    progress.style.width =
      levels.length > 1
        ? `${(current / (levels.length - 1)) * 100}%`
        : '100%';
  }

  navBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === current);
  });

  if (runner) {
    runner.classList.add('running');
    clearTimeout(runTimer);
    runTimer = setTimeout(() => runner.classList.remove('running'), 620);
  }
}

function next() {
  setLevel(current + 1);
}

function prev() {
  setLevel(current - 1);
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    setLevel(Number(btn.dataset.target));
  });
});

document.querySelectorAll('[data-next]').forEach((btn) => {
  btn.addEventListener('click', () => {
    setLevel(Number(btn.dataset.next));
  });
});

nextBtn?.addEventListener('click', next);
prevBtn?.addEventListener('click', prev);

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (['arrowright', 'd', 'pagedown', ' '].includes(key)) {
    event.preventDefault();
    next();
  }

  if (['arrowleft', 'a', 'pageup'].includes(key)) {
    event.preventDefault();
    prev();
  }
});

window.addEventListener(
  'wheel',
  (event) => {
    if (window.innerWidth <= 720) return;

    event.preventDefault();
    if (lock) return;

    lock = true;
    event.deltaY > 0 ? next() : prev();

    setTimeout(() => {
      lock = false;
    }, 700);
  },
  { passive: false }
);

document.querySelectorAll('.skill').forEach((skill) => {
  skill.addEventListener('click', () => {
    skill.classList.toggle('active');
  });
});

setLevel(0);