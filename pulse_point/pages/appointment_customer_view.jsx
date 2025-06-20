import React, { useEffect, useState } from "react";
import "./appointment_slot.css";

import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function Appointments_customer_view(props) {
  const [doctorname, setDoctorname] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);

  const db = getFirestore();

  // Fetch current slot status from Firestore
  async function fetchSlotStatus() {
    const docId = props.name.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(db, "appointments", docId);
    const docSnap = await getDoc(docRef);
    setDoctorname(docId);

    if (docSnap.exists()) {
      const slots = docSnap.data();
      setSlotStatus(slots[props.time]);
    } else {
      console.log(`❌ No appointment data found for ${doctorname}`);
    }
  }
  useEffect(() => {
    fetchSlotStatus(doctorname);
  }, []);

  async function handle_book() {
    if (!doctorname) return;

    const docRef = doc(db, "appointments", doctorname);

    try {
      await updateDoc(docRef, {
        [props.time]: false, // marking slot as unavailable after booking
      });
      setSlotStatus(false);
      console.log("✅ Slot booked successfully");
    } catch (error) {
      console.error("❌ Failed to update slot:", error);
    }
  }

  return (
    <div id="appointment_div">
      {slotStatus !== null ? (
        <button
          onClick={handle_book}
          style={{
            backgroundColor: slotStatus ? "#AEEA94" : "#FF8383",
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
          {slotStatus
            ? `Book for ₹500  ${props.time}`
            : `Unavailable at ${props.time}`}
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Appointments_customer_view;
