import React from "react";
import "./doctor_tile.css";
import { useNavigate } from "react-router-dom";

function Doc_tile(props) {
  const navigate = useNavigate();

  function handle_book() {
    const formattedName = props.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/book_appointment/${props.speciality}/${formattedName}`);
  }

  return (
    <div id="doctor_details">
      <img src={props.img_url} />
      <h2>Name : {props.name}</h2>
      <h2>Speciality : {props.speciality}</h2>
      <h2>Expirience : {props.expirience}</h2>
      <button onClick={handle_book}>Book Appointment</button>
    </div>
  );
}

export default Doc_tile;
