# EcoMarket - Sustainable E-Commerce Platform

A comprehensive multi-role e-commerce website with **complete product lifecycle tracking**, unique barcode system, customer order management, sustainability features, multilingual support, voice assistant, and chatbot.

## 🌟 NEW: Complete Product Lifecycle & Customer Tracking System

Every product now has a **unique barcode** containing complete information about:
- **WHO** made it (manufacturer details)
- **WHEN** it was made (manufacturing date)
- **WHERE** it was made (location)
- **HOW** to use it (usage instructions)
- **HOW** to recycle it (recycling information)

Plus **complete customer order tracking** from order placement to product receipt confirmation!

## Features

### 🔐 Authentication
- User registration with full details (name, email, password, phone, address)
- Secure login system
- Persistent user sessions

### 👥 Three User Roles

#### 🛒 Buyer
- Browse unlimited products across categories
- Search functionality for products
- Filter by categories (Plastic, Wood, Steel, Electric, Bamboo, Metals)
- View detailed product information
- Add products to cart
- Adjust quantities in cart
- Checkout with delivery address
- Multiple payment methods (Cash on Delivery, Online Payment)
- Order confirmation messages
- Feedback system

#### 🏪 Seller
- Add new products with images
- Set product prices in Indian Rupees (₹)
- Add product details:
  - Name, description, category
  - Eco-rating (1-5 stars)
  - Carbon footprint
  - Manufacturer information
  - Manufacturing location and date
  - Expiry date
  - Usage instructions
  - Recycling information
- Mark products as available for rent
- View and manage all listed products
- Delete products

#### 🔄 Renter
- Browse products available for rent
- View rental prices per day
- Search rental products
- Rent products for specified duration
- Contact product owners

### 🌍 Sustainability Features
- **Eco-Ratings**: Every product displays its environmental rating (1-5 stars)
- **Carbon Footprint**: Shows CO₂ emissions for each product
- **Recycling Information**: Details on how to recycle products
- **Environmental Impact**: Helps users make eco-conscious decisions

### 📱 Unique Product Barcodes (QR Codes) - ENHANCED!
Every product gets a **unique barcode ID** in the format: `ECO-YYYYMMDD-XXXXX`

**Barcode Features:**
- Each product has a unique scannable QR code
- Scan using camera or upload barcode image
- Manual barcode ID search option
- Complete product lifecycle information on scan

**Complete Information Available via Barcode Scan:**

#### WHO - Manufacturing & Seller Details
- ✅ Manufacturer name (who made it)
- ✅ Seller name, email, phone (who is selling it)

#### WHEN - Timeline Information
- ✅ Manufacturing date (when it was made)
- ✅ Expiry date (when it expires)
- ✅ Product creation date (when added to system)
- ✅ Last updated timestamp

#### WHERE - Location Details
- ✅ Manufacturing location (where it was made)
- ✅ Manufacturer facility details

#### HOW - Usage & Recycling
- ✅ **HOW TO USE:** Complete usage instructions
- ✅ **HOW TO RECYCLE:** Detailed recycling information
- ✅ **HOW IT'S MADE:** Manufacturing process details
- ✅ Safety warnings and best practices

#### Additional Information
- ✅ Product name, description, category, price
- ✅ Eco-rating (1-5 stars) and environmental impact
- ✅ Carbon footprint (kg CO₂)
- ✅ Sustainability metrics

### 👥 Customer Order Management - NEW!
Complete customer tracking system with order lifecycle management:

**Customer Details Maintained:**
- ✅ Full name, email, phone, address
- ✅ Order history with all orders
- ✅ Total orders count
- ✅ Last order date
- ✅ Registration and update timestamps

**Order Timeline Tracking:**
1. **Order Placed** - Customer places order with timestamp
2. **Processing** - Order being prepared
3. **Shipped** - Package dispatched
4. **Out for Delivery** - On the way to customer
5. **Delivered** - Package delivered with actual delivery date
6. **Product Received** - Customer confirms receipt ⭐ NEW!

**Features:**
- 👥 Customer Management button in navigation
- Complete customer database with search
- View all orders for each customer
- Update delivery status with timestamps
- Product received confirmation system
- Complete timeline visualization
- Status history tracking
- Customer feedback collection
- Export customer data

