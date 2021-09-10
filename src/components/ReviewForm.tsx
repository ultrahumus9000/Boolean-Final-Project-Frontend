import React, { useState } from "react";
import { Review } from "../store";

export default function ReviewForm({ toggleReview }) {
  // need to create form to do it and backend already set up
  //   reviews

  return (
    <>
      <button type="submit">Confirm</button>
      <button onClick={toggleReview}>Cancel</button>
    </>
  );
}
