// --- Product Data Array ---

const IMG_1 = "./images/banner1.png";
const IMG_2 = "./images/banner2.png";
const IMG_3 = "./images/banner3.png";

const products = [
    { id: 1, category: "Starters", name: "Truffle Infused Scallops", desc: "Hokkaido scallops with white truffle foam.", price: 55, img: "./images/product_1.png" },
    { id: 2, category: "Starters", name: "Beluga Caviar Blinis", desc: "Premium caviar served with buckwheat blinis.", price: 140, img: "./images/product_2.png" },
    { id: 3, category: "Starters", name: "Foie Gras Terrine", desc: "Served with fig compote and brioche toast.", price: 65, img: "./images/product_3.png" },
    { id: 4, category: "Starters", name: "Wagyu Beef Tartare", desc: "Hand-cut A5 Wagyu with quail egg.", price: 75, img: "./images/product_4.png" },
    { id: 5, category: "Starters", name: "Oysters Rockefeller", desc: "Baked with spinach, herbs, and Pernod.", price: 45, img: "./images/product_5.png" },
    
    { id: 6, category: "Mains", name: "Wagyu A5 Medallions", desc: "Miyazaki wagyu with smoked garlic jus.", price: 120, img: "./images/product_6.png" },
    { id: 7, category: "Mains", name: "Lobster Thermidor", desc: "Whole lobster in rich brandy and mustard sauce.", price: 95, img: "./images/product_7.png" },
    { id: 8, category: "Mains", name: "Duck à l'Orange", desc: "Slow-roasted duck breast with citrus glaze.", price: 70, img: "./images/product_8.png" },
    { id: 9, category: "Mains", name: "Chilean Sea Bass", desc: "Pan-seared, served with saffron risotto.", price: 85, img: "./images/product_9.png" },
    { id: 10, category: "Mains", name: "Herb-Crusted Rack of Lamb", desc: "With mint gremolata and root vegetables.", price: 90, img: "./images/product_10.png" },

    { id: 11, category: "Desserts", name: "24k Gold Chocolate Dome", desc: "Valrhona chocolate with edible gold leaf.", price: 40, img: "./images/product_11.png" },
    { id: 12, category: "Desserts", name: "Saffron Panna Cotta", desc: "Silky panna cotta infused with deep saffron.", price: 30, img: "./images/product_12.png" },
    { id: 13, category: "Desserts", name: "Pistachio Rose Water Baklava", desc: "Deconstructed elite Turkish dessert style.", price: 28, img: "./images/product_13.png" },
    { id: 14, category: "Desserts", name: "Vanilla Bean Crème Brûlée", desc: "Madagascar vanilla with caramelized crust.", price: 25, img: "./images/product_14.png" },
    { id: 15, category: "Desserts", name: "Matcha Tiramisu", desc: "Kyoto matcha layered with mascarpone.", price: 32, img: "./images/product_15.png" },

    { id: 16, category: "Drinks", name: "Dom Pérignon Vintage", desc: "Glass of exceptional vintage champagne.", price: 90, img: "./images/product_16.png" },
    { id: 17, category: "Drinks", name: "Elite Signature Cocktail", desc: "Gin, elderflower, and cucumber sphere.", price: 35, img: "./images/product_17.png" },
    { id: 18, category: "Drinks", name: "Aged Single Malt Scotch", desc: "25-year aged selection served neat.", price: 150, img: "./images/product_18.png" },
    { id: 19, category: "Drinks", name: "Fresh Dragonfruit Mojito", desc: "Refreshing mocktail with crushed mint.", price: 22, img: "./images/product_19.png" },
    { id: 20, category: "Drinks", name: "Hand-squeezed Truffle Lemonade", desc: "Our famous, uniquely refreshing sweet drink.", price: 28, img: "./images/product_20.png" }
];

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];
let currentCategory = "All";
let cart = [];

// --- Init Logic ---
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    renderCategoryFilters();
    renderMenu();
    updateCartUI();
});

// App Navigation Switcher
function switchTab(screenName) {
    document.querySelectorAll('.screen:not(.overlay-screen)').forEach(screen => {
        screen.classList.remove('active');
    });
    // always close product detail when switching tabs
    closeProduct(); 
    
    document.getElementById(`${screenName}-screen`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    document.getElementById(`nav-${screenName}`).classList.add('active');

    document.getElementById('app-content').scrollTo(0,0);
}

// Carousel Dot Synchronization
function initCarousel() {
    const carousel = document.getElementById('home-carousel');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if(carousel && dots.length > 0) {
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const width = carousel.offsetWidth;
            const index = Math.round(scrollLeft / width);
            
            dots.forEach((dot, i) => {
                if(i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        });
    }
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
        <div class="menu-item" onclick="openProduct(${p.id})">
            <img src="${p.img}" alt="${p.name}">
            <div class="menu-item-info">
                <div>
                    <h3>${p.name}</h3>
                    <p class="desc-truncate">${p.desc}</p>
                </div>
                <div class="menu-item-bottom">
                    <span class="menu-price">$${p.price}</span>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id}, 1)">+</button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Product Detail Landing Page Logic ---
let currentDetailQty = 1;

function openProduct(id) {
    const product = products.find(p => p.id === id);
    if(!product) return;
    
    currentDetailQty = 1;

    const detailScreen = document.getElementById('product-detail-screen');
    detailScreen.innerHTML = `
        <div class="detail-img-wrapper">
            <div class="back-btn-overlay" onclick="closeProduct()">
                <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <img src="${product.img}" class="detail-img" alt="${product.name}">
        </div>
        <div class="detail-content">
            <div class="detail-header">
                <h2 class="detail-title">${product.name}</h2>
                <span class="detail-price">$${product.price}</span>
            </div>
            <p class="detail-desc">${product.desc} Every bite is carefully prepared using the highest grade ingredients, plated precisely for a world-class dining experience only at Zaibi Elite Foods.</p>
            
            <div class="detail-action">
                <div class="qty-selector">
                    <button onclick="updateDetailQty(-1)">-</button>
                    <span id="detail-qty-display">1</span>
                    <button onclick="updateDetailQty(1)">+</button>
                </div>
                <button class="cta-btn add-big-btn" onclick="addToCartFromDetail(${product.id})">
                    <ion-icon name="cart"></ion-icon> ADD TO CART
                </button>
            </div>
        </div>
    `;
    
    detailScreen.classList.add('active');
}

function closeProduct() {
    document.getElementById('product-detail-screen').classList.remove('active');
}

function updateDetailQty(delta) {
    currentDetailQty += delta;
    if(currentDetailQty < 1) currentDetailQty = 1;
    document.getElementById('detail-qty-display').innerText = currentDetailQty;
}

function addToCartFromDetail(productId) {
    addToCart(productId, currentDetailQty);
    closeProduct();
}

// Cart Functionality
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ product, quantity: qty });
    }
    
    const headerIcon = document.querySelector('.cart-icon-header');
    headerIcon.style.transform = 'scale(1.3)';
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

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (totalItems > 0) {
        cartBadgeNav.classList.remove('hidden');
        cartBadgeHeader.classList.remove('hidden');
        cartBadgeNav.innerText = totalItems;
        cartBadgeHeader.innerText = totalItems;
    } else {
        cartBadgeNav.classList.add('hidden');
        cartBadgeHeader.classList.add('hidden');
    }

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
