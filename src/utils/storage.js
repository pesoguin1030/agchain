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
  setShoppingDest: (dest) => {
    localStorage.setItem("shopping_dest", JSON.stringify(dest));
  },
  getShoppingDest: () => {
    return JSON.parse(localStorage.getItem("shopping_dest"));
  },
  clear: () => {
    localStorage.clear();
  },
};

export default storage;
