import React from "react";
import { useParams } from "react-router-dom";
import doctor_data from '../src/assets/doctor_data.json';

function Book() {
  const { fullname, field } = useParams();

  // Normalize fullname from slug to actual name
  const formattedFullname = fullname.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const doctors = doctor_data[field];
  const doctor = Object.values(doctors).find(doc => doc.name.toLowerCase() === formattedFullname.toLowerCase());

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  return (
    <div>
      <img src={doctor.img_src} alt="" />
      <p>Name: {doctor.name}</p>
      <p>Speciality: {doctor.speciality}</p>
      <p>Experience: {doctor.experience_years}</p>
      <p>Education : {doctor.education}</p>
      <button>Book appoint for Rs 500</button>
    </div>
  );
}

export default Book;
