import React, { useEffect, useRef, useState } from "react";

import CertificateCard from "../../../src/components/Card/CertificateCard";
import TimeLine from "../../../src/components/TimeLine";
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
import { useParams, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import Typed from "typed.js";

import { Button } from "react-bootstrap";

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
  const [orderNumber, setOrderNumber] = useState(null);
  const [localCounter, setLocalCounter] = useState("");
  const [time, setTime] = useState("");

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
    } = await getTraceData(traceID);

    let response;

    setLocalCounter(counter);
    setTime(update_at);
    // 送禮影片
    setOrderNumber(order_number);

    console.log(farm_intro);
    setFarmIntro(farm_intro);
    setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
    setCropName(crop_name);
    console.log(farmPic);

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
      //沒有number就電子賀卡整區別出現啊
      {orderNumber ? (
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
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>與收到的禮品比比看</h2>
        </div>
        {/* <div className="row w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <div className="row w-md-80 w-lg-40 mx-md-auto px-5">
            <ImgToPuzzle/>
          </div>
        </div> */}

        <div className="row w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          {secureItem && secureItem.cid !== "" ? (
            <ImgToPuzzle img={`${secureItem?.cid}`} />
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
          {organicCerftificates.length > 0 ? (
            organicCerftificates.map((e, index) => {
              return (
                <div
                  className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
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
    </div>
  );
}

export default Dapp;
