import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../appContext";
import axios from "axios";
import storage from "../../utils/storage";
import {
  fetchownercarbon,
  fetchStore,
  fetchShippinginfo,
  getCounty,
} from "../../api/product";
import request from "../../utils/request";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import * as TokenCenter from "../../abi/ERC20TokenCenter";
import * as CarbonWalletApi from "../../api/carbon/wallet";

import validator from "validator";
import { Select } from "@material-ui/core";

// TODO: 修改所有javascript:;

function StoreInfo(props) {
  const { authState, authDispatch } = useContext(AuthContext);
  const [storeId, setstoreid] = useState(0);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [ownercarbon, setownercarbon] = useState(null);
  const [walletAllowance, setWalletAllowance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [shipping, setshipping] = useState([]);
  const [Store, setStore] = useState([]);
  const [county, setcounty] = useState([]);

  const [selected, setSelected] = useState(shipping.county);

  const [Same_city, setsame_city] = useState(shipping.same_city);
  const [Different_city, setDifferent_city] = useState(shipping.different_city);
  const [Remote_city, setremote_city] = useState(shipping.remote_city);
  const [Free_threshold, setfree_threshold] = useState(shipping.free_threshold);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    const searchstoreid = async () => {
      try {
        const userToken = storage.getAccessToken();
        const response = await request.get(`farmsv2/belong`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.data.code === 200) {
          const data = response.data.message[0];
          setstoreid(data);
          return true;
        } else if (response.data.code === 403) {
          alert("失败");
          return false;
        }
        return true;
      } catch (err) {
        console.log("faile", err);
        alert("查找失败");
        return false;
      }
    };

    const handleOwnerCarbon = async () => {
      const { message, code } = await fetchownercarbon(storeId);
      setownercarbon(message);
    };

    const getshippingInfo = async () => {
      const { message, code } = await fetchShippinginfo(storeId);
      console.log("shipping", message.county);
      setshipping(message);
    };

    const getStoreInfo = async () => {
      const { message, code } = await fetchStore(storeId);
      console.log("Store", message);
      setStore(message);
    };

    const getCountycity = async () => {
      const { message, code } = await getCounty();
      console.log("county", message);
      setcounty(message);
    };

    searchstoreid();
    handleOwnerCarbon();
    getStoreInfo();
    getshippingInfo();
    getCountycity();

    console.log("User from authState.user:", authState.user);
  }, [storeId]);

  async function updateShipping(id) {
    try {
      // setmin(document.getElementById("Acquiremin").value);
      // setdescription(document.getElementById("Acquiredescription").value);
      // setamount(document.getElementById("Acquireamount").value);
      // setmultiplier(document.getElementById("Acquiremutiplier").value);

      const userToken = storage.getAccessToken();
      console.log(document.getElementById("same_city").value);
      console.log(document.getElementById("different_city").value);
      console.log(document.getElementById("remote_city").value);
      console.log(document.getElementById("free_threshold").value);
      console.log(document.getElementById("city").value);

      const response = await request.post(
        "farmsv2/shipping/info/update",
        {
          farm_id: id,
          county: selected,
          same_city: document.getElementById("same_city").value,
          different_city: document.getElementById("different_city").value,
          remote_city: document.getElementById("remote_city").value,
          free_threshold: document.getElementById("free_threshold").value,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data.code);
      if (response.data.code === 200) {
        alert("編輯成功");
        window.location.reload();
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        console.log("error:", response);
        return false;
      } else if (response.data.code === 403) {
        alert("並非該商店成員");
        return false;
      } else if (response.data.code === 404) {
        alert("找不到商品");
        return false;
      } else if (response.data.code === 500) {
        alert("伺服器錯誤1");
        console.log(response);
        return false;
      }
    } catch (err) {
      alert("發生問題，編輯失敗");
      console.log(err);
      return false;
    }
  }

  function buttonupdateshipping() {
    updateShipping(storeId);
  }

  return (
    <div>
      <div
        class="bg-navy"
        style={{
          backgroundImage: `url(/assets/svg/components/abstract-shapes-19.svg)`,
        }}
      >
        <div class="container space-1 space-top-lg-2 space-bottom-lg-3">
          <div class="row align-items-center">
            <div class="col">
              <div class="d-none d-lg-block">
                <h1 className="h2 text-white">我的商店</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container space-1 space-top-lg-0 mt-lg-n10">
        <div class="row">
          <div class="col-lg-3">
            <div class="navbar-expand-lg navbar-expand-lg-collapse-block navbar-light">
              <div
                id="sidebarNav"
                class="collapse navbar-collapse navbar-vertical"
              ></div>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="card mb-3 mb-lg-5">
            <div class="card-header">
              <h5 class="card-title">{authState.user.name}的商店</h5>
              <div
                class="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={handleShow}
                  >
                    <i class="fas fa-plane" aria-hidden="true">
                      運費設置
                    </i>
                  </button>
                </div>
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="Second group"
                >
                  <button type="button" class="btn btn-success">
                    <a href="/carbon/external">
                      <i class="fa fa-credit-card" aria-hidden="true">
                        取得token
                      </i>
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>設置運費</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="input2">
                        {" "}
                        當前縣市 :{shipping.county}
                      </label>

                      <select
                        id="city"
                        className="form-control"
                        onChange={handleChange}
                      >
                        {county.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="input2">同縣市運費</label>
                      <input
                        type="text"
                        id="same_city"
                        defaultValue={shipping.same_city}
                        className="form-control"
                        placeholder="同縣市運費"
                        onChange={(e) => {
                          setsame_city(
                            document.getElementById("same_city").value
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="input2">不同縣市運費</label>
                      <input
                        type="text"
                        id="different_city"
                        defaultValue={shipping.different_city}
                        className="form-control"
                        placeholder="不同縣市運費"
                        onChange={(e) => {
                          setDifferent_city(
                            document.getElementById("different_city").value
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="input2">離島運費</label>
                      <input
                        type="text"
                        id="remote_city"
                        defaultValue={shipping.remote_city}
                        className="form-control"
                        placeholder="離島運費"
                        onChange={(e) => {
                          setremote_city(
                            document.getElementById("remote_city").value
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="input2">免運門檻</label>
                      <input
                        type="text"
                        id="free_threshold"
                        defaultValue={shipping.free_threshold}
                        className="form-control"
                        placeholder="免運門檻"
                        onChange={(e) => {
                          setfree_threshold(
                            document.getElementById("free_threshold").value
                          );
                        }}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  關閉
                </Button>
                <Button
                  variant="primary"
                  onClick={(event) => {
                    handleClose();
                    buttonupdateshipping();
                  }}
                >
                  保存
                </Button>
              </Modal.Footer>
            </Modal>

            <div class="row">
              <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          授權點數
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          {ownercarbon}
                        </div>
                      </div>
                      <div class="col-auto">
                        <a
                          href="/carbon/wallet"
                          class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        >
                          {/* <i class="fas fa-download fa-sm text-white-50"> </i>  */}
                          管理
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                          碳權餘額
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <form>
                {/* Form Group */}
                <div class="row form-group">
                  <label
                    htmlFor="firstNameLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店品牌{" "}
                    <i
                      class="far  text-body ml-1"
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

                <div class="row form-group">
                  <label
                    htmlFor="phoneLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    {" "}
                    聯係電話
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
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店地址
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="Storeaddress"
                      placeholder="商店地址"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店特色
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="Storefeature"
                      placeholder="商店特色"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店名稱
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="Storename"
                      placeholder="商店名稱"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div class="card-footer d-flex justify-content-end">
              <button class="btn btn-white">取消</button>
              <span class="mx-2"></span>
              <button
                class="btn btn-primary"
                onClick={() => {
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
  );
}

export default StoreInfo;
