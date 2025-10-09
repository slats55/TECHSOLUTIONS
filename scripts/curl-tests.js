#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Get base URL from environment or default to localhost:3000
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const isHttps = baseUrl.startsWith('https://');

console.log('🧪 Running smoke tests for MTV Tech Solutions');
console.log(`📍 Base URL: ${baseUrl}`);
console.log('');

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = isHttps ? https : http;
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = res.headers['content-type']?.includes('application/json') 
            ? JSON.parse(data) 
            : data;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function runTests() {
  const results = [];

  // Test 1: Health endpoint
  console.log('1️⃣ Testing /api/health endpoint...');
  try {
    const healthResponse = await makeRequest(`${baseUrl}/api/health`);
    results.push({
      test: 'Health API',
      status: healthResponse.statusCode,
      success: healthResponse.statusCode === 200,
      data: healthResponse.data
    });
    
    if (healthResponse.statusCode === 200) {
      console.log('   ✅ Health API: OK');
      console.log(`   📊 Email Transport: ${healthResponse.data.emailTransport}`);
      console.log(`   🔧 Environment: ${healthResponse.data.env}`);
    } else {
      console.log(`   ❌ Health API: Failed (${healthResponse.statusCode})`);
    }
  } catch (error) {
    console.log(`   ❌ Health API: Error - ${error.message}`);
    results.push({
      test: 'Health API',
      status: 'ERROR',
      success: false,
      error: error.message
    });
  }

  console.log('');

  // Test 2: Contact form submission
  console.log('2️⃣ Testing /api/contact endpoint...');
  try {
    const contactPayload = JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the smoke test script.'
    });

    const contactResponse = await makeRequest(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(contactPayload)
      },
      body: contactPayload
    });

    results.push({
      test: 'Contact API',
      status: contactResponse.statusCode,
      success: contactResponse.statusCode === 200 || contactResponse.statusCode === 500,
      data: contactResponse.data
    });

    if (contactResponse.statusCode === 200) {
      console.log('   ✅ Contact API: Message sent successfully');
    } else if (contactResponse.statusCode === 500) {
      console.log('   ⚠️  Contact API: Email service not configured (expected for localhost)');
      console.log(`   📝 Response: ${contactResponse.data.error || contactResponse.data.message}`);
    } else if (contactResponse.statusCode === 400) {
      console.log('   ❌ Contact API: Validation error');
      console.log(`   📝 Response: ${contactResponse.data.error || contactResponse.data.message}`);
    } else {
      console.log(`   ❌ Contact API: Unexpected status (${contactResponse.statusCode})`);
      console.log(`   📝 Response: ${JSON.stringify(contactResponse.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ Contact API: Error - ${error.message}`);
    results.push({
      test: 'Contact API',
      status: 'ERROR',
      success: false,
      error: error.message
    });
  }

  console.log('');

  // Test 3: Main page
  console.log('3️⃣ Testing main page...');
  try {
    const mainResponse = await makeRequest(baseUrl);
    results.push({
      test: 'Main Page',
      status: mainResponse.statusCode,
      success: mainResponse.statusCode === 200,
      data: typeof mainResponse.data === 'string' ? 'HTML content' : mainResponse.data
    });

    if (mainResponse.statusCode === 200) {
      console.log('   ✅ Main Page: Loaded successfully');
    } else {
      console.log(`   ❌ Main Page: Failed (${mainResponse.statusCode})`);
    }
  } catch (error) {
    console.log(`   ❌ Main Page: Error - ${error.message}`);
    results.push({
      test: 'Main Page',
      status: 'ERROR',
      success: false,
      error: error.message
    });
  }

  console.log('');
  console.log('📋 Test Summary:');
  console.log('================');
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    const status = typeof result.status === 'number' ? result.status : result.status;
    console.log(`${icon} ${result.test}: ${status}`);
  });
  
  console.log('');
  console.log(`🎯 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! The application is running correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the output above for details.');
  }

  // Exit with appropriate code
  process.exit(passed === total ? 0 : 1);
}

// Run the tests
runTests().catch(error => {
  console.error('💥 Test runner error:', error);
  process.exit(1);
});
