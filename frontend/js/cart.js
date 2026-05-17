/**
 * FurniQ Cart JavaScript
 * Handles cart logic, fetching from localstorage or backend
 */

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    // In a real app, this would fetch from backend if user is logged in
    // For now, we simulate a cart with dummy data
    const cartItems = [
        { 
            id: '1', 
            name: 'Berlin 3 Seater Fabric Sofa (Indigo Blue)', 
            price: 25999, 
            quantity: 1, 
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' 
        },
        { 
            id: '7', 
            name: 'Nectar Coffee Table (Walnut Finish)', 
            price: 8500, 
            quantity: 1, 
            image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80' 
        }
    ];

    renderCartItems(cartItems);
    updateSummary(cartItems);
}

function renderCartItems(items) {
    const listContainer = document.getElementById('cart-items-list');
    
    if (items.length === 0) {
        listContainer.innerHTML = '<div style="padding: 40px; text-align: center;"><h3>Your cart is empty</h3><a href="index.html" style="color:var(--primary-color); display:inline-block; margin-top:15px;">Continue Shopping</a></div>';
        return;
    }

    listContainer.innerHTML = ''; // Clear loading

    items.forEach(item => {
        const price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price);
        
        const cartItemHTML = `
            <div class="cart-item" id="item-${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4 class="item-title">${item.name}</h4>
                    <div class="item-price">${price}</div>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                        <button class="remove-btn" onclick="removeItem('${item.id}')"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}

function updateSummary(items) {
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    document.getElementById('subtotal').textContent = formatter.format(subtotal);
    document.getElementById('tax').textContent = formatter.format(tax);
    document.getElementById('total-price').textContent = formatter.format(total);
}

// Stub functions for interactivity
window.updateQty = function(id, change) {
    alert('Quantity update logic will connect to backend for item: ' + id);
}

window.removeItem = function(id) {
    alert('Item removal logic will connect to backend for item: ' + id);
    // document.getElementById('item-' + id).remove(); // visual removal
}
