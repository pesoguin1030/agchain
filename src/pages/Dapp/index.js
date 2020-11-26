import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";

import axios from "axios";
// let server_url = "https://app.freshio.me";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

let server_url = "http://localhost:4000";

const httpProvider = ethers.getDefaultProvider("goerli");

const contractAddress = "0xACA042F6Fe0A29d02D16E859aaA03bcCb1169D9B";
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cropID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "action",
        type: "string",
      },
    ],
    name: "append",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "cropIDs",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "action",
        type: "string",
      },
    ],
    name: "batch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Database",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "action",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platform",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cropID",
        type: "uint256",
      },
    ],
    name: "query",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "action",
            type: "string",
          },
        ],
        internalType: "struct CultivationRecord.Record[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const query = async (cropId) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, httpProvider);
    const records = await contract.query(cropId);
    return records.map((e) => ({
      timestamp: e[0],
      action: e[1],
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function getTraceData(package_uuid, serial_number) {
  try {
    const response = await axios.get(`${server_url}/dapp`, {
      params: {
        // farm_id: currentPackage.farm_id || currentPackage.product.farm_id,
        pkg_uuid: package_uuid,
        serial_num: serial_number,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    alert("抓不到Trace Data QQ");
    console.log(error);
    return false;
  }
}

function Dapp(props) {
  const [cultivationRecord, setCultivationRecord] = useState([]);
  const [farmIntro, setFarmIntro] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [farmPic, setFarmPic] = useState([]);
  const [certificate_file_arr, setCertificate_file_arr] = useState([]);
  useEffect(() => {
    // const package_uuid = props.match.params.uuid;
    // const serial_number = props.match.params.serial_num; // for package_item
    const package_uuid = props.match.params.trace_param.split("_")[0];
    const serial_number = props.match.params.trace_param.split("_")[1]; // for package_item
    console.log("uuid: " + package_uuid);
    console.log("pkg_item serial num: " + serial_number);

    // 去server端抓資料
    getTraceData(package_uuid, serial_number).then((data) => {
      const { photo_url, farm_intro, certificate_filename_arr } = data;
      setFarmIntro(farm_intro);
      setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
      setCertificate_file_arr(certificate_filename_arr);
      setPhotoUrl(photo_url);
    });

    // cropID => type = number   140 150 141 144 145 149...
    query(149).then(function (data) {
      setCultivationRecord(data);
    });
  }, []);

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    return objs;
  }
  // useEffect(() => {
  //   if (cultivationRecord.length !== 0) {
  //     console.log("SET", cultivationRecord);
  //   }
  // }, [cultivationRecord]);

  // useEffect(() => {
  //   if (farmIntro.length !== 0) {
  //     console.log("SET", farmIntro);
  //   }
  // }, [farmIntro]);

  return (
    <main id="content" role="main">
      <Header />
      <div className="border-bottom">
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>出貨前照片</h2>
          </div>
          <img src={photoUrl} />
        </div>
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>生產履歷</h2>
          </div>
          <div>{JSON.stringify(cultivationRecord)}</div>
        </div>

        <div
          className="container space-2 space-lg-3"
          style={{ margin: "auto", textAlign: "center" }}
        >
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>農場資訊</h2>
          </div>
          {farmPic.map((pic) => {
            return <img src={pic} />;
          })}
          <p>{farmIntro["farm_intro"]}</p>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <span>地址:{farmIntro["farm_address"]}</span>
            </li>
            <li>
              <span>電話:{farmIntro["farm_phone"]}</span>
            </li>
          </ul>
        </div>

        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>檢驗證書</h2>
          </div>
          {/* <img src="https://app.freshio.me/photos/certificates/user-12-1602049831747.jpg" /> */}
          {certificate_file_arr.map((cerftificate_file) => {
            return (
              <div style={{ margin: "auto" }}>
                <img
                  src={`https://app.freshio.me/photos/certificates/${cerftificate_file}`}
                  style={{ width: "70%", height: "70%" }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Dapp;
