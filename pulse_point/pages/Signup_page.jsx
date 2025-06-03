import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { id, value, name, type, checked } = e.target;
    const key = type === 'radio' ? name : id;
    const val = type === 'radio' ? value : value;

    setFormData((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('pulsePointUser', JSON.stringify(formData));
    alert("Signup successful! Your data has been saved.");
  };

  const goToLogin = () => {
    window.location.href = 'login.html';
  };

  return (
    <>
      <header>
        <h2>Pulse Point</h2>
      </header>

      <main className="signup-container">
        <section className="signup-box">
          <div className="signup-left">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" placeholder="Enter your name" required onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Choose a username" required onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Create a password" required onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" required onChange={handleChange} />
              </div>
              <fieldset>
                <legend>Select your gender</legend>
                <div className="gender-option">
                  <label htmlFor="user-gender-male">Male</label>
                  <input type="radio" name="gender" id="user-gender-male" value="male" onChange={handleChange} />
                </div>
                <div className="gender-option">
                  <label htmlFor="user-gender-female">Female</label>
                  <input type="radio" name="gender" id="user-gender-female" value="female" onChange={handleChange} />
                </div>
                <div className="gender-option">
                  <label htmlFor="user-gender-others">Others</label>
                  <input type="radio" name="gender" id="user-gender-others" value="others" onChange={handleChange} />
                </div>
              </fieldset>
              <div>
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>

          <div className="signup-right">
            <h2>Welcome to login</h2>
            <p>Don’t have an account?</p>
            <button onClick={goToLogin}>Log In</button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Pulse Point</p>
      </footer>
    </>
  );
};

export default SignupPage;
