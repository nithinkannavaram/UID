/**
 * Ignite '26 - Food Stalls Logic
 * Handles cart, modals, and checkout for the food section
 */

let cart = [];

/**
 * Opens a modal by its ID
 * @param {string} modalId 
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes a modal by its ID
 * @param {string} modalId 
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Handles clicks outside the modal content to close it
 * @param {Event} event 
 * @param {string} modalId 
 */
function handleOutsideClick(event, modalId) {
    if (event.target.id === modalId) closeModal(modalId);
}

/**
 * Adds an item to the shopping cart
 * @param {string} name 
 * @param {number} price 
 * @param {string} emoji 
 */
function addToCart(name, price, emoji) {
    cart.push({ name, price, emoji });
    updateCartUI();
    
    // Show toast notification
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = `${emoji} ${name} added!`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

/**
 * Removes an item from the cart by its index
 * @param {number} index 
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/**
 * Updates the Cart UI (badge count, modal list, and total)
 */
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');

    if (cartCountEl) cartCountEl.innerText = cart.length;

    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:3rem 1rem;color:rgba(240,240,245,0.4);font-size:1rem;">Your stash is empty! Browse the stalls above. 🍽️</div>';
        totalEl.innerText = '₹0';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `
          <div style="display:flex;align-items:center;background:rgba(255,255,255,0.04);padding:1rem;border-radius:16px;margin-bottom:0.8rem;border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:2rem;margin-right:1rem;">${item.emoji}</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:1rem;color:#f0f0f5;">${item.name}</div>
              <div style="color:#34d399;font-weight:800;font-size:0.95rem;">₹${item.price}</div>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none;border:none;font-size:1.2rem;cursor:pointer;opacity:0.6;transition:opacity 0.2s;padding:8px;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">🗑️</button>
          </div>`;
    });

    container.innerHTML = html;
    totalEl.innerText = `₹${total}`;
}

/**
 * Handles the checkout process
 * @param {Event} e 
 */
function checkout(e) {
    if (cart.length === 0) {
        alert('Add something first! Browse the food stalls.');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Save order to localStorage
    const orderData = {
        items: cart,
        total: total,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('ignite_food_order', JSON.stringify(orderData));

    // Visual feedback
    const btn = e.target;
    const originalText = btn.innerText;
    btn.innerText = 'Processing Order... ⏳';
    btn.disabled = true;

    setTimeout(() => {
        // Redirect to food receipt page
        window.location.href = 'food-receipt.html';
        
        // Reset cart for next time
        cart = [];
        updateCartUI();
        closeModal('cart-modal');
        
        // Reset button state (in case user returns)
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}

// Global scope attachment for HTML onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.handleOutsideClick = handleOutsideClick;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
