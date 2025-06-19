import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Doc_home() {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pulsePointDoctor");
    if (stored) {
      setDoctor(JSON.parse(stored));
    } else {
      navigate("/doctor-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("pulsePointDoctor");
    navigate("/");
  };

  return doctor ? (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome Dr. {doctor.name}!</h2>
      <p>Speciality: {doctor.Speciality}</p>
      <p>Location: {doctor.location}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Doc_home;
