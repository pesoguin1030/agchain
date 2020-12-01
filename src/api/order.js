import request from "../utils/request";
import Constants from "./constants";

const createOrder = async (orders, userToken) => {
  try {
    const { data } = await request.post(
      `${Constants.SERVER_URL}/orders/giftorder`,
      orders,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return data;
  } catch (err) {
    return err.response.request._response;
  }
};

export { createOrder };
