// Global state
let currentUser = null;
let currentRole = null;
let products = [];
let cart = [];
let orders = [];
let customers = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    checkAuth();
    initializeChatbot();
});

// Data persistence
function loadData() {
    products = JSON.parse(localStorage.getItem('products')) || [];
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    orders = JSON.parse(localStorage.getItem('orders')) || [];
    customers = JSON.parse(localStorage.getItem('customers')) || [];
}

function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('customers', JSON.stringify(customers));
}

// Authentication
function checkAuth() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showRoleSelection();
    } else {
        showAuth();
    }
}

function showAuth() {
    document.getElementById('authPage').style.display = 'block';
    document.getElementById('roleSelection').style.display = 'none';
    document.getElementById('navbar').style.display = 'none';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;
    const address = document.getElementById('regAddress').value;

    if (!name || !email || !password || !phone || !address) {
        alert('Please fill all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    const user = { name, email, password, phone, address };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    showLogin();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showRoleSelection();
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    currentUser = null;
    currentRole = null;
    localStorage.removeItem('currentUser');
    cart = [];
    saveData();
    showAuth();
}

// Role selection
function showRoleSelection() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('roleSelection').style.display = 'block';
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('userGreeting').textContent = `Hello, ${currentUser.name}`;
    hideAllPages();
}

function selectRole(role) {
    currentRole = role;
    document.getElementById('roleSelection').style.display = 'none';
    hideAllPages();

    if (role === 'buyer') {
        showBuyerPage();
    } else if (role === 'seller') {
        showSellerPage();
    } else if (role === 'renter') {
        showRenterPage();
    }
}

function hideAllPages() {
    document.getElementById('buyerPage').style.display = 'none';
    document.getElementById('sellerPage').style.display = 'none';
    document.getElementById('renterPage').style.display = 'none';
    document.getElementById('customerPage').style.display = 'none';
}

// Buyer Page
function showBuyerPage() {
    document.getElementById('buyerPage').style.display = 'block';
    displayProducts();
    updateCartCount();
}

function displayProducts(filter = null) {
    const grid = document.getElementById('productGrid');
    let filteredProducts = products.filter(p => !p.forRent);

    if (filter) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.description.toLowerCase().includes(filter.toLowerCase())
        );
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <div class="eco-rating">
                    <span>🌿 ${translate('ecoRating')}: ${'⭐'.repeat(product.ecoRating)}</span>
                </div>
                <div class="carbon-footprint">
                    🌍 ${translate('carbonFootprint')}: ${product.carbonFootprint} kg CO₂
                </div>
                <div class="seller-info">
                    Seller: ${product.sellerName}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">${translate('addToCart')}</button>
            </div>
        </div>
    `).join('');
}

function searchProducts() {
    const query = document.getElementById('searchInput').value;
    displayProducts(query);
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const grid = document.getElementById('productGrid');

    let filteredProducts = products.filter(p => !p.forRent);

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <div class="eco-rating">
                    <span>🌿 ${translate('ecoRating')}: ${'⭐'.repeat(product.ecoRating)}</span>
                </div>
                <div class="carbon-footprint">
                    🌍 ${translate('carbonFootprint')}: ${product.carbonFootprint} kg CO₂
                </div>
                <div class="seller-info">
                    Seller: ${product.sellerName}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">${translate('addToCart')}</button>
            </div>
        </div>
    `).join('');
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const detail = document.getElementById('productDetail');

    detail.innerHTML = `
        <div class="product-detail-content">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                <div class="barcode-container">
                    <h4>Product Barcode</h4>
                    <canvas id="productBarcode"></canvas>
                    <div class="barcode-id">ID: ${product.barcodeId || 'N/A'}</div>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">Scan this code to get complete product information</p>
                </div>
            </div>
            <div>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="product-price">₹${product.price}</div>
                
                <div class="product-specs">
                    <h4>🌿 Eco Information</h4>
                    <p><strong>Eco Rating:</strong> ${'⭐'.repeat(product.ecoRating)}</p>
                    <p><strong>Carbon Footprint:</strong> ${product.carbonFootprint} kg CO₂</p>
                    <p><em>By choosing this product, you're helping reduce environmental impact!</em></p>
                </div>
                
                <div class="product-specs">
                    <h4>📦 Product Details</h4>
                    <p><strong>Barcode ID:</strong> ${product.barcodeId || 'N/A'}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Manufacturer:</strong> ${product.manufacturer}</p>
                    <p><strong>Manufacturing Location:</strong> ${product.manufacturerLocation}</p>
                    <p><strong>Manufacture Date:</strong> ${product.manufactureDate}</p>
                    ${product.expiryDate ? `<p><strong>Expiry Date:</strong> ${product.expiryDate}</p>` : ''}
                </div>
                
                ${product.usageInstructions ? `
                <div class="product-specs">
                    <h4>📖 Usage Instructions</h4>
                    <p>${product.usageInstructions}</p>
                </div>
                ` : ''}
                
                ${product.recyclingInfo ? `
                <div class="product-specs">
                    <h4>♻️ Recycling Information</h4>
                    <p>${product.recyclingInfo}</p>
                </div>
                ` : ''}
                
                <div class="product-specs">
                    <h4>👤 Seller Information</h4>
                    <p><strong>Name:</strong> ${product.sellerName}</p>
                    <p><strong>Email:</strong> ${product.sellerEmail}</p>
                    <p><strong>Phone:</strong> ${product.sellerPhone}</p>
                </div>
                
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}'); closeProductModal();">${translate('addToCart')}</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';

    // Generate QR code with barcode ID
    setTimeout(() => {
        const canvas = document.getElementById('productBarcode');
        if (canvas) {
            const barcodeData = {
                barcodeId: product.barcodeId,
                productId: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                manufacturer: product.manufacturer,
                manufacturerLocation: product.manufacturerLocation,
                manufactureDate: product.manufactureDate,
                expiryDate: product.expiryDate,
                ecoRating: product.ecoRating,
                carbonFootprint: product.carbonFootprint,
                recyclingInfo: product.recyclingInfo,
                usageInstructions: product.usageInstructions,
                sellerName: product.sellerName,
                sellerEmail: product.sellerEmail,
                sellerPhone: product.sellerPhone
            };
            QRCode.toCanvas(canvas, JSON.stringify(barcodeData), { width: 200 });
        }
    }, 100);
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveData();
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function viewCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '0';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₹${item.price} x ${item.quantity}
                </div>
                <div>
                    <button onclick="updateCartQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateCartQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})">🗑️</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = total.toFixed(2);
    }

    modal.style.display = 'block';
}

function updateCartQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveData();
    viewCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveData();
    viewCart();
    updateCartCount();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    closeCart();
    document.getElementById('checkoutModal').style.display = 'block';
    document.getElementById('deliveryAddress').value = currentUser.address;

    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.getElementById('onlinePaymentDetails').style.display =
                e.target.value === 'online' ? 'block' : 'none';
        });
    });
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function placeOrder() {
    const address = document.getElementById('deliveryAddress').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (!address) {
        alert('Please enter delivery address');
        return;
    }

    // Calculate expected delivery date (7 days from order date)
    const orderDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    const order = {
        id: Date.now().toString(),
        user: currentUser.email,
        userName: currentUser.name,
        userPhone: currentUser.phone,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        address: address,
        paymentMethod: paymentMethod,
        
        // Detailed order tracking
        orderDate: orderDate.toISOString(),
        orderPlacedTime: orderDate.toISOString(),
        expectedDeliveryDate: expectedDeliveryDate.toISOString(),
        actualDeliveryDate: null,
        productReceivedDate: null,
        productReceivedConfirmed: false,
        
        // Status tracking
        date: orderDate.toISOString(),
        status: 'Confirmed',
        deliveryStatus: 'Order Placed',
        
        // Lifecycle tracking
        statusHistory: [
            {
                status: 'Order Placed',
                timestamp: orderDate.toISOString(),
                note: 'Order successfully placed'
            }
        ]
    };

    orders.push(order);
    
    // Add or update customer
    let customer = customers.find(c => c.email === currentUser.email);
    if (!customer) {
        customer = {
            id: Date.now().toString(),
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            address: currentUser.address,
            notes: 'Auto-added from order',
            addedBy: 'system',
            addedDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            totalOrders: 1,
            lastOrderDate: orderDate.toISOString()
        };
        customers.push(customer);
    } else {
        customer.totalOrders = (customer.totalOrders || 0) + 1;
        customer.lastOrderDate = orderDate.toISOString();
        customer.lastUpdated = new Date().toISOString();
    }

    // Send confirmation message
    const message = `Dear ${currentUser.name},\n\n✅ Your order #${order.id} has been confirmed!\n\n📦 Order Details:\nTotal: ₹${order.total}\nDelivery Address: ${address}\nPayment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}\n\n📅 Timeline:\nOrdered: ${orderDate.toLocaleDateString()} at ${orderDate.toLocaleTimeString()}\nExpected Delivery: ${expectedDeliveryDate.toLocaleDateString()}\n\nYou'll receive notifications when:\n✓ Order is processed\n✓ Product is shipped\n✓ Out for delivery\n✓ Delivered\n\nThank you for shopping with EcoMarket! 🌱`;

    alert(message);

    // Clear cart
    cart = [];
    saveData();
    updateCartCount();

    closeCheckout();
}

