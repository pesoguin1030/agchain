import React from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { AuthContext, CartContext } from "../../appContext";
import { useEffect, useState, useContext } from "react";
import { getAllShippingInfo } from "../../api/order";
import { CertificateCard } from "../../components/Card";

import Radarchart from "../../../src/components/RadarChart";
import TimeLine from "../../../src/components/TimeLine";
import Slideshow from "../../components/Slideshow";

import { ProductDetail, FarmInfo } from "../../api/product";
import { getCultivationRecord } from "../../api/cultivationRecord";
import { getCertificates } from "../../api/farm";
import {
  fetchOrganicCertificate,
  fetchSecureItem,
  fetchSensorAnalysis,
} from "../../api/ethereum";

function SingleProduct() {
  const { id } = useParams(); // main KEY in url
  const { cartState, cartDispatch } = useContext(CartContext);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [carbonAmount,setCarbonAmount] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [description, setDescription] = useState();
  const [farmName, setFarmName] = useState();
  const [farmId, setFarmId] = useState();
  const [farmIntro, setFarmIntro] = useState("");
  const [farmAddress, setFarmAddress] = useState();
  const [farmPhone, setFarmPhone] = useState();
  const [farmPic, setFarmPic] = useState([]);
  const [farmfee, setFarmFee] = useState([]);
  const [cropName, setCropName] = useState("");
  const [IntID, setIntID] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [copyCartState, setCopyCartState] = useState([]);
  const [cultivationRecord, setCultivationRecord] = useState([]); // 田間紀錄
  const [sensorAnalysis, setSensorAnalysis] = useState([]); // 種植數據
  const [organicCertificates, setOrganicCertificates] = useState([]); // 檢驗證書

  useEffect(() => {
    setIntID(parseInt(id, 10));

    return () => {};
  }, []);
  useEffect(() => {
    PreLoadData();
    return () => {};
  }, [cartState]);

  async function PreLoadData() {
    const data = await ProductDetail(id);
    console.log(data);
    const farm_data = await FarmInfo(id);
    // console.log(farm_data);
    const shippinginfo = await getAllShippingInfo([
      farm_data["farm_id"].toString(),
    ]);
    const farm_fee = [
      shippinginfo[0]["same_city"],
      shippinginfo[0]["different_city"],
      shippinginfo[0]["remote_city"],
    ];
    setFarmFee(farm_fee);
    setName(data["name"]);
    setPrice(data["price"]);
    setCarbonAmount(data["carbon_amount"]);
    setImgUrl(data["photo_url"]);
    setDescription(data["description"]);
    setCropName(data["crop_name"]);
    //farm data
    setFarmName("農場資訊");
    setFarmId(farm_data["farm_id"]);
    setFarmIntro(farm_data["farm_intro"]);
    setFarmAddress(farm_data["farm_address"]);
    setFarmPhone(farm_data["farm_phone"]);
    // setFarmPic(getPropertyByRegex(farm_data, "farm_picture|[1-9]"));
    if (cartState !== null) {
      console.log(IntID);
      cartState.map((e) => console.log(typeof e.id));
    }
    // console.log(
    //   "==",
    //   cartState ? cartState.map((e) => e.id).includes(IntID) : false
    // );
    // setIsInCart(cartState ? cartState.map((e) => e.id).includes(IntID) : false);
    //
    // let crop_id = data["crop_id"];
    //
    // // 田間紀錄
    // let response = await getCultivationRecord(crop_id);
    // setCultivationRecord(response);
    //
    // // 數據分析雷達圖
    // // response = await fetchSensorAnalysis(crop_id);
    // if (crop_id == 282) response = await fetchSensorAnalysis(275);
    // else response = await fetchSensorAnalysis(crop_id);
    // setSensorAnalysis(response);
    //
    // // 有機檢驗證書
    // response = await getCertificates(farm_data["farm_id"]);
    // setOrganicCertificates(response);
  }

  // function getPropertyByRegex(obj, propName) {
  //   var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
  //     key;
  //   var objs = [];
  //   for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
  //   console.log(objs);
  //
  //   return objs;
  // }

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-lg-7 mb-7 mb-lg-0 pr-lg-4">
          <div className="position-relative">
            <div className="js-slide">
              <img
                className="img-fluid w-100 rounded"
                src={imgUrl}
                alt="Image Description"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex align-items-center small mb-2">
            <div className="text-warning mr-2">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
          <div className="mb-5">
            <h1 className="h2">{name}</h1>
            <p>{description}</p>
          </div>

          <div className="mb-5">
            <h2 className="font-size-1 text-body mb-0">價格:</h2>
            <span className="text-dark font-size-2 font-weight-bold">{'$ ' + price}</span>
          </div>
          <div className="mb-5">
            <h2 className="font-size-1 text-body mb-0">可獲點數:</h2>
            <span className="text-dark font-size-2 font-weight-bold">{carbonAmount +' 點'}</span>
          </div>

          <div id="shopCartAccordion" className="accordion mb-4 mx-auto">
            <div className="card border shadow-none">
              <div className="card-body card-collapse" id="shopCardHeadingOne">
                <a
                  className="btn btn-link btn-block card-btn collapsed"
                  href="#"
                  role="button"
                  data-toggle="collapse"
                  data-target="#shopCardOne"
                  aria-expanded="false"
                  aria-controls="shopCardOne"
                >
                  <span className="span_row align-items-center">
                    <span className="col-9">
                      <span className="media align-items-center">
                        <span className="w-100 max-w-6rem mr-3">
                          <img
                            className="img-fluid"
                            src="../../assets/svg/icons/icon-65.svg"
                            alt="SVG"
                          />
                        </span>
                        <span className="media-body">
                          <span className="d-block font-size-1 font-weight-bold">
                            運費
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div
                id="shopCardOne"
                className="collapse"
                aria-labelledby="shopCardHeadingOne"
                data-parent="#shopCartAccordion"
              >
                <div className="card-body">
                  <p className=" mb-0">農場位於{farmAddress} 運費如下：</p>
                  <ul>
                    <li>同縣市&emsp;：{farmfee[0]}元</li>
                    <li>不同縣市：{farmfee[1]}元</li>
                    <li>離島地區：{farmfee[2]}元</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border shadow-none">
              <div className="card-body card-collapse" id="shopCardHeadingTwo">
                <a
                  className="btn btn-link btn-block card-btn collapsed"
                  href="#"
                  role="button"
                  data-toggle="collapse"
                  data-target="#shopCardTwo"
                  aria-expanded="false"
                  aria-controls="shopCardTwo"
                >
                  <span className="row align-items-center">
                    <span className="col-9">
                      <span className="media align-items-center">
                        <span className="w-100 max-w-6rem mr-3">
                          <img
                            className="img-fluid"
                            src="../../assets/svg/icons/icon-64.svg"
                            alt="SVG"
                          />
                        </span>
                        <span className="media-body">
                          <span className="d-block font-size-1 font-weight-bold">
                            關於退換貨
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className="col-3 text-right">
                      <span className="card-btn-toggle">
                        <span className="card-btn-toggle-default"></span>
                        <span className="card-btn-toggle-active">收回</span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div
                id="shopCardTwo"
                className="collapse"
                aria-labelledby="shopCardHeadingTwo"
                data-parent="#shopCartAccordion"
              >
                <div className="card-body">
                  <p className="small mb-0">
                    生鮮蔬菜水果類商品類符合「通訊交易解除權合理例外情事適用準則」第二條第一項(易於腐敗、保存期限較短或解約時即將逾期之商品)，
                    將排除7日解除權時，不再適用消費者保護法（以下簡稱消保法）第19條規定之7日解除權。因此不受理商品退貨，請確定生鮮蔬菜水果類商品是您需要的商品再進行下單
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            {/* <button
              type="button"
              className="btn btn-block btn-primary btn-pill transition-3d-hover"
              disabled={isInCart}
              onClick={() => {
                AddToCart();
              }}
            >
              新增至購物車
            </button> */}
            {isInCart ? (
              // <button
              //   type="button"
              // onClick={() => {
              //   cartDispatch((prev) => prev.filter((e) => e.id !== id));
              //   setIsInCart(false);
              // }}
              // className="btn btn-block btn-outline-secondary btn-pill transition-3d-hover"
              // >
              <Link
                to="/shop/cart"
                className="btn btn-block btn-primary btn-block btn-pill transition-3d-hover"
              >
                前往結帳
              </Link>
            ) : (
              // </button>
              <button
                type="button"
                onClick={() => {
                  cartDispatch((prev) => [
                    ...prev,
                    { id: IntID, name, price ,carbon_amount:carbonAmount, img: imgUrl },
                  ]);
                  setIsInCart(true);
                }}
                className="btn btn-block btn-outline-primary btn-pill transition-3d-hover"
              >
                加入購物車
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container space-1 space-lg-2">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          {/*<h2>農場資訊</h2>*/}
          <h2>商店資訊</h2>
        </div>
        <div className="w-md-80 w-lg-60 text-center mx-md-auto mb-5 mb-md-9">
          <Slideshow src_arr={[farmPic[0], farmPic[1], farmPic[2]]} />
          {/* <Slideshow src_arr={farmPic} /> */}
        </div>

        <div className="w-md-80 w-lg-60 text-center mx-md-auto mb-5 mb-md-9">
          <p style={{ letterSpacing: "0.2rem" }}>{farmIntro}</p>
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
                href={`http://maps.google.com/?q=${farmAddress}`}
                className="mx-2"
              >
                {farmAddress?farmAddress:'XXXXXXXXXX'}
              </a>
            </li>
            <li className="mt-1">
              <i className="fas fa-phone" style={{ width: 18 }}></i>
              <a target="_blank" href={`tel:${farmPhone}`} className="mx-2">
                {farmPhone?farmPhone:'0900000000'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*<div className="container space-2 space-lg-3">*/}
      {/*  <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9 ">*/}
      {/*    <h2>種植數據</h2>*/}
      {/*  </div>*/}
      {/*  <div className="row mx-n2 mx-sm-n3 mb-3">*/}
      {/*    <div className="col-12">*/}
      {/*      /!*<Radarchart data={sensorAnalysis} cropName={cropName} />*!/*/}
      {/*      /!* <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9 ">*/}
      {/*        <p>無權限瀏覽</p>*/}
      {/*      </div> *!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="container space-1">*/}
      {/*  <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">*/}
      {/*    <h2>田間紀錄</h2>*/}
      {/*  </div>*/}
      {/*  <div className="row w-md-80 w-lg-70 mx-md-auto px-5">*/}
      {/*    {cultivationRecord && cultivationRecord.length !== 0 ? (*/}
      {/*      <div className="col-12 px-auto">*/}
      {/*        <div*/}
      {/*          id="style-2"*/}
      {/*          style={{ overflow: "hidden scroll", height: "480px" }}*/}
      {/*        >*/}
      {/*          <TimeLine items={cultivationRecord} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div className="col-12 text-center">*/}
      {/*        <p>無相關田間紀錄</p>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  {farmId === 59 ? (*/}
      {/*    <div className="w-md-80 w-lg-60 text-right mx-md-auto mb-5 mb-md-9 space-2">*/}
      {/*      <p>*/}
      {/*        參考資料： <a href="/3lightrice-sop">台農82號水稻標準作業模式</a>*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  ) : null}*/}
      {/*</div>*/}

      {/*{farmId === 59 || farmId === 68 ? (*/}
      {/*  <div className="container space-1">*/}
      {/*    <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">*/}
      {/*      <h2>檢驗證書</h2>*/}
      {/*    </div>*/}
      {/*    <div className="container text-center h-100 row">*/}
      {/*      {organicCertificates.length > 0 ? (*/}
      {/*        organicCertificates.map((e, index) => {*/}
      {/*          return (*/}
      {/*            <CertificateCard*/}
      {/*              idx={index}*/}
      {/*              img={e.filename}*/}
      {/*              title={e.title}*/}
      {/*            />*/}
      {/*          );*/}
      {/*        })*/}
      {/*      ) : (*/}
      {/*        <div className="col-12 text-center">*/}
      {/*          <p>無相關證書</p>*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : null}*/}
    </div>
  );
}

export default SingleProduct;
