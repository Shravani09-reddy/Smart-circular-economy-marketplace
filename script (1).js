// Global variables
let currentUser = null;
let currentLanguage = 'en';
let cart = [];
let products = [];
let recognition = null;
let barcodeScanner = null;

// Translations
const translations = {
    en: {
        welcome: "Welcome to EcoMarket",
        "hero-subtitle": "Your sustainable marketplace for buying, selling, and renting",
        buyer: "Buyer",
        seller: "Seller",
        renter: "Renter",
        "buyer-desc": "Browse and purchase products",
        "seller-desc": "List your products for sale",
        "renter-desc": "Rent products temporarily",
        login: "Login",
        register: "Register",
        contact: "Contact (Email/Phone)",
        method: "Method",
        "send-otp": "Send OTP",
        "enter-otp": "Enter OTP",
        verify: "Verify",
        name: "Name",
        email: "Email",
        country: "Country",
        password: "Password",
        role: "Role",
        products: "Available Products",
        cart: "Cart",
        logout: "Logout",
        "add-product": "Add Product",
        "product-name": "Product Name",
        price: "Price",
        description: "Description",
        image: "Product Image",
        "seller-details": "Seller Details",
        "rental-products": "Products Available for Rent",
        total: "Total",
        checkout: "Checkout",
        "voice-assistant": "Voice Assistant",
        "click-to-speak": "Click microphone to speak",
        "chat-support": "Chat Support",
        "scan-barcode": "Scan Barcode",
        "product-details": "Product Details",
        "eco-rating": "Eco Rating",
        "carbon-footprint": "Carbon Footprint",
        "delivery-address": "Delivery Address",
        "payment-method": "Payment Method",
        "barcode-scanner": "Barcode Scanner",
        "product-information": "Product Information",
        "feedback": "Feedback",
        "rating": "Rating",
        "feedback-message": "Your Feedback",
        "submit-feedback": "Submit Feedback",
        "search-products": "Search products...",
        "category": "Category",
        "all-products": "All Products",
        "plastic": "Plastic",
        "wood": "Wood",
        "steel": "Steel",
        "electric": "Electric",
        "bamboo": "Bamboo",
        "metals": "Metals"
    },
    hi: {
        welcome: "EcoMarket में आपका स्वागत है",
        "hero-subtitle": "खरीदने, बेचने और किराए पर लेने के लिए आपका टिकाऊ बाज़ार",
        buyer: "खरीदार",
        seller: "विक्रेता",
        renter: "किरायेदार",
        "buyer-desc": "उत्पादों को ब्राउज़ करें और खरीदें",
        "seller-desc": "बिक्री के लिए अपने उत्पादों को सूचीबद्ध करें",
        "renter-desc": "अस्थायी रूप से उत्पाद किराए पर लें",
        login: "लॉग इन करें",
        register: "पंजीकरण करें",
        contact: "संपर्क (ईमेल/फोन)",
        method: "तरीका",
        "send-otp": "OTP भेजें",
        "enter-otp": "OTP दर्ज करें",
        verify: "सत्यापित करें",
        name: "नाम",
        email: "ईमेल",
        country: "देश",
        password: "पासवर्ड",
        role: "भूमिका",
        products: "उपलब्ध उत्पाद",
        cart: "कार्ट",
        logout: "लॉग आउट",
        "add-product": "उत्पाद जोड़ें",
        "product-name": "उत्पाद का नाम",
        price: "कीमत",
        description: "विवरण",
        image: "उत्पाद छवि",
        "seller-details": "विक्रेता विवरण",
        "rental-products": "किराए के लिए उपलब्ध उत्पाद",
        total: "कुल",
        checkout: "चेकआउट",
        "voice-assistant": "आवाज सहायक",
        "click-to-speak": "बोलने के लिए माइक्रोफोन पर क्लिक करें",
        "chat-support": "चैट सहायता",
        "scan-barcode": "बारकोड स्कैन करें",
        "product-details": "उत्पाद विवरण",
        "eco-rating": "पर्यावरण रेटिंग",
        "carbon-footprint": "कार्बन फुटप्रिंट",
        "delivery-address": "डिलीवरी पता",
        "payment-method": "भुगतान विधि",
        "barcode-scanner": "बारकोड स्कैनर",
        "product-information": "उत्पाद जानकारी",
        "feedback": "प्रतिक्रिया",
        "rating": "रेटिंग",
        "feedback-message": "आपकी प्रतिक्रिया",
        "submit-feedback": "प्रतिक्रिया जमा करें",
        "search-products": "उत्पाद खोजें...",
        "category": "श्रेणी",
        "all-products": "सभी उत्पाद",
        "plastic": "प्लास्टिक",
        "wood": "लकड़ी",
        "steel": "स्टील",
        "electric": "इलेक्ट्रिक",
        "bamboo": "बांस",
        "metals": "धातु"
    },
    te: {
        welcome: "EcoMarket కు స్వాగతం",
        "hero-subtitle": "కొనుగోలు, అమ్మకం మరియు అద్దెకు మీ స్థిరమైన మార్కెట్‌ప్లేస్",
        buyer: "కొనుగోలుదారు",
        seller: "అమ్మకందారు",
        renter: "అద్దెదారు",
        "buyer-desc": "ఉత్పత్తులను బ్రౌజ్ చేసి కొనుగోలు చేయండి",
        "seller-desc": "అమ్మకం కోసం మీ ఉత్పత్తులను జాబితా చేయండి",
        "renter-desc": "తాత్కాలికంగా ఉత్పత్తులను అద్దెకు తీసుకోండి",
        login: "లాగిన్",
        register: "నమోదు",
        contact: "సంప్రదింపు (ఇమెయిల్/ఫోన్)",
        method: "పద్ధతి",
        "send-otp": "OTP పంపండి",
        "enter-otp": "OTP నమోదు చేయండి",
        verify: "ధృవీకరించండి",
        name: "పేరు",
        email: "ఇమెయిల్",
        country: "దేశం",
        password: "పాస్‌వర్డ్",
        role: "పాత్ర",
        products: "అందుబాటులో ఉన్న ఉత్పత్తులు",
        cart: "కార్ట్",
        logout: "లాగ్ అవుట్",
        "add-product": "ఉత్పత్తిని జోడించండి",
        "product-name": "ఉత్పత్తి పేరు",
        price: "ధర",
        description: "వివరణ",
        image: "ఉత్పత్తి చిత్రం",
        "seller-details": "అమ్మకందారు వివరాలు",
        "rental-products": "అద్దెకు అందుబాటులో ఉన్న ఉత్పత్తులు",
        total: "మొత్తం",
        checkout: "చెక్అవుట్",
        "voice-assistant": "వాయిస్ అసిస్టెంట్",
        "click-to-speak": "మాట్లాడటానికి మైక్రోఫోన్‌పై క్లిక్ చేయండి",
        "chat-support": "చాట్ మద్దతు"
    },
    ta: {
        welcome: "EcoMarket க்கு வரவேற்கிறோம்",
        "hero-subtitle": "வாங்குதல், விற்பனை மற்றும் வாடகைக்கு உங்கள் நிலையான சந்தை",
        buyer: "வாங்குபவர்",
        seller: "விற்பனையாளர்",
        renter: "வாடகைதாரர்",
        "buyer-desc": "தயாரிப்புகளை உலாவி வாங்கவும்",
        "seller-desc": "விற்பனைக்கு உங்கள் தயாரிப்புகளை பட்டியலிடுங்கள்",
        "renter-desc": "தற்காலிகமாக தயாரிப்புகளை வாடகைக்கு எடுங்கள்",
        login: "உள்நுழைவு",
        register: "பதிவு",
        contact: "தொடர்பு (மின்னஞ்சல்/தொலைபேசி)",
        method: "முறை",
        "send-otp": "OTP அனுப்பவும்",
        "enter-otp": "OTP உள்ளிடவும்",
        verify: "சரிபார்க்கவும்",
        name: "பெயர்",
        email: "மின்னஞ்சல்",
        country: "நாடு",
        password: "கடவுச்சொல்",
        role: "பங்கு",
        products: "கிடைக்கும் தயாரிப்புகள்",
        cart: "வண்டி",
        logout: "வெளியேறு",
        "add-product": "தயாரிப்பு சேர்க்கவும்",
        "product-name": "தயாரிப்பு பெயர்",
        price: "விலை",
        description: "விளக்கம்",
        image: "தயாரிப்பு படம்",
        "seller-details": "விற்பனையாளர் விவரங்கள்",
        "rental-products": "வாடகைக்கு கிடைக்கும் தயாரிப்புகள்",
        total: "மொத்தம்",
        checkout: "செக்அவுட்",
        "voice-assistant": "குரல் உதவியாளர்",
        "click-to-speak": "பேச மைக்ரோஃபோனில் கிளிக் செய்யவும்",
        "chat-support": "அரட்டை ஆதரவு"
    },
    kn: {
        welcome: "EcoMarket ಗೆ ಸ್ವಾಗತ",
        "hero-subtitle": "ಖರೀದಿ, ಮಾರಾಟ ಮತ್ತು ಬಾಡಿಗೆಗೆ ನಿಮ್ಮ ಸುಸ್ಥಿರ ಮಾರುಕಟ್ಟೆ",
        buyer: "ಖರೀದಿದಾರ",
        seller: "ಮಾರಾಟಗಾರ",
        renter: "ಬಾಡಿಗೆದಾರ",
        "buyer-desc": "ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಮತ್ತು ಖರೀದಿಸಿ",
        "seller-desc": "ಮಾರಾಟಕ್ಕಾಗಿ ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
        "renter-desc": "ತಾತ್ಕಾಲಿಕವಾಗಿ ಉತ್ಪನ್ನಗಳನ್ನು ಬಾಡಿಗೆಗೆ ತೆಗೆದುಕೊಳ್ಳಿ",
        login: "ಲಾಗಿನ್",
        register: "ನೋಂದಣಿ",
        contact: "ಸಂಪರ್ಕ (ಇಮೇಲ್/ಫೋನ್)",
        method: "ವಿಧಾನ",
        "send-otp": "OTP ಕಳುಹಿಸಿ",
        "enter-otp": "OTP ನಮೂದಿಸಿ",
        verify: "ಪರಿಶೀಲಿಸಿ",
        name: "ಹೆಸರು",
        email: "ಇಮೇಲ್",
        country: "ದೇಶ",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        role: "ಪಾತ್ರ",
        products: "ಲಭ್ಯವಿರುವ ಉತ್ಪನ್ನಗಳು",
        cart: "ಕಾರ್ಟ್",
        logout: "ಲಾಗ್ ಔಟ್",
        "add-product": "ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
        "product-name": "ಉತ್ಪನ್ನದ ಹೆಸರು",
        price: "ಬೆಲೆ",
        description: "ವಿವರಣೆ",
        image: "ಉತ್ಪನ್ನ ಚಿತ್ರ",
        "seller-details": "ಮಾರಾಟಗಾರ ವಿವರಗಳು",
        "rental-products": "ಬಾಡಿಗೆಗೆ ಲಭ್ಯವಿರುವ ಉತ್ಪನ್ನಗಳು",
        total: "ಒಟ್ಟು",
        checkout: "ಚೆಕ್‌ಔಟ್",
        "voice-assistant": "ಧ್ವನಿ ಸಹಾಯಕ",
        "click-to-speak": "ಮಾತನಾಡಲು ಮೈಕ್ರೋಫೋನ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ",
        "chat-support": "ಚಾಟ್ ಬೆಂಬಲ"
    },
    ur: {
        welcome: "EcoMarket میں خوش آمدید",
        "hero-subtitle": "خریداری، فروخت اور کرائے کے لیے آپ کا پائیدار بازار",
        buyer: "خریدار",
        seller: "فروخت کنندہ",
        renter: "کرایہ دار",
        "buyer-desc": "مصنوعات براؤز کریں اور خریدیں",
        "seller-desc": "فروخت کے لیے اپنی مصنوعات کی فہرست بنائیں",
        "renter-desc": "عارضی طور پر مصنوعات کرائے پر لیں",
        login: "لاگ ان",
        register: "رجسٹر",
        contact: "رابطہ (ای میل/فون)",
        method: "طریقہ",
        "send-otp": "OTP بھیجیں",
        "enter-otp": "OTP داخل کریں",
        verify: "تصدیق کریں",
        name: "نام",
        email: "ای میل",
        country: "ملک",
        password: "پاس ورڈ",
        role: "کردار",
        products: "دستیاب مصنوعات",
        cart: "کارٹ",
        logout: "لاگ آؤٹ",
        "add-product": "مصنوعات شامل کریں",
        "product-name": "مصنوعات کا نام",
        price: "قیمت",
        description: "تفصیل",
        image: "مصنوعات کی تصویر",
        "seller-details": "فروخت کنندہ کی تفصیلات",
        "rental-products": "کرائے کے لیے دستیاب مصنوعات",
        total: "کل",
        checkout: "چیک آؤٹ",
        "voice-assistant": "آواز کا معاون",
        "click-to-speak": "بولنے کے لیے مائیکروفون پر کلک کریں",
        "chat-support": "چیٹ سپورٹ"
    },
    ml: {
        welcome: "EcoMarket ലേക്ക് സ്വാഗതം",
        "hero-subtitle": "വാങ്ങൽ, വിൽപ്പന, വാടകയ്ക്ക് നിങ്ങളുടെ സുസ്ഥിര മാർക്കറ്റ്പ്ലേസ്",
        buyer: "വാങ്ങുന്നയാൾ",
        seller: "വിൽപ്പനക്കാരൻ",
        renter: "വാടകക്കാരൻ",
        "buyer-desc": "ഉൽപ്പന്നങ്ങൾ ബ്രൗസ് ചെയ്ത് വാങ്ങുക",
        "seller-desc": "വിൽപ്പനയ്ക്കായി നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ ലിസ്റ്റ് ചെയ്യുക",
        "renter-desc": "താൽക്കാലികമായി ഉൽപ്പന്നങ്ങൾ വാടകയ്ക്ക് എടുക്കുക",
        login: "ലോഗിൻ",
        register: "രജിസ്റ്റർ",
        contact: "ബന്ധപ്പെടുക (ഇമെയിൽ/ഫോൺ)",
        method: "രീതി",
        "send-otp": "OTP അയയ്ക്കുക",
        "enter-otp": "OTP നൽകുക",
        verify: "പരിശോധിക്കുക",
        name: "പേര്",
        email: "ഇമെയിൽ",
        country: "രാജ്യം",
        password: "പാസ്‌വേഡ്",
        role: "പങ്ക്",
        products: "ലഭ്യമായ ഉൽപ്പന്നങ്ങൾ",
        cart: "കാർട്ട്",
        logout: "ലോഗ് ഔട്ട്",
        "add-product": "ഉൽപ്പന്നം ചേർക്കുക",
        "product-name": "ഉൽപ്പന്നത്തിന്റെ പേര്",
        price: "വില",
        description: "വിവരണം",
        image: "ഉൽപ്പന്ന ചിത്രം",
        "seller-details": "വിൽപ്പനക്കാരന്റെ വിശദാംശങ്ങൾ",
        "rental-products": "വാടകയ്ക്ക് ലഭ്യമായ ഉൽപ്പന്നങ്ങൾ",
        total: "ആകെ",
        checkout: "ചെക്ക്ഔട്ട്",
        "voice-assistant": "വോയ്സ് അസിസ്റ്റന്റ്",
        "click-to-speak": "സംസാരിക്കാൻ മൈക്രോഫോണിൽ ക്ലിക്ക് ചെയ്യുക",
        "chat-support": "ചാറ്റ് സപ്പോർട്ട്"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    checkAuthStatus();
    loadProducts();
    loadCart();
    initializeVoiceRecognition();
    initializeChatbot();
    handleUrlFragment();

    // Event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('addProductForm').addEventListener('submit', handleAddProduct);
    document.getElementById('chatInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCart();
            closeImageModal();
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
        const cartModal = document.getElementById('cartModal');
        const imageModal = document.getElementById('imageModal');

        if (e.target === cartModal) {
            closeCart();
        }
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
});

// Handle URL fragments for navigation
function handleUrlFragment() {
    const fragment = window.location.hash.substring(1);
    switch (fragment) {
        case 'register':
            showRegister();
            break;
        case 'login':
            showLogin();
            break;
        case 'cart':
            setTimeout(() => {
                if (currentUser) {
                    showCart();
                } else {
                    showLogin();
                }
            }, 1000);
            break;
        default:
            showHome();
    }
}

// Navigation functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function showHome() {
    showSection('homeSection');
}

