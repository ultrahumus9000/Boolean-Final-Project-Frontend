import React from "react";
import address from "../assets/address.svg";
import useStore, { House } from "../store";
type HouseBioProp = {
  house: House;
};

export default function HouseBasicInfo({ house }: HouseBioProp) {
  const currentUser = useStore((store) => store.currentUser);
  console.log(house);
  return (
    <section className="house-bio">
      <div className="edit-section">
        <h2>{house.name}</h2>
        {house.hostProfile === currentUser.username && <button>Edit</button>}
      </div>

      <section className="basic-section">
        <div className="address-div">
          <img className="facility-icon" src={address} />
          <span>{house.city}</span>
          <span>£{house.price}</span>
        </div>
        <div className="house-basic-div">
          <span>Guests: {house.maxGuests}</span>
          <span>Bedrooms: {house.bedrooms}</span>
        </div>
        <div className="host-div">
          <img src={house.hostAvatar} className="host-profile" />
          <span>{house.hostProfile}</span>
        </div>
      </section>
    </section>
  );
}
