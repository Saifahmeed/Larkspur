/* ==========================================
   Larkspur - UI Components Library
   ========================================== */
import { store, CATEGORIES } from './store.js';

// --- Toast System ---
export function showToast(title, msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Icon based on type
  let iconName = 'check-circle';
  if (type === 'error') iconName = 'x-circle';
  if (type === 'warning') iconName = 'alert-triangle';
  if (type === 'info') iconName = 'info';

  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${iconName}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  // Trigger Slide In is handled by CSS animation.
  // Out animation after 3 seconds:
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
}

// --- Dynamic Modal Controls ---
export function openModal(contentHtml, onClose = null) {
  const container = document.getElementById('modal-container');
  const body = document.getElementById('modal-body-content');
  if (!container || !body) return;

  body.innerHTML = contentHtml;
  container.classList.add('open');
  lucide.createIcons();
  
  // Handle Close Event
  const closeBtn = document.getElementById('close-modal-btn');
  const overlayBtn = document.getElementById('modal-overlay-btn');
  
  const closeAction = () => {
    closeModal();
    if (onClose) onClose();
  };

  if (closeBtn) closeBtn.onclick = closeAction;
  if (overlayBtn) overlayBtn.onclick = closeAction;
}

export function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) {
    container.classList.remove('open');
  }
}

// --- Confirmation Dialog ---
export function showConfirm(title, message, onConfirm) {
  const html = `
    <div class="modal-header">
      <h3>${title}</h3>
    </div>
    <div style="margin-bottom: 24px; color: var(--text-secondary);">
      <p>${message}</p>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <button class="btn btn-secondary" id="confirm-cancel-btn">Cancel</button>
      <button class="btn btn-primary" id="confirm-ok-btn" style="background: var(--danger); box-shadow: none;">Confirm</button>
    </div>
  `;

  openModal(html);

  document.getElementById('confirm-cancel-btn').onclick = closeModal;
  document.getElementById('confirm-ok-btn').onclick = () => {
    onConfirm();
    closeModal();
  };
}

