import React, { useState } from "react";
import './doctor_login.css'
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase";
import { ImCross } from "react-icons/im";

function Doc_login() {
  const navigate = useNavigate();

  function handleSignupClick() {
    navigate("/doctor-signup");
  };

  function goHome() {
    navigate("/");
  };

  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorsSnapshot = await getDocs(collection(firestore, "doctors"));
      const foundDoc = doctorsSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          (data.username?.toLowerCase() === credentials.usernameOrEmail.toLowerCase() ||
            data.email?.toLowerCase() === credentials.usernameOrEmail.toLowerCase()) &&
          data.password === credentials.password
        );
      });

      if (foundDoc) {
        localStorage.setItem("pulsePointDoctor", JSON.stringify(foundDoc.data()));
        alert("Login successful!");
        navigate("/doctor-home");
      } else {
        alert("Invalid username/email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <>

      <div id="doctor_login_page">
      <header style={{ position: "relative" }}>
        <h2>Pulse Point</h2>
        <button
          onClick={goHome}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "20px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#333",
          }}
          aria-label="Close"
        >
          <ImCross />
        </button>
      </header>

      <main className="login-container">
        <section className="login-box">
          <div className="login-left">
            <h2>Doctor Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="usernameOrEmail">Username or Email:</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <input type="submit" value="Log In" />
              </div>
            </form>
          </div>
          <div className="login-right">
            <h2>Welcome Doctor!</h2>
            <p>Don’t have an account?</p>
            <button onClick={handleSignupClick}>Sign Up</button>
          </div>
        </section>
      </main>
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

export default Doc_login;
