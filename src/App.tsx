import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import GuestDashPage from "./pages/GuestDashPage";
import HostDashPage from "./pages/HostDashPage";
import HouseListingPage from "./pages/HouseListingPage";
import WrongTurn from "./pages/WrongTurn";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/SignUp";
import GuestProfilePage from "./pages/GuestProfilePage";
import BottomNav from "./components/BottomNav";
import useStore from "./store";
import AddListingHost from "./pages/AddListingHost";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const currentUser = useStore((store) => store.currentUser);
  const getValidateCurrToken = useStore((store) => store.getValidateCurrToken);

  useEffect(() => {
    getValidateCurrToken();
  }, []);

  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <Nav />
          <div className="main-content">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/signup" exact>
                <RegisterPage />
              </Route>
              <Route path="/house/:houseId" exact>
                <HouseListingPage />
              </Route>
              <Route path="/guest/dashboard" exact>
                {currentUser.role === "guest" ? (
                  <GuestDashPage />
                ) : (
                  <LoadingPage />
                )}
              </Route>
              <Route path="/host/dashboard" exact>
                {currentUser.role === "host" ? (
                  <HostDashPage />
                ) : (
                  <LoadingPage />
                )}
              </Route>
              <Route path="/host/dashboard/addlisting" exact>
                {currentUser.role === "host" ? (
                  <AddListingHost />
                ) : (
                  <LoadingPage />
                )}
              </Route>
              <Route path="/guest/profile" exact>
                {currentUser.role === "guest" ? (
                  <GuestProfilePage />
                ) : (
                  <LoadingPage />
                )}
              </Route>
              <Route path="*">
                <WrongTurn />
              </Route>
            </Switch>
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default App;
