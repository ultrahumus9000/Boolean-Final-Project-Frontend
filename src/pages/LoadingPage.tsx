import React from "react";
import spinner from "../assets/spinner.png";
import useStore from "../store";

export default function Loading() {
  const waiting = useStore((store) => store.waiting);
  return (
    <div className="wrapper">
      <div className="loader">
        {waiting ? <p> adding successful </p> : <p> Loading content... </p>}

        <br></br>
        <img className="spinner" src={spinner} alt="Loading" />
      </div>
    </div>
  );
}
