import request from "../utils/request";
import Constants from "./constants";

const fetchDestination = async () => {
  try {
    const { data } = await request.get(`/destination`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchDestination };
