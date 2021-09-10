import { SyntheticEvent } from "react";
import create from "zustand";

let baseUrl = "http://localhost:4000";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
};

type Picture = {
  src: string;
  alt: string;
};

export type Review = {
  content: string;
  guestUsername: string;
  guestAvatar: string;
};

type Options = {
  city: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
};

export type House = {
  id: number;
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  hostProfile: string;
  hostAvatar: string;
  price: number;
  pictures: Picture[];
  reviews: Review[];
};

type Booking = {
  total: number;
  bookingId: number;
  houseId: number;
  houseName: string;
  city: string;
  name: string;
  avatar: string;
  price: number;
  start: string;
  end: string;
  pictureSrc: string;
  pictureAlt: string;
};

export type NewHouse = {
  name: string;
  bedrooms: number;
  maxGuests: number;
  facility: string[];
  city: string;
  price: number;
  pictures: File[];
};

type Store = {
  houses: House[];
  house: House;
  currentUser: User;
  bookingDisplay: Boolean;
  toggleBooking: string;
  bookings: Booking[];

  setToggleBooking: (arg: string) => void;
  toggleDisplay: () => void;
  setCurrentUser: (arg: User) => void;
  fetchAllHouses: () => void;
  fetchOneHouse: (arg: number) => void;
  filterHouses: (arg: Options) => void;
  addNewListing: (e: SyntheticEvent, arg: NewHouse) => void;
  getValidateCurrToken: () => void;
  getBookingsForHost: () => void;
  getBookingsForGuest: () => void;
  deleteBooking: (arg: number) => void;
};

const useStore = create<Store>((set, get) => ({
  houses: [],
  house: {
    id: 0,
    name: "",
    bedrooms: 0,
    maxGuests: 0,
    facility: [],
    city: "",
    hostProfile: "",
    hostAvatar: "",
    price: 0,
    pictures: [],
    reviews: [],
  },
  currentUser: {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "",
  },
  bookings: [],
  bookingDisplay: false,
  toggleBooking: "future",
  setToggleBooking: (arg) => {
    set({ toggleBooking: arg });
  },
  toggleDisplay: () => {
    set({ bookingDisplay: !get().bookingDisplay });
  },
  setCurrentUser: (userFromServer) => {
    set({
      currentUser: userFromServer,
    });
  },
  fetchAllHouses: () => {
    fetch(`${baseUrl}/houses`)
      .then((resp) => resp.json())
      .then((allHouses) => {
        set({ houses: allHouses });
      })
      .catch((error) => {
        console.error("Unable to fetch all houses", error);
      });
  },
  fetchOneHouse: (houseId) => {
    fetch(`${baseUrl}/houses/${houseId}`)
      .then((resp) => resp.json())
      .then((houseFromServer) => {
        console.log(houseFromServer);
        set({ house: houseFromServer });
      })
      .catch((error) => {
        console.error("Unable to fetch all houses", error);
      });
  },

  filterHouses: (filterOptions) => {
    let { city, checkIn, checkOut, maxGuests } = filterOptions;
    console.log("data filter", filterOptions);
    const cityFilter = city !== "" ? `city=${city}&` : "";
    checkIn = checkIn !== "" ? checkIn : new Date().toISOString();
    checkOut = checkOut !== "" ? checkOut : new Date(2025, 1, 1).toISOString();
    fetch(
      `${baseUrl}/houses?${cityFilter}checkIn=${checkIn}&checkOut=${checkOut}&maxGuests=${maxGuests}`
    )
      .then((resp) => resp.json())
      .then((allHouses) => {
        set({ houses: allHouses });
        console.log("All houses fetch", allHouses);
      })
      .catch((error) => {
        throw error;
      });
  },

  // must supply FormData with a form object and event
  // remove 'headers' from fetch
  // only accepts strings not numbers. Doesn't like Arrays - json parse in backend.
  // 'npm i --save multer' in backend to accept new file type
  addNewListing: (e, housedata) => {
    const formDataObj = new FormData(e.target as HTMLFormElement);
    formDataObj.append("facility", JSON.stringify(housedata.facility));

    console.log("housedata", housedata);
    console.log("formDataObj", formDataObj.get("pictures"));

    fetch(`${baseUrl}/houses`, {
      method: "POST",
      credentials: "include",
      body: formDataObj,
    })
      .then((resp) => resp.json())
      // .then(newHouse => {
      //   set({ houses: [...houses, newHouse] })
      //   console.log("newHouse", newHouse)
      // })
      .then((newHouse) => console.log("newHouse", newHouse))
      .catch((error) => {
        throw error;
      });
  },
  getValidateCurrToken: () => {
    fetch("http://localhost:4000/token", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((userToken) => {
        set({ currentUser: userToken });
      });
  },

  getBookingsForHost: () => {
    fetch("http://localhost:4000/bookings/host", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((respFromBookings) => {
        set({ bookings: respFromBookings });
      })
      .catch((error) => {
        console.error("Unable to fetch all bookings", error);
      });
  },
  getBookingsForGuest: () => {
    fetch("http://localhost:4000/bookings/guest", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((respFromBookings) => {
        set({ bookings: respFromBookings });
      })
      .catch((error) => {
        console.error("Unable to fetch all bookings", error);
      });
  },

  deleteBooking: (id) => {
    fetch(`${baseUrl}/bookings/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        console.log("i am deleting");
        const allBookings = get().bookings;
        const filteredBookings = allBookings.filter(
          (booking) => booking.bookingId !== id
        );
        set({ bookings: filteredBookings });
      })
      .catch((error) => {
        throw error;
      });
  },
}));

export default useStore;
//test
