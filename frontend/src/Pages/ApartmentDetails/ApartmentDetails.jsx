import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../../utils/favoriteUtils";
import {
  Bed,
  Bath,
  Ruler,
  MapPin,
  Car,
  Building2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Tag,
  CheckCircle,
  XCircle,
  Heart,
  ArrowLeft, // ✅ FIX: import Heart icon
} from "lucide-react";
import "./ApartmentDetails.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../components/Footer/Footer";

export default function ApartmentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return (
      <div className="not-found">
        <h2>Apartment not found</h2>
        <p>
          Please open this page by clicking an apartment from the Home page.
        </p>
      </div>
    );
  }

  const {
    id,
    title,
    price,
    area,
    region,
    city,
    // loc,
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
    view,
    amenities,
    tags,
    agent,
  } = state;
  console.log(state);
  function NextArrow({ onClick }) {
    return (
      <div className="slick-arrow next" onClick={onClick}>
        <ChevronRight size={22} />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div className="slick-arrow prev" onClick={onClick}>
        <ChevronLeft size={22} />
      </div>
    );
  }

  // ✅ Favorite state
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [favorite, setFavorite] = useState(isFavorite(id));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavorite(!favorite);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="arrow" /> BACK
      </button>

      <div className="apartment-details-page">
        {/* 🖼️ Image Carousel */}
        <div className="image-carousel">
          <Slider
            dots
            infinite
            speed={800}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={3500}
            fade
            pauseOnHover
            arrows
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {Array.isArray(images) && images.length > 0 ? (
              images.map((img, i) => (
                <div key={i}>
                  <img
                    src={img}
                    alt={`${title} ${i + 1}`}
                    className="carousel-image"
                  />
                </div>
              ))
            ) : (
              <div>
                <img src={image} alt={title} className="carousel-image" />
              </div>
            )}
          </Slider>
        </div>

        {/* 🏠 Main Info */}
        <div className="details-container">
          <div className="title-header">
            <div className="title-row">
              <h1 className="property-title">{title}</h1>
              <div
                className={`favorite-inline ${favorite ? "active" : ""}`}
                onClick={handleFavoriteClick}
                title={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {favorite ? (
                  <Heart size={24} fill="#e11d48" color="#e11d48" /> // ❤️ Filled when active
                ) : (
                  <Heart size={24} color="#475569" /> // 🩶 Outlined when inactive
                )}
              </div>
            </div>

            <div className="property-meta-inline">
              <div className="meta-item">
                <Home size={16} />
                <span>{type}</span>
              </div>
              <div className="meta-item">
                <Tag size={16} />
                <span>Sale</span>
              </div>
              <div
                className={`meta-item ${isSold ? "isSoldBg" : "isNotSoldBg"}`}
              >
                {isSold ? (
                  <>
                    <XCircle size={16} color="red" />
                    <span>Sold</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} color="green" />
                    <span>Available</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="marker">
              <MapPin size={18} /> {region}, {city}
            </p>

            <p className="price">
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              {negotiable && <span className="negotiable"> Negotiable</span>}
            </p>
          </div>

          {/* 🧱 Property Features */}
          <div className="features-grid">
            <div>
              <Bed size={18} /> {bedrooms} Bedrooms
            </div>
            <div>
              <Bath size={18} /> {bathrooms} Baths
            </div>
            <div>
              <Ruler size={18} /> {area} m²
            </div>
            <div>
              <Building2 size={18} /> Floor {floor}
            </div>
            <div>
              <Car size={18} /> {parking} Parking
            </div>
            <div>🧱 Built {yearBuilt}</div>
            <div>🔥 {heating}</div>
            <div>❄️ {cooling}</div>
            <div>🌅 {view} View</div>
            {balcony && <div>🌤 Balcony</div>}
          </div>

          {/* 📝 Description */}
          <section className="description">
            <h2>Description</h2>
            <p>
              A beautiful property located in {region}, {city}, offering
              stunning {view} views. Built in {yearBuilt}, this apartment
              features modern design, {bedrooms} bedrooms, and {bathrooms}{" "}
              bathrooms — perfect for families seeking comfort and elegance.
            </p>
          </section>

          {/* 🏗️ Amenities */}
          <section className="amenities">
            <h2>Amenities</h2>
            <ul>
              {amenities.map((a, index) => (
                <li key={index}>✅ {a}</li>
              ))}
            </ul>
          </section>

          {/* 🏷️ Tags */}
          <section className="tags">
            <h2>Tags</h2>
            <div className="tag-list">
              {tags.map((tag, index) => (
                <span className="tag" key={index}>
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* ☎️ Contact Section */}
          <section className="contact-section">
            <h3>Contact Agent</h3>
            <p>
              {agent.name} — {agent.agency}
            </p>

            <div className="contact-buttons">
              <a href={`tel:${agent.phone}`} className="call-btn">
                <Phone size={18} /> Call
              </a>
              <a
                href={`https://wa.me/${agent.phone.replace(/\s|\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>

              {/* ⭐ NEW BOOKING BUTTON */}
              <a
                className={`booking-btn ${isSold ? "disabled-btn" : ""}`}
                disabled={isSold}
                onClick={() => {
                  if (!isSold) {
                    navigate(`/apartments/${id}/book`, {
                      state: { id, title, agent, image, type },
                    });
                  }
                }}
              >
                {isSold ? "Not Available" : "Book a Visit"}
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
