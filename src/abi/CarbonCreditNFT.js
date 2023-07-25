import {ethers, BigNumber} from "ethers";
import contractSettings from'./ContractSettings.json'
import CarbonCreditNFT from "./artifacts/contracts/nft/CarbonCreditNFT.sol/CarbonCreditNFT.json"

const CarbonCreditABI = CarbonCreditNFT.abi
const CarbonCreditAddress = contractSettings.contracts.CarbonCreditNFT.address
const provider = new ethers.providers.JsonRpcProvider(
    contractSettings.rpcProvider
)

export function addDashesToUUID(str) {
    return (
        str.slice(0, 8) +
        '-' +
        str.slice(8, 12) +
        '-' +
        str.slice(12, 16) +
        '-' +
        str.slice(16, 20) +
        '-' +
        str.slice(20)
    )
}

export async function getGasPrice() {
    let feeData = await provider.getFeeData()
    return feeData.gasPrice
}
export async function getTokenList(userAddress) {
    // 創建合約實例
    const contractInstance = new ethers.Contract(
        CarbonCreditAddress,
        CarbonCreditABI,
        provider
    );

    // 查詢用戶擁有的NFT數量
    const balance = await contractInstance.balanceOf(userAddress);
    console.log("Debug: balance=",balance)

    // 查詢用戶擁有的NFT清單
    let tokenInfoList = [];
    for (let i = BigNumber.from(0); i.lt(balance); i = i.add(1)) {
        const tokenId = await contractInstance.tokenOfOwnerByIndex(
            userAddress,
            i
        );
        // console.log("Debug: tokenId=",tokenId)

        const tokenInfoLiterally = await contractInstance.getTokenInfoLiterally(tokenId)
        console.log("Debug: tokenInfoLiterally=",tokenInfoLiterally)

        const tokenInfo = {
            tokenId:tokenId.toString(),
            certId: addDashesToUUID(tokenInfoLiterally.certId),
            source: tokenInfoLiterally.source.replace(/\x00/g, ''),
            issueBy: tokenInfoLiterally.issueBy.replace(/\x00/g, ''),
            weight: tokenInfoLiterally.weight.toString(),
            date: tokenInfoLiterally.date.toString(),
        };
        console.log("Debug: tokenInfo=",tokenInfo)
        tokenInfoList.push(tokenInfo);

    }
    console.log("Debug: tokenInfoList=",tokenInfoList)
    return tokenInfoList;
}

// 轉賬NFT
export async function safeTransferFrom(signer,from,to,tokenId){
    // 創建合約實例
    const contractInstance = new ethers.Contract(
        CarbonCreditAddress,
        CarbonCreditABI,
        signer
    );

    const nonce = await signer.getTransactionCount();
    const gasPrice = await this.getGasPrice();

    // 創建交易
    const txn = await contractInstance["safeTransferFrom(address,address,uint256)"](
        from,
        to,
        tokenId,
        {
            gasPrice,
            nonce,
        }
    );

    const txnReciept = await txn.wait();

    if(txnReciept && txnReciept.status === 1){
        return txnReciept.transactionHash;
    }
    else {
        return txnReciept;
    }
}

// approve碳權NFT
export async function approve(signer,to,tokenId){
    // 創建合約實例
    const contractInstance = new ethers.Contract(
        CarbonCreditAddress,
        CarbonCreditABI,
        signer
    );

    const nonce = await signer.getTransactionCount();
    const gasPrice = await this.getGasPrice();

    // 創建交易
    const txn = await contractInstance.approve(
        to,
        tokenId,
        {
            gasPrice,
            nonce,
        }
    );

    const txnReciept = await txn.wait();

    if(txnReciept && txnReciept.status === 1){
        return txnReciept.transactionHash;
    }
    else {
        return txnReciept;
    }
}