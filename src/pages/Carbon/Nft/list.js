import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import uuid4 from "uuid4";
import CarbonNftApi from "../../../api/carbon/nft";
import CarbonWalletApi from "../../../api/carbon/wallet";

function CarbonNftList() {
  const history = useHistory();

  let walletAddress = "";
  let [rowData, setRowData] = useState([]);
  let [tokenId, setTokenId] = useState("");
  useEffect(function () {
    getUserNftList();
  }, []);
  const getUserNftList = async () => {
    try {
      // 獲取用戶錢包地址
      const result = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", result);

      if (result.code == 200) {
        walletAddress = result.message;
      } else {
        alert("獲取錢包地址出錯！\n請檢查是否綁定錢包\n" + result.message);
        return;
      }

      alert("加載時間較長，請耐心等待");

      const tokenList = await CarbonNftApi.getTokenList(walletAddress);
      console.log("tokenList", tokenList);

      setRowData(tokenList);
    } catch (error) {
      console.log("Error: getUserNftList=", error);
    }
  };

  const buttonNftFragmentation = async (tokenId) => {
    alert("TODO: 碎片化NFT id=" + tokenId);
  };

  const buttonNftInfo = async (tokenId) => {
    alert("TODO: 查看NFT詳細資料 id=" + tokenId);
  };

  const buttonBackToNftPage = async () => {
    history.push({
      pathname: "/carbon/nft",
    });
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-12 offset-0">
          <div className="mb-3 row">
            <button
              className="col-sm-1 btn btn-primary"
              onClick={buttonBackToNftPage}
            >
              返回
            </button>
          </div>
          <div className="mb-3 row">
            <h1>擁有的碳權NFT</h1>
          </div>
          <div className="mb-3 row">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">證書ID</th>
                  <th scope="col">證書來源</th>
                  <th scope="col">簽發機構</th>
                  <th scope="col">碳權當量</th>
                  <th scope="col">創建時間</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {rowData.map(
                  (
                    { tokenId, certId, source, issueBy, weight, date },
                    index
                  ) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{certId}</td>
                        <td>{source}</td>
                        <td>{issueBy}</td>
                        <td>{weight} 公噸</td>
                        <td>{new Date(date * 1000).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-danger mr-2"
                            onClick={() => {
                              buttonNftFragmentation(tokenId);
                            }}
                          >
                            碎片化
                          </button>

                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              buttonNftInfo(tokenId);
                            }}
                          >
                            詳細資料
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarbonNftList);
