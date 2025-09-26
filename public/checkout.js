(async () => {
  const publishableKey = '<%= STRIPE_PUBLISHABLE_KEY_PLACEHOLDER %>'; // Cursor: replace at runtime with process.env or template
  // Cursor should replace the string above with the actual env value when building final output.
  
  console.log('Initializing Stripe with key:', publishableKey);
  
  // Update debug info
  const updateDebugInfo = (stripeStatus, buttonStatus) => {
    const stripeStatusEl = document.getElementById('stripe-status');
    const buttonStatusEl = document.getElementById('button-status');
    if (stripeStatusEl) stripeStatusEl.textContent = `Stripe: ${stripeStatus}`;
    if (buttonStatusEl) buttonStatusEl.textContent = `Buttons: ${buttonStatus}`;
  };
  
  if (!publishableKey || publishableKey.includes('PLACEHOLDER')) {
    console.error('Stripe publishable key not configured! Please set STRIPE_PUBLISHABLE_KEY in your .env file');
    updateDebugInfo('Not configured (check .env file)', 'Checkout disabled');
    document.getElementById('checkout-button').disabled = true;
    document.getElementById('checkout-button').textContent = 'Stripe not configured';
    return;
  }
  
  const stripe = Stripe(publishableKey);
  console.log('Stripe initialized successfully');
  updateDebugInfo('Initialized successfully', 'Checking...');

  const checkoutButton = document.getElementById('checkout-button');
  if (!checkoutButton) {
    console.error('Checkout button not found! Make sure you have an element with id="checkout-button"');
    updateDebugInfo('Initialized successfully', 'Checkout button not found');
    return;
  }
  
  updateDebugInfo('Initialized successfully', 'Ready');

  // Add test button handler
  const testButton = document.getElementById('test-button');
  if (testButton) {
    testButton.addEventListener('click', () => {
      alert('Test button works! This confirms basic JavaScript functionality.');
    });
  }

  checkoutButton.addEventListener('click', async () => {
    console.log('Checkout button clicked');
    checkoutButton.disabled = true;
    checkoutButton.textContent = 'Processing...';
    
    try {
      // Example: single T-shirt item
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ name: 'T-shirt', unit_amount: 2000, quantity: 1 }]
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Checkout session created:', data);
      
      if (data.url) {
        // If session.url provided (recommended), redirect directly
        console.log('Redirecting to:', data.url);
        window.location = data.url;
      } else if (data.id) {
        // Fallback to redirectToCheckout by sessionId
        const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
        if (error) {
          console.error('Stripe redirect error:', error);
          checkoutButton.disabled = false;
          checkoutButton.textContent = 'Try again';
        }
      } else {
        console.error('Unexpected response from create-checkout-session', data);
        checkoutButton.disabled = false;
        checkoutButton.textContent = 'Try again';
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      checkoutButton.disabled = false;
      checkoutButton.textContent = 'Try again';
      alert('Error creating checkout session. Please check the console for details.');
    }
  });
})();
