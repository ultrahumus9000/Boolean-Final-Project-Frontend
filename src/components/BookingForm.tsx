import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import useStore from "../store";

type BookingForm = {
  total: number;
  start: string;
  end: string;
  houseId: number;
};

export default function BookingForm({ house }) {
  const initialBookingForm = {
    total: 0,
    start: "",
    end: "",
    houseId: house.id,
  };

  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  const toggleDisplay = useStore((store) => store.toggleDisplay);
  const currentUser = useStore((store) => store.currentUser);
  const history = useHistory();

  function calculateTotal() {
    var date1 = new Date(bookingForm.start);
    console.log("bookingForm end in line 29", bookingForm.end);
    var date2 = new Date(bookingForm.end);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    const totalPrice = house.price * Difference_In_Days;
    if (bookingForm.start !== "" && bookingForm.end !== "") {
      setBookingForm({ ...bookingForm, total: totalPrice });
    }
  }
  function createBooking(booking) {
    fetch(`http://localhost:4000/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
        if (typeof res === "string") {
          alert("you cannot book it for now ");
        } else if (currentUser.username === "") {
          history.push("/login");
        } else {
          toggleDisplay();
          setBookingForm(initialBookingForm);
          history.push("/guest/dashboard");
        }
      })
      .catch((error) => {
        console.error("Unable to make bookings", error);
      });
  }

  function handleStart(event: SyntheticEvent) {
    const targetEvent = event.target as HTMLInputElement;

    if (bookingForm.start !== "") {
      var date1 = new Date(targetEvent.value);

      var date2 = new Date(bookingForm.end);

      var Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      const totalPrice = house.price * Difference_In_Days;

      if (date1 > date2) {
        alert("you cannot select early date");
        return;
      }

      setBookingForm({
        ...bookingForm,
        start: targetEvent.value,
        total: totalPrice,
      });
    } else {
      setBookingForm({
        ...bookingForm,
        start: targetEvent.value,
      });
    }
  }

  function handleEndDate(event: SyntheticEvent) {
    const targetEvent = event.target as HTMLInputElement;
    var date1 = new Date(bookingForm.start);

    var date2 = new Date(targetEvent.value);

    if (date1 > date2) {
      alert("you cannot select early date");
      return;
    }
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    const totalPrice = house.price * Difference_In_Days;

    setBookingForm({
      ...bookingForm,
      end: targetEvent.value,
      total: totalPrice,
    });
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    createBooking(bookingForm);
  }

  return (
    <section className="booking-form">
      <form onSubmit={handleSubmit}>
        <label>Check In </label>
        <input
          type="date"
          name="start"
          value={bookingForm.start}
          onChange={handleStart}
          required
        />
        <label>Check Out </label>
        <input
          type="date"
          name="end"
          required
          value={bookingForm.end}
          onChange={(event) => {
            handleEndDate(event);
          }}
        />
        <p> Total:{bookingForm.total} </p>
        <button>Submit</button>
      </form>
    </section>
  );
}
