import request from "../../utils/request";

class CarbonWallet {
  async getWallet() {
    try {
      const { data } = await request.get(`/carbon/wallet/getWallet`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getNonce() {
    try {
      const { data } = await request.get(`/carbon/wallet/getNonce`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async bindWallet(address, signature) {
    try {
      const { data } = await request.post(`/carbon/wallet/bindWallet`, {
        address,
        signature,
      });
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async unbindWallet() {
    try {
      const { data } = await request.post(`/carbon/wallet/unbindWallet`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getBalance() {
    try {
      const { data } = await request.get(`/carbon/wallet/getBalance`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const carbonWallet = new CarbonWallet();
export default carbonWallet;
