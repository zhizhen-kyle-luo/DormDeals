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
  const [showFilters, setShowFilters] = useState(false);

  // Categories and conditions remain the same
  const categories = [
    "All",
    "Textbooks 📚",
    "Electronics 💻",
    "Furniture 🪑",
    "Clothing 👕",
    "School Supplies ✏️",
    "Other 🦫"
  ];

  const conditions = ["All", "New", "Like New", "Good", "Fair", "Poor"];

  useEffect(() => {
    // Fetch orders from the server
    fetch("/api/orders")
      .then((res) => res.json())
      .then((ordersData) => {
        const activeOrders = ordersData.filter(order => 
          order.status !== "Sold" && 
          order.status !== "Under Transaction" &&
          order.seller_id !== userId
        );
        setOrders(activeOrders);
        setFilteredOrders(activeOrders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, [userId]);

  // Filter logic remains the same
  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        (!filters.priceRange.min || order.price >= Number(filters.priceRange.min)) &&
        (!filters.priceRange.max || order.price <= Number(filters.priceRange.max));

      const matchesCategory =
        filters.category === "all" ||
        order.category.toLowerCase().split(" ")[0] === filters.category.toLowerCase();

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
      {/* Hero Section */}
      <div className="Home-hero">
        <div className="hero-background">
          <div className="floating-items">
            <div className="floating-item">💰</div>
            <div className="floating-item">📱</div>
            <div className="floating-item">💻</div>
            <div className="floating-item">📚</div>
            <div className="floating-item">🎮</div>
          </div>
          <div className="dollar-signs">
            <span className="dollar-sign">$</span>
            <span className="dollar-sign">$</span>
            <span className="dollar-sign">$</span>
            <span className="dollar-sign">$</span>
            <span className="dollar-sign">$</span>
          </div>
        </div>
        <div className="hero-content">
          <h1>Discover Campus Treasures</h1>
          <p>Find amazing deals on textbooks, electronics, and more from your fellow students</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="Home-main">
        <div className="Home-content">
          {/* Sidebar */}
          <aside className={`Home-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="sidebar-header">
              <h2>Filter Products</h2>
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
              <h3>Price Range</h3>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange("priceRange", { min: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange("priceRange", { max: e.target.value })}
                />
              </div>
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
              Clear All Filters
            </button>
          </aside>

          {/* Main Grid */}
          <main>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {filteredOrders.length === 0 ? (
              <div className="empty-state">
                <h2>No items found</h2>
                <p>Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="orders-grid">
                {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
