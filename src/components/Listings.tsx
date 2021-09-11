import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import address from "../assets/address.svg";
import useStore from "../store";

export default function Listings() {
  const [housesForHost, setHousesForHost] = useState([]);
  const toggleEditHouse = useStore((store) => store.toggleDisplayHouseEdit);
  const houses = useStore((store) => store.houses);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:4000/hosts/houses", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((houses) => {
        setHousesForHost(houses);
      });
  }, []);

  const deleteHouse = (id) => {
    console.log("houseid", id);
    fetch(`http://localhost:4000/houses/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        const allHousesForhost = housesForHost.filter(
          (house) => house.id !== id
        );
        setHousesForHost(allHousesForhost);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      {housesForHost.length && (
        <div>
          {housesForHost.map((house) => {
            return (
              <div className="listing-container" key={house.name}>
                <img
                  className="house-img"
                  src={house.pictures}
                  onClick={() => {
                    history.push(`/house/${house.id}`);
                  }}
                ></img>
                <div className="listing-details">
                  <div className="hotelName">
                    <p className="listing-title"> {house.name}</p>
                    <p className="address-p">
                      {" "}
                      <img className="address-svg" src={address} /> {house.city}
                    </p>
                  </div>
                  <div className="house-info">
                    <Button
                      variant="contained"
                      color="primary"
                      href="#contained-buttons"
                      onClick={() => {
                        toggleEditHouse();
                        history.push(`/house/${house.id}`);
                      }}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href="#contained-buttons"
                      onClick={() => {
                        deleteHouse(house.id);
                      }}
                    >
                      {" "}
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
