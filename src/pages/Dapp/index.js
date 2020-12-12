import React, { useEffect, useRef, useState } from "react";

import moment from "moment";
import CertificateCard from "../../../src/components/Card/CertificateCard";
import TimeLine from "../../../src/components/TimeLine";
import GiftCard from "../../../src/components/Card/GiftCard";
import Radarchart from "../../../src/components/RadarChart";
import {
  fetchCultivationRecord,
  fetchOrganicCertificate,
  fetchSecureItem,
  fetchSensorAnalysis,
} from "../../api/ethereum";
import { getTraceData, sendPressLike } from "../../api/package";
import { fetchVideo } from "../../api/media";
import { useParams, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import Typed from "typed.js";
import { icon } from "@fortawesome/fontawesome-svg-core";

function Dapp(props) {
  const giftTextRef = useRef();
  const { traceID } = useParams(); // main KEY in url
  const [cultivationRecord, setCultivationRecord] = useState([]); // 田間紀錄
  const [sensorAnalysis, setSensorAnalysis] = useState([]); // 種植數據
  const [farmIntro, setFarmIntro] = useState([]); // 農場介紹
  const [farmPic, setFarmPic] = useState([]); // 農場照片(1~3張?)
  const [secureItem, setSecureItem] = useState(null); // 出貨前照片
  const [organicCerftificates, setOrganicCertificates] = useState([]); // 檢驗證書
  const [isForbidden, setIsForbidden] = useState(false);
  const [giftCardVisible, setGiftCardVisible] = useState(true);
  const [likeIsPressed, setLikeIsPressed] = useState(false);
  const [giftVideo, setGiftVideo] = useState(null);
  const [giftFrom, setGiftFrom] = useState("");
  const [giftText, setGiftText] = useState("");
  const [cropName, setCropName] = useState("");

  // Running gift text
  useEffect(() => {
    if (giftText === "" || !giftTextRef.current) return;
    const typed = new Typed(giftTextRef.current, {
      strings: [giftText],
      typeSpeed: 300,
      backSpeed: 200,
      backDelay: 10000,
      startDelay: 1000,
      loop: true,
      smartBackspace: false,
    });
    return () => {
      typed.destroy();
    };
  }, [giftText, giftTextRef.current]);
  useEffect(() => {
    // 從url取得溯源參數
    if (traceID) {
      // Farm & crop information
      console.log(traceID);
      setupRequiredInformation(traceID);
      // Secure item snapshot
      fetchSecureItem(traceID);
    } else {
      // Redirect to 404 page
      setIsForbidden(true);
    }
  }, []);

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    return objs;
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

  async function setupRequiredInformation(traceID) {
    // 去server端抓資料，TODO: We need a metainfo contract bypass our server side
    let {
      // gift_card,
      crop_id,
      crop_name,
      farm_id,
      farm_intro,
      certificate_filename_arr,
      gift,
    } = await getTraceData(traceID);

    let response;

    // 送禮影片
    if (gift) {
      response = await fetchVideo(gift.video_id);
      setGiftFrom(gift.gift_from);
      setGiftText(gift.gift_text);
      setGiftVideo(response.data);
    }

    setFarmIntro(farm_intro);
    setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
    setCropName(crop_name);

    // 田間紀錄
    response = await fetchCultivationRecord(crop_id);
    response = sortCultivationRecord(response);
    // 轉換成{icon, title, description}的形式，方便用timeline顯示
    let cultivation_records = response.map((record) => {
      let icon_path = "../../assets/img/cultivation";
      switch (record.action) {
        case "播種測試":
        case "播種":
          icon_path = "播種.png";
          break;
        case "種植":
        case "定植":
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
        case "整地":
          icon_path = "整地.png";
          break;
        case "澆水":
          icon_path = "澆水.png";
          break;
        case "除草":
          icon_path = "除草.png";
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
    setCultivationRecord(cultivation_records);

    // 出貨前照片
    response = await fetchSecureItem(traceID);
    setSecureItem({
      timestamp: response?.timestamp,
      cid: response?.cid,
    });

    // 數據分析
    response = await fetchSensorAnalysis(crop_id);
    setSensorAnalysis(response);

    // 有機檢驗證書
    response = await fetchOrganicCertificate(farm_id);
    setOrganicCertificates(certificate_filename_arr);
  }

  async function handlePressLike(traceID) {
    try {
      await sendPressLike(traceID);
      setLikeIsPressed(true);
    } catch (err) {
      alert("遇到了一點錯誤");
      console.error(err);
    }
  }
  return isForbidden ? (
    <Redirect to="/404" />
  ) : (
    <div className="border-bottom">
      {giftVideo ? (
        <div>
          <div className="w-md-80 w-lg-40 text-center mx-md-auto my-3 mt-5">
            <button
              onClick={() => setGiftCardVisible(true)}
              className="btn btn-primary btn-pill"
            >
              觀看賀卡
            </button>
          </div>
          <GiftCard
            visible={giftCardVisible}
            onClose={() => setGiftCardVisible(false)}
            onPressLike={() => handlePressLike(traceID)}
            disabled={likeIsPressed}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              {giftVideo ? (
                <div>
                  <h5>送禮者：{giftFrom}</h5>
                  <h5>
                    祝賀詞：<span ref={giftTextRef}></span>
                  </h5>
                  <ReactPlayer
                    playing={true}
                    width="100%"
                    url={`https://storage.googleapis.com/agchain/${giftVideo.StandardDefinition}`}
                  />
                </div>
              ) : (
                <div className="space-1 text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </GiftCard>
        </div>
      ) : null}
      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5">
          <img
            className="img-fluid w-md-50 w-lg-40 mx-7 my-3"
            src="/assets/svg/icons/icon-50.svg"
            alt="SVG"
          />
          <h1>區塊鏈信賴溯源</h1>
          <p style={{ letterSpacing: "0.2rem" }}>
            以下資料皆有區塊鏈加密與不可竄改之信賴保障，提高食品安全透明度。
          </p>
        </div>
      </div>
      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>防偽鑑識照片</h2>
        </div>
        <div className="row w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          {secureItem && secureItem.cid !== "" ? (
            <div className="row w-md-80 w-lg-40 mx-md-auto px-5">
              <img
                src={`https://ipfs.io/ipfs/${secureItem?.cid}`}
                className="responsive-img mt-2"
              />
            </div>
          ) : (
            <div className="col-12 text-center">
              <p>無法取得出貨前照片</p>
            </div>
          )}
        </div>
      </div>

      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>田間紀錄</h2>
        </div>
        <div className="row w-md-80 w-lg-60 mx-md-auto px-5">
          {cultivationRecord && cultivationRecord.length !== 0 ? (
            <div className="col-12">
              <TimeLine items={cultivationRecord} />
            </div>
          ) : (
            <div className="col-12 text-center">
              <p>無相關田間紀錄</p>
            </div>
          )}
        </div>
      </div>

      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9 ">
          <h2>種植數據</h2>
        </div>
        <div className="row mx-n2 mx-sm-n3 mb-3">
          <div className="col-12">
            <Radarchart data={sensorAnalysis} cropName={cropName} />
          </div>
        </div>
      </div>

      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>農場資訊</h2>
        </div>
        <div className="row">
          <div className="col-md-6 px-sm-3 mb-4 px-3">
            {farmPic.map((pic, index) => {
              return <img src={pic} className="responsive-img" key={index} />;
            })}
          </div>
          <div className="col-md-6 px-sm-3 mb-5 px-5">
            <p style={{ letterSpacing: "0.2rem" }}>{farmIntro?.farm_intro}</p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                textAlign: "left",
              }}
            >
              <li className="mt-1">
                <i className="fas fa-map-marked"></i>
                <a
                  target="_blank"
                  href={`http://maps.google.com/?q=${farmIntro?.farm_address}`}
                  className="mx-2"
                >
                  {farmIntro?.farm_address}
                </a>
              </li>
              <li className="mt-1">
                <i className="fas fa-phone" style={{ width: 18 }}></i>
                <a
                  target="_blank"
                  href={`tel:${farmIntro?.farm_phone}`}
                  className="mx-2"
                >
                  {farmIntro?.farm_phone}
                </a>
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
          {organicCerftificates.length > 0 ? (
            organicCerftificates.map((e, index) => {
              return (
                <div
                  className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
                  key={index}
                >
                  <CertificateCard idx={index} img={e} title={e} />
                  {/* <CertificateCard idx={index} img={`https://ipfs.io/ipfs/${e?.cid}`} title={e.name} /> */}
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p>無相關證書</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dapp;
