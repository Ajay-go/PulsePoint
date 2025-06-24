import React from "react";
import './customer_tile.css';

function Customer_Tile({ img_url, name, review }) {
  return (
    <div className="review-tile">
      <div className="cust-left">
        <img src={img_url} alt={name} />
        <h3>{name}</h3>
      </div>
      <div className="cust-right">
        <p>{review}</p>
      </div>
    </div>
  );
}

export default Customer_Tile;
