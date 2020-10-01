import React from "react";

function Signup(props) {
  return (
    <main id="content" role="main" className="main">
      <div
        className="position-fixed top-0 right-0 left-0 bg-img-hero"
        style="height: 32rem; background-image: url(./assets/svg/components/abstract-bg-4.svg);"
      >
        <figure className="position-absolute right-0 bottom-0 left-0">
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1921 273"
          >
            <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
          </svg>
        </figure>
      </div>
      <div className="container py-5 py-sm-7">
        <a className="d-flex justify-content-center mb-5" href="index.html">
          <img
            className="z-index-2"
            src="./assets/svg/logos/logo.svg"
            alt="Image Description"
            style="width: 8rem;"
          />
        </a>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mb-5">
              <div className="card-body">
                <form className="js-validate">
                  <div className="text-center">
                    <div className="mb-5">
                      <h1 className="display-4">Sign in</h1>
                      <p>
                        Don&apos;t have an account yet?
                        <a href="authentication-signup-basic.html">
                          Sign up here
                        </a>
                      </p>
                    </div>
                    <a className="btn btn-lg btn-block btn-white mb-4" href="#">
                      <span className="d-flex justify-content-center align-items-center">
                        <img
                          className="avatar avatar-xss mr-2"
                          src="./assets/svg/brands/google.svg"
                        />
                        Sign in with Google
                      </span>
                    </a>
                    <span className="divider text-muted mb-4">OR</span>
                  </div>
                  <div className="js-form-message form-group">
                    <label className="input-label" htmlFor="signinSrEmail">
                      Your email
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
                    />
                  </div>
                  <div className="js-form-message form-group">
                    <label
                      className="input-label"
                      htmlFor="signupSrPassword"
                      tabIndex="0"
                    >
                      <span className="d-flex justify-content-between align-items-center">
                        Password
                        <a
                          className="input-label-secondary"
                          href="authentication-reset-password-basic.html"
                        >
                          Forgot Password?
                        </a>
                      </span>
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        className="js-toggle-password form-control form-control-lg"
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
                      <div id="changePassTarget" className="input-group-append">
                        <a className="input-group-text" href="javascript:;">
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
                        {" "}
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn-primary"
                  >
                    Sign in
                  </button>
                </form>
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
