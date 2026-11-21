
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.drop-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const dropdown = button.closest('.nav-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    document.querySelectorAll('.nav-dropdown').forEach((other) => {
      if (other !== dropdown) {
        other.classList.remove('open');
        other.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
    });
  }
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Static-site enquiry: opens the visitor's email app;
// no form data is sent to a server.
document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const company = String(data.get('company') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !email || !message) return;

  const subject = `Kivo Enterprises Enquiry - ${service}`;
  const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}`;

  window.location.href = `mailto:ashish.s@kivoenterprises.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
