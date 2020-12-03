import { ethers } from "ethers";
import {
  cutivationRecordABI,
  cutivationRecordAddress,
} from "../abi/cultivationRecord";
import {
  organicCertificateABI,
  organicCertificateAddress,
} from "../abi/organicCertificate";
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
    }));
  } catch (err) {
    return Promise.reject(err);
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
    return Promise.reject(err);
  }
};

const fetchOrganicCertificate = async (farmID) => {
  try {
    const contract = new ethers.Contract(
      organicCertificateAddress,
      organicCertificateABI,
      httpProvider
    );
    const record = await contract.Database(farmID);
    return {
      timestamp: record[0],
      name: record[1],
      cid: record[2],
    };
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchCultivationRecord, fetchSecureItem, fetchOrganicCertificate };
