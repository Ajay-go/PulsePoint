import React from "react";
import { useParams } from "react-router-dom";
import doctor_data from "../src/assets/doctor_data.json";
import Doc_tile from "../components/doctor_tiles";

function Speciality_page() {
  const { speciality } = useParams(); 
  console.log(speciality);
  const doctors = doctor_data[speciality] || [];

  return (
    <>
      <h1>OUR {speciality}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {doctors.length > 0 ? (
          doctors.map((doc, index) => (
            <Doc_tile
              key={index}
              name={doc.name}
              speciality={doc.speciality}
              expirience={doc.experience_years} // note your prop is expirience typo
              img_url={doc.img_src}
            />
          ))
        ) : (
          <p>No doctors found for this speciality.</p>
        )}
      </div>   
    </>
  );
}

export default Speciality_page;
