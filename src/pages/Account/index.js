import React, { useState, useContext, useEffect } from "react";
import { AuthContext, CartContext } from "../../appContext";
import axios from "axios";
import storage from "../../utils/storage";

import validator from "validator";

// TODO: 修改所有javascript:;

function AccountInfo(props) {
  const { authState, authDispatch } = useContext(AuthContext);
  // console.log(authState.user);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);

  const [emailError, setEmailError] = useState(false);

  // useEffect(()=>{
  // console.log("name: "+name);
  // console.log("email: "+email);
  // TODO: 在server再檢查?
  // if(name===null && authState.user!==null) setName(authState.user.name)
  // if(email===null && authState.user!==null) setEmail(authState.user.email)
  // },[name, email])

  async function changePersonalInfo(flag) {
    if (flag) {
      console.log("changePersonalInfo");
      console.log("name: " + name);
      console.log("email: " + email);
      console.log("gender: " + gender);
      console.log("phone: " + phone);

      const userToken = storage.getAccessToken();
      console.log(userToken);

      try {
        const response = await axios.post(
          `http://localhost:4000/users/updateInfo`,
          {
            name: name,
            email: email,
            phone: phone,
            gender: gender,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Cache-Control": "no-cache, no-store",
            },
          }
        );
        console.log(response);
        if (response.data == "OK") alert("update successfully!");
      } catch (error) {
        alert(error.response.data);
        return false;
      }
    } else {
      console.log("X change~");
      window.location.reload();
    }
  }

  return (
    <div>
      <div
        class="bg-navy"
        style={{
          backgroundImage: `url(/assets/svg/components/abstract-shapes-20.svg)`,
        }}
      >
        <div class="container space-1 space-top-lg-2 space-bottom-lg-3">
          <div class="row align-items-center">
            <div class="col">
              <div class="d-none d-lg-block">
                <h1 className="h2 text-white">帳戶資訊</h1>
              </div>

              {/* Breadcrumb */}
              <ol class="breadcrumb breadcrumb-light breadcrumb-no-gutter mb-0">
                <li class="breadcrumb-item">帳戶</li>
                <li class="breadcrumb-item active" aria-current="page">
                  個人資訊
                </li>
              </ol>
            </div>

            <div class="col-auto">
              {/* <div class="d-none d-lg-block">
									<a class="btn btn-sm btn-soft-light" href="#">Log out</a>
							</div> */}

              {/* Responsive Toggle Button */}
              <button
                type="button"
                class="navbar-toggler btn btn-icon btn-sm rounde-circle d-lg-none"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="sidebarNav"
                data-toggle="collapse"
                data-target="#sidebarNav"
              >
                <span class="navbar-toggler-default">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"
                    />
                  </svg>
                </span>
                <span class="navbar-toggler-toggled">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container space-1 space-top-lg-0 mt-lg-n10">
        <div class="row">
          <div class="col-lg-3">
            {/* Navbar */}
            <div class="navbar-expand-lg navbar-expand-lg-collapse-block navbar-light">
              <div
                id="sidebarNav"
                class="collapse navbar-collapse navbar-vertical"
              >
                {/* Card */}
                <div class="card mb-5">
                  <div class="card-body">
                    {/* Avatar */}
                    <div class="d-none d-lg-block text-center mb-5">
                      <div class="avatar avatar-xxl avatar-circle mb-3">
                        <img
                          class="avatar-img"
                          src="/assets/img/100x100/img12.jpg"
                          alt="Image Description"
                        />
                        <img
                          class="avatar-status avatar-lg-status"
                          src="/assets/svg/illustrations/top-vendor.svg"
                          alt="Image Description"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Verified user"
                        />
                      </div>
                      {authState.user ? (
                        <div>
                          <h4 class="card-title">{authState.user.name}</h4>
                          <p class="card-text font-size-1">
                            {authState.user.email}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h4 class="card-title">Natalie Curtis</h4>
                          <p class="card-text font-size-1">
                            natalie@example.com
                          </p>
                        </div>
                      )}
                    </div>

                    <h6 class="text-cap small">帳戶</h6>

                    {/* List */}
                    <ul class="nav nav-sub nav-sm nav-tabs nav-list-y-2 mb-4">
                      <li class="nav-item">
                        <a class="nav-link active">
                          <i class="fas fa-id-card nav-icon"></i>
                          個人資料
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/carbon/wallet">
                          <i className="fas fa-wallet nav-icon"></i>
                          碳權存摺
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <i class="fas fa-shield-alt nav-icon"></i>
                          更改密碼
                        </a>
                      </li>
                      {/* <li class="nav-item">
												<a class="nav-link" href="notifications.html">
													<i class="fas fa-bell nav-icon"></i>
													Notifications
													<span class="badge badge-soft-navy badge-pill nav-link-badge">1</span>
												</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="preferences.html">
													<i class="fas fa-sliders-h nav-icon"></i>
													Preferences
												</a>
											</li> */}
                    </ul>

                    <h6 class="text-cap small">購物</h6>

                    {/* List */}
                    <ul class="nav nav-sub nav-sm nav-tabs nav-list-y-2 mb-4">
                      <li class="nav-item">
                        <a class="nav-link" href="orders.html">
                          <i class="fas fa-shopping-basket nav-icon"></i>
                          訂購紀錄
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="wishlist.html">
                          <i class="fas fa-heart nav-icon"></i>
                          願望清單
                          {/* TODO: 計算願望清單數量 */}
                          {/* <span class="badge badge-soft-navy badge-pill nav-link-badge">2</span> */}
                        </a>
                      </li>
                    </ul>

                    {/* <h6 class="text-cap small">Billing</h6> */}

                    <div class="d-lg-none">
                      <div class="dropdown-divider"></div>
                      <ul class="nav nav-sub nav-sm nav-tabs nav-list-y-2">
                        <li class="nav-item">
                          <a class="nav-link text-primary" href="#">
                            <i class="fas fa-sign-out-alt nav-icon"></i>
                            Log out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-9">
            <div class="card mb-3 mb-lg-5">
              <div class="card-header">
                <h5 class="card-title">個人資訊</h5>
              </div>

              <div class="card-body">
                <form>
                  {/* Form Group */}
                  <div class="row form-group">
                    <label class="col-sm-3 col-form-label input-label">
                      照片
                    </label>

                    <div class="col-sm-9">
                      <div class="media align-items-center">
                        <label
                          class="avatar avatar-xl avatar-circle mr-4"
                          for="avatarUploader"
                        >
                          <img
                            id="avatarImg"
                            class="avatar-img"
                            src="/assets/img/100x100/img12.jpg"
                            alt="Image Description"
                          />
                        </label>

                        <div class="media-body">
                          <div class="btn btn-sm btn-primary file-attachment-btn mb-2 mb-sm-0 mr-2">
                            上傳照片
                            <input
                              type="file"
                              class="js-file-attach file-attachment-btn-label"
                              id="avatarUploader"
                              data-hs-file-attach-options='{
																			"textTarget": "#avatarImg",
																			"mode": "image",
																			"targetAttr": "src"
																	}'
                            />
                          </div>

                          <a
                            class="btn btn-sm btn-white mb-2 mb-sm-0"
                            href="javascript:;"
                          >
                            刪除
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group">
                    <label
                      htmlFor="firstNameLabel"
                      class="col-sm-3 col-form-label input-label"
                    >
                      暱稱{" "}
                      <i
                        class="far fa-question-circle text-body ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Displayed on public forums, such as Front."
                      ></i>
                    </label>

                    <div class="col-sm-9">
                      <div class="input-group">
                        {authState.user ? (
                          <input
                            type="text"
                            class="form-control"
                            name="firstName"
                            required
                            id="firstNameLabel"
                            aria-label="Clarice"
                            placeholder={authState.user.name}
                            defaultValue={authState.user.name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            class="form-control"
                            name="firstName"
                            required
                            id="firstNameLabel"
                            placeholder="Clarice"
                            aria-label="Clarice"
                            // value="WHAT"
                            // onChange={(e) => {console.log("NOW"); setName(e.target.value);}}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div class="row form-group">
										<label for="firstNameLabel" class="col-sm-3 col-form-label input-label">Full name <i class="far fa-question-circle text-body ml-1" data-toggle="tooltip" data-placement="top" title="Displayed on public forums, such as Front."></i></label>

										<div class="col-sm-9">
											<div class="input-group">
												<input type="text" class="form-control" name="firstName" id="firstNameLabel" placeholder="Clarice" aria-label="Clarice" value="Natalie" />
												<input type="text" class="form-control" name="lastName" id="lastNameLabel" placeholder="Boone" aria-label="Boone" value="Curtis" />
											</div>
										</div>
									</div> */}

                  <div class="row form-group">
                    <label
                      htmlFor="emailLabel"
                      class="col-sm-3 col-form-label input-label"
                    >
                      電子信箱
                    </label>

                    {authState.user ? (
                      <div class="col-sm-9">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          id="emailLabel"
                          placeholder="clarice@example.com"
                          defaultValue={authState.user.email}
                          aria-label="clarice@example.com"
                          onChange={(e) => {
                            setEmailError(!validator.isEmail(e.target.value));
                            setEmail(e.target.value);
                          }}
                        />
                        {emailError ? (
                          <span class="badge badge-warning">
                            電子信箱格式錯誤！
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div class="col-sm-9">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          id="emailLabel"
                          placeholder="clarice@example.com"
                          aria-label="clarice@example.com"
                          // value="natalie@example.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div class="row form-group">
                    <label
                      htmlFor="phoneLabel"
                      class="col-sm-3 col-form-label input-label"
                    >
                      {" "}
                      手機號碼
                      {/* <span class="input-label-secondary">(Optional)</span> */}
                    </label>

                    {/* TODO: 更改phone的template */}
                    <div class="col-sm-9">
                      <div class="input-group align-items-center">
                        {authState.user ? (
                          <input
                            type="text"
                            class="js-masked-input form-control"
                            name="phone"
                            id="phoneLabel"
                            placeholder="09xxxxxxxx"
                            aria-label="09xx-xxx-xxx"
                            defaultValue={authState.user.phone}
                            data-hs-mask-options='{
								"template": "0000000000"
							}'
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            class="js-masked-input form-control"
                            name="phone"
                            id="phoneLabel"
                            placeholder="09xx-xxx-xxx"
                            aria-label="+x(xxx)xxx-xx-xx"
                            defaultValue=""
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            data-hs-mask-options='{
								"template": "+0(000)000-00-00",
								"translation": {
									"*": {"pattern": "[0][9]"}
								}
							}'
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="row form-group">
                    <label class="col-sm-3 col-form-label input-label">
                      性別
                    </label>

                    <div class="col-sm-9">
                      <div class="input-group input-group-md-down-break">
                        <div class="form-control">
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              class="custom-control-input"
                              name="genderTypeRadio"
                              id="genderTypeRadio1"
                            />
                            <label
                              class="custom-control-label"
                              htmlFor="genderTypeRadio1"
                            >
                              男性
                            </label>
                          </div>
                        </div>

                        <div class="form-control">
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              class="custom-control-input"
                              name="genderTypeRadio"
                              id="genderTypeRadio2"
                              checked
                              onChange={(e) => {
                                console.log(e + "is unchecked :)");
                              }}
                            />
                            <label
                              class="custom-control-label"
                              htmlFor="genderTypeRadio2"
                            >
                              女性
                            </label>
                          </div>
                        </div>

                        <div class="form-control">
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              class="custom-control-input"
                              name="genderTypeRadio"
                              id="genderTypeRadio3"
                            />
                            <label
                              class="custom-control-label"
                              htmlFor="genderTypeRadio3"
                            >
                              其他
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="row form-group">
										<label class="col-sm-3 col-form-label input-label">BIO</label>

										<div class="col-sm-9">
											<div class="quill-custom">
												<div class="js-quill" style={{minHeight: "5rem"}}
														data-hs-quill-options='{
														"placeholder": "Type your message...",
															"modules": {
																"toolbar": [
																	["bold", "italic", "underline", "strike", "link", "image", "blockquote", "code", {"list": "bullet"}]
																]
															}
														}'>
															Creative mind at Htmlstream
												</div>
											</div>
										</div>
									</div> */}
                </form>
              </div>

              {/* Footer */}
              <div class="card-footer d-flex justify-content-end">
                <button
                  class="btn btn-white"
                  onClick={() => changePersonalInfo(false)}
                >
                  取消
                </button>
                <span class="mx-2"></span>
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    changePersonalInfo(true);
                    window.location.reload();
                  }}
                >
                  儲存變更
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
