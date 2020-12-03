import request from "../utils/request";
import Constants from "./constants";

const fetchDestination = async (accessToken) => {
  try {
    console.log("fetch");
    const { data } = await request.get(`${Constants.SERVER_URL}/destination`, {
      params: {
        user: "self",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "no-cache, no-store",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

export { fetchDestination };
