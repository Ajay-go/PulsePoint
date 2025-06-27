import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase"; // adjust this path if needed

function fetchDoctors(){
   const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "doctors"));
        const allDoctors = [];

        // Go through each document (you currently only have one: "2")
        querySnapshot.forEach((doc) => {
          const data = doc.data(); 

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
}
export default fetchDoctors