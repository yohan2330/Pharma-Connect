// ── profile.js — Profile page logic ──

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

const tabs = ['pTab-personal', 'pTab-health', 'pTab-orders', 'pTab-prescriptions', 'pTab-settings'];

function selectTab(el, tabId) {
  document.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  tabs.forEach(id => {
    const tab = document.getElementById(id);
    if (tab) tab.style.display = id === tabId ? 'block' : 'none';
  });
}

function toggleEdit(id) {
  document.getElementById(id + '-view').style.display = 'none';
  document.getElementById(id + '-edit').style.display = 'grid';
}

function saveEdit(id) {
  document.getElementById(id + '-view').style.display = 'grid';
  document.getElementById(id + '-edit').style.display = 'none';
  showToast('Profile updated successfully');
}

function cancelEdit(id) {
  document.getElementById(id + '-view').style.display = 'grid';
  document.getElementById(id + '-edit').style.display = 'none';
}

function logout() {
  localStorage.removeItem('pc_user');
  window.location = 'login.html';
}

// Load cart badge and user info
const cart = JSON.parse(localStorage.getItem('pc_cart') || '[]');
document.getElementById('cart-count').textContent = cart.reduce((s, c) => s + c.qty, 0);

const user = JSON.parse(localStorage.getItem('pc_user') || '{}');
if (user.name)  document.getElementById('p-name').textContent  = user.name;
if (user.email) document.getElementById('p-email').textContent = user.email;