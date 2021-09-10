import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import useStore from "../store";

export default function Nav() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  console.log(currentUser);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
    }).then(() => {
      setCurrentUser({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        role: "",
      });
      history.push("/");
    });
  }

  return (
    <div className="nav">
      {/* <img src={logo} alt="Hotelable" /> */}
      <Link to="/" className="nav-btn">
        <h1>Hotelable</h1>
      </Link>
      <div>
        {!currentUser.username && (
          <Link to="/login">
            <Button variant="contained" color="secondary">
              {" "}
              Login
            </Button>
          </Link>
        )}
        {currentUser.username && (
          <Button variant="contained" color="secondary" onClick={logout}>
            {" "}
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
}
