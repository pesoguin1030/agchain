import request from "../utils/request";
import Constants from "./constants";
import storage from "../utils/storage";

const fetchProducts = async () => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get("/productsv2/list");
    const result = {
      items: data.message,
    };

    return result;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetch2Products = async (id) => {
  try {
    const { data } = await request.get(
      `/productsv2/list?storeId=${id}&page=0&limit=40&order=desc`
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetch3Products = async () => {
  try {
    const { data } = await request.get(
      `/productsv2/list?storeId=&page=0&limit=40&order=desc`
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetchAcquire = async () => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(
      `/carbon/acquire/list?page=&limit=&order`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetchStore = async (id) => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(`farmsv2/info?farm_id=${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetchownercarbon = async (id) => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(
      `farmsv2/carbonCreditAllowanceByStoreOwner?storeId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
const ProductDetail = async (id) => {
  const userToken = storage.getAccessToken();
  try {
    const { data } = await request.get(`/productsv2/info?productId=` + id);
    return data.message;
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
  fetch3Products,
  fetchownercarbon,
  fetchStore,
  fetchAcquire,
};
