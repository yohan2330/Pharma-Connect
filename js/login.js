// ── login.js — Login / Register logic ──

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

function switchTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('login-form').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('signup-form').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('auth-switch-text').innerHTML = tab === 'login'
    ? 'New to PharmaConnect? <a onclick="switchTab(\'signup\')">Create a free account</a>'
    : 'Already have an account? <a onclick="switchTab(\'login\')">Sign in</a>';
}

function login() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  if (!email || !pass) { showToast('Please fill in all fields'); return; }
  localStorage.setItem('pc_user', JSON.stringify({ email }));
  showToast('Welcome back!');
  setTimeout(() => window.location = 'index.html', 1000);
}

function register() {
  const first = document.getElementById('reg-first').value.trim();
  const last  = document.getElementById('reg-last').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  if (!first || !last || !email) { showToast('Please fill in all fields'); return; }
  localStorage.setItem('pc_user', JSON.stringify({ name: first + ' ' + last, email }));
  showToast('Account created! Welcome to PharmaConnect');
  setTimeout(() => window.location = 'index.html', 1000);
}