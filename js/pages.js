/* ==========================================
   Larkspur - Page View Renderers
   ========================================== */
import { store, CATEGORIES, PROMO_CODES } from './store.js';
import { renderProductCard, showToast, openModal, closeModal, showConfirm, renderSVGChart } from './components.js';

// Get mount point
const mainContent = document.getElementById('main-content');

// Store current catalog filters in memory so they persist during browsing
let catalogFilters = {
  categories: [],
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'featured',
  searchQuery: ''
};

// Store admin page sub-route ('overview', 'products', 'orders')
let adminSubPage = 'overview';

// --- Home Hero Banner Slides ---
const HERO_SLIDES = [
  {
    subtitle: 'Premium Experience',
    title: 'Elevate Your Lifestyle',
    text: 'Discover a curated collection of high-performance electronics, designer fashion, minimalist home decor, and cutting-edge fitness gear.',
    btnText: 'Shop Collection',
    category: null,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
  },
  {
    subtitle: 'Exclusive Collection',
    title: 'Precision Tech Upgrades',
    text: 'Upgrade your workspace with studio-grade audio, tactile wireless mechanical keyboards, and ultra-lightweight gaming peripherals.',
    btnText: 'Explore Tech',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1600&auto=format&fit=crop&q=80'
  },
  {
    subtitle: 'Active & Fit',
    title: 'Recharge Your Workouts',
    text: 'Premium fitness gear, eco-friendly rubber alignment yoga mats, smart temperature bottles, and heavy-duty gym accessories.',
    btnText: 'Get Fit',
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&auto=format&fit=crop&q=80'
  }
];

let heroSlideTimer = null;
let currentHeroSlide = 0;

// --- Route Dispatcher Helper ---
export function renderPage(route) {
  // Clear any timers to prevent memory leaks
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }

  // Clear any open drawers/modals
  closeModal();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Handle dynamic routes
  if (route.startsWith('product-')) {
    const productId = route.replace('product-', '');
    renderProductDetail(productId);
    return;
  }

  switch (route) {
    case 'home':
      renderHome();
      break;
    case 'catalog':
      renderCatalog();
      break;
    case 'checkout':
      renderCheckout();
      break;
    case 'profile':
      renderProfile();
      break;
    case 'dashboard':
      renderDashboard();
      break;
    default:
      renderHome();
  }
}

/* ==========================================
   1. HOME PAGE VIEW
   ========================================== */
function renderHome() {
  const featuredProducts = store.state.products
    .filter(p => p.tag === 'Best Seller' || p.tag === 'Premium')
    .slice(0, 4);

  mainContent.innerHTML = `
    <div class="container slide-up">
      <!-- Hero Banner Carousel -->
      <section class="hero" id="home-hero-section" style="position: relative; transition: background 0.5s ease; min-height: 380px;"></section>

      <!-- Trust Features Strip -->
      <section class="trust-strip">
        <div class="trust-strip-item">
          <i data-lucide="truck"></i>
          <span>Free shipping over $150</span>
        </div>
        <div class="trust-strip-item">
          <i data-lucide="shield-check"></i>
          <span>SSL-secured checkout</span>
        </div>
        <div class="trust-strip-item">
          <i data-lucide="refresh-cw"></i>
          <span>30-day easy returns</span>
        </div>
        <div class="trust-strip-item">
          <i data-lucide="award"></i>
          <span>100% genuine, curated goods</span>
        </div>
      </section>

      <!-- Categories Grid -->
      <section class="section-header">
        <div class="section-title">
          <h2>Shop by Category</h2>
          <p>Carefully selected items across multiple departments</p>
        </div>
      </section>
      <div class="categories-grid">
        ${CATEGORIES.map(cat => `
          <div class="category-card" data-category="${cat.id}" style="background-image: url('${cat.image}');">
            <div class="category-card-bg"></div>
            <div class="category-icon-wrapper">
              <i data-lucide="${cat.icon}"></i>
            </div>
            <h3>${cat.name}</h3>
            <p>${store.state.products.filter(p => p.category === cat.id).length} Products</p>
          </div>
        `).join('')}
      </div>

      <!-- Nike-Style "Shop the Looks" Outfit Slider -->
      <section class="section-header" style="margin-top: 60px;">
        <div class="section-title">
          <h2>Shop the Looks</h2>
          <p>Curated premium outfit layouts tailored to match your vibe</p>
        </div>
      </section>
      <div class="looks-slider-container">
        <div class="looks-track">
          <div class="look-card" style="background-image: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80');">
            <div class="look-info">
              <span class="badge badge-accent">Street Chic</span>
              <h3>Urban Explorer Look</h3>
              <p>Leather Jacket + Minimalist Watch + Backpack</p>
              <button class="btn btn-primary shop-look-btn" data-items="f1,f2,f3">Shop Look ($439.97)</button>
            </div>
          </div>
          <div class="look-card" style="background-image: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop&q=80');">
            <div class="look-info">
              <span class="badge badge-accent">Aesthetic Fit</span>
              <h3>Elite Athlete Look</h3>
              <p>Yoga Mat + Dumbbells + Smart Bottle</p>
              <button class="btn btn-primary shop-look-btn" data-items="fi1,fi2,fi3">Shop Look ($289.97)</button>
            </div>
          </div>
          <div class="look-card" style="background-image: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80');">
            <div class="look-info">
              <span class="badge badge-accent">Nordic Home</span>
              <h3>Cozy Hearth Look</h3>
              <p>Ceramic Vase + Desk Lamp + Soy Candle Set</p>
              <button class="btn btn-primary shop-look-btn" data-items="h1,h2,h3">Shop Look ($144.97)</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Promo Code Banner -->
      <section class="glass-card" style="margin-top: 60px; padding: 40px; border-radius: var(--radius-lg); background: var(--accent-light); border: 1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
        <div>
          <span class="badge badge-accent" style="margin-bottom: 12px; padding: 4px 12px;">Limited Offer</span>
          <h3 style="font-size: 1.8rem; margin-bottom: 8px;">Exclusive Launch Discount</h3>
          <p style="color: var(--text-secondary); max-width: 500px;">Apply code <strong style="color: var(--text-primary); font-family: monospace; font-size: 1.1rem; background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-color);">LARK20</strong> at checkout to claim 20% off your entire first order.</p>
        </div>
        <button class="btn btn-primary copy-code-btn" data-code="LARK20">Copy Promo Code</button>
      </section>

      <!-- Featured Products -->
      <section class="section-header">
        <div class="section-title">
          <h2>Featured Products</h2>
          <p>Our top-rated products of the season</p>
        </div>
        <a href="#catalog" class="btn btn-ghost" id="featured-view-all">View All <i data-lucide="arrow-right"></i></a>
      </section>
      <div class="products-grid">
        ${featuredProducts.map(product => renderProductCard(product)).join('')}
      </div>
    </div>
  `;

  // --- Carousel Slide Rendering & Auto-rotate ---
  const renderSlide = () => {
    const slide = HERO_SLIDES[currentHeroSlide];
    const heroSec = document.getElementById('home-hero-section');
    if (!heroSec) return;

    heroSec.style.backgroundImage = `linear-gradient(100deg, rgba(20, 22, 18, 0.82) 0%, rgba(20, 22, 18, 0.55) 45%, rgba(20, 22, 18, 0.15) 75%), url('${slide.image}')`;
    heroSec.innerHTML = `
      <div class="hero-content">
        <span class="hero-subtitle">${slide.subtitle}</span>
        <h1 class="slide-up" style="animation-duration: 0.5s;">${slide.title}</h1>
        <p class="hero-text slide-up" style="animation-duration: 0.7s;">${slide.text}</p>
        <div class="hero-buttons slide-up" style="animation-duration: 0.9s;">
          <button class="btn btn-primary" id="hero-action-btn">${slide.btnText}</button>
          <button class="hero-promo-link" id="hero-promo-btn">Use code <strong>LARK20</strong> for 20% off</button>
        </div>
      </div>
      
      <!-- Dots -->
      <div style="position: absolute; bottom: 20px; right: 40px; display: flex; gap: 8px; z-index: 10;">
        ${HERO_SLIDES.map((_, idx) => `
          <button class="hero-dot ${idx === currentHeroSlide ? 'active' : ''}" data-idx="${idx}"></button>
        `).join('')}
      </div>
    `;

    // Bind Hero Slide actions
    document.getElementById('hero-action-btn').onclick = () => {
      if (slide.category) {
        catalogFilters.categories = [slide.category];
      } else {
        catalogFilters.categories = [];
      }
      store.setPage('catalog');
    };

    document.getElementById('hero-promo-btn').onclick = () => {
      showToast('Promo Code', 'Use coupon code LARK20 for 20% off!', 'info');
    };

    heroSec.querySelectorAll('.hero-dot').forEach(dot => {
      dot.onclick = () => {
        currentHeroSlide = parseInt(dot.dataset.idx);
        renderSlide();
        startCarouselTimer();
      };
    });
  };

  const startCarouselTimer = () => {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % HERO_SLIDES.length;
      renderSlide();
    }, 6000);
  };

  // Run Carousel
  renderSlide();
  startCarouselTimer();

  lucide.createIcons();

  // --- Attach Event Listeners ---
  // Copy Promo Code
  mainContent.querySelector('.copy-code-btn').onclick = () => {
    navigator.clipboard.writeText('LARK20');
    showToast('Copied!', 'Promo code LARK20 copied to clipboard.', 'success');
  };

  // Category Cards clicks
  mainContent.querySelectorAll('.category-card').forEach(card => {
    card.onclick = () => {
      const category = card.dataset.category;
      catalogFilters.categories = [category];
      store.setPage('catalog');
    };
  });

  // View All click
  document.getElementById('featured-view-all').onclick = (e) => {
    e.preventDefault();
    catalogFilters.categories = [];
    store.setPage('catalog');
  };

  // Shop Look Buttons Click
  mainContent.querySelectorAll('.shop-look-btn').forEach(btn => {
    btn.onclick = () => {
      const itemsStr = btn.dataset.items;
      const ids = itemsStr.split(',');
      const bundleItems = ids.map(id => ({ id, quantity: 1 }));
      const res = store.addBundleToCart(bundleItems);
      if (res.success) {
        showToast('Outfit Added', 'All items in this curated look have been added to your cart!', 'success');
      } else {
        showToast('Look Added', 'Some items from this look were added to your cart.', 'warning');
      }
    };
  });

  bindProductCardEvents(mainContent);
}

