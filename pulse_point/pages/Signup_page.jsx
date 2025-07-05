import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ImCross } from 'react-icons/im';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../src/firebase';


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

    try {
      if (!verifyButtonClicked) {
        alert("Please verify your email first.");
        return;
      }

      await auth.currentUser?.reload();

      if (!auth.currentUser || !auth.currentUser.emailVerified) {
        alert("Email not verified yet.");
        return;
      }

      const uid = auth.currentUser.uid;

      // 🔍 Check if username already exists
      const usernameDoc = await getDoc(doc(firestore, 'users', username));
      if (usernameDoc.exists()) {
        alert("Username already taken.");
        return;
      }

      // 🔍 Check if email already exists
      const usersSnapshot = await getDocs(collection(firestore, 'users'));
      const emailExists = usersSnapshot.docs.some(doc => doc.data().email === email);
      if (emailExists) {
        alert("Email already in use.");
        return;
      }

      const userData = {
        ...formData,
        uid: uid
      };

      // ✅ Store in Firestore
      await setDoc(doc(firestore, 'users', username), userData);

      localStorage.setItem('pulsePointUser', JSON.stringify(userData));
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

      <div
        style={{
          backgroundColor: '#f05f70',color: 'white',textAlign: 'center',padding: '10px 0',fontSize: '0.9rem',width: '100%',position: 'relative',bottom: '0',left: '0',borderRadius: '0',marginTop: '40px',fontFamily: 'Arial, sans-serif'
        }}
      >
        &copy; {new Date().getFullYear()} Pulse Point
      </div>

    </>
  );
};

export default Signup_page;
