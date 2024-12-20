import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseApp from "../firebase"; // Ensure correct path

function PhoneAuthPage() {
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [otp, setOtp] = useState(""); // OTP state
  const [error, setError] = useState(""); // Error message state
  const [message, setMessage] = useState(""); // Success message state
  const auth = getAuth(firebaseApp);

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("reCAPTCHA solved!");
          },
          "expired-callback": () => {
            console.error("reCAPTCHA expired.");
          },
        },
        auth
      );
    }
  }, [auth]);

  // Send OTP
  const sendOtp = () => {
    setError("");
    setMessage("");

    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setMessage("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Failed to send OTP:", error.message);
        setError("Failed to send OTP: " + error.message);
      });
  };

  // Verify OTP
  const verifyOtp = () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
  
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log("User verified successfully:", result.user);
        setMessage("OTP Verified Successfully!");
      })
      .catch((error) => {
        setError("Verification failed: " + error.message);
        console.error("Detailed Error:", error); // Log detailed error for debugging
      });
  };
  

  return (
    <div>
      <h1>Login with Phone Number</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <div id="recaptcha-container"></div>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)} // Update OTP state
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default PhoneAuthPage;
