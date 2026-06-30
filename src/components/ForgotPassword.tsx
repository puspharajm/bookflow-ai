import React, { useState } from 'react';
import { motion } from 'motion/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      // Implement actual API call to /api/auth/forgot-password
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Password reset instructions sent to your email');
      } else {
        alert('Error: ' + await response.text());
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitted}
          className="bg-[#FF4F00] text-white rounded-xl py-3 mx-auto w-full"
        >
          Request Password Reset
        </button>
      </form>
      {submitted && <p className="text-gray-500 text-center mt-4">A password reset link has been sent to your email</p>}
    </div>
  );
};
export default ForgotPassword;
