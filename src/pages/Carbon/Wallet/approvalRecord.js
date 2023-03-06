import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";

function CarbonWallet() {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState("使用者未綁定存摺");
  const [approveRecord, setapproveRecord] = useState("");

  useEffect(
    function () {
      console.log("load carbon wallet test");

      if (typeof window.ethereum == "undefined") {
        alert("請安裝MetaMask");
        console.log("MetaMask is required!");
      } else {
        console.log("MetaMask is installed!");

        getWallet();
        listenToApprovalEvent();
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

  const listenToApprovalEvent = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      let signer = provider.getSigner();
      const result = await TokenCenter.getApprovalEvent(signer, walletAddress);
      setapproveRecord(result.reverse());
    } catch (error) {
      console.log("Error: listenToApprovalEvent=", error);
    }
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="col-8 offset-2">
        <div className="mb-3 row">
          <h1>授權歷史紀錄</h1>
        </div>
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
                <th scope="col">授權數量</th>
              </tr>
            </thead>
            <tbody>
              {approveRecord
                ? approveRecord.map(({ time, amount }, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{time}</td>
                        <td>{amount}</td>
                      </tr>
                    );
                  })
                : (
                      <tr key={0}>
                        <th>#</th>
                        <td>{"網頁更新中，請稍等一下"}</td>
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
