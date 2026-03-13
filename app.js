/* ================================================
   MARCA — Main JavaScript
   ================================================ */

'use strict';

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: 'WH22-6 Smart Fitness Watch',   brand: 'Xiaomi',      price: 454,    old: 620,   rating: 4.7, reviews: 2341,  emoji: '⌚', badge: 'top',  cat: 'Electronics', desc: 'Advanced fitness tracking with GPS, optical heart rate sensor, and 14-day battery. Water resistant to 50m. Available in midnight and sand.' },
  { id: 2,  name: 'Pro Tennis Racket Set',          brand: 'Nike',        price: 30.99,  old: null,  rating: 4.2, reviews: 876,   emoji: '🎾', badge: null,   cat: 'Sport',       desc: 'Lightweight aluminium frame, strung and ready to play. Perfect for beginners and intermediate players. Includes protective case.' },
  { id: 3,  name: 'Apex Boxing Gloves',             brand: 'Adidas',      price: 196.84, old: 275,   rating: 4.8, reviews: 3102,  emoji: '🥊', badge: 'top',  cat: 'Sport',       desc: 'Professional-grade triple-stitched leather. Anatomical thumb support, velcro wrist closure. Competition and training approved.' },
  { id: 4,  name: 'Club Kit Recurve Bow',           brand: 'Columbia',    price: 48.99,  old: null,  rating: 3.9, reviews: 412,   emoji: '🏹', badge: null,   cat: 'Sport',       desc: 'Complete beginner archery set with recurve bow, three arrows, arm guard, and foam target. Draw weight 20lb.' },
  { id: 5,  name: 'Therma-Fit Training Hoodie',     brand: 'Nike',        price: 154.99, old: 189,   rating: 5.0, reviews: 5891,  emoji: '🧥', badge: 'top',  cat: 'Fashion',     desc: 'Warm DRI-FIT technology hoodie. Kangaroo pocket, adjustable hood, dropped hem. Available in three colourways.' },
  { id: 6,  name: 'Air Monarch White Trainers',     brand: 'Nike',        price: 210,    old: 259,   rating: 4.6, reviews: 1203,  emoji: '👟', badge: 'top',  cat: 'Fashion',     desc: 'Responsive Air cushioning, engineered mesh upper, modern runner silhouette. Sizes 6–14.' },
  { id: 7,  name: 'QuietStudio NC Headphones',      brand: 'New Balance', price: 299,    old: 399,   rating: 4.5, reviews: 2100,  emoji: '🎧', badge: 'deal', cat: 'Electronics', desc: '40-hour battery with noise cancellation. Hi-Res audio certified, foldable travel design, USB-C fast charge.' },
  { id: 8,  name: 'Align Pro Yoga Mat',             brand: 'Demix',       price: 59,     old: null,  rating: 4.4, reviews: 788,   emoji: '🧘', badge: null,   cat: 'Wellness',    desc: '6mm eco-TPE foam, alignment lines printed with water-based inks, carry strap included. 183×61cm.' },
  { id: 9,  name: 'Blade 80% Mechanical Keyboard',  brand: 'Asics',       price: 129.99, old: 179,   rating: 4.7, reviews: 3340,  emoji: '⌨️', badge: 'deal', cat: 'Gaming',      desc: 'Per-key RGB, tactile blue switches, anodised aluminium frame. TKL compact layout, N-key rollover.' },
  { id: 10, name: 'Halo Bluetooth Speaker',         brand: 'Xiaomi',      price: 79,     old: null,  rating: 4.3, reviews: 1500,  emoji: '🔊', badge: null,   cat: 'Music',       desc: '360° omnidirectional sound, IPX7 waterproof, 12-hour battery. Party pairing connects two units.' },
  { id: 11, name: 'Velocity Running Shorts',        brand: 'Adidas',      price: 44.99,  old: 65,    rating: 4.6, reviews: 930,   emoji: '🩳', badge: null,   cat: 'Sport',       desc: 'Moisture-wicking four-way stretch fabric. Built-in brief liner, zippered rear pocket.' },
  { id: 12, name: 'Vortex Insulated Bottle',        brand: 'Columbia',    price: 34.99,  old: null,  rating: 4.8, reviews: 4200,  emoji: '💧', badge: 'new',  cat: 'Wellness',    desc: 'Double-wall vacuum insulation. Cold 24h, hot 12h. BPA-free, leak-proof lid. 750ml.' },
];

