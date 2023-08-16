import request from "../../utils/request";

export async function getCarbonAcquire(id) {
  try {
    const { data } = await request.get(`/carbon/acquire/info`, {
      params: {
        id,
      },
    });
    return data;
  } catch (error) {
    const errorMessage = `getCarbonAcquire error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function createCarbonAcquireOrder(id, amount, deadline, v, r, s) {
  try {
    const { data } = await request.post(`/carbon/acquire/order/create`, {
      id,
      amount,
      deadline,
      v,
      r,
      s,
    });
    return data;
  } catch (error) {
    const errorMessage = `createCarbonAcquireOrder error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
