import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  function handle_doc_login() {
    navigate('/doctor-signup');
  }
  const isLoggedIn = localStorage.getItem("pulsePointUser") !== null;
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Meet the Developers</h2>
        <p>
          Hi, we're Ajay Gour and Krishna Mudgal — passionate developers dedicated to building smart, user-friendly healthcare solutions. This project combines our expertise to create meaningful digital experiences.
        </p>
         {!isLoggedIn && (
        <button onClick={handle_doc_login}>Login as doctor</button>
      )}
      </div>

      <div className="footer-section">
        <h2>Contact Info</h2>
        <ul>
          <li>Email: ajaygour0304@gmail.com, krishnamudgal44@gmail.com</li>
          <li>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/ajay-gour-498135296" target="_blank" rel="noreferrer">
              Ajay Gour
            </a>{" "}
            |{" "}
            <a href="https://www.linkedin.com/in/krishna-mudgal-127a44283/" target="_blank" rel="noreferrer">
              Krishna Mudgal
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href="https://github.com/Ajay-go" target="_blank" rel="noreferrer">
              Ajay-go
            </a>{" "}
            |{" "}
            <a href="https://github.com/Krishna-mudgal" target="_blank" rel="noreferrer">
              Krishna Mudgal
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
