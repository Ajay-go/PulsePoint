import React from "react";
import "./doctor_tile.css";
import { useNavigate } from "react-router-dom";

function Doc_tile(props) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("pulsePointUser") !== null;

  function handle_book() {
  if (!props.name) {
    alert("Doctor name is missing!");
    return;
  }
  const formattedName = props.name.toLowerCase().replace(/\s+/g, "-");
  if (isLoggedIn) {
    navigate(`/book_appointment/${props.speciality}/${formattedName}`);
  } else {
    alert("Please signup or login");
  }
}


  return (
    <div id="doctor_details">
      <img src={props.img_url} alt={`Dr. ${props.name}`} />
      <h2>Name: {props.name}</h2>
      <h2>Speciality: {props.speciality || "N/A"}</h2>
      <h2>Experience: {props.experience ?? props.expirience} years</h2>
      <h2>Location: {props.location || "N/A"}</h2>
      <button onClick={handle_book}>Book Appointment</button>
    </div>
  );
}

export default Doc_tile;
