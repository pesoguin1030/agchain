import React, { useEffect, useRef, useState } from "react";

import { getTraceData, sendPressLike } from "../../api/package";
import { useParams, Redirect } from "react-router-dom";

import Slideshow from "../../components/Slideshow";
import { FarmInfo } from "../../api/product";

function Test(props) {
  const { traceID } = useParams(); // main KEY in url
  const [farmIntro, setFarmIntro] = useState([]); // 農場介紹
  const [farmPic, setFarmPic] = useState([]); // 農場照片(1~3張?)
  const [secureItem, setSecureItem] = useState(null); // 出貨前照片
  const [organicCerftificates, setOrganicCertificates] = useState([]); // 檢驗證書
  const [isForbidden, setIsForbidden] = useState(false);
  const [cropName, setCropName] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);

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

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    console.log(Object.values(objs));
    return Object.values(objs);
  }

  async function setupRequiredInformation(traceID) {
    let {
      crop_id,
      crop_name,
      farm_id,
      photo_url,
      farm_intro,
      certificate_filename_arr,
      order_number,
    } = await getTraceData(traceID);

    // 送禮影片
    setOrderNumber(order_number);

    console.log(farm_intro);
    console.log(farm_intro.farm_picture);
    console.log(farm_intro.farm_picture2);
    console.log(farm_intro.farm_picture3);
    setFarmIntro(farm_intro);
    setFarmPic(getPropertyByRegex(farm_intro, "farm_picture|[1-9]"));
    console.log(Array.from(farmPic));
    setCropName(crop_name);
  }

  return farmPic ? (
    // <Slideshow src_arr={farmPic}/>
    <Slideshow
      src_arr={[
        farmIntro.farm_picture,
        farmIntro.farm_picture2,
        farmIntro.farm_picture3,
      ]}
    />
  ) : (
    // <Slideshow src_arr={[farmIntro.farm_picture, farmIntro.farm_picture2, farmIntro.farm_picture3]}/>
    <Redirect to="/404" />
  );
}

export default Test;
