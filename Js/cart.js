// ── cart.js — Cart page logic ──

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

let cart = JSON.parse(localStorage.getItem('pc_cart') || '[]');

function saveCart() {
  localStorage.setItem('pc_cart', JSON.stringify(cart));
}

function updateSummary() {
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = totalQty;
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('summary-sub').textContent   = 'RWF ' + sub.toLocaleString();
  document.getElementById('summary-total').textContent = 'RWF ' + sub.toLocaleString();
  document.getElementById('cart-item-count').textContent = cart.length + ' item' + (cart.length !== 1 ? 's' : '');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  updateSummary();
  const list = document.getElementById('cart-items-list');
  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Browse our medicine catalogue and add items to your cart.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="window.location='medicine.html'">Browse Medicines</button>
      </div>`;
    return;
  }
  list.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-icon">${c.emoji}</div>
      <div class="cart-item-info">
        <h4>${c.name}</h4>
        <p>${c.brand}</p>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
        <span class="qty-value">${c.qty}</span>
        <button class="qty-btn" onclick="changeQty(${c.id}, +1)">+</button>
      </div>
      <div class="item-total">RWF ${(c.price * c.qty).toLocaleString()}</div>
      <button class="remove-btn" onclick="removeFromCart(${c.id})">🗑️</button>
    </div>
  `).join('');
}

function checkout() {
  if (cart.length === 0) { showToast('⚠️ Your cart is empty'); return; }
  if (!localStorage.getItem('pc_user')) { window.location = 'login.html'; return; }
  cart = [];
  saveCart();
  renderCart();
  showToast('🎉 Order placed! Delivery in 24–48 hours.');
}

renderCart();