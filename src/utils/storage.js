const storage = {
  setAccessToken: (token) => {
    localStorage.setItem("access_token", token);
  },

  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },
  setShoppingCart: (cart) => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  },
  getShoppingCart: () => {
    return JSON.parse(localStorage.getItem("shopping_cart"));
  },
  clear: () => {
    localStorage.clear();
  },
};

export default storage;
