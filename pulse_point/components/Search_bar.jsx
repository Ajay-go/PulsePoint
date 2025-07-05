import React from "react";
import "./searchbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../src/assets/logop2.jpeg";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Fuse from "fuse.js";
import { TbMessageChatbot } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function Searchbar() {
  const navigate = useNavigate();
  const [search_input, set_search_input] = useState("");
  const isLoggedIn = localStorage.getItem("pulsePointUser") !== null;

  function handle_chat_click() {
    navigate("/chat");
  }
  function handle_login_click() {
    navigate("/login");
  }

  function handle_signup_click() {
    navigate("/Signup");
  }

  function handle_profile_click() {
    navigate("/profile");
  }

  function handle_search_click() {
    const result = fuse.search(search_input);
    const matchedDoctors = result.map((r) => r.item);
    if(search_input)navigate("/search-results", { state: { results: matchedDoctors } });
  }

  const doctorList = [
    {
      name: "Dr. Rajiv Malhotra",
      img_src: "https://randomuser.me/api/portraits/men/10.jpg",
      speciality: "Cardiology",
      education: "MD, AIIMS Delhi",
      experience_years: 18,
    },
    {
      name: "Dr. Sneha Bhargava",
      img_src: "https://randomuser.me/api/portraits/women/21.jpg",
      speciality: "Cardiology",
      education: "MD, KEM Hospital Mumbai",
      experience_years: 12,
    },
    {
      name: "Dr. Anil Reddy",
      img_src: "https://randomuser.me/api/portraits/men/15.jpg",
      speciality: "Cardiology",
      education: "DM Cardiology, NIMS Hyderabad",
      experience_years: 14,
    },
    {
      name: "Dr. Shweta Nair",
      img_src: "https://randomuser.me/api/portraits/women/22.jpg",
      speciality: "Cardiology",
      education: "MD, Kasturba Medical College",
      experience_years: 9,
    },
    {
      name: "Dr. Deepak Chatterjee",
      img_src: "https://randomuser.me/api/portraits/men/18.jpg",
      speciality: "Cardiology",
      education: "DM, PGIMER Chandigarh",
      experience_years: 20,
    },
    {
      name: "Dr. Neha Varma",
      img_src: "https://randomuser.me/api/portraits/women/30.jpg",
      speciality: "Neurology",
      education: "DM Neurology, AIIMS Delhi",
      experience_years: 10,
    },
    {
      name: "Dr. Amit Kulkarni",
      img_src: "https://randomuser.me/api/portraits/men/21.jpg",
      speciality: "Neurology",
      education: "MD, Grant Medical College",
      experience_years: 15,
    },
    {
      name: "Dr. Reena Joseph",
      img_src: "https://randomuser.me/api/portraits/women/33.jpg",
      speciality: "Neurology",
      education: "DM, CMC Vellore",
      experience_years: 11,
    },
    {
      name: "Dr. Vivek Srinivasan",
      img_src: "https://randomuser.me/api/portraits/men/25.jpg",
      speciality: "Neurology",
      education: "MD, JIPMER Pondicherry",
      experience_years: 13,
    },
    {
      name: "Dr. Kavita Mehta",
      img_src: "https://randomuser.me/api/portraits/women/40.jpg",
      speciality: "Neurology",
      education: "DM, NIMHANS Bangalore",
      experience_years: 9,
    },
    {
      name: "Dr. Sanjay Mehra",
      img_src: "https://randomuser.me/api/portraits/men/30.jpg",
      speciality: "Orthopedics",
      education: "MS Orthopedics, AIIMS Delhi",
      experience_years: 22,
    },
    {
      name: "Dr. Pooja Rathi",
      img_src: "https://randomuser.me/api/portraits/women/41.jpg",
      speciality: "Orthopedics",
      education: "MS, BJMC Pune",
      experience_years: 11,
    },
    {
      name: "Dr. Raghav Sharma",
      img_src: "https://randomuser.me/api/portraits/men/35.jpg",
      speciality: "Orthopedics",
      education: "MS, KGMC Lucknow",
      experience_years: 17,
    },
    {
      name: "Dr. Meenal Deshpande",
      img_src: "https://randomuser.me/api/portraits/women/44.jpg",
      speciality: "Orthopedics",
      education: "MS, Seth GS Medical College",
      experience_years: 8,
    },
    {
      name: "Dr. Vikas Menon",
      img_src: "https://randomuser.me/api/portraits/men/38.jpg",
      speciality: "Orthopedics",
      education: "MS, JIPMER Pondicherry",
      experience_years: 14,
    },
    {
      name: "Dr. Anjali Iyer",
      img_src: "https://randomuser.me/api/portraits/women/45.jpg",
      speciality: "Pediatrics",
      education: "MD Pediatrics, CMC Vellore",
      experience_years: 10,
    },
    {
      name: "Dr. Ravi Prakash",
      img_src: "https://randomuser.me/api/portraits/men/40.jpg",
      speciality: "Pediatrics",
      education: "MD, AIIMS Delhi",
      experience_years: 12,
    },
    {
      name: "Dr. Sushma Patel",
      img_src: "https://randomuser.me/api/portraits/women/49.jpg",
      speciality: "Pediatrics",
      education: "DCH, KEM Mumbai",
      experience_years: 9,
    },
    {
      name: "Dr. Manish Agarwal",
      img_src: "https://randomuser.me/api/portraits/men/42.jpg",
      speciality: "Pediatrics",
      education: "MD, Grant Medical College",
      experience_years: 15,
    },
    {
      name: "Dr. Tara Roy",
      img_src: "https://randomuser.me/api/portraits/women/50.jpg",
      speciality: "Pediatrics",
      education: "MD, NRS Medical College Kolkata",
      experience_years: 7,
    },
    {
      name: "Dr. Alok Jain",
      img_src: "https://randomuser.me/api/portraits/men/45.jpg",
      speciality: "Dermatology",
      education: "MD Dermatology, AIIMS Delhi",
      experience_years: 14,
    },
    {
      name: "Dr. Nidhi Shah",
      img_src: "https://randomuser.me/api/portraits/women/51.jpg",
      speciality: "Dermatology",
      education: "MD, Baroda Medical College",
      experience_years: 11,
    },
    {
      name: "Dr. Sameer Kapoor",
      img_src: "https://randomuser.me/api/portraits/men/48.jpg",
      speciality: "Dermatology",
      education: "MD, PGIMER Chandigarh",
      experience_years: 16,
    },
    {
      name: "Dr. Priya Suresh",
      img_src: "https://randomuser.me/api/portraits/women/53.jpg",
      speciality: "Dermatology",
      education: "MD, Kasturba Medical College",
      experience_years: 10,
    },
    {
      name: "Dr. Arjun Desai",
      img_src: "https://randomuser.me/api/portraits/men/50.jpg",
      speciality: "Dermatology",
      education: "DDVL, Grant Medical College",
      experience_years: 9,
    },
    {
      name: "Dr. Meena Sharma",
      img_src: "https://randomuser.me/api/portraits/women/54.jpg",
      speciality: "General Practitioner",
      education: "MBBS, Maulana Azad Medical College",
      experience_years: 13,
    },
    {
      name: "Dr. Arvind Patel",
      img_src: "https://randomuser.me/api/portraits/men/55.jpg",
      speciality: "General Practitioner",
      education: "MBBS, BJMC Ahmedabad",
      experience_years: 15,
    },
    {
      name: "Dr. Kiran Verma",
      img_src: "https://randomuser.me/api/portraits/women/56.jpg",
      speciality: "General Practitioner",
      education: "MBBS, JIPMER Pondicherry",
      experience_years: 10,
    },
    {
      name: "Dr. Rakesh Bhatia",
      img_src: "https://randomuser.me/api/portraits/men/57.jpg",
      speciality: "General Practitioner",
      education: "MBBS, KMC Mangalore",
      experience_years: 8,
    },
    {
      name: "Dr. Sujata Iqbal",
      img_src: "https://randomuser.me/api/portraits/women/58.jpg",
      speciality: "General Practitioner",
      education: "MBBS, GMC Nagpur",
      experience_years: 11,
    },
  ];
  const fuse = new Fuse(doctorList, {
    keys: ["name", "speciality", "experience_years"],
    threshold: 0.5, // smaller = stricter
  });

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const value = e.target.value;
      if (value) {
        const result = fuse.search(value);
        const matchedDoctors = result.map((r) => r.item);

        navigate("/search-results", { state: { results: matchedDoctors } });
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
          <h1>
            <NavLink to="/" className="link">
              pulsepoint
            </NavLink>
          </h1>
          <h3>CURE YOURSELF :)</h3>
        </div>
      </div>

      <div id="input_field">
        <div id="searchbar">
          <input
            type="text"
            placeholder="Search Doctor or speciality "
            onChange={(e) => set_search_input(e.target.value)}
            value={search_input}
            onKeyDown={handleKeyDown}
          />

          <button id="search_button" onClick={handle_search_click}>
            <FaSearch className="search-icon" />
          </button>
        </div>

        <div id="user_oper">
          {!isLoggedIn ? (
            <>
              <div id="login_button">
                <button onClick={handle_login_click}>Login</button>
              </div>
              <div id="signup_button">
                <button onClick={handle_signup_click}>Signup</button>
              </div>
            </>
          ) : (
            <>
              <div id="profile_button">
                <button onClick={handle_profile_click}>Profile <CgProfile /></button>
              </div>
            </>
          )}
        </div>

        <div id="floating_chat_button">
          <button onClick={handle_chat_click}>Chat with AI</button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
