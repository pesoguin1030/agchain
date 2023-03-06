import ERC20TokenCenter from "./abi/fractional-art/ERC20TokenCenter.sol/ERC20TokenCenter.json";
import PolygonNetwork from "./PolygonNetwork.json";
import { ethers } from "ethers";

const center_ABI = ERC20TokenCenter.abi;
const center_Address = PolygonNetwork.contracts.erc20TokenCenter;
const provider = new ethers.providers.JsonRpcProvider(
  PolygonNetwork.polygonProvider
);

// Read------------------------------------------------------------------------

// Get the allowance
export async function getAllowance(owner) {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance
      .allowance(owner, PolygonNetwork.wallet.carbonCredit)
      .then((result) => {
        return result;
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get the balance of input account
export async function getBalance(account) {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance.balanceOf(account).then((result) => {
      return result;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get the token factory address
export async function getTokenFactory() {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance.tokenFactory().then((result) => {
      return result;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get total supply
export async function getTotalSupply() {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance.totalSupply().then((result) => {
      return result;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get Approval event
export async function getApprovalEvent(singer, caller) {
  try {
    const event_ABI = [
      "event Approval(address indexed owner, address indexed spender, uint256 value)",
    ];
    const contractInstance = new ethers.Contract(
      center_Address,
      event_ABI,
      singer
    );

    const filter = contractInstance.filters.Approval(caller);
    const result = await contractInstance.queryFilter(filter);
    var resultArray = [];
    for (const index in result) {
      const blockData = await provider.getBlock(result[index].blockNumber);
      var date = new Date(blockData.timestamp * 1000);
      const dateFormat =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      var data = {
        time: dateFormat,
        amount: result[index].args[2].toString(),
      };
      resultArray.push(data);
    }
    //   console.log("final answer:", resultArray);
    return resultArray;
  } catch (error) {
    //   console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Write------------------------------------------------------------------------

// Set ERC20 approve
export async function setERC20Approval(singer, amount) {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      singer
    );
    const result = await contractInstance
      .approve(PolygonNetwork.wallet.carbonCredit, amount)
      .then((result) => {
        return result;
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Burn ERC20 token
export async function burnERC20token(curator, amount) {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance
      .burn(curator, amount)
      .then((result) => {
        return result;
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Burn ERC20 token
export async function setTokenFactory(token_factory_address) {
  try {
    const contractInstance = new ethers.Contract(
      center_Address,
      center_ABI,
      provider
    );
    const result = await contractInstance
      .setTokenFactory(token_factory_address)
      .then((result) => {
        return result;
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}
