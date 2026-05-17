/**
 * FurniQ Main JavaScript
 * Handles DOM manipulation, carousel logic, and data fetching
 */

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust based on your backend config

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI Components
    initCarousel();
    
    // 2. Fetch and render products
    fetchBestSellers();
});

/**
 * Initialize the Hero Carousel (Simple implementation)
 */
function initCarousel() {
    // Basic placeholder functionality. 
    // In a full implementation, this would rotate through multiple slides.
    console.log("Carousel initialized.");
}

/**
 * Fetch products from the backend API
 */
async function fetchBestSellers() {
    const productGrid = document.getElementById('featured-products');
    
    try {
        // We will fetch from the existing Express backend
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const products = data.products || data; // Handle depending on exact backend response format
        
        renderProducts(products, productGrid);
        
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to dummy data for demonstration if backend is not running
        renderDummyProducts(productGrid);
    }
}

/**
 * Render product cards into the DOM
 */
function renderProducts(products, container) {
    if (!products || products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading spinner

    // Take only first 8 products for best sellers
    const displayProducts = products.slice(0, 8);

    displayProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

/**
 * Create a single product card DOM element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Fallback image handling
    let imageUrl = 'https://via.placeholder.com/400x400?text=No+Image';
    if (product.images && product.images.length > 0) {
        imageUrl = product.images[0].url || product.images[0];
    } else if (product.image) {
        imageUrl = product.image;
    }

    // Format price
    const price = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(product.price);

    // Calculate original price (dummy logic: +20% for visual effect)
    const originalPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(product.price * 1.2);

    card.innerHTML = `
        <div class="product-image">
            <span class="discount-badge">20% OFF</span>
            <div class="wishlist-btn"><i class="far fa-heart"></i></div>
            <img src="${imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'">
        </div>
        <div class="product-info">
            <div class="product-brand">${product.category || 'Furniture'}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${price}</span>
                <span class="original-price">${originalPrice}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart('${product._id}')">
                Add to Cart
            </button>
        </div>
    `;

    return card;
}

/**
 * Fallback to render dummy data if backend is unreachable
 */
function renderDummyProducts(container) {
    const dummyProducts = [
        { _id: '1', name: 'Berlin 3 Seater Fabric Sofa (Indigo Blue)', price: 25999, category: 'Sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
        { _id: '2', name: 'Walken Bed With Storage (King Size, Honey Finish)', price: 34500, category: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80' },
        { _id: '3', name: 'Adolph 6 Seater Dining Set (Walnut Finish)', price: 42000, category: 'Dining', image: 'https://images.unsplash.com/photo-1617806118233-18e1c0945594?w=500&q=80' },
        { _id: '4', name: 'Cambrey Executive Desk (Teak Finish)', price: 18500, category: 'Study', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80' },
        { _id: '5', name: 'Marriott Lounge Chair (Teal)', price: 12999, category: 'Chairs', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80' },
        { _id: '6', name: 'Boho 3 Door Wardrobe (Honey Finish)', price: 29999, category: 'Storage', image: 'https://images.unsplash.com/photo-1595514535319-74d7547432ea?w=500&q=80' },
        { _id: '7', name: 'Nectar Coffee Table (Walnut Finish)', price: 8500, category: 'Tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80' },
        { _id: '8', name: 'Snuggle Tufted Bed (Queen Size, Irish Cream)', price: 28000, category: 'Beds', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&q=80' }
    ];
    
    renderProducts(dummyProducts, container);
}

/**
 * Handle Add to Cart action
 */
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    // TODO: Implement cart logic (save to localStorage / send to backend)
    alert('Product added to cart successfully!');
}
