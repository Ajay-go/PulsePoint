import React from "react";
import Searchbar from "../components/Search_bar";
import Slider from "../components/doctor_slider";
import Customer_slider from "../components/Customer_slider";
function HomePage() {
  return (
    <div id='main_page'>
      <Searchbar />
      <Slider />
      <Customer_slider />
    </div>
  );
}
export default HomePage;