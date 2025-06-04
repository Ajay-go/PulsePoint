import React from "react";
import "./searchbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../src/assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Searchbar() {
  const navigate = useNavigate();

  const [search_input,set_search_input] = useState("");

  function handle_click() {
    navigate("/Signup");
  }

  function handle_search_click() {
    console.log(search_input)
  }
  function handleKeyDown(e) {
  if (e.key === "Enter") {
    const value = e.target.value;
    if (value) {
      console.log(value)
    }
  }
}


  return (
    <div id="header">
      <div id="head">
        <div id="logo">
          <img src={logo} alt="logo pulse point" />
        </div>

        <div id="brand_name">
          <h1><NavLink to="/" className="link">PulsePoint</NavLink></h1>
          <h3>CURE YOURSELF :)</h3>
        </div>
      </div>

      <div id="input_field">
        <div id="searchbar">
          <input type="text" placeholder="Search Doctor "
           onChange={(e)=>set_search_input(e.target.value)} 
           value = {search_input} 
           onKeyDown={handleKeyDown}
           />
  
          <button id="search_button" onClick={handle_search_click}>
            <FaSearch className="search-icon" />
          </button>
        </div>

        <div id="signup_button">
          <button onClick={handle_click}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
