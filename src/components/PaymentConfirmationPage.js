import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentConfirmationPage() {
  const location = useLocation();
  const { order_id, payment_id, amount } = location.state || {};

  return (
    <div>
      <h2>Payment Confirmation</h2>
      <p>Order ID: {order_id}</p>
      <p>Payment ID: {payment_id}</p>
      <p>Amount: ₹{amount / 100}</p>
    </div>
  );
}

export default PaymentConfirmationPage;
