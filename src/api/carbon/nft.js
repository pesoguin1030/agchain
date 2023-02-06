import request from "../../utils/request";
import { ethers, BigNumber } from "ethers";
import {
  carbonCreditNFTAddress,
  carbonCreditNftAbi,
  polygonProvider,
} from "../../abi/CarbonCreditNFT";

const provider = new ethers.providers.JsonRpcProvider(polygonProvider);
class CarbonNft {
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
    for (let tokenURIListElement of tokenURIList) {
      const [source, issueBy] = await Promise.all([
        await contractInstance.sourceList(tokenURIListElement.sourceId),
        await contractInstance.issueByList(tokenURIListElement.issueById),
      ]);

      const tokenInfo = {
        tokenId: tokenURIListElement.tokenId,
        certId: tokenURIListElement.certId,
        source,
        issueBy,
        weight: tokenURIListElement.weight,
        date: tokenURIListElement.date,
      };
      tokenInfoList.push(tokenInfo);
    }

    return tokenInfoList;
  }
}

const carbonNft = new CarbonNft();
export default carbonNft;
