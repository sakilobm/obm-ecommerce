/* ================================================
   OBM STUDIO — app.js v2 (Premium Edition)
   ================================================ */
'use strict';

// ── THEME ──────────────────────────────────────
function initTheme() {
  const t = localStorage.getItem('obm-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
  updateThemeIcon(t);
}
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('obm-theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  const sun = document.querySelector('.icon-sun');
  const moon = document.querySelector('.icon-moon');
  if (sun && moon) { sun.style.display = theme === 'dark' ? 'block' : 'none'; moon.style.display = theme === 'dark' ? 'none' : 'block'; }
}

// ── DATA ────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: 'Premium Wedding Album',       brand: 'Obm Studio', price: 150,   old: 200,  rating: 4.9, reviews: 1204, emoji: '📖', badge: 'top',  cat: 'Albums',       desc: 'Handcrafted layflat wedding album with premium photographic paper and genuine leather cover. Up to 80 pages, personalised cover text.' },
  { id: 2,  name: 'Custom Printed Mug',          brand: 'Obm Studio', price: 18.99, old: 25,   rating: 4.7, reviews: 850,  emoji: '☕', badge: 'deal', cat: 'Photo Mugs',   desc: 'High-quality ceramic mug with vibrant, fade-resistant photo printing. Microwave and dishwasher safe. 11oz.' },
  { id: 3,  name: 'Classic Wooden Frame',        brand: 'Obm Studio', price: 45,    old: null, rating: 4.8, reviews: 632,  emoji: '🖼️', badge: null,   cat: 'Photo Frames', desc: 'Solid oak wood frame with acid-free matting and UV-protective glass. Perfect for 5×7" prints.' },
  { id: 4,  name: 'Acrylic Wall Frame',          brand: 'Obm Studio', price: 120,   old: 150,  rating: 4.9, reviews: 412,  emoji: '🔲', badge: 'top',  cat: 'Wall Frames',  desc: 'Modern frameless acrylic float mount. Gallery-grade acrylic for stunning depth and clarity. Ships ready to hang.' },
  { id: 5,  name: 'Memory Photo Book',           brand: 'Obm Studio', price: 65,    old: null, rating: 4.6, reviews: 920,  emoji: '📚', badge: 'new',  cat: 'Albums',       desc: 'Customizable hardcover photo book. Perfect for vacations, year-in-review, or family milestones. 60 pages.' },
  { id: 6,  name: 'Canvas Print (16x20")',       brand: 'Obm Studio', price: 85,    old: 110,  rating: 4.8, reviews: 1045, emoji: '🎨', badge: 'sale', cat: 'Wall Frames',  desc: 'Gallery-wrapped canvas print on poly-cotton blend. Fade-resistant archival inks. 1.5" stretcher bars.' },
  { id: 7,  name: 'Polaroid Style Print Set',   brand: 'Obm Studio', price: 24,    old: null, rating: 4.5, reviews: 2100, emoji: '📸', badge: null,   cat: 'Gift Prints',  desc: 'Set of 24 retro-style square prints with classic white borders. Printed on premium thick cardstock.' },
  { id: 8,  name: 'Engraved Wood Photo',        brand: 'Obm Studio', price: 55,    old: null, rating: 4.7, reviews: 310,  emoji: '🪵', badge: null,   cat: 'Gift Prints',  desc: 'Your photo laser-engraved onto natural basswood with bark edges. A unique rustic keepsake.' },
  { id: 9,  name: 'Personalised Desk Calendar', brand: 'Obm Studio', price: 29.99, old: 35,   rating: 4.6, reviews: 540,  emoji: '📅', badge: null,   cat: 'Gift Prints',  desc: '12-month freestanding desk calendar. Feature a different favourite photo for each month.' },
  { id: 10, name: 'Metal Print (High Gloss)',   brand: 'Obm Studio', price: 95,    old: 130,  rating: 4.9, reviews: 870,  emoji: '🎞️', badge: 'top',  cat: 'Wall Frames',  desc: 'Dyes infused directly into coated aluminium sheets. Unsurpassed detail and vibrancy.' },
  { id: 11, name: 'Minimalist Black Frame',     brand: 'Obm Studio', price: 35,    old: null, rating: 4.7, reviews: 1420, emoji: '🖼️', badge: null,   cat: 'Photo Frames', desc: 'Sleek aluminium frame in matte black. Includes tempered glass and hanging hardware.' },
  { id: 12, name: 'Magic Colour-Changing Mug', brand: 'Obm Studio', price: 22,    old: 28,   rating: 4.4, reviews: 615,  emoji: '🍵', badge: 'deal', cat: 'Photo Mugs',   desc: 'Appears solid black when cold, reveals your hidden photo when filled with a hot beverage.' },
];

