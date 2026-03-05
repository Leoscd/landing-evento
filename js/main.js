// === SCROLL ANIMATIONS ===
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

// Agregar clase reveal a secciones al cargar
document.querySelectorAll('.contexto, .temario, .instructor, .inscripcion, .cta-final, .modulo, .stat-item, .comp-col').forEach(el => {
  el.classList.add('reveal');
});

// Re-observar despues de agregar clases
document.querySelectorAll('.reveal').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(el);
});

// === FORMULARIO ===
const form = document.getElementById('formInscripcion');
const btnSubmit = document.getElementById('btnSubmit');
const confirmacion = document.getElementById('formConfirmacion');
const confirmacionMsg = document.getElementById('confirmacionMsg');

function showError(id, msg) {
  const el = document.getElementById('error-' + id);
  const input = document.getElementById(id);
  if (el) el.textContent = msg;
  if (input) input.classList.add('error');
}

function clearError(id) {
  const el = document.getElementById('error-' + id);
  const input = document.getElementById(id);
  if (el) el.textContent = '';
  if (input) input.classList.remove('error');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  // Limpiar error al escribir
  form.querySelectorAll('.form__input').forEach(input => {
    input.addEventListener('input', () => clearError(input.id));
    input.addEventListener('change', () => clearError(input.id));
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const pais = document.getElementById('pais').value;
    const experiencia = document.getElementById('experiencia').value;
    const software = document.getElementById('software').value;

    // Validaciones
    if (!nombre) { showError('nombre', 'Por favor ingresa tu nombre completo'); valid = false; }
    else clearError('nombre');

    if (!email) { showError('email', 'Por favor ingresa tu email'); valid = false; }
    else if (!validateEmail(email)) { showError('email', 'El formato del email no es valido'); valid = false; }
    else clearError('email');

    if (!pais) { showError('pais', 'Por favor selecciona tu pais'); valid = false; }
    else clearError('pais');

    if (!experiencia) { showError('experiencia', 'Por favor selecciona tu experiencia'); valid = false; }
    else clearError('experiencia');

    if (!software) { showError('software', 'Por favor selecciona tu software'); valid = false; }
    else clearError('software');

    if (!valid) return;

    // Envio simulado
    btnSubmit.textContent = 'Procesando...';
    btnSubmit.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      confirmacionMsg.textContent = 'Listo, ' + nombre + '. Te esperamos el 17 de marzo.';
      confirmacion.classList.add('visible');
    }, 1500);
  });
}

// === NAV HAMBURGER ===
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    // En mobile mostrar/ocultar CTA
    const cta = document.querySelector('.nav__cta');
    if (cta) {
      const isVisible = cta.style.display === 'flex';
      cta.style.display = isVisible ? 'none' : 'flex';
    }
  });
}
