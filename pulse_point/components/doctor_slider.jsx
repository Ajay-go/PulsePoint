import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase"; // Adjust if needed
import Doc_tile from "./doctor_tiles";
import "./tile_slider.css";

function Slider() {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "pulse_point")); 
        const allDoctors = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allDoctors.push(data);
        });

        setDoctorData(allDoctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
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
              location = {doc.location}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