const CATEGORIES = [
  { name: 'All',          icon: '✦',  count: 12 },
  { name: 'Photo Frames', icon: '🖼️', count: 2  },
  { name: 'Photo Mugs',   icon: '☕', count: 2  },
  { name: 'Albums',       icon: '📖', count: 2  },
  { name: 'Wall Frames',  icon: '🔲', count: 3  },
  { name: 'Gift Prints',  icon: '🎁', count: 3  },
];

// ── STATE ───────────────────────────────────────
let state = {
  cart: [], wishlist: [],
  currentProduct: null, qty: 1,
  activeCat: 'All', currentPage: 'home',
  orders: [
    { id: 'OBM-2025-00234', name: 'Premium Wedding Album', emoji: '📖', date: 'Mar 10, 2025', price: 150.00,  status: 'transit'    },
    { id: 'OBM-2025-00198', name: 'Custom Printed Mug',    emoji: '☕', date: 'Feb 28, 2025', price: 18.99,   status: 'delivered'  },
    { id: 'OBM-2025-00155', name: 'Acrylic Wall Frame',    emoji: '🔲', date: 'Feb 14, 2025', price: 120.00,  status: 'delivered'  },
    { id: 'OBM-2025-00132', name: 'Memory Photo Book',     emoji: '📚', date: 'Jan 30, 2025', price: 65.00,   status: 'processing' },
  ],
};

// ── CURSOR ──────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
  cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

const hoverTargets = 'a,button,[data-hover],input,select,.cat-pill,.nav-btn,.brand-item,.star-filter-row,.del-opt,.footer-link,.profile-nav-item,.pay-option,.gallery-item,.product-card';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) { cursor.classList.add('cursor-large'); cursorRing.classList.add('cursor-large'); }
  if (e.target.closest('input,textarea')) cursor.classList.add('cursor-text');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) { cursor.classList.remove('cursor-large'); cursorRing.classList.remove('cursor-large'); }
  if (e.target.closest('input,textarea')) cursor.classList.remove('cursor-text');
});

// ── SCROLL REVEAL ────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── LIVE SEARCH ─────────────────────────────────
function initSearch() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('visible'); dropdown.innerHTML = ''; return; }

    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)).slice(0, 6);
    if (!matches.length) {
      dropdown.innerHTML = `<div class="search-no-results">No results for "<strong>${q}</strong>"</div>`;
    } else {
      dropdown.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="closeSearch();nav('detail',{product:${p.id}})">
          <div class="search-result-emoji">${p.emoji}</div>
          <div class="search-result-info">
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-cat">${p.cat}</div>
          </div>
          <div class="search-result-price">${fmt(p.price)}</div>
        </div>`).join('');
    }
    dropdown.classList.add('visible');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) closeSearch();
  });
}
function closeSearch() {
  const d = document.getElementById('searchDropdown');
  if (d) { d.classList.remove('visible'); d.innerHTML = ''; }
  const i = document.getElementById('searchInput');
  if (i) i.value = '';
}

// ── NAVIGATION ──────────────────────────────────
function nav(page, opts = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (!el) return;
  el.classList.add('active');
  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeSearch();

  // Navbar active state
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-page'));

  if (page === 'shop')     { renderShop(opts.cat); }
  if (page === 'detail')   { renderDetail(opts.product); }
  if (page === 'cart')     { renderCart(); }
  if (page === 'checkout') { renderCheckout(); }
  if (page === 'profile')  { renderProfile(); }
  if (page === 'orders')   { renderOrders(); }

  setTimeout(initScrollReveal, 100);
}

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── HELPERS ─────────────────────────────────────
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
  const labels = { top: 'Best Seller', deal: 'Deal', new: 'New', sale: 'Sale' };
  return `<div class="card-badge badge-${b}">${labels[b] || b}</div>`;
}

// ── TOAST ────────────────────────────────────────
function toast(msg, type = 'default') {
  const stack = document.getElementById('toastStack');
  const icons = { success: '✓', error: '✕', default: '✦' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-icon">${icons[type]}</div><span class="toast-text">${msg}</span>`;
  stack.appendChild(t);
  setTimeout(() => { t.style.animation = 'toast-out 0.35s var(--ease-out) forwards'; setTimeout(() => t.remove(), 350); }, 2800);
}

