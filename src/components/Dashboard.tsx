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
  const history = useHistory();

  function addListingPage() {
    history.push("/host/dashboard/addlisting");
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

        {currentUser.role === "host" && (
          <button onClick={addListingPage} className="go-profile">
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