const CATEGORIES = [
  { name: 'All',         icon: '✦',  count: 12 },
  { name: 'Sport',       icon: '⚽', count: 4  },
  { name: 'Fashion',     icon: '👗', count: 2  },
  { name: 'Electronics', icon: '📱', count: 2  },
  { name: 'Wellness',    icon: '🌿', count: 2  },
  { name: 'Music',       icon: '🎵', count: 1  },
  { name: 'Gaming',      icon: '🎮', count: 1  },
];

// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
let state = {
  cart: [],
  wishlist: [],
  currentProduct: null,
  qty: 1,
  activeCat: 'All',
  currentPage: 'home',
  orders: [
    { id: 'MRC-2025-00234', name: 'Therma-Fit Training Hoodie', emoji: '🧥', date: 'Mar 10, 2025', price: 154.99, status: 'transit' },
    { id: 'MRC-2025-00198', name: 'WH22-6 Smart Fitness Watch',  emoji: '⌚', date: 'Feb 28, 2025', price: 454.00, status: 'delivered' },
    { id: 'MRC-2025-00155', name: 'Apex Boxing Gloves',          emoji: '🥊', date: 'Feb 14, 2025', price: 196.84, status: 'delivered' },
    { id: 'MRC-2025-00132', name: 'Club Kit Recurve Bow',        emoji: '🏹', date: 'Jan 30, 2025', price: 48.99,  status: 'processing' },
  ],
};

// ──────────────────────────────────────────────
// CURSOR
// ──────────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, [data-hover], input, select, .cat-pill, .nav-btn, .brand-item, .star-filter-row, .del-opt, .footer-link, .profile-nav-item, .pay-option')) {
    cursor.style.width = '28px'; cursor.style.height = '28px';
    cursorRing.style.width = '56px'; cursorRing.style.height = '56px';
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('a, button, [data-hover], input, select, .cat-pill, .nav-btn, .brand-item, .star-filter-row, .del-opt, .footer-link, .profile-nav-item, .pay-option')) {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
  }
});

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
function nav(page, opts = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (!el) return;
  el.classList.add('active');
  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'shop')     renderShop(opts.cat);
  if (page === 'detail')   renderDetail(opts.product);
  if (page === 'cart')     renderCart();
  if (page === 'checkout') renderCheckout();
  if (page === 'profile')  renderProfile();
  if (page === 'orders')   renderOrders();
}

// Scroll → navbar effect
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.classList.toggle('scrolled', window.scrollY > 40);
});

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
function stars(rating, size = 13) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<span class="${i <= Math.floor(rating) ? '' : i - 0.5 <= rating ? 'half' : 'empty'}" style="font-size:${size}px;">★</span>`;
  }
  return `<div class="stars">${s}</div>`;
}

function fmt(n) { return '$' + (+n).toFixed(2); }

function badgeHTML(b) {
  if (!b) return '';
  const labels = { top: 'Top Item', deal: 'Deal', new: 'New', sale: 'Sale' };
  return `<div class="card-badge badge-${b}">${labels[b] || b}</div>`;
}

// ──────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────
function toast(msg, type = 'default') {
  const stack = document.getElementById('toastStack');
  const icons = { success: '✓', error: '✕', default: '✦' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-icon">${icons[type]}</div><span class="toast-text">${msg}</span>`;
  stack.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toast-out 0.35s var(--ease-out) forwards';
    setTimeout(() => t.remove(), 350);
  }, 2800);
}

// ──────────────────────────────────────────────
// CART
// ──────────────────────────────────────────────
function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = state.cart.find(c => c.id === id);
  if (ex) ex.qty += qty;
  else state.cart.push({ ...p, qty });
  updateCartBadge();
  toast(`<strong>${p.name.substring(0, 28)}</strong> added to cart`, 'success');
}

function removeFromCart(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  updateCartBadge();
  if (state.currentPage === 'cart') renderCart();
}

function updateQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(99, item.qty + delta));
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const total = state.cart.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.style.display = total ? 'flex' : 'none';
  badge.classList.add('bounce');
  setTimeout(() => badge.classList.remove('bounce'), 400);
}

function cartTotals() {
  const sub = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = sub * 0.08;
  return { sub, tax, total: sub + tax };
}

// ──────────────────────────────────────────────
// WISHLIST
// ──────────────────────────────────────────────
function toggleWishlist(id, btn) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    btn.classList.remove('liked');
    toast(`Removed from wishlist`);
  } else {
    state.wishlist.push(id);
    btn.classList.add('liked');
    toast(`Added to wishlist ♥`, 'success');
  }
}

// ──────────────────────────────────────────────
// PRODUCT CARD HTML
// ──────────────────────────────────────────────
function productCardHTML(p, featured = false) {
  const wished = state.wishlist.includes(p.id);
  return `
    <div class="product-card${featured ? ' featured' : ''}" onclick="nav('detail', {product: ${p.id}})">
      <div class="card-image-wrap">
        <div style="font-size:${featured ? 90 : 72}px; user-select:none;">${p.emoji}</div>
        ${badgeHTML(p.badge)}
        <div class="card-actions">
          <button class="btn btn-icon btn-sm${wished ? ' liked' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id}, this)" title="Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-rating">
          ${stars(p.rating)}
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="card-footer">
          <div class="price-group">
            ${p.old ? `<span class="price-old">${fmt(p.old)}</span>` : ''}
            <span class="price-main">${fmt(p.price)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})" title="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ──────────────────────────────────────────────
// HOME PAGE
// ──────────────────────────────────────────────
function initHome() {
  // Featured cats
  const catsEl = document.getElementById('homeFeatCats');
  if (catsEl) {
    catsEl.innerHTML = CATEGORIES.slice(1).map(c => `
      <div class="cat-card fade-up" onclick="nav('shop', {cat: '${c.name}'})" style="animation-delay:${CATEGORIES.indexOf(c)*0.07}s;">
        <span class="cat-icon">${c.icon}</span>
        <div class="cat-label">${c.name}</div>
        <div class="cat-count">${c.count} items</div>
      </div>`).join('');
  }

  // Trending grid
  const gridEl = document.getElementById('homeTrendingGrid');
  if (gridEl) {
    const sorted = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
    gridEl.innerHTML = sorted.map((p, i) => {
      const fc = i === 0;
      return `<div class="fade-up" style="animation-delay:${0.1 + i * 0.06}s; grid-column:${fc ? 'span 2' : 'span 1'};">${productCardHTML(p, fc)}</div>`;
    }).join('');
  }
}

// ──────────────────────────────────────────────
// SHOP PAGE
// ──────────────────────────────────────────────
function renderShop(cat) {
  if (cat) state.activeCat = cat;

  // Cat pills
  const pipsEl = document.getElementById('shopCatPills');
  if (pipsEl) {
    pipsEl.innerHTML = CATEGORIES.map(c => `
      <button class="cat-pill${c.name === state.activeCat ? ' active' : ''}" onclick="renderShop('${c.name}')">${c.name}</button>`).join('');
  }

  let prods = state.activeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === state.activeCat);

  const sort = document.getElementById('shopSort');
  if (sort) {
    const v = sort.value;
    if (v === 'price-asc')  prods = [...prods].sort((a, b) => a.price - b.price);
    if (v === 'price-desc') prods = [...prods].sort((a, b) => b.price - a.price);
    if (v === 'rating')     prods = [...prods].sort((a, b) => b.rating - a.rating);
    if (v === 'popular')    prods = [...prods].sort((a, b) => b.reviews - a.reviews);
  }

  const cntEl = document.getElementById('shopCount');
  if (cntEl) cntEl.textContent = `${prods.length} items`;

  const gridEl = document.getElementById('shopGrid');
  if (gridEl) {
    gridEl.innerHTML = prods.map((p, i) =>
      `<div class="fade-up" style="animation-delay:${i * 0.05}s;">${productCardHTML(p)}</div>`
    ).join('');
  }

  initFilters();
}

function initFilters() {
  // Price range
  const minR = document.getElementById('priceMin');
  const maxR = document.getElementById('priceMax');
  if (minR && maxR) {
    const update = () => {
      const mn = +minR.value, mx = +maxR.value;
      document.getElementById('priceMinLabel').textContent = '$' + mn;
      document.getElementById('priceMaxLabel').textContent = '$' + mx;
      const p1 = mn / 1200 * 100, p2 = mx / 1200 * 100;
      const fill = document.getElementById('priceFill');
      if (fill) { fill.style.left = p1 + '%'; fill.style.width = (p2 - p1) + '%'; }
    };
    minR.addEventListener('input', update);
    maxR.addEventListener('input', update);
    update();
  }

  // Brand checkboxes
  const brandList = document.getElementById('brandList');
  if (brandList) {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))];
    brandList.innerHTML = brands.slice(0, 7).map((b, i) => `
      <div class="brand-item" onclick="toggleBrand(this)">
        <div class="brand-icon">${b[0]}</div>
        <span class="brand-name">${b}</span>
        <div class="checkbox${i < 6 ? ' checked' : ''}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>`).join('');
  }

  // Stars
  const starsEl = document.getElementById('starFilters');
  if (starsEl) {
    starsEl.innerHTML = [5, 4, 3].map(n => `
      <div class="star-filter-row" onclick="filterStar(${n})">
        ${stars(n, 14)} <span style="font-size:12px;color:var(--smoke)">& up</span>
      </div>`).join('');
  }
}

