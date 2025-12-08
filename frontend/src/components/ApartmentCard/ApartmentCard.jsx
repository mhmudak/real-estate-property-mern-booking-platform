import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../../utils/favoriteUtils";
import { Bed, Ruler, MapPin, Toilet, Heart } from "lucide-react";
import "./ApartmentCard.css";

function ApartmentCard({
  id,
  title,
  price,
  area,
  region,
  city,
  loc,
  type,
  isSold,
  image,
  images,
  bedrooms,
  bathrooms,
  balcony,
  floor,
  parking,
  yearBuilt,
  negotiable,
  heating,
  cooling,
  amenities,
  view,
  tags,
  agent,
}) {
  const navigate = useNavigate();

  // ✅ Initialize local favorite state based on saved favorites
  const [favorite, setFavorite] = useState(isFavorite(id));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavorite(!favorite);
  };

  const handleClick = () => {
    navigate(`/apartments/${id}`, {
      state: {
        id,
        title,
        price,
        area,
        region,
        city,
        loc,
        type,
        isSold,
        image,
        images,
        bedrooms,
        bathrooms,
        balcony,
        floor,
        parking,
        yearBuilt,
        negotiable,
        heating,
        cooling,
        amenities,
        view,
        tags,
        agent,
      },
    });
  };

  return (
    <div className="apartment-card" onClick={handleClick}>
      <div className="image-container">
        <img src={image || (images?.length ? images[0] : "")} alt={title} className="apartment-image" />

        {/* Ribbon for sold items */}
        {isSold && <div className="ribbon">SOLD</div>}

        {/* Favorite heart overlay */}
        <div
          className={`favorite-icon ${favorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
        >
          <Heart size={22} />
        </div>
      </div>

      <div className="apartment-details">
        <h3 className="apartment-title">{title}</h3>

        <div className="icon-item">
          <MapPin size={18} />
          <span className="apartment-location">
            {region}, {city}
          </span>
        </div>

        <div className="apartment-icons">
          <div className="icon-item">
            <Bed size={18} />
            <span>{bedrooms}</span>
          </div>
          <div className="icon-item">
            <Toilet size={18} />
            <span>{bathrooms}</span>
          </div>
          <div className="icon-item">
            <Ruler size={18} />
            <span className="apartment-area">{area.toLocaleString()} m²</span>
          </div>
        </div>

        <p className="apartment-price">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>

        <button className="add-to-cart-btn">More Details</button>
      </div>
    </div>
  );
}

export default ApartmentCard;
