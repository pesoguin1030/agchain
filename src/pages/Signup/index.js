import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import validator from "validator";

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
  const [isSignupInProgress, setIsSignupInProgress] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
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

    try {
      const response = await axios.post(
        `http://localhost:4000/users/signup`,
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
        console.log("Hii");
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
                    className="form-control form-control-lg"
                    name="name"
                    id="signupName"
                    tabIndex="1"
                    placeholder=""
                    aria-label=""
                    required
                    data-msg="請輸入正確的名字"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
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
                </div>
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
            <div className="text-center">
              <small className="text-cap mb-4">
                Trusted by the world&apos;s best teams
              </small>
              <div className="w-85 mx-auto">
                <div className="row justify-content-between">
                  <div className="col">
                    <img
                      className="img-fluid"
                      src="/assets/svg/brands/gitlab-gray.svg"
                    />
                  </div>
                  <div className="col">
                    <img
                      className="img-fluid"
                      src="/assets/svg/brands/fitbit-gray.svg"
                    />
                  </div>
                  <div className="col">
                    <img
                      className="img-fluid"
                      src="/assets/svg/brands/flow-xo-gray.svg"
                    />
                  </div>
                  <div className="col">
                    <img
                      className="img-fluid"
                      src="/assets/svg/brands/layar-gray.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
