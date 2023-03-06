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

const fetch2Products = async () => {
  try {
    const { data } = await request.get(
      "/productsv2/list?storeId=79&page=0&limit=5&order=desc"
    );
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

const findFeeProduct = async (farmId) => {
  const userToken = storage.getAccessToken();
  try {
    const response = await request.get(`/destination/allshippingitem`, {
      params: {
        user: farmId,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const {
      data: { items },
    } = response;
    console.log("FP-----", items);
    return items;
  } catch (error) {
    // alert('無法取得農夫運費項目，請稍後再試');
    console.log(error);
    return false;
  }
};

export {
  fetchProducts,
  ProductDetail,
  FarmInfo,
  findFeeProduct,
  fetch2Products,
};
