const fetch = require('node-fetch');

async function testContactAPI() {
    const testData = {
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        subject: "Test Inquiry",
        message: "This is a test message to verify the contact form API is working correctly."
    };

    try {
        console.log('Testing contact form API...');
        console.log('Sending test data:', testData);

        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        console.log('Response status:', response.status);
        console.log('Response body:', result);

        if (response.ok && result.success) {
            console.log('✅ Contact form API test PASSED');
            console.log('Message ID:', result.messageId);
        } else {
            console.log('❌ Contact form API test FAILED');
            console.log('Errors:', result.errors);
        }

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.log('Make sure the server is running on http://localhost:3000');
    }
}

// Test health endpoint
async function testHealthAPI() {
    try {
        console.log('\nTesting health endpoint...');
        
        const response = await fetch('http://localhost:3000/api/health');
        const result = await response.json();

        console.log('Health check response:', result);

        if (response.ok && result.status === 'OK') {
            console.log('✅ Health check PASSED');
        } else {
            console.log('❌ Health check FAILED');
        }

    } catch (error) {
        console.error('❌ Health check failed:', error.message);
    }
}

// Run tests
async function runTests() {
    console.log('🚀 Starting API tests...\n');
    
    await testHealthAPI();
    await testContactAPI();
    
    console.log('\n✨ Tests completed!');
}

runTests(); 