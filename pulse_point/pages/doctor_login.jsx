import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../src/firebase";

function Doc_login() {
  const [formData, setFormData] = useState({
    name: "",
    Education: "",
    Experience: "",
    Fees: "",
    Speciality: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firestore, "doctors", "2");
      const docSnap = await getDoc(docRef);

      let existingDoctors = {};
      if (docSnap.exists()) {
        existingDoctors = docSnap.data();
      }

      // Get next numeric key
      const nextId =
        Math.max(...Object.keys(existingDoctors).map(Number), 0) + 1;

      const updatedDoctors = {
        ...existingDoctors,
        [nextId]: formData
      };

      await setDoc(docRef, updatedDoctors);
      alert("Doctor added successfully!");

      setFormData({
        name: "",
        Education: "",
        Experience: "",
        Fees: "",
        Speciality: "",
        location: ""
      });
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  return (
    <div id="doctor_form">
      <main className="signup-container">
        <section className="signup-box">
          <div className="signup-left">
            <h2>Sign Up as Doctor</h2>
            <form onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "Education", label: "Education", type: "text" },
                { id: "Experience", label: "Experience (years)", type: "number" },
                { id: "Fees", label: "Fees", type: "number" },
                { id: "Speciality", label: "Speciality", type: "text" },
                { id: "location", label: "Location", type: "text" }
              ].map(({ id, label, type }) => (
                <div key={id} id="user_data">
                  <label htmlFor={id}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                    required
                  />
                </div>
              ))}

              <div id="submit_form">
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Pulse Point</p>
      </footer>
    </div>
  );
}

export default Doc_login;