function showLogin() {
    showSection('loginSection');
}

function showRegister() {
    showSection('registerSection');
}

// Role selection
function selectRole(role) {
    if (!currentUser) {
        alert('Please login or register first!');
        showLogin();
        return;
    }

    switch (role) {
        case 'buyer':
            showSection('buyerSection');
            loadProducts();
            break;
        case 'seller':
            showSection('sellerSection');
            break;
        case 'renter':
            showSection('renterSection');
            loadRentalProducts();
            break;
    }
}

// Authentication functions
async function handleLogin(e) {
    e.preventDefault();
    const contact = document.getElementById('loginContact').value;
    const method = document.getElementById('loginMethod').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact, method })
        });

        const data = await response.json();
        if (data.ok) {
            document.getElementById('otpSection').style.display = 'block';
            alert('OTP sent! Check the server console for the OTP.');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

async function verifyOTP() {
    const otp = document.getElementById('otpInput').value;

    try {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp })
        });

        const data = await response.json();
        if (data.ok) {
            currentUser = data.user;
            updateNavigation();
            showHome();
            alert('Login successful!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('OTP verification failed: ' + error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const country = document.getElementById('regCountry').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, country, password, role })
        });

        const data = await response.json();
        if (data.ok) {
            currentUser = data.user;
            updateNavigation();
            showHome();
            alert('Registration successful!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

async function logout() {
    try {
        await fetch('/api/signout', { method: 'POST' });
        currentUser = null;
        cart = [];
        updateNavigation();
        showHome();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/me');
        const data = await response.json();
        if (data.user) {
            currentUser = data.user;
            updateNavigation();
        }
    } catch (error) {
        console.error('Auth check failed:', error);
    }
}

function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (currentUser) {
        navMenu.innerHTML = `
            <span>Welcome, ${currentUser.name}!</span>
            <div class="language-selector">
                <select id="languageSelect" onchange="changeLanguage()">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="te">తెలుగు</option>
                    <option value="ta">தமிழ்</option>
                    <option value="kn">ಕನ್ನಡ</option>
                    <option value="ur">اردو</option>
                    <option value="ml">മലയാളം</option>
                </select>
            </div>
            <button class="voice-btn" onclick="toggleVoiceAssistant()">
                <i class="fas fa-microphone"></i>
            </button>
            <button onclick="logout()">Logout</button>
        `;
    } else {
        navMenu.innerHTML = `
            <a href="#" onclick="showHome()">Home</a>
            <a href="#" onclick="showLogin()">Login</a>
            <a href="#" onclick="showRegister()">Register</a>
            <div class="language-selector">
                <select id="languageSelect" onchange="changeLanguage()">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="te">తెలుగు</option>
                    <option value="ta">தமிழ்</option>
                    <option value="kn">ಕನ್ನಡ</option>
                    <option value="ur">اردو</option>
                    <option value="ml">മലയാളം</option>
                </select>
            </div>
            <button class="voice-btn" onclick="toggleVoiceAssistant()">
                <i class="fas fa-microphone"></i>
            </button>
        `;
    }
}

// Product functions
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        products = data.products;
        displayProducts(products);
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div style="position: relative;">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="product-image" 
                     onclick="openImageModal('${product.image}', '${product.title}')"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='"
                     onload="this.classList.remove('loading')"
                     onloadstart="this.classList.add('loading')">
                <div class="image-overlay">
                    <i class="fas fa-search-plus image-zoom-icon"></i>
                    <span style="margin-left: 0.5rem;">Click to enlarge</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="seller-info">
                    <strong>Seller:</strong> ${product.seller.name}<br>
                    <strong>Phone:</strong> ${product.seller.phone}<br>
                    <strong>Email:</strong> ${product.seller.email}<br>
                    <strong>Address:</strong> ${product.seller.address}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function loadRentalProducts() {
    // Filter products available for rent (for demo, show products with even IDs)
    const rentalProducts = products.filter(p => p.id % 2 === 0);
    const grid = document.getElementById('rentalGrid');
    grid.innerHTML = rentalProducts.map(product => `
        <div class="product-card">
            <div style="position: relative;">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="product-image" 
                     onclick="openImageModal('${product.image}', '${product.title}')"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='"
                     onload="this.classList.remove('loading')"
                     onloadstart="this.classList.add('loading')">
                <div class="image-overlay">
                    <i class="fas fa-search-plus image-zoom-icon"></i>
                    <span style="margin-left: 0.5rem;">Click to enlarge</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${Math.floor(product.price * 0.1)}/day</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="seller-info">
                    <strong>Owner:</strong> ${product.seller.name}<br>
                    <strong>Phone:</strong> ${product.seller.phone}<br>
                    <strong>Email:</strong> ${product.seller.email}<br>
                    <strong>Address:</strong> ${product.seller.address}
                </div>
                <button class="add-to-cart" onclick="rentProduct(${product.id})">Rent Now</button>
            </div>
        </div>
    `).join('');
}

async function handleAddProduct(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const sellerName = document.getElementById('sellerName').value;
    const sellerPhone = document.getElementById('sellerPhone').value;
    const sellerAddress = document.getElementById('sellerAddress').value;

    if (!currentUser) {
        alert('Please login first!');
        return;
    }

    try {
        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, description, sellerName, sellerPhone, sellerAddress })
        });

        const data = await response.json();
        if (data.ok) {
            alert('Product added successfully!');
            document.getElementById('addProductForm').reset();
            // Reload products to show the new one
            loadProducts();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to add product: ' + error.message);
    }
}

