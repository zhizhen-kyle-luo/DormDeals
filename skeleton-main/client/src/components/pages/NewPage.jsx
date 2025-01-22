import React, { useState } from "react";
import { post } from "../../utilities";
import { useNavigate } from "react-router-dom";
import "./NewPage.css";

const NewPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    category: "",
    description: "",
    images: [],
    condition: "used",
  });
  const [submitStatus, setSubmitStatus] = useState(""); // For success/error messages

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
    setSubmitStatus("Submitting...");
    
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
      const newOrder = await post("/api/orders", formDataToSend);
      setSubmitStatus("Order posted successfully!");
      
      // Clear form
      setFormData({
        itemName: "",
        price: "",
        category: "",
        description: "",
        images: [],
        condition: "used",
      });

      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (error) {
      console.error("Failed to create order:", error);
      setSubmitStatus("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="NewPage-container">
      <h1>Create New Order</h1>
      {submitStatus && (
        <div className={`NewPage-status ${submitStatus.includes("Failed") ? "error" : "success"}`}>
          {submitStatus}
        </div>
      )}
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
