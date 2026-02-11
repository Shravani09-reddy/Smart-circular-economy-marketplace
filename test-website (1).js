// Simple test script to verify website functionality
const http = require('http');

// Test if server is running
function testServer() {
    const options = {
        hostname: 'localhost',
        port: 3002,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`✅ Server is running! Status: ${res.statusCode}`);
        console.log(`🌐 Website available at: http://localhost:3002`);
        console.log(`📱 Test the following features:`);
        console.log(`   - Registration and Login`);
        console.log(`   - Product browsing with categories`);
        console.log(`   - Search functionality`);
        console.log(`   - Voice assistant`);
        console.log(`   - Multilingual support`);
        console.log(`   - Barcode scanning simulation`);
        console.log(`   - Shopping cart and checkout`);
        console.log(`   - Eco-ratings and carbon footprint`);
        console.log(`   - Feedback system`);
        console.log(`   - Chatbot support`);
    });

    req.on('error', (err) => {
        console.log(`❌ Server not running. Please start with: npm start`);
        console.log(`Error: ${err.message}`);
    });

    req.end();
}

// Run test
testServer();