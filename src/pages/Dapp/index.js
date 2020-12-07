import React, { useContext, useEffect, useState } from "react";

import moment from "moment";
import CertificateCard from "../../../src/components/Card/CertificateCard";
import TimeLine from "../../../src/components/TimeLine";
import GiftCard from "../../../src/components/Card/GiftCard";
import {
  fetchCultivationRecord,
  fetchOrganicCertificate,
  fetchSecureItem,
} from "../../api/ethereum";
import { getTraceData, sendPressLike } from "../../api/package";
import { fetchVideo } from "../../api/media";
import { useParams, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";

function Dapp(props) {
  const { traceID } = useParams(); // main KEY in url
  const [cultivationRecord, setCultivationRecord] = useState([]); // 田間紀錄
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

  async function setupRequiredInformation(traceID) {
    try {
      // 去server端抓資料，TODO: We need a metainfo contract bypass our server side
      let {
        gift_card,
        crop_id,
        farm_id,
        photo_url,
        farm_intro,
        certificate_filename_arr,
        gift,
      } = await getTraceData(traceID);

      setFarmIntro(farm_intro);
      setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));

      // 田間紀錄
      let response = await fetchCultivationRecord(crop_id);
      // 轉換成{icon, title, description}的形式，方便用timeline顯示
      let cultivation_records = response.map((record) => {
        let icon_path = "../../assets/img/cultivation";
        switch (record.action) {
          case "播種測試":
          case "播種":
            icon_path = "../../assets/img/cultivation/播種.png";
            break;
          case "種植":
          case "定植":
            icon_path = "../../assets/img/cultivation/定植.png";
            break;
          case "施肥":
            icon_path = "../../assets/img/cultivation/施肥.png";
            break;
          case "除草":
            icon_path = "../../assets/img/cultivation/除草.png";
            break;
          case "粗耕":
            icon_path = "../../assets/img/cultivation/粗耕.png";
            break;
          case "細耕":
            icon_path = "../../assets/img/cultivation/細耕.png";
            break;
          case "割稻":
            icon_path = "../../assets/img/cultivation/割稻.png";
            break;
          case "插秧":
            icon_path = "../../assets/img/cultivation/插秧.png";
            break;

          case "整地":
          default:
            icon_path = "../../assets/img/cultivation/整地.jpg";
            break;
        }
        return {
          icon: icon_path,
          title: record.action,
          description: moment.unix(record.timestamp).format("YYYY-MM-DD"),
        };
      });

      setCultivationRecord(cultivation_records);

      // 有機檢驗證書
      response = await fetchOrganicCertificate(farm_id);
      setOrganicCertificates(certificate_filename_arr);

      // 出貨前照片
      response = await fetchSecureItem(traceID);
      setSecureItem({
        timestamp: response?.timestamp,
        cid: response?.cid,
      });

      response = await fetchVideo(gift.video_id);
      setGiftFrom(gift.gift_from);
      setGiftText(gift.gift_text);
      setGiftVideo(response.data);
    } catch (err) {
      console.error("here", err);
      // Redirect to 404 page
      setIsForbidden(true);
    }
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
    <div>
      <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9 mt-2">
        <button
          onClick={() => setGiftCardVisible(true)}
          className="btn btn-primary"
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
              <h6>送禮者：{giftFrom}</h6>
              <h6>祝賀詞：{giftText}</h6>
              <ReactPlayer
                light={true}
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
      <div className="border-bottom">
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>出貨前照片</h2>
            {secureItem ? (
              <img
                src={`https://ipfs.io/ipfs/${secureItem?.cid}`}
                className="responsive-img mt-2"
              />
            ) : (
              <p>無法取得出貨前照片</p>
            )}
          </div>
        </div>
        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>生產履歷</h2>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              {cultivationRecord !== null || cultivationRecord.length !== 0 ? (
                <TimeLine items={cultivationRecord} />
              ) : (
                <p>無相關田間紀錄</p>
              )}
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>

        <div className="container space-2 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>農場資訊</h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 px-2 px-sm-3 mb-3 mb-sm-5 px-3">
              {farmPic.map((pic, index) => {
                return <img src={pic} className="responsive-img" key={index} />;
              })}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 px-2 px-sm-3 mb-3 mb-sm-5 px-5">
              <p style={{ letterSpacing: "0.2rem" }}>{farmIntro?.farm_intro}</p>
              <ul style={{ listStyleType: "none", textAlign: "left" }}>
                <li>
                  <i className="fas fa-map-marked-alt"></i>
                  <span className="mx-2">{farmIntro?.farm_address}</span>
                </li>
                <li>
                  <i className="fas fa-phone-square-alt"></i>
                  <span className="mx-2">{farmIntro?.farm_phone}</span>
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
                  </div>
                );
              })
            ) : (
              <p>無相關證書</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dapp;
