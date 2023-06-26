import ERC721VaultFactory from "./abi/fractional-art/ERC721VaultFactory.sol/ERC721VaultFactory.json";
import CarbonCredit from "./abi/nft/CarbonCreditNFT.sol/CarbonCreditNFT.json";
import PolygonNetwork from "./PolygonNetwork.json";
import { ethers } from "ethers";

const factory_ABI = ERC721VaultFactory.abi;
const factory_Address = PolygonNetwork.contracts.erc721VaultFactory;
const provider = new ethers.providers.JsonRpcProvider(
  PolygonNetwork.polygonProvider
);

const nft_ABI = CarbonCredit.abi;
const nft_Address = PolygonNetwork.contracts.carbonCredit;

// Read---------

// check TokenVault Address if create by our factory contract
export async function checkTokenVaultAddress(tokenVault_address) {
  try {
    const contractInstance = new ethers.Contract(
      factory_Address,
      factory_ABI,
      provider
    );
    const result = await contractInstance
      .checkTokenVaultAddress(tokenVault_address)
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

// Get NFT contract address
export async function getNFTcontract() {
  try {
    const contractInstance = new ethers.Contract(
      factory_Address,
      factory_ABI,
      provider
    );
    const result = await contractInstance.hsnlNFT().then((result) => {
      return result;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get token center contract address
export async function getTokenCenter() {
  try {
    const contractInstance = new ethers.Contract(
      factory_Address,
      factory_ABI,
      provider
    );
    const result = await contractInstance.tokenCenter().then((result) => {
      return result;
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get how many token vault is created
export async function getTokenVaultAmount() {
  try {
    const contractInstance = new ethers.Contract(
      factory_Address,
      factory_ABI,
      provider
    );
    const result = await contractInstance.vaultCount().then((result) => {
      return result;
    });
    console.log(result);
    return result - 1;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}

// Get token vault id (start from 1)
export async function getTokenVaultId(token_vault_address) {
  try {
    const contractInstance = new ethers.Contract(
      factory_Address,
      factory_ABI,
      provider
    );
    const result = await contractInstance
      .vaults(token_vault_address)
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

// Write---------

// fractionalize NFT and return ERC20
export async function fractionalizeNFT(singer, token_id) {
  try {
    const contract_factory = new ethers.Contract(
      factory_Address,
      factory_ABI,
      singer
    );
    const contract_NFT = new ethers.Contract(nft_Address, nft_ABI, singer);

    // Approve the `Vault Factory` as the NFT `token_id` operator
    var txn_response, txn_receipt;
    txn_response = await contract_NFT.approve(factory_Address, token_id);
    txn_receipt = await txn_response.wait();

    // Invoke the `mint()` function of `Vault Factory`
    txn_response = await contract_factory.mint(token_id);
    txn_receipt = await txn_response.wait();

    if (txn_receipt && txn_receipt.status === 1) {
      return txn_receipt.transactionHash;
    } else {
      return txn_receipt;
    }
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
}
