import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";

function CarbonWallet() {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState("");
  const [consumeRecord, setConsumeRecord] = useState("");

  useEffect(
    function () {
      console.log("load carbon wallet test");

      if (typeof window.ethereum == "undefined") {
        alert("請安裝MetaMask");
        console.log("MetaMask is required!");
      } else {
        console.log("MetaMask is installed!");

        getWallet().then(() => {
          if (walletAddress) {
            listenToTransferEvent();
          }
        });
      }
    },
    [walletAddress]
  );
  const getWallet = async () => {
    try {
      const result = await CarbonWalletApi.getWallet();
      setWalletAddress(result.message);
    } catch (error) {
      console.log("Error: getWallet=", error);
    }
  };

  const listenToTransferEvent = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      let signer = provider.getSigner();
      const result = await TokenCenter.getAllTransferEvent(
        signer,
        walletAddress
      );
      setConsumeRecord(result.reverse());
    } catch (error) {
      console.log("Error: listenToTransferEvent=", error);
    }
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="col-10 offset-1">
        <div className="mb-3 row">
          <h1>碳權點數轉移歷史紀錄</h1>
        </div>
        <p>此頁面只會顯示：平台得到您的授權後，轉給消費者的碳權點數</p>
        <div className="mb-3 row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              window.location.replace("/carbon/wallet");
            }}
          >
            返回
          </button>
        </div>
        <div className="mb-3 row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">時間</th>
                {/* <th scope="col">轉出地址</th> */}
                <th scope="col">接收者</th>
                <th scope="col">碳權點數</th>
              </tr>
            </thead>
            <tbody>
              {consumeRecord ? (
                consumeRecord.map(({ time, from, to, amount }, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{time}</td>
                      {/* <td>{from}</td> */}
                      <td>{to}</td>
                      <td>{amount} 點</td>
                    </tr>
                  );
                })
              ) : (
                <tr key={0}>
                  <th>#</th>
                  <td>{"網頁更新中，請稍等一下"}</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarbonWallet);
