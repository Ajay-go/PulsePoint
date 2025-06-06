import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { database } from '../src/firebase';
import { ref, set, get, child } from 'firebase/database';
import { ImCross } from 'react-icons/im';


const Signup_page = () => {
  const navigate = useNavigate();

  function handle_login_click() {
    navigate('/login')
  }

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { id, value, name, type } = e.target;
    const key = type === 'radio' ? name : id;
    const val = value;

    setFormData((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = formData;
    const dbRef = ref(database);

    try {
      // Check if username already exists
      const usernameSnapshot = await get(child(dbRef, `users/${username}`));
      if (usernameSnapshot.exists()) {
        alert("Username already taken. Please choose another.");
        return;
      }

      // Check if email is already used
      const allUsersSnapshot = await get(child(dbRef, 'users'));
      if (allUsersSnapshot.exists()) {
        const users = allUsersSnapshot.val();
        const emailExists = Object.values(users).some(user => user.email === email);
        if (emailExists) {
          alert("Email already in use. Please use a different email.");
          return;
        }
      }

      // Save user
      await set(ref(database, `users/${username}`), formData);
      console.log("Data successfully written to Firebase");

      localStorage.setItem('pulsePointUser', JSON.stringify(formData));
      window.dispatchEvent(new Event("userLoginStatusChanged")); // optional: notify UI

      alert("Signup successful! Redirecting to home...");
      navigate('/');
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error saving data. Please try again.");
    }
  };


  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <header style={{ position: 'relative' }}>
        <h2>Pulse Point</h2>
        <button
          onClick={goHome}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '20px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#333'
          }}
          aria-label="Close"
        >
          <ImCross/>

        </button>
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
            <p>Already have an account?</p>
            <button onClick={handle_login_click}>Log In</button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Pulse Point</p>
      </footer>
    </>
  );
};

export default Signup_page;