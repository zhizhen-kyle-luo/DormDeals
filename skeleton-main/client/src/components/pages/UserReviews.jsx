import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import "./UserReviews.css";

const UserReviews = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // First get the user info
    get("/api/user", { userid: userId })
      .then((userObj) => {
        setUser(userObj[0]);
        // Then get their reviews - using the correct endpoint
        return get("/api/getreviews", { seller_id: userId });
      })
      .then((reviewsObj) => {
        console.log("Fetched reviews:", reviewsObj);
        setReviews(reviewsObj || []);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (isLoading) {
    return (
      <div className="UserReviews-container">
        <div className="Loading-spinner">Loading reviews...</div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
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
