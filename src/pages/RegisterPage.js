import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const phone = location.state?.phone || '';

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, email, location: locationInput }),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/defaultpage');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Complete Your Registration</h2>
      <p>Phone: {phone}</p>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