// Cart functions
async function addToCart(productId) {
    if (!currentUser) {
        alert('Please login first!');
        return;
    }

    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        });

        const data = await response.json();
        if (data.ok) {
            cart = data.cart;
            updateCartCount();
            alert('Product added to cart!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to add to cart: ' + error.message);
    }
}

async function loadCart() {
    if (!currentUser) return;

    try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        cart = data.cart || [];
        updateCartCount();
    } catch (error) {
        console.error('Failed to load cart:', error);
    }
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.title}</strong><br>
                    $${item.price}
                </div>
                <button onclick="removeFromCart(${index})" style="background: #dc3545;">Remove</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total;
    }

    modal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Image Modal functions
function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const caption = document.getElementById('imageCaption');

    modal.style.display = 'block';
    modalImage.src = imageSrc;
    caption.textContent = title;

    // Add loading state
    modalImage.onload = function () {
        this.style.opacity = '1';
    };
    modalImage.style.opacity = '0.5';
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Image preview for seller form
function previewImage(input) {
    const preview = document.getElementById('imagePreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `
                <div style="text-align: center;">
                    <img src="${e.target.result}" 
                         alt="Preview" 
                         style="max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer;"
                         onclick="openImageModal('${e.target.result}', 'Product Preview')">
                    <p style="margin-top: 0.5rem; color: #666; font-size: 0.9rem;">Click image to enlarge</p>
                </div>
            `;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = '';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart();
}

async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    try {
        const response = await fetch('/api/cart/buyall', {
            method: 'POST'
        });

        const data = await response.json();
        if (data.ok) {
            cart = [];
            updateCartCount();
            closeCart();
            alert('Order placed successfully!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Checkout failed: ' + error.message);
    }
}

async function rentProduct(productId) {
    if (!currentUser) {
        alert('Please login first!');
        return;
    }

    const days = prompt('How many days would you like to rent this product?', '1');
    if (!days || isNaN(days) || days < 1) {
        alert('Please enter a valid number of days');
        return;
    }

    try {
        const response = await fetch('/api/rental/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: parseInt(productId), days: parseInt(days) })
        });

        const data = await response.json();
        if (data.ok) {
            const product = products.find(p => p.id === productId);
            alert(`Rental request sent for ${product.title} for ${days} days! Total cost: $${data.rental.totalCost}. Owner will contact you soon.`);
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Rental request failed: ' + error.message);
    }
}

// Language functions
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    updateTranslations();
    updateVoiceRecognitionLanguage();
    updateTextDirection();
}

function updateTextDirection() {
    // Set RTL for Urdu
    if (currentLanguage === 'ur') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
}

function updateVoiceRecognitionLanguage() {
    if (recognition) {
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'te': 'te-IN',
            'ta': 'ta-IN',
            'kn': 'kn-IN',
            'ur': 'ur-PK',
            'ml': 'ml-IN'
        };
        recognition.lang = langMap[currentLanguage] || 'en-US';
    }
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Voice Assistant functions
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        updateVoiceRecognitionLanguage();

        recognition.onstart = function () {
            document.getElementById('voiceStatus').textContent = 'Listening...';
            document.getElementById('voiceBtn').classList.add('listening');
        };

        recognition.onresult = function (event) {
            const command = event.results[0][0].transcript.toLowerCase();
            document.getElementById('voiceStatus').textContent = `You said: "${command}"`;
            processVoiceCommand(command);
        };

        recognition.onerror = function (event) {
            document.getElementById('voiceStatus').textContent = 'Error occurred: ' + event.error;
            document.getElementById('voiceBtn').classList.remove('listening');
        };

        recognition.onend = function () {
            document.getElementById('voiceBtn').classList.remove('listening');
        };
    }
}

function toggleVoiceAssistant() {
    const assistant = document.getElementById('voiceAssistant');
    assistant.classList.toggle('active');
}

function startVoiceRecognition() {
    if (recognition) {
        recognition.start();
    } else {
        alert('Speech recognition not supported in this browser');
    }
}

function processVoiceCommand(command) {
    if (command.includes('show products') || command.includes('buyer')) {
        selectRole('buyer');
        speak('Showing available products');
    } else if (command.includes('seller') || command.includes('add product')) {
        selectRole('seller');
        speak('Opening seller dashboard');
    } else if (command.includes('rent') || command.includes('rental')) {
        selectRole('renter');
        speak('Showing rental products');
    } else if (command.includes('cart') || command.includes('shopping cart')) {
        showCart();
        speak('Opening shopping cart');
    } else if (command.includes('home')) {
        showHome();
        speak('Going to home page');
    } else if (command.includes('login')) {
        showLogin();
        speak('Opening login page');
    } else if (command.includes('register')) {
        showRegister();
        speak('Opening registration page');
    } else {
        speak('Sorry, I did not understand that command. Try saying "show products", "seller", "rental", "cart", or "home"');
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'te': 'te-IN',
            'ta': 'ta-IN',
            'kn': 'kn-IN',
            'ur': 'ur-PK',
            'ml': 'ml-IN'
        };
        utterance.lang = langMap[currentLanguage] || 'en-US';
        speechSynthesis.speak(utterance);
    }
}

// Chatbot functions
function initializeChatbot() {
    addBotMessage("Hello! I'm your EcoMarket assistant. How can I help you today?");
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message) {
        addUserMessage(message);
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addBotMessage(response);
        }, 1000);
    }
}

function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addBotMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    const responses = {
        en: {
            help: "I can help you with buying, selling, or renting products. What would you like to do?",
            buy: "To buy products, select the 'Buyer' option from the home page. You can browse all available products and add them to your cart.",
            sell: "To sell products, select the 'Seller' option from the home page. You can add your product details, images, and seller information.",
            rent: "To rent products, select the 'Renter' option from the home page. You'll see products available for temporary rental.",
            cart: "You can view your cart by clicking the cart button in the buyer section. From there you can checkout or remove items.",
            auth: "You can login or register using the navigation menu. Registration requires your name, email, country, password, and role selection.",
            language: "You can change the language using the dropdown in the navigation menu. We support English, Hindi, Telugu, Tamil, Kannada, Urdu, and Malayalam.",
            voice: "You can use voice commands by clicking the microphone button. Try saying 'show products', 'seller', 'rental', or 'cart'.",
            default: "I'm here to help with EcoMarket! You can ask me about buying, selling, renting, using the cart, or navigating the website."
        },
        hi: {
            help: "मैं आपको उत्पाद खरीदने, बेचने या किराए पर लेने में मदद कर सकता हूं। आप क्या करना चाहेंगे?",
            buy: "उत्पाद खरीदने के लिए, होम पेज से 'खरीदार' विकल्प चुनें। आप सभी उपलब्ध उत्पादों को ब्राउज़ कर सकते हैं और उन्हें अपने कार्ट में जोड़ सकते हैं।",
            sell: "उत्पाद बेचने के लिए, होम पेज से 'विक्रेता' विकल्प चुनें। आप अपने उत्पाद विवरण, छवियां और विक्रेता जानकारी जोड़ सकते हैं।",
            rent: "उत्पाद किराए पर लेने के लिए, होम पेज से 'किरायेदार' विकल्प चुनें। आपको अस्थायी किराए के लिए उपलब्ध उत्पाद दिखेंगे।",
            cart: "आप खरीदार अनुभाग में कार्ट बटन पर क्लिक करके अपना कार्ट देख सकते हैं। वहां से आप चेकआउट कर सकते हैं या आइटम हटा सकते हैं।",
            auth: "आप नेवीगेशन मेनू का उपयोग करके लॉगिन या रजिस्टर कर सकते हैं। पंजीकरण के लिए आपका नाम, ईमेल, देश, पासवर्ड और भूमिका चयन आवश्यक है।",
            language: "आप नेवीगेशन मेनू में ड्रॉपडाउन का उपयोग करके भाषा बदल सकते हैं। हम अंग्रेजी, हिंदी, तेलुगु, तमिल, कन्नड़, उर्दू और मलयालम का समर्थन करते हैं।",
            voice: "आप माइक्रोफोन बटन पर क्लिक करके वॉयस कमांड का उपयोग कर सकते हैं। 'उत्पाद दिखाएं', 'विक्रेता', 'किराया', या 'कार्ट' कहने की कोशिश करें।",
            default: "मैं EcoMarket के साथ मदद के लिए यहां हूं! आप मुझसे खरीदारी, बिक्री, किराया, कार्ट का उपयोग, या वेबसाइट नेवीगेशन के बारे में पूछ सकते हैं।"
        }
    };

    const currentResponses = responses[currentLanguage] || responses.en;

    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('मदद') || lowerMessage.includes('సహాయం')) {
        return currentResponses.help;
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('product') || lowerMessage.includes('खरीद') || lowerMessage.includes('కొనుగోలు')) {
        return currentResponses.buy;
    } else if (lowerMessage.includes('sell') || lowerMessage.includes('बेच') || lowerMessage.includes('అమ్మకం')) {
        return currentResponses.sell;
    } else if (lowerMessage.includes('rent') || lowerMessage.includes('किराया') || lowerMessage.includes('అద్దె')) {
        return currentResponses.rent;
    } else if (lowerMessage.includes('cart') || lowerMessage.includes('कार्ट') || lowerMessage.includes('కార్ట్')) {
        return currentResponses.cart;
    } else if (lowerMessage.includes('login') || lowerMessage.includes('register') || lowerMessage.includes('लॉगिन') || lowerMessage.includes('లాగిన్')) {
        return currentResponses.auth;
    } else if (lowerMessage.includes('language') || lowerMessage.includes('भाषा') || lowerMessage.includes('భాష')) {
        return currentResponses.language;
    } else if (lowerMessage.includes('voice') || lowerMessage.includes('आवाज') || lowerMessage.includes('వాయిస్')) {
        return currentResponses.voice;
    } else {
        return currentResponses.default;
    }
}

// Enhanced product display with eco-ratings and barcode
function displayProductsEnhanced(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div style="position: relative;">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="product-image" 
                     onclick="openImageModal('${product.image}', '${product.title}')"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='"
                     onload="this.classList.remove('loading')"
                     onloadstart="this.classList.add('loading')">
                <div class="image-overlay">
                    <i class="fas fa-search-plus image-zoom-icon"></i>
                    <span style="margin-left: 0.5rem;">Click to enlarge</span>
                </div>
                <div class="barcode-overlay">
                    <div class="barcode" onclick="showProductInfo(${product.id})">
                        <i class="fas fa-qrcode"></i>
                        <span>Scan Info</span>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="eco-info">
                    <div class="eco-rating">
                        <span class="eco-label">Eco Rating:</span>
                        <span class="eco-stars">${'🌱'.repeat(product.ecoRating || 3)}</span>
                        <span class="eco-value">${product.ecoRating || 3}/5</span>
                    </div>
                    <div class="carbon-footprint">
                        <span class="carbon-label">Carbon Footprint:</span>
                        <span class="carbon-value">${product.carbonFootprint || '2.5'}kg CO₂</span>
                    </div>
                </div>
                <div class="seller-info">
                    <strong>Seller:</strong> ${product.seller.name}<br>
                    <strong>Phone:</strong> ${product.seller.phone}<br>
                    <strong>Email:</strong> ${product.seller.email}<br>
                    <strong>Address:</strong> ${product.seller.address}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="product-info-btn" onclick="showProductInfo(${product.id})">
                        <i class="fas fa-info-circle"></i> Info
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Barcode Scanner Functions
function startBarcodeScanner() {
    const modal = document.getElementById('barcodeModal');
    modal.style.display = 'block';

    // Simulate barcode scanning (in real app, you'd use a library like QuaggaJS)
    const reader = document.getElementById('barcodeReader');
    reader.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-qrcode" style="font-size: 4rem; color: #667eea; margin-bottom: 1rem;"></i>
            <p>Point your camera at a barcode</p>
            <button onclick="simulateBarcodeScan()" style="margin-top: 1rem;">Simulate Scan</button>
        </div>
    `;
}

function simulateBarcodeScan() {
    // Simulate scanning a random product
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const result = document.getElementById('barcodeResult');
    result.innerHTML = `
        <div class="scan-result">
            <h3>Product Found!</h3>
            <p><strong>${randomProduct.title}</strong></p>
            <button onclick="showProductInfo(${randomProduct.id}); closeBarcodeScanner();">View Details</button>
        </div>
    `;
}

function closeBarcodeScanner() {
    document.getElementById('barcodeModal').style.display = 'none';
}

// Product Information Functions
function showProductInfo(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productInfoModal');
    const content = document.getElementById('productInfoContent');

    content.innerHTML = `
        <div class="product-details">
            <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 1rem;">
            <h3>${product.title}</h3>
            <div class="detail-section">
                <h4>Manufacturing Information</h4>
                <p><strong>Location:</strong> ${product.manufacturingLocation || 'India'}</p>
                <p><strong>Date:</strong> ${product.manufacturingDate || '2024-01-15'}</p>
                <p><strong>Expiry Date:</strong> ${product.expiryDate || '2026-01-15'}</p>
            </div>
            <div class="detail-section">
                <h4>Usage Instructions</h4>
                <p>${product.usageInstructions || 'Follow standard usage guidelines. Keep in cool, dry place.'}</p>
            </div>
            <div class="detail-section">
                <h4>Recycling Information</h4>
                <p>${product.recyclingInfo || 'This product is made from recyclable materials. Please dispose of responsibly.'}</p>
            </div>
            <div class="detail-section">
                <h4>Environmental Impact</h4>
                <div class="eco-details">
                    <div class="eco-rating-detail">
                        <span>Eco Rating: </span>
                        <span class="eco-stars">${'🌱'.repeat(product.ecoRating || 3)}</span>
                        <span>${product.ecoRating || 3}/5</span>
                    </div>
                    <div class="carbon-detail">
                        <span>Carbon Footprint: ${product.carbonFootprint || '2.5'}kg CO₂</span>
                    </div>
                    <div class="environmental-benefits">
                        <p><strong>Environmental Benefits:</strong></p>
                        <ul>
                            <li>Reduces plastic waste by 80%</li>
                            <li>Made from sustainable materials</li>
                            <li>Carbon-neutral shipping</li>
                            <li>Supports reforestation projects</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeProductInfo() {
    document.getElementById('productInfoModal').style.display = 'none';
}

// Enhanced checkout with address and payment
async function checkoutEnhanced() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const address = document.getElementById('deliveryAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!address || !paymentMethod) {
        alert('Please fill in delivery address and payment method!');
        return;
    }

    try {
        const response = await fetch('/api/cart/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                paymentMethod,
                items: cart
            })
        });

        const data = await response.json();
        if (data.ok) {
            cart = [];
            updateCartCount();
            closeCart();

            // Send order confirmation message
            sendOrderConfirmation(data.orderId, address, paymentMethod);

            // Show feedback modal after a delay
            setTimeout(() => {
                showFeedbackModal();
            }, 2000);

            alert(`Order placed successfully! Order ID: ${data.orderId}\nYou will receive a confirmation message shortly.`);
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Checkout failed: ' + error.message);
    }
}

// Order confirmation message
function sendOrderConfirmation(orderId, address, paymentMethod) {
    const message = `
🎉 Order Confirmed! 

Order ID: ${orderId}
Delivery Address: ${address}
Payment Method: ${paymentMethod}
Total Items: ${cart.length}

Your order is being processed and will be delivered within 3-5 business days.
Thank you for choosing EcoMarket! 🌱
    `;

    // In a real app, this would send SMS/Email
    console.log('Order Confirmation Message:', message);

    // Show notification
    showNotification('Order confirmed! Check console for details.');
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Feedback system
function showFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'block';

    // Initialize star rating
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-rating');
            updateStarRating(rating);
        });
    });
}

function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
}

function closeFeedback() {
    document.getElementById('feedbackModal').style.display = 'none';
}

// Enhanced product addition with all new fields
async function handleAddProductEnhanced(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const sellerName = document.getElementById('sellerName').value;
    const sellerPhone = document.getElementById('sellerPhone').value;
    const sellerAddress = document.getElementById('sellerAddress').value;
    const manufacturingLocation = document.getElementById('manufacturingLocation').value;
    const manufacturingDate = document.getElementById('manufacturingDate').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const usageInstructions = document.getElementById('usageInstructions').value;
    const recyclingInfo = document.getElementById('recyclingInfo').value;
    const ecoRating = document.getElementById('ecoRating').value;
    const carbonFootprint = document.getElementById('carbonFootprint').value;
    const category = document.getElementById('productCategory').value;

    if (!currentUser) {
        alert('Please login first!');
        return;
    }

    try {
        const response = await fetch('/api/products/add-enhanced', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, price, description, sellerName, sellerPhone, sellerAddress,
                manufacturingLocation, manufacturingDate, expiryDate,
                usageInstructions, recyclingInfo, ecoRating, carbonFootprint, category
            })
        });

        const data = await response.json();
        if (data.ok) {
            alert('Product added successfully with eco-rating and barcode!');
            document.getElementById('addProductForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            loadProducts();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Failed to add product: ' + error.message);
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function () {
    // Replace the original displayProducts with enhanced version
    if (typeof displayProducts !== 'undefined') {
        displayProducts = displayProductsEnhancedINR;
    }

    // Replace checkout function
    if (typeof checkout !== 'undefined') {
        checkout = checkoutEnhanced;
    }

    // Replace loadProducts function
    if (typeof loadProducts !== 'undefined') {
        loadProducts = loadProductsEnhanced;
    }

    // Replace handleAddProduct function
    if (typeof handleAddProduct !== 'undefined') {
        handleAddProduct = handleAddProductEnhanced;
    }

    // Add feedback form handler
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const rating = document.querySelectorAll('.star[style*="rgb(255, 193, 7)"]').length;
            const message = document.getElementById('feedbackMessage').value;

            try {
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rating, message })
                });

                const data = await response.json();
                if (data.ok) {
                    alert('Thank you for your feedback!');
                    closeFeedback();
                } else {
                    alert('Failed to submit feedback');
                }
            } catch (error) {
                alert('Failed to submit feedback: ' + error.message);
            }
        });
    }
});

// Search functionality
let allProducts = [];
let filteredProducts = [];

function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();

    if (searchTerm === '') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.seller.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }

    displayProductsEnhanced(filteredProducts);

    // Show search results count
    const resultsCount = filteredProducts.length;
    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo) {
        searchInfo.remove();
    }

    if (searchTerm !== '') {
        const info = document.createElement('div');
        info.id = 'searchInfo';
        info.className = 'search-info';
        info.innerHTML = `Found ${resultsCount} product(s) for "${searchTerm}"`;
        document.getElementById('productsGrid').parentNode.insertBefore(info, document.getElementById('productsGrid'));
    }
}

function clearSearch() {
    document.getElementById('productSearch').value = '';
    filteredProducts = allProducts;
    displayProductsEnhanced(filteredProducts);

    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo) {
        searchInfo.remove();
    }
}

// Enhanced loadProducts function
async function loadProductsEnhanced() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = allProducts;
        displayProductsEnhanced(filteredProducts);
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

// Update the displayProductsEnhanced function to show Indian Rupees
function displayProductsEnhancedINR(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div style="position: relative;">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="product-image" 
                     onclick="openImageModal('${product.image}', '${product.title}')"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='"
                     onload="this.classList.remove('loading')"
                     onloadstart="this.classList.add('loading')">
                <div class="image-overlay">
                    <i class="fas fa-search-plus image-zoom-icon"></i>
                    <span style="margin-left: 0.5rem;">Click to enlarge</span>
                </div>
                <div class="barcode-overlay">
                    <div class="barcode" onclick="showProductInfo(${product.id})">
                        <i class="fas fa-qrcode"></i>
                        <span>Scan Info</span>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <div class="product-title">${product.title}</div>
                    <div class="product-category">${(product.category || 'general').toUpperCase()}</div>
                </div>
                <div class="product-price">₹${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="eco-info">
                    <div class="eco-rating">
                        <span class="eco-label">Eco Rating:</span>
                        <span class="eco-stars">${'🌱'.repeat(product.ecoRating || 3)}</span>
                        <span class="eco-value">${product.ecoRating || 3}/5</span>
                    </div>
                    <div class="carbon-footprint">
                        <span class="carbon-label">Carbon Footprint:</span>
                        <span class="carbon-value">${product.carbonFootprint || '2.5'}kg CO₂</span>
                    </div>
                </div>
                <div class="seller-info">
                    <strong>Seller:</strong> ${product.seller.name}<br>
                    <strong>Phone:</strong> ${product.seller.phone}<br>
                    <strong>Email:</strong> ${product.seller.email}<br>
                    <strong>Address:</strong> ${product.seller.address}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="product-info-btn" onclick="showProductInfo(${product.id})">
                        <i class="fas fa-info-circle"></i> Info
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Override the original functions
if (typeof loadProducts !== 'undefined') {
    loadProducts = loadProductsEnhanced;
}
if (typeof displayProductsEnhanced !== 'undefined') {
    displayProductsEnhanced = displayProductsEnhancedINR;
}

// Enhanced search with no results handling
function searchProductsEnhanced() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.seller.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)) ||
            (product.manufacturingLocation && product.manufacturingLocation.toLowerCase().includes(searchTerm))
        );
    }

    displaySearchResults(filteredProducts, searchTerm);
}

function displaySearchResults(products, searchTerm) {
    const grid = document.getElementById('productsGrid');

    // Remove existing search info
    const existingInfo = document.getElementById('searchInfo');
    if (existingInfo) {
        existingInfo.remove();
    }

    if (products.length === 0 && searchTerm !== '') {
        // Show no results message
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>No products match your search for "${searchTerm}"</p>
                <p>Try searching with different keywords or browse all products</p>
                <button onclick="clearSearch()" class="scanner-btn" style="margin-top: 1rem;">
                    <i class="fas fa-list"></i> Show All Products
                </button>
            </div>
        `;
        return;
    }

    // Display products
    displayProductsEnhancedINR(products);

    // Show search results count
    if (searchTerm !== '') {
        const info = document.createElement('div');
        info.id = 'searchInfo';
        info.className = 'search-info';
        info.innerHTML = `
            <i class="fas fa-search"></i>
            Found ${products.length} product(s) for "${searchTerm}"
            <button onclick="clearSearch()" style="margin-left: 1rem; background: none; border: none; color: #1976d2; cursor: pointer; text-decoration: underline;">
                Clear Search
            </button>
        `;
        grid.parentNode.insertBefore(info, grid);
    }
}

