import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase"; // adjust path if needed

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
    <div>
      <img src={doctor.img_src} alt={doctor.name} />
      <p>Name: {doctor.name}</p>
      <p>Speciality: {doctor.speciality}</p>
      <p>Experience: {doctor.experience_years} years</p>
      <p>Education: {doctor.education}</p>
      <button>Book appointment for ₹500</button>
    </div>
  );
}

export default Book;
