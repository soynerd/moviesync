import React from "react";

function Rating({ rating }) {
  const message =
    rating < 5
      ? rating + " " + "😕"
      : rating >= 5 && rating < 8
      ? rating + " " + "😐"
      : rating + " " + "😁";
  return message;
}

export default Rating;
