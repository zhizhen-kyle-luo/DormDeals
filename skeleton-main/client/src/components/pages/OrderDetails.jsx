import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utilities";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    get(`/api/order`, { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
      if (orderObj && orderObj.images.length > 0) {
        setSelectedImage(orderObj.images[0]);
      }
    });
  }, [orderId]);

  const handleAddToCart = async () => {
    if (!order || isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      await post(`/api/cart/${order._id}`);
      setCartMessage("Added to cart!");
      // Trigger any parent component updates if needed
      if (typeof props.onCartUpdate === "function") {
        props.onCartUpdate();
      }
    } catch (error) {
      setCartMessage("Failed to add to cart. Please try again.");
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
      // Clear message after 3 seconds
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  if (!order) {
    return <div className="OrderDetails-loading">Loading...</div>;
  }

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
          <div className="OrderDetails-seller">Seller: {order.seller}</div>

          <div className="OrderDetails-tags">
            <span className="OrderDetails-category">{order.category}</span>
            <span className="OrderDetails-condition">{order.condition}</span>
          </div>

          <div className="OrderDetails-description">
            <h2>Description</h2>
            <p>{order.description}</p>
          </div>

          <div className="OrderDetails-actions">
            <button 
              className={`OrderDetails-button OrderDetails-addToCart ${isAddingToCart ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button className="OrderDetails-button OrderDetails-contact">Contact Seller</button>
            {cartMessage && (
              <div className="OrderDetails-message">{cartMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
