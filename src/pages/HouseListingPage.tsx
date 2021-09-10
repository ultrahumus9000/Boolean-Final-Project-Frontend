import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore, { House } from "../store";
import { useHistory } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/bundle";

import Balcony from "../assets/Balcony.svg";
import Bathtub from "../assets/Bathtub.svg";
import Bidet from "../assets/Bidet.svg";
import Garden from "../assets/Garden.svg";
import Jacuzzi from "../assets/Jacuzzi.svg";
import Kitchen from "../assets/Kitchen.svg";
import Parking from "../assets/Parking.svg";
import Shower from "../assets/Shower.svg";
import Swimingpool from "../assets/Swimingpool.svg";
import TV from "../assets/TV.svg";
import Spa from "../assets/Spa.svg";
import Wifi from "../assets/Wifi.svg";
import SingleReview from "../components/Review";
import HouseBasicInfo from "../components/HouseBasicInfo";
import BookingForm from "../components/BookingForm";

type HouseIdType = {
  houseId: string;
};

const imageObj = {
  Balcony: Balcony,
  Bathtub: Bathtub,
  Bidet: Bidet,
  Garden: Garden,
  Jacuzzi: Jacuzzi,
  Kitchen: Kitchen,
  Parking: Parking,
  Shower: Shower,
  Swimingpool: Swimingpool,
  TV: TV,
  Spa: Spa,
  Wifi: Wifi,
};

export default function HouseListingPage() {
  const history = useHistory();
  const houseId: HouseIdType = useParams();
  const realHouseId = Number(houseId.houseId);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const house = useStore((store) => store.house);
  const fetchOneHouse = useStore((store) => store.fetchOneHouse);
  const currentUser = useStore((store) => store.currentUser);
  const bookingDisplay = useStore((store) => store.bookingDisplay);
  const toggleBookingDisplay = useStore((store) => store.toggleDisplay);
  useEffect(() => {
    fetchOneHouse(realHouseId);
  }, [realHouseId]);

  if (Object.keys(house).length === 0) {
    return <h1>we are loading for you</h1>;
  }

  function bookAction() {
    if (currentUser.role === "guest") {
      toggleBookingDisplay();
    } else if (currentUser.role === "host") {
      alert("you have to login as a guest then you can book this house");
    } else {
      console.log(currentUser);
      history.push("/login");
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
    }
  }

  return (
    <div className="house-card">
      <HouseBasicInfo house={house} />

      <section className="pictures-section">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={-0.5}
          slidesPerView={1}
          navigation
          pagination
        >
          {house.pictures.map((picture) => {
            return (
              <SwiperSlide key={picture.alt}>
                <img src={picture.src} alt={picture.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <p className="facility-p"> Provided Facilities</p>
      <section className="facility-section">
        {house.facility.map((facility) => {
          return (
            <p className="facility" key={facility}>
              <img className="facility-icon" src={imageObj[facility]} />
              <span>{facility}</span>
            </p>
          );
        })}
      </section>
      {bookingDisplay ? (
        <BookingForm house={house} />
      ) : (
        <button className="book-btn" onClick={bookAction}>
          Book Today
        </button>
      )}

      <p>Check our reviews</p>
      <section className="review-section">
        {house.reviews.map((review) => {
          return <SingleReview review={review} key={review.guestUsername} />;
        })}
      </section>
    </div>
  );
}
