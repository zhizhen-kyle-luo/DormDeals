import { React, useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../App.jsx";
import OrderCard from "./OrderCard";
import "./UserPurchases.css";

const UserPurchases = () => {
  const { userId } = useParams();
  const { userId: currentUserId } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [reviewingItem, setReviewingItem] = useState({});
  const [reviewData, setReviewData] = useState({
    seller: { name: "", _id: "" },
    itemId: "",
    rating: "",
    review: "",
  });

  useEffect(() => {
    // Only fetch purchases if viewing own purchases
    if (userId === currentUserId) {
      get("/api/purchases", { userId })
        .then((purchasedItems) => {
          console.log("Fetched purchases:", purchasedItems);
          setPurchases(Array.isArray(purchasedItems) ? purchasedItems : []); // Ensure we always have an array
        })
        .catch((error) => {
          console.error("Error fetching purchases:", error);
          setPurchases([]);
        });
    }
  }, [userId, currentUserId]);

  // Separate ongoing and past orders
  const ongoingOrders = purchases.filter((item) => item.status === "Under Transaction");
  const pastOrders = purchases.filter((item) => item.status === "Sold");

  const submitReview = (item) => {
    setReviewingItem(item);
    document.getElementById("Form").style.display = "flex";
  };

  const closeReview = () => {
    setReviewingItem({});
    setReviewData({
      seller: { name: "", _id: "" },
      itemId: "",
      rating: "",
      review: "",
    });
    document.getElementById("Form").style.display = "none";
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

      const newReview = await post("/api/newreview", reviewDataToSend);

      if (newReview) {
        // Clear form
        closeReview();

        // Show success message for 2 seconds then redirect
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit a review:", error);
    }
  };

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>

      <div className="Purchases-section">
        <h2>Ongoing Orders</h2>
        <div className="Purchases-grid">
          {ongoingOrders.map((item) => (
            <div key={item._id} className="Purchase-item">
              <OrderCard order={item} />
              <div className="Purchase-status">Status: {item.status}</div>
              <div className="Purchase-date">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          ))}
          {ongoingOrders.length === 0 && (
            <div className="No-purchases">
              <p>No ongoing orders.</p>
            </div>
          )}
        </div>
      </div>

      <div className="Purchases-section">
        <h2>Past Orders</h2>
        <div className="Purchases-grid">
          {pastOrders.map((item) => (
            <div key={item._id} className="Purchase-item">
              <OrderCard order={item} />
              <div className="Purchase-status">Status: {item.status}</div>
              <div className="Purchase-date">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </div>
              <button className="Purchase-review" onClick={submitReview.bind(this, item)}>
                Leave a Review
              </button>
            </div>
          ))}
          {pastOrders.length === 0 && (
            <div className="No-purchases">
              <p>No past orders.</p>
            </div>
          )}
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="No-purchases">
          <p>You haven't made any purchases yet.</p>
        </div>
      )}
      <div id="Form" className="edit-Form-popup">
        <form className="Form-container">
          <h1>Leave a Review for {reviewingItem.name}</h1>
          <h3>Plese rate your experience with {reviewingItem.seller} out of 5</h3>
          <select
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <h3>Write a Review</h3>
          <textarea
            cols="40"
            rows="6"
            placeholder={`How easy was the transaction process? Was the item as described? How did ${reviewingItem.seller} do?`}
            id="review"
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
            required
          />
          <button
            className="Cancel-button"
            type="button"
            onClick={() => {
              closeReview();
            }}
          >
            Cancel
          </button>
          <button
            className="Submit-button"
            type="button"
            onClick={() => {
              handleSubmit();
              closeReview();
            }}
          >
            Make Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPurchases;
