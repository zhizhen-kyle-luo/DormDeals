import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import defaultpfpimg from "../../assets/blank-profile.png";

import "./UserReviews.css";

const UserReviews = () => {
  let props = useParams();
  const [seller, setSeller] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((sellerObj) => {
      setSeller(sellerObj[0].name);
      get(`/api/reviews`, { name: sellerObj[0].name, _id: props.userId }).then((reviewsObj) => {
        setReviews(reviewsObj);
      });
    });
  }, []);

  return (
    <div className="Reviews-container">
      <h1>Reviews for {seller}</h1>
      <div className="Reviews-grid">
        {reviews.map((review) => (
          <div className="Review-card">
            <h3 className="Review-author">{review.reviewer.name}</h3>
            <div className="Review-rating">Rating: {review.rating}</div>
            <div className="Review-main">{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
