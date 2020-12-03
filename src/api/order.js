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

const getOrder = async (userToken) => {
  console.log(`Bearer ${userToken}`);
  try {
    const response = await request.get(`${Constants.SERVER_URL}/orders/`, {
      params: {
        buyer: "yes",
        offset: 0,
        limit: 30,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const {
      data: { items, offset },
    } = response;
    let orderNumber = [];
    var temp = [];
    for (var i = 0; i < items.length; i++) {
      if (!temp.includes(items[i].orderNumber)) {
        temp.push(items[i].orderNumber);
        orderNumber.push({
          orderNumber: items[i].orderNumber,
          time: items[i].create_at,
          state: items[i].state,
          contractAddress: items[i].contractAddress,
        });
      }
    }
    return orderNumber;
  } catch (error) {
    alert("無法取得訂單");
    console.log(error);
  }
};

export { createOrder, getOrder };
