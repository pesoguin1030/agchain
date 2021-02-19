import request from "../utils/request";
import Constants from "./constants";

const createOrder = async (orders, userToken) => {
  try {
    // const { data } = await request.post(
    //   Constants.SERVER_URL + `/orders/giftorder`,
    //   orders
    // );
    const response = await request.post(
      `${Constants.SERVER_URL}/orders/newebpay`,
      orders,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createGiftOrder = async (orders, userToken) => {
  try {
    const { data } = await request.post(
      Constants.SERVER_URL + `/orders/giftorder`,
      orders,
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

const getOrder = async (userToken) => {
  const translate_state = (state) => {
    switch (state) {
      case "unpaid":
        return "尚未付款";
      case "delivering":
        return "運送中";
      case "paid":
        return "已付款";
      case "new":
        return "已付款";
      case "arrived":
        return "已送達";
      case "close":
        return "-";
    }
  };
  try {
    const response = await request.get(`/orders`, {
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
      data: { items },
    } = response;
    let orderNumber = [];
    var temp = [];
    for (var i = 0; i < items.length; i++) {
      if (!temp.includes(items[i].orderNumber)) {
        temp.push(items[i].orderNumber);
        const state = translate_state(items[i].state);
        orderNumber.push({
          orderNumber: items[i].orderNumber,
          time: items[i].create_at,
          state: state,
          contractAddress: items[i].contractAddress,
        });
      }
    }
    return orderNumber;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getOrderItem = async (orderNumber, userToken) => {
  try {
    const response = await request.get(`/orders/orderItem/${orderNumber}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const { data } = response;
    let return_data = [];
    for (let index = 0; index < data.length; index++) {
      return_data.push({
        amount: data[index].amount,
        name: data[index].name,
        price: data[index].price,
      });
    }
    return return_data;
  } catch (err) {
    return Promise.reject(err);
  }
};

async function getDestinations() {
  try {
    const response = await request.get(`/destination`);
    const {
      data: { items },
    } = response;
    return items;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPressLikeNum(orderNumber) {
  try {
    const response = await request.get(`/orders/like/${orderNumber}`);
    const { data } = response;
    const { press_like } = data[0];
    return press_like;
  } catch (err) {
    return Promise.reject(err);
  }
}

export {
  createOrder,
  getOrder,
  getOrderItem,
  getDestinations,
  getPressLikeNum,
};
