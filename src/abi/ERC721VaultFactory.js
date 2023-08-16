import { ethers } from "ethers";
import contractSettings from './ContractSettings.json'
import CarbonCreditNFT from "./artifacts/contracts/nft/CarbonCreditNFT.sol/CarbonCreditNFT.json"
import ERC721VaultFactory from './artifacts/contracts/fractional/ERC721VaultFactory.sol/ERC721VaultFactory.json'

const provider = new ethers.providers.JsonRpcProvider(
    contractSettings.rpcProvider
);

const ERC721VaultFactoryABI = ERC721VaultFactory.abi;
const ERC721VaultFactoryAddress = contractSettings.contracts.ERC721VaultFactory.address;

const CarbonCreditNFTABI = CarbonCreditNFT.abi;
const CarbonCreditNFTAddress = contractSettings.contracts.CarbonCreditNFT.address;

// Read---------

// Get NFT contract address
export async function getNFTcontract() {
  try {
    const contractInstance = new ethers.Contract(
      ERC721VaultFactoryAddress,
      ERC721VaultFactoryABI,
      provider
    );
    const result = await contractInstance.authorizedNFT().then((result) => {
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
      ERC721VaultFactoryAddress,
      ERC721VaultFactoryABI,
      provider
    );
    const result = await contractInstance.erc20TokenCenter().then((result) => {
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
      ERC721VaultFactoryAddress,
      ERC721VaultFactoryABI,
      provider
    );
    const result = await contractInstance.maxVaultId().then((result) => {
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
      ERC721VaultFactoryAddress,
      ERC721VaultFactoryABI,
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
      ERC721VaultFactoryAddress,
      ERC721VaultFactoryABI,
      singer
    );
    const contract_NFT = new ethers.Contract(CarbonCreditNFTAddress, CarbonCreditNFTABI, singer);

    // Approve the `Vault Factory` as the NFT `token_id` operator
    var txn_response, txn_receipt;
    txn_response = await contract_NFT.approve(ERC721VaultFactoryAddress, token_id);
    txn_receipt = await txn_response.wait();

    // Invoke the `mint()` function of `Vault Factory`
    txn_response = await contract_factory.fractionalization(token_id);
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
