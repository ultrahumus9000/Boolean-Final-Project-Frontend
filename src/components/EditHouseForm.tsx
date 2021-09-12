import React, { useState, useEffect, SyntheticEvent } from "react";
import Facility from "../components/Facility";
import { useHistory } from "react-router";
import useStore from "../store";
import { useFormControl } from "@material-ui/core";

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
  const [houseForm, setHouseForm] = useState(house);
  const [newPicCount, setnewPicCount] = useState(0);
  const toggleUpdateHouseStatus = useStore(
    (store) => store.toggleUpdateHouseStatus
  );

  function handleChange(e: SyntheticEvent) {
    const targetEvent = e.target as HTMLInputElement;
    console.log("i am changing");
    setHouseForm({
      ...houseForm,
      [targetEvent.name]: targetEvent.value,
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

  function addPicture(e: SyntheticEvent) {
    const targetEvent = e.target as HTMLInputElement;
    if (targetEvent.value === "") {
      return;
    }
    const newPicture = {
      id: newPicCount,
      src: targetEvent.value,
      alt: "any",
    };

    setHouseForm({
      ...houseForm,
      pictures: [...houseForm.pictures, newPicture],
    });
    setnewPicCount(newPicCount - 1);
    targetEvent.value = "";
  }

  function deletePicture(id: number) {
    // picture deleted in the state first, if cancel it we have to put it back
    // if there is only one picture left, we cannot delete
    if (houseForm.pictures.length === 1) {
      alert("you have to have a default picture");
      return;
    }

    const updatedPictures = houseForm.pictures.filter(
      (picture) => picture.id !== id
    );
    setHouseForm({ ...houseForm, pictures: updatedPictures });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const targetEvent = e.target as HTMLFormElement;

    // 1 delete the pictures does not exist in the house
    //2 create more pictures that is new
    // update the model
    const houseId = house.id;
    fetch(`http://localhost:4000/houses/${houseId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(houseForm),
    }).then(() => {
      toggleDisplayHouseEdit();
      toggleUpdateHouseStatus();
      targetEvent.reset();
    });
  }

  function cancel(e) {
    setHouseForm(house);
    toggleDisplayHouseEdit();
  }
  // console.log("houseform", houseForm);
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
            value={houseForm.name}
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input
            className="textfield"
            name="city"
            type="text"
            value={houseForm.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="file-upload" className="custom-file-upload">
          Add Photos
          <input
            id="src-add"
            name="src"
            type="text"
            onInput={addPicture}
            placeholder="picture source"
          />
        </label>
        <ul className="editform-ul-img">
          {houseForm.pictures.map((picture) => {
            return (
              <div>
                <img className="editform-img" src={picture.src} />
                <button
                  type="button"
                  onClick={() => {
                    deletePicture(picture.id);
                  }}
                >
                  delete
                </button>
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
                    type="checkbox"
                    name="facility"
                    value={facility}
                    checked={
                      houseForm.facility.includes(facility) ? true : false
                    }
                    id={facility}
                    onChange={handleChangeFacility}
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
