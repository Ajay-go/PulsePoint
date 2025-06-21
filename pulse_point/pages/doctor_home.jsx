import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "./appointment_slot";
import "./doctor_home.css";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../src/firebase.js";

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

  // Reusable function to set all slots to true or false
  async function toggleAllSlots(status) {
    if (!doctor) return;

    const updatedSlots = {
      "10-am": status,
      "11-am": status,
      "12-pm": status,
      "14-pm": status,
      "15-pm": status,
      "16-pm": status,
      "17-pm": status,
      "18-pm": status,
    };

    const docId = doctor.name.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(firestore, "appointments", docId);

    try {
      await updateDoc(docRef, updatedSlots);
      window.location.reload();
      console.log(`All slots updated to ${status}`);
    } catch (error) {
      console.error("Failed to update slots:", error);
    }
  }

  return doctor ? (
    <div id="doc_page">
      <div id="doctor_home">
        <h2>Welcome Dr. {doctor.name}!</h2>
        <p>
          "Every patient you treat is a life you touch — your work truly
          matters."
        </p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div id="toggleall">
            <button onClick={() => toggleAllSlots(false)}>
              Set All Unavailable
            </button>
            <button onClick={() => toggleAllSlots(true)}>
              Set All Available
            </button>
          </div>
        </div>
        <div id="appointment_slots">
          <Appointments time={"10-am"} />
          <Appointments time={"11-am"} />
          <Appointments time={"12-pm"} />
          <Appointments time={"14-pm"} />
          <Appointments time={"15-pm"} />
          <Appointments time={"16-pm"} />
          <Appointments time={"17-pm"} />
          <Appointments time={"18-pm"} />
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Doc_home;