// --- Navigation Bar ---
export function renderNavbar() {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  const cartCount = store.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const activePage = store.state.activePage;
  const isAdmin = store.state.isAdmin;
  const theme = store.state.theme;

  container.innerHTML = `
    <div class="container nav-container">
      <!-- Logo -->
      <a href="#home" class="nav-logo" id="nav-logo-link">
        <i data-lucide="shopping-bag"></i>
        <span>Larkspur</span>
      </a>

      <!-- Navigation links (Hidden/altered in admin mode) -->
      <nav class="nav-links">
        ${isAdmin ? `
          <a class="nav-link ${activePage === 'dashboard' ? 'active' : ''}" href="#dashboard">Dashboard</a>
          <a class="nav-link" href="#home" id="exit-admin-link">Storefront</a>
        ` : `
          <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="#home">Home</a>
          <div class="nav-link ${activePage === 'catalog' ? 'active' : ''}" style="position: relative;">
            <a href="#catalog" id="shop-megamenu-trigger">Shop</a>
            <!-- Nike-style Mega Menu Dropdown -->
            <div class="mega-menu-dropdown">
              <div class="mega-menu-grid">
                <div class="mega-menu-col">
                  <h4>Electronics</h4>
                  <ul>
                    <li><a href="#catalog" class="mega-cat-link" data-cat="electronics">All Electronics</a></li>
                    <li><a href="#product-e1">Smartwatches</a></li>
                    <li><a href="#product-e2">Wireless Earbuds</a></li>
                    <li><a href="#product-e5">ANC Headphones</a></li>
                  </ul>
                </div>
                <div class="mega-menu-col">
                  <h4>Fashion</h4>
                  <ul>
                    <li><a href="#catalog" class="mega-cat-link" data-cat="fashion">All Fashion</a></li>
                    <li><a href="#product-f1">Leather Jackets</a></li>
                    <li><a href="#product-f2">Horizon Watches</a></li>
                    <li><a href="#product-f6">Running Shoes</a></li>
                  </ul>
                </div>
                <div class="mega-menu-col">
                  <h4>Home & Fitness</h4>
                  <ul>
                    <li><a href="#catalog" class="mega-cat-link" data-cat="home">Home Decor</a></li>
                    <li><a href="#catalog" class="mega-cat-link" data-cat="fitness">Fitness Gear</a></li>
                    <li><a href="#product-h3">Soy Candles</a></li>
                    <li><a href="#product-fi1">Yoga Mats</a></li>
                  </ul>
                </div>
                <div class="mega-menu-col">
                  <div class="mega-menu-promo">
                    <span class="badge badge-accent" style="margin-bottom: var(--spacing-sm); align-self: flex-start;">Trending now</span>
                    <h4 style="margin-bottom: var(--spacing-xxs);">Summer AeroSync Vibe</h4>
                    <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: var(--spacing-md);">Elevate your lifestyle with our active wearables.</p>
                    <a href="#product-e1" class="btn btn-primary" style="padding: 8px 14px; font-size: 0.8rem; align-self: flex-start;">Shop the watch</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="nav-link ${activePage === 'profile' ? 'active' : ''}" href="#profile">My Orders</a>
        `}
      </nav>

      <!-- Right actions (Search, Dark/Light, Cart, Admin toggle) -->
      <div class="nav-actions">
        ${!isAdmin ? `
          <!-- Search Bar -->
          <div class="search-container nav-search">
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search products..." id="nav-search-input" value="${store.state.searchQuery || ''}" autocomplete="off">
            <div class="autocomplete-dropdown" id="search-autocomplete-box" style="display: none;"></div>
          </div>
        ` : ''}

        <!-- Theme Toggle -->
        <button class="btn-icon theme-toggle-btn" id="theme-toggle-btn" title="Toggle Theme">
          <i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>
        </button>

        <!-- Profile Toggle (Admin vs User) -->
        <button class="btn btn-secondary admin-mode-toggle-btn" id="admin-mode-toggle" title="${isAdmin ? 'Switch to Customer View' : 'Open Admin Dashboard'}" style="border-color: var(--accent-light);">
          <i data-lucide="${isAdmin ? 'store' : 'layout-dashboard'}"></i>
          <span class="admin-toggle-label">${isAdmin ? 'Storefront' : 'Dashboard'}</span>
        </button>

        ${!isAdmin ? `
          <!-- Cart Drawer Button -->
          <button class="btn btn-primary nav-cart-btn" id="open-cart-btn">
            <i data-lucide="shopping-cart"></i>
            <span class="cart-count">${cartCount}</span>
          </button>
        ` : ''}
        
        <!-- Mobile Hamburger Menu Button -->
        <button class="btn-icon mobile-menu-btn" id="mobile-menu-btn">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </div>
  `;

  // --- Attach Event Listeners ---
  lucide.createIcons();

  // Logo Link
  document.getElementById('nav-logo-link').onclick = (e) => {
    e.preventDefault();
    store.setPage(isAdmin ? 'dashboard' : 'home');
  };

  // Mega Menu Links Click
  container.querySelectorAll('.mega-cat-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      // We can trigger catalog filter or page routing
      const catalogFilters = {
        categories: [cat],
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'featured',
        searchQuery: ''
      };
      // Save filters globally if needed or dispatch event
      window.location.hash = 'catalog';
      // Use standard delay or state update so page rendering catches it
      store.state.activePage = 'catalog';
      const event = new CustomEvent('catalog-search', { detail: '' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mega-menu-filter', { detail: cat }));
      }, 50);
    };
  });

  // Exit Admin link
  const exitAdmin = document.getElementById('exit-admin-link');
  if (exitAdmin) {
    exitAdmin.onclick = (e) => {
      e.preventDefault();
      store.setAdminMode(false);
    };
  }

  // Theme Toggle click
  document.getElementById('theme-toggle-btn').onclick = () => {
    store.toggleTheme();
  };

  // Admin Toggle click
  document.getElementById('admin-mode-toggle').onclick = () => {
    store.setAdminMode(!store.state.isAdmin);
    showToast(
      store.state.isAdmin ? 'Admin Dashboard' : 'Storefront Mode',
      store.state.isAdmin ? 'Switched to administration workspace.' : 'Switched to customer shopping workspace.',
      'info'
    );
  };

  // Search input interaction (Autocomplete & Submit)
  const searchInput = document.getElementById('nav-search-input');
  const autocompleteBox = document.getElementById('search-autocomplete-box');

  if (searchInput && autocompleteBox) {
    // Hide dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        autocompleteBox.style.display = 'none';
      }
    });

    searchInput.oninput = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 1) {
        autocompleteBox.style.display = 'none';
        return;
      }

      const matches = store.state.products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length === 0) {
        autocompleteBox.innerHTML = `
          <div style="padding: 10px 16px; font-size: 0.8rem; color: var(--text-tertiary); text-align: center;">
            No suggestions found
          </div>
        `;
      } else {
        autocompleteBox.innerHTML = matches.map(p => `
          <div class="autocomplete-item" data-id="${p.id}">
            <div class="autocomplete-item-img">
              <img src="${p.image}" alt="">
            </div>
            <div class="autocomplete-item-name">${p.name}</div>
            <div class="autocomplete-item-price">$${p.price.toFixed(2)}</div>
          </div>
        `).join('');

        // Attach click listeners to suggestions
        autocompleteBox.querySelectorAll('.autocomplete-item').forEach(item => {
          item.onclick = () => {
            const pId = item.dataset.id;
            searchInput.value = '';
            autocompleteBox.style.display = 'none';
            store.setPage(`product-${pId}`);
          };
        });
      }
      autocompleteBox.style.display = 'flex';
    };

    searchInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        store.state.searchQuery = query;
        autocompleteBox.style.display = 'none';
        if (store.state.activePage !== 'catalog') {
          store.setPage('catalog');
        } else {
          const event = new CustomEvent('catalog-search', { detail: query });
          window.dispatchEvent(event);
        }
      }
    };
  }

  // Open Cart Drawer click
  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) {
    openCartBtn.onclick = () => {
      toggleCartDrawer(true);
    };
  }
}

