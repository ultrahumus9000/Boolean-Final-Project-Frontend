import React from "react";

import BookingList from "./BookingLists";

export default function FutureBookings({ bookings }) {
  return (
    <>
      <BookingList bookings={bookings} />
    </>
  );
}
