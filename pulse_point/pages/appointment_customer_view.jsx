import React, { useEffect, useState } from "react";
import "./appointment_slot.css";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

function Appointments_customer_view(props) {
  const [doctorname, setDoctorname] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);

  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchSlotStatus = async () => {
      const docId = props.name.replace(/\s+/g, "_").replace(/\./g, "");
      setDoctorname(docId);

      const docRef = doc(db, "appointments", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const slots = docSnap.data();
        setSlotStatus(slots[props.time]);
      } else {
        console.log(`❌ No appointment data found for ${docId}`);
      }
    };

    fetchSlotStatus();
  }, [props.name, props.time]);

  async function handle_book() {
    if (!doctorname) return;

    const docId = props.name.replace(/\s+/g, "_").replace(/\./g, "");
    const docRef = doc(db, "appointments", docId);
    const userData = JSON.parse(localStorage.getItem("pulsePointUser"));

    try {
      if (!userData || !userData.fullName) {
        alert("User not logged in or missing name.");
        return;
      }

      // ✅ Save patient name in slot
      await updateDoc(docRef, {
        [props.time]: userData.fullName,
      });

      setSlotStatus(userData.fullName);

      // ✅ Fetch doctor data
      const doctorDoc = await getDoc(doc(db, "pulse_point", doctorname));
      const doctorData = doctorDoc.exists() ? doctorDoc.data() : null;

      console.log("👤 User Data:", userData);
      console.log("🧑‍⚕️ Doctor Data:", doctorData);

      if (
        !userData.email ||
        !doctorData ||
        !doctorData.name ||
        !doctorData.email
      ) {
        alert("Missing email info. Cannot send confirmation.");
        return;
      }

      // ✅ Email to User
      await emailjs.send(
        "service_1aii1bd",
        "template_ji2bk1i",
        {
          to_name: userData.fullName,
          email: userData.email,  // NOT to_email
          doctor_name: doctorData.name,
          appointment_time: props.time,
          location: doctorData.location || "Clinic",
          fees: doctorData.Fees || "500",
        },
        "zMHW8M2G0hFh7NHFa"
      );

      // ✅ Email to Doctor
      await emailjs.send(
        "service_1aii1bd",
        "template_2suvgdp",
        {
          to_name: doctorData.name,
          email: doctorData.email, // ✅ USE "email", NOT "to_email"
          patient_name: userData.fullName,
          appointment_time: props.time,
          location: doctorData.location || "Clinic",
        },
        "zMHW8M2G0hFh7NHFa"
      );

      console.log("✅ Emails sent successfully.");
      navigate("/appointment/successful", {
        state: {
          name: props.name,
          time: props.time,
          location: doctorData.location || "Clinic",
        },
      });
    } catch (error) {
      console.error("❌ Error booking slot or sending emails:", error);
      alert("Booking failed: " + error.message);
    }
  }

  return (
    <div id="appointment_div">
      {slotStatus !== null ? (
        <button
          onClick={handle_book}
          disabled={slotStatus !== "Available"}
          style={{
            backgroundColor:
              slotStatus === "Available" ? "#AEEA94" : "#FF8383",
            color: "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor:
              slotStatus === "Available" ? "pointer" : "not-allowed",
            margin: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          {slotStatus === "Available"
            ? `Book for ${props.time}`
            : (slotStatus === "Unavailable")
              ? "Unavailable"
              : `Booked at ${props.time}`
          
          }

        </button>
      ) : (
        <p>Loading slot info...</p>
      )}
    </div>
  );
}

export default Appointments_customer_view;