function requestFeedback(orderId) {
    const feedback = prompt('How was your shopping experience? Please rate us (1-5 stars) and leave a comment:');
    if (feedback) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.feedback = feedback;
            saveData();
            alert('Thank you for your feedback! 🌟');
        }
    }
}

// Seller Page
function showSellerPage() {
    document.getElementById('sellerPage').style.display = 'block';
    displaySellerProducts();

    // Handle rent checkbox
    document.getElementById('forRent').addEventListener('change', (e) => {
        document.getElementById('rentPrice').style.display = e.target.checked ? 'block' : 'none';
    });

    // Handle form submission
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addProduct();
    });
}

function generateUniqueBarcode() {
    // Generate a unique barcode ID (format: ECO-YYYYMMDD-XXXXX)
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    return `ECO-${dateStr}-${random}`;
}

function generateProductLifecycleData(product) {
    // Generate comprehensive lifecycle tracking data
    return {
        barcodeId: product.barcodeId,
        productId: product.id,
        
        // Basic Product Info
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        
        // Manufacturing Details (WHO, WHEN, WHERE)
        manufacturer: product.manufacturer,
        manufacturerLocation: product.manufacturerLocation,
        manufactureDate: product.manufactureDate,
        expiryDate: product.expiryDate,
        
        // HOW it's made
        manufacturingProcess: product.manufacturingProcess || 'Standard eco-friendly process',
        materialsUsed: product.materialsUsed || 'Sustainable materials',
        
        // Sustainability Info
        ecoRating: product.ecoRating,
        carbonFootprint: product.carbonFootprint,
        
        // HOW to use
        usageInstructions: product.usageInstructions,
        safetyWarnings: product.safetyWarnings || 'Follow usage instructions carefully',
        
        // HOW to recycle
        recyclingInfo: product.recyclingInfo,
        recyclingSteps: product.recyclingSteps || 'Check local recycling guidelines',
        disposalMethod: product.disposalMethod || 'Eco-friendly disposal',
        
        // Seller Info
        sellerName: product.sellerName,
        sellerEmail: product.sellerEmail,
        sellerPhone: product.sellerPhone,
        
        // Lifecycle tracking
        createdDate: product.createdDate || new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    };
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDesc').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const imageFile = document.getElementById('productImage').files[0];
    const ecoRating = parseInt(document.getElementById('ecoRating').value);
    const carbonFootprint = parseFloat(document.getElementById('carbonFootprint').value);
    const manufacturer = document.getElementById('manufacturer').value;
    const manufacturerLocation = document.getElementById('manufacturerLocation').value;
    const manufactureDate = document.getElementById('manufactureDate').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const usageInstructions = document.getElementById('usageInstructions').value;
    const recyclingInfo = document.getElementById('recyclingInfo').value;
    const forRent = document.getElementById('forRent').checked;
    const rentPrice = forRent ? parseFloat(document.getElementById('rentPrice').value) : 0;

    if (!imageFile) {
        alert('Please select a product image');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const barcodeId = generateUniqueBarcode();

        const product = {
            id: Date.now().toString(),
            barcodeId: barcodeId,
            name,
            description,
            price,
            category,
            image: e.target.result,
            ecoRating,
            carbonFootprint,
            manufacturer,
            manufacturerLocation,
            manufactureDate,
            expiryDate,
            usageInstructions,
            recyclingInfo,
            forRent,
            rentPrice,
            sellerName: currentUser.name,
            sellerEmail: currentUser.email,
            sellerPhone: currentUser.phone,
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        products.push(product);
        saveData();

        alert(`Product added successfully!\nUnique Barcode: ${barcodeId}\n\nThis barcode contains complete product lifecycle information including:\n✓ Manufacturing details (Who, When, Where)\n✓ Usage instructions (How to use)\n✓ Recycling information (How to recycle)\n✓ Sustainability metrics`);
        document.getElementById('productForm').reset();
        displaySellerProducts();
    };

    reader.readAsDataURL(imageFile);
}

function displaySellerProducts() {
    const list = document.getElementById('sellerProductList');
    const sellerProducts = products.filter(p => p.sellerEmail === currentUser.email);

    list.innerHTML = sellerProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <p>${product.description}</p>
                <p style="font-size: 0.9rem; color: #667eea; font-weight: bold;">
                    🏷️ Barcode: ${product.barcodeId || 'N/A'}
                </p>
                <button onclick="showProductDetail('${product.id}')" style="background: #667eea; margin-right: 0.5rem;">View Details</button>
                <button onclick="deleteProduct('${product.id}')" style="background: #e74c3c;">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveData();
        displaySellerProducts();
    }
}

