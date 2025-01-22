import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utilities";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    get(`/api/order`, { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
      if (orderObj && orderObj.images.length > 0) {
        setSelectedImage(orderObj.images[0]);
      }
    });
  }, [orderId]);

  if (!order) {
    return <div className="OrderDetails-loading">Loading...</div>;
  }

  const changeSelectedImage = (index) => {
    setSelectedImage(order.images[index]);
  };

  const createImageIcon = (image, index) => {
    return (
      <img
        key={index}
        src={image}
        className={image === selectedImage ? "Selected-image" : "Single-image"}
        alt="Item Image"
        onClick={() => changeSelectedImage(index)}
      />
    );
  };

  return (
    <div className="Item-page">
      <div className="Item-main-container">
        <div className="Item-images-container">
          <div className="Images-list-container">
            {order.images.map((image, index) => createImageIcon(image, index))}
          </div>
          <div className="Main-image-container">
            <img src={selectedImage} className="Main-image" alt={order.itemName} />
          </div>
        </div>
        <div className="Item-information">
          <>
            <h1 className="Item-name">{order.itemName}</h1>
            <h1 className="Item-cost">${order.price}</h1>
          </>
          <div className="Item-seller">Seller: {order.seller}</div>
          <div className="Item-tags">
            <div className="Item-category">{order.category}</div>
            <div className="Item-condition">{order.condition}</div>
          </div>
          <button className="Cart-button">Add to Cart</button>
        </div>
      </div>
      <div className="Item-description-container">
        <h1 className="Item-description-header">Item Description</h1>
        <div className="Item-description">{order.description}</div>
      </div>
    </div>
  );
};

export default OrderDetails;
