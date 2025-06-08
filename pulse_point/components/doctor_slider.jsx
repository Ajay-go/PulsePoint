import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase"; // adjust this path if needed
import Doc_tile from "./doctor_tiles"; // your custom tile component
import "./tile_slider.css"; // styles for slider layout

function Slider() {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "doctors"));
        const allDoctors = [];

        // Go through each document (you currently only have one: "2")
        querySnapshot.forEach((doc) => {
          const data = doc.data(); // This is an object: { "1": {...}, "2": {...}, ..., "31": {...} }

          // Flatten nested doctor objects inside the document
          Object.keys(data).forEach((key) => {
            allDoctors.push(data[key]);
          });
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
              expirience={doc.Experience}
              location={doc.location}
              speciality={doc.Speciality}
              fees={doc.Fees}
              education={doc.Education}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
