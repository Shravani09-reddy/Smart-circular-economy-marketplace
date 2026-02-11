# 🧪 Testing Guide - Product Lifecycle & Customer Tracking

## Quick Test Scenarios

### Test 1: Create Product with Complete Lifecycle Information

1. **Open the application** in your browser
2. **Register/Login** with test credentials
3. **Select "Seller" role**
4. **Add a new product** with these details:

```
Product Name: Eco-Friendly Bamboo Water Bottle
Description: Sustainable reusable water bottle made from bamboo
Price: 599
Category: Bamboo
Eco Rating: 5
Carbon Footprint: 0.5

Manufacturing Details (WHO, WHEN, WHERE):
- Manufacturer: GreenLife Products Ltd
- Manufacturing Location: Bangalore, Karnataka, India
- Manufacture Date: [Today's date]
- Expiry Date: [1 year from today]

Usage Instructions (HOW TO USE):
Wash before first use. Hand wash only with mild soap. Do not microwave or freeze. Not dishwasher safe. Perfect for water, juice, and cold beverages. Keep away from direct heat.

Recycling Information (HOW TO RECYCLE):
100% biodegradable bamboo material. At end of life, remove metal cap and compost the bamboo body. Metal parts can be recycled separately. Return to manufacturer for proper disposal. Decomposes naturally in 6-12 months.
```

5. **Upload a product image**
6. **Click "Add Product"**
7. **Note the unique barcode ID** shown in the success message (e.g., ECO-20251113-45678)

**Expected Result:**
✅ Product created successfully
✅ Unique barcode generated
✅ Success message shows barcode ID
✅ Product appears in "Your Products" list

---

### Test 2: Scan Barcode and View Complete Information

#### Option A: Using Product Detail View

1. **Click "View Details"** on your newly created product
2. **Observe the QR code** displayed
3. **Take a screenshot** of the QR code
4. **Click the 📷 camera button** in navigation
5. **Select "Upload Image"**
6. **Upload the screenshot**

**Expected Result:**
✅ QR code scanned successfully
✅ Complete product information displayed:
  - Basic info (name, description, price)
  - WHO: Manufacturer name
  - WHERE: Manufacturing location
  - WHEN: Manufacture date
  - HOW TO USE: Usage instructions
  - HOW TO RECYCLE: Recycling information
  - Sustainability metrics
  - Seller contact info

#### Option B: Manual Barcode Entry

1. **Click the 📷 camera button**
2. **Click "Upload Image"** (or wait for scan to fail)
3. **Enter barcode ID manually** (e.g., ECO-20251113-45678)
4. **Click "Search Product"**

**Expected Result:**
✅ Product found by barcode ID
✅ All information displayed correctly

---

### Test 3: Place Order and Track Customer Details

1. **Logout** and **login again** (or use different browser)
2. **Select "Buyer" role**
3. **Find your product** in the product grid
4. **Click "Add to Cart"**
5. **Click cart icon** (🛒)
6. **Click "Checkout"**
7. **Enter delivery address:**
```
123 Green Street
Eco Colony, Mumbai
Maharashtra - 400001
```
8. **Select payment method** (Cash on Delivery)
9. **Click "Place Order"**

**Expected Result:**
✅ Order placed successfully
✅ Order confirmation message shows:
  - Order ID
  - Total amount
  - Delivery address
  - Payment method
  - Order date and time
  - Expected delivery date
✅ Customer automatically added to database

---

### Test 4: Manage Customer Orders

1. **Logout** and **login as seller**
2. **Select "Seller" role**
3. **Click 👥 Customer Management button** in navigation
4. **Find the customer** who placed the order
5. **Click "📦 Orders"** button

**Expected Result:**
✅ Customer orders modal opens
✅ Order details displayed:
  - Customer information (name, email, phone, address)
  - Order summary (total, payment method)
  - Complete timeline showing "Order Placed" with timestamp
  - Expected delivery date
  - Delivery status dropdown

---

### Test 5: Update Delivery Status and Track Timeline

1. **In the customer orders view**
2. **Change delivery status** through dropdown:
   - Select "Processing"
   - Wait for confirmation
   - Select "Shipped"
   - Wait for confirmation
   - Select "Out for Delivery"
   - Wait for confirmation
   - Select "Delivered"

**Expected Result:**
✅ Each status change:
  - Shows confirmation message with timestamp
  - Updates the timeline
  - Adds entry to status history
✅ When "Delivered" is selected:
  - Actual delivery date is recorded
  - Product received confirmation prompt appears

---

### Test 6: Confirm Product Received

1. **After setting status to "Delivered"**
2. **Product received confirmation dialog appears**
3. **Click "OK"** to confirm customer received product

**Expected Result:**
✅ Product received confirmation recorded
✅ Product received date saved
✅ Timeline updated with:
  - "Product Received by Customer" entry
  - Timestamp of confirmation
  - Customer confirmation note
✅ Complete order summary displayed:
  - Customer details maintained
  - Order date
  - Delivery date
  - Received date
✅ Feedback form appears automatically

---