// ── CART ────────────────────────────────────────
function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = state.cart.find(c => c.id === id);
  if (ex) ex.qty += qty; else state.cart.push({ ...p, qty });
  updateCartBadge();
  toast(`<strong>${p.name.substring(0,28)}</strong> added to cart`, 'success');
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
  updateCartBadge(); renderCart();
}
function updateCartBadge() {
  const total = state.cart.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total; badge.style.display = total ? 'flex' : 'none';
  badge.classList.add('bounce'); setTimeout(() => badge.classList.remove('bounce'), 400);
}
function cartTotals() {
  const sub = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = sub * 0.08;
  return { sub, tax, total: sub + tax };
}

// ── WISHLIST ─────────────────────────────────────
function toggleWishlist(id, btn) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) { state.wishlist.splice(idx, 1); btn.classList.remove('liked'); toast('Removed from wishlist'); }
  else { state.wishlist.push(id); btn.classList.add('liked'); toast(`Saved to wishlist ♥`, 'success'); }
}

// ── QUICK VIEW MODAL ────────────────────────────
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById('quickViewModal');
  const box = modal.querySelector('.modal-box');
  const save = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  box.innerHTML = `
    <button class="modal-close" onclick="closeQuickView()">×</button>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;">
      <div style="background:var(--surface);border-radius:var(--r-xl);aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:100px;">${p.emoji}</div>
      <div>
        <div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">${p.brand}</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;margin-bottom:12px;line-height:1.25;">${p.name}</h2>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">${stars(p.rating,13)}<span style="font-size:11px;color:var(--text-muted);font-family:'DM Mono',monospace;">(${p.reviews.toLocaleString()})</span></div>
        <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px;">
          <span style="font-family:'DM Mono',monospace;font-size:32px;color:var(--text-primary);">${fmt(p.price)}</span>
          ${p.old ? `<span style="font-size:15px;color:var(--text-muted);text-decoration:line-through;font-family:'DM Mono',monospace;">${fmt(p.old)}</span><span class="detail-save">-${save}% OFF</span>` : ''}
        </div>
        <p style="font-size:13px;color:var(--text-secondary);line-height:1.8;margin-bottom:20px;">${p.desc}</p>
        ${badgeHTML(p.badge)}
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button class="btn btn-primary" style="flex:1;justify-content:center;" onclick="addToCart(${p.id});closeQuickView()">Add to Cart</button>
          <button class="btn btn-outline" onclick="closeQuickView();nav('detail',{product:${p.id}})">Full Details</button>
        </div>
      </div>
    </div>`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ── PRODUCT CARD ────────────────────────────────
