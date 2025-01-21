import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utilities";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    get(`/api/order`, { orderId: orderId }).then((orderObj) => {
      setOrder(orderObj);
    });
  }, [orderId]);

  if (!order) {
    return <div className="OrderDetails-loading">Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === order.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? order.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="OrderDetails-container">
      <div className="OrderDetails-content">
        <div className="OrderDetails-imageSection">
          <div className="OrderDetails-imageContainer">
            {order.images.length > 1 && (
              <button className="OrderDetails-imageNav prev" onClick={prevImage}>
                ‹
              </button>
            )}
            <img
              src={order.images[currentImageIndex]}
              alt={`${order.itemName} - Image ${currentImageIndex + 1}`}
              className="OrderDetails-mainImage"
            />
            {order.images.length > 1 && (
              <button className="OrderDetails-imageNav next" onClick={nextImage}>
                ›
              </button>
            )}
          </div>
          {order.images.length > 1 && (
            <div className="OrderDetails-thumbnails">
              {order.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`OrderDetails-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="OrderDetails-info">
          <h1 className="OrderDetails-title">{order.itemName}</h1>
          
          <div className="OrderDetails-price">
            <span className="label">Price:</span>
            <span className="value">${order.price}</span>
          </div>

          <div className="OrderDetails-metadata">
            <div className="metadata-item">
              <span className="label">Category:</span>
              <span className="value">{order.category}</span>
            </div>
            <div className="metadata-item">
              <span className="label">Condition:</span>
              <span className="value">{order.condition}</span>
            </div>
          </div>

          <div className="OrderDetails-description">
            <h2>Description</h2>
            <p>{order.description}</p>
          </div>

          <div className="OrderDetails-contact">
            <h2>Contact Seller</h2>
            <button className="OrderDetails-contactButton">
              Message Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
