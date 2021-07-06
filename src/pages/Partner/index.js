import React, { useEffect, useRef, useState } from "react";
import TimeLine from "../../../src/components/TimeLine";
import Slideshow from "../../components/Slideshow";
import { getPartnerData } from "../../api/partner";
import { useParams, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import Typed from "typed.js";
import {
  TraceCard,
  ManipulateCard,
  CertificateCard,
} from "../../components/Card";

import { Button } from "react-bootstrap";

function Partner(props) {
  const player_wrapper = {
    position: "relative",
    paddingTop: "56.25%",
  };
  const react_player = {
    position: "absolute",
    top: 0,
    left: 0,
  };
  const giftTextRef = useRef();
  const { traceID } = useParams(); // main KEY in url
  const [isForbidden, setIsForbidden] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [intro, setIntro] = useState("");
  const [phone, setPhone] = useState("");
  const [trace, setTrace] = useState([]);
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState(["", ""]);
  let defaultPicture =
    "https://storage.googleapis.com/tenlife/173a21b0-14f9-11eb-b97c-8d2f74c07adb.jpg";
  const [foodlist, setFoodList] = useState([]);
  const [manilist, setManiList] = useState([]);
  const [isOnepage, setIsOnepage] = useState(false);

  useEffect(() => {
    // 從url取得溯源參數
    if (traceID) {
      // Farm & crop information
      setupRequiredInformation(traceID);
    } else {
      // Redirect to 404 page

      setIsForbidden(true);
    }
  }, []);

  async function setupRequiredInformation(traceID) {
    // 去server端抓資料
    try {
      let temp_picture = [];
      const infoList = await getPartnerData(traceID);
      if (infoList) {
        setBrandName(infoList[0].name);
        setIntro(infoList[0].intro);
        setPhone(infoList[0].phone);
        setAddress(infoList[0].address);
        for (var i = 0; i < 2; i++) {
          temp_picture.push(infoList[0].picture[i].picture_url);
        }
        setPicture(temp_picture);
        console.log(infoList[0].trace[0]);
        setTrace(infoList[0].trace);
        setFoodList(infoList[0].foodlist);
        setManiList(infoList[0].manilist);
        console.log(infoList[0].foodlist);

        if (traceID === "taiting") setIsOnepage(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return isForbidden ? (
    <Redirect to="/404" />
  ) : (
    <div className="border-bottom mt-4">
      <div className="container space-1 space-lg-3">
        {/*<div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h4>本服務由愛便當委託農金鏈提供</h4>
        </div>*/}
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>愛便當合作夥伴</h2>
          <h2>{brandName}</h2>
        </div>
        <div className="row">
          <div className="col-sm">
            <Slideshow src_arr={picture} />
          </div>
          <div className="col-sm m-auto">
            <p style={{ letterSpacing: "0.2rem" }}>{intro}</p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                textAlign: "right",
              }}
            >
              {address !== "" ? (
                <li className="mt-1">
                  <i className="fas fa-map-marked"></i>
                  <a
                    target="_blank"
                    href={`http://maps.google.com/?q=${address}`}
                    className="mx-2"
                  >
                    {address}
                  </a>
                </li>
              ) : null}
              {phone !== "" ? (
                <li className="mt-1">
                  <i className="fas fa-phone" style={{ width: 18 }}></i>
                  <a target="_blank" href={`tel:${phone}`} className="mx-2">
                    {phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      {/*{manilist.length > 0 ? (*/}
      {isOnepage === false ? (
        <div className="container">
          <div className="text-center">
            <h2>區塊鏈溯源品項</h2>
            <h4>點擊圖片瀏覽溯源數據</h4>
          </div>
          <div>
            {foodlist.map(([name, link_url, types, vendor, create_at]) => (
              <div
                key={link_url}
                className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
              >
                <TraceCard
                  key={link_url}
                  name={name}
                  type={types}
                  link_url={link_url + `?onShip=false`}
                  picture_url={trace[0].picture_url}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div style={player_wrapper}>
            <ReactPlayer
              style={react_player}
              url={
                "https://storage.googleapis.com/agchain/80f106ea-8811-42c4-9bdd-a9665f785e7b-720p.mp4"
              }
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <div className="container space-1 space-lg-3">
            <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
              <h2>檢驗證書</h2>
            </div>
            <div className="row mx-n2 mx-sm-n3 mb-3 mx-auto">
              <div className="col-sm-6 col-lg-4 px-2 px-sm-3 mb-3 mb-sm-5">
                <CertificateCard
                  idx={1}
                  img={"https://i.imgur.com/xbeOYbV.jpg"}
                  title={"品質檢驗報告-1"}
                />
              </div>
              <div className="col-sm-6 col-lg-4 px-2 px-sm-3 mb-3 mb-sm-5">
                <CertificateCard
                  idx={2}
                  img={"https://i.imgur.com/nGNJuA7.jpg"}
                  title={"品質檢驗報告-2"}
                />
              </div>
              <div className="col-sm-6 col-lg-4 px-2 px-sm-3 mb-3 mb-sm-5">
                <CertificateCard
                  idx={3}
                  img={"https://i.imgur.com/ZQ40IJH.jpg"}
                  title={"品質檢驗報告-3"}
                />
              </div>
            </div>
          </div>

          {/*
            {organicCertificates.length > 0 ? (
              organicCertificates.map((e, index) => {
                return (
                  <div
                    className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
                    key={index}
                  >
                    <CertificateCard idx={index} img={e} title={"農場檢驗證書"} />
                    // <CertificateCard idx={index} img={`https://ipfs.io/ipfs/${e?.cid}`} title={e.name} />
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p>無相關證書</p>
              </div>
            )}
          */}
        </div>
      )}
      {manilist.length > 0 ? (
        <div className="container">
          <div className="text-center">
            <h2>便當實際製作照片</h2>
          </div>
          <div>
            {manilist.map(([action, photo_url, active, tackle_time]) => (
              <div key={tackle_time} className="layoutBox ">
                <div className="leftLayout">
                  <ManipulateCard
                    key={tackle_time}
                    action={action}
                    photo_url={photo_url}
                  />
                </div>
                <div className="rightLayout">
                  <h2>{action}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Partner;
