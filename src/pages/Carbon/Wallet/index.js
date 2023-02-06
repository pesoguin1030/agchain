import React, { useState, useEffect } from "react";
import CarbonWalletApi from "../../../api/carbon/wallet";

function CarbonWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  useEffect(function () {
    console.log("load carbon wallet test");

    if (typeof window.ethereum == "undefined") {
      alert("請安裝MetaMask");
      console.log("MetaMask is required!");
    } else {
      console.log("MetaMask is installed!");

      getWallet();
      getBalance();
    }
  }, []);
  const getWallet = async () => {
    try {
      const result = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", result);
      setWalletAddress(result.message);
    } catch (error) {
      console.log("Error: getWallet=", error);
    }
  };

  const getBalance = async () => {
    try {
      const result = await CarbonWalletApi.getBalance();
      console.log("Debug: getBalance=", result);
      setWalletBalance(result.message);
    } catch (error) {
      console.log("Error: getBalance=", error);
    }
  };

  const buttonBind = async () => {
    /*
    1. 客戶端點擊綁定后，首先請求nonce
    2. 服務端產生nonce（放在session），並傳回
    3. 客戶端獲取MetaMask錢包address，並根據address與nonce產生signature，發回服務端
    4. 服務的驗證signature，返回是否成功，並更新db記錄
    5. 客戶端顯示綁定結果
    */
    try {
      //获取当前MetaMask钱包地址
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      console.log("address=", address);

      //获取Nonce
      const nonceMessage = await CarbonWalletApi.getNonce();
      const nonce = nonceMessage.message;
      console.log("nonce=", nonce);

      //生成signature
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [address, "I am signing my one-time nonce: " + nonce],
      });
      console.log("signature=", signature);

      //验证signature
      const result = await CarbonWalletApi.bindWallet(address, signature);
      console.log("bindWallet=", result);

      alert(result.message);
      getWallet();
      getBalance();
    } catch (error) {
      console.log("Error: bindWallet=", error);
    }
  };

  const buttonUnbind = async () => {
    try {
      const result = await CarbonWalletApi.unbindWallet();
      console.log("Debug: buttonUnbind=", result);

      alert(result.message);
      getWallet();
      getBalance();
    } catch (error) {
      console.log("Error: buttonUnbind=", error);
    }
  };

  const buttonRefresh = async () => {
    await getBalance();
  };

  const buttonExchange = async () => {
    alert("TODO");
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-8 offset-2">
          <div className="mb-3 row">
            <h1>碳權錢包管理</h1>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              錢包地址
            </label>
            <div className="col-sm-6">
              <input
                value={walletAddress}
                type="text"
                className="form-control"
                id="inputAddress"
                readOnly
              />
            </div>
            <button className="col-sm-2 btn btn-primary" onClick={buttonBind}>
              綁定
            </button>
            <button className="col-sm-2 btn btn-danger" onClick={buttonUnbind}>
              解除
            </button>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputBalance" className="col-sm-2 col-form-label">
              碳權餘額
            </label>
            <div className="col-sm-6">
              <input
                value={walletBalance}
                type="text"
                className="form-control"
                id="inputBalance"
                readOnly
              />
            </div>
            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonRefresh}
            >
              刷新
            </button>
            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonExchange}
            >
              兌換
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarbonWallet);
