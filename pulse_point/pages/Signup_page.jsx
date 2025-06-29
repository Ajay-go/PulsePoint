import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../src/firebase';
import { ref, set, get, child } from 'firebase/database';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ImCross } from 'react-icons/im';

const Signup_page = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  });

  const [verifyButtonClicked, setVerifyButtonClicked] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [emailAlreadySent, setEmailAlreadySent] = useState(false);


  const handleChange = (e) => {
    const { id, value, name, type } = e.target;
    const key = type === 'radio' ? name : id;
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleEmailVerify = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      alert("Please enter both email and password before verification.");
      return;
    }

    if (verifyButtonClicked) {
      setEmailAlreadySent(true);
      setTimeout(() => setEmailAlreadySent(false), 5000);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      alert("Verification email sent.");
      setVerifyButtonClicked(true);
      setShowVerificationMessage(true);

      setTimeout(() => {
        setShowVerificationMessage(false);
      }, 5000);
    } catch (error) {
      alert("Error sending verification email: " + error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = formData;
    const dbRef = ref(database);

    try {
      if (!verifyButtonClicked) {
        alert("Please verify your email first.");
        return;
      }

      await auth.currentUser.reload();
      if (!auth.currentUser.emailVerified) {
        alert("Email not verified yet. Please verify before signing up.");
        return;
      }

      const usernameSnapshot = await get(child(dbRef, `users/${username}`));
      if (usernameSnapshot.exists()) {
        alert("Username already taken. Please choose another.");
        return;
      }

      const allUsersSnapshot = await get(child(dbRef, 'users'));
      if (allUsersSnapshot.exists()) {
        const users = allUsersSnapshot.val();
        const emailExists = Object.values(users).some(user => user.email === email);
        if (emailExists) {
          alert("Email already in use. Please use a different email.");
          return;
        }
      }

      await set(ref(database, `users/${username}`), formData);
      localStorage.setItem('pulsePointUser', JSON.stringify(formData));
      alert("Signup successful!");
      navigate('/');
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  function handle_login_click(){
    navigate('/login');
  };

  function goHome(){
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
          <ImCross />
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
                <div className="email-verify-group">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <button type="button" onClick={handleEmailVerify}>
                    Verify
                  </button>
                </div>
                {showVerificationMessage && !emailAlreadySent && (
                  <p className="verification-message">
                    Please verify your email first and then proceed.
                  </p>
                )}

                {emailAlreadySent && (
                  <p className="verification-message">
                    Verification email already sent. Please check your inbox.
                  </p>
                )}
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
