import request from "../utils/request";
import Constants from "./constants";

const createOrder = async (orders, accessToken) => {
  try {
    const { data } = await request.post(
      `${Constants.SERVER_URL}/order/giftorder`,
      {
        body: orders,
        userId: accessToken,
      }
    );
  } catch (err) {
    return err;
  }
};

export { createOrder };
