import React from "react";

import useStore from "../store";
import BookingList from "./BookingLists";

export default function PastBookings({ bookings }) {
   const currentUser = useStore((store) => store.currentUser);

   console.log(bookings);
   return (
      <>
         {!bookings && <p> No future bookings</p>}
         <BookingList bookings={bookings} />
      </>
   );
}
