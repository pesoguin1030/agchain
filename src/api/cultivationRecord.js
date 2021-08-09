import React from "react";
import { fetchCultivationRecord } from "./ethereum";
import moment from "moment";

async function getCultivationRecord(crop_id) {
  // 田間紀錄
  let response = await fetchCultivationRecord(crop_id);
  response = sortCultivationRecord(response);
  // 轉換成{icon, title, description}的形式，方便用timeline顯示
  let cultivation_records = response.map((record) => {
    let icon_path = "../../assets/img/cultivation";
    let record_action = "";
    if (record.action.includes("播種")) {
      record_action = "播種";
    } else if (
      record.action.includes("種植") ||
      record.action.includes("定植")
    ) {
      record_action = "種植";
    } else if (record.action.includes("肥")) {
      record_action = "施肥";
    } else if (record.action.includes("收")) {
      record_action = "收割";
    } else if (record.action.includes("整地")) {
      record_action = "整地";
    } else {
      record_action = record.action;
    }

    switch (record_action) {
      case "播種":
        icon_path = "播種.png";
        break;
      case "種植":
        //case "定植":
        icon_path = "定植.png";
        break;
      case "施肥":
        icon_path = "施肥.png";
        break;
      case "除草":
        icon_path = "除草.png";
        break;
      case "粗耕":
        icon_path = "粗耕.png";
        break;
      case "細耕":
        icon_path = "細耕.png";
        break;
      case "割稻":
        icon_path = "割稻.png";
        break;
      case "插秧":
        icon_path = "插秧.png";
        break;
      case "抽穗":
        icon_path = "抽穗.png";
        break;
      case "曬田":
        icon_path = "曬田.png";
        break;
      case "收割":
        icon_path = "收割.png";
        break;
      case "整地":
        icon_path = "整地.png";
        break;
      case "澆水":
      case "灌溉":
      case "噴藥":
        icon_path = "澆水.png";
        break;
      default:
        icon_path = "agriculture.png";
    }
    return {
      icon: icon_path,
      title:
        record.action +
        " (" +
        moment.unix(record.timestamp).format("YYYY-MM-DD") +
        ")",
      description: record.txHash,
    };
  });

  return cultivation_records;
}

function sortCultivationRecord(records) {
  // 過濾掉同一個TxHash的田間紀錄
  let uniqueRecords = Array.from(new Set(records.map((a) => a.txHash))).map(
    (txHash) => {
      return records.find((a) => a.txHash === txHash);
    }
  );
  // 依時間先後順序排列
  uniqueRecords.sort(function (a, b) {
    return a.timestamp - b.timestamp;
  });

  return uniqueRecords;
}

export { getCultivationRecord };