function productCardHTML(p, featured = false) {
  const wished = state.wishlist.includes(p.id);
  return `
    <div class="product-card${featured ? ' featured' : ''}" onclick="nav('detail',{product:${p.id}})">
      <div class="card-image-wrap">
        <div class="card-img-element" style="font-size:${featured ? 96 : 72}px;">${p.emoji}</div>
        ${badgeHTML(p.badge)}
        <div class="card-actions">
          <button class="btn btn-icon btn-sm${wished ? ' liked' : ''}" onclick="event.stopPropagation();toggleWishlist(${p.id},this)" title="Wishlist">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="btn btn-icon btn-sm" onclick="event.stopPropagation();openQuickView(${p.id})" title="Quick View">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-rating">${stars(p.rating)}<span class="rating-count">(${p.reviews.toLocaleString()})</span></div>
        <div class="card-footer">
          <div class="price-group">
            ${p.old ? `<span class="price-old">${fmt(p.old)}</span>` : ''}
            <span class="price-main">${fmt(p.price)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})" title="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ── HOME ────────────────────────────────────────
function initHome() {
  const catsEl = document.getElementById('homeFeatCats');
  if (catsEl) {
    catsEl.innerHTML = CATEGORIES.slice(1).map((c, i) => `
      <div class="cat-card reveal" onclick="nav('shop',{cat:'${c.name}'})" style="transition-delay:${i*0.08}s;">
        <span class="cat-icon">${c.icon}</span>
        <div class="cat-label">${c.name}</div>
        <div class="cat-count">${c.count} items</div>
      </div>`).join('');
  }

  const gridEl = document.getElementById('homeTrendingGrid');
  if (gridEl) {
    const sorted = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
    gridEl.innerHTML = sorted.map((p, i) =>
      `<div class="reveal" style="transition-delay:${0.05 + i * 0.05}s;grid-column:${i === 0 ? 'span 2' : 'span 1'};">${productCardHTML(p, i === 0)}</div>`
    ).join('');
  }
}

// ── SHOP ────────────────────────────────────────
function renderShop(cat) {
  if (cat) state.activeCat = cat;

  const pipsEl = document.getElementById('shopCatPills');
  if (pipsEl) {
    pipsEl.innerHTML = CATEGORIES.map(c => `
      <button class="cat-pill${c.name === state.activeCat ? ' active' : ''}" onclick="renderShop('${c.name}')">${c.icon} ${c.name}</button>`).join('');
  }

  let prods = state.activeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === state.activeCat);
  const sort = document.getElementById('shopSort');
  if (sort) {
    const v = sort.value;
    if (v === 'price-asc')  prods = [...prods].sort((a,b) => a.price - b.price);
    if (v === 'price-desc') prods = [...prods].sort((a,b) => b.price - a.price);
    if (v === 'rating')     prods = [...prods].sort((a,b) => b.rating - a.rating);
    if (v === 'popular')    prods = [...prods].sort((a,b) => b.reviews - a.reviews);
  }

  const cntEl = document.getElementById('shopCount');
  if (cntEl) cntEl.textContent = `${prods.length} item${prods.length !== 1 ? 's' : ''}`;

  const gridEl = document.getElementById('shopGrid');
  if (gridEl) {
    gridEl.innerHTML = prods.map((p, i) =>
      `<div class="fade-up" style="animation-delay:${i * 0.045}s;">${productCardHTML(p)}</div>`
    ).join('');
  }
  initFilters();
}

function initFilters() {
  const minR = document.getElementById('priceMin');
  const maxR = document.getElementById('priceMax');
  if (minR && maxR) {
    const update = () => {
      const mn = +minR.value, mx = +maxR.value;
      document.getElementById('priceMinLabel').textContent = '$' + mn;
      document.getElementById('priceMaxLabel').textContent = '$' + mx;
      const fill = document.getElementById('priceFill');
      if (fill) { fill.style.left = (mn/1200*100)+'%'; fill.style.width = ((mx-mn)/1200*100)+'%'; }
    };
    minR.addEventListener('input', update); maxR.addEventListener('input', update); update();
  }
  const brandList = document.getElementById('brandList');
  if (brandList) {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))];
    brandList.innerHTML = brands.slice(0,7).map((b,i) => `
      <div class="brand-item" onclick="toggleBrand(this)">
        <div class="brand-icon">${b[0]}</div>
        <span class="brand-name">${b}</span>
        <div class="checkbox${i < 6 ? ' checked' : ''}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>`).join('');
  }
  const starsEl = document.getElementById('starFilters');
  if (starsEl) {
    starsEl.innerHTML = [5,4,3].map(n => `
      <div class="star-filter-row" onclick="filterStar(${n})">${stars(n,14)}<span style="font-size:11px;color:var(--text-muted)">& up</span></div>`).join('');
  }
}

