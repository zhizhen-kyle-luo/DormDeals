import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import "./UserReviews.css";

const UserReviews = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    // First get the user info
    get("/api/user", { userid: userId })
      .then((userObj) => {
        setUser(userObj[0]);
        // Then get their reviews - using the correct endpoint with proper parameter format
        return get("/api/reviews", { userId: userId });
      })
      .then((reviewsObj) => {
        setReviews(reviewsObj);
        if (reviewsObj && reviewsObj.length > 0) {
          const sum = reviewsObj.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(sum / reviewsObj.length);
        }
      })
      .catch((error) => {
        setReviews([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const renderStars = (rating) => {
    // Ensure rating is a valid number between 0 and 5
    const validRating = Math.max(0, Math.min(5, Math.round(rating) || 0));
    return "★".repeat(validRating) + "☆".repeat(5 - validRating);
  };

  if (isLoading) {
    return (
      <div className="UserReviews-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="UserReviews-container">
      <div className="UserReviews-header">
        <h1 className="UserReviews-title">Reviews for {user?.name || "User"}</h1>
        {reviews.length > 0 && (
          <div className="UserReviews-summary">
            <span className="UserReviews-rating">
              <span className="Review-stars">{renderStars(Math.round(averageRating))}</span>
              {averageRating.toFixed(1)}/5
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
