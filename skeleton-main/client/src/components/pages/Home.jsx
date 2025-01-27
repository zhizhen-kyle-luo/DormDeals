import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import OrderCard from "./OrderCard";
import "./Home.css";
import { UserContext } from "../App.jsx";

const Home = () => {
  const { userId } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    category: "all",
    condition: "all",
  });
  const [isLoading, setIsLoading] = useState(true);

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
    // Fetch orders from the server
    fetch("/api/orders")
      .then((res) => res.json())
      .then((ordersData) => {
        // Filter out orders that are sold or under transaction
        const activeOrders = ordersData.filter(order => 
          order.status !== "Sold" && 
          order.status !== "Under Transaction" &&
          order.seller_id !== userId
        );
        setOrders(activeOrders);
        setFilteredOrders(activeOrders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    // Apply filters and search whenever filters, search query, or orders change
    const filtered = orders.filter((order) => {
      const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        (!filters.priceRange.min || order.price >= Number(filters.priceRange.min)) &&
        (!filters.priceRange.max || order.price <= Number(filters.priceRange.max));

      const matchesCategory =
        filters.category === "all" ||
        order.category.toLowerCase() === filters.category.toLowerCase();

      const matchesCondition =
        filters.condition === "all" ||
        order.condition.toLowerCase() === filters.condition.toLowerCase();

      return matchesSearch && matchesPrice && matchesCategory && matchesCondition;
    });

    setFilteredOrders(filtered);
  }, [filters, searchQuery, orders]);

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
    setSearchQuery("");
  };

  return (
    <div className="Home-container">
      <div className="Home-sidebar">
        <div className="sidebar-header">
          <h2>Filter By</h2>
        </div>

        <div className="sidebar-section">
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
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
          Clear All
        </button>

        <div className="filter-stats">{filteredOrders.length} items found</div>
      </div>

      <div className="Home-content">
        {isLoading ? (
          <div className="Home-loading">
            <div className="spinner"></div>
            <p>Loading items...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="Home-orderGrid">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div className="Home-empty">
            <p>No items found matching your criteria.</p>
            <button onClick={clearFilters}>Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
