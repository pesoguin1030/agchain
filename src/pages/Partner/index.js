import React, { useEffect, useRef, useState } from "react";
import TimeLine from "../../../src/components/TimeLine";
import Slideshow from "../../components/Slideshow";
import { getPartnerData } from "../../api/partner";
import { useParams, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import Typed from "typed.js";
import { TraceCard } from "../../components/Card";

import { Button } from "react-bootstrap";

function Partner(props) {
  const giftTextRef = useRef();
  const { traceID } = useParams(); // main KEY in url
  const [isForbidden, setIsForbidden] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [intro, setIntro] = useState("");
  const [phone, setPhone] = useState("");
  const [trace, setTrace] = useState([]);
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState([
    "https://storage.googleapis.com/tenlife/11c46d30-14f9-11eb-b97c-8d2f74c07adb.jpg",
    "https://storage.googleapis.com/tenlife/11c46d30-14f9-11eb-b97c-8d2f74c07adb.jpg",
  ]);
  let defaultPicture =
    "https://storage.googleapis.com/tenlife/11c46d30-14f9-11eb-b97c-8d2f74c07adb.jpg";

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
        console.log(infoList[0].trace);
        setTrace(infoList[0].trace);
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
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h4>本服務由愛便當委託農金鏈提供</h4>
        </div>
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>愛便當合作夥伴</h2>
          <h2>{brandName}</h2>
        </div>
        <div className="row">
          <div className="col-sm">
            <Slideshow src_arr={picture} />
          </div>
          <div className="col-sm">
            <p style={{ letterSpacing: "0.2rem" }}>{intro}</p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                textAlign: "right",
              }}
            >
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
              <li className="mt-1">
                <i className="fas fa-phone" style={{ width: 18 }}></i>
                <a target="_blank" href={`tel:${phone}`} className="mx-2">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-center">
          <h2>目前僅提供三光米溯源</h2>
          <h4>請點擊農作物名稱進行溯源</h4>
        </div>
        <div>
          {trace.map(({ id, link_url, name, type }) => (
            <div
              key={id}
              className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
            >
              <TraceCard
                key={id}
                crop_id={id}
                name={name}
                type={type}
                link_url={link_url + `?onShip=false`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partner;
