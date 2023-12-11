import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validator from "validator";
import request from "../../utils/request";
import { createDestination } from "../../api/destination";
import Constants from "../../api/constants";
// import "../../themes/sign.css"

function Signup(props) {
  const [name, setName] = useState("");
  const [nameStatus, setNameStatus] = useState("basic");
  const [nameMessage, setNameMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("basic");
  const [emailMessage, setEmailMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("basic");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [countyStatus, setCountyStatus] = useState("basic");
  const [countyMessage, setCountyMessage] = useState(null);
  const [addressStatus, setAddressStatus] = useState("basic");
  const [addressMessage, setAddressMessage] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [roleid, setroleid] = useState(1);
  const [store, setstore] = useState("");
  const [storeStatus, setstoreStatus] = useState("basic");
  const [storeMesssage, setstoreMesssage] = useState(null);
  const [storedescription, setstoredesription] = useState("");
  const [storedescriptionStatus, setstoredescriptionStatus] = useState("basic");
  const [storedescriptionMessage, setstoredescriptionMessage] =
    useState("null");
  const [brand, setbrand] = useState("");
  const [brandStatus, setbrandStatus] = useState("basic");
  const [brandMessage, setbrandMessage] = useState(null);
  // const [consumerButtonDisabled, setconsumerButtonDisabled] = useState(false);
  // const [enterButtonDisabled, setenterButtonDisabled] = useState(false);

  useEffect(() => {
    var button = document.getElementById("consumer-tab");
    button.click();
  }, []);

  const [countys, setCountys] = useState([
    { text: "基隆市" },
    { text: "台北市" },
    { text: "新北市" },
    { text: "桃園市" },
    { text: "新竹市" },
    { text: "新竹縣" },
    { text: "苗栗縣" },
    { text: "台中市" },
    { text: "彰化縣" },
    { text: "南投縣" },
    { text: "雲林縣" },
    { text: "嘉義市" },
    { text: "嘉義縣" },
    { text: "台南市" },
    { text: "高雄市" },
    { text: "屏東縣" },
    { text: "台東縣" },
    { text: "花蓮縣" },
    { text: "宜蘭縣" },
    { text: "澎湖縣" },
    { text: "金門縣" },
    { text: "連江縣" },
  ]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setroleid(event.target.value);
    // console.log("role",roleid);
  };

  async function userSignup() {
    if (name.length > 32 || name.length < 2) {
      setNameStatus("danger");
      setNameMessage("名字長度不符，請使用2到32個字元");
      return;
    } else {
      setNameStatus("success");
      setNameMessage(null);
    }
    if (!validator.isEmail(email) || email.length > 32) {
      setEmailStatus("danger");
      setEmailMessage("電子郵件格式不符");
      return;
    } else {
      setEmailStatus("success");
      setEmailMessage(null);
    }
    if (password.length < 8 || password.length > 32) {
      setPasswordStatus("danger");
      setPasswordMessage("密碼長度不符，請使用8到32個字元");
      return;
    } else {
      setPasswordStatus("success");
      setPasswordMessage(null);
    }
    // const coordinates = { latitude: 24.8527315, longitude: 121.0842217 };
    // const address = selectedCounty + selectedAddress;
    // await createDestination(address, coordinates);

    try {
      const response = await request.post(
        `/users/signup`,
        {
          name: name,
          email: email,
          password: password,
          role: "1",
          store: store,
          description: storedescription,
          brand: brand,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store",
          },
        }
      );

      console.log(response);
      const { data } = response;
      if (data === "success") {
        setIsSignup(true);
        alert("註冊成功");
        //navigation.navigate('Login');
      } else {
        alert("發生錯誤");
        return;
      }
    } catch (error) {
      alert(error.response.data);
      return;
    }
  }

  async function EenterpriseSignup() {
    if (name.length > 32 || name.length < 2) {
      setNameStatus("danger");
      setNameMessage("名字長度不符，請使用2到32個字元");

      return;
    } else {
      setNameStatus("success");
      setNameMessage(null);
    }
    if (!validator.isEmail(email) || email.length > 32) {
      setEmailStatus("danger");
      setEmailMessage("電子郵件格式不符");

      return;
    } else {
      setEmailStatus("success");
      setEmailMessage(null);
    }
    if (password.length < 8 || password.length > 32) {
      setPasswordStatus("danger");
      setPasswordMessage("密碼長度不符，請使用8到32個字元");

      return;
    } else {
      setPasswordStatus("success");
      setPasswordMessage(null);
    }

    if (store.length > 32) {
      setstoreStatus("danger");
      setstoreMesssage("商店名稱長度不符，請使用小於32個字元");

      return;
    } else {
      setstoreStatus("success");
      setstoreMesssage(null);
    }

    if (storedescription.length > 32) {
      setstoredescriptionStatus("danger");
      setstoredescriptionMessage("商店描述長度不符，請使用小於到32個字元");

      return;
    } else {
      setstoredescriptionStatus("success");
      setstoredescriptionMessage(null);
    }

    if (brand.length > 32) {
      setbrandStatus("danger");
      setbrandMessage("品牌描述長度不符，請使用小於32個字元");

      return;
    } else {
      setbrandStatus("success");
      setbrandMessage(null);
    }

    // const coordinates = { latitude: 24.8527315, longitude: 121.0842217 };
    // const address = selectedCounty + selectedAddress;
    // await createDestination(address, coordinates);
    try {
      const response = await request.post(
        `/users/signup`,
        {
          name: name,
          email: email,
          password: password,
          role: "2",
          store: store,
          description: storedescription,
          brand: brand,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store",
          },
        }
      );

      console.log(response);
      const { data } = response;
      if (data === "success") {
        setIsSignup(true);
        alert("註冊成功");
        //navigation.navigate('Login');
      } else {
        alert("發生錯誤");
        return;
      }
    } catch (error) {
      alert(error.response.data);
      return;
    }
  }

  return isSignup ? (
    <Redirect to="/login" />
  ) : (
    <main id="content" role="main" className="main">
      <div
        className="position-fixed top-0 right-0 left-0 bg-img-hero"
        style={{
          height: "32rem",
          backgroundImage: `url(./assets/svg/components/abstract-bg-4.svg)`,
        }}
      ></div>
      <div className="container py-5 py-sm-7">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mb-5">
              <div className="card-body">
                <div className="text-center">
                  <div className="mb-5">
                    <ul
                      className="nav nav-pills nav-fill"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="consumer-tab"
                          data-toggle="tab"
                          href="#consumer"
                          role="tab"
                          aria-controls="One"
                          aria-selected="true"
                        >
                          消費者
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="enterprise-tab"
                          data-toggle="tab"
                          href="#enterprise"
                          role="tab"
                          aria-controls="Two"
                          aria-selected="false"
                        >
                          企業
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane fade in active"
                        id="consumer"
                      >
                        <h1 className="display-4">註冊</h1>
                        {/* <a className="btn btn-lg btn-block btn-white mb-4" href="#">
                    <span className="d-flex justify-content-center align-items-center">
                      <img
                        className="avatar avatar-xss mr-2"
                        src="./assets/svg/brands/google.svg"
                      />
                      Sign up with Google
                    </span>
                  </a> */}
                        {/* <span className="divider text-muted mb-4">OR</span> */}
                        <div className="js-form-message form-group">
                          <label className="input-label text-left" htmlFor="">
                            名字
                          </label>
                          <input
                            type="name"
                            className="form-control form-control-lg "
                            name="name"
                            id="signupName"
                            tabIndex="1"
                            placeholder=""
                            aria-label=""
                            required
                            status={nameStatus}
                            caption={nameMessage}
                            data-msg="請輸入正確的名字"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                          {nameStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {nameMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="js-form-message form-group">
                          <label
                            className="input-label text-left"
                            htmlFor="signinSrEmail"
                          >
                            你的信箱
                          </label>

                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            id="signinSrEmail"
                            tabIndex="1"
                            placeholder="email@address.com"
                            aria-label="email@address.com"
                            required
                            data-msg="Please enter a valid email address."
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          {emailStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {emailMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="js-form-message form-group">
                          <label
                            className="input-label"
                            htmlFor="signupSrPassword"
                            tabIndex="0"
                          >
                            <span className="d-flex justify-content-between align-items-center">
                              密碼
                              <a
                                className="input-label-secondary"
                                href="authentication-reset-password-basic.html"
                              >
                                忘記密碼
                              </a>
                            </span>
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              className="js-toggle-password form-control form-control-lg"
                              name="password"
                              id="signupSrPassword"
                              placeholder="需要8+ 個字元"
                              aria-label="需要8+ 個字元"
                              required
                              data-msg="Your password is invalid. Please try again."
                              data-hs-toggle-password-options='{
                                 "target": "#changePassTarget",
                                 "defaultClass": "tio-hidden-outlined",
                                 "showClass": "tio-visible-outlined",
                                 "classChangeTarget": "#changePassIcon"
                               }'
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            <div
                              id="changePassTarget"
                              className="input-group-append"
                            >
                              <a className="input-group-text" href="">
                                <i
                                  id="changePassIcon"
                                  className="tio-visible-outlined"
                                />
                              </a>
                            </div>
                          </div>
                          {passwordStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {passwordMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <button
                          className="btn btn-lg btn-block btn-primary"
                          onClick={userSignup}
                        >
                          註冊
                        </button>
                      </div>

                      <div
                        role="tabpanel"
                        className="tab-pane fade"
                        id="enterprise"
                      >
                        <h1 className="display-4">註冊</h1>
                        {/* <a className="btn btn-lg btn-block btn-white mb-4" href="#">
                    <span className="d-flex justify-content-center align-items-center">
                      <img
                        className="avatar avatar-xss mr-2"
                        src="./assets/svg/brands/google.svg"
                      />
                      Sign up with Google
                    </span>
                  </a> */}
                        {/* <span className="divider text-muted mb-4">OR</span> */}
                        <div className="js-form-message form-group">
                          <label className="input-label text-left" htmlFor="">
                            名字
                          </label>
                          <input
                            type="name"
                            className="form-control form-control-lg "
                            name="name"
                            id="signupName"
                            tabIndex="1"
                            placeholder=""
                            aria-label=""
                            required
                            status={nameStatus}
                            caption={nameMessage}
                            data-msg="請輸入正確的名字"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                          {nameStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {nameMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="js-form-message form-group">
                          <label
                            className="input-label text-left"
                            htmlFor="signinSrEmail"
                          >
                            你的信箱
                          </label>

                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            id="signinSrEmail"
                            tabIndex="1"
                            placeholder="email@address.com"
                            aria-label="email@address.com"
                            required
                            data-msg="Please enter a valid email address."
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          {emailStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {emailMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="js-form-message form-group">
                          <label
                            className="input-label"
                            htmlFor="signupSrPassword"
                            tabIndex="0"
                          >
                            <span className="d-flex justify-content-between align-items-center">
                              密碼
                              <a
                                className="input-label-secondary"
                                href="authentication-reset-password-basic.html"
                              >
                                忘記密碼
                              </a>
                            </span>
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              className="js-toggle-password form-control form-control-lg"
                              name="password"
                              id="signupSrPassword"
                              placeholder="需要8+ 個字元"
                              aria-label="需要8+ 個字元"
                              required
                              data-msg="Your password is invalid. Please try again."
                              data-hs-toggle-password-options='{
                                 "target": "#changePassTarget",
                                 "defaultClass": "tio-hidden-outlined",
                                 "showClass": "tio-visible-outlined",
                                 "classChangeTarget": "#changePassIcon"
                               }'
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            <div
                              id="changePassTarget"
                              className="input-group-append"
                            >
                              <a className="input-group-text" href="">
                                <i
                                  id="changePassIcon"
                                  className="tio-visible-outlined"
                                />
                              </a>
                            </div>
                          </div>
                          {passwordStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {passwordMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="js-form-message form-group">
                          <label
                            className="input-label text-left"
                            htmlFor="storename"
                          >
                            商店名稱
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="store"
                            id="storenmae"
                            tabIndex="1"
                            placeholder="三光米"
                            aria-label="三光米"
                            required
                            status={storeStatus}
                            caption={storeMesssage}
                            data-msg="Please enter a store name."
                            onChange={(e) => {
                              setstore(e.target.value);
                            }}
                          />
                          {storeStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {storeMesssage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <label
                            className="input-label text-left"
                            htmlFor="storedescription"
                          >
                            描述
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="description"
                            id="storedescription"
                            tabIndex="1"
                            placeholder="好米好實在"
                            aria-label="好米好實在"
                            required
                            status={storedescriptionStatus}
                            caption={storedescriptionMessage}
                            data-msg="Please enter a description."
                            onChange={(e) => {
                              setstoredesription(e.target.value);
                            }}
                          />
                          {storedescriptionStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {storedescriptionMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <label
                            className="input-label text-left"
                            htmlFor="storebrand"
                          >
                            品牌
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="brand"
                            id="storebrand"
                            tabIndex="1"
                            placeholder="......."
                            aria-label="........"
                            required
                            status={brandStatus}
                            caption={brandMessage}
                            data-msg="Please enter a store brand."
                            onChange={(e) => {
                              setbrand(e.target.value);
                            }}
                          />
                          {brandStatus === "danger" ? (
                            <div>
                              <small id="name" className="text-danger">
                                {brandMessage}
                              </small>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <button
                          className="btn btn-lg btn-block btn-primary"
                          onClick={EenterpriseSignup}
                        >
                          註冊
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="js-form-message form-group">
                  <label className="input-label" htmlFor="address" tabIndex="0">
                    居住地
                  </label>
                  <select
                    style={{ flex: 1 }}
                    placeholder="請選擇縣市"
                    className="custom-select"
                    onChange={(e) => {
                      setSelectedCounty(e.target.value);
                    }}
                  >
                    <option>請選擇縣市</option>
                    {countys.map((county) => {
                      return <option value={county.text}>{county.text}</option>;
                    })}
                  </select>
                  {countyStatus === "danger" ? (
                    <div>
                      <small id="name" className="text-danger">
                        {countyMessage}
                      </small>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <input
                    type="text"
                    className=" form-control form-control-lg mt-5"
                    name="address"
                    placeholder="東區光復路二段101號"
                    onChange={(e) => {
                      setSelectedAddress(e.target.value);
                    }}
                  ></input>
                  {addressStatus === "danger" ? (
                    <div>
                      <small id="name" className="text-danger">
                        {addressMessage}
                      </small>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
