import React, { useState, useEffect, SyntheticEvent } from "react";
import Facility from "../components/Facility";
import { useHistory } from "react-router";
import useStore from "../store";
import Loading from "./LoadingPage";

export default function AddListingHost() {
  const currentUser = useStore((state) => state.currentUser);
  const addNewListing = useStore((state) => state.addNewListing);
  console.log("current", currentUser);
  const initialHouseData = {
    name: "",
    city: "",
    pictures: [],
    bedrooms: 1,
    maxGuests: 1,
    facility: [],
    price: 0,
  };

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

  const [picturesArray, setPicturesArray] = useState([]);
  const [newListing, setNewListing] = useState(initialHouseData);
  const history = useHistory();
  const waiting = useStore((store) => store.waiting);
  const toggleWaiting = useStore((store) => store.toggleWaiting);
  function handleChange(e) {
    console.log("handlechange", e.target.value);
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value.toString(),
    });
  }

  function handleChangeFacility(e) {
    const updatedArray = e.target.checked
      ? [...newListing[e.target.name], e.target.value]
      : newListing[e.target.name].filter(
          (facility) => facility !== e.target.value
        );
    setNewListing({ ...newListing, [e.target.name]: updatedArray });
    // console.log("facility change updatedArray", updatedArray)
    // console.log("facility change e.target.name", e.target.name)
    // console.log("facility change  e.target.value", e.target.value)
  }

  function handleChangePictures(e) {
    console.log("e.target.files", e.target.files);

    const uploadedFiles = e.target.files;
    setNewListing({ ...newListing, pictures: [...uploadedFiles] });
    setPicturesArray([...uploadedFiles]);
    console.log("setPicturesArray", [...uploadedFiles]);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    addNewListing(e, newListing);
    toggleWaiting();
    // need to set this cuz the database react too slow so that you can see newest changes in your frontend
    setTimeout(() => {
      history.push("/host/dashboard");
      toggleWaiting();
    }, 2000);
  }

  function cancel(e) {
    setNewListing(initialHouseData);
    history.push("/host/dashboard");
  }

  return (
    <>
      {waiting ? (
        <Loading />
      ) : (
        <div>
          <h2>Add new listing</h2>
          <form className="addListingForm" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                className="textfield"
                name="name"
                type="text"
                onChange={handleChange}
              />
            </label>
            <label>
              City
              <input
                className="textfield"
                name="city"
                type="text"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="file-upload" className="custom-file-upload">
              Add Photos
              <input
                id="file-upload"
                name="pictures"
                type="file"
                accept="image/*"
                onChange={handleChangePictures}
                multiple
              />
              <ul className="uploadedFileNames">
                {picturesArray.map((picture) => (
                  <li key={picture.name}>
                    <p>{picture.name}</p>
                    {/* <button onClick={delPhoto}>✖</button> */}
                  </li>
                ))}
              </ul>
            </label>
            <label>
              Bedrooms
              <input
                className="numfield"
                name="bedrooms"
                type="number"
                value={newListing.bedrooms}
                onChange={handleChange}
              />
            </label>
            <label>
              Maximum No. Guests
              <input
                className="numfield"
                name="maxGuests"
                type="number"
                value={newListing.maxGuests}
                onChange={handleChange}
              />
            </label>
            <label>
              Price Per Night (£)
              <input
                className="numfield"
                name="price"
                type="number"
                value={newListing.price}
                min="0"
                step="5"
                onChange={handleChange}
              />
            </label>
            <p>Facilities</p>
            <label>
              <Facility
                options={facilitiesList}
                handleChangeFacility={handleChangeFacility}
                newListing={newListing}
              />
            </label>
            {/* <span className="validity"></span> adds tick to validate?? */}
            <input className="book-btn" type="submit" value="Add listing" />
            <a className="cancelLink" onClick={cancel}>
              Cancel Listing
            </a>
            {/* <Link to="/host/dashboard"></Link> */}
          </form>
        </div>
      )}
    </>
  );
}

// input:invalid+span:after {
//   content: '✖';
//   padding-left: 5px;
// }

// input:valid+span:after {
//   content: '✓';
//   padding-left: 5px;
// }
