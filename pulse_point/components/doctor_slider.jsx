import React from "react";
import Doc_tile from "./doctor_tiles";
import doc_image from "../src/assets/image.jpg";
import './tile_slider.css'

function Slider() {
  return (
    <>
      <div id="slider">
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
        <Doc_tile
          img_url={doc_image}
          name={"Ajay Gour"}
          speciality={"Physiotherapist"}
          expirience={"10"}
        ></Doc_tile>
      </div>
    </>
  );
}
export default Slider;
