import React from "react";
import * as firebase from "firebase";

function Login(props) {
  const googleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(result);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <main id="content" role="main" class="main">
      <div class="container py-5 py-sm-7">
        <a class="d-flex justify-content-center mb-5" href="index.html">
          <img class="z-index-2" src="logo.png" style={{ width: "8rem" }} />
        </a>

        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="card card-lg mb-5">
              <div class="card-body">
                <form class="js-validate">
                  <div class="text-center">
                    <div class="mb-5">
                      <h1 class="h3">會員登入</h1>
                      <p>
                        還沒有帳號？{" "}
                        <a href="authentication-signup-basic.html">註冊</a>
                      </p>
                    </div>

                    <a
                      class="btn btn-block btn-white mb-4"
                      onClick={googleSignIn}
                    >
                      <span class="d-flex justify-content-center align-items-center">
                        <img
                          class="avatar avatar-xss mr-2"
                          src="./assets/svg/brands/google.svg"
                          alt="Image Description"
                        />
                        Sign in with Google
                      </span>
                    </a>

                    <span class="divider text-muted mb-4">或是</span>
                  </div>
                  <div class="js-form-message form-group">
                    <label class="input-label" for="signinSrEmail">
                      電子信箱
                    </label>

                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="signinSrEmail"
                      tabindex="1"
                      placeholder="email@address.com"
                      aria-label="email@address.com"
                      required
                      data-msg="Please enter a valid email address."
                    />
                  </div>
                  <div class="js-form-message form-group">
                    <label
                      class="input-label"
                      for="signupSrPassword"
                      tabindex="0"
                    >
                      <span class="d-flex justify-content-between align-items-center">
                        密碼
                        <a
                          class="input-label-secondary"
                          href="authentication-reset-password-basic.html"
                        >
                          忘記密碼?
                        </a>
                      </span>
                    </label>

                    <div class="input-group input-group-merge">
                      <input
                        type="password"
                        class="js-toggle-password form-control"
                        name="password"
                        id="signupSrPassword"
                        placeholder="8+ characters required"
                        aria-label="8+ characters required"
                        required
                        data-msg="Your password is invalid. Please try again."
                        data-hs-toggle-password-options='{
                             "target": "#changePassTarget",
                             "defaultClass": "tio-hidden-outlined",
                             "showClass": "tio-visible-outlined",
                             "classChangeTarget": "#changePassIcon"
                           }'
                      />
                      <div id="changePassTarget" class="input-group-append">
                        <a class="input-group-text">
                          <i
                            id="changePassIcon"
                            class="tio-visible-outlined"
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="termsCheckbox"
                        name="termsCheckbox"
                      />
                      <label
                        class="custom-control-label font-size-sm text-muted"
                        for="termsCheckbox"
                      >
                        {" "}
                        記住帳號
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-block btn-primary">
                    登入
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;