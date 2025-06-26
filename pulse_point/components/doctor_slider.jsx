import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../src/firebase"; // Adjust path if needed
import Doc_tile from "./doctor_tiles";
import "./tile_slider.css";

function Slider() {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "pulse_point"));
        const allDoctors = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          allDoctors.push(data);
        });

        setDoctorData(allDoctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();

    const updateAllDoctorSlots = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "pulse_point"));

        for (const docSnap of querySnapshot.docs) {
          const doctorName = docSnap.id;
          const formattedDocId = doctorName.replace(/\s+/g, "_").replace(/\./g, "");
          const docRef = doc(firestore, "appointments", formattedDocId);

          const updatedSlots = {
            "10-am": "Available",
            "11-am": "Available",
            "12-pm": "Available",
            "14-pm": "Available",
            "15-pm": "Available",
            "16-pm": "Available",
            "17-pm": "Available",
            "18-pm": "Available",
          };

          try {
            await updateDoc(docRef, updatedSlots);
            console.log(`Updated slots for ${doctorName}`);
          } catch (err) {
            console.error(`Failed to update slots for ${doctorName}:`, err);
          }
        }
      } catch (error) {
        console.error("Error updating doctor slots:", error);
      }
    };

    // First run immediately
    updateAllDoctorSlots();

    // Then run every 60 seconds
    const intervalId = setInterval(updateAllDoctorSlots, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (doctorData.length === 0) return <p>Loading doctors...</p>;

  return (
    <div id="slider">
      <div className="mb-8">
        <div className="doctor-list">
          {doctorData.map((doc, index) => (
            <Doc_tile
              key={index}
              img_url={doc.img_src}
              name={doc.name}
              expirience={doc.experience_years}
              speciality={doc.speciality}
              education={doc.education}
              location={doc.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