// --- Cart Drawer Render ---
export function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  if (open) {
    drawer.classList.add('open');
    renderCartDrawerContent();
  } else {
    drawer.classList.remove('open');
  }
}

export function renderCartDrawerContent() {
  const container = document.getElementById('cart-items-container');
  const footerContainer = document.getElementById('cart-footer-container');
  if (!container || !footerContainer) return;

  const cart = store.state.cart;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px;"></i>
        <h3>Your cart is empty</h3>
        <p>Explore our premium collections and add some items to get started!</p>
        <button class="btn btn-primary" id="drawer-explore-btn">Start Shopping</button>
      </div>
    `;
    footerContainer.innerHTML = '';
    lucide.createIcons();

    const exploreBtn = document.getElementById('drawer-explore-btn');
    if (exploreBtn) {
      exploreBtn.onclick = () => {
        toggleCartDrawer(false);
        store.setPage('catalog');
      };
    }
    return;
  }

  // Render items
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-options">
          Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${item.color}; border:1px solid rgba(255,255,255,0.2);"></span> | Size: ${item.size}
        </div>
        <div class="cart-item-footer">
          <div class="quantity-selector" style="transform: scale(0.85); transform-origin: left center;">
            <button class="quantity-btn dec-qty" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">
              <i data-lucide="minus" style="width: 14px; height: 14px;"></i>
            </button>
            <div class="quantity-value">${item.quantity}</div>
            <button class="quantity-btn inc-qty" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">
              <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
      <button class="btn-icon remove-cart-item" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" style="width:28px; height:28px; color:var(--danger);">
        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
      </button>
    </div>
  `).join('');

  // Render summary & checkout button
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  footerContainer.innerHTML = `
    <div class="cart-summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="cart-summary-row" style="font-size: 0.8rem; color: var(--text-tertiary);">
      <span>Shipping & taxes calculated at checkout</span>
    </div>
    <button class="btn btn-primary" id="checkout-nav-btn" style="width: 100%; margin-top: 16px;">
      Proceed to Checkout
    </button>
  `;

  lucide.createIcons();

  // --- Attach Event Listeners ---
  // Decrease Quantity
  container.querySelectorAll('.dec-qty').forEach(btn => {
    btn.onclick = () => {
      const { id, color, size } = btn.dataset;
      const item = cart.find(i => i.id === id && i.color === color && i.size === size);
      if (item) {
        store.updateCartQuantity(id, color, size, item.quantity - 1);
        renderCartDrawerContent();
      }
    };
  });

  // Increase Quantity
  container.querySelectorAll('.inc-qty').forEach(btn => {
    btn.onclick = () => {
      const { id, color, size } = btn.dataset;
      const item = cart.find(i => i.id === id && i.color === color && i.size === size);
      if (item) {
        store.updateCartQuantity(id, color, size, item.quantity + 1);
        renderCartDrawerContent();
      }
    };
  });

  // Remove Item
  container.querySelectorAll('.remove-cart-item').forEach(btn => {
    btn.onclick = () => {
      const { id, color, size } = btn.dataset;
      store.removeFromCart(id, color, size);
      renderCartDrawerContent();
      showToast('Removed Item', 'Product has been removed from your cart.', 'info');
    };
  });

  // Proceed to checkout
  document.getElementById('checkout-nav-btn').onclick = () => {
    toggleCartDrawer(false);
    store.setPage('checkout');
  };
}

