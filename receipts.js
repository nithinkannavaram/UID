/**
 * Ignite '26 - Receipt Logic
 * Handles displaying registration and food order data from localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Registration Receipt Logic ---
    const regNameEl = document.getElementById('r-name');
    if (regNameEl) {
        const registrationData = JSON.parse(localStorage.getItem('ignite_registration'));
        const receiptContent = document.getElementById('receipt-content');

        if (registrationData) {
            regNameEl.textContent = registrationData.name;
            const emailEl = document.getElementById('r-email');
            const campusEl = document.getElementById('r-campus');
            const phoneEl = document.getElementById('r-phone');
            const eventEl = document.getElementById('r-event');
            const dateEl = document.getElementById('r-date');
            const idEl = document.getElementById('r-id');
            const qrImg = document.getElementById('r-qr');

            if (emailEl) emailEl.textContent = registrationData.email;
            if (campusEl) campusEl.textContent = registrationData.campus;
            if (phoneEl) phoneEl.textContent = registrationData.phone;
            if (eventEl) eventEl.textContent = registrationData.event || 'All Events';
            
            if (dateEl) {
                dateEl.textContent = new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }

            // Generate a random ID
            const randomId = 'IGN-26-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            if (idEl) idEl.textContent = randomId;

            // Update QR Code with the random ID
            if (qrImg) {
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomId}`;
            }
        } else if (receiptContent) {
            // Redirect back if no data found
            receiptContent.innerHTML = `
              <div style="text-align:center; padding: 40px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff4d00; margin-bottom: 20px;"></i>
                <h3>No registration data found</h3>
                <p style="color: rgba(255,255,255,0.6); margin-bottom: 30px;">Please complete the registration form first.</p>
                <a href="register.html" class="btn-print" style="text-decoration:none; display:inline-flex;">Go to Register</a>
              </div>
            `;
        }
    }

    // --- Food Order Receipt Logic ---
    const foodTotalEl = document.getElementById('o-total');
    if (foodTotalEl) {
        const orderData = JSON.parse(localStorage.getItem('ignite_food_order'));
        const receiptContent = document.getElementById('receipt-content');

        if (orderData && orderData.items && orderData.items.length > 0) {
            const itemsContainer = document.getElementById('o-items');
            if (itemsContainer) {
                let html = '';
                orderData.items.forEach(item => {
                    html += `
                      <div class="item-row">
                        <span class="item-name">${item.emoji} ${item.name}</span>
                        <span class="item-price">₹${item.price}</span>
                      </div>
                    `;
                });
                itemsContainer.innerHTML = html;
            }
            foodTotalEl.textContent = `₹${orderData.total}`;

            const idEl = document.getElementById('o-id');
            const qrImg = document.getElementById('o-qr');
            const randomId = 'FOOD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            
            if (idEl) idEl.textContent = randomId;
            if (qrImg) {
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomId}`;
            }
        } else if (receiptContent) {
            receiptContent.innerHTML = `
              <div style="text-align:center; padding: 40px;">
                <i class="fas fa-utensils" style="font-size: 3rem; color: var(--accent-cyan); margin-bottom: 20px;"></i>
                <h3>Your order is empty</h3>
                <p style="color: var(--text-muted); margin-bottom: 30px;">Head back to the food stalls to grab some grub!</p>
                <a href="food-stalls.html" class="btn-print" style="text-decoration:none; display:inline-flex; background: var(--accent-cyan);">Visit Food Stalls</a>
              </div>
            `;
        }
    }
});
