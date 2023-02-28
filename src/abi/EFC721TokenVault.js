import ERC20TokenCenter from "./abi/fractional-art/ERC721TokenVault.sol/ERC721TokenVault.json"
import PolygonNetwork from'./PolygonNetwork.json'
import {ethers} from "ethers";

const center_ABI = ERC20TokenCenter.abi
const center_Address = PolygonNetwork.contracts.carbonCredit
const provider = new ethers.providers.JsonRpcProvider(PolygonNetwork.polygonProvider)


// Get token vault curator
export async function getCurator(){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.curator()
            .then((result)=>{
                return result
            });
        console.log(result);
        return result;

    } catch (error) {
        console.log("Error:",error.message);
        throw new Error(error.message);
    }
}

// Get token vault ratio
export async function getRatio(){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.ratio()
            .then((result)=>{
                return result
            });
        console.log(result);
        return result;

    } catch (error) {
        console.log("Error:",error.message);
        throw new Error(error.message);
    }
}

// Get token center
export async function getTokenCenter(){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.tokenCenter()
            .then((result)=>{
                return result
            });
        console.log(result);
        return result;

    } catch (error) {
        console.log("Error:",error.message);
        throw new Error(error.message);
    }
}