// --- Footer Render ---
export function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="#home" class="nav-logo" style="margin-bottom: 20px;">
            <i data-lucide="shopping-bag"></i>
            <span>Larkspur</span>
          </a>
          <p>Experiencing retail therapy in its finest, most premium aesthetic. High performance electronics, designer fashion, sleek home decor, and cutting-edge fitness gear.</p>
          <div style="display:flex; gap:16px;">
            <button class="btn-icon"><i data-lucide="instagram"></i></button>
            <button class="btn-icon"><i data-lucide="twitter"></i></button>
            <button class="btn-icon"><i data-lucide="facebook"></i></button>
          </div>
        </div>
        <div class="footer-col">
          <h4>Catalog</h4>
          <ul>
            <li><a href="#catalog" onclick="store.state.activeCategory = 'electronics'; store.setPage('catalog');">Electronics</a></li>
            <li><a href="#catalog" onclick="store.state.activeCategory = 'fashion'; store.setPage('catalog');">Fashion</a></li>
            <li><a href="#catalog" onclick="store.state.activeCategory = 'home'; store.setPage('catalog');">Home Decor</a></li>
            <li><a href="#catalog" onclick="store.state.activeCategory = 'fitness'; store.setPage('catalog');">Fitness</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Store Locator</a></li>
            <li><a href="#">Corporate Sales</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Larkspur Inc. All rights reserved.</p>
        <p>Premium experience guaranteed.</p>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// --- Product Card Render Helper ---
export function renderProductCard(product) {
  const reviewsList = product.reviewsList || [];
  const avgRating = reviewsList.length > 0
    ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length)
    : 5.0;

  return `
    <div class="glass-card product-card slide-up" data-id="${product.id}">
      <div class="product-image-container">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <button class="product-like-btn" title="Add to Wishlist" onclick="event.stopPropagation(); this.classList.toggle('active')">
          <i data-lucide="heart" style="width: 18px; height: 18px;"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <a class="product-title" href="#product-${product.id}">${product.name}</a>
        <div class="product-rating">
          <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--warning);"></i>
          <strong>${avgRating.toFixed(1)}</strong>
          <span>(${reviewsList.length} reviews)</span>
        </div>
        <div class="product-footer">
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <button class="btn btn-primary quick-add-btn" data-id="${product.id}" title="Add to Cart">
            <i data-lucide="shopping-cart" style="width: 15px; height: 15px;"></i>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- SVG Analytics line chart for Dashboard ---
export function renderSVGChart(orders) {
  // Aggregate sales by date for the last 7 days
  const salesByDate = {};
  for (let i = 6; i >= 0; i--) {
    const dateStr = new Date();
    dateStr.setDate(dateStr.getDate() - i);
    const label = dateStr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesByDate[label] = 0;
  }

  // Populate from orders
  orders.forEach(order => {
    if (order.status !== 'cancelled') {
      const label = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (salesByDate[label] !== undefined) {
        salesByDate[label] += order.total;
      }
    }
  });

  const labels = Object.keys(salesByDate);
  const data = Object.values(salesByDate);

  const maxVal = Math.max(...data, 100);
  const height = 200;
  const width = 600;
  const padding = 30;

  // Convert points to SVG coordinates
  const points = data.map((val, idx) => {
    const x = padding + (idx * (width - (padding * 2)) / (data.length - 1));
    const y = height - padding - (val * (height - (padding * 2)) / maxVal);
    return { x, y };
  });

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    linePath += ` L ${points[i].x} ${points[i].y}`;
  }

  let areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // Grid Lines
  const gridLines = [];
  const gridCount = 4;
  for (let i = 0; i <= gridCount; i++) {
    const yVal = padding + (i * (height - (padding * 2)) / gridCount);
    const amountVal = Math.round(maxVal - (i * maxVal / gridCount));
    gridLines.push(`
      <line x1="${padding}" y1="${yVal}" x2="${width - padding}" y2="${yVal}" stroke="var(--border-color)" stroke-dasharray="4" />
      <text x="${padding - 5}" y="${yVal + 4}" fill="var(--text-tertiary)" font-size="9" text-anchor="end">$${amountVal}</text>
    `);
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="svg-chart" style="width: 100%; height: 100%;">
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      
      <!-- Grid lines -->
      ${gridLines.join('')}

      <!-- Chart Area -->
      <path d="${areaPath}" fill="url(#chart-gradient)" />
      
      <!-- Chart Line -->
      <path d="${linePath}" fill="none" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      
      <!-- Dots & Values -->
      ${points.map((pt, idx) => `
        <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="var(--bg-secondary)" stroke="var(--accent-primary)" stroke-width="2" class="chart-dot" style="cursor: pointer;" />
        <text x="${pt.x}" y="${height - 10}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">${labels[idx]}</text>
      `).join('')}
    </svg>
  `;
}
