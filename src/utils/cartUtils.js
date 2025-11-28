export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  const cart = localStorage.getItem("cart");
  console.log("get cart", cart);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (apartmentId) => {
  let cart = getCart();
  const existing = cart.find((item) => item.id === apartmentId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: apartmentId, quantity: 1 });
  }

  console.log("added TO CART", cart);
  saveCart(cart);
};
