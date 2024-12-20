{/*import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 50000, // Amount in smallest currency unit (e.g., 50000 paise = 500 INR)
          currency: 'INR',
          receipt: 'receipt123',
        }),
      });
      const order = await response.json();

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Gym App',
        description: 'Membership Plan',
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful!');
          navigate('/payment-confirmation', {
            state: {
              order_id: order.id,
              payment_id: response.razorpay_payment_id,
              amount: order.amount,
            },
          });
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Choose a Membership Plan</h2>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}

export default PaymentPage;*/}
