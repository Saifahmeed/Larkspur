/* ==========================================
   Larkspur - App Initialization & Router
   ========================================== */
import { store } from './store.js';
import { renderNavbar, renderFooter, renderCartDrawerContent, toggleCartDrawer } from './components.js';
import { renderPage } from './pages.js';

// --- Initialization Function ---
function initApp() {
  // 1. Initial Render of layout shells
  renderNavbar();
  renderFooter();
  renderPage(store.state.activePage);

  // 2. Hash-based Router
  window.onhashchange = () => {
    const hash = window.location.hash.substring(1) || 'home';
    store.state.activePage = hash;
    renderNavbar();
    renderPage(hash);
  };

  // 3. React to Store updates (re-renders layout and view immediately)
  window.addEventListener('store-changed', (e) => {
    const state = e.detail;
    
    // Update Navbar elements (cart counts, theme class)
    renderNavbar();
    
    // Rerender active page if it is not dynamically being typed into
    // We avoid aggressive rerendering on product editing forms or checkout inputs to preserve cursor focus
    const skipPageRerender = ['checkout', 'dashboard'].includes(state.activePage) && document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    
    if (!skipPageRerender) {
      renderPage(state.activePage);
    }
  });

  // 4. Global Event Bindings (Cart Drawer, Modals)
  // Cart Close Button click
  const closeCartBtn = document.getElementById('close-cart-btn');
  if (closeCartBtn) {
    closeCartBtn.onclick = () => toggleCartDrawer(false);
  }

  // Cart Drawer Overlay click
  const cartOverlayBtn = document.getElementById('drawer-overlay-btn');
  if (cartOverlayBtn) {
    cartOverlayBtn.onclick = () => toggleCartDrawer(false);
  }

  // Escape Key to close overlay elements
  window.onkeydown = (e) => {
    if (e.key === 'Escape') {
      toggleCartDrawer(false);
      
      const modal = document.getElementById('modal-container');
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    }
  };

  console.log('Larkspur premium client-side E-commerce platform initialized successfully.');
}

// Kickstart application
window.onload = initApp;
export { initApp };
