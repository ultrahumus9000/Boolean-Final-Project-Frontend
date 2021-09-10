import React from "react";
import { useHistory } from "react-router";

export default function HouseCard({ image, city, name, price, houseId }) {
  const history = useHistory();
  return (
    <div
      className="house-card"
      onClick={() => {
        history.push(`/house/${houseId}`);
      }}
    >
      <img className="cardImage" src={image.src} alt={image.alt} />
      <h2>{name}</h2>
      <p>{city}</p>
      <h3>
        £{price}
        <span className="h3span"> /night</span>
      </h3>
    </div>
  );
}
