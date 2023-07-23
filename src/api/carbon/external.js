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

export async function getExternalParty(approved) {
  try {
    const { data } = await request.get(
      `/carbonExternal/external/getExternalParty`,
        {
          params: {
            approved,
          },
        }
    );
    return data;
  } catch (error) {
    const errorMessage = `getExternalParty error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getPartyData(userId) {
  try {
    const { data } = await request.post(`/carbonExternal/external/partyData`, {
      userId,
    });
    return data;
  } catch (error) {
    const errorMessage = `getPartyData error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function applyParty(party_name) {
  try {
    const { data } = await request.post(`/carbonExternal/external/applyParty`, {
      party_name,
    });
    return data;
  } catch (error) {
    const errorMessage = `applyParty error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