### Test 7: View Complete Order Timeline

1. **In customer orders view**
2. **Observe the timeline section**

**Expected Result:**
✅ Timeline shows all stages:
  - ✓ Order Placed (with date/time)
  - ✓ Processing (with date/time)
  - ✓ Shipped (with date/time)
  - ✓ Out for Delivery (with date/time)
  - ✓ Delivered (with date/time)
  - 🎉 Product Received (with date/time)
✅ Each entry shows:
  - Status name
  - Timestamp
  - Notes (if any)
✅ Visual indicators:
  - Green checkmarks for completed
  - Special styling for "Product Received"

---

### Test 8: Customer Feedback

1. **After product received confirmation**
2. **Feedback form appears automatically**
3. **Fill in the feedback:**
   - Product Quality: 5 stars
   - Delivery Experience: 5 stars
   - Value for Money: 4 stars
   - Overall Rating: 5 stars
   - Comments: "Excellent product! Very satisfied with the quality and delivery."
   - Recommendation: "Yes, definitely!"
4. **Click "Submit Feedback"**

**Expected Result:**
✅ Feedback submitted successfully
✅ Thank you message displayed
✅ Feedback stored with order
✅ Feedback visible in order details
✅ Shows all ratings and comments

---

### Test 9: Export Customer Data

1. **In Customer Management page**
2. **Click "📥 Export" button**

**Expected Result:**
✅ JSON file downloads
✅ Contains all customer data
✅ Includes order history
✅ Properly formatted

---

### Test 10: Search and Filter

#### Search Products:
1. **As buyer**, use search bar
2. **Type product name** or description
3. **Observe filtered results**

#### Search Customers:
1. **In Customer Management**
2. **Type customer name, email, or phone**
3. **Observe filtered results**

**Expected Result:**
✅ Search works in real-time
✅ Results update as you type
✅ Accurate filtering

---

## Complete Test Flow Summary

### End-to-End Test (All Features):

```
1. Seller creates product with complete lifecycle info
   ↓
2. System generates unique barcode
   ↓
3. Barcode contains WHO, WHEN, WHERE, HOW information
   ↓
4. Buyer scans barcode to view all details
   ↓
5. Buyer places order
   ↓
6. Customer details captured and maintained
   ↓
7. Order timeline tracking begins
   ↓
8. Seller updates delivery status
   ↓
9. Each status change recorded with timestamp
   ↓
10. Product delivered
    ↓
11. Product received confirmation
    ↓
12. Complete timeline maintained
    ↓
13. Customer feedback collected
    ↓
14. All data preserved for future reference
```

---

## Verification Checklist

### Product Creation:
- [ ] Unique barcode generated
- [ ] All fields saved correctly
- [ ] QR code displays properly
- [ ] Product appears in seller's list

### Barcode Scanning:
- [ ] Camera scan works
- [ ] Image upload works
- [ ] Manual entry works
- [ ] All information displays correctly

### Customer Tracking:
- [ ] Customer details captured
- [ ] Order information complete
- [ ] Timeline tracking works
- [ ] Status updates recorded

### Product Receipt:
- [ ] Delivery confirmation works
- [ ] Receipt timestamp recorded
- [ ] Timeline updated correctly
- [ ] Customer details maintained

### Information Display:
- [ ] WHO (manufacturer) shown
- [ ] WHEN (dates) displayed
- [ ] WHERE (location) visible
- [ ] HOW TO USE instructions clear
- [ ] HOW TO RECYCLE info complete

---

## Common Issues and Solutions

### Issue: QR Code Not Scanning
**Solution:** 
- Use image upload instead
- Try manual barcode entry
- Ensure good lighting
- Check camera permissions

### Issue: Customer Not Added
**Solution:**
- Check if email already exists
- Verify all required fields filled
- Check browser console for errors

### Issue: Timeline Not Updating
**Solution:**
- Refresh the page
- Check if status was actually changed
- Verify data is being saved (check localStorage)

### Issue: Product Received Not Confirming
**Solution:**
- Ensure order status is "Delivered" first
- Click OK on confirmation dialog
- Check if confirmation was already done

---

## Performance Testing

### Load Test:
1. Add 10+ products
2. Create 5+ customers
3. Place 10+ orders
4. Update multiple statuses
5. Verify system remains responsive

### Data Persistence:
1. Add data
2. Refresh page
3. Verify data persists
4. Close and reopen browser
5. Verify data still there

---

## Browser Testing

Test on:
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Edge (Desktop)
- [ ] Safari (Desktop)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)

---

## Success Criteria

✅ All products get unique barcodes
✅ Barcodes contain complete lifecycle information
✅ Customer details maintained throughout order process
✅ Order timeline tracked with timestamps
✅ Product received confirmation works
✅ All WHO, WHEN, WHERE, HOW information accessible
✅ System is user-friendly and intuitive
✅ Data persists across sessions
✅ No errors in browser console

---

**Happy Testing! 🎉**

If you encounter any issues, check the browser console for error messages and refer to the PRODUCT_LIFECYCLE_GUIDE.md for detailed documentation.
