import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import hotel from "../assets/hotel.svg";
import account from "../assets/account.svg";
import { useHistory } from "react-router";
import useStore from "../store";

export default function BottomNav() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const history = useHistory();

  function switchToHost() {
    fetch("http://localhost:4000/guests/switch", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res === "true") {
          setCurrentUser({ ...currentUser, role: "host" });
          history.push("/host/dashboard");
        } else {
          alert("you dont have a host account");
        }
      });
  }

  function switchToGuest() {
    fetch("http://localhost:4000/hosts/switch", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res === "true") {
          setCurrentUser({ ...currentUser, role: "guest" });
          history.push("/guest/dashboard");
        } else {
          alert("you dont have a guest account");
        }
      });
  }

  return (
    <div className="bottom-nav">
      <Link to="/">
        <img src={hotel}></img>
      </Link>
      {currentUser.role === "host" && (
        <Link to="/host/dashboard">
          <img src={account}></img>
        </Link>
      )}
      {currentUser.role === "guest" && (
        <Link to="/guest/dashboard">
          <img src={account}></img>
        </Link>
      )}
      {currentUser.role === "guest" && (
        <Button onClick={switchToHost} variant="contained" color="secondary">
          {" "}
          Switch to host
        </Button>
      )}
      {currentUser.role === "host" && (
        <Button onClick={switchToGuest} variant="contained" color="secondary">
          {" "}
          Switch to guest
        </Button>
      )}
    </div>
  );
}
