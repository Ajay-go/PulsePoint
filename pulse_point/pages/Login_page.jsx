import React, { useState } from 'react';
import './Login_page.css';
import { useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { firestore } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userInput: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  };

  const goHome = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userInput, password } = credentials;

    try {
      const usersRef = collection(firestore, 'users');
      const snapshot = await getDocs(usersRef);

      let matchedUser = null;

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.username === userInput || data.email === userInput) {
          matchedUser = data;
        }
      });

      if (!matchedUser) {
        alert('Username or email is incorrect.');
        return;
      }

      if (matchedUser.password !== password) {
        alert('Wrong password. Please try again.');
        return;
      }

      localStorage.setItem('pulsePointUser', JSON.stringify(matchedUser));
      alert('Login successful!');
      navigate('/');

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
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

      <main className="login-container">
        <section className="login-box">
          <div className="login-left">
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
              <div id='login_data'>
                <label htmlFor="userInput">Username or Email</label>
                <input
                  type="text"
                  id="userInput"
                  placeholder="Enter username or email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div id='login_data'>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
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
            <h2>Welcome to signup page!</h2>
            <p>Don’t have an account?</p>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </section>
      </main>

      <div
        style={{
          backgroundColor: '#f05f70',
          color: 'white',
          textAlign: 'center',
          padding: '10px 0',
          fontSize: '0.9rem',
          width: '100%',
          position: 'relative',
          bottom: '0',
          left: '0',
          borderRadius: '0',
          marginTop: '40px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        &copy; {new Date().getFullYear()} Pulse Point
      </div>
    </>
  );
};

export default LoginPage;
