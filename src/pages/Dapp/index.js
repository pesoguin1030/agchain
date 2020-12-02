import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import moment from "moment";

import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import CertificateCard from "../../../src/components/CertificateCard";
import TimeLine from "../../../src/components/TimeLine";

import axios from "axios";
import { Reorder } from "@material-ui/icons";
// let server_url = "https://app.freshio.me";
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
  const [certificateArr, setCertificateArr] = useState([]);
  const [certificate_filename_arr, setcertificate_filename_arr] = useState([]);

  useEffect(() => {
    const package_uuid = props.match.params.trace_param.split("_")[0];
    const serial_number = String(props.match.params.trace_param.split("_")[1]); // for package_item
    console.log("uuid: " + package_uuid);
    console.log("pkg_item serial num: " + serial_number);

    // 去server端抓資料
    getTraceData(package_uuid, serial_number).then((data) => {
      const { crop_id, photo_url, farm_intro, certificate_filename_arr } = data;
      setFarmIntro(farm_intro);
      setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
      setcertificate_filename_arr(certificate_filename_arr);
      // ({title: item.title, filename: item.filename})
      setPhotoUrl(photo_url);

      // 田間紀錄
      query(crop_id).then(function (data) {
        var cultivation_records = data.map((record) => {
          var icon_path = "../../assets/img/cultivation";
          switch (record.action) {
            case "播種測試":
              icon_path = "../../assets/img/cultivation/sow.png";
              break;
            case "施肥":
              icon_path = "../../assets/img/cultivation/fertilize.png";
              break;

            default:
              icon_path = "../../assets/img/100x100/img3.jpg";
              break;
          }
          return {
            icon: icon_path,
            title: record.action,
            description: moment.unix(record.timestamp).format("YYYY-MM-DD"),
          };
        });
        setCultivationRecord(cultivation_records);
      });
    });
  }, []);

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    return objs;
  }

  return (
    <main id="content" role="main">
      <Header />
      {/* <div class="container d-lg-flex align-items-lg-center space-top-2 space-lg-0 min-vh-lg-100">
        <div class="w-md-100">
          <div class="position-relative min-h-450rem">
            <div
              class="js-video-bg position-absolute w-100 h-100"
              data-hs-video-bg-options='{
                "type": "you-tube",
                "videoId": "6rPPUmStKQ4"
              }'
            ></div>
          </div>
        </div>
      </div> */}

      <div className="border-bottom">
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>出貨前照片</h2>
            <img src={photoUrl} className="responsive-img mt-2" />
          </div>
        </div>
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>生產履歷</h2>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <TimeLine items={cultivationRecord} />
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>

        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>農場資訊</h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-6 px-2 px-sm-3 mb-3 mb-sm-5">
              {farmPic.map((pic, index) => {
                return <img src={pic} className="responsive-img" key={index} />;
              })}
            </div>
            <div className="col-sm-6 col-lg-6 px-2 px-sm-3 mb-3 mb-sm-5">
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
          </div>
        </div>

        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>檢驗證書</h2>
          </div>
          <div className="row mx-n2 mx-sm-n3 mb-3">
            {certificate_filename_arr.map((cerftificate, index) => {
              return (
                <div
                  className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
                  key={index}
                >
                  <CertificateCard
                    img={`https://app.freshio.me/photos/certificates/${cerftificate.filename}`}
                    title={`${cerftificate.title}`}
                    onClickToZoomIn={() => console.log("AAA")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Dapp;
