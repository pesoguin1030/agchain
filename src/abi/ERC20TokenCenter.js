import ERC20TokenCenter from "./abi/fractional-art/ERC20TokenCenter.sol/ERC20TokenCenter.json"
import PolygonNetwork from'./PolygonNetwork.json'
import {ethers} from "ethers";

const contractABI = ERC20TokenCenter.abi
const contractAddress = PolygonNetwork.contracts.carbonCredit
const provider = new ethers.providers.JsonRpcProvider(PolygonNetwork.polygonProvider)