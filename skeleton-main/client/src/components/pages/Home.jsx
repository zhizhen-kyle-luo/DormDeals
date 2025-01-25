import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import OrderCard from "./OrderCard";
import "./Home.css";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    category: "all",
    condition: "all",
  });

  // Updated categories to match new order form
  const categories = [
    "All",
    "Textbooks",
    "Electronics",
    "Furniture",
    "Clothing",
    "School Supplies",
    "Other",
  ];

  // Updated conditions to match new order form
  const conditions = ["All", "New", "Like New", "Good", "Fair", "Poor"];

  useEffect(() => {
    get("/api/orders").then((orderObjs) => {
      setOrders(orderObjs);
      setFilteredOrders(orderObjs);
    });
  }, []);

  useEffect(() => {
    // Apply filters whenever filters state changes
    const filtered = orders.filter((order) => {
      const matchesPrice =
        (!filters.priceRange.min || order.price >= Number(filters.priceRange.min)) &&
        (!filters.priceRange.max || order.price <= Number(filters.priceRange.max));

      const matchesCategory =
        filters.category === "all" ||
        order.category.toLowerCase() === filters.category.toLowerCase();

      const matchesCondition =
        filters.condition === "all" ||
        order.condition.toLowerCase() === filters.condition.toLowerCase();

      return matchesPrice && matchesCategory && matchesCondition;
    });

    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handleFilterChange = (type, value) => {
    if (type === "priceRange") {
      setFilters((prev) => ({
        ...prev,
        priceRange: { ...prev.priceRange, ...value },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: value.toLowerCase(),
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      category: "all",
      condition: "all",
    });
  };

  return (
    <div className="Home-container">
      <div className="Home-sidebar">
        <div className="sidebar-header">
          <h2>Filter By</h2>
        </div>

        <div className="sidebar-section">
          <h3>Price Range</h3>
          <div className="price-inputs">
            <div className="price-input-row">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handleFilterChange("priceRange", { min: e.target.value })}
              />
              <span>to</span>
            </div>
            <div className="price-input-row">
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handleFilterChange("priceRange", { max: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Category</h3>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <h3>Condition</h3>
          <select
            value={filters.condition}
            onChange={(e) => handleFilterChange("condition", e.target.value)}
          >
            {conditions.map((condition) => (
              <option key={condition} value={condition.toLowerCase()}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          Clear Filters
        </button>

        <div className="filter-stats">{filteredOrders.length} items found</div>
      </div>

      <div className="Home-content">
        <div className="Home-orderGrid">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
