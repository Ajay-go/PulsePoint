import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./appointment_success.css";

function Appointment_success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, time, location: clinicLocation } = location.state || {};

  const doctorName = name?.replace(/_/g, " ") || "Doctor";

  return (
    <>
      <div className="success-container">
        <div className="success-card">
          <h2 className="success-title">🎉 Appointment Confirmed!</h2>
          <p className="success-message">
            Thank you for booking with <strong>Pulse Point</strong>.<br />
            Your appointment with <strong>{doctorName}</strong> has been successfully scheduled.
          </p>

          <div className="success-details">
            <p>⏰ <strong>Time:</strong> {time}</p>
            <p>📍 <strong>Location:</strong> {clinicLocation}</p>
            <p>For more information, refer to your email.</p>
          </div>

          <p className="success-closing">
            We look forward to seeing you!<br />
            Wishing you good health and happiness. 🌿
          </p>

          <button className="back-button" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#f05f70',color: 'white',textAlign: 'center',padding: '10px 0',fontSize: '0.9rem',width: '100%',position: 'relative',bottom: '0',left: '0',borderRadius: '0',marginTop: '40px',fontFamily: 'Arial, sans-serif'
        }}
      >
        &copy; {new Date().getFullYear()} Pulse Point
      </div>
    </>
  );
}

export default Appointment_success;