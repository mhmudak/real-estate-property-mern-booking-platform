/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import locationsData from "../../data/locationsData";

import { getAllProperties } from "../../services/propertyService";
import {
  Building,
  Building2,
  House,
  Landmark,
  Home,
  MapPin,
  Ghost,
} from "lucide-react";

import "./PurchaseProperties.css";

export default function PurchaseProperties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { label: "All", icon: Building },
    { label: "Apartment", icon: Building2 },
    { label: "Villa", icon: House },
    { label: "Land", icon: Landmark },
    { label: "House", icon: Home },
    { label: "Studio", icon: Home },
    { label: "Chalet & cabin", icon: Home },
  ];

  // ---------------------------
  // 1️⃣ Load data from MongoDB
  // ---------------------------
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllProperties();
        if (!cancelled) {
          setProperties(res.data.data); // backend returns { success, data }
          setFiltered(res.data.data);
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load properties.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => (cancelled = true);
  }, []);

  // ---------------------------
  // 2️⃣ Apply filters whenever filters change
  // ---------------------------
  useEffect(() => {
    let temp = [...properties];

    if (selectedCategory !== "All") {
      temp = temp.filter((p) => p.type === selectedCategory);
    }

    if (selectedRegion !== "All") {
      temp = temp.filter((p) => p.region === selectedRegion);
    }

    if (selectedCity !== "All") {
      temp = temp.filter((p) => p.city === selectedCity);
    }

    setFiltered(temp);
  }, [selectedCategory, selectedRegion, selectedCity, properties]);

  if (loading) return <p className="loading">Loading properties...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Header />

      <div className="purchase-page">
        <h1 className="purchase-title">Find Your Perfect Property</h1>

        {/* CATEGORY FILTERS */}
        <div className="category-container">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`category-btn ${selectedCategory === label ? "active" : ""}`}
              onClick={() => setSelectedCategory(label)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* REGION & CITY FILTERS */}
        <div className="location-selectors">
          <div className="dropdown-filter">
            <MapPin size={18} />
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedCity("All");
              }}
            >
              <option value="All">All Regions</option>
              {Object.keys(locationsData).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-filter">
            <MapPin size={18} />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={selectedRegion === "All"}
            >
              <option value="All">All Cities</option>
              {selectedRegion !== "All" &&
                locationsData[selectedRegion]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* PROPERTIES LIST */}
        <div className="card-grid">
          {filtered.length > 0 ? (
            filtered.map((property) => <ApartmentCard key={property._id} id={property._id} {...property} />)
          ) : (
            <div className="no-results">
              <Ghost size={24} />
              No properties found.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
