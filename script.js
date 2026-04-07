// --- Product Data Array (20 items) ---

const IMAGE_HERO = "file:///C:/Users/computers/.gemini/antigravity/brain/4ae336f9-d7ae-41ac-9848-cda60dc170a5/hero_dish_light_1775587649022.png";
const IMAGE_PLATTER = "file:///C:/Users/computers/.gemini/antigravity/brain/4ae336f9-d7ae-41ac-9848-cda60dc170a5/signature_platter_1775588076825.png";

const products = [
    { id: 1, category: "Starters", name: "Truffle Infused Scallops", desc: "Hokkaido scallops with white truffle foam.", price: 55, img: IMAGE_HERO },
    { id: 2, category: "Starters", name: "Beluga Caviar Blinis", desc: "Premium caviar served with buckwheat blinis.", price: 140, img: IMAGE_PLATTER },
    { id: 3, category: "Starters", name: "Foie Gras Terrine", desc: "Served with fig compote and brioche toast.", price: 65, img: IMAGE_HERO },
    { id: 4, category: "Starters", name: "Wagyu Beef Tartare", desc: "Hand-cut A5 Wagyu with quail egg.", price: 75, img: IMAGE_PLATTER },
    { id: 5, category: "Starters", name: "Oysters Rockefeller", desc: "Baked with spinach, herbs, and Pernod.", price: 45, img: IMAGE_HERO },
    
    { id: 6, category: "Mains", name: "Wagyu A5 Medallions", desc: "Miyazaki wagyu with smoked garlic jus.", price: 120, img: IMAGE_PLATTER },
    { id: 7, category: "Mains", name: "Lobster Thermidor", desc: "Whole lobster in rich brandy and mustard sauce.", price: 95, img: IMAGE_HERO },
    { id: 8, category: "Mains", name: "Duck à l'Orange", desc: "Slow-roasted duck breast with citrus glaze.", price: 70, img: IMAGE_PLATTER },
    { id: 9, category: "Mains", name: "Chilean Sea Bass", desc: "Pan-seared, served with saffron risotto.", price: 85, img: IMAGE_HERO },
    { id: 10, category: "Mains", name: "Herb-Crusted Rack of Lamb", desc: "With mint gremolata and root vegetables.", price: 90, img: IMAGE_PLATTER },

    { id: 11, category: "Desserts", name: "24k Gold Chocolate Dome", desc: "Valrhona chocolate with edible gold leaf.", price: 40, img: IMAGE_HERO },
    { id: 12, category: "Desserts", name: "Saffron Panna Cotta", desc: "Silky panna cotta infused with deep saffron.", price: 30, img: IMAGE_PLATTER },
    { id: 13, category: "Desserts", name: "Pistachio Rose Water Baklava", desc: "Deconstructed elite Turkish dessert style.", price: 28, img: IMAGE_HERO },
    { id: 14, category: "Desserts", name: "Vanilla Bean Crème Brûlée", desc: "Madagascar vanilla with caramelized crust.", price: 25, img: IMAGE_PLATTER },
    { id: 15, category: "Desserts", name: "Matcha Tiramisu", desc: "Kyoto matcha layered with mascarpone.", price: 32, img: IMAGE_HERO },

    { id: 16, category: "Drinks", name: "Dom Pérignon Vintage", desc: "Glass of exceptional vintage champagne.", price: 90, img: IMAGE_PLATTER },
    { id: 17, category: "Drinks", name: "Elite Signature Cocktail", desc: "Gin, elderflower, and cucumber sphere.", price: 35, img: IMAGE_HERO },
    { id: 18, category: "Drinks", name: "Aged Single Malt Scotch", desc: "25-year aged selection served neat.", price: 150, img: IMAGE_PLATTER },
    { id: 19, category: "Drinks", name: "Fresh Dragonfruit Mojito", desc: "Refreshing mocktail with crushed mint.", price: 22, img: IMAGE_HERO },
    { id: 20, category: "Drinks", name: "Hand-squeezed Truffle Lemonade", desc: "Our famous, uniquely refreshing sweet drink.", price: 28, img: IMAGE_PLATTER }
];

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];
let currentCategory = "All";

// --- Shopping Cart State ---
let cart = []; // Array of objects: { product, quantity }

// --- App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilters();
    renderMenu();
    updateCartUI();
});

// App Navigation Switcher
function switchTab(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Show selected screen
    document.getElementById(`${screenName}-screen`).classList.add('active');

    // Update bottom nav active state
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    document.getElementById(`nav-${screenName}`).classList.add('active');

    // Scroll to top
    document.getElementById('app-content').scrollTo(0,0);
}

// Menu Rendering Function
function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    container.innerHTML = categories.map(cat => `
        <div class="filter-chip ${cat === currentCategory ? 'active' : ''}" 
             onclick="setCategory('${cat}')">${cat}</div>
    `).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    renderCategoryFilters();
    renderMenu();
}

function renderMenu() {
    const container = document.getElementById('menu-list');
    const filteredProducts = currentCategory === "All" 
        ? products 
        : products.filter(p => p.category === currentCategory);

    container.innerHTML = filteredProducts.map(p => `
        <div class="menu-item">
            <img src="${p.img}" alt="${p.name}">
            <div class="menu-item-info">
                <div>
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
                <div class="menu-item-bottom">
                    <span class="menu-price">$${p.price}</span>
                    <button class="add-btn" onclick="addToCart(${p.id})">+</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    
    // Add brief animation to app header cart icon
    const headerIcon = document.querySelector('.cart-icon-header');
    headerIcon.style.transform = 'scale(1.2)';
    setTimeout(() => headerIcon.style.transform = 'scale(1)', 200);

    updateCartUI();
}

function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const cartSummary = document.getElementById('cart-summary');
    
    const cartBadgeNav = document.getElementById('nav-cart-badge');
    const cartBadgeHeader = document.getElementById('header-cart-count');

    // Calculate Totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Update Badges
    if (totalItems > 0) {
        cartBadgeNav.classList.remove('hidden');
        cartBadgeHeader.classList.remove('hidden');
        cartBadgeNav.innerText = totalItems;
        cartBadgeHeader.innerText = totalItems;
    } else {
        cartBadgeNav.classList.add('hidden');
        cartBadgeHeader.classList.add('hidden');
    }

    // Render Cart HTML
    if (cart.length === 0) {
        emptyMsg.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
    } else {
        emptyMsg.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.product.name}</h4>
                    <span class="price">$${item.product.price}</span>
                </div>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.product.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.product.id}, 1)">+</button>
                </div>
            </div>
        `).join('');

        document.getElementById('cart-subtotal').innerText = '$' + subtotal.toFixed(2);
        document.getElementById('cart-tax').innerText = '$' + tax.toFixed(2);
        document.getElementById('cart-total').innerText = '$' + total.toFixed(2);
    }
}

function checkout() {
    if(cart.length > 0) {
        alert("Thanks for your order at Zaibi Elite Foods! Your luxury meal is being prepared.");
        cart = [];
        switchTab('home');
        updateCartUI();
    }
}
