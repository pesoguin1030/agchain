import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CarbonNftApi from "../../../api/carbon/nft";
import CarbonWalletApi from "../../../api/carbon/wallet";
import { chainId,polygonscan,carbonCreditWalletAddress } from "../../../abi/CarbonCreditNFT"
import { ethers } from "ethers";
import jsonFile from "../../../utils/jsonFile";

function CarbonNftList() {
  const history = useHistory();
  let [rowData, setRowData] = useState([]);
  let [buttonDisable, setButtonDisable] = useState(false);
  useEffect(function () {
    getUserNftList();
  }, []);
  const getUserNftList = async () => {
    try {
      // 獲取用戶錢包地址
      let walletAddress = "";
      try {
        const getWalletResult = await CarbonWalletApi.getWallet();
        console.log("Debug: getWallet=", getWalletResult);
        if (getWalletResult.code === 200) {
          walletAddress = getWalletResult.message;
        } else {
          throw new Error(getWalletResult.message)
        }
      }catch (e) {
        alert("獲取錢包地址出錯！",e.message)
        console.log("Debug: getWallet error=",e.message)
        return
      }

      const tokenList = await CarbonNftApi.getTokenList(walletAddress);
      console.log("tokenList", tokenList);

      setRowData(tokenList);
    } catch (error) {
      console.log("Error: getUserNftList=", error);
    }
  };
  
  const buttonNftFragmentation = async (tokenId) => {
    setButtonDisable(true);

    alert("TODO: 碎片化NFT id=" + tokenId);

    //重新載入頁面
    history.go(0)

    setButtonDisable(false);
  };

  const buttonNftTransfer = async (tokenId) => {
    setButtonDisable(true);

    // 獲取tokenId
    if(!tokenId){
          setButtonDisable(false);
        return;
    }

    // 獲取轉賬目標的錢包地址
    const toAddress = prompt("請輸入對方的錢包地址");
    if(!toAddress || toAddress.length!==42){
      alert("請輸入正確的錢包地址")
          setButtonDisable(false);
        return;
    }

    // 獲取用戶錢包地址
    let walletAddress = "";
    try {
      const getWalletResult = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", getWalletResult);
      if (getWalletResult.code === 200) {
        walletAddress = getWalletResult.message;
      } else {
        throw new Error(getWalletResult.message)
      }
    }catch (e) {
      alert("獲取錢包地址出錯！",e.message)
      console.log("Debug: getWallet error=",e.message)
      setButtonDisable(false);
    return;
    }

    // 獲取signer
    if(!window.ethereum){
      alert("請安裝MetaMask錢包")
      setButtonDisable(false);
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
      setButtonDisable(false);
    return;
    }

    if(toAddress.toLowerCase() === fromAddress.toLowerCase()){
      alert("不允許自己轉賬給自己")
      setButtonDisable(false);
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
      setButtonDisable(false);
    return;
    }

    const nowChain = await signer.getChainId()
    console.log("Debug: nowChain=",nowChain)
    if(nowChain.toString() !== chainId.toString()){
      alert("請允許將MetaMask錢包切換到Polygon network")
      setButtonDisable(false);
    return;
    }

    let safeTransferFromResult = ""
    // 開始轉賬
    try {
      safeTransferFromResult = await CarbonNftApi.safeTransferFrom(signer,fromAddress,toAddress,tokenId)
    }catch (e) {
      alert("轉賬失敗，請查看日志")
      console.log("Debug: safeTransferFrom error=",e.message)
      setButtonDisable(false);
    return;
    }
    console.log("Debug: safeTransferFrom hash=",safeTransferFromResult)

    const view = window.confirm("轉賬成功！\n是否查看相關日志？")
    if(view){
      const url = polygonscan + "/tx/" + safeTransferFromResult
      window.open(url, "_blank");
    }

    setButtonDisable(false);
    // 重新載入頁面
    history.go(0)
  };

  const buttonNftView = async (tokenId) =>{
    setButtonDisable(true);

    // 獲取用戶錢包地址
    let walletAddress = "";
    try {
      const getWalletResult = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", getWalletResult);
      if (getWalletResult.code === 200) {
        walletAddress = getWalletResult.message;
      } else {
        throw new Error(getWalletResult.message)
      }
    }catch (e) {
      alert("獲取錢包地址出錯！",e.message)
      console.log("Debug: getWallet error=",e.message)
      setButtonDisable(false);
      return;
    }

    const url = polygonscan + "/token/" + walletAddress + "?a=" + tokenId;
    window.open(url, "_blank");

    setButtonDisable(false);
  }

    const buttonNftRetrieve = async (tokenId) =>{
      setButtonDisable(true);

      // 獲取用戶錢包地址
      let walletAddress = "";
      try {
        const getWalletResult = await CarbonWalletApi.getWallet();
        console.log("Debug: getWallet=", getWalletResult);
        if (getWalletResult.code === 200) {
          walletAddress = getWalletResult.message;
        } else {
          throw new Error(getWalletResult.message)
        }
      }catch (e) {
        alert("獲取錢包地址出錯！",e.message)
        console.log("Debug: getWallet error=",e.message)
        setButtonDisable(false);
    return;
      }

      // 獲取signer
      if(!window.ethereum){
        alert("請安裝MetaMask錢包")
        setButtonDisable(false);
    return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      console.log("Debug: provider=",provider)
      const signer = provider.getSigner();
      console.log("Debug: signer=",signer)

      // 確認address
      const fromAddress = await signer.getAddress();
      console.log("Debug: fromAddress=",fromAddress.toLowerCase())
      if(fromAddress.toLowerCase()!== walletAddress.toLowerCase() ){
        console.log("Debug: walletAddress=",walletAddress.toLowerCase())
        alert("請使用在本平臺綁定的錢包")
        setButtonDisable(false);
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
        setButtonDisable(false);
        return;
      }

      const nowChain = await signer.getChainId()
      console.log("Debug: nowChain=",nowChain)
      if(nowChain.toString() !== chainId.toString()){
        alert("請允許將MetaMask錢包切換到Polygon network")
        setButtonDisable(false);
        return;
      }

      // 將token approve給碳權給平臺
      try {
        await CarbonNftApi.approve(signer,carbonCreditWalletAddress,tokenId)
      }catch (e) {
        console.log("Debug: approve error=",e.message)
        alert("操作失敗！\n",e.message)
        setButtonDisable(false);
        return;
      }

      // 平臺burn碳權，取回token資料
      let tokenInfo = {};
      try{
        const burnTokenResult = await CarbonNftApi.burnToken(tokenId)
        if(burnTokenResult.code === 200){
          // 獲取token資料
          tokenInfo = JSON.parse(burnTokenResult.message);
          console.log("Debug: tokenInfo=",tokenInfo);
        }else{
          throw new Error(burnTokenResult.message)
        }
      }catch (e) {
        console.log("Debug: burnToken error=",e.message)
        alert("銷毀NFT碳權出錯！\n" + e.message);
        setButtonDisable(false);
        return;
      }

      // 下載json檔案
      jsonFile.GenerateJsonFileFromJsonObject(tokenInfo.certId,tokenInfo);

      alert("碳權證書取回成功！")
      setButtonDisable(false);

      // 重新載入頁面
      history.go(0)
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
            <h1>管理碳權NFT</h1>
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
                              className="btn btn-success mr-2 mb-2"
                              onClick={() => {
                                buttonNftView(tokenId);
                              }}
                              disabled={buttonDisable}
                          >
                            查看
                          </button>

                          <button
                            className="btn btn-primary mr-2 mb-2"
                            onClick={() => {
                              buttonNftFragmentation(tokenId);
                            }}
                            disabled={buttonDisable}
                          >
                            兌換
                          </button>

                          <button
                            className="btn btn-warning mr-2 mb-2"
                            onClick={() => {
                              buttonNftTransfer(tokenId);
                            }}
                            disabled={buttonDisable}
                          >
                            轉賬
                          </button>

                          <button
                              className="btn btn-danger mr-2 mb-2"
                              onClick={() => {
                                buttonNftRetrieve(tokenId);
                              }}
                              disabled={buttonDisable}
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
