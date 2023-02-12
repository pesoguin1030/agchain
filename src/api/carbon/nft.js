import request from "../../utils/request";
import { ethers, BigNumber } from "ethers";
import {
  carbonCreditNFTAddress,
  carbonCreditNftAbi,
  polygonProvider,
} from "../../abi/CarbonCreditNFT";

const provider = new ethers.providers.JsonRpcProvider(polygonProvider);
class CarbonNft {
  async getGasPrice() {
    let feeData = await provider.getFeeData()
    return feeData.gasPrice
  }

  async createToken(file) {
    try {
      const { data } = await request.post(`/carbon/nft/createToken`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      const errorMessage = `createToken error=${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getTokenList(userAddress) {
    // 創建合約實例
    const contractInstance = new ethers.Contract(
      carbonCreditNFTAddress,
      carbonCreditNftAbi,
      provider
    );

    // 查詢用戶擁有的NFT數量
    const balance = await contractInstance.balanceOf(userAddress);

    // 查詢用戶擁有的NFT清單
    let tokenURIList = [];
    for (let i = BigNumber.from(0); i.lt(balance); i = i.add(1)) {
      const tokenId = await contractInstance.tokenOfOwnerByIndex(
        userAddress,
        i
      );
      const tokenURI = await contractInstance.tokenURI(tokenId);

      const jsonString = atob(tokenURI.substring(29));
      const jsonObject = JSON.parse(jsonString);
      jsonObject.tokenId = tokenId.toString();
      tokenURIList.push(jsonObject);
    }

    // 查詢每個NFT的詳細資料
    let tokenInfoList = [];
    // 查詢 證書來源 簽發機構 清單
    const [sourceList, issueByList] = await Promise.all([
      await contractInstance.getSourceList(),
      await contractInstance.getIssueByList(),
    ]);

    for (let tokenURIListElement of tokenURIList) {
      const tokenInfo = {
        tokenId: tokenURIListElement.tokenId,
        certId: tokenURIListElement.certId,
        source: sourceList[tokenURIListElement.sourceId],
        issueBy: issueByList[tokenURIListElement.issueById],
        weight: tokenURIListElement.weight,
        date: tokenURIListElement.date,
      };
      tokenInfoList.push(tokenInfo);
    }

    return tokenInfoList;
  }



  async safeTransferFrom(signer,from,to,tokenId){
    // 創建合約實例
    const contractInstance = new ethers.Contract(
        carbonCreditNFTAddress,
        carbonCreditNftAbi,
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
}

const carbonNft = new CarbonNft();
export default carbonNft;
