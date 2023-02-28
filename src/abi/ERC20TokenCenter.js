import ERC20TokenCenter from "./abi/fractional-art/ERC20TokenCenter.sol/ERC20TokenCenter.json"
import PolygonNetwork from'./PolygonNetwork.json'
import {ethers} from "ethers";

const center_ABI = ERC20TokenCenter.abi
const center_Address = PolygonNetwork.contracts.carbonCredit
const provider = new ethers.providers.JsonRpcProvider(PolygonNetwork.polygonProvider)


// Read------------------------------------------------------------------------

// Get the allowance
export async function getAllowance(owner,spender){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.allowance(owner,spender)
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

// Get the balance of input account
export async function getBalance(account){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.balanceOf(account)
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

// Get the token factory address
export async function getTokenFactory(){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.tokenFactory()
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

// Get total supply
export async function getTotalSupply(){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.totalSupply()
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

// Write------------------------------------------------------------------------

// Set ERC20 approve
export async function setERC20Approval(spender, amount){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.approve(spender, amount)
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

// Burn ERC20 token
export async function burnERC20token(curator, amount){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.burn(curator, amount)
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

// Burn ERC20 token
export async function setTokenFactory(token_factory_address){
    try{
        const contractInstance = new ethers.Contract(center_Address, center_ABI, provider);
        const result = await contractInstance.setTokenFactory(token_factory_address)
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

