import React from "react";
import './doctor_tile.css'
function Doc_tile(props) {
  return (
    <>
      <div id="doctor_details">
        
        <img src={props.img_url} />
        <h2>Name : {props.name}</h2>
        <h2>Speciality : {props.speciality}</h2>
        <h2>Expirience : {props.expirience}</h2>
        <button>Book Appointment</button>
      </div>
    </>
  );
}

export default Doc_tile;
