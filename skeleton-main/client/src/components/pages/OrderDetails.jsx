import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { get, post } from "../../utilities";
import { CartContext } from "../App.jsx";
import { getCategoryWithEmoji } from "../../utilities/categoryUtils";
import "./OrderDetails.css";

const OrderDetails = (props) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [statusButton, setStatusButton] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: "5",
    review: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    setIsLoading(true);
    get(`/api/whoami`).then((viewingUserObj) => setViewingUser(viewingUserObj));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    get(`/api/order`, { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
      if (orderObj && orderObj.images.length > 0) {
        setSelectedImage(orderObj.images[0]);
      }
      if (orderObj.status === "Sold") {
        setStatus("Sold");
        setStatusColor("u-red");
        setStatusButton("Put back on market");
      } else if (orderObj.status === "Under Transaction") {
        setStatus("Under Transaction");
        setStatusColor("u-gold");
        setStatusButton("Mark as sold");
      } else {
        setStatus("Active");
        setStatusColor("u-green");
        setStatusButton("Mark as sold");
      }
      setIsLoading(false);
    });
  }, [orderId]);

  useEffect(() => {
    if (order && order.reviewed) {
      setReviewData({
        rating: order.review.rating.toString(),
        review: order.review.text || "",
      });
    }
  }, [order]);

  const handleAddToCart = () => {
    if (!viewingUser || !order) return;

    // Prevent adding own items
    if (order.seller_id === viewingUser._id) {
      alert("You cannot add your own items to cart");
      return;
    }

    // Check if item is already in cart
    const isInCart = cartItems.some((item) => item.itemId === order._id);
    if (isInCart) {
      alert("This item is already in your cart");
      return;
    }

    const cartItem = {
      _id: order._id,
      itemId: order._id,
      name: order.name,
      price: order.price,
      images: order.images,
      description: order.description,
      seller_id: order.seller_id,
      status: order.status,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  const handlePurchaseNow = () => {
    if (!viewingUser || !order) return;

    // Prevent purchasing own items
    if (order.seller_id === viewingUser._id) {
      alert("You cannot purchase your own items");
      return;
    }

    navigate("/purchase", {
      state: {
        items: [
          {
            _id: order._id,
            name: order.name,
            price: order.price,
            images: order.images,
            category: order.category,
            condition: order.condition,
            seller_id: order.seller_id,
            seller: order.seller,
          },
        ],
      },
    });
  };

  const sellItem = () => {
    if (!order) return;

    post("/api/sellitem", { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
      if (orderObj.status === "Sold") {
        setStatus("Sold");
        setStatusColor("u-red");
        setStatusButton("Put back on market");
      } else if (orderObj.status === "Under Transaction") {
        setStatus("Under Transaction");
        setStatusColor("u-gold");
        setStatusButton("Mark as sold");
      } else {
        setStatus("Active");
        setStatusColor("u-green");
        setStatusButton("Mark as sold");
      }
    });
  };

  const removeItem = () => {
    if (!order) return;

    if (
      window.confirm(
        "Warning: This will permanently delete this item from the database. This action cannot be undone. Are you sure you want to proceed?"
      )
    ) {
      post("/api/removeitem", { orderId: orderId });
      navigate("/home");
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!order || !viewingUser) return;

    try {
      const reviewDataToSend = {
        seller: { name: order.seller, _id: order.seller_id },
        itemId: order._id,
        rating: reviewData.rating,
        review: reviewData.review,
      };

      await post("/api/newreview", reviewDataToSend);
      setShowReviewForm(false);

      // Refresh order data to update the review status
      const updatedOrder = await get(`/api/order`, { orderId });
      setOrder(updatedOrder);

      // Update the review data state with the new review
      setReviewData({
        rating: updatedOrder.review.rating.toString(),
        review: updatedOrder.review.text || "",
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="OrderDetails-container">
        <div>Loading...</div>
      </div>
    );
  }

  if (!order || !viewingUser) return <div>Loading...</div>;

  const isSellerView = order.seller_id === viewingUser._id;
  const removeItemVisible = isSellerView ? "u-visible" : "u-invisible";

  return (
    <div className="OrderDetails-container">
      <div className="OrderDetails-content">
        <div className="OrderDetails-imageSection">
          <img src={selectedImage} alt={order.name} className="OrderDetails-mainImage" />
          <div className="OrderDetails-thumbnails">
            {order.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${order.name} view ${index + 1}`}
                className={`OrderDetails-thumbnail ${image === selectedImage ? "active" : ""}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="OrderDetails-info">
          <h1 className="OrderDetails-title">{order.name}</h1>
          <div className="OrderDetails-price">${order.price}</div>
          <Link to={`/profile/${order.seller_id}`} className="OrderDetails-seller">
            Seller: {order.seller}
          </Link>
          {order.purchaseDate && (
            <div className="OrderDetails-purchase-date">
              Purchased on {new Date(order.purchaseDate).toLocaleDateString()}
            </div>
          )}

          <div className="OrderDetails-tags">
            <span className={`OrderDetails-status ${statusColor}`}>{status}</span>
            <span className="OrderDetails-category">{getCategoryWithEmoji(order.category)}</span>
            <span className="OrderDetails-condition">{order.condition}</span>
          </div>

          <div className="OrderDetails-description">
            <h2>Description</h2>
            <p>{order.description}</p>
          </div>

          <div className="OrderDetails-actions">
            {order.status !== "Under Transaction" && order.status !== "Sold" && (
              <>
                <button
                  className="OrderDetails-button OrderDetails-addToCart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="OrderDetails-button OrderDetails-purchaseNow"
                  onClick={handlePurchaseNow}
                >
                  Purchase Now
                </button>
              </>
            )}
            {order.status === "Sold" && viewingUser._id === order.buyer_id && (
              <button
                className="OrderDetails-button OrderDetails-review"
                onClick={() => setShowReviewForm(true)}
              >
                {order.reviewed ? "Edit Review" : "Leave a Review"}
              </button>
            )}
            <button
              className={`OrderDetails-button OrderDetails-sold ${removeItemVisible}`}
              onClick={sellItem}
            >
              {statusButton}
            </button>
            <button
              className={`OrderDetails-button OrderDetails-remove ${removeItemVisible}`}
              onClick={removeItem}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>

      {showReviewForm && (
        <div className="OrderDetails-reviewForm">
          <div className="ReviewForm-content">
            <h2>{order.reviewed ? "Edit Your Review" : "Review Your Purchase"}</h2>
            <h3>Rate your experience with {order.seller}</h3>
            <select name="rating" value={reviewData.rating} onChange={handleInputChange} required>
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

            <div className="ReviewForm-actions">
              <button className="ReviewForm-submit" onClick={handleReviewSubmit}>
                {order.reviewed ? "Update Review" : "Submit Review"}
              </button>
              <button className="ReviewForm-cancel" onClick={() => setShowReviewForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
