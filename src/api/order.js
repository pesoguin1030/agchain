import request from "../utils/request";
import Constants from "./constants";

const createOrder = async (orders) => {
  try {
    const { data } = await request.post(`/orders/giftorder`, orders);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getOrder = async (userToken) => {
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
        orderNumber.push({
          orderNumber: items[i].orderNumber,
          time: items[i].create_at,
          state: items[i].state,
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
    console.log("---", data);
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
    console.log(items);
    return items;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPressLikeNum(orderNumber) {
  try {
    const response = await request.get(`/orders/like/${orderNumber}`);
    const { data } = response;
    console.log(data);
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
