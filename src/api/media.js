import request from "../utils/request";
import Constants from "./constants";

async function fetchVideo(id) {
  try {
    const response = await request.get(`${Constants.MEDIA_URL}/video/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function uploadGift(body) {
  try {
    const { data } = await request.post(`/orders/gift`, body);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { fetchVideo, uploadGift };
