import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpLoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (response.ok) {
        setOtpSent(true);
        setError('');
      } else {
        setError('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.exists) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        } else {
          navigate('/register', { state: { phone } });
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Login with Phone Number</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      ) : (
        <button onClick={handleSendOtp}>Send OTP</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default OtpLoginPage;