// Renter Page
function showRenterPage() {
    document.getElementById('renterPage').style.display = 'block';
    displayRentProducts();
}

function displayRentProducts(filter = null) {
    const grid = document.getElementById('rentProductGrid');
    let rentProducts = products.filter(p => p.forRent);

    if (filter) {
        rentProducts = rentProducts.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.description.toLowerCase().includes(filter.toLowerCase())
        );
    }

    grid.innerHTML = rentProducts.map(product => `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.rentPrice}/day</div>
                <div class="eco-rating">
                    <span>🌿 ${translate('ecoRating')}: ${'⭐'.repeat(product.ecoRating)}</span>
                </div>
                <div class="seller-info">
                    Owner: ${product.sellerName}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); rentProduct('${product.id}')">${translate('rentNow')}</button>
            </div>
        </div>
    `).join('');
}

function searchRentProducts() {
    const query = document.getElementById('rentSearchInput').value;
    displayRentProducts(query);
}

function rentProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const days = prompt('How many days would you like to rent this product?');
    if (days && parseInt(days) > 0) {
        const total = product.rentPrice * parseInt(days);
        alert(`Rental confirmed!\n\nProduct: ${product.name}\nDays: ${days}\nTotal: ₹${total}\n\nOwner will contact you at ${currentUser.phone}`);
    }
}

// Voice Assistant
let recognition = null;

function toggleVoiceAssistant() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition is not supported in your browser');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            document.getElementById('voiceIndicator').style.display = 'block';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(transcript);
        };

        recognition.onend = () => {
            document.getElementById('voiceIndicator').style.display = 'none';
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            document.getElementById('voiceIndicator').style.display = 'none';
        };
    }

    recognition.start();
}

function handleVoiceCommand(command) {
    speak('Processing your command');

    if (command.includes('search') || command.includes('find')) {
        const searchTerm = command.replace('search', '').replace('find', '').trim();
        if (currentRole === 'buyer') {
            document.getElementById('searchInput').value = searchTerm;
            searchProducts();
            speak(`Searching for ${searchTerm}`);
        }
    } else if (command.includes('cart')) {
        viewCart();
        speak('Opening your cart');
    } else if (command.includes('buyer')) {
        selectRole('buyer');
        speak('Switching to buyer mode');
    } else if (command.includes('seller')) {
        selectRole('seller');
        speak('Switching to seller mode');
    } else if (command.includes('rent')) {
        selectRole('renter');
        speak('Switching to rental mode');
    } else {
        speak('Sorry, I did not understand that command');
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
}

// Chatbot
function initializeChatbot() {
    addBotMessage('Hello! I am your EcoMarket assistant. How can I help you today?');
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    addUserMessage(message);
    input.value = '';

    // Simple chatbot responses
    setTimeout(() => {
        const response = getChatbotResponse(message.toLowerCase());
        addBotMessage(response);
    }, 500);
}

function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message user';
    messageEl.textContent = message;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addBotMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message bot';
    messageEl.textContent = message;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getChatbotResponse(message) {
    if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! How can I assist you with your shopping today?';
    } else if (message.includes('product') || message.includes('buy')) {
        return 'You can browse our eco-friendly products in the buyer section. We have various categories like plastic, wood, steel, electric, bamboo, and metals!';
    } else if (message.includes('rent')) {
        return 'We offer rental options for many products! Switch to the renter role to see available items for rent.';
    } else if (message.includes('sell')) {
        return 'Want to sell your products? Switch to the seller role and you can add your products with images, prices, and eco-ratings!';
    } else if (message.includes('eco') || message.includes('environment')) {
        return 'All our products have eco-ratings and carbon footprint information. We are committed to protecting the environment!';
    } else if (message.includes('payment')) {
        return 'We accept both Cash on Delivery and Online Payment methods for your convenience.';
    } else if (message.includes('help')) {
        return 'I can help you with: browsing products, renting items, selling products, eco-ratings, payment methods, and more. Just ask!';
    } else {
        return 'I am here to help! You can ask me about products, eco-ratings, payments, or how to use the platform.';
    }
}

// Barcode Scanner Functions
let cameraStream = null;

function openBarcodeScanner() {
    document.getElementById('scannerModal').style.display = 'block';
    document.getElementById('scanResult').innerHTML = '<p>Choose an option to scan the barcode</p>';
}

function closeScannerModal() {
    stopCamera();
    document.getElementById('scannerModal').style.display = 'none';
}

function startCamera() {
    const video = document.getElementById('cameraVideo');
    const container = document.getElementById('cameraContainer');

    container.style.display = 'block';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            document.getElementById('scanResult').innerHTML = '<p>Camera ready! Point at the QR code and click Capture</p>';
        })
        .catch(err => {
            console.error('Camera error:', err);
            alert('Unable to access camera. Please use the upload image option instead.');
            container.style.display = 'none';
        });
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    const video = document.getElementById('cameraVideo');
    video.srcObject = null;
    document.getElementById('cameraContainer').style.display = 'none';
}

function captureBarcode() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        processQRCode(canvas);
    });
}

function uploadBarcodeImage() {
    document.getElementById('barcodeImageInput').click();
}

function processBarcodeImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            processQRCode(canvas);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function processQRCode(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Use jsQR library if available, otherwise try manual decode
    if (typeof jsQR !== 'undefined') {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            handleScannedData(code.data);
        } else {
            document.getElementById('scanResult').innerHTML = '<p style="color: red;">No QR code detected. Please try again.</p>';
        }
    } else {
        // Fallback: Try to decode manually or show manual input
        showManualBarcodeInput();
    }
}

