import React, { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseApp from "../firebase"; // Import Firebase initialization

function PhoneAuthPage() {
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [otp, setOtp] = useState(""); // OTP input state
  const [error, setError] = useState(""); // Error message state
  const [message, setMessage] = useState(""); // Success message state
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to track OTP sent status
  const [isLoading, setIsLoading] = useState(false); // Loading state for sending OTP

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // Initialize reCAPTCHA once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal", // Use 'normal' for visible reCAPTCHA
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please refresh and try again.");
          },
        },
        auth
      );
    }
  }, [auth]);

  // Function to send OTP
  const sendOtp = () => {
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsOtpSent(true);
        setMessage("OTP sent successfully! Please enter the code.");
      })
      .catch((error) => {
        setError("Failed to send OTP: " + error.message);
        console.error("Error:", error);
        setIsOtpSent(false);
      })
      .finally(() => setIsLoading(false));
  };

  // Function to verify OTP
  const verifyOtp = () => {
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        setMessage(`Phone verified! Welcome, ${user.phoneNumber}`);
        console.log("User Details:", user);
      })
      .catch((error) => {
        setError("Invalid OTP. Please try again.");
        console.error("OTP Verification Error:", error);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login with Phone Number</h1>
      {!isOtpSent ? (
        <>
          {/* Phone Input */}
          <input
            type="text"
            placeholder="Enter phone number (e.g., +919832150021)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={sendOtp}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
          <div id="recaptcha-container" style={{ marginTop: "10px" }}></div>
        </>
      ) : (
        <>
          {/* OTP Input */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={verifyOtp}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Verify OTP
          </button>
        </>
      )}
      {/* Display error and success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default PhoneAuthPage;
