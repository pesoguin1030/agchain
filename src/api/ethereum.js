import { ethers } from "ethers";
import {
  cutivationRecordABI,
  cutivationRecordAddress,
} from "../abi/cultivationRecord";
import {
  organicCertificateABI,
  organicCertificateAddress,
} from "../abi/organicCertificate";
import {
  sensorAnalysisABI,
  sensorAnalysisAddress,
} from "../abi/sensorAnalysis";
import { secureItemABI, secureItemAddress } from "../abi/secureItem";

const httpProvider = ethers.getDefaultProvider("goerli");

const fetchCultivationRecord = async (cropId) => {
  try {
    const contract = new ethers.Contract(
      cutivationRecordAddress,
      cutivationRecordABI,
      httpProvider
    );
    const records = await contract.query(cropId);
    return records.map((e) => ({
      timestamp: e[0],
      action: e[1],
      txHash: e[2],
    }));
  } catch (err) {
    return [];
  }
};

const fetchSecureItem = async (uuid) => {
  try {
    const contract = new ethers.Contract(
      secureItemAddress,
      secureItemABI,
      httpProvider
    );
    const record = await contract.Database(uuid);
    return {
      timestamp: record[0],
      cid: record[1],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchOrganicCertificate = async (farmID) => {
  try {
    const contract = new ethers.Contract(
      organicCertificateAddress,
      organicCertificateABI,
      httpProvider
    );
    const record = await contract.Database(`${farmID}`);
    return {
      timestamp: record[0],
      name: record[1],
      cid: record[2],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchSensorAnalysis = async (cropID) => {
  try {
    const contract = new ethers.Contract(
      sensorAnalysisAddress,
      sensorAnalysisABI,
      httpProvider
    );
    const record = await contract.get(cropID);
    console.log("record__", record);
    return record.map((el) => ({
      key: el[0],
      value: parseInt(el[1]),
      unit: el[2],
      updateAt: el[3],
    }));
  } catch (err) {
    console.log(err);
    return null;
  }
};
export {
  fetchCultivationRecord,
  fetchSecureItem,
  fetchOrganicCertificate,
  fetchSensorAnalysis,
};