function showManualBarcodeInput() {
    document.getElementById('scanResult').innerHTML = `
        <div style="padding: 1rem;">
            <p>Enter the Barcode ID manually:</p>
            <input type="text" id="manualBarcodeInput" placeholder="ECO-YYYYMMDD-XXXXX" style="width: 100%; padding: 0.8rem; margin: 1rem 0; border: 1px solid #ddd; border-radius: 5px;">
            <button onclick="searchByBarcodeId()" style="padding: 0.8rem 2rem; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer;">Search Product</button>
        </div>
    `;
}

function searchByBarcodeId() {
    const barcodeId = document.getElementById('manualBarcodeInput').value.trim();
    if (!barcodeId) {
        alert('Please enter a barcode ID');
        return;
    }

    const product = products.find(p => p.barcodeId === barcodeId);
    if (product) {
        displayScannedProduct(product);
    } else {
        document.getElementById('scanResult').innerHTML = '<p style="color: red;">Product not found. Please check the barcode ID.</p>';
    }
}

function handleScannedData(data) {
    try {
        const productData = JSON.parse(data);

        // Check if it's a valid product barcode
        if (productData.barcodeId) {
            // Find product in database
            const product = products.find(p => p.barcodeId === productData.barcodeId);
            if (product) {
                displayScannedProduct(product);
            } else {
                // Product might be from scanned QR directly
                displayScannedProduct(productData);
            }
        } else {
            document.getElementById('scanResult').innerHTML = '<p style="color: red;">Invalid product barcode.</p>';
        }
    } catch (e) {
        document.getElementById('scanResult').innerHTML = '<p style="color: red;">Unable to read barcode data.</p>';
    }
}

