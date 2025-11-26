// src/utils/favoriteUtils.js

// ✅ Get all favorites from localStorage
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// ✅ Check if a property is favorited
export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.includes(id);
};

// ✅ Toggle favorite status
export const toggleFavorite = (id) => {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  return favorites;
};

// ✅ Clear all favorites (optional helper)
export const clearFavorites = () => {
  localStorage.removeItem("favorites");
};
