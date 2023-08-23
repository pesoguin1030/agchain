import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";
import ContractSettings from "../../../abi/ContractSettings.json";
import { AuthContext } from "../../../appContext";
import * as CarbonAcquireApi from "../../../api/carbon/acquire";
import {exchangeNFT} from "../../../api/carbon/wallet";
import {useHistory} from "react-router-dom";
const polygonscan = ContractSettings.etherscan;
const chainId = ContractSettings.chainId;

function CarbonWallet() {
  // const INVALID_WALLET_ADDRESS = "使用者未綁定存摺"
  const history = useHistory();
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
    2. 服務端產生nonce，並傳回
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

  const buttonExchangeNFT = async () => {
      const amount = prompt("請輸入兌換的點數量，以1000爲單位：\n（兌換碳權NFT比例：1000點兌換1公噸）")
      await handleExchangeToken(parseInt(amount))
  };

  // 點數兌換NFT
  const handleExchangeToken = async(amount)=>{
    console.log("Debug handleExchangeToken: amount=",amount)
    if (!amount || amount > walletBalance) {
      alert("沒有足夠的點數");
      return
    }

    const multiplier = 1000
    if (amount<1000 || amount % multiplier !== 0) {
      alert("兌換的點數量不是1000的倍數");
      return
    }

    setButtonDisable(true);
    // 獲取用戶錢包地址
    let walletAddress = "";
    try {
      const getWalletResult = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", getWalletResult);
      if (getWalletResult.code === 200) {
        walletAddress = getWalletResult.message;
      } else {
        throw new Error(getWalletResult.message);
      }
    } catch (e) {
      alert("獲取錢包地址出錯！", e.message);
      console.log("Debug: getWallet error=", e.message);
      setButtonDisable(false);
      return;
    }

    // 獲取signer
    let signer;
    let fromAddress;
    try {
      if (!window.ethereum) {
        alert("請安裝MetaMask錢包");
        setButtonDisable(false);
        return;
      }
      const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
      );
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
    } catch (e) {
      alert("請允許網站連接到MetaMask錢包");
      console.log("Debug: wallet_switchEthereumChain error=", e.message);
      setButtonDisable(false);
      return;
    }

    // 切換network
    const polygonChainId = "0x" + chainId.toString(16);
    console.log("Debug: polygonChainId=", polygonChainId);

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }], // chainId must be in hexadecimal numbers
      });
    } catch (e) {
      alert("請允許將MetaMask錢包切換到Polygon network");
      console.log("Debug: wallet_switchEthereumChain error=", e.message);
      setButtonDisable(false);
      return;
    }

    const nowChain = await signer.getChainId();
    console.log("Debug: nowChain=", nowChain);
    if (nowChain.toString() !== chainId.toString()) {
      alert("請允許將MetaMask錢包切換到Polygon network");
      setButtonDisable(false);
      return;
    }

    // permit
    let signature;
    const limit = 5 * 60; // 簽名具有5分鐘有效期
    const deadline = ethers.BigNumber.from(
        Math.floor(Date.now() / 1000) + limit
    );

    try {
      signature = await TokenCenter.getPermitSignature(
          signer,
          amount,
          deadline
      );
      console.log("Debug: signature=", signature);
    } catch (e) {
      alert("請允許MetaMask產生簽名");
      console.log("Debug: getPermitSignature error=", e.message);
      setButtonDisable(false);
      return;
    }

    const { v, r, s } = signature;

    // sell
    try {
      const result = await await CarbonWalletApi.exchangeNFT(
          amount.toString(),
          deadline.toString(),
          v.toString(),
          r.toString(),
          s.toString()
      );
      console.log("Debug: exchangeNFT=", result);
      if (result.code == 200) {
        const confirmResult =  window.confirm("NFT兌換成功！\n是否轉到NFT管理頁面查看？");
        if(confirmResult)
        {
          history.push({
            pathname: "/carbon/nftlist",
          });
        }
      } else {
        alert("NFT兌換失敗！\n" + result.message);
        setButtonDisable(false);
      }
    } catch (e) {
      alert("NFT兌換失敗！\n" + e.message);
      console.log("Debug: exchangeNFT error=", e.message);
      setButtonDisable(false);
      return;
    }
  }

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
            <button className="col-sm-2 btn btn-danger"
                    onClick={buttonExchangeNFT}
                    disabled={buttonDisable}
            >
              兌換
            </button>
          </div>
          <button
              className="btn btn-primary col-sm-12"
              type="button"
              onClick={() => {
                window.location.replace("/carbon/wallet/tempPointRecord");
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
                    window.location.replace("/carbon/wallet/approvalRecord");
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
                    window.location.replace("/carbon/wallet/consumeRecord");
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
