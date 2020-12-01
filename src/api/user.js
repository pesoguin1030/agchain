import request from "../utils/request";

const fetchUser = async (accessToken) => {
  try {
    const { data } = await request.get(`/users/info`);
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

const emailSignIn = async ({ username, password }) => {
  try {
    const { data } = await request.post(`/users/signin`, {
      username,
      password,
    });
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
