import React, { useState } from "react";
import { Review } from "../store";
type ReviewProp = {
  review: Review;
};

export default function SingleReview({ review }: ReviewProp) {
  return (
    <section className="single-review">
      <span>{review.content}</span>
      <div className="guest-div">
        <img className="host-profile" src={review.guestAvatar} />
        <span>{review.guestUsername} </span>
      </div>
    </section>
  );
}
