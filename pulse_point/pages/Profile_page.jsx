import React, { useEffect, useState } from 'react';
import './Profile_page.css';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('pulsePointUser');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  function handleGoHome() {
    navigate('/');
  };

  function handleLogin(){
    navigate('/login');
  };

  function handleSignup(){
    navigate('/signup');
  };

    function handleLogout() {
    localStorage.removeItem('pulsePointUser');
    setUserData(null);
    navigate('/');
  };

  return (
    <>

      <div className="profile-container">
        <header style={{ position: 'relative' }}>
          <h2>Pulse Point</h2>
          <button
            onClick={handleGoHome}
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

        <main>
          {userData ? (
            <div className="profile-box">
              <h3>User Profile</h3>
              <p><strong>Full Name:</strong> {userData.fullName}</p>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <button onClick={handleGoHome}>Go to Home</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="no-user-box">
              <h3>No user data found</h3>
              <p>Please log in or sign up first.</p>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignup}>Sign Up</button>
            </div>
          )}
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
};

export default ProfilePage;
