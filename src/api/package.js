import request from "../utils/request";

async function getTraceData(traceID, ip) {
  try {
    const { data } = await request.get(`/dapp`, {
      params: {
        traceID,
        ip,
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function sendPressLike(traceID) {
  try {
    const { data } = await request.post(`/dapp/like/${traceID}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getTraceData, sendPressLike };
