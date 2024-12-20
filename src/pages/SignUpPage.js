import React, { useState } from 'react';
import './SignUpPage.css';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    height: '',
    weight: '',
    packageId: 1, // Default package ID
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debugging
    console.log('Form data:', formData); // Debugging
    console.log('Submitting form data:', formData); // Debugging
  
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      console.log('Response status:', response.status); // Debugging
  
      if (response.ok) {
        setFeedback({ message: 'User created successfully! You can now log in.', type: 'success' });
        setFormData({ name: '', email: '', phone: '', password: '', height: '', weight: '', packageId: 1 });
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Debugging
        setFeedback({ message: `Error: ${errorData.error}`, type: 'error' });
      }
    } catch (error) {
      console.error('Error creating user:', error); // Debugging
      setFeedback({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };
  

  return (
    <div className="container mt-5">
  <h2 className="text-center mb-4">Sign Up</h2>
  {feedback.message && (
    <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
      {feedback.message}
    </div>
  )}
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input
        type="text"
        className="form-control"
        id="phone"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="height" className="form-label">Height</label>
      <input
        type="number"
        className="form-control"
        id="height"
        name="height"
        placeholder="Enter your height"
        value={formData.height}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="weight" className="form-label">Weight</label>
      <input
        type="number"
        className="form-control"
        id="weight"
        name="weight"
        placeholder="Enter your weight"
        value={formData.weight}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
  </form>
</div>

  );
}

export default SignUpPage;
