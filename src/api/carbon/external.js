import request from "../../utils/request";

export async function getTempPointsRecord() {
  try {
    const { data } = await request.get(
      `/carbonExternal/external/getTempPointsRecord`
    );
    return data;
  } catch (error) {
    const errorMessage = `getTempPointsRecord error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function handleTempPoint(data_id, party_id) {
  try {
    const { data } = await request.post(
      `/carbonExternal/external/handleTempPoint`,
      {
        data_id,
        party_id,
      }
    );
    return data;
  } catch (error) {
    const errorMessage = `handleTempPoint error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getExternalParty() {
  try {
    const { data } = await request.get(
      `/carbonExternal/external/getExternalParty`
    );
    return data;
  } catch (error) {
    const errorMessage = `getExternalParty error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
