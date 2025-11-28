// src/pages/MyFavorites/MyFavorites.jsx
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import apartments from "../../data/apartmentsData";
import { getFavorites, clearFavorites } from "../../utils/favoriteUtils";
import "./MyFavorites.css";

export default function MyFavorites() {
  // 🧠 State to store the list of favorite apartments
  const [favoriteList, setFavoriteList] = useState([]);

  // ✅ Load favorites from localStorage when page loads
  useEffect(() => {
    const favorites = getFavorites();
    const filtered = apartments.filter((apt) => favorites.includes(apt.id));
    setFavoriteList(filtered);
  }, []);

  // 🗑 Clear all favorites (from both state & localStorage)
  const handleClearFavorites = () => {
    clearFavorites(); // removes from localStorage
    setFavoriteList([]); // updates state
  };

  return (
    <>
      <Header />

      <main className="favorites-page">
        <div className="favorites-header">
          <h1 className="favorites-title">My Favorite Properties ❤️</h1>

          {/* Show Clear button only if there are favorites */}
          {favoriteList.length > 0 && (
            <button className="clear-btn" onClick={handleClearFavorites}>
              🗑 Clear All
            </button>
          )}
        </div>

        {/* If there are favorites, display them */}
        {favoriteList.length > 0 ? (
          <div className="favorites-list">
            {favoriteList.map((apt) => (
              <ApartmentCard key={apt.id} {...apt} />
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <p>You have no favorite properties yet.</p>
            <p>Explore and click ❤️ to save your preferred homes!</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
