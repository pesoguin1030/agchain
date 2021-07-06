import React, { useEffect, useRef, useState } from "react";
//import CertificateCard from "../../../src/components/Card/CertificateCard";
import { CertificateCard } from "../../components/Card";
import TimeLine from "../../../src/components/TimeLine";
import TimeLine_try from "../../../src/components/TimeLine_try";
import Radarchart from "../../../src/components/RadarChart";
import { ImgToPuzzle } from "../../components/Puzzle";
import Slideshow from "../../components/Slideshow";

import {
  fetchOrganicCertificate,
  fetchSecureItem,
  fetchSensorAnalysis,
} from "../../api/ethereum";
import { getTraceData, sendPressLike } from "../../api/package";
import { fetchVideo } from "../../api/media";
import { getCultivationRecord } from "../../api/cultivationRecord";
import { FarmInfo } from "../../api/product";
import { useParams, Redirect, useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import Typed from "typed.js";
import ReactStars from "react-rating-stars-component";
import request from "../../utils/request";
import { Button, Container } from "react-bootstrap";

function Dapp(props) {
  const giftTextRef = useRef();
  const { traceID } = useParams(); // main KEY in url
  const [cultivationRecord, setCultivationRecord] = useState([]); // 田間紀錄
  const [newCultivationRecord, setNewCultivationRecord] = useState([]); // 田間紀錄
  const [sensorAnalysis, setSensorAnalysis] = useState([]); // 種植數據
  const [farmIntro, setFarmIntro] = useState([]); // 農場介紹
  const [farmPic, setFarmPic] = useState([]); // 農場照片(1~3張?)
  const [farmVideo, setFarmVideo] = useState([]); // 農場介紹影片
  const [secureItem, setSecureItem] = useState(null); // 出貨前照片
  const [organicCertificates, setOrganicCertificates] = useState([]); // 檢驗證書
  const [isForbidden, setIsForbidden] = useState(false);
  const [giftCardVisible, setGiftCardVisible] = useState(true);
  const [farmVideoVisible, setFarmVideoVisible] = useState(true); // 農場是否提供影片
  const [likeIsPressed, setLikeIsPressed] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [giftVideo, setGiftVideo] = useState(null);
  const [giftFrom, setGiftFrom] = useState("");
  const [giftText, setGiftText] = useState("");
  const [cropName, setCropName] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [localCounter, setLocalCounter] = useState("");
  const [time, setTime] = useState("");
  const publicIp = require("public-ip");
  const [ip, setIP] = useState("");
  const [onShip, setOnship] = useState(true);
  const location = useLocation();
  const [point, setPoint] = useState(null);
  const [givePoint, setGivePoint] = useState(0);
  const [advice, setAdvice] = useState("");
  const [alert, setAlert] = useState("");

  const rating_stars = {
    size: 30,
    count: 10,
    isHalf: false,
    value: 4,
    color: "gray",
    activeColor: "yellow",
    onChange: (newValue) => {
      setGivePoint(newValue);
    },
  };

  const player_wrapper = {
    position: "relative",
    paddingTop: "56.25%",
  };

  const react_player = {
    position: "absolute",
    top: 0,
    left: 0,
  };

  //parameter
  useEffect(() => {
    console.log("----", new URLSearchParams(location.search).get("onShip"));
    const onShipOrNot = !(
      new URLSearchParams(location.search).get("onShip") == "false"
    ); //||true
    setOnship(onShipOrNot);
  }, []);
  //
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
      setupRequiredInformation(traceID);
      // Secure item snapshot
      fetchSecureItem(traceID);
    } else {
      // Redirect to 404 page
      setIsForbidden(true);
    }
  }, []);

  async function handleUpload() {
    if (givePoint == 0) {
      setAlert("請給予評分");
      return;
    }
    try {
      const response = await request.post(
        `/packages/feedback`,
        {
          packageItemID: traceID,
          comment: advice,
          rating: givePoint,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store",
          },
        }
      );
      setSubmitSuccess(true);
      setAlert("完成評分！");
    } catch (error) {
      alert("無法預期的錯誤");
      console.log(error);
    }
  }

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) {
      if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    }
    return objs;
  }

  async function setupRequiredInformation(traceID) {
    // 去server端抓資料，TODO: We need a metainfo contract bypass our server side
    let {
      crop_id,
      crop_name,
      farm_id,
      photo_url,
      farm_intro,
      certificate_filename_arr,
      order_number,
      counter,
      update_at,
      ip,
      product_point,
      db_fieldLog,
    } = await getTraceData(traceID, await publicIp.v4());

    let response;
    setPoint(product_point);
    setIP(ip);
    setNewCultivationRecord(db_fieldLog);
    setLocalCounter(counter);
    setTime(update_at);
    // 送禮影片
    setOrderNumber(order_number);
    setFarmIntro(farm_intro);
    setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
    setCropName(crop_name);

    // 農場介紹影片
    console.log(farm_intro.farm_video);
    if (farm_intro.farm_video !== "") {
      setFarmVideo(farm_intro.farm_video);
    } else {
      setFarmVideoVisible(false);
    }

    // 田間紀錄
    response = await getCultivationRecord(crop_id);
    setCultivationRecord(response);

    // 出貨前照片
    response = await fetchSecureItem(traceID);
    setSecureItem({
      timestamp: response?.timestamp,
      cid: photo_url,
    });

    // 數據分析
    response = await fetchSensorAnalysis(crop_id);
    setSensorAnalysis(response);

    // 有機檢驗證書
    response = await fetchOrganicCertificate(farm_id);
    setOrganicCertificates(certificate_filename_arr);
    console.log("Certificate: ", response);
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
  //需要同時符合不是加工後產品+有orderNumber才會有賀卡
  return isForbidden ? (
    <Redirect to="/404" />
  ) : (
    <div className="border-bottom">
      {onShip && orderNumber ? (
        <div className="container space-1 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <h2>電子賀卡</h2>
          </div>
          <div className="row w-md-80 w-lg-75 text-center mx-md-auto mb-5 mb-md-9">
            <div className="col-12">
              <div
                style={{
                  margin: "auto",
                }}
              >
                <iframe
                  width="100%"
                  height="720"
                  style={{
                    border: "none",
                  }}
                  src={`https://gift-7ee75.web.app/show/${orderNumber}`}
                  scrolling="no"
                />
                {likeIsPressed ? (
                  <Button variant="success" disabled>
                    <i className="fas fa-check"></i> 已按過讚
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    style={{
                      backgroundColor: "var(--pink)",
                      borderColor: "var(--pink)",
                    }}
                    onClick={() => handlePressLike(traceID)}
                  >
                    <i className="fas fa-heart"></i> 喜歡
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5">
          <h5>這是本產品頁面第{localCounter}次被溯源</h5>
          {localCounter > 1 ? <h5>上次溯源IP為{ip}</h5> : null}
          {localCounter > 1 ? <h5>上次溯源時間{time}</h5> : null}
        </div>
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5">
          <img
            className="img-fluid w-80"
            src="/assets/svg/icons/icon-68.svg"
            alt="SVG"
          />
          <h1>區塊鏈信賴溯源</h1>
          <p style={{ letterSpacing: "0.2rem" }}>
            以下資料皆有區塊鏈加密與不可竄改之信賴保障，提高食品安全透明度。
          </p>
        </div>
      </div>
      {/*onship也可以有照片*/}
      {secureItem?.cid !== null ? (
        <div className="container space-1 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            {onShip ? <h2>與收到的產品比比看</h2> : <h2>這是商家的食材照片</h2>}
          </div>
          {/* <div className="row w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            <div className="row w-md-80 w-lg-40 mx-md-auto px-5">
              <ImgToPuzzle/>
            </div>
          </div> */}

          <div className="row w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            {secureItem && secureItem.cid !== "" ? (
              // <ImgToPuzzle img={`${secureItem?.cid}`} />
              <div className="row w-md-100 w-lg-50 mx-md-auto px-5">
                <img
                  style={{
                    objectFit: "contain",
                    maxHeight: 600,
                  }}
                  src={`${secureItem?.cid}`}
                  className="responsive-img mt-2"
                />
              </div>
            ) : (
              // <div className="row w-md-100 w-lg-50 mx-md-auto px-5">
              //   {/* <img
              //     style={{
              //       objectFit: "contain",
              //       maxHeight: 480,
              //     }}
              //     src={`${secureItem?.cid}`}
              //     className="responsive-img mt-2"
              //   /> */}

              // </div>
              <div className="col-12 text-center">
                <ImgToPuzzle
                  img={
                    "https://storage.googleapis.com/tenlife/df302260-4f4a-11eb-a316-2f179a7b75ab.jpg"
                  }
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>田間紀錄</h2>
        </div>
        <div className="row w-md-80 w-lg-50 mx-md-auto px-5">
          {cultivationRecord && cultivationRecord.length !== 0 ? (
            // 弄一個可以scroll的window?
            <div className="col-12 px-auto">
              {/* Toggle button版 
              <div className="col-12 collapse" id="cultivationRecord">
                <TimeLine items={cultivationRecord} />
              </div>
              
              <div className=" mx-auto">
                <button 
                  class="btn btn-primary" type="button" 
                  data-toggle="collapse" data-target="#cultivationRecord" 
                  aria-expanded="false" aria-controls="collapseExample">
                  查看田間紀錄
                </button>
              </div> */}
              <div
                id="style-2"
                style={{ overflow: "hidden scroll", height: "480px" }}
              >
                <TimeLine items={cultivationRecord} />
              </div>
            </div>
          ) : newCultivationRecord && newCultivationRecord.length !== 0 ? (
            <div className="col-12 px-auto">
              <div
                id="style-2"
                style={{ overflow: "hidden scroll", height: "480px" }}
              >
                <TimeLine_try items={newCultivationRecord} />
              </div>
            </div>
          ) : (
            <div className="col-12 text-center">
              <p>無相關田間紀錄</p>
            </div>
          )}
        </div>
      </div>
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9 ">
          <h2>種植數據</h2>
        </div>
        <div className="row mx-n2 mx-sm-n3 mb-3">
          <div className="col-12">
            <Radarchart data={sensorAnalysis} cropName={cropName} />
          </div>
        </div>
      </div>
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>農場資訊</h2>
        </div>
        <Slideshow src_arr={[farmPic[0], farmPic[1], farmPic[2]]} />
        <div className="space-1">
          <p style={{ letterSpacing: "0.2rem" }}>{farmIntro?.farm_intro}</p>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 0,
              textAlign: "center",
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
        {farmVideoVisible === true ? (
          <div style={player_wrapper}>
            <ReactPlayer
              style={react_player}
              url={farmVideo}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        ) : null}

        {/* <div className="row">
          <div className="col-md-6 px-sm-3 mb-4 px-3">
            {
              <iframe
                width="100%"
                height={360}
                src={`${farmIntro?.farm_video}?autoplay=1&mute=1`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            }
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
        </div> */}
      </div>
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>檢驗證書</h2>
        </div>
        <div className="row mx-n2 mx-sm-n3 mb-3">
          {organicCertificates.length > 0 ? (
            organicCertificates.map((e, index) => {
              return (
                <div
                  className="col-sm-6 col-lg-4 px-2 px-sm-3 mb-3 mb-sm-5"
                  key={index}
                >
                  <CertificateCard idx={index} img={e} title={"農場檢驗證書"} />
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
      {!point ? (
        <div className="container space-1 space-lg-3">
          <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
            {givePoint == 0 ? (
              <h2>評價與建議(請點擊給分)</h2>
            ) : (
              <h2>評價與建議({givePoint}分)</h2>
            )}
          </div>
          <div className="w-md-80 w-lg-40 mx-md-auto mb-5 mb-md-9 helpstar text-center">
            <ReactStars {...rating_stars} />
          </div>
          <div className="text-center">
            <textarea
              cols="40"
              rows="10"
              value={advice}
              onChange={(e) => {
                setAdvice(e.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-lg btn-primary"
              onClick={handleUpload}
              disabled={submitSuccess}
            >
              提交
            </button>
          </div>
          <div className="text-center">
            <h3>{alert}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dapp;