function toggleBrand(el) { el.querySelector('.checkbox').classList.toggle('checked'); }
function filterStar(n) { toast(`Showing ${n}★ & up`); }
function selectDel(el) { document.querySelectorAll('.del-opt').forEach(d => d.classList.remove('active')); el.classList.add('active'); }

// ── PRODUCT DETAIL ──────────────────────────────
function renderDetail(id) {
  const p = typeof id === 'number' ? PRODUCTS.find(x => x.id === id) : id;
  if (!p) return;
  state.currentProduct = p; state.qty = 1;
  const el = document.getElementById('detailContent');
  if (!el) return;
  const save = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

  el.innerHTML = `
    <div class="container">
      <div class="detail-wrap">
        <div class="detail-grid">
          <div>
            <div class="gallery-main" id="galleryMain" onclick="openImageZoom('${p.emoji}','${p.name}')">
              <div class="main-emoji" style="font-size:160px;">${p.emoji}</div>
              <div style="position:absolute;bottom:14px;right:14px;background:rgba(var(--bg-rgb),0.8);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:var(--r-full);padding:6px 14px;font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;">Zoom ↗</div>
            </div>
            <div class="gallery-thumbs">
              ${[p.emoji,'🔍','📐','🏷️'].map((em,i)=>`<div class="gallery-thumb${i===0?' active':''}" onclick="selectThumb(this,'${em}')">${em}</div>`).join('')}
            </div>
          </div>
          <div class="fade-up">
            <div class="detail-breadcrumb">
              <span onclick="nav('home')">Home</span><span>›</span>
              <span onclick="nav('shop')">Shop</span><span>›</span>
              <span onclick="nav('shop',{cat:'${p.cat}'})">${p.cat}</span><span>›</span>
              <span style="color:var(--text-secondary);">${p.name}</span>
            </div>
            ${p.badge ? `<div style="margin-bottom:12px;">${badgeHTML(p.badge)}</div>` : ''}
            <div class="detail-brand">${p.brand}</div>
            <h1 class="detail-title">${p.name}</h1>
            <div class="detail-rating">
              ${stars(p.rating,16)}
              <span style="font-size:13px;font-weight:700;color:var(--text-primary);">${p.rating}</span>
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
              <button class="btn btn-primary btn-lg" style="flex:1;" onclick="addToCart(${p.id},state.qty)">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Cart
              </button>
              <button class="btn btn-icon btn-lg${state.wishlist.includes(p.id)?' liked':''}" onclick="toggleWishlist(${p.id},this)">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="${state.wishlist.includes(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div class="detail-perks">
              <div class="perk"><div class="perk-icon">🚀</div><div class="perk-title">Free Shipping</div><div class="perk-sub">Orders over $50</div></div>
              <div class="perk"><div class="perk-icon">↩</div><div class="perk-title">30-Day Returns</div><div class="perk-sub">Hassle-free</div></div>
              <div class="perk"><div class="perk-icon">🔒</div><div class="perk-title">Secure Pay</div><div class="perk-sub">256-bit SSL</div></div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-header">
            <div><div class="section-eyebrow">You may also like</div><h2 class="section-title">Related Products</h2></div>
          </div>
          <div class="products-grid">
            ${PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(rp=>productCardHTML(rp)).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ── IMAGE ZOOM VIEWER ────────────────────────────
function openImageZoom(emoji, name) {
  const v = document.getElementById('imageZoomViewer');
  if (!v) return;
  v.querySelector('.zoom-emoji').textContent = emoji;
  v.querySelector('.zoom-title').textContent = name;
  v.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeImageZoom() {
  const v = document.getElementById('imageZoomViewer');
  if (v) { v.classList.remove('active'); document.body.style.overflow = ''; }
}

function selectThumb(el, em) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const m = document.querySelector('#galleryMain .main-emoji');
  if (m) { m.style.transform = 'scale(0.8)'; setTimeout(() => { m.textContent = em; m.style.transform = ''; }, 160); }
}
function changeDetailQty(d) {
  state.qty = Math.max(1, Math.min(10, state.qty + d));
  const el = document.getElementById('detailQtyNum');
  if (el) { el.textContent = state.qty; el.style.transform = 'scale(1.2)'; setTimeout(() => el.style.transform = '', 150); }
}

// ── CART ─────────────────────────────────────────
function renderCart() {
  const el = document.getElementById('cartContent');
  if (!el) return;
  if (!state.cart.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><h2 class="empty-title">Your cart is empty</h2><p class="empty-sub">Discover our premium photo products</p><button class="btn btn-primary" onclick="nav('shop')">Browse Shop</button></div>`;
    return;
  }
  const { sub, tax, total } = cartTotals();
  el.innerHTML = `
    <div class="container">
      <div class="cart-layout">
        <div>
          <h1 class="headline fade-up" style="margin-bottom:32px;">Your Cart</h1>
          <div class="cart-items-list">
            ${state.cart.map((item,i)=>`
              <div class="cart-item fade-up" style="animation-delay:${i*0.06}s;">
                <div class="cart-item-img">${item.emoji}</div>
                <div class="cart-item-info">
                  <div class="cart-item-brand">${item.brand}</div>
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-meta">Unit: ${fmt(item.price)}</div>
                </div>
                <div class="cart-item-right">
                  <div class="cart-item-price">${fmt(item.price*item.qty)}</div>
                  <div class="qty-ctrl">
                    <button class="qty-btn" onclick="updateQty(${item.id},-1)">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id},1)">+</button>
                  </div>
                  <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                    Remove
                  </button>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="summary-card fade-up delay-3">
          <h2 class="summary-title">Order Summary</h2>
          <div class="summary-row"><span>Subtotal (${state.cart.reduce((s,c)=>s+c.qty,0)} items)</span><span>${fmt(sub)}</span></div>
          <div class="summary-row"><span>Shipping</span><span style="color:var(--green);">Free</span></div>
          <div class="summary-row"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
          <div class="promo-row">
            <input class="promo-input" placeholder="Promo code (OBM10)" id="promoInput"/>
            <button class="btn btn-outline btn-sm" onclick="applyPromo()">Apply</button>
          </div>
          <div class="summary-row total"><span>Total</span><span>${fmt(total)}</span></div>
          <button class="btn btn-primary" style="width:100%;margin-top:20px;justify-content:center;" onclick="nav('checkout')">
            Checkout
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn btn-ghost" style="width:100%;margin-top:8px;justify-content:center;" onclick="nav('shop')">Continue Shopping</button>
        </div>
      </div>
    </div>`;
}
function applyPromo() {
  const v = document.getElementById('promoInput')?.value.trim().toUpperCase();
  if (v === 'OBM10') toast('10% discount applied! 🎉', 'success');
  else toast('Invalid promo code', 'error');
}

// ── CHECKOUT ─────────────────────────────────────
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
            <div class="form-section-title"><div class="step-num">1</div><span class="step-label">Shipping Information</span></div>
            <div class="form-grid">
              <div class="form-field"><label>First Name</label><input class="form-input" placeholder="Sakil"/></div>
              <div class="form-field"><label>Last Name</label><input class="form-input" placeholder="Ahmed"/></div>
              <div class="form-field full"><label>Email Address</label><input class="form-input" type="email" placeholder="sakil@obmstudio.co"/></div>
              <div class="form-field full"><label>Street Address</label><input class="form-input" placeholder="123 Studio Lane"/></div>
              <div class="form-field"><label>City</label><input class="form-input" placeholder="Tiruppur"/></div>
              <div class="form-field"><label>Pin Code</label><input class="form-input" placeholder="641604"/></div>
              <div class="form-field"><label>State</label><input class="form-input" placeholder="Tamil Nadu"/></div>
              <div class="form-field"><label>Phone</label><input class="form-input" placeholder="+91 98765 43210"/></div>
            </div>
          </div>
          <div class="form-section fade-up delay-2">
            <div class="form-section-title"><div class="step-num">2</div><span class="step-label">Payment Method</span></div>
            <div class="payment-opts">
              <div class="pay-option selected" onclick="selectPay(this)"><div class="pay-radio"></div><div class="pay-info"><div class="pay-name">💳 Credit / Debit Card</div><div class="pay-sub">Visa, Mastercard, RuPay, Amex</div></div></div>
              <div class="pay-option" onclick="selectPay(this)"><div class="pay-radio"></div><div class="pay-info"><div class="pay-name">📱 UPI</div><div class="pay-sub">GPay, PhonePe, Paytm, BHIM</div></div></div>
              <div class="pay-option" onclick="selectPay(this)"><div class="pay-radio"></div><div class="pay-info"><div class="pay-name">💵 Cash on Delivery</div><div class="pay-sub">Pay when your order arrives</div></div></div>
            </div>
          </div>
        </div>
        <div>
          <div class="summary-card fade-up delay-3">
            <h2 class="summary-title">Order</h2>
            ${state.cart.slice(0,3).map(item=>`
              <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border);">
                <div style="font-size:28px;">${item.emoji}</div>
                <div style="flex:1;"><div style="font-size:13px;font-weight:600;">${item.name.substring(0,26)}…</div><div style="font-size:11px;color:var(--text-muted);font-family:'DM Mono',monospace;">Qty: ${item.qty}</div></div>
                <div style="font-weight:600;font-family:'DM Mono',monospace;">${fmt(item.price*item.qty)}</div>
              </div>`).join('')}
            ${state.cart.length>3?`<div style="font-size:12px;color:var(--text-muted);text-align:center;margin-bottom:12px;">+${state.cart.length-3} more items</div>`:''}
            <div class="summary-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
            <div class="summary-row"><span>Shipping</span><span style="color:var(--green);">Free</span></div>
            <div class="summary-row"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
            <div class="summary-row total"><span>Total</span><span>${fmt(total)}</span></div>
            <button class="btn btn-accent" style="width:100%;margin-top:24px;justify-content:center;" onclick="placeOrder()">
              Place Order
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
  const orderId = 'OBM-' + Date.now().toString().slice(-8);
  document.getElementById('successOrderId').textContent = orderId;
  state.cart = []; updateCartBadge();
  nav('success');
  // Confetti burst
  confettiBurst();
}

// ── CONFETTI ─────────────────────────────────────
function confettiBurst() {
  const colors = ['#C9952A','#E0AA3A','#4A7A5A','#3A5F7A','#B54B4B','#1A1714'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    const color = colors[Math.floor(Math.random()*colors.length)];
    Object.assign(c.style, {
      position: 'fixed', left: (30+Math.random()*40)+'%', top: '-10px',
      width: (6+Math.random()*6)+'px', height: (6+Math.random()*6)+'px',
      background: color, borderRadius: Math.random()>0.5 ? '50%' : '0',
      zIndex: 99999, pointerEvents: 'none',
      animation: `confetti-fall ${1.5+Math.random()*2}s ease-in forwards`,
      animationDelay: (Math.random()*0.8)+'s',
      transform: `rotate(${Math.random()*360}deg)`
    });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}
// Add confetti keyframe
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `@keyframes confetti-fall { to { transform: translateY(110vh) rotate(720deg); opacity:0; } }`;
document.head.appendChild(confettiStyle);

// ── TRACKING ─────────────────────────────────────
function trackOrder() {
  const val = document.getElementById('trackInput')?.value.trim();
  if (!val) { toast('Please enter an order ID', 'error'); return; }
  const steps = [
    { label: 'Order Placed',    icon: '📋', time: 'Mar 10, 2025 · 10:32 AM', done: true    },
    { label: 'Printed & Packed',icon: '📦', time: 'Mar 11, 2025 · 2:15 PM',  done: true    },
    { label: 'Shipped',         icon: '🚚', time: 'Mar 12, 2025 · 8:00 AM',  done: true    },
    { label: 'Out for Delivery',icon: '🛵', time: 'Mar 13, 2025 · 9:00 AM',  current: true },
    { label: 'Delivered',       icon: '🏠', time: 'Expected today by 6 PM',   done: false   },
  ];
  const doneCount = steps.filter(s => s.done).length;
  document.getElementById('trackResult').innerHTML = `
    <div class="tracking-card fade-up">
      <div class="tracking-top">
        <div>
          <div class="track-order-id">${val}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px;font-family:'DM Mono',monospace;">Premium Wedding Album · 1 item</div>
        </div>
        <div class="track-status-badge">Out for Delivery</div>
      </div>
      <div class="track-steps">
        <div class="track-line-bg"></div>
        <div class="track-line-fill" id="trackFill" style="height:0"></div>
        ${steps.map(s=>`
          <div class="track-step${!s.done&&!s.current?' pending':''}">
            <div class="track-dot${s.done?' done':s.current?' current':''}">${s.icon}</div>
            <div class="track-step-info">
              <div class="track-step-title">${s.label}</div>
              <div class="track-step-time">${s.time}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  setTimeout(() => {
    const fill = document.getElementById('trackFill');
    if (fill) fill.style.height = (doneCount * 84) + 'px';
  }, 300);
}

// ── PROFILE ──────────────────────────────────────
function renderProfile() { renderProfileTab('orders'); }
function renderProfileTab(tab, triggerEl) {
  if (triggerEl) { document.querySelectorAll('.profile-nav-item').forEach(i=>i.classList.remove('active')); triggerEl.classList.add('active'); }
  const el = document.getElementById('profileTabContent');
  if (!el) return;
  if (tab === 'orders') {
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Order History</h2>
      ${state.orders.map(o=>`
        <div class="order-card">
          <div class="order-card-img">${o.emoji}</div>
          <div class="order-card-info"><div class="order-card-name">${o.name}</div><div class="order-card-meta">${o.id} · ${o.date}</div></div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-weight:600;font-family:'DM Mono',monospace;margin-bottom:6px;">${fmt(o.price)}</div>
            <div class="order-status-chip status-${o.status}">${o.status==='delivered'?'Delivered':o.status==='transit'?'In Transit':'Processing'}</div>
          </div>
        </div>`).join('')}`;
  } else if (tab === 'wishlist') {
    const wl = PRODUCTS.filter(p => state.wishlist.includes(p.id));
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Wishlist</h2>
      ${wl.length
        ? `<div class="products-grid">${wl.map(p=>productCardHTML(p)).join('')}</div>`
        : `<div class="empty-state"><div class="empty-icon">♥</div><h2 class="empty-title">No saved items</h2><p class="empty-sub">Heart a product to save it here</p><button class="btn btn-primary" onclick="nav('shop')">Browse Shop</button></div>`}`;
  } else {
    el.innerHTML = `
      <h2 class="headline" style="margin-bottom:28px;">Account Settings</h2>
      <div class="form-section">
        <div class="form-grid">
          <div class="form-field"><label>First Name</label><input class="form-input" value="Sakil"/></div>
          <div class="form-field"><label>Last Name</label><input class="form-input" value="Ahmed"/></div>
          <div class="form-field full"><label>Email</label><input class="form-input" type="email" value="sakil@obmstudio.com"/></div>
        </div>
        <button class="btn btn-primary" style="margin-top:20px;" onclick="toast('Settings saved ✓','success')">Save Changes</button>
      </div>`;
  }
}

function renderOrders() {
  const el = document.getElementById('ordersContent');
  if (!el) return;
  el.innerHTML = state.orders.map(o=>`
    <div class="order-card">
      <div class="order-card-img">${o.emoji}</div>
      <div class="order-card-info"><div class="order-card-name">${o.name}</div><div class="order-card-meta">${o.id} · ${o.date}</div></div>
      <div style="text-align:right;">
        <div style="font-weight:600;font-family:'DM Mono',monospace;margin-bottom:6px;">${fmt(o.price)}</div>
        <div class="order-status-chip status-${o.status}">${o.status==='delivered'?'Delivered':o.status==='transit'?'In Transit':'Processing'}</div>
      </div>
    </div>`).join('');
}

window.onSortChange = () => renderShop();

// ── KEYBOARD SHORTCUTS ───────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeQuickView();
    closeImageZoom();
    document.getElementById('quickViewModal')?.classList.remove('active');
    document.body.style.overflow = '';
  }
  if ((e.metaKey||e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHome();
  initSearch();
  updateCartBadge();
  nav('home');
  setTimeout(initScrollReveal, 200);
});
