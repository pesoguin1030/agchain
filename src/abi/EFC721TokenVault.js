import {ethers} from "ethers";
import contractSettings from './ContractSettings.json'
import ERC20TokenCenter from "./artifacts/contracts/fractional/ERC20TokenCenter.sol/ERC20TokenCenter.json"

const center_ABI = ERC20TokenCenter.abi
const center_Address = contractSettings.contracts.ERC20TokenCenter
const provider = new ethers.providers.JsonRpcProvider(
    contractSettings.rpcProvider
)

// // Get token vault curator
// export async function getCurator(){
//     try{
//         const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
//         const result = await contractInstance.curator()
//             .then((result)=>{
//                 return result
//             });
//         console.log(result);
//         return result;
//
//     } catch (error) {
//         console.log("Error:",error.message);
//         throw new Error(error.message);
//     }
// }
//
// // Get token vault ratio
// export async function getRatio(){
//     try{
//         const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
//         const result = await contractInstance.ratio()
//             .then((result)=>{
//                 return result
//             });
//         console.log(result);
//         return result;
//
//     } catch (error) {
//         console.log("Error:",error.message);
//         throw new Error(error.message);
//     }
// }
//
// // Get token center
// export async function erc20TokenCenter(){
//     try{
//         const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
//         const result = await contractInstance.tokenCenter()
//             .then((result)=>{
//                 return result
//             });
//         console.log(result);
//         return result;
//
//     } catch (error) {
//         console.log("Error:",error.message);
//         throw new Error(error.message);
//     }
// }