function toggleBrand(el) {
  const cb = el.querySelector('.checkbox');
  cb.classList.toggle('checked');
}
function filterStar(n) { toast(`Showing ${n}★ & up`); }
function selectDel(el) {
  document.querySelectorAll('.del-opt').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}

// ──────────────────────────────────────────────
// PRODUCT DETAIL
// ──────────────────────────────────────────────
function renderDetail(id) {
  const p = typeof id === 'number' ? PRODUCTS.find(x => x.id === id) : id;
  if (!p) return;
  state.currentProduct = p;
  state.qty = 1;

  const el = document.getElementById('detailContent');
  if (!el) return;

  const save = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

  el.innerHTML = `
    <div class="container">
      <div class="detail-wrap">
        <div class="detail-grid">
          <!-- Gallery -->
          <div>
            <div class="gallery-main" id="galleryMain">
              <div class="main-emoji" style="font-size:160px;">${p.emoji}</div>
            </div>
            <div class="gallery-thumbs">
              ${[p.emoji, '🔍', '📐', '🏷️'].map((em, i) => `
                <div class="gallery-thumb${i === 0 ? ' active' : ''}" onclick="selectThumb(this, '${em}')">${em}</div>`).join('')}
            </div>
          </div>
          <!-- Info -->
          <div class="fade-up">
            <div class="detail-breadcrumb">
              <span onclick="nav('home')">Home</span><span class="sep">›</span>
              <span onclick="nav('shop')">Shop</span><span class="sep">›</span>
              <span style="color:var(--ash);">${p.name}</span>
            </div>
            ${p.badge ? `<div style="margin-bottom:12px;">${badgeHTML(p.badge)}</div>` : ''}
            <div class="detail-brand">${p.brand}</div>
            <h1 class="detail-title">${p.name}</h1>
            <div class="detail-rating">
              ${stars(p.rating, 16)}
              <span style="font-size:14px;font-weight:600;color:var(--cream);">${p.rating}</span>
              <span class="review-count">(${p.reviews.toLocaleString()} reviews)</span>
            </div>
            <div class="detail-price-row">
              <span class="detail-price">${fmt(p.price)}</span>
              ${p.old ? `<span class="detail-old-price">${fmt(p.old)}</span><span class="detail-save">-${save}% OFF</span>` : ''}
            </div>
            <p class="detail-desc">${p.desc}</p>
            <div class="qty-row">
              <span class="qty-label">Qty</span>
              <div class="qty-ctrl">
                <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
                <span class="qty-num" id="detailQtyNum">1</span>
                <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
              </div>
            </div>
            <div class="detail-actions">
              <button class="btn btn-gold btn-lg" style="flex:1;" onclick="addToCart(${p.id}, state.qty)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Cart
              </button>
              <button class="btn btn-icon btn-lg" onclick="toggleWishlist(${p.id}, this)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div class="detail-perks">
              <div class="perk"><div class="perk-icon">🚀</div><div class="perk-title">Free Shipping</div><div class="perk-sub">Over $50</div></div>
              <div class="perk"><div class="perk-icon">↩️</div><div class="perk-title">30-Day Returns</div><div class="perk-sub">Hassle-free</div></div>
              <div class="perk"><div class="perk-icon">🔒</div><div class="perk-title">Secure Pay</div><div class="perk-sub">256-bit SSL</div></div>
            </div>
          </div>
        </div>

        <!-- Related -->
        <div class="section">
          <div class="section-header">
            <div><div class="section-eyebrow">You may also like</div><h2 class="section-title">Related Products</h2></div>
          </div>
          <div class="products-grid">
            ${PRODUCTS.filter(x => x.id !== p.id).slice(0, 4).map(rp => productCardHTML(rp)).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function selectThumb(el, em) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('galleryMain');
  if (main) {
    const m = main.querySelector('.main-emoji');
    if (m) { m.style.transform = 'scale(0.8)'; setTimeout(() => { m.textContent = em; m.style.transform = ''; }, 150); }
  }
}

function changeDetailQty(d) {
  state.qty = Math.max(1, Math.min(10, state.qty + d));
  const el = document.getElementById('detailQtyNum');
  if (el) el.textContent = state.qty;
}

// ──────────────────────────────────────────────
// CART
// ──────────────────────────────────────────────
function renderCart() {
  const el = document.getElementById('cartContent');
  if (!el) return;

  if (state.cart.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h2 class="empty-title">Your cart is empty</h2>
        <p class="empty-sub">Discover our latest collections</p>
        <button class="btn btn-gold" onclick="nav('shop')">Browse Shop</button>
      </div>`;
    return;
  }

  const { sub, tax, total } = cartTotals();

  el.innerHTML = `
    <div class="container">
      <div class="cart-layout">
        <div>
          <h1 class="headline fade-up" style="margin-bottom:32px;">Your Cart</h1>
          <div class="cart-items-list">
            ${state.cart.map((item, i) => `
              <div class="cart-item fade-up" style="animation-delay:${i * 0.07}s;">
                <div class="cart-item-img">${item.emoji}</div>
                <div class="cart-item-info">
                  <div class="cart-item-brand">${item.brand}</div>
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-meta">Unit: ${fmt(item.price)}</div>
                </div>
                <div class="cart-item-right">
                  <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
                  <div class="qty-ctrl">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                  </div>
                  <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                    Remove
                  </button>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="summary-card fade-up delay-3">
          <h2 class="summary-title">Order Summary</h2>
          <div class="summary-row"><span>Subtotal (${state.cart.reduce((s,c)=>s+c.qty,0)} items)</span><span>${fmt(sub)}</span></div>
          <div class="summary-row"><span>Shipping</span><span style="color:var(--sage);">Free</span></div>
          <div class="summary-row"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
          <div class="promo-row">
            <input class="promo-input" placeholder="Promo code" id="promoInput" />
            <button class="btn btn-outline btn-sm" onclick="applyPromo()">Apply</button>
          </div>
          <div class="summary-row total"><span>Total</span><span>${fmt(total)}</span></div>
          <button class="btn btn-gold" style="width:100%;margin-top:20px;justify-content:center;" onclick="nav('checkout')">
            Proceed to Checkout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn btn-ghost" style="width:100%;margin-top:8px;justify-content:center;" onclick="nav('shop')">Continue Shopping</button>
        </div>
      </div>
    </div>`;
}

function applyPromo() {
  const v = document.getElementById('promoInput')?.value.trim().toUpperCase();
  if (v === 'MARCA10') toast('10% discount applied!', 'success');
  else toast('Invalid promo code', 'error');
}

// ──────────────────────────────────────────────
// CHECKOUT
// ──────────────────────────────────────────────
function renderCheckout() {
  const el = document.getElementById('checkoutContent');
  if (!el) return;
  const { sub, tax, total } = cartTotals();

  el.innerHTML = `
    <div class="container">
      <div class="checkout-grid">
        <div>
          <h1 class="headline fade-up" style="margin-bottom:32px;">Checkout</h1>
          <div class="form-section fade-up delay-1">
            <div class="form-section-title">
              <div class="step-num">1</div>
              <span class="step-label">Shipping Information</span>
            </div>
            <div class="form-grid">
              <div class="form-field"><label>First Name</label><input class="form-input" placeholder="Sakil" /></div>
              <div class="form-field"><label>Last Name</label><input class="form-input" placeholder="Ahmed" /></div>
              <div class="form-field full"><label>Email Address</label><input class="form-input" type="email" placeholder="sakil@marca.co" /></div>
              <div class="form-field full"><label>Street Address</label><input class="form-input" placeholder="123 Market Street" /></div>
              <div class="form-field"><label>City</label><input class="form-input" placeholder="Tiruppur" /></div>
              <div class="form-field"><label>Pin Code</label><input class="form-input" placeholder="641604" /></div>
              <div class="form-field"><label>State</label><input class="form-input" placeholder="Tamil Nadu" /></div>
              <div class="form-field"><label>Phone</label><input class="form-input" placeholder="+91 98765 43210" /></div>
            </div>
          </div>
          <div class="form-section fade-up delay-2">
            <div class="form-section-title">
              <div class="step-num">2</div>
              <span class="step-label">Payment Method</span>
            </div>
            <div class="payment-opts">
              <div class="pay-option selected" onclick="selectPay(this)">
                <div class="pay-radio"></div>
                <div class="pay-info"><div class="pay-name">💳 Credit / Debit Card</div><div class="pay-sub">Visa, Mastercard, RuPay, Amex</div></div>
              </div>
              <div class="pay-option" onclick="selectPay(this)">
                <div class="pay-radio"></div>
                <div class="pay-info"><div class="pay-name">📱 UPI</div><div class="pay-sub">GPay, PhonePe, Paytm, BHIM</div></div>
              </div>
              <div class="pay-option" onclick="selectPay(this)">
                <div class="pay-radio"></div>
                <div class="pay-info"><div class="pay-name">💵 Cash on Delivery</div><div class="pay-sub">Pay when your order arrives</div></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="summary-card fade-up delay-3">
            <h2 class="summary-title">Order</h2>
            ${state.cart.slice(0, 3).map(item => `
              <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--ink-mid);">
                <div style="font-size:26px;">${item.emoji}</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:600;color:var(--cream);">${item.name.substring(0,28)}…</div><div style="font-size:11px;color:var(--smoke);">Qty: ${item.qty}</div></div>
                <div style="font-weight:700;color:var(--gold);font-size:14px;">${fmt(item.price * item.qty)}</div>
              </div>`).join('')}
            ${state.cart.length > 3 ? `<div style="font-size:12px;color:var(--smoke);text-align:center;margin-bottom:12px;">+${state.cart.length - 3} more items</div>` : ''}
            <div class="summary-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
            <div class="summary-row"><span>Shipping</span><span style="color:var(--sage);">Free</span></div>
            <div class="summary-row"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
            <div class="summary-row total"><span>Total</span><span>${fmt(total)}</span></div>
            <button class="btn btn-gold" style="width:100%;margin-top:24px;justify-content:center;" onclick="placeOrder()">
              Place Order
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function selectPay(el) {
  document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function placeOrder() {
  const orderId = 'MRC-' + Date.now().toString().slice(-8);
  document.getElementById('successOrderId').textContent = orderId;
  state.cart = [];
  updateCartBadge();
  nav('success');
}

// ──────────────────────────────────────────────
// TRACKING
// ──────────────────────────────────────────────
function trackOrder() {
  const val = document.getElementById('trackInput')?.value.trim();
  if (!val) { toast('Please enter an order ID', 'error'); return; }

  const steps = [
    { label: 'Order Placed',     icon: '📋', time: 'Mar 10, 2025 · 10:32 AM', done: true  },
    { label: 'Packed & Ready',   icon: '📦', time: 'Mar 11, 2025 · 2:15 PM',  done: true  },
    { label: 'Shipped',          icon: '🚚', time: 'Mar 12, 2025 · 8:00 AM',  done: true  },
    { label: 'Out for Delivery', icon: '🛵', time: 'Mar 13, 2025 · 9:00 AM',  current: true },
    { label: 'Delivered',        icon: '🏠', time: 'Expected today by 6 PM',   done: false },
  ];
  const doneCount = steps.filter(s => s.done).length;
  const fillPct = doneCount / (steps.length - 1) * 100;

  document.getElementById('trackResult').innerHTML = `
    <div class="tracking-card fade-up">
      <div class="tracking-top">
        <div>
          <div class="track-order-id">${val}</div>
          <div style="font-size:13px;color:var(--smoke);margin-top:4px;">Nike Therma-Fit Hoodie · 1 item</div>
        </div>
        <div class="track-status-badge">Out for Delivery</div>
      </div>
      <div class="track-steps">
        <div class="track-line-bg"></div>
        <div class="track-line-fill" id="trackFill" style="height:0"></div>
        ${steps.map(s => `
          <div class="track-step${!s.done && !s.current ? ' pending' : ''}">
            <div class="track-dot${s.done ? ' done' : s.current ? ' current' : ''}">${s.icon}</div>
            <div class="track-step-info">
              <div class="track-step-title">${s.label}</div>
              <div class="track-step-time">${s.time}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  setTimeout(() => {
    const fill = document.getElementById('trackFill');
    if (fill) fill.style.height = (doneCount * 82) + 'px';
  }, 200);
}

// ──────────────────────────────────────────────
// PROFILE
// ──────────────────────────────────────────────
function renderProfile() {
  renderProfileTab('orders');
}

function renderProfileTab(tab, triggerEl) {
  if (triggerEl) {
    document.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
    triggerEl.classList.add('active');
  }

  const el = document.getElementById('profileTabContent');
  if (!el) return;

  if (tab === 'orders') {
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Order History</h2>
      ${state.orders.map(o => `
        <div class="order-card">
          <div class="order-card-img">${o.emoji}</div>
          <div class="order-card-info">
            <div class="order-card-name">${o.name}</div>
            <div class="order-card-meta">${o.id} · ${o.date}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-weight:700;color:var(--gold);margin-bottom:6px;">${fmt(o.price)}</div>
            <div class="order-status-chip status-${o.status}">${o.status === 'delivered' ? 'Delivered' : o.status === 'transit' ? 'In Transit' : 'Processing'}</div>
          </div>
        </div>`).join('')}`;
  } else if (tab === 'wishlist') {
    const wl = PRODUCTS.filter(p => state.wishlist.includes(p.id));
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Wishlist</h2>
      ${wl.length ? `<div class="products-grid">${wl.map(p => productCardHTML(p)).join('')}</div>` : '<div class="empty-state"><div class="empty-icon">♥</div><h2 class="empty-title">No saved items</h2><p class="empty-sub">Heart a product to save it here</p><button class="btn btn-gold" onclick="nav(\'shop\')">Browse Shop</button></div>'}`;
  } else {
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Account Settings</h2>
      <div class="form-section">
        <div class="form-grid">
          <div class="form-field"><label>First Name</label><input class="form-input" value="Sakil" /></div>
          <div class="form-field"><label>Last Name</label><input class="form-input" value="Ahmed" /></div>
          <div class="form-field full"><label>Email</label><input class="form-input" type="email" value="sakil@honlor.app" /></div>
        </div>
        <button class="btn btn-gold" style="margin-top:20px;" onclick="toast('Settings saved','success')">Save Changes</button>
      </div>`;
  }
}

function renderOrders() {
  const el = document.getElementById('ordersContent');
  if (!el) return;
  el.innerHTML = state.orders.map(o => `
    <div class="order-card">
      <div class="order-card-img">${o.emoji}</div>
      <div class="order-card-info">
        <div class="order-card-name">${o.name}</div>
        <div class="order-card-meta">${o.id} · ${o.date}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:700;color:var(--gold);margin-bottom:6px;">${fmt(o.price)}</div>
        <div class="order-status-chip status-${o.status}">${o.status === 'delivered' ? 'Delivered' : o.status === 'transit' ? 'In Transit' : 'Processing'}</div>
      </div>
    </div>`).join('');
}

// ──────────────────────────────────────────────
// SHOP SORT
// ──────────────────────────────────────────────
window.onSortChange = () => renderShop();

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHome();
  updateCartBadge();
  nav('home');
});
