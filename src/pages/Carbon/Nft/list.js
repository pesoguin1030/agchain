import React, { useState, useEffect, useContext  } from "react";
import { useHistory } from "react-router-dom";
import uuid4 from "uuid4";
import CarbonNftApi from "../../../api/carbon/nft";
import CarbonWalletApi from "../../../api/carbon/wallet";
import { chainId,polygonscan } from "../../../abi/CarbonCreditNFT"
import { ethers } from "ethers";

function CarbonNftList() {
  const history = useHistory();
  let [rowData, setRowData] = useState([]);
  useEffect(function () {
    getUserNftList();
  }, []);
  const getUserNftList = async () => {
    try {
      // 獲取用戶錢包地址
      let walletAddress = "";
      const getWalletResult = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", getWalletResult);
      if (getWalletResult.code == 200) {
        walletAddress = getWalletResult.message;
      } else {
        console.log("Debug: CarbonWalletApi error:",getWalletResult.message)
        alert("獲取錢包地址出錯！\n請檢查是否綁定錢包");
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

  const buttonNftTransfer = async (tokenId) => {
    // 獲取tokenId
    if(!tokenId){
      return
    }

    // 獲取轉賬目標的錢包地址
    const toAddress = prompt("請輸入對方的錢包地址");
    if(!toAddress || toAddress.length!=42){
      alert("請輸入正確的錢包地址")
      return
    }

    // 獲取用戶錢包地址
    let walletAddress = "";
    const getWalletResult = await CarbonWalletApi.getWallet();
    console.log("Debug: getWallet=", getWalletResult);
    if (getWalletResult.code == 200) {
      walletAddress = getWalletResult.message;
    } else {
      console.log("Debug: CarbonWalletApi error:",getWalletResult.message)
      alert("獲取錢包地址出錯！\n請檢查是否綁定錢包");
      return;
    }

    // 獲取signer
    if(!window.ethereum){
      alert("請安裝MetaMask錢包")
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log("Debug: provider=",provider)
    const signer = provider.getSigner();
    console.log("Debug: signer=",signer)

    // 確認address
    const fromAddress = await signer.getAddress()
    console.log("Debug: fromAddress=",fromAddress.toLowerCase())
    if(fromAddress.toLowerCase()!== walletAddress.toLowerCase() ){
      console.log("Debug: walletAddress=",walletAddress.toLowerCase())
      alert("請使用在本平臺綁定的錢包")
      return;
    }

    if(toAddress.toLowerCase() === fromAddress.toLowerCase()){
      alert("不允許自己轉賬給自己")
      return;
    }

    // 切換network
    const polyginChainId = "0x" + chainId.toString(16);
    console.log("Debug: polyginChainId=",polyginChainId)

    try{
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId:polyginChainId }], // chainId must be in hexadecimal numbers
      });
    }catch (e) {
      alert("請允許將MetaMask錢包切換到Polygon network")
      console.log("Debug: wallet_switchEthereumChain error=",e.message)
      return;
    }

    const nowChain = await signer.getChainId()
    console.log("Debug: nowChain=",nowChain)
    if(nowChain.toString() !== chainId.toString()){
      alert("請允許將MetaMask錢包切換到Polygon network")
      return;
    }

    let safeTransferFromResult = ""
    // 開始轉賬
    try {
      safeTransferFromResult = await CarbonNftApi.safeTransferFrom(signer,fromAddress,toAddress,tokenId)
    }catch (e) {
      alert("轉賬失敗，請查看日志")
      console.log("Debug: safeTransferFrom error:",e.message)
      return
    }
    console.log("Debug: safeTransferFrom hash=",safeTransferFromResult)

    const view = window.confirm("轉賬成功！\n是否查看相關日志？")
    if(view){
      const url = polygonscan + "/tx/" + safeTransferFromResult
      window.open(url, "_blank");
    }

  };

  const buttonNftView = async (tokenId) =>{
    // 獲取用戶錢包地址
    let walletAddress = "";
    const getWalletResult = await CarbonWalletApi.getWallet();
    console.log("Debug: getWallet=", getWalletResult);
    if (getWalletResult.code == 200) {
      walletAddress = getWalletResult.message;
    } else {
      console.log("Debug: CarbonWalletApi error:",getWalletResult.message)
      alert("獲取錢包地址出錯！\n請檢查是否綁定錢包");
      return;
    }

    const url = polygonscan + "/token/" + walletAddress + "?a=" + tokenId;
    window.open(url, "_blank");
  }

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
                            className="btn btn-primary mr-2"
                            onClick={() => {
                              buttonNftFragmentation(tokenId);
                            }}
                          >
                            碎片化
                          </button>

                          <button
                            className="btn btn-warning mr-2"
                            onClick={() => {
                              buttonNftTransfer(tokenId);
                            }}
                          >
                            轉賬
                          </button>

                          <button
                              className="btn btn-success mr-2"
                              onClick={() => {
                                buttonNftView(tokenId);
                              }}
                          >
                            查看
                          </button>

                          <button
                              className="btn btn-danger"
                              onClick={() => {
                                // buttonNftView(tokenId);
                              }}
                          >
                            取回
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
