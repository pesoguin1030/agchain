import request from "../utils/request";
import Constants from "./constants";
import storage from "../utils/storage";

const fetchProducts = async () => {
  try {
    const { data } = await request.get("/products/all?offset=0");
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const ProductDetail = async (id) => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(`/products/` + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    // const {data} = await request.get(`/products/`+id)
    return data;
  } catch (err) {
    return err;
  }
};

const FarmInfo = async (id) => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(`/products/farm_info/` + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data[0];
  } catch (error) {
    return error;
  }
};

export { fetchProducts, ProductDetail, FarmInfo };
