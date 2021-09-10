import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

type SignUpUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  bio: string;
  guestRole?: string;
  hostRole?: string;
};

export default function RegisterPage() {
  const history = useHistory();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    let loginData: SignUpUser = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
      avatar: form.avatar.value,
      bio: form.bio.value,
    };
    if (form.radio.value === "guest") {
      loginData = { ...loginData, guestRole: "guest" };
    } else {
      loginData = { ...loginData, hostRole: "host" };
    }

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    }).then(() => {
      form.reset();
      history.push("/");
    });
  }
  return (
    <main className="main-register-div">
      <div className="signup-container">
        <h1 className="signup-title"> Register</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            className="input"
            variant="outlined"
            name="firstName"
            type="text"
            placeholder="First name"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            name="lastName"
            type="text"
            placeholder="Last name"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            name="email"
            type="text"
            placeholder="Email"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            name="username"
            type="text"
            placeholder="Username"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            name="password"
            type="text"
            placeholder="Password"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            name="avatar"
            type="text"
            placeholder="Avatar"
          ></TextField>
          <TextField
            className="input"
            variant="outlined"
            multiline
            rows={4}
            name="bio"
            placeholder="Tell us a bit about yourself..."
          ></TextField>
          <div className="radio-buttons">
            <div className="radio">
              <input type="radio" id="guest" name="radio" value="guest"></input>
              <label htmlFor="guest"> Guest</label>
            </div>
            <div className="radio">
              <input type="radio" id="host" name="radio" value="host"></input>
              <label htmlFor="host"> Host</label>
            </div>
          </div>
          <Button
            className="signup-button"
            color="secondary"
            variant="contained"
            type="submit"
          >
            {" "}
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
