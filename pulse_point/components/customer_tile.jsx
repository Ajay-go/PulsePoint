import React from "react";
import './customer_tile.css'

function Customer_Tile(props){
   return <>
      <div id="customer_details">
        
        <div id="left">
         <img src={props.img_url} />
        <h2>Name : {props.name}</h2>
        </div>

        <div id="right">
         <p>{props.review}</p>

        </div>
      </div>
   </>
}
export default Customer_Tile