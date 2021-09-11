import React, { useState, useEffect } from "react";
import FutureBookings from "./FutureBookings";
import PastBookings from "./PastBookings";
import { Link } from "react-router-dom";
import useStore from "../store";
import { useHistory } from "react-router";

// This component can be used for both host and guest. If not, add another tho!

export default function Dashboard() {
  const bookings = useStore((store) => store.bookings);
  const getBookingsForHost = useStore((store) => store.getBookingsForHost);
  const getBookingsForGuest = useStore((store) => store.getBookingsForGuest);
  const toggleBooking = useStore((store) => store.toggleBooking);
  const setToggleBooking = useStore((store) => store.setToggleBooking);
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  console.log(currentUser);

  function addListingPage() {
    history.push("/host/dashboard/addlisting");
  }

  function deleteAccount() {
    if (currentUser.role === "guest") {
      fetch(`http://localhost:4000/guests`, {
        method: "DELETE",
        credentials: "include",
      });
    } else {
      fetch(`http://localhost:4000/hosts`, {
        method: "DELETE",
        credentials: "include",
      });
    }
    alert("you are successfully deleted");
    setTimeout(() => {
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
    }, 2000);
  }

  useEffect(() => {
    if (currentUser.role === "guest") {
      getBookingsForGuest();
    } else if (currentUser.role === "host") {
      getBookingsForHost();
    }
  }, [bookings.length]);

  const today = new Date().toISOString();

  const futureBookings = bookings.filter((booking) => booking.start >= today);

  const pastBookings = bookings.filter((booking) => booking.end < today);

  return (
    <>
      <div className="profile">
        <img className="profile-avatar" src={currentUser.avatar} alt="avatar" />
        <h1>Hello {currentUser.username}!</h1>
        <button
          className="clearBtn"
          onClick={() => {
            deleteAccount();
          }}
        >
          {" "}
          Delete Account
        </button>
        {currentUser.role === "host" && (
          <button onClick={addListingPage} className="book-btn">
            Add a listing
          </button>
        )}
      </div>
      <div className="bookings">
        <h2> Bookings</h2>
        <div className="bookings-title">
          <div
            onClick={() => setToggleBooking("future")}
            className={`${toggleBooking === "future" ? "active" : null}`}
          >
            {" "}
            Future
          </div>
          <div
            className={`${toggleBooking === "past" ? "active" : null}`}
            onClick={() => setToggleBooking("past")}
          >
            {" "}
            Past
          </div>
        </div>
        {toggleBooking === "future" && (
          <FutureBookings bookings={futureBookings} />
        )}
        {toggleBooking === "past" && <PastBookings bookings={pastBookings} />}
      </div>
    </>
  );
}
