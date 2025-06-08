import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Meet the Developers</h2>
        <p>
          Hi, we're Ajay Gour and Krishna Mudgal — passionate developers dedicated to building smart, user-friendly healthcare solutions. This project combines our expertise to create meaningful digital experiences.
        </p>
        <button>Login as doctor</button>
      </div>

      <div className="footer-section">
        <h2>Contact Info</h2>
        <ul>
          <li>Email: ajaygour.dev@gmail.com, krishna.mudgal@example.com</li>
          <li>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/ajay-gour" target="_blank" rel="noreferrer">
              Ajay Gour
            </a>{" "}
            |{" "}
            <a href="https://www.linkedin.com/in/krishna-mudgal" target="_blank" rel="noreferrer">
              Krishna Mudgal
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href="https://github.com/Ajay-go" target="_blank" rel="noreferrer">
              Ajay-go
            </a>{" "}
            |{" "}
            <a href="https://github.com/krishna-mudgal" target="_blank" rel="noreferrer">
              Krishna Mudgal
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;
