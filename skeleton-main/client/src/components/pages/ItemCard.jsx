import { React, useState, useEffect } from "react";
import Link from "react-router-dom";

import "./ItemCard.css";

import backgroundimg from "../../assets/mit-dome.jpg";
import defaultpfpimg from "../../assets/blank-profile.png";

/**
 * It is a component that displays a singular item for sale.
 *
 * Proptypes
 * @param {string} _id of the item
 * @param {string} seller
 * @param {string} seller_id
 * @param {string} name of the item
 * @param {number} price
 * @param {string} category
 * @param {string} condition
 * @param {string} description of the item
 * @param {array} images of the item
 */

const ItemCard = (props) => {
  const itemImages = props.images;
  const [selectedImage, setSelectedImage] = useState(itemImages[0]);

  const changeSelectedImage = (index) => {
    setSelectedImage(itemImages[index]);
  };

  const createImageIcon = (image, index) => {
    if (image === selectedImage) {
      return (
        <img
          src={image}
          className="Selected-image"
          alt="Item Image"
          id={index}
          onClick={changeSelectedImage.bind(this, index)}
        />
      );
    } else {
      return (
        <img
          src={image}
          className="Single-image"
          alt="Item Image"
          id={index}
          onClick={changeSelectedImage.bind(this, index)}
        />
      );
    }
  };

  const createImageList = () => {
    return itemImages.map((image, index) => createImageIcon(image, index));
  };

  const [imagesList, setImagesList] = useState(createImageList());

  useEffect(() => {
    setImagesList(createImageList());
  }, [selectedImage]);

  return (
    <div className="Item-page">
      <div className="Item-main-container">
        <div className="Item-images-container">
          <div className="Images-list-container">{imagesList}</div>
          <div className="Main-image-container">
            <img src={selectedImage} className="Main-image" />
          </div>
        </div>
        <div className="Item-information">
          <>
            <h1 className="Item-name">{props.name}</h1>
            <h1 className="Item-cost">{props.price}</h1>
          </>
          <Link to={`/profile/${props.seller_id}`} className="Item-seller">
            {props.seller}
          </Link>
          <div className="Item-tags">
            <div className="Item-category">{props.category}</div>
            <div className="Item-condition">{props.condition}</div>
          </div>
          <button className="Cart-button">Add to Cart</button>
        </div>
      </div>
      <div className="Item-description-container">
        <h1 className="Item-description-header">Item Description</h1>
        <div className="Item-description">{props.description}</div>
      </div>
    </div>
  );
};

export default ItemCard;
