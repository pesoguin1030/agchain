import ERC721VaultFactory from "./abi/fractional-art/ERC721VaultFactory.sol/ERC721VaultFactory.json"
import PolygonNetwork from'./PolygonNetwork.json'
import {ethers} from "ethers";

const contractABI = ERC721VaultFactory.abi
const contractAddress = PolygonNetwork.contracts.carbonCredit
const provider = new ethers.providers.JsonRpcProvider(PolygonNetwork.polygonProvider)
