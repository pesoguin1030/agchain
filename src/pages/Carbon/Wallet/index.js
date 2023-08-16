import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";
import ContractSettings from "../../../abi/ContractSettings.json";
const polygonscan = ContractSettings.etherscan;

function CarbonWallet() {
  // const INVALID_WALLET_ADDRESS = "使用者未綁定存摺"
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAllowance, setWalletAllowance] = useState(0);
  const [currentConsume, setCurrentConsume] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const { authState, authDispatch } = useContext(AuthContext);

  useEffect(
    function () {
      console.log("load carbon wallet test");

      if (typeof window.ethereum == "undefined") {
        alert("請安裝MetaMask");
        console.log("MetaMask is required!");
      } else {
        console.log("MetaMask is installed!");

        getWallet()
        getCurrentTransferEvent()
      }
    },
    [walletAddress]
  );

  useEffect(function () {}, [walletAllowance]);

  const getWallet = async () => {
    try {
      console.log("Debug: CarbonWalletApi.getWallet");
      const result = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", result);
      if (result.code !== 200) {
        setWalletAddress("");
      } else {
        setWalletAddress(result.message);
        getBalance(result.message);
        getAllowance(result.message);
      }
    } catch (error) {
      console.log("Error: getWallet=", error);
    }
  };

  const getBalance = async (address) => {
    try {
      console.log("Debug: CarbonWallet.getBalance");
      const result = await TokenCenter.getBalance(
        address ? address : walletAddress
      );
      console.log("Debug: CarbonWallet.getBalance=", result);
      setWalletBalance(result);
    } catch (error) {
      console.log("Error: getBalance=", error);
    }
  };

  const getAllowance = async (address) => {
    try {
      console.log("Debug: CarbonWallet.getAllowance");
      const result = await TokenCenter.getAllowance(
        address ? address : walletAddress
      );
      console.log("Debug: CarbonWallet.getAllowance=", result);
      // alert(result);
      setWalletAllowance(result);
    } catch (error) {
      // console.log("Error: getAllowance=", error);
    }
  };

  const approve = async (amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      let signer = provider.getSigner();
      const result = await TokenCenter.setERC20Approval(signer, amount);
      alert(
        "授權點數成功！謝謝您!由於資料量龐大，新的額度需要稍待一段時間才會呈現於頁面上"
      );
      getAllowance();
    } catch (error) {
      console.log("Error: setERC20Approval=", error);
    }
  };

  const increaseAllowance = async (amount) => {
    setButtonDisable(true);
    if (amount && amount > 0) {
      try {
        let fromAddress;
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        let signer = provider.getSigner();

        if (!window.ethereum) {
          alert("請安裝MetaMask錢包");
          setButtonDisable(false);
          return;
        }
        console.log("Debug: provider=", provider);
        signer = provider.getSigner();
        console.log("Debug: signer=", signer);

        // 確認address
        await provider.send("eth_requestAccounts", []);
        fromAddress = await signer.getAddress();
        console.log("Debug: fromAddress=", fromAddress.toLowerCase());
        if (fromAddress.toLowerCase() !== walletAddress.toLowerCase()) {
          console.log("Debug: walletAddress=", walletAddress.toLowerCase());
          alert("請使用在本平臺綁定的錢包");
          setButtonDisable(false);
          return;
        }
        TokenCenter.increaseAllowance(signer, amount).then((result) => {
          if (result) {
            alert(
              "增加授權點數成功！謝謝您!由於資料量龐大，新的額度需要稍待一段時間才會呈現於頁面上"
            );
            setWalletAllowance(
              parseInt(walletAllowance.toString()) + parseInt(amount)
            );
            setButtonDisable(false);
            setCurrentConsume(0);
          }
        });
      } catch (error) {
        console.log("Error: increaseAllowance=", error);
        setButtonDisable(false);
      }
    } else {
      alert("增加點數必須是正數");
      setButtonDisable(false);
    }
  };
  const decreaseAllowance = async (amount) => {
    setButtonDisable(true);
    if (amount && amount > 0) {
      try {
        let fromAddress;
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        let signer = provider.getSigner();

        if (!window.ethereum) {
          alert("請安裝MetaMask錢包");
          setButtonDisable(false);
          return;
        }
        console.log("Debug: provider=", provider);
        signer = provider.getSigner();
        console.log("Debug: signer=", signer);

        // 確認address
        await provider.send("eth_requestAccounts", []);
        fromAddress = await signer.getAddress();
        console.log("Debug: fromAddress=", fromAddress.toLowerCase());
        if (fromAddress.toLowerCase() !== walletAddress.toLowerCase()) {
          console.log("Debug: walletAddress=", walletAddress.toLowerCase());
          alert("請使用在本平臺綁定的錢包");
          setButtonDisable(false);
          return;
        }
        getAllowance().then(() => {
          console.log(
            "Debug: decreaseAllowance:",
            "\nwalletAllowance=",
            walletAllowance,
            "\namount",
            amount
          );
          if (walletAllowance>=amount) {
            const provider = new ethers.providers.Web3Provider(
              window.ethereum,
              "any"
            );
            let signer = provider.getSigner();
            TokenCenter.decreaseAllowance(signer, amount).then((result) => {
              if (result) {
                alert(
                  "減少授權點數成功！謝謝您!由於資料量龐大，新的額度需要稍待一段時間才會呈現於頁面上"
                );
                setWalletAllowance(
                  parseInt(walletAllowance.toString()) - parseInt(amount)
                );
                setButtonDisable(false);
                setCurrentConsume(0);
              }
            });
          } else {
            alert("減少點數不能超過已授權之額度");
            setButtonDisable(false);
          }
        });
      } catch (error) {
        console.log("Error: decreaseAllowance=", error);
        setButtonDisable(false);
      }
    } else {
      alert("減少點數必須是正數");
      setButtonDisable(false);
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
      const nonce = nonceMessage.message.nonce;
      const cypherText = nonceMessage.message.cypherText;
      console.log("nonceMessage=", nonceMessage.message);

      //生成signature
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [address, "I am signing my one-time nonce: " + nonce],
      });
      console.log("signature=", signature);

      //验证signature
      const result = await CarbonWalletApi.bindWallet(
        address,
        signature,
        cypherText
      );
      console.log("bindWallet=", result);

      alert(result.message);
      getWallet();
    } catch (error) {
      console.log("Error: bindWallet=", error);
    }
  };

  const buttonUnbind = async () => {
    try {
      const result = await CarbonWalletApi.unbindWallet();
      console.log("Debug: buttonUnbind=", result);

      alert(result.message);
      setWalletAddress("");
      setWalletBalance(0);
      setWalletAllowance(0);
    } catch (error) {
      console.log("Error: buttonUnbind=", error);
    }
  };

  const buttonRefresh = async () => {
    await getBalance();
  };

  const getCurrentTransferEvent = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      let signer = provider.getSigner();
      const result = await TokenCenter.getCurrentTransferEvent(
        signer,
        walletAddress
      );
      setCurrentConsume(result);
    } catch (error) {
      console.log("Error: getCurrentTransferEvent=", error);
    }
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-10 offset-1">
          <div className="mb-3 row">
            <h1>碳權存摺管理</h1>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              存摺地址
            </label>
            <div className="col-sm-6">
              {walletAddress ? (
                <input
                  value={walletAddress}
                  type="text"
                  className="form-control-plaintext"
                  id="inputAddress"
                  placeholder="使用者未綁定存摺"
                  onClick={() => {
                    window.open(polygonscan + "/address/" + walletAddress);
                  }}
                  target="_blank"
                />
              ) : (
                <input
                  value={walletAddress}
                  type="text"
                  className="form-control-plaintext"
                  id="inputAddress"
                  placeholder="使用者未綁定存摺"
                  readOnly
                />
              )}
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
                value={walletBalance + "  點"}
                type="text"
                readOnly
                className="form-control-plaintext"
                id="inputBalance"
              />
            </div>

            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonRefresh}
            >
              更新
            </button>
            <button className="col-sm-2 btn btn-danger" onClick={getBalance}>
              兌換
            </button>
          </div>
          <button
              className="btn btn-primary col-sm-12"
              type="button"
              onClick={() => {
                window.location.replace("/carbon/tempPointRecord");
              }}
          >
            查看暫存點數
          </button>

          {authState.user.role.id == "2" ? (
              <div>
              <hr />
              <div className="mb-3 row">
                <h1>碳權點數授權</h1>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="inputAllowance"
                  className="col-sm-2 col-form-label"
                >
                  授權額度
                </label>
                <div className="col-sm-6">
                  {walletAllowance ? (
                    <input
                      value={walletAllowance + "  點"}
                      type="text"
                      className="form-control-plaintext"
                      id="inputAllowance"
                      readOnly
                    />
                  ) : (
                    <input
                      value={0}
                      type="text"
                      className="form-control-plaintext"
                      id="inputAllowance"
                      readOnly
                    />
                  )}
                </div>
                <button
                  className="col-sm-2 btn btn-primary"
                  disabled={buttonDisable}
                  onClick={() => {
                    var amount = prompt("請輸入您要增加的授權數量");
                    increaseAllowance(amount);
                  }}
                >
                  增加
                </button>
                <button
                  className="col-sm-2 btn btn-danger"
                  disabled={buttonDisable}
                  onClick={() => {
                    var amount = prompt("請輸入您要減少的授權數量");
                    decreaseAllowance(amount);
                  }}
                >
                  減少
                </button>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-8"></div>
                <button
                  className="btn btn-primary col-sm-4"
                  type="button"
                  onClick={() => {
                    window.location.replace("/carbon/approvalRecord");
                  }}
                >
                  查看授權歷史紀錄
                </button>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="inputAllowance"
                  className="col-sm-4 col-form-label"
                >
                  上次授權後到目前消耗
                </label>
                <div className="col-sm-4">
                  {currentConsume ? (
                    <input
                      value={currentConsume + "  點"}
                      type="text"
                      className="form-control-plaintext"
                      id="inputCurrentConsume"
                      readOnly
                    />
                  ) : (
                    <input
                      value={0}
                      type="text"
                      className="form-control-plaintext"
                      id="inputCurrentConsume"
                      readOnly
                    />
                  )}
                </div>
                <button
                  className="btn btn-primary col-sm-4"
                  type="button"
                  onClick={() => {
                    window.location.replace("/carbon/consumeRecord");
                  }}
                >
                  查看轉移歷史紀錄
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarbonWallet);
