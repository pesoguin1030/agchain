import request from "../utils/request";

const fetchUser = async () => {
  try {
    const { data } = await request.get("users/");
    return data;
  } catch (err) {
    return err;
  }
};

const defaultSignIn = async ({ username, password }) => {
  try {
    const { data } = await request.post("users/signin", {
      username,
      password,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export { fetchUser, defaultSignIn };
