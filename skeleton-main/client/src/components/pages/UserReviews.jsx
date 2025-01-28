import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import defaultpfpimg from "../../assets/blank-profile.png";

import "./UserReviews.css";

const UserReviews = () => {
  let props = useParams();
  const [seller, setSeller] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ratingIcon = {
    1: "★☆☆☆☆",
    2: "★★☆☆☆",
    3: "★★★☆☆",
    4: "★★★★☆",
    5: "★★★★★",
  };

  useEffect(() => {
    setIsLoading(true);
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((sellerObj) => {
      setSeller(sellerObj[1]);
      get(`/api/reviews`, { name: sellerObj[0].name, _id: props.userId }).then((reviewsObj) => {
        setReviews(reviewsObj);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  console.log(seller);
  return (
    <div className="Reviews-container">
      <h1>Reviews for {seller.user.name}</h1>
      <div className="User-rating">{`★ ${Number(seller.rating[0]).toFixed(1)} (${
        seller.rating[1]
      })`}</div>
      <div className="Reviews-grid">
        {reviews.map((review) => (
          <div className="Review-card">
            <div className="Review-author">
              <div className="Review-author-imageContainer">
                <img src={seller.picture} className="Review-author-image" />
              </div>
              <h3 className="Review-author-name">{review.reviewer.name}</h3>
            </div>
            <div className="Review-rating">{ratingIcon[review.rating]}</div>
            <hr className="Review-divide" />
            <div className="Review-main">{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
