// import React, { useState } from "react"
import * as React from "react";
import { useState, SyntheticEvent } from "react";
import useStore from "../store";

export default function Filter() {
  const filterHouses = useStore((store) => store.filterHouses);
  const fetchAllHouses = useStore((store) => store.fetchAllHouses);
  const today = new Date().toISOString();
  const shortDate = today.substring(0, 10);

  const initialOptions = {
    city: "",
    checkIn: shortDate,
    checkOut: "",
    maxGuests: 1,
  };

  const [filterOptions, setFilterOptions] = useState(initialOptions);

  function handleSubmit(e) {
    e.preventDefault();
    filterHouses(filterOptions);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  }

  function clearForm() {
    setFilterOptions(initialOptions);
    fetchAllHouses();
  }

  return (
    <>
      <h1>Choose a stay...</h1>
      <form className="filter" onSubmit={handleSubmit}>
        <label>
          Where to?
          <input
            className="searchfield"
            type="search"
            name="city"
            placeholder="Anywhere"
            onChange={handleChange}
            value={filterOptions.city}
          />
        </label>
        <label>
          Guests
          <input
            className="numfield"
            type="number"
            name="maxGuests"
            value={filterOptions.maxGuests}
            min="1"
            onChange={handleChange}
          />
        </label>

        <label>
          Check In
          <input
            className="datefield"
            id="checkInCal"
            type="date"
            name="checkIn"
            value={filterOptions.checkIn}
            min={shortDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Check Out
          <input
            className="datefield"
            type="date"
            name="checkOut"
            value={filterOptions.checkOut}
            max={"2024-01-01"}
            onChange={handleChange}
          />
        </label>

        <input className="submitBtn" type="submit" value="Search" />
        <button className="clearBtn " type="button" onClick={clearForm}>
          Reset
        </button>
      </form>
    </>
  );
}

// function makeDate(newDate: Date) {
//   // this function turns a long date into "2021-8-1" format.
//   const [newDateYear, newDateMonth, newDateDay] = [
//     newDate.getFullYear(),
//     newDate.getMonth().toFixed(2),
//     newDate.getDate().toFixed(2),
//   ]
//   const currentDate = `${newDateYear}-${newDateMonth}-${newDateDay}`
//   return currentDate
// }
