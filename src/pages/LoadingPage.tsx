import React from "react";
import spinner from "../assets/spinner.png";

export default function Profile() {
  return (
    <div className="wrapper">
      <div className="loader">
        <p> Loading content... </p>
        <br></br>
        <img className="spinner" src={spinner} alt="Loading" />
      </div>
    </div>
  );
}