// Update the search function
function searchProducts() {
    searchProductsEnhanced();
}

// Clear search function
function clearSearch() {
    document.getElementById('productSearch').value = '';
    currentCategory = 'all';

    // Reset category filter buttons
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.category-filter[onclick="filterByCategory(\'all\')"]').classList.add('active');

    // Show all products
    displayProductsEnhancedINR(allProducts);

    // Remove search info
    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo) {
        searchInfo.remove();
    }
}

// Add real-time search with debouncing
let searchTimeout;
function searchProductsRealTime() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchProductsEnhanced();
    }, 300); // 300ms delay for better performance
}

// Enhanced cart total display with Indian Rupees
function updateCartTotalINR() {
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal && cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `₹${total}`;
    } else if (cartTotal) {
        cartTotal.textContent = '₹0';
    }
}

// Override the original updateCartCount to include INR
function updateCartCountEnhanced() {
    document.getElementById('cartCount').textContent = cart.length;
    updateCartTotalINR();
}

// Replace the original function
if (typeof updateCartCount !== 'undefined') {
    updateCartCount = updateCartCountEnhanced;
}

// Category filtering functionality
let currentCategory = 'all';

function filterByCategory(category) {
    currentCategory = category;

    // Update active filter button
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter products
    let productsToShow = allProducts;
    if (category !== 'all') {
        productsToShow = allProducts.filter(product =>
            product.category === category
        );
    }

    // Apply search filter if active
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    if (searchTerm) {
        productsToShow = productsToShow.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.seller.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }

    displayProductsEnhancedINR(productsToShow);
    updateSearchInfo(productsToShow.length, searchTerm, category);
}

function updateSearchInfo(count, searchTerm, category) {
    const searchInfo = document.getElementById('searchInfo');
    if (searchInfo) {
        searchInfo.remove();
    }

    if (searchTerm || category !== 'all') {
        const info = document.createElement('div');
        info.id = 'searchInfo';
        info.className = 'search-info';

        let message = `Found ${count} product(s)`;
        if (searchTerm && category !== 'all') {
            message += ` for "${searchTerm}" in ${category} category`;
        } else if (searchTerm) {
            message += ` for "${searchTerm}"`;
        } else if (category !== 'all') {
            message += ` in ${category} category`;
        }

        info.innerHTML = message;
        document.getElementById('productsGrid').parentNode.insertBefore(info, document.getElementById('productsGrid'));
    }
}

// Enhanced search function with category support
function searchProductsEnhanced() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();

    let productsToShow = allProducts;

    // Apply category filter
    if (currentCategory !== 'all') {
        productsToShow = productsToShow.filter(product =>
            product.category === currentCategory
        );
    }

    // Apply search filter
    if (searchTerm) {
        productsToShow = productsToShow.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.seller.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }

    displayProductsEnhancedINR(productsToShow);
    updateSearchInfo(productsToShow.length, searchTerm, currentCategory);
}