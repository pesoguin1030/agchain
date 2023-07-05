import { ethers } from "ethers";
import contractSettings from'./ContractSettings.json'
import ERC20TokenCenter from "./artifacts/contracts/fractional/ERC20TokenCenter.sol/ERC20TokenCenter.json"

const ERC20TokenCenterABI = ERC20TokenCenter.abi;
const ERC20TokenCenterAddress = contractSettings.contracts.ERC20TokenCenter;
const provider = new ethers.providers.JsonRpcProvider(
    contractSettings.rpcProvider
);

// Read------------------------------------------------------------------------

// Get the allowance
export async function getAllowance(owner) {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      provider
    );
    const result = await contractInstance
      .allowance(owner, contractSettings.owner)
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
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      provider
    );
    const result = await contractInstance.balanceOf(account)

    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// // Get the token factory address
// export async function getTokenFactory() {
//   try {
//     const contractInstance = new ethers.Contract(
//       ERC20TokenCenterAddress,
//       ERC20TokenCenterABI,
//       provider
//     );
//     const result = await contractInstance.tokenFactory().then((result) => {
//       return result;
//     });
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log("Error:", error.message);
//     throw new Error(error.message);
//   }
// }

// Get total supply
export async function getTotalSupply() {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
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
      ERC20TokenCenterAddress,
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

// Get full allowance record event
export async function getAllowanceRecordEvent(singer, caller) {
  try {
    console.log("Debug: getAllowanceRecordEvent")
    const event_ABI = [
      "event AllowanceRecord(address indexed owner, address indexed spender, uint256 prevAmount, uint256 currAmount)",
    ];
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      event_ABI,
      singer
    );
    console.log("Debug: getAllowanceRecordEvent filters.AllowanceRecord","\ncaller=",caller,"\nowner,",contractSettings.owner)
    const filter = contractInstance.filters.AllowanceRecord(
      caller,
      contractSettings.owner
    );
    const result = await contractInstance.queryFilter(filter);
    console.log("Debug: getAllowanceRecordEvent queryFilter=",result)
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
        lastAmount: result[index].args[2].toString(),
        amount: result[index].args[3].toString(),
      };
      resultArray.push(data);
    }
    console.log("final answer:", resultArray);
    return resultArray;
  } catch (error) {
    //   console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get Current transfer event
export async function getCurrentTransferEvent(singer, caller) {
  try {
    //Get the latest approve event
    const event_ABI_allowance = [
      "event AllowanceRecord(address indexed owner, address indexed spender, uint256 prevAmount, uint256 currAmount)",
    ];
    const contractInstance_allowance = new ethers.Contract(
      ERC20TokenCenterAddress,
      event_ABI_allowance,
      singer
    );

    const filter_allowance = contractInstance_allowance.filters.AllowanceRecord(
      caller,
      contractSettings.owner
    );

    const result_allowance = await contractInstance_allowance.queryFilter(
      filter_allowance
    );
    //Get the current transfer event from the latest approve
    const event_ABI_transfer = [
      "event TransferByPlatform(address indexed from, address indexed spender ,address to,uint256 amount)",
    ];
    const contractInstance_transfer = new ethers.Contract(
      ERC20TokenCenterAddress,
      event_ABI_transfer,
      singer
    );
    const filter_transfer =
      contractInstance_transfer.filters.TransferByPlatform(
        caller,
        contractSettings.owner
      );
    // console.log("result_allowance[result_allowance.length-1].blockNumber",result_allowance[result_allowance.length-1].blockNumber);
    // console.log("result_allowance",result_allowance);
    const result_transfer = await contractInstance_transfer.queryFilter(
      filter_transfer,
      result_allowance[result_allowance.length - 1].blockNumber
    );
    // console.log("result_transfer",result_transfer);
    var currentTransfer = 0;
    for (const index in result_transfer) {
      console.log(result_transfer[index].args[3].toString());
      currentTransfer += result_transfer[index].args[3].toNumber();
    }

    // console.log("總消耗！！！！！",currentTransfer);

    return currentTransfer;
  } catch (error) {
    //   console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get All transfer event
export async function getAllTransferEvent(singer, caller) {
  try {
    //Get the all transfer event
    const event_ABI_transfer = [
      "event TransferByPlatform(address indexed from, address indexed spender ,address to,uint256 amount)",
    ];
    const contractInstance_transfer = new ethers.Contract(
      ERC20TokenCenterAddress,
      event_ABI_transfer,
      singer
    );

    const filter_transfer =
      contractInstance_transfer.filters.TransferByPlatform(
        caller,
        contractSettings.owner
      );
    const result_transfer = await contractInstance_transfer.queryFilter(
      filter_transfer
    );

    // console.log("result_transfer",result_transfer);

    var resultArray = [];
    for (const index in result_transfer) {
      const blockData = await provider.getBlock(
        result_transfer[index].blockNumber
      );
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
        from: result_transfer[index].args[0].toString(),
        to: result_transfer[index].args[2].toString(),
        amount: result_transfer[index].args[3].toString(),
      };
      resultArray.push(data);
    }

    console.log("全部！！！！！", resultArray);

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
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      singer
    );
    const result = await contractInstance
      .approve(contractSettings.owner, amount)
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

//  Increase allowance
export async function increaseAllowance(singer, addValue) {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      singer
    );
    const result = await contractInstance
      .increaseAllowance(contractSettings.owner, addValue)
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

//  decrease allowance
export async function decreaseAllowance(singer, subtractedValue) {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      singer
    );
    const result = await contractInstance
      .decreaseAllowance(contractSettings.owner, subtractedValue)
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
export async function burnERC20token(from, amount) {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      provider
    );
    const result = await contractInstance
      .burnToken(from, amount)
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

// set NFT Vault Factory
export async function setTokenFactory(token_factory_address) {
  try {
    const contractInstance = new ethers.Contract(
      ERC20TokenCenterAddress,
      ERC20TokenCenterABI,
      provider
    );
    const result = await contractInstance
      .setERC721VaultFactory(token_factory_address)
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

// get off-chain signature
export async function getPermitSignature(signer,amount,deadline){
  try{
    const contractInstance = new ethers.Contract(
        ERC20TokenCenterAddress,
        ERC20TokenCenterABI,
        provider
    );

    const domain = {
      name: await contractInstance.name(),
      version: '1',
      chainId: contractSettings.chainId,
      verifyingContract: contractInstance.address,
    };

    const types = {
      Permit: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'spender',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        },
        {
          name: 'nonce',
          type: 'uint256'
        },
        {
          name: 'deadline',
          type: 'uint256'
        }

      ]
    };

    const value = {
      spender:contractSettings.owner,
      owner: await signer.getAddress(),
      value: amount,
      nonce: await contractInstance.nonces(await signer.getAddress()),
      deadline: deadline

    };

    const signature = await signer._signTypedData(domain, types, value);
    return ethers.utils.splitSignature(signature);
  }catch (error) {
    console.log("Error : offChainPermit=", error.message);
    throw new Error(error.message);
  }
}