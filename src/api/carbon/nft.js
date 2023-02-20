import request from "../../utils/request";

export async function createToken(file) {
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
// 由平臺burn碳權，確保碳權真的有被燒掉
export async function burnToken(tokenId){
    try {
        const { data } = await request.post(`/carbon/nft/burnToken`, {
            tokenId
        });
        return data;
    } catch (error) {
        const errorMessage = `burnToken error=${error.message}`;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
}