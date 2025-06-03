import React from "react";
import "./searchbar.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../src/assets/logo.png";
function Searchbar() {
  const Navigate = useNavigate();

  function handle_selection(e) {
    Navigate(`/speciality/${e.target.value}`);
  }

  function handle_click() {
    Navigate("/Signup");
  }
  return (
    <>
      <div id="header">
        <div id="head">
          <div id="logo">
            <img src={logo} alt="logo pulse point" />
          </div>

          <div id="brand_name">
            <h1><NavLink to={'/'} className="link">PulsePoint</NavLink></h1>
            <h3>CURE YOURSELF :)</h3>
          </div>
        </div>
        <div id="input_field">
          <div id="searchbar">
            <input
              list="specialities"
              name="speciality"
              placeholder="Choose Speciality From Dropdown or Write Doctor Name"
              onChange={handle_selection}
            />
          </div>
            <datalist id="specialities">
              <option value="Cardiologist" />
              <option value="Dermatologist" />
              <option value="Neurologist" />
              <option value="Orthopedic" />
              <option value="Pediatrician" />
              <option value="Psychiatrist" />
            </datalist>

            <div id="signup_button">
              <button onClick={handle_click}>Signup</button>
            </div>
          
        </div>
      </div>
    </>
  );
}
export default Searchbar;