/* ==========================================
   2. CATALOG PAGE VIEW
   ========================================== */
function renderCatalog() {
  if (store.state.searchQuery !== '') {
    catalogFilters.searchQuery = store.state.searchQuery;
    store.state.searchQuery = ''; // reset
  }

  mainContent.innerHTML = `
    <div class="container slide-up">
      <div class="catalog-layout">
        <!-- Sidebar Filters -->
        <aside class="catalog-sidebar">
          <!-- Categories Filter -->
          <div class="filter-section">
            <h4>Categories</h4>
            <div class="filter-group">
              ${CATEGORIES.map(cat => `
                <label class="checkbox-label">
                  <input type="checkbox" class="category-filter" value="${cat.id}" ${catalogFilters.categories.includes(cat.id) ? 'checked' : ''}>
                  <span>${cat.name}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Price Filter -->
          <div class="filter-section">
            <h4>Price Range</h4>
            <div class="price-range-inputs">
              <input type="number" id="min-price-input" placeholder="Min" value="${catalogFilters.minPrice}">
              <span style="color: var(--text-tertiary);">to</span>
              <input type="number" id="max-price-input" placeholder="Max" value="${catalogFilters.maxPrice}">
            </div>
          </div>

          <!-- Clear Filters -->
          <button class="btn btn-secondary" id="clear-filters-btn" style="width: 100%;">Clear Filters</button>
        </aside>

        <!-- Product Listings -->
        <section>
          <div class="catalog-header">
            <div>
              <h2 style="font-size: 1.75rem;" id="catalog-results-title">All Products</h2>
              <span style="font-size: 0.9rem; color: var(--text-secondary);" id="catalog-count-label">Showing all items</span>
            </div>
            <!-- Sorting -->
            <select class="sort-select" id="catalog-sort-select">
              <option value="featured" ${catalogFilters.sortBy === 'featured' ? 'selected' : ''}>Sort by: Featured</option>
              <option value="price-low" ${catalogFilters.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${catalogFilters.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${catalogFilters.sortBy === 'rating' ? 'selected' : ''}>Rating: High to Low</option>
            </select>
          </div>

          <!-- Products Grid -->
          <div class="products-grid" id="catalog-products-grid"></div>
        </section>
      </div>
    </div>
  `;

  lucide.createIcons();

  // --- Attach Event Listeners ---
  // Category checkboxes
  mainContent.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.onchange = () => {
      if (checkbox.checked) {
        catalogFilters.categories.push(checkbox.value);
      } else {
        catalogFilters.categories = catalogFilters.categories.filter(c => c !== checkbox.value);
      }
      applyFilters();
    };
  });

  // Price inputs
  const minInput = document.getElementById('min-price-input');
  const maxInput = document.getElementById('max-price-input');
  
  const priceChangeHandler = () => {
    catalogFilters.minPrice = parseFloat(minInput.value) || 0;
    catalogFilters.maxPrice = parseFloat(maxInput.value) || 10000;
    applyFilters();
  };

  minInput.oninput = priceChangeHandler;
  maxInput.oninput = priceChangeHandler;

  // Clear filters
  document.getElementById('clear-filters-btn').onclick = () => {
    catalogFilters = {
      categories: [],
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'featured',
      searchQuery: ''
    };
    
    mainContent.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    minInput.value = 0;
    maxInput.value = 1000;
    document.getElementById('catalog-sort-select').value = 'featured';
    
    applyFilters();
  };

  // Sort Selector
  document.getElementById('catalog-sort-select').onchange = (e) => {
    catalogFilters.sortBy = e.target.value;
    applyFilters();
  };

  window.addEventListener('catalog-search', (e) => {
    catalogFilters.searchQuery = e.detail;
    applyFilters();
  });

  applyFilters();
}

function applyFilters() {
  let filtered = [...store.state.products];

  if (catalogFilters.categories.length > 0) {
    filtered = filtered.filter(p => catalogFilters.categories.includes(p.category));
  }

  filtered = filtered.filter(p => p.price >= catalogFilters.minPrice && p.price <= catalogFilters.maxPrice);

  if (catalogFilters.searchQuery.trim() !== '') {
    const q = catalogFilters.searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  // Sorting
  if (catalogFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (catalogFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (catalogFilters.sortBy === 'rating') {
    filtered.sort((a, b) => {
      const avgA = a.reviewsList && a.reviewsList.length > 0 ? (a.reviewsList.reduce((sum, r) => sum + r.rating, 0) / a.reviewsList.length) : 5.0;
      const avgB = b.reviewsList && b.reviewsList.length > 0 ? (b.reviewsList.reduce((sum, r) => sum + r.rating, 0) / b.reviewsList.length) : 5.0;
      return avgB - avgA;
    });
  } else {
    filtered.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
  }

  // Render Grid
  const grid = document.getElementById('catalog-products-grid');
  const countLabel = document.getElementById('catalog-count-label');
  const resultsTitle = document.getElementById('catalog-results-title');
  
  if (!grid) return;

  if (catalogFilters.searchQuery.trim() !== '') {
    resultsTitle.innerText = `Search Results for "${catalogFilters.searchQuery}"`;
  } else if (catalogFilters.categories.length === 1) {
    const catName = CATEGORIES.find(c => c.id === catalogFilters.categories[0])?.name || '';
    resultsTitle.innerText = `${catName} Collection`;
  } else {
    resultsTitle.innerText = 'All Products';
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: span 3; padding: 80px 0;">
        <i data-lucide="frown" style="width: 48px; height: 48px;"></i>
        <h3>No Products Found</h3>
        <p>We couldn't find any products matching your filters. Try clearing some selections.</p>
      </div>
    `;
    countLabel.innerText = 'Showing 0 items';
  } else {
    // Dynamic computed average rating injection
    grid.innerHTML = filtered.map(product => {
      const revs = product.reviewsList || [];
      const avg = revs.length > 0 ? (revs.reduce((s, r) => s + r.rating, 0) / revs.length) : 5.0;
      const productWithAvg = { ...product, rating: avg, reviews: revs.length };
      return renderProductCard(productWithAvg);
    }).join('');
    
    countLabel.innerText = `Showing ${filtered.length} products`;
  }

  lucide.createIcons();
  bindProductCardEvents(grid);
}

/* ==========================================
   3. PRODUCT DETAIL VIEW (Dynamic delivery, variants, and reviews form)
   ========================================== */
function renderProductDetail(productId) {
  const product = store.state.products.find(p => p.id === productId);
  
  if (!product) {
    mainContent.innerHTML = `
      <div class="container empty-state" style="padding: 100px 0;">
        <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--danger);"></i>
        <h3>Product Not Found</h3>
        <p>The product you are trying to view does not exist.</p>
        <a class="btn btn-primary" href="#catalog">Back to Shop</a>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let selectedColor = product.colors ? product.colors[0] : 'Standard';
  let selectedSize = product.sizes ? product.sizes[0] : 'Standard';
  let quantity = 1;
  let selectedReviewRating = 5; // Default write rating

  // Calculate pricing & delivery details
  const updateProductInfoDOM = () => {
    let currentPrice = product.price;
    if (selectedSize === '44mm') currentPrice += 30.00;
    if (selectedSize === 'Large (25cm)') currentPrice += 10.00;
    if (selectedSize === '36" x 48"') currentPrice += 40.00;
    if (selectedSize === '6mm Thick') currentPrice += 10.00;
    if (selectedSize === '50 lbs Set') currentPrice += 60.00;
    if (selectedSize === '26" Length') currentPrice += 5.00;

    const priceElm = document.getElementById('detail-price-val');
    if (priceElm) priceElm.innerText = `$${currentPrice.toFixed(2)}`;

    // Stock notifications
    const stockMsgElm = document.getElementById('detail-stock-msg');
    const addToCartBtn = document.getElementById('detail-add-cart-btn');
    if (stockMsgElm) {
      if (product.stock === 0) {
        stockMsgElm.innerHTML = '<span style="color:var(--danger); font-weight:700;">Out of Stock</span>';
        if (addToCartBtn) {
          addToCartBtn.disabled = true;
          addToCartBtn.querySelector('span').innerText = 'Out of Stock';
        }
      } else if (product.stock <= 5) {
        stockMsgElm.innerHTML = `<span style="color:var(--warning); font-weight:700;">Only ${product.stock} left in stock - order soon!</span>`;
      } else {
        stockMsgElm.innerHTML = `<span style="color:var(--success); font-weight:600;">In Stock (${product.stock})</span>`;
      }
    }

    // Estimated delivery date: 3 days from today
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    const dateFormatted = delivery.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const delivElm = document.getElementById('detail-delivery-val');
    if (delivElm) delivElm.innerText = dateFormatted;
  };

  const reviewsList = product.reviewsList || [];
  const averageRating = reviewsList.length > 0 
    ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length)
    : 5.0;

  // Fetch complementary bundle suggestions
  const bundleRecommendations = store.getBundleRecommendations(product.id, 1);
  const hasBundle = bundleRecommendations.length > 0;
  const bundleProd = hasBundle ? bundleRecommendations[0] : null;

  mainContent.innerHTML = `
    <div class="container slide-up">
      <div style="margin-top: 20px; font-size: 0.9rem; color: var(--text-tertiary);">
        <a href="#home">Home</a> / <a href="#catalog">Shop</a> / <span style="color: var(--text-secondary);">${product.name}</span>
      </div>

      <div class="detail-layout">
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-img-container">
            <img class="detail-main-img" id="detail-main-image-elm" src="${product.image}" alt="${product.name}">
          </div>
          <div class="detail-thumbnails">
            <div class="detail-thumb active" data-img="${product.image}">
              <img src="${product.image}" alt="">
            </div>
            <div class="detail-thumb" data-img="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=80">
              <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=80" alt="">
            </div>
            <div class="detail-thumb" data-img="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80" alt="">
            </div>
          </div>
        </div>

        <!-- Details Info -->
        <div class="detail-info">
          <span class="product-category" style="font-size: 0.9rem; margin-bottom: 12px; display:block;">${product.category}</span>
          <h1 class="detail-title">${product.name}</h1>
          
          <div class="detail-meta">
            <div class="product-rating" style="margin-bottom:0;">
              <i data-lucide="star" style="width: 16px; height: 16px; fill: var(--warning);"></i>
              <strong>${averageRating.toFixed(1)}</strong>
              <span>(${reviewsList.length} reviews)</span>
            </div>
            <span style="color: var(--text-tertiary);">|</span>
            <span id="detail-stock-msg"></span>
          </div>

          <div class="detail-price" id="detail-price-val">$${product.price.toFixed(2)}</div>
          
          <p class="detail-desc">${product.description}</p>

          <!-- Delivery Estimate -->
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 24px; font-size: 0.9rem; display: flex; align-items: center; gap: 10px;">
            <i data-lucide="truck" style="color: var(--accent-primary);"></i>
            <span>Estimated Delivery: <strong id="detail-delivery-val" style="color: var(--text-primary);">...</strong></span>
          </div>

          <!-- Options Selectors -->
          <div class="detail-options">
            ${product.colors && product.colors.length > 0 && product.colors[0] !== 'Standard' ? `
              <div class="option-group">
                <div class="option-title">Select Color: <span id="color-name-label">${selectedColor}</span></div>
                <div class="color-options">
                  ${product.colors.map((color, idx) => `
                    <button class="color-btn ${idx === 0 ? 'active' : ''}" style="background-color: ${color};" data-color="${color}" title="${color}"></button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Standard' ? `
              <div class="option-group">
                <div class="option-title">Select Option/Size:</div>
                <div class="size-options">
                  ${product.sizes.map((size, idx) => `
                    <button class="size-btn ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Quantity / Buy action -->
          <div class="detail-actions">
            <div class="quantity-selector">
              <button class="quantity-btn" id="qty-minus-btn">
                <i data-lucide="minus"></i>
              </button>
              <div class="quantity-value" id="qty-val-elm">1</div>
              <button class="quantity-btn" id="qty-plus-btn">
                <i data-lucide="plus"></i>
              </button>
            </div>
            
            <button class="btn btn-primary" id="detail-add-cart-btn" style="flex-grow: 1; height: 46px;">
              <i data-lucide="shopping-cart"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Frequently Bought Together Bundle Grid -->
      ${hasBundle ? `
        <div class="bundle-box">
          <h3>Frequently Bought Together</h3>
          <div class="bundle-items">
            <div class="bundle-item-card">
              <div class="bundle-item-img">
                <img src="${product.image}" alt="">
              </div>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">${product.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">$${product.price.toFixed(2)}</div>
              </div>
            </div>
            <div style="font-size: 1.5rem; font-weight: 300; color: var(--text-tertiary);">+</div>
            <div class="bundle-item-card">
              <div class="bundle-item-img">
                <img src="${bundleProd.image}" alt="">
              </div>
              <div>
                <div style="font-weight: 600; font-size: 0.85rem;">${bundleProd.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">$${bundleProd.price.toFixed(2)}</div>
              </div>
            </div>
            <div class="bundle-action-row" style="flex-grow: 1;">
              <div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase;">Bundle Price</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-primary);">$${(product.price + bundleProd.price).toFixed(2)}</div>
              </div>
              <button class="btn btn-primary" id="add-bundle-btn" style="font-size: 0.85rem; padding: 8px 16px;">
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Specs & Reviews Tabs -->
      <div class="detail-tabs">
        <div class="tab-headers">
          <div class="tab-btn active" data-tab="specs">Specifications</div>
          <div class="tab-btn" data-tab="reviews">Reviews (${reviewsList.length})</div>
        </div>

        <!-- Specifications Tab -->
        <div class="tab-content active" id="tab-specs">
          <table class="admin-table" style="max-width: 600px; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
            <tbody>
              ${Object.entries(product.specs || {}).map(([key, val]) => `
                <tr>
                  <td style="font-weight: 600; width: 200px; background: var(--bg-secondary); color: var(--text-primary); border-right: 1px solid var(--border-color);">${key}</td>
                  <td style="color: var(--text-secondary);">${val}</td>
                </tr>
              `).join('') || `<tr><td style="text-align:center; color:var(--text-tertiary);">No specification details available.</td></tr>`}
            </tbody>
          </table>
        </div>

        <!-- Reviews Tab (Listing & Submission Form) -->
        <div class="tab-content" id="tab-reviews">
          <div class="product-reviews-layout">
            
            <!-- List -->
            <div style="display:flex; flex-direction:column; gap:20px;">
              ${reviewsList.length === 0 ? `
                <p style="color: var(--text-tertiary); text-align: center; padding: 30px;">No reviews yet. Be the first to share your thoughts!</p>
              ` : reviewsList.map(r => {
                const dtStr = new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                return `
                  <div class="glass-card animate-slide-up" style="padding:20px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; align-items:center;">
                      <div>
                        <strong>${r.author}</strong>
                        <span style="font-size:0.75rem; color:var(--text-tertiary); margin-left:8px;">${dtStr}</span>
                      </div>
                      <div class="product-rating" style="margin-bottom:0;">
                        <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--warning); color:var(--warning);"></i> 
                        <strong>${r.rating.toFixed(1)}</strong>
                      </div>
                    </div>
                    <p style="font-size:0.9rem; color:var(--text-secondary);">${r.comment}</p>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Add Review form -->
            <div class="write-review-box" style="margin-top:0;">
              <h3 style="font-size:1.15rem; margin-bottom:16px;">Write a Customer Review</h3>
              <form id="product-review-form">
                <div class="form-group" style="margin-bottom:16px;">
                  <label>Your Rating</label>
                  <div class="star-rating-select" id="star-rating-selector">
                    <i data-lucide="star" class="star-btn selected" data-rating="1"></i>
                    <i data-lucide="star" class="star-btn selected" data-rating="2"></i>
                    <i data-lucide="star" class="star-btn selected" data-rating="3"></i>
                    <i data-lucide="star" class="star-btn selected" data-rating="4"></i>
                    <i data-lucide="star" class="star-btn selected" data-rating="5"></i>
                  </div>
                </div>
                <div class="form-group" style="margin-bottom:16px;">
                  <label for="review-author">Nickname *</label>
                  <input type="text" id="review-author" required placeholder="Enter nickname">
                </div>
                <div class="form-group" style="margin-bottom:20px;">
                  <label for="review-comment">Review Description *</label>
                  <textarea id="review-comment" rows="4" required placeholder="Describe your experience with this item..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%;">Post Review</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  updateProductInfoDOM();

  // --- Attach Event Listeners ---
  // Gallery thumbnails
  mainContent.querySelectorAll('.detail-thumb').forEach(thumb => {
    thumb.onclick = () => {
      mainContent.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      document.getElementById('detail-main-image-elm').src = thumb.dataset.img;
    };
  });

  // Color option button selectors
  mainContent.querySelectorAll('.color-btn').forEach(btn => {
    btn.onclick = () => {
      mainContent.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = btn.dataset.color;
      const colorLabel = document.getElementById('color-name-label');
      if (colorLabel) colorLabel.innerText = selectedColor;
      updateProductInfoDOM();
    };
  });

  // Size option button selectors
  mainContent.querySelectorAll('.size-btn').forEach(btn => {
    btn.onclick = () => {
      mainContent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
      updateProductInfoDOM();
    };
  });

  // Quantity adjustments
  const qtyVal = document.getElementById('qty-val-elm');
  document.getElementById('qty-minus-btn').onclick = () => {
    quantity = Math.max(1, quantity - 1);
    qtyVal.innerText = quantity;
  };

  document.getElementById('qty-plus-btn').onclick = () => {
    quantity = Math.min(product.stock, quantity + 1);
    qtyVal.innerText = quantity;
  };

  // Add to cart click
  document.getElementById('detail-add-cart-btn').onclick = () => {
    // Recalculate price modifier in cart if any
    const res = store.addToCart(product.id, quantity, selectedColor, selectedSize);
    if (res.success) {
      showToast('Cart Updated', `${quantity}x ${product.name} added to cart.`, 'success');
    } else {
      showToast('Error', res.msg, 'error');
    }
  };

  // Specs/Reviews Tabs toggling
  mainContent.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      mainContent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      mainContent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.getElementById(`tab-${tabId}`).classList.add('active');
    };
  });

  // Reviews Stars rating selector
  const starsContainer = document.getElementById('star-rating-selector');
  if (starsContainer) {
    starsContainer.querySelectorAll('.star-btn').forEach(star => {
      star.onclick = () => {
        selectedReviewRating = parseInt(star.dataset.rating);
        starsContainer.querySelectorAll('.star-btn').forEach((s, idx) => {
          if (idx < selectedReviewRating) {
            s.classList.add('selected');
            s.style.color = 'var(--warning)';
          } else {
            s.classList.remove('selected');
            s.style.color = '';
          }
        });
      };
    });
  }

  // Reviews submit form
  const revForm = document.getElementById('product-review-form');
  if (revForm) {
    revForm.onsubmit = (e) => {
      e.preventDefault();
      const authorVal = document.getElementById('review-author').value;
      const commentVal = document.getElementById('review-comment').value;

      store.addProductReview(product.id, authorVal, selectedReviewRating, commentVal);
      showToast('Review Added', 'Your review was published successfully.', 'success');
      
      // Dynamic reload
      renderProductDetail(product.id);
      
      // Switch active tab back to reviews
      document.querySelector('[data-tab="reviews"]').click();
    };
  }
}

/* ==========================================
   4. CHECKOUT VIEW & ORDER SUCCESS
   ========================================== */
function renderCheckout() {
  const cart = store.state.cart;

  if (cart.length === 0) {
    mainContent.innerHTML = `
      <div class="container empty-state" style="padding: 100px 0;">
        <i data-lucide="shopping-cart" style="width: 48px; height: 48px; color: var(--text-tertiary);"></i>
        <h3>Your Cart is Empty</h3>
        <p>You cannot checkout because you have no items in your cart.</p>
        <a class="btn btn-primary" href="#catalog">Shop Collections</a>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  let hasPromoApplied = false;
  let currentPromo = '';
  let shipping = subtotal > 150 ? 0.00 : 10.00;

  const calculateAndRenderSummary = () => {
    discount = 0;
    shipping = subtotal > 150 ? 0.00 : 10.00;

    if (hasPromoApplied && currentPromo !== '') {
      const promo = PROMO_CODES[currentPromo];
      if (promo) {
        if (promo.type === 'percent') {
          discount = subtotal * promo.value;
        } else if (promo.type === 'free_shipping') {
          shipping = 0.00;
        }
      }
    }

    const discSubtotal = subtotal - discount;
    const tax = discSubtotal * 0.08;
    const total = discSubtotal + tax + shipping;

    document.getElementById('co-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    
    const discountRow = document.getElementById('co-discount-row');
    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('co-discount').innerText = `-$${discount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    document.getElementById('co-tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('co-shipping').innerText = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('co-total').innerText = `$${total.toFixed(2)}`;
  };

  mainContent.innerHTML = `
    <div class="container slide-up">
      <h2>Secure Checkout</h2>
      
      <div class="checkout-layout">
        <div>
          <!-- Express Checkout -->
          <div class="checkout-section">
            <h3><i data-lucide="zap" style="color:var(--accent-primary);"></i> Express Checkout</h3>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:16px;">Skip the form using your saved details for an instant one-tap checkout.</p>
            <div class="express-checkout-box">
              <button class="btn-express btn-applepay" id="express-applepay-btn">
                <i data-lucide="apple" style="width:16px; height:16px;"></i> Pay with Apple Pay
              </button>
              <button class="btn-express btn-paypal" id="express-paypal-btn">
                <i data-lucide="wallet" style="width:16px; height:16px;"></i> Pay with PayPal
              </button>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin-top:16px; margin-bottom:4px;">
              <div style="flex:1; height:1px; background:var(--border-color);"></div>
              <span style="font-size:0.75rem; color:var(--text-tertiary); text-transform:uppercase;">Or enter details manually</span>
              <div style="flex:1; height:1px; background:var(--border-color);"></div>
            </div>
          </div>

          <!-- Shipping Form -->
          <div class="checkout-section">
            <h3><i data-lucide="map-pin" style="color:var(--accent-primary);"></i> Shipping Information</h3>
            <form id="checkout-shipping-form">
              <div class="form-grid">
                <div class="form-group">
                  <label for="co-name">Full Name</label>
                  <input type="text" id="co-name" required placeholder="John Doe" value="${store.state.userProfile.name}">
                </div>
                <div class="form-group">
                  <label for="co-email">Email Address</label>
                  <input type="email" id="co-email" required placeholder="john@example.com" value="${store.state.userProfile.email}">
                </div>
                <div class="form-group">
                  <label for="co-phone">Phone Number</label>
                  <input type="tel" id="co-phone" required placeholder="01XXXXXXXX" value="${store.state.userProfile.phone}">
                </div>
                <div class="form-group">
                  <label for="co-address">Street Address</label>
                  <input type="text" id="co-address" required placeholder="123 Main St" value="${store.state.userProfile.addresses[0] || ''}">
                </div>
                <div class="form-group">
                  <label for="co-city">City</label>
                  <input type="text" id="co-city" required placeholder="Cairo" value="Cairo">
                </div>
                <div class="form-group">
                  <label for="co-zip">Zip/Postal Code</label>
                  <input type="text" id="co-zip" required placeholder="12345" value="11511">
                </div>
              </div>
            </form>
          </div>

          <!-- Payment Form -->
          <div class="checkout-section">
            <h3><i data-lucide="credit-card" style="color:var(--accent-primary);"></i> Payment Method</h3>
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div style="display:flex; gap:16px;">
                <label class="checkbox-label" style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); flex:1; border:1px solid var(--border-color);">
                  <input type="radio" name="payment-method" value="Credit Card" checked>
                  <strong>Credit Card</strong>
                </label>
                <label class="checkbox-label" style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); flex:1; border:1px solid var(--border-color);">
                  <input type="radio" name="payment-method" value="Cash on Delivery">
                  <strong>Cash on Delivery</strong>
                </label>
              </div>

              <div id="credit-card-fields-box" class="form-grid" style="margin-top:12px;">
                <div class="form-group full-width">
                  <label for="co-card-number">Card Number</label>
                  <input type="text" id="co-card-number" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" inputmode="numeric">
                  <span class="field-error" id="co-card-number-error" style="display:none; color:var(--danger); font-size:0.75rem; margin-top:4px;"></span>
                </div>
                <div class="form-group">
                  <label for="co-card-expiry">Expiry Date</label>
                  <input type="text" id="co-card-expiry" placeholder="MM/YY" maxlength="5" inputmode="numeric">
                  <span class="field-error" id="co-card-expiry-error" style="display:none; color:var(--danger); font-size:0.75rem; margin-top:4px;"></span>
                </div>
                <div class="form-group">
                  <label for="co-card-cvc">CVC / CVV</label>
                  <input type="password" id="co-card-cvc" placeholder="XXX" maxlength="3" inputmode="numeric">
                  <span class="field-error" id="co-card-cvc-error" style="display:none; color:var(--danger); font-size:0.75rem; margin-top:4px;"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <aside class="checkout-summary">
          <h3>Order Summary</h3>
          
          <div style="max-height:200px; overflow-y:auto; margin-bottom:20px; display:flex; flex-direction:column; gap:12px; padding-right:8px;">
            ${cart.map(item => `
              <div class="checkout-item">
                <div>
                  <div class="checkout-item-name">${item.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-tertiary);">Qty: ${item.quantity} | Size: ${item.size}</div>
                </div>
                <div style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Promo Apply input -->
          <div class="cart-promo">
            <input type="text" id="co-promo-input" placeholder="Promo (e.g. WELCOME10, LARK20)">
            <button class="btn btn-secondary" id="co-promo-apply-btn">Apply</button>
          </div>
          <div id="promo-success-msg" style="display:none; color:var(--success); font-size:0.85rem; margin-bottom:16px; font-weight:600;"></div>

          <div class="cart-summary-row">
            <span>Subtotal</span>
            <span id="co-subtotal">$0.00</span>
          </div>
          <div class="cart-summary-row" id="co-discount-row" style="display:none; color:var(--success);">
            <span>Discount</span>
            <span id="co-discount">-$0.00</span>
          </div>
          <div class="cart-summary-row">
            <span>Taxes (8%)</span>
            <span id="co-tax">$0.00</span>
          </div>
          <div class="cart-summary-row">
            <span>Shipping</span>
            <span id="co-shipping">$0.00</span>
          </div>
          
          <div class="cart-summary-row total">
            <span>Total</span>
            <span id="co-total">$0.00</span>
          </div>

          <button class="btn btn-primary" id="co-submit-btn" style="width:100%; margin-top:20px; height:46px;">
            Place Order
          </button>
        </aside>
      </div>
    </div>
  `;

  lucide.createIcons();
  calculateAndRenderSummary();

  // --- Attach Event Listeners ---
  const promoInput = document.getElementById('co-promo-input');
  const promoApplyBtn = document.getElementById('co-promo-apply-btn');
  const promoSuccessElm = document.getElementById('promo-success-msg');

  promoApplyBtn.onclick = () => {
    const code = promoInput.value.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      hasPromoApplied = true;
      currentPromo = code;
      
      promoSuccessElm.innerText = `✓ Active promo: ${PROMO_CODES[code].description}`;
      promoSuccessElm.style.display = 'block';
      promoInput.disabled = true;
      promoApplyBtn.disabled = true;
      calculateAndRenderSummary();
      showToast('Promo Code Applied', 'Discount calculation updated.', 'success');
    } else {
      showToast('Invalid Coupon', 'Code entered does not match any current promos.', 'error');
    }
  };

  // --- Express Checkout Handlers (Apple Pay / PayPal simulated instant payment) ---
  const runExpressCheckout = (paymentMethod) => {
    const customerInfo = {
      name: document.getElementById('co-name').value || store.state.userProfile.name,
      email: document.getElementById('co-email').value || store.state.userProfile.email,
      phone: document.getElementById('co-phone').value || store.state.userProfile.phone,
      address: document.getElementById('co-address').value || (store.state.userProfile.addresses[0] || ''),
      city: document.getElementById('co-city').value || 'Cairo',
      zip: document.getElementById('co-zip').value || '11511'
    };

    openModal(`
      <div style="text-align:center; padding: 40px 20px;">
        <div style="width: 50px; height: 50px; border: 4px solid var(--border-color); border-top-color: var(--accent-primary); border-radius: 50%; display: inline-block; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
        <h3>Confirming with ${paymentMethod}</h3>
        <p style="color:var(--text-secondary); margin-top:8px;">Authenticating your express payment...</p>
      </div>
      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
    `);

    setTimeout(() => {
      closeModal();
      const newOrder = store.placeOrder(customerInfo, paymentMethod, currentPromo);
      if (newOrder) {
        showToast('Express Checkout Complete', `Paid instantly with ${paymentMethod}.`, 'success');
        renderOrderSuccess(newOrder);
      } else {
        showToast('Checkout Failed', 'Something went wrong processing your order.', 'error');
      }
    }, 800);
  };

  document.getElementById('express-applepay-btn').onclick = () => runExpressCheckout('Apple Pay');
  document.getElementById('express-paypal-btn').onclick = () => runExpressCheckout('PayPal');

  const pmRadios = mainContent.querySelectorAll('input[name="payment-method"]');
  const ccFields = document.getElementById('credit-card-fields-box');
  
  pmRadios.forEach(radio => {
    radio.onchange = () => {
      ccFields.style.display = radio.value === 'Credit Card' ? 'grid' : 'none';
    };
  });

  // --- Live Input Masking for Card Fields ---
  const cardNumberInput = document.getElementById('co-card-number');
  const cardExpiryInput = document.getElementById('co-card-expiry');
  const cardCvcInput = document.getElementById('co-card-cvc');

  cardNumberInput.oninput = (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
  };

  cardExpiryInput.oninput = (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      e.target.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      e.target.value = digits;
    }
  };

  cardCvcInput.oninput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
  };

  // --- Credit Card Validation ---
  const showFieldError = (inputId, message) => {
    const errorElm = document.getElementById(`${inputId}-error`);
    const inputElm = document.getElementById(inputId);
    if (message) {
      errorElm.innerText = message;
      errorElm.style.display = 'block';
      inputElm.style.borderColor = 'var(--danger)';
    } else {
      errorElm.style.display = 'none';
      inputElm.style.borderColor = '';
    }
  };

  const validateCreditCard = () => {
    let valid = true;
    const rawNumber = cardNumberInput.value.replace(/\s/g, '');
    if (rawNumber.length !== 16 || !/^\d{16}$/.test(rawNumber)) {
      showFieldError('co-card-number', 'Enter a valid 16-digit card number.');
      valid = false;
    } else {
      showFieldError('co-card-number', null);
    }

    const expiryMatch = cardExpiryInput.value.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      showFieldError('co-card-expiry', 'Use MM/YY format.');
      valid = false;
    } else {
      const month = parseInt(expiryMatch[1], 10);
      const year = parseInt(expiryMatch[2], 10) + 2000;
      const now = new Date();
      const expiryDate = new Date(year, month, 0);
      if (month < 1 || month > 12) {
        showFieldError('co-card-expiry', 'Invalid month.');
        valid = false;
      } else if (expiryDate < now) {
        showFieldError('co-card-expiry', 'Card has expired.');
        valid = false;
      } else {
        showFieldError('co-card-expiry', null);
      }
    }

    if (!/^\d{3}$/.test(cardCvcInput.value)) {
      showFieldError('co-card-cvc', 'Enter a valid 3-digit CVC.');
      valid = false;
    } else {
      showFieldError('co-card-cvc', null);
    }

    return valid;
  };

  document.getElementById('co-submit-btn').onclick = (e) => {
    e.preventDefault();
    const shipForm = document.getElementById('checkout-shipping-form');

    if (!shipForm.reportValidity()) {
      showToast('Validation Error', 'Please complete the shipping fields.', 'warning');
      return;
    }

    const paymentMethod = mainContent.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'Credit Card' && !validateCreditCard()) {
      showToast('Card Validation Failed', 'Please check your card details and try again.', 'error');
      return;
    }

    const customerInfo = {
      name: document.getElementById('co-name').value,
      email: document.getElementById('co-email').value,
      phone: document.getElementById('co-phone').value,
      address: document.getElementById('co-address').value,
      city: document.getElementById('co-city').value,
      zip: document.getElementById('co-zip').value
    };

    openModal(`
      <div style="text-align:center; padding: 40px 20px;">
        <div style="width: 50px; height: 50px; border: 4px solid var(--border-color); border-top-color: var(--accent-primary); border-radius: 50%; display: inline-block; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
        <h3>Processing Payment</h3>
        <p style="color:var(--text-secondary); margin-top:8px;">Please do not close this window. We are securing your transaction details...</p>
      </div>
      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
    `);

    setTimeout(() => {
      closeModal();
      
      const newOrder = store.placeOrder(customerInfo, paymentMethod, currentPromo);
      if (newOrder) {
        showToast('Order Placed', 'Your order was successfully recorded.', 'success');
        renderOrderSuccess(newOrder);
      } else {
        showToast('Checkout Failed', 'Something went wrong processing your order.', 'error');
      }
    }, 1500);
  };
}

function renderOrderSuccess(order) {
  mainContent.innerHTML = `
    <div class="container slide-up">
      <div class="success-screen">
        <div class="success-icon-wrapper">
          <i data-lucide="check"></i>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping at Larkspur. We have received your order details and are preparing it for shipment.</p>
        
        <div class="receipt-box">
          <div style="font-weight:700; font-size:1.05rem; margin-bottom:16px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">Receipt Summary</div>
          <div class="receipt-row">
            <span>Order ID</span>
            <strong>${order.id}</strong>
          </div>
          <div class="receipt-row">
            <span>Payment Mode</span>
            <span>${order.paymentMethod}</span>
          </div>
          <div class="receipt-row">
            <span>Customer Name</span>
            <span>${order.customer.name}</span>
          </div>
          <div class="receipt-row">
            <span>Shipping Address</span>
            <span>${order.customer.address}</span>
          </div>

          <div style="margin:16px 0; border-top:1px dashed var(--border-color); padding-top:12px; display:flex; flex-direction:column; gap:8px;">
            ${order.items.map(item => `
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-secondary);">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div class="receipt-row" style="margin-top:12px;">
            <span>Subtotal</span>
            <span>$${order.subtotal.toFixed(2)}</span>
          </div>
          ${order.discount > 0 ? `
            <div class="receipt-row" style="color:var(--success);">
              <span>Promo Discount</span>
              <span>-$${order.discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="receipt-row">
            <span>Taxes (8%)</span>
            <span>$${order.tax.toFixed(2)}</span>
          </div>
          <div class="receipt-row">
            <span>Shipping</span>
            <span>$${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div class="receipt-row total">
            <span>Total Paid</span>
            <span>$${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:16px;">
          <a class="btn btn-secondary" href="#catalog">Continue Shopping</a>
          <a class="btn btn-primary" href="#profile">View My Orders</a>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}

/* ==========================================
   5. PROFILE & ORDERS HISTORY VIEW (Dynamic shipping tracker timeline)
   ========================================== */
function renderProfile() {
  const orders = store.state.orders;

  mainContent.innerHTML = `
    <div class="container slide-up">
      <div class="profile-layout">
        <!-- Profile Sidebar -->
        <aside class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-avatar">${store.state.userProfile.name.charAt(0)}</div>
            <h3 style="font-size:1.15rem; margin-bottom:4px;" id="profile-name-val">${store.state.userProfile.name}</h3>
            <p style="font-size:0.8rem; color:var(--text-tertiary);">${store.state.userProfile.email}</p>
          </div>
          
          <div class="profile-menu">
            <div class="profile-menu-item active" id="profile-tab-orders">
              <i data-lucide="package"></i>
              <span>Order History</span>
            </div>
            <div class="profile-menu-item" id="profile-tab-details">
              <i data-lucide="user"></i>
              <span>Personal Details</span>
            </div>
          </div>
        </aside>

        <!-- Dynamic Profile Content -->
        <section id="profile-content-area"></section>
      </div>
    </div>
  `;

  lucide.createIcons();

  const showOrdersHistory = () => {
    document.getElementById('profile-tab-orders').classList.add('active');
    document.getElementById('profile-tab-details').classList.remove('active');

    const contentArea = document.getElementById('profile-content-area');
    contentArea.innerHTML = `
      <h2 style="font-size:1.75rem; margin-bottom:24px;">Your Purchase History</h2>
      <div class="orders-list">
        ${orders.length === 0 ? `
          <div class="glass-card empty-state" style="padding:60px;">
            <i data-lucide="shopping-bag" style="width: 48px; height: 48px;"></i>
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders with us yet. Check out our store to buy items.</p>
            <a href="#catalog" class="btn btn-primary">Browse Products</a>
          </div>
        ` : orders.map(order => {
          const dateFormatted = new Date(order.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          });

          // Shipping progress tracker widths & statuses
          let progressWidth = '0%';
          let step1Class = 'tracker-step active';
          let step2Class = 'tracker-step';
          let step3Class = 'tracker-step';
          let step4Class = 'tracker-step';

          if (order.status === 'processing') {
            progressWidth = '33%';
            step1Class = 'tracker-step completed';
            step2Class = 'tracker-step active';
          } else if (order.status === 'shipped') {
            progressWidth = '66%';
            step1Class = 'tracker-step completed';
            step2Class = 'tracker-step completed';
            step3Class = 'tracker-step active';
          } else if (order.status === 'delivered') {
            progressWidth = '100%';
            step1Class = 'tracker-step completed';
            step2Class = 'tracker-step completed';
            step3Class = 'tracker-step completed';
            step4Class = 'tracker-step active';
          }

          return `
            <div class="order-card">
              <div class="order-card-header">
                <div>
                  <div class="order-id">Order ID: ${order.id}</div>
                  <div class="order-date">Placed on ${dateFormatted}</div>
                </div>
                <span class="status-badge status-${order.status}">${order.status}</span>
              </div>

              <div class="order-card-body">
                <div style="display:flex; flex-direction:column; gap:12px; flex-grow:1;">
                  ${order.items.map(item => `
                    <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; background:var(--bg-tertiary); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center;">
                        <img src="${item.image}" alt="" style="max-width:80%; max-height:80%; object-fit:contain;">
                      </div>
                      <div>
                        <div style="font-size:0.9rem; font-weight:600;">${item.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-tertiary);">Qty: ${item.quantity} | Color: <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${item.color}; border:1px solid rgba(255,255,255,0.2);"></span> | Size: ${item.size}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div style="text-align:right; min-width:150px;">
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">Total Amount</div>
                  <div style="font-size:1.3rem; font-weight:700; color:var(--accent-primary);">$${order.total.toFixed(2)}</div>
                  <div style="font-size:0.75rem; color:var(--text-tertiary); margin-top:4px;">Payment: ${order.paymentMethod}</div>
                </div>
              </div>

              <!-- Shipping progress timeline -->
              ${order.status !== 'cancelled' ? `
                <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
                  <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Estimated Delivery Stage</div>
                  <div class="tracker-timeline">
                    <div class="tracker-progress-line" style="width: ${progressWidth};"></div>
                    <div class="${step1Class}">
                      <div class="tracker-node">1</div>
                      <div class="tracker-label">Placed</div>
                    </div>
                    <div class="${step2Class}">
                      <div class="tracker-node">2</div>
                      <div class="tracker-label">Processing</div>
                    </div>
                    <div class="${step3Class}">
                      <div class="tracker-node">3</div>
                      <div class="tracker-label">Shipped</div>
                    </div>
                    <div class="${step4Class}">
                      <div class="tracker-node">4</div>
                      <div class="tracker-label">Delivered</div>
                    </div>
                  </div>
                </div>
              ` : `
                <div style="margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 16px; color: var(--danger); font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                  <i data-lucide="alert-circle" style="width: 16px; height: 16px;"></i>
                  <span>This order has been cancelled.</span>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `;
    lucide.createIcons();
  };

  const showPersonalDetails = () => {
    document.getElementById('profile-tab-orders').classList.remove('active');
    document.getElementById('profile-tab-details').classList.add('active');

    const contentArea = document.getElementById('profile-content-area');
    contentArea.innerHTML = `
      <h2 style="font-size:1.75rem; margin-bottom:24px;">Manage Personal Details</h2>
      <div class="glass-card" style="padding: 30px;">
        <form id="profile-edit-form" style="display:flex; flex-direction:column; gap:20px;">
          <div class="form-group">
            <label for="prof-name">Full Name</label>
            <input type="text" id="prof-name" required value="${store.state.userProfile.name}">
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label for="prof-email">Email Address</label>
              <input type="email" id="prof-email" required value="${store.state.userProfile.email}">
            </div>
            <div class="form-group">
              <label for="prof-phone">Phone Number</label>
              <input type="tel" id="prof-phone" required value="${store.state.userProfile.phone}">
            </div>
          </div>
          <div class="form-group">
            <label for="prof-address">Primary Delivery Address</label>
            <textarea id="prof-address" rows="3" required>${store.state.userProfile.addresses[0] || ''}</textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self: flex-start; min-width: 150px;">Save Profile</button>
        </form>
      </div>
    `;

    document.getElementById('profile-edit-form').onsubmit = (e) => {
      e.preventDefault();
      const updated = {
        name: document.getElementById('prof-name').value,
        email: document.getElementById('prof-email').value,
        phone: document.getElementById('prof-phone').value,
        addresses: [document.getElementById('prof-address').value]
      };
      
      store.updateProfile(updated);
      showToast('Profile Updated', 'Your changes have been saved successfully.', 'success');
      
      // Refresh sidebar and profile details
      document.getElementById('profile-name-val').innerText = updated.name;
      showPersonalDetails();
    };
  };

  // Mount listeners
  document.getElementById('profile-tab-orders').onclick = showOrdersHistory;
  document.getElementById('profile-tab-details').onclick = showPersonalDetails;

  // Initial tab loading
  showOrdersHistory();
}

/* ==========================================
   6. ADMIN DASHBOARD VIEW (Dynamic Best Sellers table)
   ========================================== */
function renderDashboard() {
  mainContent.innerHTML = `
    <div class="admin-layout">
      <!-- Admin Sidebar -->
      <aside class="admin-sidebar">
        <div>
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-tertiary); text-transform:uppercase; margin-bottom:16px; padding-left:12px;">Admin Management</div>
          <div class="admin-menu">
            <div class="admin-menu-item ${adminSubPage === 'overview' ? 'active' : ''}" data-target="overview">
              <i data-lucide="bar-chart-2"></i>
              <span>Overview Stats</span>
            </div>
            <div class="admin-menu-item ${adminSubPage === 'products' ? 'active' : ''}" data-target="products">
              <i data-lucide="package"></i>
              <span>Manage Products</span>
            </div>
            <div class="admin-menu-item ${adminSubPage === 'orders' ? 'active' : ''}" data-target="orders">
              <i data-lucide="shopping-cart"></i>
              <span>Manage Orders</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Admin Content -->
      <section class="admin-content" id="admin-workspace-content"></section>
    </div>
  `;

  lucide.createIcons();

  mainContent.querySelectorAll('.admin-menu-item').forEach(item => {
    item.onclick = () => {
      mainContent.querySelectorAll('.admin-menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      adminSubPage = item.dataset.target;
      renderAdminSubPage();
    };
  });

  renderAdminSubPage();
}

function renderAdminSubPage() {
  const workspace = document.getElementById('admin-workspace-content');
  if (!workspace) return;

  if (adminSubPage === 'overview') {
    renderAdminOverview(workspace);
  } else if (adminSubPage === 'products') {
    renderAdminProducts(workspace);
  } else if (adminSubPage === 'orders') {
    renderAdminOrders(workspace);
  }
}

// Helper: render a relative "time ago" label from an ISO timestamp
function timeAgo(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 5) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

// Helper: map audit log type to a lucide icon name
function logTypeIcon(type) {
  const map = { product: 'package', order: 'shopping-cart', cart: 'shopping-bag', review: 'star', system: 'terminal' };
  return map[type] || 'terminal';
}

// Helper: build a growth-badge span (positive/negative) from a percentage value
function growthBadgeHtml(pct, opts = {}) {
  if (!isFinite(pct)) pct = 0;
  const positive = pct >= 0;
  const arrow = positive ? '↑' : '↓';
  const label = opts.suffix ? ` ${opts.suffix}` : '';
  return `<span class="growth-badge ${positive ? 'growth-positive' : 'growth-negative'}">${arrow} ${Math.abs(pct).toFixed(1)}%${label}</span>`;
}

// Helper: compute week-over-week growth by comparing the first half vs second half
// of the last 7 days of order activity (revenue + order count)
function computeWeeklyGrowth(orders) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toDateString());
  }

  const dailyRevenue = {};
  const dailyOrders = {};
  const dailyEmails = {};
  days.forEach(d => { dailyRevenue[d] = 0; dailyOrders[d] = 0; dailyEmails[d] = new Set(); });

  orders.forEach(o => {
    if (o.status === 'cancelled') return;
    const key = new Date(o.date).toDateString();
    if (dailyRevenue[key] === undefined) return;
    dailyRevenue[key] += o.total;
    dailyOrders[key] += 1;
    dailyEmails[key].add(o.customer.email);
  });

  const half = Math.ceil(days.length / 2);
  const sum = arr => arr.reduce((a, b) => a + b, 0);

  const revArr = days.map(d => dailyRevenue[d]);
  const ordArr = days.map(d => dailyOrders[d]);
  const custArr = days.map(d => dailyEmails[d].size);

  const prevRev = sum(revArr.slice(0, half));
  const currRev = sum(revArr.slice(half));
  const prevOrd = sum(ordArr.slice(0, half));
  const currOrd = sum(ordArr.slice(half));
  const prevCust = sum(custArr.slice(0, half));
  const currCust = sum(custArr.slice(half));

  const pctChange = (curr, prev) => {
    if (prev === 0) return curr > 0 ? 100 : 0;
    return ((curr - prev) / prev) * 100;
  };

  return {
    revenueGrowth: pctChange(currRev, prevRev),
    ordersGrowth: pctChange(currOrd, prevOrd),
    customersGrowth: pctChange(currCust, prevCust)
  };
}

// 6.1 Admin: Dashboard Overview Stats (with dynamic Best Sellers calculation)
function renderAdminOverview(workspace) {
  const orders = store.state.orders;
  const products = store.state.products;
  const logs = store.state.logs;

  // KPI calculations
  const completedOrders = orders.filter(o => o.status !== 'cancelled');
  const totalSales = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const uniqueEmails = new Set(orders.map(o => o.customer.email));
  const totalCustomersCount = uniqueEmails.size;

  // Growth indicators (week-over-week, derived from real order/log data)
  const growth = computeWeeklyGrowth(orders);
  const productsAddedThisWeek = logs.filter(l => l.type === 'product' && l.action.toLowerCase().includes('published') && (Date.now() - new Date(l.timestamp).getTime()) < 7 * 86400000).length;

  // Calculate best selling products based on non-cancelled orders quantity
  const productSalesMap = {};
  orders.forEach(o => {
    if (o.status !== 'cancelled') {
      o.items.forEach(item => {
        if (!productSalesMap[item.id]) {
          productSalesMap[item.id] = { qty: 0, revenue: 0, name: item.name, image: item.image, category: item.category };
        }
        productSalesMap[item.id].qty += item.quantity;
        productSalesMap[item.id].revenue += item.price * item.quantity;
      });
    }
  });

  const bestSellers = Object.entries(productSalesMap)
    .map(([id, stats]) => ({ id, ...stats }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 3); // top 3 sellers

  workspace.innerHTML = `
    <div class="slide-up">
      <h2 style="font-size:1.75rem; margin-bottom:24px;">Workspace Overview</h2>
      
      <!-- KPI Stats Grid -->
      <div class="kpi-grid">
        <div class="kpi-card glass">
          <div class="kpi-info">
            <h4>Total Revenue</h4>
            <div class="value">$${totalSales.toFixed(2)}</div>
            ${growthBadgeHtml(growth.revenueGrowth, { suffix: 'vs last period' })}
          </div>
          <div class="kpi-icon"><i data-lucide="dollar-sign"></i></div>
        </div>

        <div class="kpi-card glass">
          <div class="kpi-info">
            <h4>Placed Orders</h4>
            <div class="value">${totalOrdersCount}</div>
            ${growthBadgeHtml(growth.ordersGrowth, { suffix: 'vs last period' })}
          </div>
          <div class="kpi-icon"><i data-lucide="shopping-cart"></i></div>
        </div>

        <div class="kpi-card glass">
          <div class="kpi-info">
            <h4>Total Catalog</h4>
            <div class="value">${totalProductsCount}</div>
            <span class="growth-badge growth-positive">+${productsAddedThisWeek} this week</span>
          </div>
          <div class="kpi-icon"><i data-lucide="package"></i></div>
        </div>

        <div class="kpi-card glass">
          <div class="kpi-info">
            <h4>Customers</h4>
            <div class="value">${totalCustomersCount}</div>
            ${growthBadgeHtml(growth.customersGrowth, { suffix: 'vs last period' })}
          </div>
          <div class="kpi-icon"><i data-lucide="users"></i></div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid">
        <!-- Sales Trend Line Chart -->
        <div class="chart-card">
          <h3>Sales Trend (Last 7 Days)</h3>
          <div class="chart-container" id="admin-line-chart-box"></div>
        </div>

        <!-- Categories Distribution Pie Chart -->
        <div class="chart-card">
          <h3>Categories Distribution</h3>
          ${(() => {
            const catColors = { electronics: 'var(--accent-primary)', fashion: 'var(--accent-secondary)', home: 'var(--info)', fitness: 'var(--warning)' };
            const catLabels = { electronics: 'Electronics', fashion: 'Fashion', home: 'Home Decor', fitness: 'Fitness' };
            const counts = {};
            products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
            const total = products.length || 1;
            const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

            let cumulative = 0;
            const gradientStops = entries.map(([cat, count]) => {
              const pct = (count / total) * 100;
              const start = cumulative;
              cumulative += pct;
              const color = catColors[cat] || 'var(--text-tertiary)';
              return `${color} ${start}% ${cumulative}%`;
            }).join(', ');

            const legendHtml = entries.map(([cat, count]) => {
              const pct = Math.round((count / total) * 100);
              return `
                <div class="legend-item">
                  <span class="legend-color" style="background:${catColors[cat] || 'var(--text-tertiary)'};"></span>
                  <span>${catLabels[cat] || cat} (${pct}%)</span>
                </div>
              `;
            }).join('');

            return `
              <div class="pie-chart-wrapper">
                <div class="pie-chart" style="background: conic-gradient(${gradientStops});"></div>
                <div class="pie-legend">${legendHtml}</div>
              </div>
            `;
          })()}
        </div>
      </div>

      <!-- Live System Audit Log -->
      <div class="chart-card" style="margin-top: 30px;">
        <h3 style="display:flex; align-items:center; justify-content:space-between;">
          <span>Live Audit Log</span>
          <span style="display:inline-flex; align-items:center; gap:6px; font-size:0.7rem; color:var(--success); text-transform:none; letter-spacing:0;">
            <span style="width:7px; height:7px; border-radius:50%; background:var(--success); display:inline-block; animation: pulse-dot 1.5s infinite;"></span>
            Live
          </span>
        </h3>
        <div class="audit-log-feed">
          ${logs.length === 0 ? `
            <div style="text-align:center; color:var(--text-tertiary); padding:20px 0; font-size:0.85rem;">No system activity recorded yet.</div>
          ` : logs.slice(0, 8).map(log => `
            <div class="audit-log-item">
              <div style="display:flex; align-items:center; gap:10px;">
                <i data-lucide="${logTypeIcon(log.type)}" style="width:14px; height:14px; color:var(--accent-primary); flex-shrink:0;"></i>
                <span class="audit-log-text">${log.action}</span>
              </div>
              <span class="audit-log-time">${timeAgo(log.timestamp)}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <style>
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      </style>

      <!-- Best Selling Products Table -->
      <div class="admin-table-container" style="margin-top: 30px;">
        <div class="table-header-actions">
          <h3 style="font-size:1.15rem;">Best Selling Products</h3>
          <span style="font-size:0.85rem; color:var(--text-secondary);">Top sellers this week</span>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Product</th>
              <th>Category</th>
              <th>Units Sold</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            ${bestSellers.length === 0 ? `
              <tr><td colspan="5" style="text-align:center; color:var(--text-tertiary); padding: 20px 0;">No sales data available. Placed orders will reflect here!</td></tr>
            ` : bestSellers.map((item, idx) => `
              <tr>
                <td><strong>#${idx + 1}</strong></td>
                <td>
                  <div class="table-product-cell">
                    <div class="table-product-img">
                      <img src="${item.image}" alt="">
                    </div>
                    <div>
                      <div style="font-weight:600; max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</div>
                      <div style="font-size:0.75rem; color:var(--text-tertiary);">ID: ${item.id}</div>
                    </div>
                  </div>
                </td>
                <td style="text-transform: capitalize;">${item.category}</td>
                <td style="font-weight:600;">${item.qty} units</td>
                <td style="font-weight:700; color:var(--accent-primary);">$${item.revenue.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Recent Orders List -->
      <div class="admin-table-container" style="margin-top: 30px;">
        <div class="table-header-actions">
          <h3 style="font-size:1.15rem;">Recent Incoming Orders</h3>
          <button class="btn btn-secondary" onclick="document.querySelector('[data-target=\\'orders\\']').click();">View All Orders</button>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${orders.slice(0, 4).map(o => {
              const dt = new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
              return `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>
                    <div>${o.customer.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-tertiary);">${o.customer.email}</div>
                  </td>
                  <td>${dt}</td>
                  <td><span class="status-badge status-${o.status}">${o.status}</span></td>
                  <td>${o.items.reduce((sum, item) => sum + item.quantity, 0)} items</td>
                  <td style="font-weight:700; color:var(--accent-primary);">$${o.total.toFixed(2)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  lucide.createIcons();

  const lineChartBox = document.getElementById('admin-line-chart-box');
  if (lineChartBox) {
    lineChartBox.innerHTML = renderSVGChart(orders);
  }
}

// 6.2 Admin: Manage Products (CRUD List)
function renderAdminProducts(workspace) {
  const products = store.state.products;

  workspace.innerHTML = `
    <div class="slide-up">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h2 style="font-size:1.75rem;">Manage Products Catalog</h2>
        <button class="btn btn-primary" id="admin-add-product-btn">
          <i data-lucide="plus"></i> Add New Product
        </button>
      </div>

      <!-- Table -->
      <div class="admin-table-container">
        <div class="table-header-actions">
          <div class="search-container table-search">
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search catalog..." id="admin-products-search">
          </div>
          <span style="font-size:0.85rem; color:var(--text-secondary);">${products.length} products total</span>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="admin-products-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  lucide.createIcons();

  const filterAndRenderTable = (query = '') => {
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;

    let items = [...store.state.products];
    if (query.trim() !== '') {
      const q = query.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    tbody.innerHTML = items.map(p => {
      const revList = p.reviewsList || [];
      const avg = revList.length > 0 ? (revList.reduce((s, r) => s + r.rating, 0) / revList.length) : 5.0;

      return `
        <tr>
          <td>
            <div class="table-product-cell">
              <div class="table-product-img">
                <img src="${p.image}" alt="">
              </div>
              <div>
                <div style="font-weight:600; max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
                <div style="font-size:0.75rem; color:var(--text-tertiary);">ID: ${p.id} ${p.tag ? `| ${p.tag}` : ''}</div>
              </div>
            </div>
          </td>
          <td style="text-transform: capitalize;">${p.category}</td>
          <td style="font-weight:600;">$${p.price.toFixed(2)}</td>
          <td>
            <span style="color: ${p.stock <= 5 ? 'var(--danger)' : 'inherit'}; font-weight: ${p.stock <= 5 ? '700' : 'normal'};">
              ${p.stock} units
            </span>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:4px; color:var(--warning);">
              <i data-lucide="star" style="width: 12px; height: 12px; fill:var(--warning);"></i>
              <span>${avg.toFixed(1)}</span>
            </div>
          </td>
          <td>
            <div class="actions-cell">
              <button class="btn-icon action-icon-btn action-view-btn" data-id="${p.id}" title="View in Storefront">
                <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn-icon action-icon-btn action-edit-btn edit-p-btn" data-id="${p.id}" title="Edit Product">
                <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn-icon action-icon-btn action-delete-btn delete-p-btn" data-id="${p.id}" title="Delete Product">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    lucide.createIcons();

    tbody.querySelectorAll('.action-view-btn').forEach(btn => {
      btn.onclick = () => {
        store.setAdminMode(false);
        store.setPage(`product-${btn.dataset.id}`);
      };
    });

    tbody.querySelectorAll('.edit-p-btn').forEach(btn => {
      btn.onclick = () => showAddEditProductModal(btn.dataset.id);
    });

    tbody.querySelectorAll('.delete-p-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const prod = store.state.products.find(p => p.id === id);
        showConfirm('Delete Product', `Are you sure you want to delete ${prod.name}? This action cannot be undone.`, () => {
          store.deleteProduct(id);
          showToast('Product Deleted', 'Item has been removed from catalog.', 'success');
          renderAdminProducts(workspace);
        });
      };
    });
  };

  filterAndRenderTable();

  document.getElementById('admin-products-search').oninput = (e) => {
    filterAndRenderTable(e.target.value);
  };

  document.getElementById('admin-add-product-btn').onclick = () => {
    showAddEditProductModal();
  };
}

// Show Create / Edit Modal
function showAddEditProductModal(productId = null) {
  const isEdit = productId !== null;
  const product = isEdit ? store.state.products.find(p => p.id === productId) : null;

  const html = `
    <div class="modal-header">
      <h3>${isEdit ? 'Edit Product Details' : 'Add New Catalog Product'}</h3>
    </div>
    <form id="admin-product-form" style="display:flex; flex-direction:column; gap:20px;">
      <div class="form-group">
        <label for="form-p-name">Product Name *</label>
        <input type="text" id="form-p-name" required value="${product ? product.name : ''}" placeholder="e.g. Premium Noise Cancelling Headphones">
      </div>
      
      <div class="form-grid">
        <div class="form-group">
          <label for="form-p-price">Price ($) *</label>
          <input type="number" step="0.01" id="form-p-price" required value="${product ? product.price : ''}" placeholder="99.99">
        </div>
        <div class="form-group">
          <label for="form-p-stock">Stock Qty *</label>
          <input type="number" id="form-p-stock" required value="${product ? product.stock : ''}" placeholder="25">
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label for="form-p-category">Category *</label>
          <select id="form-p-category" required>
            ${CATEGORIES.map(c => `
              <option value="${c.id}" ${product && product.category === c.id ? 'selected' : ''}>${c.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="form-p-tag">Highlight Tag</label>
          <input type="text" id="form-p-tag" value="${product && product.tag ? product.tag : ''}" placeholder="e.g. Best Seller, Premium">
        </div>
      </div>

      <div class="form-group">
        <label>Product Image</label>
        <div class="image-upload-row">
          <div class="image-upload-preview" id="product-image-preview">
            ${product && product.image ? `<img src="${product.image}" alt="">` : `<i data-lucide="image"></i>`}
            <button type="button" class="image-upload-clear" id="form-p-image-clear" style="${product && product.image ? '' : 'display:none;'}" title="Remove image">
              <i data-lucide="x"></i>
            </button>
          </div>
          <div class="image-upload-controls">
            <input type="file" id="form-p-image-file" accept="image/*" style="display:none;">
            <button type="button" class="btn btn-secondary" id="form-p-image-upload-btn">
              <i data-lucide="upload"></i>
              <span>Upload from device</span>
            </button>
            <span class="image-upload-divider">or paste a link</span>
            <input type="url" id="form-p-image" value="${product ? product.image : ''}" placeholder="https://images.unsplash.com/...">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="form-p-desc">Product Description</label>
        <textarea id="form-p-desc" rows="4" placeholder="Detail parameters, target audience, and styling elements...">${product ? product.description : ''}</textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Publish Product'}</button>
      </div>
    </form>
  `;

  openModal(html);
  lucide.createIcons();

  // --- Image upload / URL handling ---
  let uploadedImageData = product && product.image ? product.image : '';

  const imagePreview = document.getElementById('product-image-preview');
  const imageFileInput = document.getElementById('form-p-image-file');
  const imageUploadBtn = document.getElementById('form-p-image-upload-btn');
  const imageUrlInput = document.getElementById('form-p-image');
  const imageClearBtn = document.getElementById('form-p-image-clear');

  const setPreview = (src) => {
    if (src) {
      imagePreview.innerHTML = `<img src="${src}" alt=""><button type="button" class="image-upload-clear" id="form-p-image-clear" title="Remove image"><i data-lucide="x"></i></button>`;
      document.getElementById('form-p-image-clear').onclick = clearImage;
    } else {
      imagePreview.innerHTML = `<i data-lucide="image"></i>`;
    }
    lucide.createIcons();
  };

  function clearImage() {
    uploadedImageData = '';
    imageUrlInput.value = '';
    imageFileInput.value = '';
    setPreview('');
  }

  if (imageClearBtn) imageClearBtn.onclick = clearImage;

  imageUploadBtn.onclick = () => imageFileInput.click();

  imageFileInput.onchange = () => {
    const file = imageFileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please select an image file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize/compress so we don't bloat local storage
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        uploadedImageData = dataUrl;
        imageUrlInput.value = '';
        setPreview(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  imageUrlInput.oninput = () => {
    uploadedImageData = '';
    setPreview(imageUrlInput.value.trim());
  };

  document.getElementById('admin-product-form').onsubmit = (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('form-p-name').value,
      price: parseFloat(document.getElementById('form-p-price').value),
      stock: parseInt(document.getElementById('form-p-stock').value),
      category: document.getElementById('form-p-category').value,
      tag: document.getElementById('form-p-tag').value,
      image: uploadedImageData || imageUrlInput.value || undefined,
      description: document.getElementById('form-p-desc').value
    };

    if (isEdit) {
      store.updateProduct(productId, data);
      showToast('Product Updated', 'Product changes saved successfully.', 'success');
    } else {
      store.addProduct(data);
      showToast('Product Created', 'New product added to catalog.', 'success');
    }

    closeModal();
    renderAdminProducts(document.getElementById('admin-workspace-content'));
  };
}

// 6.3 Admin: Manage Orders (Orders List with Order details view modal)
function renderAdminOrders(workspace) {
  const orders = store.state.orders;

  workspace.innerHTML = `
    <div class="slide-up">
      <h2 style="font-size:1.75rem; margin-bottom:24px;">Manage Orders Ledger</h2>

      <div class="admin-table-container">
        <div class="table-header-actions">
          <div class="search-container table-search">
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search orders..." id="admin-orders-search">
          </div>
          <span style="font-size:0.85rem; color:var(--text-secondary);">${orders.length} orders total</span>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer details</th>
              <th>Placement Date</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Order Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody id="admin-orders-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  lucide.createIcons();

  const filterAndRenderOrdersTable = (query = '') => {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    let items = [...store.state.orders];
    if (query.trim() !== '') {
      const q = query.toLowerCase();
      items = items.filter(o => o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.status.toLowerCase().includes(q));
    }

    tbody.innerHTML = items.map(o => {
      const dateFormatted = new Date(o.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      return `
        <tr>
          <td><strong>${o.id}</strong></td>
          <td>
            <div>${o.customer.name}</div>
            <div style="font-size:0.75rem; color:var(--text-tertiary);">${o.customer.email} | ${o.customer.phone}</div>
          </td>
          <td>${dateFormatted}</td>
          <td style="font-weight:700; color:var(--accent-primary);">$${o.total.toFixed(2)}</td>
          <td>${o.paymentMethod}</td>
          <td>
            <select class="order-status-select status-${o.status}" data-id="${o.id}">
              <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
              <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
              <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
              <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <button class="btn btn-secondary view-order-details-btn" data-id="${o.id}" style="padding: 6px 12px; font-size: 0.8rem;">
              View Details
            </button>
          </td>
        </tr>
      `;
    }).join('');

    lucide.createIcons();

    // Attach status update select event
    tbody.querySelectorAll('.order-status-select').forEach(select => {
      select.onchange = (e) => {
        const orderId = select.dataset.id;
        const newStatus = e.target.value;
        select.className = `order-status-select status-${newStatus}`;
        store.updateOrderStatus(orderId, newStatus);
        showToast('Status Updated', `Order ${orderId} status set to ${newStatus}.`, 'success');
      };
    });

    // Attach details view modal trigger
    tbody.querySelectorAll('.view-order-details-btn').forEach(btn => {
      btn.onclick = () => {
        const oId = btn.dataset.id;
        const order = store.state.orders.find(o => o.id === oId);
        if (order) {
          showAdminOrderDetailModal(order);
        }
      };
    });
  };

  filterAndRenderOrdersTable();

  document.getElementById('admin-orders-search').oninput = (e) => {
    filterAndRenderOrdersTable(e.target.value);
  };
}

// Show Admin Order Detail Modal
function showAdminOrderDetailModal(order) {
  const html = `
    <div class="modal-header" style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
      <div>
        <h3>Order Details: ${order.id}</h3>
        <span style="font-size: 0.85rem; color: var(--text-tertiary);">Placed: ${new Date(order.date).toLocaleString()}</span>
      </div>
      <button class="btn btn-secondary" id="print-invoice-btn" style="flex-shrink:0; display:flex; align-items:center; gap:6px; padding:8px 14px; font-size:0.85rem;">
        <i data-lucide="printer" style="width:15px; height:15px;"></i> Print Invoice
      </button>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:20px; color: var(--text-primary); font-size: 0.95rem;">
      <div style="background:var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-weight: 700; margin-bottom: 8px;">Customer Information</div>
        <div>Name: ${order.customer.name}</div>
        <div>Email: ${order.customer.email}</div>
        <div>Phone: ${order.customer.phone}</div>
        <div style="margin-top:4px;">Address: ${order.customer.address}</div>
      </div>

      <div style="background:var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-weight: 700; margin-bottom: 8px;">Order Details</div>
        <div>Status: <span class="status-badge status-${order.status}" style="padding: 2px 8px; font-size:0.75rem;">${order.status}</span></div>
        <div style="margin-top: 4px;">Payment Method: ${order.paymentMethod}</div>
      </div>

      <div>
        <div style="font-weight: 700; margin-bottom: 12px;">Items Ledger</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${order.items.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <div>
                <strong style="color:var(--text-primary);">${item.name}</strong>
                <div style="color:var(--text-tertiary); font-size:0.75rem;">Qty: ${item.quantity} | Color: <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${item.color}; border:1px solid rgba(255,255,255,0.2);"></span> | Size: ${item.size}</div>
              </div>
              <div style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="text-align: right; border-top:1px dashed var(--border-color); padding-top:16px; font-size:0.9rem;">
        <div>Subtotal: $${order.subtotal.toFixed(2)}</div>
        ${order.discount > 0 ? `<div style="color:var(--success);">Discount: -$${order.discount.toFixed(2)}</div>` : ''}
        <div>Taxes (8%): $${order.tax.toFixed(2)}</div>
        <div>Shipping: $${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</div>
        <div style="font-size:1.15rem; font-weight:700; color:var(--accent-primary); margin-top:8px;">Total: $${order.total.toFixed(2)}</div>
      </div>
    </div>
  `;
  openModal(html);

  const printBtn = document.getElementById('print-invoice-btn');
  if (printBtn) {
    printBtn.onclick = () => printOrderInvoice(order);
  }
}

// Open a print-ready invoice for an order in a new window
function printOrderInvoice(order) {
  const invoiceWindow = window.open('', '_blank', 'width=800,height=900');
  if (!invoiceWindow) {
    showToast('Popup Blocked', 'Please allow popups to print the invoice.', 'error');
    return;
  }

  const itemsRows = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td style="text-align:center;">${item.size || '-'}</td>
      <td style="text-align:center;">${item.quantity}</td>
      <td style="text-align:right;">$${item.price.toFixed(2)}</td>
      <td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  invoiceWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice - ${order.id}</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; padding: 40px; max-width: 750px; margin: 0 auto; }
        .invoice-header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 3px solid #111; padding-bottom: 20px; margin-bottom: 30px; }
        .invoice-header h1 { margin:0; font-size: 1.6rem; letter-spacing: -0.02em; }
        .invoice-header p { margin: 4px 0 0; color: #666; font-size: 0.85rem; }
        .invoice-meta { text-align: right; font-size: 0.85rem; color: #444; }
        .invoice-meta strong { font-size: 1rem; color: #111; }
        .billing-grid { display: flex; justify-content: space-between; gap: 40px; margin-bottom: 30px; }
        .billing-block h4 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 8px; }
        .billing-block p { margin: 2px 0; font-size: 0.9rem; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th { text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888; padding: 10px 6px; border-bottom: 2px solid #111; }
        td { padding: 10px 6px; border-bottom: 1px solid #e0e0e0; font-size: 0.9rem; }
        .totals { width: 280px; margin-left: auto; font-size: 0.9rem; }
        .totals div { display: flex; justify-content: space-between; padding: 6px 0; }
        .totals .grand-total { border-top: 2px solid #111; margin-top: 8px; padding-top: 12px; font-weight: 700; font-size: 1.1rem; }
        .footer-note { margin-top: 40px; text-align: center; color: #999; font-size: 0.8rem; border-top: 1px solid #e0e0e0; padding-top: 20px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div>
          <h1>Larkspur</h1>
          <p>Premium E-commerce Invoice</p>
        </div>
        <div class="invoice-meta">
          <strong>Invoice #${order.id}</strong>
          <p>Date: ${new Date(order.date).toLocaleString()}</p>
          <p>Status: ${order.status.toUpperCase()}</p>
          <p>Payment: ${order.paymentMethod}</p>
        </div>
      </div>

      <div class="billing-grid">
        <div class="billing-block">
          <h4>Billed To</h4>
          <p><strong>${order.customer.name}</strong></p>
          <p>${order.customer.email}</p>
          <p>${order.customer.phone}</p>
          <p>${order.customer.address}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align:center;">Size</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Unit Price</th>
            <th style="text-align:right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <div class="totals">
        <div><span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span></div>
        ${order.discount > 0 ? `<div><span>Discount</span><span>-$${order.discount.toFixed(2)}</span></div>` : ''}
        <div><span>Taxes (8%)</span><span>$${order.tax.toFixed(2)}</span></div>
        <div><span>Shipping</span><span>${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span></div>
        <div class="grand-total"><span>Total Paid</span><span>$${order.total.toFixed(2)}</span></div>
      </div>

      <div class="footer-note">Thank you for shopping with Larkspur &mdash; this is a computer-generated invoice.</div>
    </body>
    </html>
  `);
  invoiceWindow.document.close();
  invoiceWindow.focus();
  setTimeout(() => invoiceWindow.print(), 300);
}

/* ==========================================
   INTERACTIVE BUTTON BINDINGS
   ========================================== */
function bindProductCardEvents(containerElm) {
  containerElm.querySelectorAll('.product-card').forEach(card => {
    const pId = card.dataset.id;
    card.onclick = (e) => {
      if (e.target.closest('.quick-add-btn') || e.target.closest('.product-like-btn')) return;
      store.setPage(`product-${pId}`);
    };
  });

  containerElm.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const pId = btn.dataset.id;
      const product = store.state.products.find(p => p.id === pId);
      
      const res = store.addToCart(pId, 1);
      if (res.success) {
        showToast('Cart Updated', `1x ${product.name} added to cart.`, 'success');
      } else {
        showToast('Out of Stock', res.msg, 'error');
      }
    };
  });
}
