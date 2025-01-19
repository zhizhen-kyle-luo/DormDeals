import React, { useState } from "react";
import { post } from "../../utilities";
import "./NewPage.css";

const NewPage = (props) => {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    category: "",
    description: "",
    images: [],
    condition: "used", // default value
  });

  const categories = [
    "Textbooks",
    "Electronics",
    "Furniture",
    "Clothing",
    "School Supplies",
    "Other",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("itemName", formData.itemName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("condition", formData.condition);
    
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      await post("/api/orders", formDataToSend);
      // Redirect to home page or show success message
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="NewPage-container">
      <h1>Create New Order</h1>
      <form onSubmit={handleSubmit} className="NewPage-form">
        <div className="NewPage-formGroup">
          <label htmlFor="itemName">Item Name *</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="NewPage-formGroup">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="NewPage-formGroup">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="NewPage-formGroup">
          <label htmlFor="condition">Condition *</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
          >
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
            <option value="fair">Fair</option>
          </select>
        </div>

        <div className="NewPage-formGroup">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
          />
        </div>

        <div className="NewPage-formGroup">
          <label htmlFor="images">Images (Max 5) *</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            required
          />
          <small>First image will be the cover image</small>
        </div>

        <button type="submit" className="NewPage-submit">
          Post Order
        </button>
      </form>
    </div>
  );
};

export default NewPage;
