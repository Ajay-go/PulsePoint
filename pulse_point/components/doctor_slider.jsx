import React from "react";
import Doc_tile from "./doctor_tiles";
import './tile_slider.css';
import doctor_data from '../src/assets/doctor_data.json';

function Slider() {
  return (
    <>
      <div id="slider">
        {Object.entries(doctor_data).map(([speciality, doctors]) => (
          <div key={speciality} className="mb-8">
            <div className="doctor-list">
              {doctors.map((doc, index) => (
                <Doc_tile
                  key={index}
                  img_url={doc.img_src}     
                  name={doc.name}
                  speciality={doc.speciality}
                  expirience={doc.experience_years}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Slider;
