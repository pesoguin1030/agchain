import request from "../utils/request";

const fetchProducts = async () => {
  try {
    const { data } = await request.get("/products/all?offset=0");
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchProducts };
