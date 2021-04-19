import request from "../utils/request";
import Constants from "./constants";
import storage from "../utils/storage";

const fetchDestination = async () => {
  try {
    const { data } = await request.get(`/destination`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
const createDestination = async (address, coordinates) => {
  try {
    const userToken = storage.getAccessToken();
    await request.post(
      `${Constants.SERVER_URL}/destination/`,
      {
        farm_id: null,
        address: address,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Cache-Control": "no-cache, no-store",
        },
      }
    );

    return true;
  } catch (err) {
    alert("伺服器發生問題，請稍後再試");
    console.log(err);
    return false;
  }
};

export { fetchDestination, createDestination };
