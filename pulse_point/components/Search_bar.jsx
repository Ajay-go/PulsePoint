import React from "react";
import "./searchbar.css";
import {useNavigate} from 'react-router-dom'

function Searchbar() {
   const Navigate = useNavigate();

   function handle_selection(e){
      Navigate(`/speciality/${e.target.value}`)
   };
  return (
    <>
      <div id="searchbar">
        <input
          list="specialities"
          name="speciality"
          placeholder="Choose Speciality From Dropdown or Write Doctor Name"
          onChange={handle_selection}
        />

        <datalist id="specialities">
          <option value="Cardiologist" />
          <option value="Dermatologist" />
          <option value="Neurologist" />
          <option value="Orthopedic" />
          <option value="Pediatrician" />
          <option value="Psychiatrist" />
        </datalist>

        <button>Signup</button>
      </div>
    </>
  );
}
export default Searchbar;
