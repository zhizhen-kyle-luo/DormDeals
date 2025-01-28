import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import "./UserReviews.css";

const UserReviews = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // First get the user info
    get("/api/user", { userid: userId })
      .then((userObj) => {
        setUser(userObj[0]);
        // Then get their reviews - using the correct endpoint with proper parameter format
        return get("/api/reviews", { name: userObj[0].name, _id: userId });
      })
      .then((reviewsObj) => {
        console.log("Fetched reviews:", reviewsObj);
        // Add detailed logging for review calculation
        if (reviewsObj && reviewsObj.length > 0) {
          console.log("Individual ratings:", reviewsObj.map(r => r.rating));
          const sum = reviewsObj.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
          console.log("Sum of ratings:", sum);
          console.log("Number of reviews:", reviewsObj.length);
          console.log("Calculated average:", sum / reviewsObj.length);
        }
        setReviews(reviewsObj || []);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      });
  }, [userId]);

  const renderStars = (rating) => {
    // Ensure rating is a valid number between 0 and 5
    const validRating = Math.max(0, Math.min(5, Math.round(rating) || 0));
    return "★".repeat(validRating) + "☆".repeat(5 - validRating);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="UserReviews-container">
      <div className="UserReviews-header">
        <h1 className="UserReviews-title">Reviews for {user?.name || "User"}</h1>
        {reviews.length > 0 && (
          <div className="UserReviews-summary">
            <span className="UserReviews-rating">
              <span className="Review-stars">{renderStars(Math.round(averageRating))}</span>
              {averageRating}/5
            </span>
            <span className="UserReviews-count">({reviews.length} reviews)</span>
          </div>
        )}
      </div>
      <div className="UserReviews-grid">
        {reviews.length === 0 ? (
          <div className="No-reviews">No reviews yet</div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="Review-card">
              <div className="Review-header">
                <Link to={`/profile/${review.reviewer._id}`} className="Review-seller">
                  {review.reviewer.name}
                </Link>
                <div className="Review-rating">
                  <span className="Review-stars">{renderStars(review.rating)}</span>
                  {review.rating}/5
                </div>
              </div>
              <p className="Review-text">{review.review}</p>
              <div className="Review-date">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserReviews;
