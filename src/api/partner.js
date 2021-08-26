import request from "../utils/request";

async function getPartnerData(shortcut) {
  try {
    const result = await request.get(`/wutau/partner`, {
      params: {
        shortcut,
      },
    });
    return result.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPartnerInvisibleData(shortcut) {
  try {
    const result = await request.get(`/wutau/partner-invisible`, {
      params: {
        shortcut,
      },
    });
    return result.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getPartnerData, getPartnerInvisibleData };
