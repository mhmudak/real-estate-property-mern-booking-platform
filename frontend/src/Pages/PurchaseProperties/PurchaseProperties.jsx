/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import apartments from "../../data/apartmentsData";
import locationsData from "../../data/locationsData";
import {
  Building,
  Home,
  Landmark,
  Ghost,
  Building2,
  House,
  MapPin,
} from "lucide-react";
import "./PurchaseProperties.css";

export default function PurchaseProperties() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const categories = [
    { label: "All", icon: Building },
    { label: "Apartment", icon: Building2 },
    { label: "Villa", icon: House },
    { label: "Land", icon: Landmark },
    { label: "House", icon: Home },
    { label: "Chalet & cabin", icon: Home },
  ];

  // Filter apartments based on selected filters
  const filtered = apartments.filter((a) => {
    const matchCategory =
      selectedCategory === "All" || a.type === selectedCategory;

    const matchRegion = selectedRegion === "All" || a.region === selectedRegion;

    const matchCity = selectedCity === "All" || a.city === selectedCity;

    return matchCategory && matchRegion && matchCity;
  });

  return (
    <>
      <Header />

      <div className="purchase-page">
        <h1 className="purchase-title">Find Your Perfect Property</h1>

        {/* Category Filter */}
        <div className="category-container">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`category-btn ${
                selectedCategory === label ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(label)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Region & City Selectors */}
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
                locationsData[selectedRegion].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Properties List */}
        <div className="card-grid">
          {filtered.length > 0 ? (
            filtered.map((apt) => <ApartmentCard key={apt.id} {...apt} />)
          ) : (
            <div className="no-results">
              <div>
                <Ghost size={24} />
              </div>
              No properties found.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
