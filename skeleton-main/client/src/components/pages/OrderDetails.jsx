import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";
import { CartContext } from "../App.jsx";
import "./OrderDetails.css";

const OrderDetails = (props) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewingUser, setViewingUser] = useState();
  const navigate = useNavigate();

  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    get(`/api/whoami`).then((viewingUserObj) => setViewingUser(viewingUserObj));
  }, []);

  useEffect(() => {
    get(`/api/order`, { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
      if (orderObj && orderObj.images.length > 0) {
        setSelectedImage(orderObj.images[0]);
      }
    });
  }, [orderId]);

  const handleAddToCart = () => {
    const cartItem = {
      _id: order._id,
      itemId: order._id,
      name: order.name,
      price: order.price,
      images: order.images,
      discription: order.description,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  if (!order) return <div>Loading...</div>;

  const removeItem = () => {
    post("/api/removeitem", { orderId: orderId });

    navigate("/home");
  };

  let removeItemVisible;
  if (order.seller_id === viewingUser._id) {
    removeItemVisible = "u-visible";
  } else {
    removeItemVisible = "u-invisible";
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
              className="OrderDetails-button OrderDetails-addToCart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="OrderDetails-button OrderDetails-contact">Contact Seller</button>
            <button
              className={`OrderDetails-button OrderDetails-remove ${removeItemVisible}`}
              onClick={removeItem}
            >
              Mark as Sold/Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
