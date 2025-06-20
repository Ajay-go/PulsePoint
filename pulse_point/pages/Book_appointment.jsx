import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase"; // adjust path if needed
import Appointments_customer_view from "./appointment_customer_view";
import './book_appointment.css'

function Book() {
  const { fullname, field } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert slug to proper name format
  const formattedFullname = fullname.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "pulse_point"));
        let foundDoctor = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.name.toLowerCase() === formattedFullname.toLowerCase() &&
            data.speciality.toLowerCase() === field.toLowerCase()
          ) {
            foundDoctor = data;
          }
        });

        setDoctor(foundDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [formattedFullname, field]);

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <>
    <div id="book_main">
      <div id="book_page">
      <img src={doctor.img_src} alt={doctor.name} />
      <p>Name: {doctor.name}</p>
      <p>Speciality: {doctor.speciality}</p>
      <p>Experience: {doctor.experience_years} years</p>
      <p>Education: {doctor.education}</p>
      <div id="appointment_slots">
        <Appointments_customer_view time = {'10-am'} name = {doctor.name}/>
        <Appointments_customer_view time = {'11-am'} name = {doctor.name}/>
        <Appointments_customer_view time = {'12-pm'} name = {doctor.name}/>
        <Appointments_customer_view time = {'14-pm'} name = {doctor.name}/>
        <Appointments_customer_view time = {'15-pm'} name = {doctor.name}/>
        <Appointments_customer_view time = {'16-pm'} name = {doctor.name}/>
        <Appointments_customer_view time = {'17-pm'} name = {doctor.name}/>
        <Appointments_customer_view time = {'18-pm'} name = {doctor.name}/>

      </div>
    </div>
    </div>
    </>
  );
}

export default Book;