function displayScannedProduct(product) {
    closeScannerModal();

    const modal = document.getElementById('scannedProductModal');
    const info = document.getElementById('scannedProductInfo');

    info.innerHTML = `
        <h2 style="text-align: center; color: #667eea; margin-bottom: 2rem;">
            📦 Complete Product Lifecycle Information
        </h2>
        
        <div class="barcode-display">
            <canvas id="scannedBarcode"></canvas>
            <div class="barcode-id">🏷️ ${product.barcodeId || 'N/A'}</div>
            <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">Scan this unique barcode to access all product information</p>
        </div>
        
        <div class="product-info-section">
            <h3>📋 Basic Information</h3>
            <div class="info-row">
                <span class="info-label">Product Name:</span>
                <span class="info-value">${product.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Description:</span>
                <span class="info-value">${product.description}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Category:</span>
                <span class="info-value">${product.category}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Price:</span>
                <span class="info-value">₹${product.price}</span>
            </div>
        </div>
        
        <div class="product-info-section highlight-section">
            <h3>🏭 WHO, WHEN & WHERE - Manufacturing Details</h3>
            <div class="info-row">
                <span class="info-label">👤 WHO (Manufacturer):</span>
                <span class="info-value">${product.manufacturer}</span>
            </div>
            <div class="info-row">
                <span class="info-label">📍 WHERE (Location):</span>
                <span class="info-value">${product.manufacturerLocation}</span>
            </div>
            <div class="info-row">
                <span class="info-label">📅 WHEN (Manufacture Date):</span>
                <span class="info-value">${new Date(product.manufactureDate).toLocaleDateString()}</span>
            </div>
            ${product.expiryDate ? `
            <div class="info-row">
                <span class="info-label">⏰ Expiry Date:</span>
                <span class="info-value">${new Date(product.expiryDate).toLocaleDateString()}</span>
            </div>
            ` : ''}
            <div class="info-row">
                <span class="info-label">🔧 HOW (Process):</span>
                <span class="info-value">${product.manufacturingProcess || 'Eco-friendly manufacturing process'}</span>
            </div>
        </div>
        
        <div class="product-info-section">
            <h3>🌿 Sustainability & Environmental Impact</h3>
            <div style="text-align: center; margin: 1rem 0;">
                <span class="eco-badge">🌟 Eco Rating: ${'⭐'.repeat(product.ecoRating)} (${product.ecoRating}/5)</span>
                <span class="carbon-badge">🌍 Carbon Footprint: ${product.carbonFootprint} kg CO₂</span>
            </div>
            <p style="text-align: center; color: #27ae60; font-weight: bold; margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-radius: 8px;">
                ✓ By choosing this product, you're helping reduce environmental impact!<br>
                ✓ This product saves approximately ${(5 - product.carbonFootprint).toFixed(1)} kg CO₂ compared to conventional alternatives
            </p>
        </div>
        
        ${product.usageInstructions ? `
        <div class="product-info-section highlight-section">
            <h3>📖 HOW TO USE - Usage Instructions</h3>
            <div class="usage-box">
                <p>${product.usageInstructions}</p>
                ${product.safetyWarnings ? `
                    <div class="warning-box">
                        <strong>⚠️ Safety Warnings:</strong>
                        <p>${product.safetyWarnings}</p>
                    </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
        
        ${product.recyclingInfo ? `
        <div class="product-info-section highlight-section">
            <h3>♻️ HOW TO RECYCLE - Recycling Information</h3>
            <div class="recycling-box">
                <p><strong>Recycling Process:</strong></p>
                <p>${product.recyclingInfo}</p>
                ${product.recyclingSteps ? `
                    <p style="margin-top: 1rem;"><strong>Steps:</strong></p>
                    <p>${product.recyclingSteps}</p>
                ` : ''}
                ${product.disposalMethod ? `
                    <p style="margin-top: 1rem;"><strong>Disposal Method:</strong></p>
                    <p>${product.disposalMethod}</p>
                ` : ''}
                <div class="recycling-tips">
                    <p><strong>💡 Recycling Tips:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                        <li>Clean the product before recycling</li>
                        <li>Separate different materials if applicable</li>
                        <li>Check local recycling guidelines</li>
                        <li>Consider returning to manufacturer for proper disposal</li>
                    </ul>
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="product-info-section">
            <h3>👤 Seller Contact Information</h3>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${product.sellerName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${product.sellerEmail}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${product.sellerPhone}</span>
            </div>
        </div>

        <div class="product-info-section">
            <h3>📊 Product Lifecycle Tracking</h3>
            <div class="info-row">
                <span class="info-label">Product Created:</span>
                <span class="info-value">${product.createdDate ? new Date(product.createdDate).toLocaleString() : 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Last Updated:</span>
                <span class="info-value">${product.lastUpdated ? new Date(product.lastUpdated).toLocaleString() : 'N/A'}</span>
            </div>
        </div>
        
        ${currentRole === 'buyer' ? `
        <button class="add-to-cart-btn" onclick="addToCart('${product.id}'); closeScannedProductModal();">
            ${translate('addToCart')}
        </button>
        ` : ''}
    `;

    modal.style.display = 'block';

    // Generate QR code
    setTimeout(() => {
        const canvas = document.getElementById('scannedBarcode');
        if (canvas) {
            const barcodeData = {
                barcodeId: product.barcodeId,
                productId: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                manufacturer: product.manufacturer,
                manufacturerLocation: product.manufacturerLocation,
                manufactureDate: product.manufactureDate,
                expiryDate: product.expiryDate,
                ecoRating: product.ecoRating,
                carbonFootprint: product.carbonFootprint,
                recyclingInfo: product.recyclingInfo,
                usageInstructions: product.usageInstructions,
                sellerName: product.sellerName,
                sellerEmail: product.sellerEmail,
                sellerPhone: product.sellerPhone
            };
            QRCode.toCanvas(canvas, JSON.stringify(barcodeData), { width: 200 });
        }
    }, 100);
}

function closeScannedProductModal() {
    document.getElementById('scannedProductModal').style.display = 'none';
}

// Customer Management Functions
function showCustomerPage() {
    hideAllPages();
    document.getElementById('customerPage').style.display = 'block';
    displayCustomers();
}

function addCustomer() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const notes = document.getElementById('customerNotes').value;

    if (!name || !email || !phone) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        return;
    }

    // Check if customer already exists
    if (customers.find(c => c.email === email)) {
        alert('Customer with this email already exists');
        return;
    }

    const customer = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        address,
        notes,
        addedBy: currentUser.email,
        addedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    };

    customers.push(customer);
    saveData();
    alert('Customer added successfully!');
    document.getElementById('customerForm').reset();
    displayCustomers();
}

function displayCustomers() {
    const list = document.getElementById('customerList');
    
    if (customers.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No customers added yet.</p>';
        return;
    }

    list.innerHTML = customers.map(customer => {
        // Get customer orders
        const customerOrders = orders.filter(o => o.user === customer.email);
        const totalOrders = customerOrders.length;
        const deliveredOrders = customerOrders.filter(o => o.deliveryStatus === 'Delivered').length;
        const pendingOrders = customerOrders.filter(o => o.deliveryStatus !== 'Delivered').length;
        
        return `
        <div class="customer-card">
            <div class="customer-header">
                <h3>👤 ${customer.name}</h3>
                <div class="customer-actions">
                    <button onclick="viewCustomerOrders('${customer.id}')" class="orders-btn">📦 Orders (${totalOrders})</button>
                    <button onclick="editCustomer('${customer.id}')" class="edit-btn">✏️ Edit</button>
                    <button onclick="deleteCustomer('${customer.id}')" class="delete-btn">🗑️ Delete</button>
                </div>
            </div>
            <div class="customer-details">
                <p><strong>📧 Email:</strong> ${customer.email}</p>
                <p><strong>📱 Phone:</strong> ${customer.phone}</p>
                <p><strong>📍 Address:</strong> ${customer.address || 'N/A'}</p>
                ${customer.notes ? `<p><strong>📝 Notes:</strong> ${customer.notes}</p>` : ''}
                ${totalOrders > 0 ? `
                <div class="order-summary">
                    <p><strong>📊 Order Summary:</strong></p>
                    <p>✅ Delivered: ${deliveredOrders} | ⏳ Pending: ${pendingOrders}</p>
                </div>
                ` : ''}
                <p style="font-size: 0.85rem; color: #666; margin-top: 1rem;">
                    <strong>Added:</strong> ${new Date(customer.addedDate).toLocaleDateString()} | 
                    <strong>Last Updated:</strong> ${new Date(customer.lastUpdated).toLocaleDateString()}
                </p>
            </div>
        </div>
    `;
    }).join('');
}

function searchCustomers() {
    const query = document.getElementById('customerSearch').value.toLowerCase();
    const list = document.getElementById('customerList');
    
    const filteredCustomers = customers.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
    );

    if (filteredCustomers.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No customers found.</p>';
        return;
    }

    list.innerHTML = filteredCustomers.map(customer => {
        const customerOrders = orders.filter(o => o.user === customer.email);
        const totalOrders = customerOrders.length;
        const deliveredOrders = customerOrders.filter(o => o.deliveryStatus === 'Delivered').length;
        const pendingOrders = customerOrders.filter(o => o.deliveryStatus !== 'Delivered').length;
        
        return `
        <div class="customer-card">
            <div class="customer-header">
                <h3>👤 ${customer.name}</h3>
                <div class="customer-actions">
                    <button onclick="viewCustomerOrders('${customer.id}')" class="orders-btn">📦 Orders (${totalOrders})</button>
                    <button onclick="editCustomer('${customer.id}')" class="edit-btn">✏️ Edit</button>
                    <button onclick="deleteCustomer('${customer.id}')" class="delete-btn">🗑️ Delete</button>
                </div>
            </div>
            <div class="customer-details">
                <p><strong>📧 Email:</strong> ${customer.email}</p>
                <p><strong>📱 Phone:</strong> ${customer.phone}</p>
                <p><strong>📍 Address:</strong> ${customer.address || 'N/A'}</p>
                ${customer.notes ? `<p><strong>📝 Notes:</strong> ${customer.notes}</p>` : ''}
                ${totalOrders > 0 ? `
                <div class="order-summary">
                    <p><strong>📊 Order Summary:</strong></p>
                    <p>✅ Delivered: ${deliveredOrders} | ⏳ Pending: ${pendingOrders}</p>
                </div>
                ` : ''}
                <p style="font-size: 0.85rem; color: #666; margin-top: 1rem;">
                    <strong>Added:</strong> ${new Date(customer.addedDate).toLocaleDateString()} | 
                    <strong>Last Updated:</strong> ${new Date(customer.lastUpdated).toLocaleDateString()}
                </p>
            </div>
        </div>
    `;
    }).join('');
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerPhone').value = customer.phone;
    document.getElementById('customerAddress').value = customer.address;
    document.getElementById('customerNotes').value = customer.notes;

    // Change button to update mode
    const form = document.getElementById('customerForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Customer';
    submitBtn.onclick = (e) => {
        e.preventDefault();
        updateCustomer(customerId);
    };

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

function updateCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    customer.name = document.getElementById('customerName').value;
    customer.email = document.getElementById('customerEmail').value;
    customer.phone = document.getElementById('customerPhone').value;
    customer.address = document.getElementById('customerAddress').value;
    customer.notes = document.getElementById('customerNotes').value;
    customer.lastUpdated = new Date().toISOString();

    saveData();
    alert('Customer updated successfully!');
    
    // Reset form
    document.getElementById('customerForm').reset();
    const submitBtn = document.getElementById('customerForm').querySelector('button[type="submit"]');
    submitBtn.textContent = 'Add Customer';
    submitBtn.onclick = (e) => {
        e.preventDefault();
        addCustomer();
    };
    
    displayCustomers();
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== customerId);
        saveData();
        displayCustomers();
        alert('Customer deleted successfully!');
    }
}

function viewCustomerOrders(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const customerOrders = orders.filter(o => o.user === customer.email);
    
    if (customerOrders.length === 0) {
        alert('No orders found for this customer');
        return;
    }

    const modal = document.getElementById('customerOrdersModal');
    const content = document.getElementById('customerOrdersContent');

    content.innerHTML = `
        <h2>📦 Orders for ${customer.name}</h2>
        <div class="orders-list">
            ${customerOrders.map(order => {
                const expectedDate = order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate) : null;
                const actualDate = order.actualDeliveryDate ? new Date(order.actualDeliveryDate) : null;
                const today = new Date();
                const isDelayed = expectedDate && !actualDate && today > expectedDate && order.deliveryStatus !== 'Delivered';
                
                return `
                <div class="order-card">
                    <div class="order-header">
                        <h3>Order #${order.id}</h3>
                        <span class="order-status ${order.deliveryStatus === 'Delivered' ? 'status-delivered' : 'status-pending'}">
                            ${order.deliveryStatus || 'Pending'}
                        </span>
                    </div>
                    <div class="order-details">
                        <div class="customer-info-box">
                            <h4>👤 Customer Details</h4>
                            <p><strong>Name:</strong> ${order.userName || customer.name}</p>
                            <p><strong>Email:</strong> ${order.user}</p>
                            <p><strong>Phone:</strong> ${order.userPhone || customer.phone}</p>
                            <p><strong>Address:</strong> ${order.address}</p>
                        </div>

                        <div class="order-summary-box">
                            <h4>📦 Order Summary</h4>
                            <p><strong>Total:</strong> ₹${order.total}</p>
                            <p><strong>Payment:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                        </div>
                        
                        <div class="timeline-section">
                            <h4>📅 Order Timeline</h4>
                            <div class="timeline">
                                <div class="timeline-item completed">
                                    <span class="timeline-icon">✓</span>
                                    <div class="timeline-content">
                                        <strong>Order Placed</strong>
                                        <p>${new Date(order.orderDate || order.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                ${order.statusHistory && order.statusHistory.length > 1 ? order.statusHistory.slice(1).map(history => `
                                    <div class="timeline-item completed">
                                        <span class="timeline-icon">✓</span>
                                        <div class="timeline-content">
                                            <strong>${history.status}</strong>
                                            <p>${new Date(history.timestamp).toLocaleString()}</p>
                                            ${history.note ? `<p class="timeline-note">${history.note}</p>` : ''}
                                        </div>
                                    </div>
                                `).join('') : ''}
                                ${actualDate ? `
                                    <div class="timeline-item completed">
                                        <span class="timeline-icon">✓</span>
                                        <div class="timeline-content">
                                            <strong>Delivered</strong>
                                            <p>${actualDate.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ` : ''}
                                ${order.productReceivedDate ? `
                                    <div class="timeline-item completed received">
                                        <span class="timeline-icon">🎉</span>
                                        <div class="timeline-content">
                                            <strong>Product Received by Customer</strong>
                                            <p>${new Date(order.productReceivedDate).toLocaleString()}</p>
                                            <p class="timeline-note">✅ Customer confirmed receipt</p>
                                        </div>
                                    </div>
                                ` : order.productReceivedPending ? `
                                    <div class="timeline-item pending">
                                        <span class="timeline-icon">⏳</span>
                                        <div class="timeline-content">
                                            <strong>Awaiting Customer Confirmation</strong>
                                            <button onclick="confirmProductReceived('${order.id}')" class="confirm-btn">Confirm Receipt</button>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="delivery-dates">
                            <div class="date-info ${isDelayed ? 'delayed' : ''}">
                                <p><strong>📅 Expected Delivery:</strong> ${expectedDate ? expectedDate.toLocaleDateString() : 'Not set'}</p>
                                ${isDelayed ? '<p class="delay-warning">⚠️ Delivery delayed!</p>' : ''}
                                <button onclick="updateExpectedDate('${order.id}')" class="date-btn">Change Date</button>
                            </div>
                        </div>
                        
                        <div class="order-items">
                            <strong>Items:</strong>
                            ${order.items.map(item => `
                                <p style="margin-left: 1rem;">• ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
                            `).join('')}
                        </div>

                        <div class="delivery-tracking">
                            <h4>📍 Delivery Status</h4>
                            <select onchange="updateDeliveryStatus('${order.id}', this.value)" class="status-select">
                                <option value="Order Placed" ${order.deliveryStatus === 'Order Placed' ? 'selected' : ''}>Order Placed</option>
                                <option value="Processing" ${order.deliveryStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Shipped" ${order.deliveryStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="Out for Delivery" ${order.deliveryStatus === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                                <option value="Delivered" ${order.deliveryStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            </select>
                        </div>

                        ${order.deliveryStatus === 'Delivered' ? `
                            <div class="review-section">
                                <h4>⭐ Customer Feedback</h4>
                                ${order.customerFeedback ? `
                                    <div class="feedback-display">
                                        <div class="feedback-ratings">
                                            <p><strong>Overall Rating:</strong> ${'⭐'.repeat(order.customerFeedback.overallRating)} (${order.customerFeedback.averageRating}/5.0)</p>
                                            ${order.customerFeedback.productQuality ? `<p><strong>Product Quality:</strong> ${'⭐'.repeat(order.customerFeedback.productQuality)}</p>` : ''}
                                            ${order.customerFeedback.deliveryExperience ? `<p><strong>Delivery:</strong> ${'⭐'.repeat(order.customerFeedback.deliveryExperience)}</p>` : ''}
                                            ${order.customerFeedback.valueForMoney ? `<p><strong>Value for Money:</strong> ${'⭐'.repeat(order.customerFeedback.valueForMoney)}</p>` : ''}
                                            <p><strong>Would Recommend:</strong> ${order.customerFeedback.recommend === 'yes' ? '👍 Yes' : order.customerFeedback.recommend === 'maybe' ? '🤔 Maybe' : '👎 No'}</p>
                                        </div>
                                        <div class="feedback-comments">
                                            <p><strong>Comments:</strong></p>
                                            <p class="comment-text">${order.customerFeedback.comments}</p>
                                        </div>
                                        <p style="font-size: 0.85rem; color: #666; margin-top: 1rem;">Submitted on: ${new Date(order.customerFeedback.submittedDate).toLocaleDateString()}</p>
                                    </div>
                                ` : `
                                    <div class="no-feedback">
                                        <p>Customer hasn't provided feedback yet.</p>
                                        <button onclick="showCustomerFeedbackForm('${order.id}')" class="review-btn">Request Feedback</button>
                                    </div>
                                `}
                            </div>
                        ` : ''}
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;

    modal.style.display = 'block';
}

function updateDeliveryStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const timestamp = new Date().toISOString();
    order.deliveryStatus = status;
    order.lastUpdated = timestamp;
    
    // Add to status history
    if (!order.statusHistory) {
        order.statusHistory = [];
    }
    order.statusHistory.push({
        status: status,
        timestamp: timestamp,
        note: `Status updated to ${status}`
    });
    
    // If delivered, set actual delivery date and prompt for product received confirmation
    if (status === 'Delivered' && !order.actualDeliveryDate) {
        order.actualDeliveryDate = timestamp;
        order.feedbackRequested = true;
        
        // Send notification to customer
        sendDeliveryNotification(order);
        
        // Prompt for product received confirmation
        setTimeout(() => {
            confirmProductReceived(orderId);
        }, 1500);
    }
    
    saveData();
    alert(`✅ Delivery status updated to: ${status}\n\nTimestamp: ${new Date(timestamp).toLocaleString()}`);
    
    // Refresh the view
    const customer = customers.find(c => c.email === order.user);
    if (customer) {
        viewCustomerOrders(customer.id);
    }
}

function confirmProductReceived(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.productReceivedConfirmed) return;

    const confirmed = confirm(`📦 Product Delivery Confirmation\n\nOrder #${order.id}\n\nHas the customer confirmed receiving the product?\n\nClick OK to confirm product received\nClick Cancel to mark as pending confirmation`);
    
    if (confirmed) {
        const receivedDate = new Date().toISOString();
        order.productReceivedDate = receivedDate;
        order.productReceivedConfirmed = true;
        
        if (!order.statusHistory) {
            order.statusHistory = [];
        }
        order.statusHistory.push({
            status: 'Product Received',
            timestamp: receivedDate,
            note: 'Customer confirmed product receipt'
        });
        
        saveData();
        
        alert(`✅ Product receipt confirmed!\n\nReceived on: ${new Date(receivedDate).toLocaleString()}\n\nCustomer details maintained:\n- Name: ${order.userName}\n- Email: ${order.user}\n- Phone: ${order.userPhone}\n- Address: ${order.address}\n\nOrder Timeline:\n✓ Ordered: ${new Date(order.orderDate).toLocaleDateString()}\n✓ Delivered: ${new Date(order.actualDeliveryDate).toLocaleDateString()}\n✓ Received: ${new Date(receivedDate).toLocaleDateString()}`);
        
        // Show feedback form after confirmation
        setTimeout(() => {
            showCustomerFeedbackForm(orderId);
        }, 1000);
    } else {
        order.productReceivedConfirmed = false;
        order.productReceivedPending = true;
        saveData();
        alert('Product receipt pending customer confirmation. You can update this later from the order details.');
    }
}

function sendDeliveryNotification(order) {
    const customer = customers.find(c => c.email === order.user);
    if (!customer) return;

    const message = `
🎉 Great News, ${customer.name}!

Your order #${order.id} has been delivered successfully!

📦 Order Details:
- Total: ₹${order.total}
- Delivered on: ${new Date(order.actualDeliveryDate).toLocaleDateString()}
- Address: ${order.address}

We hope you love your purchase! 

⭐ Your feedback matters to us!
Please take a moment to share your experience and help us serve you better.

Thank you for shopping with EcoMarket! 🌱
    `;

    alert(message);
}

function showCustomerFeedbackForm(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('customerFeedbackModal');
    const content = document.getElementById('customerFeedbackContent');

    content.innerHTML = `
        <div class="feedback-header">
            <h2>⭐ We'd Love Your Feedback!</h2>
            <p>Your order has been delivered. How was your experience?</p>
        </div>
        
        <div class="order-summary-box">
            <h3>Order #${order.id}</h3>
            <p><strong>Delivered on:</strong> ${new Date(order.actualDeliveryDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ₹${order.total}</p>
        </div>

        <form id="customerFeedbackForm" class="feedback-form">
            <div class="feedback-section">
                <h4>📦 Product Quality</h4>
                <div class="rating-stars">
                    ${generateStarRating('productQuality')}
                </div>
            </div>

            <div class="feedback-section">
                <h4>🚚 Delivery Experience</h4>
                <div class="rating-stars">
                    ${generateStarRating('deliveryExperience')}
                </div>
            </div>

            <div class="feedback-section">
                <h4>💰 Value for Money</h4>
                <div class="rating-stars">
                    ${generateStarRating('valueForMoney')}
                </div>
            </div>

            <div class="feedback-section">
                <h4>⭐ Overall Rating</h4>
                <div class="rating-stars">
                    ${generateStarRating('overallRating', true)}
                </div>
            </div>

            <div class="feedback-section">
                <h4>💬 Tell us more about your experience</h4>
                <textarea id="feedbackComments" rows="5" placeholder="Share your thoughts, suggestions, or any issues you faced..." required></textarea>
            </div>

            <div class="feedback-section">
                <h4>📸 Would you recommend us to others?</h4>
                <div class="recommendation-options">
                    <label class="radio-option">
                        <input type="radio" name="recommend" value="yes" required>
                        <span>👍 Yes, definitely!</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="recommend" value="maybe">
                        <span>🤔 Maybe</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="recommend" value="no">
                        <span>👎 No</span>
                    </label>
                </div>
            </div>

            <div class="feedback-actions">
                <button type="button" onclick="skipFeedback('${orderId}')" class="skip-btn">Skip for Now</button>
                <button type="submit" onclick="event.preventDefault(); submitCustomerFeedback('${orderId}');" class="submit-feedback-btn">Submit Feedback</button>
            </div>
        </form>
    `;

    modal.style.display = 'block';
}

function generateStarRating(name, required = false) {
    return `
        <div class="star-rating-input">
            ${[5, 4, 3, 2, 1].map(value => `
                <input type="radio" name="${name}" value="${value}" id="${name}_${value}" ${required ? 'required' : ''}>
                <label for="${name}_${value}" class="star-label" title="${value} stars">⭐</label>
            `).join('')}
        </div>
    `;
}

function submitCustomerFeedback(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Get all ratings
    const productQuality = document.querySelector('input[name="productQuality"]:checked');
    const deliveryExperience = document.querySelector('input[name="deliveryExperience"]:checked');
    const valueForMoney = document.querySelector('input[name="valueForMoney"]:checked');
    const overallRating = document.querySelector('input[name="overallRating"]:checked');
    const recommend = document.querySelector('input[name="recommend"]:checked');
    const comments = document.getElementById('feedbackComments').value;

    // Validate required fields
    if (!overallRating || !recommend || !comments.trim()) {
        alert('Please provide overall rating, recommendation, and comments');
        return;
    }

    // Calculate average rating
    const ratings = [productQuality, deliveryExperience, valueForMoney, overallRating]
        .filter(r => r)
        .map(r => parseInt(r.value));
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    // Save feedback
    order.customerFeedback = {
        productQuality: productQuality ? parseInt(productQuality.value) : null,
        deliveryExperience: deliveryExperience ? parseInt(deliveryExperience.value) : null,
        valueForMoney: valueForMoney ? parseInt(valueForMoney.value) : null,
        overallRating: parseInt(overallRating.value),
        averageRating: averageRating.toFixed(1),
        recommend: recommend.value,
        comments: comments,
        submittedDate: new Date().toISOString()
    };

    saveData();
    
    closeCustomerFeedbackModal();
    
    // Show thank you message
    alert(`🎉 Thank you for your valuable feedback!\n\nYour ${averageRating.toFixed(1)} star rating helps us improve our service.\n\nWe appreciate your time and look forward to serving you again! 🌱`);
    
    // Refresh the view if in customer orders
    const customer = customers.find(c => c.email === order.user);
    if (customer) {
        const ordersModal = document.getElementById('customerOrdersModal');
        if (ordersModal && ordersModal.style.display === 'block') {
            viewCustomerOrders(customer.id);
        }
    }
}

function skipFeedback(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (confirm('Are you sure you want to skip feedback? You can provide it later from your order history.')) {
        order.feedbackSkipped = true;
        order.feedbackSkippedDate = new Date().toISOString();
        saveData();
        closeCustomerFeedbackModal();
    }
}

function closeCustomerFeedbackModal() {
    document.getElementById('customerFeedbackModal').style.display = 'none';
}

function updateExpectedDate(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('dateModal');
    const content = document.getElementById('dateContent');

    const currentDate = order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toISOString().split('T')[0] : '';

    content.innerHTML = `
        <h2>📅 Update Expected Delivery Date</h2>
        <p>Order #${order.id}</p>
        <form id="dateForm" class="date-form">
            <label>Expected Delivery Date:</label>
            <input type="date" id="expectedDate" value="${currentDate}" required min="${new Date().toISOString().split('T')[0]}">
            <button type="submit" onclick="event.preventDefault(); saveExpectedDate('${orderId}');">Update Date</button>
        </form>
    `;

    modal.style.display = 'block';
}

function saveExpectedDate(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const dateInput = document.getElementById('expectedDate').value;
    if (!dateInput) {
        alert('Please select a date');
        return;
    }

    order.expectedDeliveryDate = new Date(dateInput).toISOString();
    order.lastUpdated = new Date().toISOString();

    saveData();
    alert('Expected delivery date updated successfully!');
    closeDateModal();
    
    // Refresh the orders view
    const customer = customers.find(c => c.email === order.user);
    if (customer) {
        viewCustomerOrders(customer.id);
    }
}

function closeDateModal() {
    document.getElementById('dateModal').style.display = 'none';
}

function requestReview(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('reviewModal');
    const content = document.getElementById('reviewContent');

    content.innerHTML = `
        <h2>⭐ Add Customer Review</h2>
        <p>Order #${order.id}</p>
        <form id="reviewForm" class="review-form">
            <label>Rating:</label>
            <div class="star-rating">
                <input type="radio" name="rating" value="5" id="star5" required>
                <label for="star5">⭐⭐⭐⭐⭐</label>
                <input type="radio" name="rating" value="4" id="star4">
                <label for="star4">⭐⭐⭐⭐</label>
                <input type="radio" name="rating" value="3" id="star3">
                <label for="star3">⭐⭐⭐</label>
                <input type="radio" name="rating" value="2" id="star2">
                <label for="star2">⭐⭐</label>
                <input type="radio" name="rating" value="1" id="star1">
                <label for="star1">⭐</label>
            </div>
            <label>Feedback:</label>
            <textarea id="reviewFeedback" rows="4" placeholder="Enter customer feedback..." required></textarea>
            <button type="submit" onclick="event.preventDefault(); submitReview('${orderId}');">Submit Review</button>
        </form>
    `;

    modal.style.display = 'block';
}

function submitReview(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const rating = document.querySelector('input[name="rating"]:checked');
    const feedback = document.getElementById('reviewFeedback').value;

    if (!rating || !feedback) {
        alert('Please provide both rating and feedback');
        return;
    }

    order.review = {
        rating: parseInt(rating.value),
        feedback: feedback,
        date: new Date().toISOString()
    };

    saveData();
    alert('Review submitted successfully!');
    closeReviewModal();
    
    // Refresh the orders view
    const customer = customers.find(c => c.email === order.user);
    if (customer) {
        viewCustomerOrders(customer.id);
    }
}

function closeCustomerOrdersModal() {
    document.getElementById('customerOrdersModal').style.display = 'none';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

function exportCustomers() {
    if (customers.length === 0) {
        alert('No customers to export');
        return;
    }

    const dataStr = JSON.stringify(customers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Close modals when clicking outside
window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        if (event.target.id === 'scannerModal') {
            stopCamera();
        }
    }
};
