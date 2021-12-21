import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validator from "validator";
import request from "../../utils/request";
import { createDestination } from "../../api/destination";

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
  const [isSignupInProgress, setIsSignupInProgress] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

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

  async function handleSignup() {
    setIsSignupInProgress(true);
    if (name.length > 32 || name.length < 2) {
      setNameStatus("danger");
      setNameMessage("名字長度不符，請使用2到32個字元");
      setIsSignupInProgress(false);
      return;
    } else {
      setNameStatus("success");
      setNameMessage(null);
    }
    if (!validator.isEmail(email) || email.length > 32) {
      setEmailStatus("danger");
      setEmailMessage("電子郵件格式不符");
      setIsSignupInProgress(false);
      return;
    } else {
      setEmailStatus("success");
      setEmailMessage(null);
    }
    if (password.length < 8 || password.length > 32) {
      setPasswordStatus("danger");
      setPasswordMessage("密碼長度不符，請使用8到32個字元");
      setIsSignupInProgress(false);
      return;
    } else {
      setPasswordStatus("success");
      setPasswordMessage(null);
    }

    // if (selectedCounty === "") {
    //   setCountyStatus("danger");
    //   setCountyMessage("請選擇縣市");
    //   setIsSignupInProgress(false);
    // } else {
    //   setCountyStatus("success");
    //   setCountyMessage(null);
    // }
    // if (selectedAddress === "") {
    //   setAddressStatus("danger");
    //   setAddressMessage("請填寫住址");
    //   setIsSignupInProgress(false);
    // } else {
    //   setAddressStatus("success");
    //   setAddressMessage(null);
    // }
    const coordinates = { latitude: 24.8527315, longitude: 121.0842217 };
    const address = selectedCounty + selectedAddress;
    await createDestination(address, coordinates);
    if (isSignupInProgress) {
      try {
        const response = await request.post(
          `/users/signup`,
          {
            name: name,
            email: email,
            password: password,
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
          //navigation.navigate('Login');
        } else {
          alert("發生錯誤");
          setIsSignupInProgress(false);
        }
      } catch (error) {
        alert(error.response.data);
        setIsSignupInProgress(false);
        return false;
      }
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
                    <h1 className="display-4">註冊</h1>
                  </div>
                  <a className="btn btn-lg btn-block btn-white mb-4" href="#">
                    <span className="d-flex justify-content-center align-items-center">
                      <img
                        className="avatar avatar-xss mr-2"
                        src="./assets/svg/brands/google.svg"
                      />
                      Sign up with Google
                    </span>
                  </a>
                  <span className="divider text-muted mb-4">OR</span>
                </div>
                <div className="js-form-message form-group">
                  <label className="input-label" htmlFor="">
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
                      <small id="name" class="text-danger">
                        {nameMessage}
                      </small>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="js-form-message form-group">
                  <label className="input-label" htmlFor="signinSrEmail">
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
                      <small id="name" class="text-danger">
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

                    <div id="changePassTarget" className="input-group-append">
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
                      <small id="name" class="text-danger">
                        {passwordMessage}
                      </small>
                    </div>
                  ) : (
                    <div></div>
                  )}
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
                      <small id="name" class="text-danger">
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
                      <small id="name" class="text-danger">
                        {addressMessage}
                      </small>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div> */}

                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                    <label
                      className="custom-control-label font-size-sm text-muted"
                      htmlFor="termsCheckbox"
                    >
                      記得我
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-lg btn-block btn-primary"
                  onClick={handleSignup}
                >
                  註冊
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
