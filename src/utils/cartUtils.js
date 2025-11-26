export const saveCart = (cart) => {
    localStorage.setItem('cart',JSON.stringify(cart))
}
export const getCart = () => {
  const cart = localStorage.getItem("cart"); // get cart from local storage
  console.log("get cart",cart)
  return cart ? JSON.parse(cart) : [];
};
export const addToCart = (productId) => {
  let cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1; // existing.quantity = existing.quantity + 1
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
   console.log("added TO CART",cart);
  saveCart(cart);
};