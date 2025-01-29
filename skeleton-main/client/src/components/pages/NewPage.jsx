import React, { useState, useRef } from "react";
import { post } from "../../utilities";
import { useNavigate } from "react-router-dom";
import "./NewPage.css";

const NewPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    category: "",
    description: "",
    images: [],
    condition: "used",
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    "Textbooks 📚",
    "Electronics 💻",
    "Furniture 🪑",
    "Clothing 👕",
    "School Supplies ✏️",
    "Other 🦫"
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = async (files) => {
    const validFiles = Array.from(files).slice(0, 5);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = validFiles.filter(
      file => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setSubmitStatus("Please only upload images (JPG, PNG, WEBP) under 5MB");
      return;
    }

    const imagePromises = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images].slice(0, 5)
      }));
      setSubmitStatus(
        formData.images.length >= 5 
          ? "Maximum 5 images allowed" 
          : `${base64Images.length} images added`
      );
    } catch (error) {
      console.error("Error processing images:", error);
      setSubmitStatus("Error processing images. Please try again.");
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      await processFiles(files);
    }
  };

  const handleImageUpload = async (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      await processFiles(files);
    }
    event.target.value = null; // Reset file input
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const makeMainImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [imageToMove] = newImages.splice(index, 1);
      newImages.unshift(imageToMove);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("Submitting...");

    try {
      const formDataToSend = {
        itemName: formData.itemName,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        condition: formData.condition,
        images: formData.images,
      };

      const newOrder = await post("/api/orders", formDataToSend);

      if (newOrder) {
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
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      setSubmitStatus("Failed to create order. Please try again.");
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
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
            <option value="Fair">Fair</option>
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
          <label>Product Images (Max 5) *</label>
          <div 
            className={`NewPage-dropzone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="images"
              name="images"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <div className="NewPage-dropzone-content">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Drag & drop your images here or click to browse</p>
              <small>First image will be the cover image. Max 5 images, 5MB each</small>
              <small>Supported formats: JPG, PNG, WEBP</small>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div className="NewPage-imageGrid">
              {formData.images.map((image, index) => (
                <div key={index} className="NewPage-imageWrapper">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="NewPage-previewImage"
                  />
                  <div className="NewPage-imageActions">
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeMainImage(index)}
                        className="NewPage-imageAction"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="NewPage-imageAction remove"
                    >
                      Remove
                    </button>
                  </div>
                  {index === 0 && (
                    <div className="NewPage-coverBadge">Cover Image</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="NewPage-submit">
          Post Order
        </button>

        {submitStatus && (
          <div className={`NewPage-status ${submitStatus.includes("Error") || submitStatus.includes("Please") ? "error" : "success"}`}>
            {submitStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPage;
