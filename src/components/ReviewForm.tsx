import React, { SyntheticEvent, useState } from "react";
import useStore, { Review } from "../store";

export default function ReviewForm({ houseId, toggleReview }) {
  const [review, setReview] = useState("");
  const addReview = useStore((state) => state.addReview);
  const currentUser = useStore((state) => state.currentUser);

  function handleChange(e) {
    setReview(e.target.value);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    addReview(review, houseId);
    toggleReview();
  }

  return (
    <>
      <form className="review-form">
        <label>
          <textarea
            name="comment"
            rows={4}
            cols={30}
            placeholder="How did we do?"
            onChange={handleChange}
            value={review}
          ></textarea>
        </label>
        <a className="cancelLink" onClick={toggleReview}>
          Cancel
        </a>
        <button className="submitBtn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
