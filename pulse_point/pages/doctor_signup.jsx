import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './doctor_signup.css';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { firestore } from "../src/firebase";
import { ImCross } from "react-icons/im";

function Doc_signup() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/doctor-login');
  };

  const goHome = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    Education: "",
    Experience: "",
    Fees: "",
    Speciality: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doctorsSnapshot = await getDocs(collection(firestore, "doctors"));

      const duplicate = doctorsSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          data.username?.toLowerCase().trim() === formData.username.toLowerCase().trim() ||
          data.email?.toLowerCase().trim() === formData.email.toLowerCase().trim()
        );
      });

      if (duplicate) {
        alert("Username or Email already exists. Please use a different one.");
        return;
      }

      const doctorRef = doc(firestore, "doctors", formData.username);
      await setDoc(doctorRef, formData);

      localStorage.setItem("pulsePointDoctor", JSON.stringify(formData));
      alert("Doctor signed up successfully!");
      navigate("/doctor-home");

    } catch (error) {
      console.error("Error signing up doctor:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div id="doctor_form">

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

      <main className="signup-container">
        <section className="signup-box">
          <div className="signup-left">
            <h2>Sign Up as Doctor</h2>
            <form onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "username", label: "Username", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "password", label: "Password", type: "password" },
                { id: "Education", label: "Education", type: "text" },
                { id: "Experience", label: "Experience (years)", type: "number" },
                { id: "Fees", label: "Fees", type: "number" },
                { id: "Speciality", label: "Speciality", type: "text" },
                { id: "location", label: "Location", type: "text" }
              ].map(({ id, label, type }) => (
                <div key={id} id="user_data">
                  <label htmlFor={id}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                    required
                  />
                </div>
              ))}

              <div id="submit_form">
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>

          <div className="signup-right">
            <p>Already have an account?</p>
            <button onClick={handleLoginClick}>Doctor Login</button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Pulse Point</p>
      </footer>
    </div>
  );
}

export default Doc_signup;
