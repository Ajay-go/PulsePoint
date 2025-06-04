import React from "react";
import Searchbar from "../components/Search_bar";
import Slider from "../components/doctor_slider";
import Customer_slider from "../components/Customer_slider";
import ImageTextSection from "../components/middle_bar";
import Footer from "../components/footer";
function HomePage() {
  return (
    <div>
      

      <div id="main_page">
        <Searchbar />
        <Slider />
        <ImageTextSection/>
        <Customer_slider />
        <Footer/>
      </div>
    </div>
  );
}
export default HomePage;
