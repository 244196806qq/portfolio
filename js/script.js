const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));

function updateNav() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const current = sections.find(section => window.scrollY >= section.offsetTop - 180)?.id;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
