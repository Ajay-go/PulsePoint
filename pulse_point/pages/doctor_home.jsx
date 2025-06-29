import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "./appointment_slot";
import "./doctor_home.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../src/firebase.js";

function Doc_home() {
  const [doctor, setDoctor] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pulsePointDoctor");
    if (stored) {
      const docObj = JSON.parse(stored);
      setDoctor(docObj);
      fetchBookedSlots(docObj.name);
    } else {
      navigate("/doctor-login");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // update every 1 minute

    return () => clearInterval(interval);
  }, []);

  const fetchBookedSlots = async (name) => {
    const docId = name.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(firestore, "appointments", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const slots = docSnap.data();
      const booked = {};
      for (const time in slots) {
        const val = slots[time];
        if (
          typeof val === "string" &&
          val.toLowerCase() !== "available" &&
          val.toLowerCase() !== "unavailable"
        ) {
          booked[time] = val;
        }
      }
      setBookedSlots(booked);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pulsePointDoctor");
    navigate("/");
  };

 const toggleAllSlots = async (status) => {
  const currentHour = new Date().getHours();

  if (currentHour > 10) {
    alert("Cannot make changes after 10 AM");
    return;
  }

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
  } catch (error) {
    console.error("Failed to update slots:", error);
  }
};


  const convertTimeTo24Hr = (timeStr) => {
    const [hour, period] = timeStr.split("-");
    let hourNum = parseInt(hour, 10);
    if (period === "pm" && hourNum !== 12) hourNum += 12;
    if (period === "am" && hourNum === 12) hourNum = 0;
    return hourNum;
  };

  return doctor ? (
    <div id="doc_page">
      <div id="doctor_home">
        <h2>Welcome {doctor.name}!</h2>
        <p className="doc-quote">
          "Every patient you treat is a life you touch — your work truly
          matters."
        </p>

        <div id="toggleall">
          {currentHour <= 10 && (
            <button onClick={() => toggleAllSlots("Unavailable")}>
              Set All Unavailable
            </button>
          )}
        </div>

        <div id="appointment_slots">
          <h3>Available & Unavailable Slots</h3>
          <div className="slots-section">
            <Appointments time="10-am" />
            <Appointments time="11-am" />
            <Appointments time="12-pm" />
            <Appointments time="14-pm" />
            <Appointments time="15-pm" />
            <Appointments time="16-pm" />
            <Appointments time="17-pm" />
            <Appointments time="18-pm" />
          </div>

          {Object.keys(bookedSlots).length > 0 && (
            <div className="appointments-card">
              <h3>Your Appointments for Today</h3>
              <div className="appointments-list">
                {Object.entries(bookedSlots)
                  .sort(
                    (a, b) =>
                      convertTimeTo24Hr(a[0]) - convertTimeTo24Hr(b[0])
                  )
                  .map(([time, patient]) => (
                    <div className="appointment-item" key={time}>
                      <p>
                        <strong>Time:</strong> {time}
                      </p>
                      <p>
                        <strong>Patient:</strong> {patient}
                      </p>
                      <p className="email-note">
                        Check your email for details.
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <button id="logout_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Doc_home;
