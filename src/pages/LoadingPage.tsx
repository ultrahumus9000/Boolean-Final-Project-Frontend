import React, { useEffect } from "react";
import { useHistory } from "react-router";
import doorHanger from "../assets/doorHanger.png";
// import spinner from "../assets/spinner.png";
import useStore from "../store";

export default function Loading() {
  const waiting = useStore((store) => store.waiting);
  const history = useHistory();

  return (
    <div className="wrapper">
      <div className="loader">
        {waiting ? <p> adding successful </p> : <p> Loading content... </p>}

        <br></br>
        <img className="doorHanger" src={doorHanger} alt="Loading" />
      </div>
    </div>
  );
}
