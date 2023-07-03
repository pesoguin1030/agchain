import React, { useState } from "react";
import * as CarbonAcquireApi from  "../../../api/carbon/acquire";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";
import {ethers} from "ethers";
import PolygonNetwork from "../../../abi/PolygonNetwork.json";

const chainId = PolygonNetwork.chainId;

function CarbonAcquireDemo(){
    const [carbonAcquireId,setCarbonAcquireId] = useState("");
    const [carbonAcquireInfo,setCarbonAcquireInfo] = useState(undefined);
    const [carbonAcquireAmount,setCarbonAcquireAmount] = useState("");
    let [buttonDisable, setButtonDisable] = useState(false);
    const buttonGetInfo = async()=>{
       if(!carbonAcquireId){
           return
       }

        const result = await CarbonAcquireApi.getCarbonAcquire(carbonAcquireId);
        console.log("getCarbonAcquire result=", result);
        setCarbonAcquireInfo(result.message)
    }

    const buttonSell = async()=>{
        if(!carbonAcquireInfo || !carbonAcquireAmount){
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
        const limit = 5 * 60 // 簽名具有5分鐘有效期
        const deadline = ethers.BigNumber.from(Math.floor(Date.now() / 1000) + limit);

        try{
            signature = await TokenCenter.getPermitSignature(signer,carbonAcquireAmount,deadline)
            console.log("Debug: signature=", signature);
        }catch (e) {
            alert("請允許MetaMask產生簽名");
            console.log("Debug: getPermitSignature error=", e.message);
            setButtonDisable(false);
            return;
        }

        const{v,r,s} = signature;

        // sell
        try {
            const result = await CarbonAcquireApi.createCarbonAcquireOrder(
                carbonAcquireInfo.id.toString(),
                carbonAcquireAmount.toString(),
                deadline.toString(),
                v.toString(),
                r.toString(),
                s.toString()
            )
            console.log("Debug: createCarbonAcquireOrder=", result);
            if(result.code==200){
                alert("成功")
            }else {
                alert("失敗：" + result.message)
            }

        }catch (e) {
            alert("出售碳權點數失敗");
            console.log("Debug: createCarbonAcquireOrder error=", e.message);
            setButtonDisable(false);
            return;
        }

        setButtonDisable(false);
    }
    return(
        <div className="container space-top-1 space-top-sm-2 mt-11">
            <div className="row pb-5 border-bottom">
                <div className="col-8 offset-2">
                    <div className="mb-3 row">
                        <h1>碳權點數收購邀約</h1>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">邀約id</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => {
                                    setCarbonAcquireId(e.target.value);
                                }}
                                value={carbonAcquireId}
                            />
                        </div>
                        <button
                            className="col-sm-2 btn btn-primary"
                            onClick={buttonGetInfo}
                        >
                            獲取
                        </button>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">邀約資訊</label>
                        <div className="col-sm-8">
                            <textarea
                                className="form-control"
                                readOnly={true}
                                value={JSON.stringify(carbonAcquireInfo)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">出售點數</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="number"
                                onChange={(e) => {
                                    setCarbonAcquireAmount(e.target.value);
                                }}
                                value={carbonAcquireAmount}
                            />
                        </div>
                        <button
                            className="col-sm-2 btn btn-danger"
                            onClick={buttonSell}
                            disabled={buttonDisable}
                        >
                            出售
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CarbonAcquireDemo)