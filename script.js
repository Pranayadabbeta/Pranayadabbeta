// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - 58,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar active state on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 70;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Mobile menu toggle with slide-in drawer and backdrop
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navBackdrop = document.getElementById('navBackdrop');

function openNavDrawer() {
  navLinksContainer.classList.add('open');
  menuToggle.classList.add('open');
  navBackdrop.classList.add('open');
  document.body.classList.add('nav-open');
}
function closeNavDrawer() {
  navLinksContainer.classList.remove('open');
  menuToggle.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.classList.remove('nav-open');
}
menuToggle.addEventListener('click', () => {
  if (navLinksContainer.classList.contains('open')) {
    closeNavDrawer();
  } else {
    openNavDrawer();
  }
});
navBackdrop.addEventListener('click', closeNavDrawer);
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeNavDrawer();
  });
});

// Animate sections on scroll
const sections = document.querySelectorAll('.section');
const animateOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0) scale(1)';
    }
  });
};
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact form validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields.';
      formMessage.style.color = '#ff3366';
      return;
    }
    // Simple email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.style.color = '#ff3366';
      return;
    }
    formMessage.textContent = 'Message sent! (Demo only)';
    formMessage.style.color = '#00e5ff';
    contactForm.reset();
  });
}

// Dark/Light mode toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

function setMode(isLight) {
  if (isLight) {
    body.classList.add('light-mode');
    sunIcon.style.display = '';
    moonIcon.style.display = 'none';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = '';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setMode(true);
} else {
  setMode(false);
}

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    setMode(!body.classList.contains('light-mode'));
  });
}

// 3D tilt effect on project cards
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 18,
    speed: 400,
    glare: true,
    'max-glare': 0.18,
    scale: 1.04,
    gyroscope: true
  });
} 