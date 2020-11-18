import request from "../utils/request";
import Constants from "./constants";

const fetchUser = async (accessToken) => {
  try {
    const { data } = await request.post(
      `${Constants.SERVER_URL}/users/token_validattion`,
      {
        userToken: accessToken,
      }
    );
    // const { data } = await request.get(`${Constants.SERVER_URL}/users/`);
    return data;
  } catch (err) {
    return err;
  }
};

const emailSignIn = async ({ username, password }) => {
  try {
    const { data } = await request.post(
      `${Constants.SERVER_URL}/users/signin`,
      {
        username,
        password,
      }
    );
    return data;
  } catch (err) {
    return err;
  }
};

const oauthSignIn = async ({ provider, oauthId, name, email }) => {
  try {
    const { data } = await request.post("/users/oauth", {
      provider,
      oauthId,
      name,
      email,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export { fetchUser, emailSignIn, oauthSignIn };
