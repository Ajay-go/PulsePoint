import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "./appointment_slot";
import './doctor_home.css'

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
    <div id="doc_page">
      <div id="doctor_home">
      <h2>Welcome Dr. {doctor.name}!</h2>
      
      <p>"Every patient you treat is a life you touch — your work truly matters."</p>
      <div id="appointment_slots">
        <Appointments time = {'10-am'}/>
        <Appointments time = {'12-am'}/>
        <Appointments time = {'11-am'}/>
        <Appointments time = {'14-pm'}/>
        <Appointments time = {'15-pm'}/>
        <Appointments time = {'16-pm'}/>
        <Appointments time = {'17-pm'}/>
        <Appointments time = {'18-pm'}/>

      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Doc_home;
