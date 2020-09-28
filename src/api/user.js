import request from "../utils/request";

const fetchUser = async () => {
  try {
    const { data } = await request.get("users/");
    return data;
  } catch (err) {
    return err;
  }
};

export { fetchUser };
