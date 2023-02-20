import request from "../../utils/request";

export async function getWallet() {
  try {
    const { data } = await request.get(`/carbon/wallet/getWallet`);
    return data;
  } catch (error) {
    const errorMessage = `getWallet error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getNonce() {
  try {
    const { data } = await request.get(`/carbon/wallet/getNonce`);
    return data;
  } catch (error) {
    const errorMessage = `getNonce error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function bindWallet(address, signature, cypherText) {
  try {
    const { data } = await request.post(`/carbon/wallet/bindWallet`, {
      address,
      signature,
      cypherText,
    });
    return data;
  } catch (error) {
    const errorMessage = `bindWallet error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function unbindWallet() {
  try {
    const { data } = await request.post(`/carbon/wallet/unbindWallet`);
    return data;
  } catch (error) {
    const errorMessage = `unbindWallet error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getBalance() {
  try {
    const { data } = await request.get(`/carbon/wallet/getBalance`);
    return data;
  } catch (error) {
    const errorMessage = `getBalance error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}