**Product Received Confirmation:**
- Automatic prompt when order is delivered
- Records exact date/time customer received product
- Maintains complete order lifecycle
- Shows in timeline with special indicator
- Triggers feedback collection

### 🌐 Multilingual Support
Available in 7 languages:
- English
- हिंदी (Hindi)
- ಕನ್ನಡ (Kannada)
- తెలుగు (Telugu)
- اردو (Urdu)
- മലയാളം (Malayalam)
- தமிழ் (Tamil)

### 🎤 Voice Assistant
- Voice command support using Web Speech API
- Commands include:
  - "Search [product name]"
  - "Open cart"
  - "Switch to buyer/seller/renter"
- Voice feedback for actions

### 💬 Chatbot
- Interactive chat assistant
- Answers questions about:
  - Products and categories
  - Eco-ratings and sustainability
  - Payment methods
  - How to use the platform
  - Renting and selling

### 💳 Payment Methods
- Cash on Delivery (COD)
- Online Payment (with card details form)

### 📦 Additional Features
- Product categories for easy navigation
- Shopping cart with quantity management
- Order confirmation with details
- Customer feedback collection
- Seller contact information display
- Responsive design
- Image upload for products
- Price display in Indian Rupees (₹)

## How to Use

### 1. Open the Application
Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)

### 2. Register/Login
- Click "Register" to create a new account
- Fill in all required details
- Login with your credentials

### 3. Select Your Role
Choose from:
- **Buyer**: To shop for products
- **Seller**: To list and sell products
- **Renter**: To rent products

### 4. Start Using!

#### As a Buyer:
1. Browse products or use the search bar
2. Filter by category
3. Click on products to view details and scan QR codes
4. Add items to cart
5. Proceed to checkout
6. Enter delivery address
7. Choose payment method
8. Place order
9. Provide feedback

#### As a Seller:
1. Fill in the product form
2. Upload product image
3. Add all product details including eco-rating
4. Optionally mark as available for rent
5. Submit to list the product
6. Manage your products

#### As a Renter:
1. Browse rental products
2. Search for specific items
3. Click "Rent Now"
4. Specify rental duration
5. Confirm rental

### 5. Use Voice Assistant
- Click the 🎤 microphone button
- Speak your command
- Wait for voice feedback

### 6. Use Chatbot
- Click the 💬 chat button
- Type your questions
- Get instant responses

### 7. Scan Product Barcodes
- Click the 📷 camera button in the navigation bar
- Choose to use camera or upload barcode image
- Point camera at QR code and capture
- Or enter barcode ID manually (e.g., ECO-20251113-45678)
- View complete product lifecycle information:
  - WHO made it
  - WHEN it was made
  - WHERE it was made
  - HOW to use it
  - HOW to recycle it

### 8. Manage Customers (Sellers)
- Click the 👥 Customer Management button
- View all customers who ordered from you
- Search customers by name, email, or phone
- Click "Orders" to view customer's order history
- See complete order timeline
- Update delivery status
- Confirm product received
- Collect customer feedback
- Export customer data

### 8. Change Language
- Use the language selector in the navigation bar
- Select your preferred language

## Technical Details

### Technologies Used
- **HTML5**: Structure
- **CSS3**: Styling with modern layouts
- **JavaScript (ES6+)**: Application logic
- **LocalStorage**: Data persistence
- **Web Speech API**: Voice recognition and synthesis
- **QRCode.js**: QR code generation
- **jsQR**: QR code scanning and decoding
- **MediaDevices API**: Camera access for scanning
- **FileReader API**: Image upload handling

### Data Storage
All data is stored in browser's LocalStorage:
- User accounts
- Products
- Shopping cart
- Orders
- Current session

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (voice features may vary)

## Security Notes
- This is a demo application using LocalStorage
- For production, implement:
  - Backend server with database
  - Proper authentication (JWT, OAuth)
  - Encrypted password storage
  - Secure payment gateway integration
  - HTTPS protocol

## Future Enhancements
- Backend API integration
- Real payment gateway
- SMS/Email notifications
- Order tracking
- Product reviews and ratings
- Wishlist functionality
- Advanced search filters
- Product recommendations
- Admin dashboard
- Analytics and reports

## Support
For questions or issues, use the in-app chatbot or voice assistant!

---

**EcoMarket** - Shopping for a Sustainable Future 🌱
