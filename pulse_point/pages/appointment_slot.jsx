import React, { useEffect, useState } from "react";
import './appointment_slot.css';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Appointments(props) {
  const [doctor, setDoctor] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const stored = localStorage.getItem("pulsePointDoctor");
    if (stored) {
      const docObj = JSON.parse(stored);
      setDoctor(docObj);
      fetchSlotStatus(docObj.name);
    } else {
      navigate("/doctor-login");
    }
  }, []);

  async function fetchSlotStatus(doctorName) {
    const docId = doctorName.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(db, "appointments", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const slots = docSnap.data();
      setSlotStatus(slots[props.time]);
    } else {
      console.log(`❌ No appointment data found for ${doctorName}`);
    }
  }

  async function change_status() {
    if (!doctor) return;

    const docId = doctor.name.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(db, "appointments", docId);

    const isAvailable =
      typeof slotStatus === "string"
        ? slotStatus.toLowerCase() === "available"
        : slotStatus === true; // fallback for old boolean

    const newStatus = isAvailable ? "Unavailable" : "Available";

    try {
      await updateDoc(docRef, {
        [props.time]: newStatus,
      });
      setSlotStatus(newStatus);
    } catch (error) {
      console.error("❌ Failed to update slot:", error);
    }
  }

  return (
    <div id="appointment_div">
      {slotStatus !== null ? (
        <button
          onClick={change_status}
          style={{
            backgroundColor:
              (typeof slotStatus === "string" &&
                slotStatus.toLowerCase() === "available") ||
              slotStatus === true
                ? "#AEEA94"
                : "#FF8383",
            color: "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          {props.time} - Status:{" "}
          {(typeof slotStatus === "string" &&
            slotStatus.toLowerCase() === "available")
            ? "Available"
            : (slotStatus === "Unavailable")
            ? 'Unavailable'
            : `Booked`}
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Appointments;
