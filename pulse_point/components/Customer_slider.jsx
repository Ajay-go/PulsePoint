import Customer_Tile from "./customer_tile";
import './customer_tile_slider.css';
import cust_img from '../src/assets/image.jpg';

function Customer_slider() {
  return (
    <>
      <div id="review">
        <h2>OUR Reviews</h2>
        <div id="cust_slider">
          <Customer_Tile
            img_url={cust_img}
            name="Alice"
            review="The doctors here are extremely professional and took the time to explain everything clearly. I felt very comfortable and well taken care of throughout my visit. Highly recommend to anyone looking for quality care."
          />
          <Customer_Tile
            img_url={cust_img}
            name="Bob"
            review="Very pleasant experience. The staff was friendly and attentive, and the doctor addressed all of my concerns in detail. Booking an appointment was easy and there was hardly any wait time."
          />
          <Customer_Tile
            img_url={cust_img}
            name="Charlie"
            review="I've been visiting this clinic for the past year and the experience has always been top-notch. The doctors are knowledgeable and genuinely care about your well-being. I appreciate their professionalism."
          />
          <Customer_Tile
            img_url={cust_img}
            name="Diana"
            review="I went in for a check-up and ended up finding a reliable healthcare partner. The ambiance is clean and calming, and the staff made sure I was comfortable at every step. Truly a great place for medical needs."
          />
          <Customer_Tile
            img_url={cust_img}
            name="Ethan"
            review="From appointment booking to consultation, everything was smooth and efficient. The team here is dedicated and ensures that patients are heard. Would definitely recommend to friends and family."
          />
        </div>
      </div>
    </>
  );
}

export default Customer_slider;
