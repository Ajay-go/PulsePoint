import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../src/firebase';
import { ref, set, get, child } from 'firebase/database';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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
    const { username, email, password } = formData;
    const dbRef = ref(database);

    try {
      // Check username uniqueness
      const usernameSnapshot = await get(child(dbRef, `users/${username}`));
      if (usernameSnapshot.exists()) {
        alert("Username already taken. Please choose another.");
        return;
      }

      // Check email uniqueness
      const allUsersSnapshot = await get(child(dbRef, 'users'));
      if (allUsersSnapshot.exists()) {
        const users = allUsersSnapshot.val();
        const emailExists = Object.values(users).some(user => user.email === email);
        if (emailExists) {
          alert("Email already in use. Please use a different email.");
          return;
        }
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);
      alert("A verification email has been sent. Please verify your email first and then click on OK.");

      // Reload user to update verification status
      await user.reload();

      if (user.emailVerified) {
        // Store user data if verified
        await set(ref(database, `users/${username}`), formData);
        localStorage.setItem('pulsePointUser', JSON.stringify(formData));
        alert("Email verified and signup successful!");
      } else {
        // Email not verified → delete user from Auth
        await user.delete();
        alert("Email not verified. Signup canceled. Redirecting to home.");
      }

      navigate('/');
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert("Signup failed: " + error.message);
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
              <div id='user_data'>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your name" required onChange={handleChange} />
              </div>
              <div id='user_data'>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Choose a username" required onChange={handleChange} />
              </div>
              <div id='user_data'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleChange} />
              </div>
              <div id='user_data'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" required onChange={handleChange} />
              </div>
              <div id='user_data'>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" required onChange={handleChange} />
              </div>
              
              <div id='submit_form'>
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