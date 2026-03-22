// ── medicine.js — Medicine catalogue logic ──

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

const medicines = [
  { id: 1,  name: 'Amoxicillin 500mg',     brand: 'Generic | Antibiotics',    price: 2400, badge: 'OTC', stock: 'in'  },
  { id: 2,  name: 'Paracetamol 1g',         brand: 'Panadol | Pain Relief',   price: 800,  badge: 'OTC', stock: 'in'  },
  { id: 3,  name: 'Vitamin D3 1000IU',      brand: 'Pharmavit | Vitamins',    price: 5500, badge: 'OTC', stock: 'in'  },
  { id: 4,  name: 'Lisinopril 10mg',        brand: 'Generic | Cardiac',       price: 3200, badge: 'Rx',  stock: 'low' },
  { id: 5,  name: 'Metformin 500mg',        brand: 'Glucophage | Diabetes',   price: 4100, badge: 'Rx',  stock: 'in'  },
  { id: 6,  name: 'Azithromycin 250mg',     brand: 'Zithromax | Antibiotics', price: 6800, badge: 'Rx',  stock: 'in'  },
  { id: 7,  name: 'Zinc + Vitamin C',       brand: 'Pharmavit | Vitamins',    price: 3600, badge: 'OTC', stock: 'in'  },
  { id: 8,  name: 'Ibuprofen 400mg',        brand: 'Brufen | Pain Relief',    price: 1500, badge: 'OTC', stock: 'in'  },
  { id: 9,  name: 'Omeprazole 20mg',        brand: 'Losec | Gastro',          price: 4200, badge: 'OTC', stock: 'low' },
  { id: 10, name: 'Cetirizine 10mg',        brand: 'Zyrtec | Allergy',        price: 2100, badge: 'OTC', stock: 'in'  },
  { id: 11, name: 'Baby Syrup Paracetamol', brand: 'Calpol | Pediatrics',     price: 3800, badge: 'OTC', stock: 'in'  },
  { id: 12, name: 'Iron + Folic Acid',      brand: 'Generic | Maternal',      price: 2900, badge: 'OTC', stock: 'in'  },
];

let cart = JSON.parse(localStorage.getItem('pc_cart') || '[]');
document.getElementById('cart-count').textContent = cart.reduce((s, c) => s + c.qty, 0);

function addToCart(id, e) {
  if (e) e.stopPropagation();
  const med = medicines.find(m => m.id === id);
  if (!med) return;
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...med, qty: 1 }); }
  localStorage.setItem('pc_cart', JSON.stringify(cart));
  document.getElementById('cart-count').textContent = cart.reduce((s, c) => s + c.qty, 0);
  showToast('✅ ' + med.name + ' added to cart');
}

function toggleTag(el) {
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function renderMedicines() {
  document.getElementById('med-grid').innerHTML = medicines.map(m => `
    <div class="medicine-card">
      <div class="medicine-img">
        ${m.emoji}
        <span class="medicine-badge ${m.badge === 'Rx' ? 'rx' : m.stock === 'low' ? 'low' : ''}">
          ${m.badge === 'Rx' ? 'Rx Only' : m.stock === 'low' ? 'Low Stock' : 'Available'}
        </span>
      </div>
      <div class="medicine-info">
        <h4>${m.name}</h4>
        <div class="brand">${m.brand}</div>
        <div class="medicine-footer">
          <div>
            <div class="medicine-price">RWF ${m.price.toLocaleString()}</div>
            <div class="stock-indicator ${m.stock}">
              ${m.stock === 'in' ? '✓ In Stock' : m.stock === 'low' ? '⚡ Low Stock' : '✗ Out of Stock'}
            </div>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${m.id}, event)">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

renderMedicines();