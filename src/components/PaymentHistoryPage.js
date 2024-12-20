import React, { useEffect, useState } from 'react';

function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem('token'); // Assuming user token is stored in localStorage

      try {
        const response = await fetch('http://localhost:3000/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payment records:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.order_id}</td>
              <td>{payment.payment_id}</td>
              <td>{payment.amount / 100}</td>
              <td>{payment.currency}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//export default PaymentHistoryPage;
