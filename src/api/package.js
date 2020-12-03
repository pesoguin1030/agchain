import request from "../utils/request";

async function getTraceData(traceID) {
  try {
    const { data } = await request.get(`/dapp`, {
      params: {
        traceID,
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function sendPressLike(traceID) {
  try {
    const { data } = await request.get(`/dapp/presslike`, {
      params: {
        traceID,
      },
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getTraceData, sendPressLike };
