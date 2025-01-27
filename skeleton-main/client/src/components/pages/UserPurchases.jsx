import { React, useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";
import OrderCard from "./OrderCard";
import "./UserPurchases.css";

const UserPurchases = () => {
  const { userId } = useParams();
  const { userId: currentUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewingItem, setReviewingItem] = useState({});
  const [reviewData, setReviewData] = useState({
    seller: { name: "", _id: "" },
    itemId: "",
    rating: "5",
    review: "",
  });

  useEffect(() => {
    if (userId === currentUserId) {
      setIsLoading(true);
      get("/api/purchases", { userId })
        .then((purchasedItems) => {
          console.log("Fetched purchases:", purchasedItems);
          setPurchases(Array.isArray(purchasedItems) ? purchasedItems : []);
        })
        .catch((error) => {
          console.error("Error fetching purchases:", error);
          setPurchases([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, currentUserId]);

  const ongoingOrders = purchases.filter((item) => item.status === "Under Transaction");
  const pastOrders = purchases.filter((item) => item.status === "Sold");

  const submitReview = (item) => {
    setReviewingItem(item);
    document.getElementById("reviewForm").style.display = "block";
  };

  const closeReview = () => {
    setReviewingItem({});
    setReviewData({
      seller: { name: "", _id: "" },
      itemId: "",
      rating: "5",
      review: "",
    });
    document.getElementById("reviewForm").style.display = "none";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reviewDataToSend = {
        seller: { name: reviewingItem.seller, _id: reviewingItem.seller_id },
        itemId: reviewingItem._id,
        rating: reviewData.rating,
        review: reviewData.review,
      };

      await post("/api/newreview", reviewDataToSend);
      closeReview();
      // Refresh purchases after submitting review
      const updatedPurchases = await get("/api/purchases", { userId });
      setPurchases(Array.isArray(updatedPurchases) ? updatedPurchases : []);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="Purchases-container">
        <div className="Loading-spinner">Loading your purchases...</div>
      </div>
    );
  }

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>

      <div className="Purchases-section">
        <h2>Ongoing Orders</h2>
        <div className="Purchases-grid">
          {ongoingOrders.length === 0 ? (
            <div className="No-purchases">
              <p>No ongoing orders.</p>
            </div>
          ) : (
            ongoingOrders.map((item) => (
              <div key={item._id} className="Purchase-item">
                <OrderCard order={item} />
                <div className="Purchase-status" data-status={item.status}>
                  {item.status}
                </div>
                <div className="Purchase-date">
                  Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="Purchases-section">
        <h2>Past Orders</h2>
        <div className="Purchases-grid">
          {pastOrders.length === 0 ? (
            <div className="No-purchases">
              <p>No completed orders yet.</p>
            </div>
          ) : (
            pastOrders.map((item) => (
              <div key={item._id} className="Purchase-item">
                <OrderCard order={item} />
                <div className="Purchase-status" data-status={item.status}>
                  {item.status}
                </div>
                <div className="Purchase-date">
                  Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                </div>
                <button className="Purchase-review" onClick={() => submitReview(item)}>
                  Leave a Review
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="No-purchases">
          <p>You haven't made any purchases yet.</p>
          <Link to="/" style={{ color: '#e07007', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
            Start Shopping
          </Link>
        </div>
      )}

      <div id="reviewForm" className="edit-Form-popup">
        <div className="Form-container">
          <h1>Review Your Purchase</h1>
          <h3>Rate your experience with {reviewingItem.seller}</h3>
          <select
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            required
          >
            <option value="5">★★★★★ (5) Excellent</option>
            <option value="4">★★★★☆ (4) Good</option>
            <option value="3">★★★☆☆ (3) Average</option>
            <option value="2">★★☆☆☆ (2) Poor</option>
            <option value="1">★☆☆☆☆ (1) Very Poor</option>
          </select>

          <h3>Write your review</h3>
          <textarea
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
            placeholder="Share your experience about the item and the seller..."
            required
          />

          <button type="button" className="Submit-button" onClick={handleSubmit}>
            Submit Review
          </button>
          <button type="button" className="Cancel-button" onClick={closeReview}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPurchases;
