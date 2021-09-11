import React, { useState, useEffect, SyntheticEvent } from "react";
import Facility from "../components/Facility";
import { useHistory } from "react-router";
import useStore from "../store";

export default function EditHouseForm() {
  const toggleDisplayHouseEdit = useStore(
    (state) => state.toggleDisplayHouseEdit
  );

  const facilitiesList = {
    Balcony: "Balcony",
    Bathtub: "Bathtub",
    Bidet: "Bidet",
    Garden: "Garden",
    Jacuzzi: "Jacuzzi",
    Kitchen: "Kitchen",
    Parking: "Parking",
    Shower: "Shower",
    Spa: "Spa",
    SwimmingPool: "SwimmingPool",
    TV: "TV",
    Wifi: "WiFi",
  };

  const house = useStore((store) => store.house);
  const fetchOneHouse = useStore((store) => store.fetchOneHouse);
  const [houseForm, setHouseForm] = useState(house);
  const history = useHistory();

  console.log("line 31", houseForm);

  function handleChange(e) {
    console.log("handlechange", e.target.value);
    setHouseForm({
      ...houseForm,
      [e.target.name]: e.target.value.toString(),
    });
  }

  function handleChangeFacility(e) {
    const updatedArray = e.target.checked
      ? [...houseForm[e.target.name], e.target.value]
      : houseForm[e.target.name].filter(
          (facility) => facility !== e.target.value
        );
    setHouseForm({ ...houseForm, [e.target.name]: updatedArray });
  }

  function deletePicture(e) {
    const picuture = e.target;
    // setHouseForm({ ...houseForm, pictures: [...uploadedFiles] });

    console.log("setPicturesArray", picuture);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    fetch("", {}).then(() => {});
  }

  function cancel(e) {
    setHouseForm(house);
    toggleDisplayHouseEdit();
  }

  return (
    <div>
      <h2>House Infomation</h2>
      <form className="addListingForm" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className="textfield"
            name="name"
            type="text"
            value={house.name}
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input
            className="textfield"
            name="city"
            type="text"
            value={house.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="file-upload" className="custom-file-upload">
          Add Photos
          <input
            id="file-upload"
            name="pictureSrc"
            type="text"
            onChange={() => {}}
            placeholder="picture source"
          />
          <input
            id="file-upload"
            name="pictureAlt"
            type="text"
            onChange={() => {}}
            placeholder="description"
          />
        </label>
        <ul className="editform-ul-img">
          {houseForm.pictures.map((picture) => {
            return (
              <div>
                <img className="editform-img" src={picture.src} />
                <button onClick={() => {}}> delete </button>
              </div>
            );
          })}
        </ul>
        <label>
          Bedrooms
          <input
            className="numfield"
            name="bedrooms"
            type="number"
            value={houseForm.bedrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Maximum No. Guests
          <input
            className="numfield"
            name="maxGuests"
            type="number"
            value={houseForm.maxGuests}
            onChange={handleChange}
          />
        </label>
        <label>
          Price Per Night (£)
          <input
            className="numfield"
            name="price"
            type="number"
            value={houseForm.price}
            min="0"
            step="5"
            onChange={handleChange}
          />
        </label>
        <p>Facilities</p>
        <ul className="checkboxUl">
          {Object.keys(facilitiesList).map((facility) => {
            return (
              <>
                <li key={facility} className="cboxLi">
                  <input
                    className="hidden"
                    onChange={handleChangeFacility}
                    type="checkbox"
                    name="facility"
                    value={facility}
                    checked={
                      houseForm.facility.includes(facility) ? true : false
                    }
                    id={facility}
                  />
                  <label htmlFor={facility}>{facilitiesList[facility]}</label>
                </li>
              </>
            );
          })}
        </ul>
        {/* <span className="validity"></span> adds tick to validate?? */}
        <input className="submitBtn" type="submit" value="Confirm" />
        <a className="cancelLink" onClick={cancel}>
          Cancel Edit
        </a>
        {/* <Link to="/host/dashboard"></Link> */}
      </form>
    </div>
  );
}
